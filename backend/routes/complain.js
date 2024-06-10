const express = require('express');
const router = express.Router();
const complainController = require('../controllers/complain/index');










router.post('/get-hierarchy-by-sub-station', complainController.getHierarchyBySubStation);
router.post('/assign-complain', complainController.assignComplain);
router.post('/get-data-from-consumer', complainController.getDataFromConsumer);
router.post('/get-data-from-consumer-dummy', complainController.getDataFromConsumerDummy);
router.post('/get-complains', complainController.getComplains);
router.post('/get-complains-by-1912', complainController.getComplainsBy1912);
router.post('/get-complains-by-gangs', complainController.getComplainsByGangs);
router.post('/add-request-shutdown', complainController.addRequestShutdown);
router.post('/get-stutdown-details', complainController.getShutdownDetails);
router.post('/update-request-shutdown', complainController.updateRequestShutdown);


// --------------------------New Project--------------------------------------------------------

router.post('/add-complaint', complainController.addComplaint);





module.exports = router;
