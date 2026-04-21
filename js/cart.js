// Cart functionality
let cartItems = JSON.parse(localStorage.getItem('fashionCart')) || [];
let appliedCoupon = JSON.parse(localStorage.getItem('appliedCoupon')) || null;
let deliveryCharge = parseInt(localStorage.getItem('deliveryCharge')) || 0;

// Initialize cart
document.addEventListener('DOMContentLoaded', function() {
    loadCartFromStorage();
    updateCartDisplay();
    updateSummary();
    updateCartCountGlobal();
    updateWishlistCountGlobal();
});

// Load cart from localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('fashionCart');
    if (savedCart) {
        cartItems = JSON.parse(savedCart);
    }
    
    const savedCoupon = localStorage.getItem('appliedCoupon');
    if (savedCoupon) {
        appliedCoupon = JSON.parse(savedCoupon);
    }
    
    const savedDelivery = localStorage.getItem('deliveryCharge');
    if (savedDelivery) {
        deliveryCharge = parseInt(savedDelivery);
    }
}

// Save cart to localStorage
function saveCartToStorage() {
    localStorage.setItem('fashionCart', JSON.stringify(cartItems));
    window.dispatchEvent(new Event('cartUpdated'));
}

// Global function to add item to cart (can be called from any page)
window.addToCart = function(productId, productData = null) {
    let item;
    
    if (productData) {
        item = productData;
    } else {
        const allProducts = [
            ...(window.products || []),
            ...(window.menProducts || []),
            ...(window.womenProducts || []),
            ...(window.kidsProducts || []),
            ...(window.beautyProducts || []),
            ...(window.electronicsProducts || []),
            ...(window.homeProducts || [])
        ];
        
        item = allProducts.find(p => p.id === productId);
    }
    
    if (!item) {
        alert('Product added to cart!');
        return;
    }
    
    cartItems = JSON.parse(localStorage.getItem('fashionCart')) || [];
    
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            id: item.id,
            name: item.name,
            brand: item.brand,
            price: item.price,
            originalPrice: item.originalPrice,
            quantity: 1,
            size: item.size || 'M',
            color: item.color || 'Default',
            image: item.emoji || item.image || '👕'
        });
    }
    
    localStorage.setItem('fashionCart', JSON.stringify(cartItems));
    updateCartCountGlobal();
    alert(`${item.name} added to bag!`);
};

