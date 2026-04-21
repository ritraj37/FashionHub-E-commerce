// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('fashionCart')) || [];

// Display checkout items
function displayCheckoutItems() {
    const container = document.getElementById('checkout-items');
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total');
    
    if (cart.length === 0) {
        container.innerHTML = '<p>No items in cart</p>';
        return;
    }
    
    let subtotal = 0;
    container.innerHTML = '';
    
    cart.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'checkout-item';
        itemEl.innerHTML = `
            <div class="item-info">
                <span class="item-name">${item.name}</span>
                <span class="item-details">Qty: ${item.quantity} × ₹${item.price}</span>
            </div>
            <span class="item-total">₹${item.price * item.quantity}</span>
        `;
        container.appendChild(itemEl);
        subtotal += item.price * item.quantity;
    });
    
    subtotalEl.textContent = `₹${subtotal}`;
    totalEl.textContent = `₹${subtotal + 99}`;
}

// Payment method switching
document.querySelectorAll('input[name="payment"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const cardDetails = document.getElementById('card-details');
        if (this.value === 'card') {
            cardDetails.style.display = 'block';
        } else {
            cardDetails.style.display = 'none';
        }
    });
});

// Form submission
document.getElementById('checkout-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simulate order processing
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.style.display = 'flex';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner"></div>
        <p>Processing your order...</p>
    `;
    document.body.appendChild(loadingOverlay);
    
    setTimeout(() => {
        localStorage.removeItem('fashionCart');
        alert('Order placed successfully! Order ID: #FH' + Date.now());
        window.location.href = 'index.html';
    }, 2000);
});

// Card number formatting
document.querySelector('input[placeholder="Card Number"]').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    e.target.value = formattedValue;
});

// Expiry date formatting
document.querySelector('input[placeholder="MM/YY"]').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value;
});

// Initialize
displayCheckoutItems();