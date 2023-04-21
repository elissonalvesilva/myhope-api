import AccountDTO from "@/app/account/dto";
import mongoose, { Schema, Document } from "mongoose";

interface AccountModel extends AccountDTO, Document{}

const statementSchema = new Schema({
  date: Date,
  content: String,
  accountId: {
    ref: 'Account',
    type: mongoose.Types.ObjectId,
  },
})


const accountSchema = new Schema({
  user: {
    ref: 'User',
    type: mongoose.Types.ObjectId,
  },
  accountNumber: String,
  balance: Number,
  statements: [statementSchema],
}, { timestamps: true });

accountSchema.set("toJSON", {
  virtuals: true,
})

export default mongoose.model<AccountModel>('Account', accountSchema);