// Global function to update cart count
function updateCartCountGlobal() {
    const cart = JSON.parse(localStorage.getItem('fashionCart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    const cartCountElements = document.querySelectorAll('#cart-count, .cart-count');
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

// Global function to update wishlist count
function updateWishlistCountGlobal() {
    const wishlist = JSON.parse(localStorage.getItem('fashionWishlist')) || [];
    const wishlistCountElements = document.querySelectorAll('#wishlist-count, .wishlist-count');
    wishlistCountElements.forEach(element => {
        element.textContent = wishlist.length;
    });
}

// Global toggleWishlist function
if (typeof window.toggleWishlist === 'undefined') {
    window.toggleWishlist = function() {
        const modal = document.getElementById('wishlist-modal');
        if (!modal) {
            alert('Wishlist feature coming soon!');
            return;
        }
        if (modal.style.display === 'block') {
            modal.style.display = 'none';
        } else {
            modal.style.display = 'block';
            updateWishlistDisplayGlobal();
        }
    };
}

// Global function to update wishlist display
function updateWishlistDisplayGlobal() {
    const wishlistItems = document.getElementById('wishlist-items');
    const emptyMessage = document.getElementById('wishlist-empty-message');
    
    if (!wishlistItems) return;
    
    const wishlist = JSON.parse(localStorage.getItem('fashionWishlist')) || [];
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
                    <button class="remove-from-wishlist" onclick="removeFromWishlistGlobal(${item.id})" title="Remove from Wishlist">×</button>
                </div>
            `;
            wishlistItems.appendChild(wishlistItem);
        });
    }
}

// Global function to remove from wishlist
window.removeFromWishlistGlobal = function(productId) {
    let wishlist = JSON.parse(localStorage.getItem('fashionWishlist')) || [];
    wishlist = wishlist.filter(item => item.id !== productId);
    localStorage.setItem('fashionWishlist', JSON.stringify(wishlist));
    updateWishlistCountGlobal();
    updateWishlistDisplayGlobal();
};

// Listen for storage changes from other tabs/pages
window.addEventListener('storage', function(e) {
    if (e.key === 'fashionCart') {
        updateCartCountGlobal();
    }
});

// Also listen for custom event within same page
window.addEventListener('cartUpdated', function() {
    updateCartCountGlobal();
});

// Update quantity
function updateQuantity(itemId, change) {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
        const newQuantity = item.quantity + change;
        
        if (newQuantity <= 0) {
            removeItem(itemId);
        } else {
            item.quantity = newQuantity;
            saveCartToStorage();
            updateCartDisplay();
            updateSummary();
            showNotification(`Quantity updated to ${item.quantity}`, 'success');
        }
    }
}

// Remove item
function removeItem(itemId) {
    const itemIndex = cartItems.findIndex(item => item.id === itemId);
    if (itemIndex > -1) {
        const itemName = cartItems[itemIndex].name;
        cartItems.splice(itemIndex, 1);
        saveCartToStorage();
        updateCartDisplay();
        updateSummary();
        showNotification(`${itemName} removed from bag`, 'info');
        
        if (cartItems.length === 0) {
            showEmptyCart();
        }
    }
}

// Move to wishlist
function moveToWishlist(itemId) {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
        // Add to wishlist logic here
        removeItem(itemId);
        showNotification(`${item.name} moved to wishlist`, 'success');
    }
}

// Clear cart
function clearCart() {
    if (confirm('Are you sure you want to remove all items from your bag?')) {
        cartItems = [];
        localStorage.setItem('fashionCart', JSON.stringify(cartItems));
        updateCartDisplay();
        updateSummary();
        updateCartCountGlobal();
        window.dispatchEvent(new Event('cartUpdated'));
        showEmptyCart();
        showNotification('All items removed from bag', 'info');
    }
}

// Apply coupon
function applyCoupon() {
    const couponCode = document.getElementById('coupon-input').value.trim().toUpperCase();
    if (couponCode) {
        applyCouponCode(couponCode);
    }
}

// Remove coupon
function removeCoupon() {
    appliedCoupon = null;
    localStorage.removeItem('appliedCoupon');
    
    const couponInput = document.getElementById('coupon-input');
    if (couponInput) {
        couponInput.value = '';
    }
    
    updateSummary();
    showNotification('Coupon removed', 'info');
}

function applyCouponCode(code) {
    const coupons = {
        'SAVE20': { discount: 200, type: 'fixed', description: '₹200 OFF' },
        'FIRST50': { discount: 500, type: 'fixed', description: '₹500 OFF' },
        'WELCOME10': { discount: 10, type: 'percentage', description: '10% OFF' }
    };
    
    if (coupons[code]) {
        appliedCoupon = { code, ...coupons[code] };
        localStorage.setItem('appliedCoupon', JSON.stringify(appliedCoupon));
        
        const couponInput = document.getElementById('coupon-input');
        if (couponInput) {
            couponInput.value = code;
        }
        
        updateSummary();
        showNotification(`Coupon ${code} applied successfully! ${coupons[code].description}`, 'success');
        
        // Update coupon display in summary
        updateCouponDisplay();
    } else {
        showNotification('Invalid coupon code', 'error');
    }
}

// Update coupon display in summary
function updateCouponDisplay() {
    let couponRow = document.querySelector('.coupon-discount-row');
    
    if (appliedCoupon) {
        if (!couponRow) {
            // Create coupon discount row
            const summaryCard = document.querySelector('.summary-card');
            const platformRow = summaryCard.querySelector('.summary-row:nth-child(4)');
            
            couponRow = document.createElement('div');
            couponRow.className = 'summary-row coupon-discount-row';
            couponRow.innerHTML = `
                <span>Coupon Discount (${appliedCoupon.code})</span>
                <span class="discount-amount">-₹${appliedCoupon.type === 'fixed' ? appliedCoupon.discount : '0'}</span>
            `;
            
            platformRow.parentNode.insertBefore(couponRow, platformRow.nextSibling);
        } else {
            // Update existing coupon row
            const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
            const couponDiscount = appliedCoupon.type === 'fixed' ? appliedCoupon.discount : Math.floor(subtotal * appliedCoupon.discount / 100);
            
            couponRow.querySelector('span:first-child').textContent = `Coupon Discount (${appliedCoupon.code})`;
            couponRow.querySelector('span:last-child').textContent = `-₹${couponDiscount}`;
        }
    } else if (couponRow) {
        couponRow.remove();
    }
}

// Update delivery charges
document.addEventListener('change', function(e) {
    if (e.target.name === 'delivery') {
        const deliveryOptions = {
            'standard': 0,
            'express': 99,
            'same-day': 199
        };
        deliveryCharge = deliveryOptions[e.target.value];
        localStorage.setItem('deliveryCharge', deliveryCharge);
        updateSummary();
        showNotification(`Delivery option updated: ${e.target.value}`, 'info');
    }
});

// Update cart display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalItemsSpan = document.getElementById('total-items');
    
    if (cartItems.length === 0) {
        showEmptyCart();
        return;
    }
    
    totalItemsSpan.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);
    
    cartItemsContainer.innerHTML = cartItems.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="item-image">${item.image}</div>
            <div class="item-details">
                <h3>${item.name}</h3>
                <p class="item-brand">${item.brand}</p>
                <div class="item-specs">
                    <span class="size">Size: ${item.size}</span>
                    <span class="color">Color: ${item.color}</span>
                </div>
                <div class="item-actions">
                    <button class="move-to-wishlist" onclick="moveToWishlist(${item.id})">💝 Move to Wishlist</button>
                    <button class="remove-item" onclick="removeItem(${item.id})">🗑️ Remove</button>
                </div>
            </div>
            <div class="item-quantity">
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <div class="item-price">
                <div class="current-price">₹${(item.price * item.quantity).toLocaleString()}</div>
                <div class="original-price">₹${(item.originalPrice * item.quantity).toLocaleString()}</div>
                <div class="savings">You save ₹${((item.originalPrice - item.price) * item.quantity).toLocaleString()}</div>
            </div>
        </div>
    `).join('');
}

// Update summary
function updateSummary() {
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const originalTotal = cartItems.reduce((total, item) => total + (item.originalPrice * item.quantity), 0);
    const discount = originalTotal - subtotal;
    const platformFee = cartItems.length > 0 ? 20 : 0;
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    
    let couponDiscount = 0;
    if (appliedCoupon) {
        if (appliedCoupon.type === 'fixed') {
            couponDiscount = appliedCoupon.discount;
        } else if (appliedCoupon.type === 'percentage') {
            couponDiscount = Math.floor(subtotal * appliedCoupon.discount / 100);
        }
    }
    
    const total = subtotal + deliveryCharge + platformFee - couponDiscount;
    const totalSavings = discount + couponDiscount;
    
    // Update summary display with proper selectors
    const summaryRows = document.querySelectorAll('.summary-row');
    if (summaryRows.length >= 4) {
        summaryRows[0].querySelector('span:first-child').textContent = `Subtotal (${totalItems} items)`;
        summaryRows[0].querySelector('span:last-child').textContent = `₹${subtotal.toLocaleString()}`;
        summaryRows[1].querySelector('span:last-child').textContent = `-₹${discount.toLocaleString()}`;
        summaryRows[2].querySelector('span:last-child').textContent = deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`;
        summaryRows[3].querySelector('span:last-child').textContent = `₹${platformFee}`;
    }
    
    const totalRow = document.querySelector('.summary-row.total');
    if (totalRow) {
        totalRow.querySelector('span:last-child').textContent = `₹${total.toLocaleString()}`;
    }
    
    const totalSavingsElement = document.querySelector('.total-savings span');
    if (totalSavingsElement) {
        totalSavingsElement.textContent = `🎉 You will save ₹${totalSavings.toLocaleString()} on this order`;
    }
    
    // Update coupon display
    updateCouponDisplay();
    
    // Update cart count in header
    updateCartCountGlobal();
}

// Show empty cart
function showEmptyCart() {
    document.querySelector('.cart-content').style.display = 'none';
    document.getElementById('empty-cart').style.display = 'block';
}

// Proceed to checkout
function proceedToCheckout() {
    if (cartItems.length === 0) {
        showNotification('Your bag is empty', 'error');
        return;
    }
    
    // Store cart data for checkout
    localStorage.setItem('checkoutItems', JSON.stringify(cartItems));
    localStorage.setItem('appliedCoupon', JSON.stringify(appliedCoupon));
    localStorage.setItem('deliveryCharge', deliveryCharge);
    
    window.location.href = 'checkout.html';
}

// Add recommended item
function addRecommended(itemId) {
    const recommendedItems = {
        1: { id: Date.now(), name: "Formal Shirt", brand: "FormalCo", price: 1299, originalPrice: 1999, quantity: 1, size: "M", color: "White", image: "👔" },
        2: { id: Date.now(), name: "Winter Jacket", brand: "WinterWear", price: 2499, originalPrice: 3999, quantity: 1, size: "L", color: "Black", image: "🧥" },
        3: { id: Date.now(), name: "Leather Bag", brand: "LeatherCo", price: 1799, originalPrice: 2999, quantity: 1, size: "One Size", color: "Brown", image: "👜" },
        4: { id: Date.now(), name: "Smart Watch", brand: "TechWatch", price: 4999, originalPrice: 7999, quantity: 1, size: "One Size", color: "Black", image: "⌚" }
    };
    
    const item = recommendedItems[itemId];
    if (item) {
        const existingItem = cartItems.find(cartItem => cartItem.name === item.name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push(item);
        }
        saveCartToStorage();
        updateCartDisplay();
        updateSummary();
        showNotification(`${item.name} added to bag`, 'success');
        
        // Show cart content if it was empty
        document.querySelector('.cart-content').style.display = 'block';
        document.getElementById('empty-cart').style.display = 'none';
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    if (type === 'success') notification.style.backgroundColor = '#10b981';
    else if (type === 'error') notification.style.backgroundColor = '#ef4444';
    else notification.style.backgroundColor = '#3b82f6';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);