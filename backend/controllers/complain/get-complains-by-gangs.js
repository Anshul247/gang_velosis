
const ComplainModel = require("../../models/Complain");
const StatusModel = require("../../models/Status");
const UserModel = require("../../models/Users");

 

const getComplainsByGangs = async (req, res) => {
    const { gang_ids } = req.body;

    try {


        if (!gang_ids) {
            return res.status(404).json({ message: "Gang Id is required", status: 400 })
        }

   const complaints =  await Promise.all(
            gang_ids.map((gang_id) =>
                ComplainModel.find(
                    { gang_id: gang_id },
                )
            )
        );

        console.log("compl2232aints",complaints);

        const response = []; // Initialize response array
      
        for (const complain of complaints.flat()) {
            // Find status for each complain
console.log("complainasdasd",complain);

            const status = await StatusModel.findById(complain.status)
                .catch(error => {
                    console.error("Error finding status:", error);
                    return null;
                });

                // const gangDetails = await UserModel.findById(complain.gang_id)
                // .catch(error => {
                //     console.error("Error finding status:", error);
                //     return null;
                // });
                let gangDetails;
                if(status.status_id == 5){
                 gangDetails = await UserModel.findById(complain.gang_id)
                   .catch(error => {
                   console.error("Error finding status:", error);
                   return null;
               });
           }



            // Build response object with complain details and status
            response.push({
                SERVICE_ORDER_NO: complain.service_order_no,
                COMPLAIN_NO: complain.complain_no,
                AccountId: complain.consumer_account_no,
                shutdown_request_by: complain.shutdown_request_by,
                registration_date: complain.registration_date,
                shutdown_request_date: complain.shutdown_request_date,
                assigned_area: complain.assigned_area,
                status: status ? status.name : null, // Set status name if found, otherwise null
                status_id: status ? status.status_id : null, // Set status ID if found, otherwise null
                gangName: gangDetails ? gangDetails.username : null
          
            });
        }
              
console.log("respoasdasdasdnse",response);

        if (!complaints) {
            return res.status(404).json({ message: "No Complaint assigned to this gang", status: 400 })
        }
        return res.status(200).json({ complaints:response, message: "Complaints fetched Successfully", status: 200 });
       
    } catch (error) {
        return res.status(500).json({ error: error, message: "Internal Server Error" ,status: 500 });
        
    }
   
};

module.exports = getComplainsByGangs;
