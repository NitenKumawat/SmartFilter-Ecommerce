import React, { useState } from 'react';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';

function HomePage() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="w-screen mx-auto p-4 bg-gradient-to-br from-yellow-100 to-red-100">
      <h1 className="text-3xl font-bold text-center mb-6">SmartFilter Ecommerce</h1>
      <ProductForm onProductAdded={() => setRefresh(!refresh)} />
      <ProductList key={refresh} />
    </div>
  );
}

export default HomePage;
