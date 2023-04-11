import UserDTO from "@/app/user/dtos";
import mongoose, { Schema, Document } from "mongoose";

interface UserModel extends UserDTO, Document{}

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
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
  image: {
    type: String,
    required: false,
  },
  account: {
    type: mongoose.Types.ObjectId,
    required: false,
    ref: 'accounts'
  },
  status: {
    type: String,
    required: true,
  },
  finishedQuizzes: [{
    type: mongoose.Types.ObjectId,
    required: false,
    ref: 'quizzes'
  }],
  resetCode: {
    type: Number,
    required: false,
  },
});

userSchema.set('toJSON', {
  virtuals: true
});

export default mongoose.model<UserModel>('user', userSchema);
