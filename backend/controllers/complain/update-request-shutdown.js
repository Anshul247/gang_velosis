

const ShutDownModel = require("../../models/ShutDown");
const ComplainModel = require("../../models/Complain");
const StatusModel = require("../../models/Status");

 

const updateRequestShutdown = async (req, res) => {
    const {
        complain_no,
        statusId,
        staff_remark,
        remark,
        site_pic,
        current_sit_pic,
        equipment_pic,
        latitude,
        longitude,
        start_time,
        end_time,
        gang_id
    } = req.body;

    // Check if complain_no is provided
    if (!complain_no) {
        return res.status(400).json({ message: 'ComplainNo is required', status: 400 });
    }

    try {
        const allStatus = await StatusModel.find();
        const foundStatus = allStatus.find(status => status.status_id == statusId);
        const statusIdFound = foundStatus ? foundStatus._id : null;

        if (!statusIdFound) {
            return res.status(400).json({ message: 'Invalid status ID', status: 400 });
        }

        console.log("comp7878lain_no",complain_no);
        // console.log("comp7878lain_no",typeof(complain_no));

        const complaintDetails = await ComplainModel.findOneAndUpdate(
            { complain_no: complain_no },
            { $set: { status: statusIdFound } },
          
        );

        if (!complaintDetails) {
            return res.status(400).json({ message: 'Complaint No is invalid', status: 400 });
        }

        const gangWorkDetails = await ShutDownModel.findOneAndUpdate(
            { gang_id: complaintDetails.gang_id },
            // { _id: complaintDetails.gang_id },
            
            {
                $set: {
                    staff_remark,
                    remark,
                    site_pic,
                    current_sit_pic,
                    equipment_pic,
                    latitude,
                    longitude,
                    start_time,
                    end_time
                }
            },
           
        );

        if (!gangWorkDetails) {
            return res.status(400).json({ message: 'Gang work details not found', status: 400 });
        }

        res.status(200).json({ message: 'Update successful', status: 200 });
    } catch (error) {
        console.error('Error updating shutdown request:', error);
        res.status(500).json(           
            {error: err.message, message: 'Error while updating data in DB.',status:500 }
        );
    }
};


module.exports = updateRequestShutdown;


