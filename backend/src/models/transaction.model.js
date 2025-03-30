import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const donationTransactionSchema = new Schema(
  {
    foodListing: { type: Schema.Types.ObjectId, ref: 'FoodListing', required: true },
    donor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    NGO: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    volunteer: { type: Schema.Types.ObjectId, ref: 'User' },
    transactionHash: { type: String }, // Blockchain transaction hash once confirmed
    confirmed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model('Transaction', donationTransactionSchema);
