// Load API client
// Products will be loaded from backend
let products = [];

// Legacy products data for fallback
const fallbackProducts = [
    // Men's Fashion
    { id: 1, name: "Cotton T-Shirt", brand: "StyleCo", price: 799, originalPrice: 1299, category: "men", emoji: "👕", discount: "38% OFF", rating: 4.5, reviews: 234 },
    { id: 2, name: "Denim Jeans", brand: "FashionX", price: 1999, originalPrice: 2999, category: "men", emoji: "👖", discount: "33% OFF", rating: 4.3, reviews: 189 },
    { id: 3, name: "Formal Shirt", brand: "ClassicWear", price: 1299, originalPrice: 1899, category: "men", emoji: "👔", discount: "32% OFF", rating: 4.7, reviews: 156 },
    { id: 4, name: "Sneakers", brand: "SportMax", price: 2499, originalPrice: 3499, category: "men", emoji: "👟", discount: "29% OFF", rating: 4.6, reviews: 298 },
    { id: 5, name: "Casual Hoodie", brand: "UrbanStyle", price: 1599, originalPrice: 2299, category: "men", emoji: "🧥", discount: "30% OFF", rating: 4.4, reviews: 167 },
    { id: 6, name: "Chino Pants", brand: "SmartFit", price: 1799, originalPrice: 2499, category: "men", emoji: "👖", discount: "28% OFF", rating: 4.2, reviews: 143 },
    
    // Women's Fashion
    { id: 7, name: "Floral Dress", brand: "ElegantStyle", price: 1599, originalPrice: 2299, category: "women", emoji: "👗", discount: "30% OFF", rating: 4.8, reviews: 312 },
    { id: 8, name: "Denim Jacket", brand: "TrendyWear", price: 1899, originalPrice: 2799, category: "women", emoji: "🧥", discount: "32% OFF", rating: 4.5, reviews: 278 },
    { id: 9, name: "High Heels", brand: "GlamourFeet", price: 2199, originalPrice: 3199, category: "women", emoji: "👠", discount: "31% OFF", rating: 4.3, reviews: 198 },
    { id: 10, name: "Handbag", brand: "LuxeBags", price: 1799, originalPrice: 2599, category: "women", emoji: "👜", discount: "31% OFF", rating: 4.6, reviews: 245 },
    { id: 11, name: "Maxi Dress", brand: "BohoChic", price: 2299, originalPrice: 3199, category: "women", emoji: "👗", discount: "28% OFF", rating: 4.7, reviews: 189 },
    { id: 12, name: "Ankle Boots", brand: "StyleStep", price: 2799, originalPrice: 3999, category: "women", emoji: "👢", discount: "30% OFF", rating: 4.4, reviews: 167 },
    
    // Kids Fashion
    { id: 13, name: "Kids T-Shirt", brand: "LittleStyle", price: 499, originalPrice: 799, category: "kids", emoji: "👕", discount: "38% OFF", rating: 4.6, reviews: 145 },
    { id: 14, name: "Kids Dress", brand: "CutieWear", price: 899, originalPrice: 1299, category: "kids", emoji: "👗", discount: "31% OFF", rating: 4.5, reviews: 123 },
    { id: 15, name: "Kids Shoes", brand: "TinyFeet", price: 1299, originalPrice: 1899, category: "kids", emoji: "👟", discount: "32% OFF", rating: 4.4, reviews: 98 },
    { id: 16, name: "Kids Jacket", brand: "WarmKids", price: 1199, originalPrice: 1799, category: "kids", emoji: "🧥", discount: "33% OFF", rating: 4.3, reviews: 87 },
    { id: 17, name: "Kids Shorts", brand: "PlayTime", price: 699, originalPrice: 999, category: "kids", emoji: "🩳", discount: "30% OFF", rating: 4.2, reviews: 76 },
    { id: 18, name: "Kids Cap", brand: "SunnyKids", price: 399, originalPrice: 599, category: "kids", emoji: "🧢", discount: "33% OFF", rating: 4.1, reviews: 54 }
];

let cart = [];
let wishlist = [];
let currentCategory = 'all';
let filteredProducts = [...products];

// Hero Banner Slider
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (slides[index]) slides[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}

// Countdown Timer
function updateCountdown() {
    const now = new Date().getTime();
    const saleEnd = new Date(now + (5 * 24 * 60 * 60 * 1000) + (12 * 60 * 60 * 1000) + (30 * 60 * 1000)).getTime();
    const distance = saleEnd - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    
    if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
    if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
    if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
}

