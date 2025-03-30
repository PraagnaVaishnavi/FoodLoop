import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const foodListingSchema = new Schema(
  {
    donor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    foodType: { type: String, required: true },
    weight: { type: String, required: true },
    expirationDate: { type: Date, required: true },
    images: [{ type: String }], // URLs for images
    location: {
      type: { type: String, default: 'Point' },
      coordinates: { type: [Number], index: '2dsphere' }, 
    },
    listingCount: { type: Number, default: 1 }, // Frequency of listings
    status: { 
      type: String, 
      enum: ['pending', 'requested', 'confirmed'], 
      default: 'pending' 
    },
    // Optional volunteer
    volunteer: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

//TTL index for auto-expiring listings
foodListingSchema.index(
  { status: 1, updatedAt: 1 }, 
  { expireAfterSeconds: 3600, partialFilterExpression: { status: 'confirmed' } }
);

export default model('Listing', foodListingSchema);
