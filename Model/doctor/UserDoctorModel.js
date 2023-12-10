import mongoose from "mongoose";

// Create a schema for BOOK
const UserDoctorSchema = new mongoose.Schema({
    
        fname: {
          type: String,
          required: true,
        },
        lname: {
          type: String,
          required: true,
        },
        username: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        password: {
          type: String,
          required: true,
        },
        cpassword: {
          type: String,
          required: true,
        },
      },
      {
        timestamps: true,
      
});

// Create Author and Book models from the schemas
const UserDoctor = mongoose.model("UserDoctor", UserDoctorSchema);
export default UserDoctor;
