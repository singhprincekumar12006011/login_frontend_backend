const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  instituteName: { type: String, required: true },
  qualification: { type: String, required: true },
  specialization: { type: String },
  totalPercentage: { type: String, required: true },
  startingYear: { type: String, required: true },
  endingYear: { type: String },
  currentlyPursuing: { type: Boolean, default: false }
});

const experienceSchema = new mongoose.Schema({
  companyName: { type: String },
  jobTitle: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  yearOfExperience: { type: String },
  currentSalary: { type: String },
  expectedSalary: { type: String },
  technologiesUsed: { type: String },
  isFresher: { type: Boolean, default: false }
});

const candidateSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  gender: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  currentAddress: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  pincode: { type: String, required: true },
  technicalSkills: { type: String },
  educationDetails: [educationSchema],
  experienceDetails: [experienceSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Candidate', candidateSchema);