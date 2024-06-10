const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  district: {
    type: String,
    required: [true, 'District is required'],
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
  },
  subCategory: {
    type: String,
    required: [true, 'Sub-category is required'],
  },
  complaintType: {
    type: String,
    required: [true, 'Complaint type is required'],
  },
  mobileNumber: {
    type: String,
    required: [true, 'Mobile number is required'],
    match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number'],
  },
  emailId: {
    type: String,
    required: [true, 'Email ID is required'],
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
  },
  state: {
    type: String,
    required: [true, 'State is required'],
  },
  district: {
    type: String,
    required: [true, 'District is required'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
  pinCode: {
    type: String,
    required: [true, 'Pin code is required'],
    match: [/^\d{6}$/, 'Please enter a valid 6-digit pin code'],
  },
  complaintDescription: {
    type: String,
    required: [true, 'Complaint description is required'],
  },
  attachments: {
    type: [String], // Assuming attachments are stored as an array of file paths or URLs
  },
});

module.exports = mongoose.model('complaints', complaintSchema);

// module.exports = Complaint;
