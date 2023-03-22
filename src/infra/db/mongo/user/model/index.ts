import UserDTO from "@/app/user/dtos";
import mongoose, { Schema, Document } from "mongoose";

interface UserModel extends UserDTO, Document{}

const userSchema = new Schema({
  name: String,
  lastName: String,
  password: String,
  image: String,
  status: String,
  account: Object,
  finishedQuizzes: Array,
  resetCode: Number,
});

userSchema.set('toJSON', {
  virtuals: true
});

export default mongoose.model<UserModel>('user', userSchema);
