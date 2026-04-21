// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// API Helper Functions
class FashionAPI {
  static getToken() {
    return localStorage.getItem('authToken');
  }

  static getHeaders() {
    const token = this.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  // Authentication
  static async register(userData) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(userData)
    });
    return response.json();
  }

  static async login(credentials) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(credentials)
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  }

  static logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
  }

  // Products
  static async getProducts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/products?${queryString}`);
    return response.json();
  }

  static async getProduct(id) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    return response.json();
  }

  // Cart
  static async getCart() {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      headers: this.getHeaders()
    });
    return response.json();
  }

  static async addToCart(productData) {
    const response = await fetch(`${API_BASE_URL}/cart/add`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(productData)
    });
    return response.json();
  }

  static async updateCartItem(itemId, quantity) {
    const response = await fetch(`${API_BASE_URL}/cart/update/${itemId}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ quantity })
    });
    return response.json();
  }

  // Orders
  static async createOrder(orderData) {
    const response = await fetch(`${API_BASE_URL}/orders/create`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(orderData)
    });
    return response.json();
  }

  static async getOrders() {
    const response = await fetch(`${API_BASE_URL}/orders/my-orders`, {
      headers: this.getHeaders()
    });
    return response.json();
  }

  // User
  static async getProfile() {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      headers: this.getHeaders()
    });
    return response.json();
  }

  static async updateProfile(userData) {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(userData)
    });
    return response.json();
  }

  static async toggleWishlist(productId) {
    const response = await fetch(`${API_BASE_URL}/users/wishlist/${productId}`, {
      method: 'POST',
      headers: this.getHeaders()
    });
    return response.json();
  }
}

// Check authentication status
function checkAuth() {
  const token = localStorage.getItem('authToken');
  const user = localStorage.getItem('user');
  
  if (token && user) {
    return JSON.parse(user);
  }
  return null;
}

// Update UI based on auth status
function updateAuthUI() {
  const user = checkAuth();
  const profileBtn = document.querySelector('.profile-btn span');
  
  if (user && profileBtn) {
    profileBtn.textContent = user.name;
  }
}

// Initialize auth UI on page load
document.addEventListener('DOMContentLoaded', updateAuthUI);