# FashionHub E-commerce Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn

## Installation Steps

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Initialize Database
```bash
npm run init-db
```

### 3. Start the Server
```bash
npm start
# or for development with auto-reload
npm run dev
```

### 4. Access the Application
- Frontend: http://localhost:3000
- API: http://localhost:3000/api

## Project Structure

```
fashion-store/
├── backend/                 # Backend API server
│   ├── config/             # Database configuration
│   ├── controllers/        # Business logic
│   ├── middleware/         # Authentication middleware
│   ├── models/            # Data models
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   ├── server.js          # Main server file
│   └── package.json       # Backend dependencies
├── database/              # SQLite database files
├── css/                   # Frontend styles
├── js/                    # Frontend JavaScript
├── images/               # Static images
├── *.html               # Frontend pages
└── README.md            # Documentation
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login

### Products
- GET `/api/products` - Get all products
- GET `/api/products/:id` - Get single product
- POST `/api/products` - Add product (admin)

### Orders
- POST `/api/orders` - Create order
- GET `/api/orders` - Get user orders
- GET `/api/orders/:id` - Get order details

### User
- GET `/api/users/cart` - Get user cart
- POST `/api/users/cart` - Add to cart
- DELETE `/api/users/cart/:id` - Remove from cart
- GET `/api/users/wishlist` - Get wishlist
- POST `/api/users/wishlist` - Add to wishlist
- DELETE `/api/users/wishlist/:id` - Remove from wishlist

## Database Schema

### Users Table
- id, name, email, password, phone, address, created_at

### Products Table
- id, name, brand, price, original_price, category, description, image_url, stock_quantity, rating, reviews_count, created_at

### Orders Table
- id, user_id, total_amount, status, shipping_address, payment_method, created_at

### Order Items Table
- id, order_id, product_id, quantity, price, size

### Cart Table
- id, user_id, product_id, quantity, size, created_at

### Wishlist Table
- id, user_id, product_id, created_at

## Features

### Frontend Features
- Responsive design
- Product catalog with filtering
- Shopping cart functionality
- User authentication
- Order management
- Wishlist functionality

### Backend Features
- RESTful API
- JWT authentication
- SQLite database
- Order processing
- Cart management
- User management

## Development

### Adding New Products
Use the database initialization script or API endpoints to add products.

### Customization
- Modify CSS in `/css/style.css`
- Update frontend logic in `/js/` files
- Extend backend API in `/backend/routes/`

## Production Deployment

1. Set environment variables
2. Use production database
3. Enable HTTPS
4. Configure CORS properly
5. Add rate limiting
6. Implement proper logging

## Troubleshooting

### Common Issues
1. **Port already in use**: Change PORT in `.env` file
2. **Database errors**: Run `npm run init-db` to reset database
3. **API connection failed**: Ensure backend server is running

### Support
For issues and questions, check the documentation or create an issue in the repository.