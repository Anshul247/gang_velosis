

const ComplainModel = require("../../models/Complain");
const StatusModel = require("../../models/Status");
const UserModel = require("../../models/Users");
const RoleModel = require("../../models/Roles");

 

const getComplainsBy1912 = async (req, res) => {

    try {

        const assigned_area_userID = req.body.userID;

        // Fetch user's role from UserModel
        const user = await UserModel.findById(assigned_area_userID);
        if (!user) {
            return res.status(404).json({ message: "User not found", status: 400 });
        }

        // Fetch role details from RoleModel based on user's role
        const roleDetails = await RoleModel.findById(user.roles);
        if (!roleDetails) {
            return res.status(404).json({ message: "Role details not found", status: 400 });
        }

        const data = {
            role_id: roleDetails._id,
            role_name: roleDetails.name,
        };

        const allStatus = await StatusModel.find();
        console.log("allStatus", allStatus);
        const statusIds = [9, 5];

        // Filter the allStatus array based on the status IDs and extract _id fields
        const _ids = allStatus
            .filter(status => statusIds.includes(status.status_id)) // Filter based on status IDs
            .map(status => status._id); // Extract _id fields


        if (data.role_name === 'SSO') {
            
            const complains = await ComplainModel.find({ status: { $in: _ids }, substation_id: user.substation_id })
                
                .populate('assigned_area_userID', '-password -otp');

            if (!complains || complains.length === 0) {
                return res.status(404).json({ message: "No complaints found", status: 400 });
            }
         

            const response = []; // Initialize response array

            // Iterate over complains array
            for (const complain of complains) {
                // Find status for each complain
                const status = await StatusModel.findById(complain.status)
                    .catch(error => {
                        console.error("Error finding status:", error);
                        return null;
                    });

                    const gangDetails = await UserModel.findById(complain.gang_id)
                    .catch(error => {
                        console.error("Error finding status:", error);
                        return null;
                    });

                    console.log("gangD09090etails",gangDetails.username);
                    console.log("gangD09090etails",gangDetails);

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

          
            // return res.status(200).json(responseObject);



       


        return res.status(200).json({ complaints:response, message: "Complaints fetched Successfully", status: 200 });
    }else{
        return res.status(400).json({ message: "Gang can not get 1912 details only SSO can get", status: 400 });
               
    }
    } catch (error) {
        return res.status(500).json({ error: error, message: "Internal Server Error" ,status: 500 });
        
    }
   
};

module.exports = getComplainsBy1912;
