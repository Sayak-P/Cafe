# ☕ Leaf & Grain — Specialty Coffee & Cafe

<p align="center">
  **A modern cafe experience, crafted for coffee lovers.**
  
  A full-stack cafe and restaurant website featuring a beautifully designed interface, interactive menu, shopping cart, user authentication, and table reservation experience.
  
  <br/>
  **[🌐 Visit Live Website](https://leaf-and-grain-n6k8.onrender.com)**
</p>

---

## 📌 About the Project

**Leaf & Grain** is a modern specialty coffee and cafe website designed to bring the cafe experience online. It combines an elegant, minimal user interface with essential restaurant functionalities, allowing customers to explore products, browse the menu, and interact with the cafe digitally.

The platform is built with a Next.js frontend and a Node.js backend, with Prisma used for database management.

The design focuses on a warm, welcoming aesthetic, smooth navigation, and a simple customer experience.

## ✨ Features

- **Modern Landing Page** — Clean, elegant interface with a premium cafe aesthetic.
- **Interactive Menu** — Browse coffee, beverages, and food items.
- **Product Details** — Explore individual products.
- **Shopping Cart** — Add products and manage cart items.
- **User Authentication** — Login and registration functionality.
- **About Section** — Discover the cafe and its story.
- **Beans Section** — Explore coffee beans and specialty coffee.
- **Delivery Section** — Dedicated delivery experience.
- **Table Reservation** — Reservation interface for customers.
- **Responsive Design** — Designed for a smooth browsing experience across screen sizes.

## 🖥️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | Next.js, React, TypeScript |
| Styling | CSS, PostCSS |
| Backend | Node.js |
| Database ORM | Prisma |
| Database | SQLite (development database) |
| Authentication | Custom Auth Context |
| Cart Management | React Context API |
| Deployment | Render |
| Version Control | Git & GitHub |

## 📸 Website Preview

### Homepage

The landing page introduces Leaf & Grain with a warm visual identity, specialty coffee imagery, and easy navigation.

### Menu & Products

Explore the cafe menu and browse individual product pages.

### Authentication & Cart

Customers can access login and registration pages and manage their shopping cart.

## 📂 Project Structure

```text
Cafe/
│
├── leaf-and-grain/              # Next.js Frontend
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   │   ├── login/
│   │   │   ├── menu/
│   │   │   ├── products/
│   │   │   ├── register/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   │
│   │   ├── components/
│   │   └── lib/
│   │       ├── auth-context.tsx
│   │       ├── cart-context.tsx
│   │       └── utils.ts
│   │
│   ├── package.json
│   └── next.config.ts
│
├── leaf-and-grain-backend/       # Node.js Backend
│   ├── data/
│   ├── prisma/
│   │   ├── dev.db
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── src/
│   ├── server.js
│   └── package.json
│
├── render.yaml
└── README.md
```

## ⚙️ Getting Started

Follow these steps to run the project locally.

### Prerequisites

- Node.js (18 or later)
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Sayak-P/Cafe.git
```

```bash
cd Cafe
```

### 2. Set Up the Frontend

```bash
cd leaf-and-grain
npm install
```

Configure the required environment variables in `.env.local` according to your frontend configuration.

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### 3. Set Up the Backend

Open another terminal:

```bash
cd leaf-and-grain-backend
npm install
```

Configure the backend environment variables and database connection according to your project configuration.

Run the backend using the start script defined in its `package.json`.

## 🌐 Deployment

The frontend is deployed on **Render**.

**Live Application:**  
https://leaf-and-grain-n6k8.onrender.com

The repository also includes a `render.yaml` configuration for Render deployment.

For a complete full-stack deployment, configure the backend as a separate service if it is not already deployed, and connect the frontend to its public API URL.

## 🔐 Environment Variables

Do not commit secret keys, passwords, database credentials, or `.env` files to GitHub.

Configure the required variables separately for the frontend and backend.

Refer to your environment configuration and application code for the exact variable names.

## 🚀 Future Improvements

- Online payment gateway integration.
- Order tracking and order history.
- Admin dashboard for menu and order management.
- Improved table reservation management.
- Customer reviews and ratings.
- Enhanced mobile experience.
- Email notifications for reservations and orders.

## 👨‍💻 Developer

**Sayak Pramanik**

B.Tech — Computer Science & Engineering

- GitHub: [@Sayak-P](https://github.com/Sayak-P)
- Project Repository: [Cafe](https://github.com/Sayak-P/Cafe)

---

<p align="center">
  Made with ☕ and ❤️ by Sayak Pramanik
  <br/>
  **Leaf & Grain — Good Coffee. Good Moments.**
</p>
