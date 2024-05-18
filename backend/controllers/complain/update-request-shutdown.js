

const ShutDownModel = require("../../models/ShutDown");
const ComplainModel = require("../../models/Complain");
const StatusModel = require("../../models/Status");

const updateRequestShutdown = async (req, res) => {
    const {
        id,
        complain_no,
        statusId,
        staff_remark,
        remark,
    } = req.body;

    // Check if id and complain_no are provided
    if (!id || !complain_no) {
        return res.status(400).json({ message: 'GangDetail Id and ComplainNo are required fields', status: 400 });
    }

    try {
        const allStatus = await StatusModel.find();
        let foundStatus = allStatus.find(status => status.status_id == statusId);
        let statusIdFound = foundStatus ? foundStatus._id : null;

        await ShutDownModel.findOneAndUpdate(
            { _id: id },
            { $set: { staff_remark: staff_remark, remark: remark } }
        );

        await ComplainModel.findOneAndUpdate(
            { COMPLAIN_NO: complain_no },
            { $set: { status: statusIdFound } }
        );

        res.status(200).json({ message: 'Update successful', status: 200 });
    } catch (error) {
        console.error('Error updating shutdown request:', error);
        return res.status(500).json({ message: 'Update Failed', status: 500 });
    }
};

module.exports = updateRequestShutdown;


