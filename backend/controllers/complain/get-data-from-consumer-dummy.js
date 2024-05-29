

const ComplaintAgency = require("../../models/ComplaintAgency");

const Complaint = require("../../models/Complain");
 

  

const getDataFromConsumerDummy = async (req, res) => {

   const authHeader = req.headers['authorization'];
   if (!authHeader || !authHeader.startsWith('Basic ')) {
       return res.status(401).json({ message: 'Missing or invalid authorization header', status: 401 });
   } 
 
   // Decode the Basic Auth cr edentials
   const base64Credentials = authHeader.split(' ')[1];  
   const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
   const [username, password] = credentials.split(':');
   if (!username || !password) {
       return res.status(400).json({ message: 'Username and password are required',status: 400 });
   }

 


   const storedConsumer = await ComplaintAgency.findOne({ username:username });
           console.log("storedConsumer",storedConsumer);

   if (!storedConsumer) {
       return res.status(404).json({ message: 'Consumer not found', status: 404 });
   }


    if(password != storedConsumer.password){
        return res.status(401).json({ message: 'Invalid credentials',status: 401 });
    }
//    // Compare the hashed password
//    const passwordMatch = await bcrypt.compare(password, storedConsumer.password);

//    if (!passwordMatch) {
//        return res.status(401).json({ error: 'Invalid credentials' });
//    }

// const  AGENCY_SOURCE =   storedConsumer._id

    const {
        
        complain_no,
        service_order_no,
        division_uid,
        shutdown_request_by,
        assigned_area_userid,
        shutdown_request_date,
        complaint_type,
        complaint_sub_type,
        consumer_name,
        consumer_mobile,
        consumer_address,
        consumer_type,
        consumer_account_no,
        citizen_charter,
        remarks,
        staffremarks,
        je_name,
        je_mobile,
        sdo_name,
        sdo_mobile,
        exen_name,
        exen_mobile,
        status,
        initialuser,
        initial_iuv_login,
        gang_id,
        // parent,
        assigned_area,
        service_engineer,
        shutdown_request_ticket,
        closingdate,
        closedby,
        closedpost,
        current_escalation,
        complaint_source,
        registration_date,
        complaint_update,
        substation_id
        // AGENCY_SOURCE
    } = req.body;

    const consumerRequest = new Complaint({
      
        complain_no,
        service_order_no,
        division_uid,
        shutdown_request_by,
        assigned_area_userid,
        shutdown_request_date,
        complaint_type,
        complaint_sub_type,
        consumer_name,
        consumer_mobile,
        consumer_address,
        consumer_type,
        consumer_account_no,
        citizen_charter,
        remarks,
        staffremarks,
        je_name,
        je_mobile,
        sdo_name,
        sdo_mobile,
        exen_name,
        exen_mobile,
        status,
        initialuser,
        initial_iuv_login,
        gang_id,
        // parent,
        assigned_area,
        service_engineer,
        shutdown_request_ticket,
        closingdate,
        closedby,
        closedpost,
        current_escalation,
        complaint_source,
        // registration_date,
        complaint_update,
        substation_id
    });


    const complaintNoExists = await Complaint.findOne({ complain_no:complain_no });

    if (complaintNoExists) {
        return res.status(409).json({ message: 'Complaint already exists', status: 409 });
    }
    consumerRequest.save()
        .then(async result => {
            res.status(200).json({
                message: "Data Added Successfully",
                complaintNumber: result.COMPLAINT_NO,
                status: 200
            });
        })
        .catch(err => {
            console.log("err",err);
            res.status(500).json({
                error: err.message,
                message: "Error In Saving Data to Database",
                status: 500
            });
        });
};

module.exports = getDataFromConsumerDummy;

