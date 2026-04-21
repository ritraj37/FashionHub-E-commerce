# FashionHub - Online Fashion Store

A modern, responsive e-commerce website for fashion products built with HTML, CSS, and JavaScript.

## Features

### 🛍️ Core E-commerce Features
- **Product Catalog**: Browse products by categories (Men, Women, Kids)
- **Search & Filter**: Search products and sort by price/name
- **Shopping Cart**: Add/remove items with quantity management
- **Wishlist**: Save favorite products
- **Product Quick View**: Detailed product modal with size selection

### 🎨 User Interface
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Hero Banner**: Animated slider with promotional content
- **Modern UI**: Clean, professional design with smooth animations
- **Mobile Menu**: Collapsible navigation for mobile devices

### ⚡ Interactive Features
- **Real-time Cart Updates**: Live cart count and total
- **Product Ratings**: Star ratings and review counts
- **Newsletter Subscription**: Email signup with validation
- **Loading Animations**: Smooth loading states
- **Notifications**: Success/error messages with animations

### 📱 Mobile Optimized
- Touch-friendly interface
- Responsive grid layouts
- Mobile-first design approach
- Optimized performance

## File Structure

```
fashion-store/
├── index.html          # Main HTML file
├── css/
│   └── style.css      # All styles and responsive design
├── js/
│   └── script.js      # JavaScript functionality
├── images/
│   └── products/      # Product images directory
└── README.md          # This file
```

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Flexbox/Grid, animations
- **JavaScript (ES6+)**: Interactive functionality
- **SVG Icons**: Scalable vector graphics for UI elements

## Key Components

### Navigation
- Fixed header with search functionality
- Category navigation with dropdowns
- Mobile hamburger menu
- User profile and cart icons

### Product System
- Dynamic product loading
- Category filtering
- Search functionality
- Sort options (price, name)
- Product modal with size/quantity selection

### Shopping Cart
- Add/remove products
- Quantity management
- Real-time total calculation
- Checkout simulation

### Responsive Design
- Mobile-first approach
- Breakpoints: 1024px, 768px, 640px, 480px
- Flexible grid layouts
- Touch-optimized interactions

## Getting Started

1. **Clone or download** the project files
2. **Open** `index.html` in a web browser
3. **Browse** products and test functionality
4. **Customize** products in `js/script.js`
5. **Style** modifications in `css/style.css`

## Customization

### Adding Products
Edit the `products` array in `js/script.js`:

```javascript
{ 
  id: 19, 
  name: "New Product", 
  brand: "Brand Name", 
  price: 1999, 
  originalPrice: 2999, 
  category: "men", 
  emoji: "👕", 
  discount: "33% OFF", 
  rating: 4.5, 
  reviews: 123 
}
```

### Styling
Modify CSS variables and styles in `css/style.css`:

```css
:root {
  --primary-color: #ff3f6c;
  --secondary-color: #667eea;
  --text-color: #333;
}
```

### Adding Categories
1. Add category links in HTML navigation
2. Update filter functions in JavaScript
3. Add corresponding products with category tags

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Features

- Optimized CSS with minimal reflows
- Efficient JavaScript event handling
- Lazy loading ready structure
- Minimal external dependencies

## Future Enhancements

- [ ] User authentication system
- [ ] Payment gateway integration
- [ ] Product image galleries
- [ ] Advanced filtering (price range, brand)
- [ ] User reviews and ratings
- [ ] Order history and tracking
- [ ] Inventory management
- [ ] SEO optimization

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**FashionHub** - Your trusted fashion partner 🛍️