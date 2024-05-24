const mongoose = require('mongoose');

const getConsumerData = new mongoose.Schema({
  DISCOM: { type: String, required: true },
  ZONE: { type: String, required: true },
  CIRCLE: { type: String, required: true },
  DIVISION: { type: String, required: true },
  SUBDIVISION: { type: String, required: true },
  SUBSTATION: { type: String, required: true },
  FEEDER: { type: String, required: true },
  DISTRICT: { type: String, required: true },
//   REGISTRATION_DATE: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ },
  REGISTRATION_DATE: { type: String, required: true},
  COMPLAINT_TYPE: { type: String, required: true },
  COMPLAINT_SUB_TYPE: { type: String, required: true },
  COMPLAINT_NO: { type: String, required: true },
  CONSUMER_NAME: { type: String, required: true },
  CONSUMER_MOBILE: { type: String, required: true },
  CONSUMER_ADDRESS: { type: String, required: true },
  CONSUMER_TYPE: { type: String, required: true },
  CONSUMER_ACCOUNT_NO: { type: String, required: true },
  REMARKS: { type: String, required: true },
  JE_NAME: { type: String, required: true },
  JE_MOBILE: { type: String, required: true },
  SDO_NAME: { type: String, required: true },
  SDO_MOBILE: { type: String, required: true },
  XEN_NAME: { type: String, required: true },
  XEN_MOBILE: { type: String, required: true },
  STS: { type: String, required: true },
  COMPLAINT_SOURCE: { type: String, required: true },
  AGENCY_SOURCE: { type: String, required: true },
});

module.exports = mongoose.model('Complain', getConsumerData);

