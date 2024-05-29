 
const getComplains = require('./get-complains');
const addRequestShutdown = require('./add-request-shutdown');
const updateRequestShutdown = require('./update-request-shutdown');
const getShutdownDetails = require('./get-shutdown-details');
const getDataFromConsumer = require('./get-data-from-consumer');
const assignComplain = require('./assign-complain');
const getComplainsByGangs = require('./get-complains-by-gangs');
const getComplainsBy1912 = require('./get-complains-by-1912');
const getDataFromConsumerDummy = require('./get-data-from-consumer-dummy');
  




module.exports = {
    getComplains,
    addRequestShutdown,
    updateRequestShutdown,
    getShutdownDetails,
    getDataFromConsumer,
    assignComplain,
    getComplainsByGangs,
    getComplainsBy1912,
    getDataFromConsumerDummy
 };
