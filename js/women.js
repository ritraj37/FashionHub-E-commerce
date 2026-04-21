// Women's Fashion Store JavaScript
let products = [];
let cart = JSON.parse(localStorage.getItem('fashionCart')) || [];
let wishlist = JSON.parse(localStorage.getItem('fashionWishlist')) || [];
let currentCategory = 'women';
let filteredProducts = [];

// Women's products data
const womensProducts = [
    // Dresses
    { id: 201, name: "Floral Dress", brand: "ElegantStyle", price: 1599, originalPrice: 2299, category: "women", subcategory: "dresses", emoji: "👗", discount: "30% OFF", rating: 4.8, reviews: 312 },
    { id: 202, name: "Maxi Dress", brand: "BohoChic", price: 2299, originalPrice: 3199, category: "women", subcategory: "dresses", emoji: "👗", discount: "28% OFF", rating: 4.7, reviews: 189 },
    { id: 203, name: "Party Dress", brand: "GlamourWear", price: 2799, originalPrice: 3999, category: "women", subcategory: "dresses", emoji: "👗", discount: "30% OFF", rating: 4.6, reviews: 245 },
    { id: 204, name: "Casual Dress", brand: "ComfortStyle", price: 1299, originalPrice: 1899, category: "women", subcategory: "dresses", emoji: "👗", discount: "32% OFF", rating: 4.4, reviews: 167 },
    
    // Tops & Blouses
    { id: 205, name: "Silk Blouse", brand: "LuxeFashion", price: 1899, originalPrice: 2699, category: "women", subcategory: "tops", emoji: "👚", discount: "30% OFF", rating: 4.5, reviews: 198 },
    { id: 206, name: "Crop Top", brand: "TrendyWear", price: 899, originalPrice: 1299, category: "women", subcategory: "tops", emoji: "👚", discount: "31% OFF", rating: 4.3, reviews: 156 },
    { id: 207, name: "Formal Shirt", brand: "OfficeChic", price: 1599, originalPrice: 2299, category: "women", subcategory: "tops", emoji: "👚", discount: "30% OFF", rating: 4.6, reviews: 134 },
    { id: 208, name: "Tank Top", brand: "CasualFit", price: 699, originalPrice: 999, category: "women", subcategory: "tops", emoji: "👚", discount: "30% OFF", rating: 4.2, reviews: 123 },
    
    // Bottoms
    { id: 209, name: "Skinny Jeans", brand: "DenimLove", price: 1799, originalPrice: 2599, category: "women", subcategory: "bottoms", emoji: "👖", discount: "31% OFF", rating: 4.4, reviews: 234 },
    { id: 210, name: "Palazzo Pants", brand: "ComfortWear", price: 1299, originalPrice: 1899, category: "women", subcategory: "bottoms", emoji: "👖", discount: "32% OFF", rating: 4.3, reviews: 178 },
    { id: 211, name: "Mini Skirt", brand: "YouthStyle", price: 999, originalPrice: 1499, category: "women", subcategory: "bottoms", emoji: "👗", discount: "33% OFF", rating: 4.1, reviews: 145 },
    
    // Shoes
    { id: 212, name: "High Heels", brand: "GlamourFeet", price: 2199, originalPrice: 3199, category: "women", subcategory: "shoes", emoji: "👠", discount: "31% OFF", rating: 4.3, reviews: 198 },
    { id: 213, name: "Ankle Boots", brand: "StyleStep", price: 2799, originalPrice: 3999, category: "women", subcategory: "shoes", emoji: "👢", discount: "30% OFF", rating: 4.4, reviews: 167 },
    { id: 214, name: "Sneakers", brand: "ComfortWalk", price: 1999, originalPrice: 2899, category: "women", subcategory: "shoes", emoji: "👟", discount: "31% OFF", rating: 4.5, reviews: 289 },
    { id: 215, name: "Sandals", brand: "SummerFeet", price: 1299, originalPrice: 1899, category: "women", subcategory: "shoes", emoji: "👡", discount: "32% OFF", rating: 4.2, reviews: 156 },
    
    // Bags & Accessories
    { id: 216, name: "Handbag", brand: "LuxeBags", price: 1799, originalPrice: 2599, category: "women", subcategory: "bags", emoji: "👜", discount: "31% OFF", rating: 4.6, reviews: 245 },
    { id: 217, name: "Clutch Bag", brand: "EveningStyle", price: 999, originalPrice: 1499, category: "women", subcategory: "bags", emoji: "👛", discount: "33% OFF", rating: 4.4, reviews: 134 },
    { id: 218, name: "Backpack", brand: "UrbanChic", price: 1599, originalPrice: 2299, category: "women", subcategory: "bags", emoji: "🎒", discount: "30% OFF", rating: 4.3, reviews: 178 },
    
    // Ethnic Wear
    { id: 219, name: "Saree", brand: "TraditionalWear", price: 2999, originalPrice: 4299, category: "women", subcategory: "ethnic", emoji: "🥻", discount: "30% OFF", rating: 4.7, reviews: 189 },
    { id: 220, name: "Kurti", brand: "EthnicStyle", price: 1299, originalPrice: 1899, category: "women", subcategory: "ethnic", emoji: "👘", discount: "32% OFF", rating: 4.5, reviews: 167 },
    { id: 221, name: "Lehenga", brand: "FestiveWear", price: 4999, originalPrice: 7499, category: "women", subcategory: "ethnic", emoji: "👗", discount: "33% OFF", rating: 4.8, reviews: 98 }
];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    products = womensProducts;
    filteredProducts = [...products];
    
    updateCartCount();
    updateWishlistCount();
    loadProducts();
});