document.addEventListener('DOMContentLoaded', async function() {
    // Load cart and wishlist from localStorage
    cart = JSON.parse(localStorage.getItem('fashionCart')) || [];
    wishlist = JSON.parse(localStorage.getItem('fashionWishlist')) || [];
    
    // Load products from backend
    await loadProductsFromAPI();
    
    updateCartCount();
    updateWishlistCount();
    
    // Initialize hero slider
    if (slides.length > 0) {
        setInterval(() => changeSlide(1), 5000);
    }
    
    // Initialize countdown
    updateCountdown();
    setInterval(updateCountdown, 60000);
});

// Load products from API
async function loadProductsFromAPI() {
    try {
        products = await ProductsAPI.getAll();
        filteredProducts = [...products];
        loadProducts();
    } catch (error) {
        console.error('Failed to load products from API, using fallback data');
        products = fallbackProducts;
        filteredProducts = [...products];
        loadProducts();
    }
}

function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        // Generate star rating
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

function filterCategory(category) {
    currentCategory = category;
    
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter products
    if (category === 'all') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(product => product.category === category);
    }
    
    loadProducts();
}

function searchProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    
    if (searchTerm === '') {
        filterCategory(currentCategory);
        return;
    }
    
    filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm)
    );
    
    loadProducts();
}

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
        default:
            filterCategory(currentCategory);
            return;
    }
    
    loadProducts();
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    cart = JSON.parse(localStorage.getItem('fashionCart')) || [];
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            brand: product.brand,
            price: product.price,
            originalPrice: product.originalPrice,
            quantity: 1,
            size: 'M',
            color: 'Default',
            image: product.emoji
        });
    }
    
    localStorage.setItem('fashionCart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    updateCartCount();
    showNotification(`${product.name} added to bag!`);
}

function addToWishlist(productId) {
    const allProducts = [
        ...(window.products || []),
        ...(window.menProducts || []),
        ...(window.womenProducts || []),
        ...(window.kidsProducts || []),
        ...(window.beautyProducts || []),
        ...(window.electronicsProducts || []),
        ...(window.homeProducts || [])
    ];
    
    const product = allProducts.find(p => p.id === productId) || products.find(p => p.id === productId);
    if (!product) return;
    
    wishlist = JSON.parse(localStorage.getItem('fashionWishlist')) || [];
    
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
    wishlist = JSON.parse(localStorage.getItem('fashionWishlist')) || [];
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
    
    if (!wishlistItems) return;
    
    wishlist = JSON.parse(localStorage.getItem('fashionWishlist')) || [];
    wishlistItems.innerHTML = '';
    
    if (wishlist.length === 0) {
        if (emptyMessage) emptyMessage.style.display = 'block';
    } else {
        if (emptyMessage) emptyMessage.style.display = 'none';
        wishlist.forEach(item => {
            const wishlistItem = document.createElement('div');
            wishlistItem.className = 'wishlist-item';
            wishlistItem.innerHTML = `
                <div class="wishlist-item-image">${item.emoji || '👕'}</div>
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

function updateWishlistHeartIcon(productId, isInWishlist) {
    const heartButtons = document.querySelectorAll(`[onclick="addToWishlist(${productId})"]`);
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

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('fashionCart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    updateCartCount();
    updateCartDisplay();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('fashionCart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) {
        cartCountEl.textContent = cartCount;
    }
}

// Listen for cart updates from other pages
window.addEventListener('storage', function(e) {
    if (e.key === 'fashionCart') {
        updateCartCount();
    }
});

window.addEventListener('cartUpdated', function() {
    updateCartCount();
});

function updateWishlistCount() {
    wishlist = JSON.parse(localStorage.getItem('fashionWishlist')) || [];
    const count = wishlist.length;
    const wishlistCountEl = document.getElementById('wishlist-count');
    if (wishlistCountEl) {
        wishlistCountEl.textContent = count;
    }
    
    // Update wishlist heart icons for all products
    wishlist.forEach(item => {
        updateWishlistHeartIcon(item.id, true);
    });
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

function checkout() {
    if (cart.length === 0) {
        alert('Your bag is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Order placed successfully! Total: ₹${total}`);
    cart = [];
    updateCartCount();
    toggleCart();
}

function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem;
        border-radius: 5px;
        z-index: 1001;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const mobileMenuClose = document.querySelector('.mobile-menu-close');

function toggleMobileMenu() {
    if (mobileMenuOverlay && mobileMenuBtn) {
        const isActive = mobileMenuOverlay.classList.contains('active');
        
        if (isActive) {
            mobileMenuOverlay.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            mobileMenuOverlay.classList.add('active');
            mobileMenuBtn.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
}

function closeMobileMenu() {
    if (mobileMenuOverlay && mobileMenuBtn) {
        mobileMenuOverlay.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = '';
    }
}

if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMobileMenu);
if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);

// Close mobile menu when clicking overlay
if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', (e) => {
        if (e.target === mobileMenuOverlay) {
            closeMobileMenu();
        }
    });
}

