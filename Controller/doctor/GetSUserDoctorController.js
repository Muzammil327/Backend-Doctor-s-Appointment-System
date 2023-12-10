import UserDoctorSchema from "../../Model/doctor/UserDoctorModel.js";
import asyncHandler from "express-async-handler";

const GetSUserController = asyncHandler(async (req, res) => {
  const id = req.user.id;

  try {
    const user = await UserDoctorSchema.findById(id);

    console.log(user);
    if (!user) {
      return res.status(404).json({ messsage: "User Not FOund" });
    } else {
      return res.status(200).json({
        messsage: "User FOund",
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          fname:user.fname,
          lname:user.lname,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
});

export default GetSUserController;
