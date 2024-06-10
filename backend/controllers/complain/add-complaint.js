
// const Joi = require('joi');
const Joi = require("joi");

const Complaint = require('../../models/ComplainModel'); 

// Controller function to add a new complaint
const addComplaint = async (req, res) => {
    try {
    const payload = req.body;
    // Define the Joi schema
    const schema = Joi.object({
      district: Joi.string().required(),
      department: Joi.string().required(),
      category: Joi.string().required(),
      subCategory: Joi.string().required(),
      complaintType: Joi.string().required(),
      mobileNumber: Joi.string().pattern(/^\d{10}$/).required(),
      emailId: Joi.string().email().required(),
      state: Joi.string().required(),
      address: Joi.string().required(),
      pinCode: Joi.string().pattern(/^\d{6}$/).required(),
      complaintDescription: Joi.string().required(),
      attachments: Joi.array().items(Joi.string()).optional(),
    });
    
 
    const { error, value } = schema.validate(payload);
    
    if (error) {
    //   throw new Error(error.message);
      res.status(400).json({ newComplaint:[], message: error.message });
    }

    // If validation passes, create and save the new complaint
    const newComplaint = new Complaint(value);
    await newComplaint.save();
    res.status(201).json({ newComplaint, message: "Complaint Added Successfully" });
  } catch (err) {
    console.error("Error saving complaint:", err);
    res.status(500).json({ error: err.message, message: 'Error while adding data in DB.', status: 500 });
  }
};

module.exports = addComplaint;


