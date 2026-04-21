console.log('🚀 Starting FashionHub E-commerce...\n');

// Test database connection
try {
    const db = require('./config/database');
    console.log('✅ Database connection successful');
    
    // Test if products exist
    db.get('SELECT COUNT(*) as count FROM products', (err, result) => {
        if (err) {
            console.log('❌ Database error:', err.message);
        } else {
            console.log(`✅ Database has ${result.count} products`);
        }
        
        // Start the server
        console.log('\n🌐 Starting web server...');
        require('./server.js');
    });
    
} catch (error) {
    console.log('❌ Error:', error.message);
    console.log('\n💡 Try running: npm install');
}