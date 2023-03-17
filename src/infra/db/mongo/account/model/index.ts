import AccountDTO from "@/app/account/dto";
import mongoose, { Schema, Document } from "mongoose";

interface AccountModel extends AccountDTO, Document{}

const accountSchema = new Schema({
  accountNumber: String,
  balance: Number,
  statements: Array,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
});

accountSchema.set("toJSON", {
  virtuals: true,
})

export default mongoose.model<AccountModel>('account', accountSchema);