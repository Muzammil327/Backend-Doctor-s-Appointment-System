import UserDoctorSchema from "../../Model/doctor/UserDoctorModel.js";
import { hashPassword, comparePassword } from "../../util/bcrypt.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../../config.js";
import PatientModel from "../../Model/patient/UserPatientModel.js";
import DoctorModel from "../../Model/doctor/UserDoctorModel.js";

export const LoginController = asyncHandler(async (req, res) => {
  const { password, email } = req.body;
  //   validation

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

  // Try to find the user in both doctor and patient collections
  const doctorUser = await DoctorModel.findOne({ email });
  const patientUser = await PatientModel.findOne({ email });

  if (doctorUser) {
    // Check password
    const passwordMatch = await comparePassword(password, doctorUser.password);

    if (!passwordMatch) {
      return res.json({
        success: false,
        error: "Invalid Password",
      });
    }

    // token
    const token = jwt.sign(
      {
        id: doctorUser._id,
        email: doctorUser.email,
      },
      JWT_SECRET_KEY,
      { expiresIn: "10h" }
    );
    const options = {
      // path: "/",
      // httpOnly: true,
      httpOnly: false,
      secure: true,
      sameSite: "none",
    };
    res.cookie("token", token, options);

    try {
      return res.json({
        success: true,
        message: "Doctor successfully logged in.",
        doctorUser: {
          id: doctorUser._id,
          fname: doctorUser.fname,
          lname: doctorUser.lname,
          username: doctorUser.username,
          email: doctorUser.email,
        },
        token,
      });
    } catch (error) {
      return res.json({
        success: false,
        error: "Error Login User",
        error,
      });
    }
  }

  if (patientUser) {
    // If the user is found in the patient collection
    const passwordMatch = await comparePassword(password, patientUser.password);

    if (!passwordMatch) {
      return res.json({
        success: false,
        error: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: patientUser._id,
        email: user.email,
      },
      JWT_SECRET_KEY,
      { expiresIn: "10h" }
    );
    const options = {
      // path: "/",
      // httpOnly: true,
      httpOnly: false,
      secure: true,
      sameSite: "none",
    };
    res.cookie("token", token, options);

    try {
      return res.json({
        success: true,
        message: "Patient successfully logged in.",
        patientUser: {
          id: user._id,
          fname: user.fname,
          lname: user.lname,
          username: user.username,
          email: user.email,
        },
        token,
      });
    } catch (error) {
      return res.json({
        success: false,
        error: "Error Login User",
        error,
      });
    }
  }
});

export default LoginController;
