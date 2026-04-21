# FashionHub Backend Setup

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Setup MongoDB
- Install MongoDB locally OR use MongoDB Atlas (cloud)
- Update MONGODB_URI in .env file

### 3. Environment Variables
Update `.env` file with your credentials:
```
MONGODB_URI=mongodb://localhost:27017/fashionhub
JWT_SECRET=your_super_secret_jwt_key_here
STRIPE_SECRET_KEY=sk_test_your_stripe_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
PORT=5000
```

### 4. Start Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

### 5. Seed Sample Data
```bash
# Visit: http://localhost:5000/api/products/seed
```

## 📡 API Endpoints

### Authentication
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login

### Products
- GET `/api/products` - Get all products
- GET `/api/products/:id` - Get single product
- POST `/api/products/seed` - Seed sample products

### Cart
- GET `/api/cart` - Get user cart
- POST `/api/cart/add` - Add to cart
- PUT `/api/cart/update/:itemId` - Update cart item
- DELETE `/api/cart/remove/:itemId` - Remove from cart

### Orders
- POST `/api/orders/create` - Create order
- GET `/api/orders/my-orders` - Get user orders
- GET `/api/orders/:orderId` - Get single order

### Users
- GET `/api/users/profile` - Get user profile
- PUT `/api/users/profile` - Update profile
- POST `/api/users/addresses` - Add address
- POST `/api/users/wishlist/:productId` - Toggle wishlist

## 🔧 Next Steps

1. **Setup MongoDB**: Install locally or use MongoDB Atlas
2. **Configure Stripe**: Get API keys from Stripe dashboard
3. **Email Setup**: Configure Gmail app password
4. **Test API**: Use Postman or frontend integration
5. **Deploy**: Use Heroku, Railway, or DigitalOcean

## 🌟 Features Included

✅ User Authentication (JWT)
✅ Product Management
✅ Shopping Cart
✅ Order Processing
✅ User Profiles
✅ Wishlist
✅ Address Management
✅ API Security
✅ Error Handling