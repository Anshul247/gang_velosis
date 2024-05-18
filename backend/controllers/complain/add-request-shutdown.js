

const ShutDownModel = require("../../models/ShutDown");
const ComplainModel = require("../../models/Complain");
const StatusModel = require("../../models/Status");

const addRequestShutdown = (req, res) => {
    const {
        complain_no,
        statusId,
        site_pic,
        current_sit_pic,
        equipment_pic,
        latitude,
        longitude,
        staff_remark,
        remark,
        start_time,
        end_time,
        shutdown_status,
    } = req.body;

    const shutdownRequest = new ShutDownModel({
        complain_no,
        statusId,
        site_pic,
        current_sit_pic,
        equipment_pic,
        latitude,
        longitude,
        staff_remark,
        remark,
        start_time,
        end_time,
        shutdown_status,
    });

    shutdownRequest.save()
        .then(async result => {
            const allStatus = await StatusModel.find();
            let foundStatus = allStatus.find(status => status.status_id == statusId);
            let statusIdFound = foundStatus?._id;


            ComplainModel.findOneAndUpdate(
                { COMPLAIN_NO: complain_no },
                { $set: { status: statusIdFound } }
            ).catch((error) => {
                return res.status(500).json({ error: 'Internal server error. 1' });
            });

            res.status(200).json({
                message: "Shutdown request added successfully",
                shutdownRequest: result,
                status: 200
            });
        })
        .catch(err => {
            console.error("Error saving shutdown request:", err);
            res.status(500).json({
                error: err.message
            });
        });
};

module.exports = addRequestShutdown;

