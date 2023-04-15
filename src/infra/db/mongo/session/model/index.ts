import SessionDTO from "@/app/session/dto";
import mongoose, { Schema, Document } from "mongoose";

interface SessionModel extends SessionDTO, Document{}


const sessionSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'User'
  },
  token: String,
  expireDate: Date,
}, { timestamps: true });

sessionSchema.set("toJSON", {
  virtuals: true
});

export default mongoose.model<SessionModel>('session', sessionSchema);
