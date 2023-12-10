import express from "express";
import RegisterController from "../Controller/doctor/RegisterDoctorController.js";
import LoginController from '../Controller/doctor/LoginDoctorController.js'
import GetSUserController from "../Controller/doctor/GetSUserDoctorController.js";
import GetAUserController from "../Controller/doctor/GetAUserDoctorController.js";
import VerifyToken from "../util/verifyToken.js";
import LogoutUser from '../Controller/doctor/LogoutDoctorController.js'

const router = express.Router();

router.post("/register", RegisterController);
router.post("/login", LoginController);
router.get("/singleUser",VerifyToken ,GetSUserController);
router.get("/getAll",VerifyToken ,GetAUserController);
router.get("/logout",VerifyToken ,LogoutUser);

export default router;