// Load and display products
function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        const stars = generateStarRating(product.rating);
        
        productCard.innerHTML = `
            <div class="product-image" onclick="openProductModal(${product.id})">${product.emoji}</div>
            <div class="product-info">
                <div class="product-brand">${product.brand}</div>
                <div class="product-name" onclick="openProductModal(${product.id})">${product.name}</div>
                <div class="product-rating">
                    ${stars}
                    <span class="rating-text">(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">₹${product.price}</span>
                    <span class="original-price">₹${product.originalPrice}</span>
                    <span class="discount">${product.discount}</span>
                </div>
                <div class="product-actions">
                    <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Bag</button>
                    <button class="add-to-wishlist" onclick="${wishlist.find(w => w.id === product.id) ? `removeFromWishlist(${product.id})` : `addToWishlist(${product.id})`}" title="${wishlist.find(w => w.id === product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}" style="color: ${wishlist.find(w => w.id === product.id) ? '#ff3f6c' : ''}">${wishlist.find(w => w.id === product.id) ? '♥' : '♡'}</button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '★';
    }
    
    if (hasHalfStar) {
        stars += '☆';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '☆';
    }
    
    return `<span class="stars">${stars}</span><span class="rating-value">${rating}</span>`;
}

// Filter categories
function filterCategory(subcategory) {
    document.querySelectorAll('.category-link').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    if (subcategory === 'all') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(product => product.subcategory === subcategory);
    }
    
    loadProducts();
}

// Search functionality
function searchProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    
    if (searchTerm === '') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.brand.toLowerCase().includes(searchTerm) ||
            product.subcategory.toLowerCase().includes(searchTerm)
        );
    }
    
    loadProducts();
}

// Sort products
function sortProducts() {
    const sortValue = document.getElementById('sort-select').value;
    
    switch(sortValue) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        default:
            filteredProducts = [...products];
            return;
    }
    
    loadProducts();
}

// Cart functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('fashionCart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${product.name} added to bag!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('fashionCart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
}

function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    cartItems.innerHTML = '';
    let total = 0;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your bag is empty</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div>
                    <div style="font-weight: bold;">${item.name}</div>
                    <div style="color: #666; font-size: 0.9rem;">${item.brand}</div>
                    <div>Qty: ${item.quantity} × ₹${item.price}</div>
                </div>
                <div>
                    <div style="font-weight: bold;">₹${item.price * item.quantity}</div>
                    <button onclick="removeFromCart(${item.id})" style="background: #ff3f6c; color: white; border: none; padding: 0.25rem 0.5rem; border-radius: 3px; cursor: pointer; margin-top: 0.5rem;">Remove</button>
                </div>
            `;
            cartItems.appendChild(cartItem);
            total += item.price * item.quantity;
        });
    }
    
    cartTotal.textContent = total;
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    if (modal.style.display === 'block') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'block';
        updateCartDisplay();
    }
}

