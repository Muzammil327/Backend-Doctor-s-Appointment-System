import UserDoctorSchema from "../../Model/doctor/UserDoctorModel.js";
import asyncHandler from "express-async-handler";

const GetAUserController = asyncHandler(async (req, res) => {

  try {
    try {
      const userData = await UserDoctorSchema.find();
      res.json(userData);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } catch (error) {
    console.log(error);
  }
});

export default GetAUserController;
