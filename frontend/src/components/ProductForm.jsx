import React, { useState } from "react";
import axios from "axios";

function ProductForm({ onProductAdded }) {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    rating: "",
    imageURL: "",
    description: "",
    discount: "",
    category: "books", // Default category
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5900/api/products", product);
      onProductAdded(response.data); // Notify parent component about the added product
      setProduct({
        name: "",
        price: "",
        rating: "",
        imageURL: "",
        description: "",
        discount: "",
        category: "books",
      });
    } catch (error) {
      console.error("Error adding product", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md p-6 rounded-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Add a Product</h2>

      <input
        type="text"
        name="name"
        value={product.name}
        onChange={handleChange}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        placeholder="Product Name"
        required
      />

      <input
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        placeholder="Price"
        required
      />

      <input
        type="number"
        name="rating"
        value={product.rating}
        onChange={handleChange}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        placeholder="Rating (0-5)"
        step="0.1"
        min="0"
        max="5"
        required
      />

      <input
        type="text"
        name="imageURL"
        value={product.imageURL}
        onChange={handleChange}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        placeholder="Image URL"
        required
      />

      <textarea
        name="description"
        value={product.description}
        onChange={handleChange}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        placeholder="Description"
        required
      />

      <input
        type="number"
        name="discount"
        value={product.discount}
        onChange={handleChange}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        placeholder="Discount (%)"
        required
      />

      {/* Category Selection */}
      <select
        name="category"
        value={product.category}
        onChange={handleChange}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        required
      >
        <option value="books">Books</option>
        <option value="beauty">Beauty Products</option>
        <option value="grocery">Grocery</option>
      </select>

      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full">
        Add Product
      </button>
    </form>
  );
}

export default ProductForm;
