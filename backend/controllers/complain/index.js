 
const getComplains = require('./get-complains');
const addRequestShutdown = require('./add-request-shutdown');
const updateRequestShutdown = require('./update-request-shutdown');
const getShutdownDetails = require('./get-shutdown-details');
const getDataFromConsumer = require('./get-data-from-consumer');
  



module.exports = {
    getComplains,
    addRequestShutdown,
    updateRequestShutdown,
    getShutdownDetails,
    getDataFromConsumer
 };