// Wishlist functionality
function addToWishlist(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!wishlist.find(item => item.id === productId)) {
        wishlist.push(product);
        localStorage.setItem('fashionWishlist', JSON.stringify(wishlist));
        updateWishlistCount();
        updateWishlistHeartIcon(productId, true);
        showNotification(`${product.name} added to wishlist!`);
    } else {
        showNotification(`${product.name} is already in wishlist!`, 'error');
    }
}

function removeFromWishlist(productId) {
    const product = wishlist.find(p => p.id === productId);
    wishlist = wishlist.filter(item => item.id !== productId);
    localStorage.setItem('fashionWishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    updateWishlistDisplay();
    updateWishlistHeartIcon(productId, false);
    if (product) {
        showNotification(`${product.name} removed from wishlist!`);
    }
}

function toggleWishlist() {
    const modal = document.getElementById('wishlist-modal');
    if (modal.style.display === 'block') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'block';
        updateWishlistDisplay();
    }
}

function updateWishlistDisplay() {
    const wishlistItems = document.getElementById('wishlist-items');
    const emptyMessage = document.getElementById('wishlist-empty-message');
    
    wishlistItems.innerHTML = '';
    
    if (wishlist.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
        wishlist.forEach(item => {
            const wishlistItem = document.createElement('div');
            wishlistItem.className = 'wishlist-item';
            wishlistItem.innerHTML = `
                <div class="wishlist-item-image">${item.emoji}</div>
                <div class="wishlist-item-info">
                    <div class="wishlist-item-name">${item.name}</div>
                    <div class="wishlist-item-brand">${item.brand}</div>
                    <div class="wishlist-item-price">₹${item.price}</div>
                </div>
                <div class="wishlist-item-actions">
                    <button class="add-to-cart-from-wishlist" onclick="addToCart(${item.id})">Add to Bag</button>
                    <button class="remove-from-wishlist" onclick="removeFromWishlist(${item.id})" title="Remove from Wishlist">×</button>
                </div>
            `;
            wishlistItems.appendChild(wishlistItem);
        });
    }
}

function updateWishlistCount() {
    const count = wishlist.length;
    document.getElementById('wishlist-count').textContent = count;
    
    wishlist.forEach(item => {
        updateWishlistHeartIcon(item.id, true);
    });
}

function updateWishlistHeartIcon(productId, isInWishlist) {
    const heartButtons = document.querySelectorAll(`[onclick*="addToWishlist(${productId})"], [onclick*="removeFromWishlist(${productId})"]`);
    heartButtons.forEach(button => {
        if (isInWishlist) {
            button.innerHTML = '♥';
            button.style.color = '#ff3f6c';
            button.onclick = () => removeFromWishlist(productId);
        } else {
            button.innerHTML = '♡';
            button.style.color = '';
            button.onclick = () => addToWishlist(productId);
        }
    });
}

// Utility functions
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? '#27ae60' : '#e74c3c';
    
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 1001;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function goToCheckout() {
    if (cart.length === 0) {
        showNotification('Your bag is empty!', 'error');
        return;
    }
    
    window.location.href = 'checkout.html';
}

function subscribeNewsletter() {
    const email = document.getElementById('newsletter-email').value;
    
    if (!email || !email.includes('@')) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    showNotification('Successfully subscribed to newsletter!', 'success');
    document.getElementById('newsletter-email').value = '';
}

// Search on Enter key
document.getElementById('search-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchProducts();
    }
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const cartModal = document.getElementById('cart-modal');
    const wishlistModal = document.getElementById('wishlist-modal');
    
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
    
    if (event.target === wishlistModal) {
        wishlistModal.style.display = 'none';
    }
});