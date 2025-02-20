import express from 'express';
import Product from '../models/productModel.js';

const router = express.Router();

// Add a Product
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// Get all products with filtering & sorting
router.get('/', async (req, res) => {
  try {
    let products = await Product.find();

    // Sorting
    if (req.query.sortBy) {
      products = products.sort((a, b) => a[req.query.sortBy] - b[req.query.sortBy]);
    }

    // Range Filtering
    if (req.query.priceMin && req.query.priceMax) {
      products = products.filter(p => p.price >= req.query.priceMin && p.price <= req.query.priceMax);
    }
    if (req.query.ratingMin) {
      products = products.filter(p => p.rating >= req.query.ratingMin);
    }
    if (req.query.discountMin) {
      products = products.filter(p => p.discount >= req.query.discountMin);
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

export default router;
