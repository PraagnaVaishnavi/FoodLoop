import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    googleId: {
        type: String,
        unique: true,
        sparse: true, 
      },
    role: { type: String, enum: ['donor', 'NGO', 'volunteer', 'admin'], required: true },

    // Additional details for a donor (especially restaurants)
    organizationName: { type: String },
    contactNumber: { type: String },
    address: { type: String },
    website: { type: String },

    // Historical tracking fields for restaurants(Add more as needed)
    averageMonthlyDonations: { type: Number, default: 0 },
    totalDonations: { type: Number, default: 0 },
    lastDonationDate: { type: Date },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
  
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });

const User = model('User', userSchema);

export default User;