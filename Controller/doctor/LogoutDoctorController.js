import asyncHandler from "express-async-handler";

const LogoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("token");
  
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  });

  export default LogoutUser;