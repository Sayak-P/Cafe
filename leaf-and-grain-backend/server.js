const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Mock Data
let users = [];
let orders = [];
const products = [
  { id: '1', name: "Latte", description: "Smooth and creamy", price: 250, category: "drink" },
  { id: '2', name: "Matcha Latte", description: "Green harmony", price: 280, category: "drink" },
  { id: '3', name: "Iced Filter", description: "Refreshing and light", price: 260, category: "drink" },
  { id: '4', name: "Almond Croissant", description: "Crispy outside, tender inside", price: 220, category: "treat" }
];

app.post('/api/auth/register', (req, res) => {
  const { email, password, name } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'Email already exists' });
  }
  const user = { id: Date.now().toString(), email, password, name };
  users.push(user);
  res.cookie('user', user.id, { httpOnly: true });
  res.json({ message: 'Registered', user });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  res.cookie('user', user.id, { httpOnly: true });
  res.json({ message: 'Logged in', user });
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('user');
  res.json({ message: 'Logged out' });
});

app.get('/api/auth/me', (req, res) => {
  const cookie = req.headers.cookie;
  if (!cookie) return res.json({ user: null });
  const match = cookie.match(/user=([^;]+)/);
  if (match) {
    const user = users.find(u => u.id === match[1]);
    if (user) return res.json({ user });
  }
  res.json({ user: null });
});

app.get('/api/products', (req, res) => res.json(products));
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  product ? res.json(product) : res.status(404).json({ error: 'Not found' });
});

app.post('/api/orders', (req, res) => {
  orders.push({ id: Date.now(), ...req.body });
  res.json({ message: 'Order placed!' });
});

app.listen(PORT, () => {
  console.log(`Fallback Server running on http://localhost:${PORT}`);
});
