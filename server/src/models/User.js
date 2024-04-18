import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    name:{
        type:String,
        required:true,
    },
    collegeId:{
        type:String,
        required:true,
        unique:true
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "faculty"],
      required: true,
    },
    jwtaccesstoken: {
      type: String,
    },
    jwtrefreshtoken: {
      type: String,
    },
  },
  { timestamps: true,collection: "User"  }
);

export const User = mongoose.model("User", UserSchema);
