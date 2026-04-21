const db = require('../config/database');

// Sample products data
const sampleProducts = [
    { name: "Cotton T-Shirt", brand: "StyleCo", price: 799, original_price: 1299, category: "men", description: "Premium cotton t-shirt", stock_quantity: 50 },
    { name: "Denim Jeans", brand: "FashionX", price: 1999, original_price: 2999, category: "men", description: "Classic denim jeans", stock_quantity: 30 },
    { name: "Formal Shirt", brand: "ClassicWear", price: 1299, original_price: 1899, category: "men", description: "Professional formal shirt", stock_quantity: 25 },
    { name: "Sneakers", brand: "SportMax", price: 2499, original_price: 3499, category: "men", description: "Comfortable sports sneakers", stock_quantity: 40 },
    { name: "Floral Dress", brand: "ElegantStyle", price: 1599, original_price: 2299, category: "women", description: "Beautiful floral dress", stock_quantity: 20 },
    { name: "Denim Jacket", brand: "TrendyWear", price: 1899, original_price: 2799, category: "women", description: "Stylish denim jacket", stock_quantity: 15 },
    { name: "High Heels", brand: "GlamourFeet", price: 2199, original_price: 3199, category: "women", description: "Elegant high heels", stock_quantity: 35 },
    { name: "Handbag", brand: "LuxeBags", price: 1799, original_price: 2599, category: "women", description: "Premium leather handbag", stock_quantity: 25 },
    { name: "Kids T-Shirt", brand: "LittleStyle", price: 499, original_price: 799, category: "kids", description: "Comfortable kids t-shirt", stock_quantity: 60 },
    { name: "Kids Dress", brand: "CutieWear", price: 899, original_price: 1299, category: "kids", description: "Adorable kids dress", stock_quantity: 30 },
    { name: "Kids Shoes", brand: "TinyFeet", price: 1299, original_price: 1899, category: "kids", description: "Durable kids shoes", stock_quantity: 45 },
    { name: "Kids Jacket", brand: "WarmKids", price: 1199, original_price: 1799, category: "kids", description: "Warm winter jacket", stock_quantity: 20 }
];

function initializeDatabase() {
    console.log('Initializing database with sample data...');

    // Clear existing products
    db.run('DELETE FROM products', (err) => {
        if (err) {
            console.error('Error clearing products:', err);
            return;
        }

        // Insert sample products
        const stmt = db.prepare(`INSERT INTO products 
            (name, brand, price, original_price, category, description, stock_quantity, rating, reviews_count) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);

        sampleProducts.forEach(product => {
            const rating = (Math.random() * 2 + 3).toFixed(1); // Random rating between 3-5
            const reviews = Math.floor(Math.random() * 300 + 50); // Random reviews 50-350
            
            stmt.run([
                product.name,
                product.brand,
                product.price,
                product.original_price,
                product.category,
                product.description,
                product.stock_quantity,
                rating,
                reviews
            ]);
        });

        stmt.finalize((err) => {
            if (err) {
                console.error('Error inserting products:', err);
            } else {
                console.log('Database initialized successfully with sample products!');
            }
            db.close();
        });
    });
}

// Run if called directly
if (require.main === module) {
    initializeDatabase();
}

module.exports = initializeDatabase;