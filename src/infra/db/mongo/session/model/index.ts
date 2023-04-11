import SessionDTO from "@/app/session/dto";
import mongoose, { Schema, Document } from "mongoose";

interface SessionModel extends SessionDTO, Document{}


const sessionSchema = new Schema({
  userId: String,
  token: String,
  expireDate: Date,
});

sessionSchema.set("toJSON", {
  virtuals: true
});

export default mongoose.model<SessionModel>('session', sessionSchema);
