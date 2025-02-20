import React, { useState, useEffect } from "react";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    price: 100, // Default max price
    rating: 0, // Default minimum rating
    discount: 0, // Default minimum discount
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, products]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5900/api/products");
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const applyFilters = () => {
    // 1. Sort products by price first (to apply sliding window)
    const sortedProducts = [...products].sort((a, b) => a.price - b.price);
  
    // 2. Sliding Window for Price Range Filtering
    let left = 0;
    let right = 0;
    const priceFilteredProducts = [];
  
    // Iterate using a sliding window for price filtering
    while (right < sortedProducts.length) {
      // If the product at 'right' is within the price range, add it to the filtered list
      if (sortedProducts[right].price <= filters.price) {
        priceFilteredProducts.push(sortedProducts[right]);
        right++;
      } else {
        // Slide the window to exclude the product at 'left'
        left++;
        if (left > right) {
          right = left;
        }
      }
    }
  
    // 3. Two-pointer for Rating and Discount Filtering
    let i = 0;
    let j = 0;
    const finalFilteredProducts = [];
  
    // Iterate over the price-filtered products to apply rating and discount filters
    while (j < priceFilteredProducts.length) {
      const product = priceFilteredProducts[j];
  
      if (
        product.rating >= filters.rating &&
        product.discount >= filters.discount
      ) {
        finalFilteredProducts.push(product);
      }
  
      j++;
    }
  
    setFilteredProducts(finalFilteredProducts);
  };
  

  const handleSort = (type) => {
    const sortedProducts = [...filteredProducts];
    if (type === "price") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (type === "rating") {
      sortedProducts.sort((a, b) => b.rating - a.rating);
    } else if (type === "discount") {
      sortedProducts.sort((a, b) => b.discount - a.discount);
    }
    setFilteredProducts(sortedProducts);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Product List</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 rounded-lg mb-6">
        {/* Price Range */}
      <div className="flex flex-col items-center mb-6">
        <label className="block text-lg font-semibold mb-2">Price Range: ${filters.price}</label>
        <input
          type="range"
          min="0"
          max="500"
          value={filters.price}
          onChange={(e) => setFilters({ ...filters, price: e.target.value })}
          className="w-full"
        />
      </div>

      {/* Rating Range */}
      <div className="flex flex-col items-center mb-6">
        <label className="block text-lg font-semibold mb-2">Rating: {filters.rating} & Above</label>
        <input
          type="range"
          min="0"
          max="5"
          value={filters.rating}
          step="0.1"
          onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
          className="w-full"
        />
      </div>

      {/* Discount Range */}
      <div className="flex flex-col items-center mb-6">
        <label className="block text-lg font-semibold mb-2">Discount: {filters.discount}% & Above</label>
        <input
          type="range"
          min="0"
          max="100"
          value={filters.discount}
          onChange={(e) => setFilters({ ...filters, discount: e.target.value })}
          className="w-full"
        />
      </div>
      </div>

      {/* Sorting Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button onClick={() => handleSort("price")} className="btn bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded">
          Sort by Price
        </button>
        <button onClick={() => handleSort("rating")} className="btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Sort by Rating
        </button>
        <button onClick={() => handleSort("discount")} className="btn bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
          Sort by Discount
        </button>
      </div>

      {/* Display Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="bg-white shadow-md rounded-lg p-4 transition-all duration-300 transform hover:scale-105">
              <img src={product.imageURL} alt={product.name} className="w-full h-40 object-contain rounded-md mb-4" />
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-gray-800 font-semibold">Price: ${product.price}</p>
              <p className="text-yellow-500">⭐ {product.rating} / 5</p>
              <p className="text-green-600">Discount: {product.discount}%</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No products match the filters.</p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
