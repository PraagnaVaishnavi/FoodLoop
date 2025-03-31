import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const foodListingSchema = new Schema(
  {
    donor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    foodType: { type: String, required: true, trim: true },
    weight: { type: String, required: true, trim: true },
    expirationDate: { type: Date, required: true },
    images: [{ type: String, trim: true }], // Store image URLs

    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], required: true, index: '2dsphere' }, 
    },

    listingCount: { type: Number, default: 1, min: 1 }, // Frequency of listings
    status: { 
      type: String, 
      enum: ['pending', 'requested', 'confirmed'], 
      default: 'pending',
      lowercase: true 
    },

    // Optional volunteer
    volunteer: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

// TTL index for auto-expiring listings (only confirmed ones)
foodListingSchema.index(
  { updatedAt: 1 }, 
  { expireAfterSeconds: 3600, partialFilterExpression: { status: 'confirmed' } }
);

export default model('FoodListing', foodListingSchema);
