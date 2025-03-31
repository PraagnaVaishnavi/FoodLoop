const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const donationTransactionSchema = new Schema(
  {
    foodListing: { type: Schema.Types.ObjectId, ref: 'FoodListing', required: true },
    donor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    ngo: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    volunteer: { type: Schema.Types.ObjectId, ref: 'User', default: null }, // Optional
    transactionHash: { type: String, default: null }, // Stores blockchain transaction hash
    confirmed: { type: Boolean, default: false }, // Indicates successful blockchain confirmation
  },
  { timestamps: true }
);

module.exports = model('Transaction', donationTransactionSchema);
