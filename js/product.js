let selectedSize = 'M';
let quantity = 1;
let currentProduct = {
    id: 1,
    name: "Cotton T-Shirt",
    brand: "StyleCo",
    price: 799,
    originalPrice: 1299,
    category: "men",
    emoji: "👕",
    discount: "38% OFF",
    rating: 4.5,
    reviews: 234
};

// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Load product data (in real app, fetch from API)
function loadProduct() {
    if (productId) {
        // In a real app, fetch product data based on ID
        // For demo, using default product
    }
    
    document.getElementById('product-name').textContent = currentProduct.name;
    document.getElementById('product-brand').textContent = currentProduct.brand;
    document.getElementById('current-price').textContent = `₹${currentProduct.price}`;
    document.getElementById('original-price').textContent = `₹${currentProduct.originalPrice}`;
    document.getElementById('discount').textContent = currentProduct.discount;
    document.getElementById('main-image').textContent = currentProduct.emoji;
}

// Size selection
document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
        this.classList.add('selected');
        selectedSize = this.dataset.size;
    });
});

// Quantity controls
function changeQuantity(change) {
    quantity = Math.max(1, quantity + change);
    document.getElementById('quantity').textContent = quantity;
}

// Add to cart
function addToCart() {
    let cart = JSON.parse(localStorage.getItem('fashionCart')) || [];
    
    const existingItem = cart.find(item => item.id === currentProduct.id && item.size === selectedSize);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...currentProduct,
            size: selectedSize,
            quantity: quantity
        });
    }
    
    localStorage.setItem('fashionCart', JSON.stringify(cart));
    
    showNotification(`${quantity} x ${currentProduct.name} (Size: ${selectedSize}) added to bag!`);
}

// Buy now
function buyNow() {
    addToCart();
    window.location.href = 'checkout.html';
}

// Add to wishlist
function addToWishlist() {
    let wishlist = JSON.parse(localStorage.getItem('fashionWishlist')) || [];
    
    if (!wishlist.find(item => item.id === currentProduct.id)) {
        wishlist.push(currentProduct);
        localStorage.setItem('fashionWishlist', JSON.stringify(wishlist));
        showNotification(`${currentProduct.name} added to wishlist!`);
    } else {
        showNotification('Item already in wishlist!', 'error');
    }
}

// Notification function
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
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}

// Image thumbnails
document.querySelectorAll('.thumbnail').forEach(thumb => {
    thumb.addEventListener('click', function() {
        document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        document.getElementById('main-image').textContent = this.textContent;
    });
});

// Initialize
loadProduct();

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.main-header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});