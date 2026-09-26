const API_URL = 'http://localhost:5000/api';

// Cart State
let cart = JSON.parse(localStorage.getItem('cart') || '[]');

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(product) {
  const existing = cart.find(i => i.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  alert('Added to cart!');
}

function clearCart() {
  cart = [];
  saveCart();
}

function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (badge) {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline' : 'none';
  }
}

// Auth State
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

async function checkAuth() {
  try {
    const res = await fetch(`${API_URL}/auth/me`, { credentials: 'include' });
    if (res.ok) {
      const data = await res.json();
      return data.user;
    }
  } catch (e) {
    console.error(e);
  }
  return null;
}

async function updateNavbar() {
  const user = await checkAuth();
  const authLink = document.getElementById('auth-link');
  if (!authLink) return;

  if (user) {
    authLink.innerHTML = `<span>${user.name || user.email}</span> <a href="#" id="logout-btn" style="margin-left: 1rem; font-size: 0.9em; text-decoration: underline;">Logout</a>`;
    document.getElementById('logout-btn').addEventListener('click', async (e) => {
      e.preventDefault();
      await fetch(`${API_URL}/auth/logout`, { method: 'POST', credentials: 'include' });
      window.location.reload();
    });
  } else {
    authLink.innerHTML = `<a href="login.html">Login</a>`;
  }
}

// Load products for index.html
async function loadProducts() {
  const container = document.getElementById('products-container');
  if (!container) return;

  try {
    const res = await fetch(`${API_URL}/products`);
    const products = await res.json();
    
    container.innerHTML = products.map(p => `
      <div class="product-card">
        <div class="product-image">☕</div>
        <h3 class="product-title">${p.name}</h3>
        <p>${p.description}</p>
        <p class="product-price">₹${p.price}</p>
        <div style="display:flex; gap: 10px; margin-top: auto;">
          <button class="btn btn-secondary" onclick="window.location.href='product.html?id=${p.id}'" style="flex: 1;">View</button>
          <button class="btn" onclick='addToCart(${JSON.stringify(p)})' style="flex: 1;">Add</button>
        </div>
      </div>
    `).join('');
  } catch (e) {
    container.innerHTML = '<p>Error loading products.</p>';
  }
}

// Load product details for product.html
async function loadProductDetails() {
  const container = document.getElementById('product-detail-container');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  if (!id) return;

  try {
    const res = await fetch(`${API_URL}/products/${id}`);
    const p = await res.json();
    
    container.innerHTML = `
      <div class="product-detail">
        <div class="product-detail-image">☕</div>
        <div class="product-detail-info">
          <h1>${p.name}</h1>
          <p class="product-detail-price">₹${p.price}</p>
          <p>${p.description}</p>
          <button class="btn" onclick='addToCart(${JSON.stringify(p)})' style="margin-top: 2rem; align-self: flex-start;">Add to Cart</button>
        </div>
      </div>
    `;
  } catch (e) {
    container.innerHTML = '<p>Error loading product.</p>';
  }
}

// Load cart for cart.html
async function loadCartPage() {
  const container = document.getElementById('cart-items');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = '<p>Your cart is empty.</p>';
    document.getElementById('checkout-btn').style.display = 'none';
    return;
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div>
        <h3>${item.name}</h3>
        <p>Qty: ${item.quantity} x ₹${item.price}</p>
      </div>
      <div>
        <strong>₹${item.price * item.quantity}</strong>
      </div>
    </div>
  `).join('');
  
  document.getElementById('cart-total').textContent = `Total: ₹${total}`;

  document.getElementById('checkout-btn').addEventListener('click', async () => {
    const user = await checkAuth();
    if (!user) {
      window.location.href = 'login.html';
      return;
    }

    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart.map(i => ({ productId: i.id, quantity: i.quantity, price: i.price })) }),
        credentials: 'include'
      });
      if (res.ok) {
        alert('Order placed successfully!');
        clearCart();
        window.location.href = 'index.html';
      } else {
        alert('Failed to place order.');
      }
    } catch (err) {
      alert('Error placing order.');
    }
  });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  updateNavbar();
  loadProducts();
  loadProductDetails();
  loadCartPage();
});
