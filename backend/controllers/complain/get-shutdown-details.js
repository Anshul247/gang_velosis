

const ShutDownModel = require("../../models/ShutDown");
const ComplainModel = require("../../models/Complain");
const StatusModel = require("../../models/Status");
 

const getShutdownDetails = async (req, res) => {
    const {       
        complain_no,
    } = req.body;


    console.log("complain_no",complain_no);
    // Check if id and complain_no are provided
    if (!complain_no) {
        return res.status(400).json({ message: 'ComplainNo is required.', status: 400 });
    }

    try {
       

       let complainDetails =  await ComplainModel.findOne(
            { complain_no: complain_no }
        );

        if (!complainDetails?.gang_id) {
            return res.status(400).json({ message: 'No Gang is Assigned to this Complain.', status: 400 });
        }

        let gangDetails =  await ShutDownModel.findOne(
            { gang_id: complainDetails.gang_id },
            { complain_no: complain_no }
        ).select('site_pic equipment_pic current_sit_pic start_time end_time');;

        console.log("gangDetails909",gangDetails);

        if (!gangDetails) {
            return res.status(400).json({ message: 'No Gang is Found.', status: 400 });
        }

        const status = await StatusModel.findById(complainDetails?.status)
        .catch(error => {
            console.error("Error finding status:", error);
            return null;
        });

         

        const {
            // complain_no,
            complaint_type,
            consumer_account_no,
            consumer_name,
            consumer_mobile,
            consumer_type,
            complaint_source,
            remarks,
            registration_date
        } = complainDetails;
        
        const details = {
            complain_no,
            complaint_type,
            consumer_account_no,
            consumer_name,
            consumer_mobile,
            consumer_type,
            complaint_source,
            remark: remarks,
            status: status.name,
            registration_date,
            site_pic:gangDetails.site_pic,
            equipment_pic:gangDetails.equipment_pic,             
            current_sit_pic:gangDetails.current_sit_pic,             
            start_time:gangDetails.start_time,
            end_time:gangDetails.end_time,
        };

        if (!complainDetails) {
            return res.status(400).json({ message: 'ComplainNo is not valid.', status: 400 });
        }

    
        

        res.status(200).json({ details , message: 'Details fetched successfully.',status: 200});
    } catch (error) {
        // console.error('Error updating shutdown request:', error);
        return res.status(500).json({ message: 'Complain Details Failed to fetch data', status: 500, err:error  });
    }
};

module.exports = getShutdownDetails;









