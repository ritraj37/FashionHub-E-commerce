const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const { category, search, sort, page = 1, limit = 20 } = req.query;
    
    let query = { active: true };
    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };
    
    let sortOption = {};
    if (sort === 'price-low') sortOption.price = 1;
    else if (sort === 'price-high') sortOption.price = -1;
    else if (sort === 'name') sortOption.name = 1;
    else sortOption.createdAt = -1;
    
    const products = await Product.find(query)
      .sort(sortOption)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Product.countDocuments(query);
    
    res.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('reviews.user', 'name');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Seed products (for development)
router.post('/seed', async (req, res) => {
  try {
    const sampleProducts = [
      {
        name: "Cotton T-Shirt",
        brand: "StyleCo",
        price: 799,
        originalPrice: 1299,
        category: "men",
        emoji: "👕",
        stock: 50,
        rating: 4.2,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Blue", "White", "Black"]
      },
      {
        name: "Denim Jeans",
        brand: "DenimCo",
        price: 2499,
        originalPrice: 3999,
        category: "men",
        emoji: "👖",
        stock: 30,
        rating: 4.5,
        sizes: ["30", "32", "34", "36"],
        colors: ["Dark Blue", "Light Blue"]
      }
    ];
    
    await Product.insertMany(sampleProducts);
    res.json({ message: 'Products seeded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;