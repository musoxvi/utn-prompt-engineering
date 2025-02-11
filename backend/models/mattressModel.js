import mongoose from "mongoose";

const mattressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dimensions: { type: String, required: true },
  material: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: String }
}, {
  versionKey: false // Desactivamos la versión de Mongoose
});

// Mattress Model
const Mattress = mongoose.model('Mattress', mattressSchema);

export default Mattress;