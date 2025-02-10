import mongoose from "mongoose";

const mattressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  dimensions: { type: String, required: true },
  width: { type: Number, required: true },
  length: { type: Number, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  material: { type: String, required: true },
  firmness: { type: String, required: true, enum: ["soft", "medium", "firm"] },
  warranty: { type: String, required: true },
  features: [{ type: String }],
  layers: [{ type: String }],
  coverMaterial: { type: String },
  price: { type: Number, required: true },
  images: [{ type: String }], 
}, {
  versionKey: false,
  timestamps: true 
});

// Mattress Model
const Mattress = mongoose.model('Mattress', mattressSchema);

export default Mattress;
