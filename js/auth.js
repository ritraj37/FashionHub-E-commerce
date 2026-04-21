// Authentication Helper Functions

// Handle logout
function handleLogout() {
    if (typeof FashionAPI !== 'undefined') {
        FashionAPI.logout();
    } else {
        // Fallback if API not loaded
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    }
}

// Check if user is logged in
function isLoggedIn() {
    return !!localStorage.getItem('authToken');
}

// Get current user
function getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
}

// Update UI based on auth status
function updateAuthUI() {
    const user = getCurrentUser();
    const profileBtns = document.querySelectorAll('.profile-btn span');
    
    if (user && profileBtns.length > 0) {
        profileBtns.forEach(btn => {
            if (btn.textContent === 'Profile') {
                btn.textContent = user.name;
            }
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', updateAuthUI);
