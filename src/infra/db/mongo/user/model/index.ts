import UserDTO from "@/app/user/dtos";
import mongoose, { Schema, Document } from "mongoose";

interface UserModel extends UserDTO, Document{}

const userSchema = new Schema({
  id: String,
  name: String,
  lastName: String,
  password: String,
  image: String,
  status: String,
  account: Object,
  finishedQuizzes: Array,
});

export default mongoose.model<UserModel>('user', userSchema);
