import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from '../config.js';

const VerifyToken = (req, res, next) => {
  const token = req.cookies.token;

  console.log(token);
  try {
    if (!token) {
      return res.json({
        success: false,
        message: "NO Token Given",
      });
    } else {
      const user = jwt.verify(token, JWT_SECRET_KEY);
      console.log(user);
      req.user = user;
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
export default VerifyToken;
