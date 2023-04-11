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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
  },
  status: {
    type: String,
    required: true,
  },
  finishedQuizzes: [{
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'quiz'
  }],
  resetCode: {
    type: Number,
    required: false,
  },
});

userSchema.set('toJSON', {
  virtuals: true
});

userSchema.virtual('accounts', {
  ref: 'Account',
  localField: '_id',
  foreignField: 'account'
});

export default mongoose.model<UserModel>('User', userSchema);
