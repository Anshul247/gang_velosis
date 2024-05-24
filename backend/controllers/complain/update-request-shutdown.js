

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
    } = req.body;

    // Check if id and complain_no are provided
    if (!complain_no) {
        return res.status(400).json({ message: 'ComplainNo is required', status: 400 });
    }

    try {
        const allStatus = await StatusModel.find();
        let foundStatus = allStatus.find(status => status.status_id == statusId);
        let statusIdFound = foundStatus ? foundStatus._id : null;

      

     let complaintDetails =   await ComplainModel.findOneAndUpdate(
            { COMPLAIN_NO: complain_no },
            { $set: { status: statusIdFound } }
        );

      let gangWorkDetails =   await ShutDownModel.findOneAndUpdate(
            { _id: complaintDetails.gang_id },
            { $set: { staff_remark: staff_remark, remark: remark,site_pic:site_pic,current_sit_pic:current_sit_pic,equipment_pic:equipment_pic,latitude:latitude,longitude:longitude,start_time:start_time,end_time:end_time } }
        );

        if (!gangWorkDetails) {
            return res.status(400).json({ message: 'Gang work details not found', status: 400 });
        }

        console.log("ComplainModel complaintDetails",complaintDetails.gang_id );

        res.status(200).json({ message: 'Update successful', status: 200 });
    } catch (error) {
        console.error('Error updating shutdown request:', error);
        return res.status(500).json({ message: 'Update Failed', status: 500 });
    }
};

module.exports = updateRequestShutdown;


