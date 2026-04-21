const express = require('express');
const Order = require('../models/Order');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Create order
router.post('/create', auth, async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, subtotal, discount, deliveryCharge, total, couponCode } = req.body;
    
    const order = new Order({
      user: req.userId,
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      discount,
      deliveryCharge,
      total,
      couponCode
    });
    
    await order.save();
    
    // Clear user cart
    const user = await User.findById(req.userId);
    user.cart = [];
    user.orders.push(order._id);
    await user.save();
    
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user orders
router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .populate('items.product')
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single order
router.get('/:orderId', auth, async (req, res) => {
  try {
    const order = await Order.findOne({ 
      _id: req.params.orderId, 
      user: req.userId 
    }).populate('items.product');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;