// Category link active state
const categoryLinks = document.querySelectorAll('.category-link');
categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        categoryLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('cart-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Search on Enter key
document.getElementById('search-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchProducts();
    }
});

// Product Modal Functions
let currentModalProduct = null;
let selectedSize = 'M';
let selectedQuantity = 1;

function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    currentModalProduct = product;
    selectedQuantity = 1;
    
    // Populate modal content
    document.getElementById('modal-product-emoji').textContent = product.emoji;
    document.getElementById('modal-product-name').textContent = product.name;
    document.getElementById('modal-product-brand').textContent = product.brand;
    document.getElementById('modal-product-rating').innerHTML = generateStarRating(product.rating) + ` <span class="rating-text">(${product.reviews} reviews)</span>`;
    document.getElementById('modal-current-price').textContent = `₹${product.price}`;
    document.getElementById('modal-original-price').textContent = `₹${product.originalPrice}`;
    document.getElementById('modal-discount').textContent = product.discount;
    document.getElementById('modal-product-description').textContent = `Premium quality ${product.name.toLowerCase()} from ${product.brand}. Perfect for everyday wear with comfortable fit and stylish design.`;
    document.getElementById('quantity-display').textContent = selectedQuantity;
    
    // Reset size selection
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('selected');
        if (btn.dataset.size === 'M') {
            btn.classList.add('selected');
        }
    });
    
    // Show modal
    document.getElementById('product-modal').style.display = 'block';
}

function closeProductModal() {
    document.getElementById('product-modal').style.display = 'none';
    currentModalProduct = null;
}

function changeQuantity(change) {
    selectedQuantity = Math.max(1, selectedQuantity + change);
    document.getElementById('quantity-display').textContent = selectedQuantity;
}

function addToCartFromModal() {
    if (!currentModalProduct) return;
    
    for (let i = 0; i < selectedQuantity; i++) {
        addToCart(currentModalProduct.id);
    }
    
    showNotification(`${selectedQuantity} x ${currentModalProduct.name} (Size: ${selectedSize}) added to bag!`);
    closeProductModal();
}

function addToWishlistFromModal() {
    if (!currentModalProduct) return;
    
    addToWishlist(currentModalProduct.id);
    closeProductModal();
}

// Size selection
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('size-btn')) {
        document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('selected'));
        e.target.classList.add('selected');
        selectedSize = e.target.dataset.size;
    }
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const cartModal = document.getElementById('cart-modal');
    const productModal = document.getElementById('product-modal');
    const wishlistModal = document.getElementById('wishlist-modal');
    
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
    
    if (event.target === productModal) {
        closeProductModal();
    }
    
    if (event.target === wishlistModal) {
        wishlistModal.style.display = 'none';
    }
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.main-header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Newsletter subscription
function subscribeNewsletter() {
    const email = document.getElementById('newsletter-email').value;
    
    if (!email || !email.includes('@')) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    showLoading();
    
    // Simulate API call
    setTimeout(() => {
        hideLoading();
        showNotification('Successfully subscribed to newsletter!', 'success');
        document.getElementById('newsletter-email').value = '';
    }, 1500);
}

// Loading functions
function showLoading() {
    document.getElementById('loading-overlay').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loading-overlay').style.display = 'none';
}

// Enhanced notification function
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
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Go to checkout page
function goToCheckout() {
    if (cart.length === 0) {
        showNotification('Your bag is empty!', 'error');
        return;
    }
    
    window.location.href = 'checkout.html';
}

// Legacy checkout function for compatibility
function checkout() {
    goToCheckout();
}