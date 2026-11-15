const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'leaf-and-grain-secret-jwt-key';

// CORS configuration: allow local dev and deployed frontend origins with credentials
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Persistent JSON Storage setup
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

const initialProducts = [
  { id: '1', name: "Latte", description: "Smooth and creamy espresso with velvety steamed milk", price: 250, category: "drink" },
  { id: '2', name: "Matcha Latte", description: "Ceremonial grade Japanese green tea with silky oat milk", price: 280, category: "drink" },
  { id: '3', name: "Iced Filter", description: "Single-origin Ethiopian cold brew with vibrant citrus notes", price: 260, category: "drink" },
  { id: '4', name: "Almond Croissant", description: "Freshly baked artisan pastry with toasted flaked almonds", price: 220, category: "treat" }
];

function loadDatabase() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      const data = JSON.parse(content);
      return {
        users: data.users || [],
        orders: data.orders || [],
        products: data.products && data.products.length > 0 ? data.products : initialProducts
      };
    }
  } catch (err) {
    console.error('Error reading database file:', err);
  }
  return { users: [], orders: [], products: initialProducts };
}

const db = loadDatabase();

function saveDatabase() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving database:', err);
  }
}

// Ensure initial database is saved if not existing
if (!fs.existsSync(DB_FILE)) {
  saveDatabase();
}

// Authentication helper middleware
const getAuthenticatedUser = (req) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = db.users.find(u => u.id === decoded.userId);
      if (user) return { id: user.id, email: user.email, name: user.name };
    } catch (e) {
      // Token invalid or expired
    }
  }
  const userId = req.cookies.user;
  if (userId) {
    const user = db.users.find(u => u.id === userId);
    if (user) return { id: user.id, email: user.email, name: user.name };
  }
  return null;
};

// --- AUTH ROUTES ---

app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existing = db.users.find(u => u.email.toLowerCase() === normalizedEmail);
    if (existing) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: Date.now().toString(),
      email: normalizedEmail,
      password: hashedPassword,
      name: name ? name.trim() : normalizedEmail.split('@')[0],
      createdAt: new Date().toISOString()
    };

    db.users.push(newUser);
    saveDatabase();

    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.cookie('user', newUser.id, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      message: 'Registered successfully',
      user: { id: newUser.id, email: newUser.email, name: newUser.name }
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = db.users.find(u => u.email.toLowerCase() === normalizedEmail);
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password).catch(() => false);
    // Backward-compatibility: if password was saved in plaintext previously
    const isPlaintextMatch = user.password === password;

    if (!isMatch && !isPlaintextMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Upgrade plaintext password to hash if needed
    if (isPlaintextMatch && !isMatch) {
      user.password = await bcrypt.hash(password, 10);
      saveDatabase();
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.cookie('user', user.id, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      message: 'Logged in successfully',
      user: { id: user.id, email: user.email, name: user.name }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('token');
  res.clearCookie('user');
  res.json({ message: 'Logged out successfully' });
});

app.get('/api/auth/me', (req, res) => {
  const user = getAuthenticatedUser(req);
  res.json({ user });
});

// --- PRODUCT ROUTES ---

app.get('/api/products', (req, res) => {
  res.json(db.products);
});

app.get('/api/products/:id', (req, res) => {
  const product = db.products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// --- ORDER ROUTES ---

app.post('/api/orders', (req, res) => {
  try {
    const { items } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Order must contain at least one item' });
    }

    const currentUser = getAuthenticatedUser(req);
    const total = items.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0);

    const newOrder = {
      id: Date.now().toString(),
      userId: currentUser ? currentUser.id : null,
      userEmail: currentUser ? currentUser.email : null,
      items: items.map(i => ({
        productId: i.productId || i.id,
        quantity: Number(i.quantity) || 1,
        price: Number(i.price) || 0
      })),
      total,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    db.orders.push(newOrder);
    saveDatabase();

    res.status(201).json({ message: 'Order placed successfully!', order: newOrder });
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

app.get('/api/orders', (req, res) => {
  const currentUser = getAuthenticatedUser(req);
  if (!currentUser) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const userOrders = db.orders.filter(o => o.userId === currentUser.id);
  res.json(userOrders);
});

app.listen(PORT, () => {
  console.log(`Leaf & Grain Backend running on http://localhost:${PORT}`);
});
