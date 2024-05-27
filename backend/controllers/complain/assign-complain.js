

const ComplainModel = require("../../models/Complain");
const StatusModel = require("../../models/Status");

const assignComplain = async (req, res) => {
    const { complain_no, gang_id } = req.body;

    try {


        const allStatus = await StatusModel.find();
        const notStartedStatus = allStatus.find(status => status.status_id == 9);
        const assignedStatus = allStatus.find(status => status.status_id == 5);
        if (!assignedStatus || !notStartedStatus) {
            return res.status(400).json({ message: 'Invalid status Found' });
        }

        const notStartedStatusID = notStartedStatus._id;
        const assignedStatusID = assignedStatus._id;

        console.log("stat232323usID",assignedStatusID);

        await Promise.all(
            complain_no.map((complain) =>
                ComplainModel.findOneAndUpdate(
                    { complain_no: complain, status: notStartedStatusID },
                    { $set: { gang_id: gang_id,status: assignedStatusID } }
                    
                )
            )
        );
        return res.status(200).json({ message: 'Complaints Assigned successfully.', status: 200 });
    } catch (error) {
        console.error("Error updating complaints:", error);
        return res.status(400).json({ message: 'Internal server error.', status: 400 });
    }
};

module.exports = assignComplain;

