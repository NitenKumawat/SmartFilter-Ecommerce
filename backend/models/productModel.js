import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  rating: Number,
  imageURL: String,
  description: String,
  discount: Number,
  category: String,
});

const Product = mongoose.model('Product', productSchema);

export default Product;
