import PatientModel from '../../Model/patient/UserPatientModel.js';
import DoctorModel from '../../Model/doctor/UserDoctorModel.js';
import { hashPassword } from '../../util/bcrypt.js';
import asyncHandler from "express-async-handler";

const RegisterController = asyncHandler(async (req, res) => {
  const { fname, lname, username, email, password, cpassword, role } = req.body;

  // Validation logic...
  if (!fname) {
    return res.json({
      status: 400,
      success: false,
      error: "First Name is required.",
    });
  }
  if (!lname) {
    return res.json({
      status: 400,
      success: false,
      error: "Last Name is required.",
    });
  }
  if (!username) {
    return res.json({
      status: 400,
      success: false,
      error: "Username is required.",
    });
  }
  if (!email) {
    return res.json({
      status: 400,
      success: false,
      error: "Email is Required.",
    });
  }
  if (!password) {
    return res.json({
      status: 400,
      success: false,
      error: "Password is Required.",
    });
  }
  if (password < 5) {
    return res.json({
      status: 400,
      success: false,
      error: "Password length less than 6.",
    });
  }
  if (!cpassword) {
    return res.json({
      status: 400,
      success: false,
      error: "Confirm Password is Required.",
    });
  }
  if (password !== cpassword) {
    return res.json({
      status: 400,
      success: false,
      error: "Password and Confirm Password is not same.",
    });
  }
  // Existing email check
  
  const userModel = role === 'doctor' ? DoctorModel : PatientModel;
  const existingEmail = await userModel.findOne({ email });

  if (existingEmail) {
    return res.json({
      status: 400,
      success: false,
      error: `Email is already registered for ${role === 'doctor' ? 'Doctor' : 'Patient'}`,
    });
  }

  // Password hash
  const hashedPassword = await hashPassword(password);

  try {
    const newUser = new userModel({
      fname,
      lname,
      username,
      email,
      password: hashedPassword,
      cpassword: hashedPassword,
      role
    });

    // Save user data
    const user = await newUser.save();

    return res.json({
      status: 200,
      success: true,
      message: `${role === 'doctor' ? 'Doctor' : 'Patient'} successfully created.`,
      user,
    });
  } catch (error) {
    return res.json({
      status: 401,
      success: false,
      error: `${role === 'doctor' ? 'Doctor' : 'Patient'} not created.`,
      error,
    });
  }
});

export default RegisterController;
