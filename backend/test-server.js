const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3001;

// Basic middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../')));

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`✅ Frontend: http://localhost:${PORT}`);
    console.log(`✅ API Test: http://localhost:${PORT}/api/test`);
});

console.log('Starting FashionHub E-commerce Server...');