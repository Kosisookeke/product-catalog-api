### ✅ Here's a **Professional README.md** for Your Product Catalog API

This README includes:

- Project description
- Features
- Installation instructions
- How to run the code
- API endpoints
- Example requests
- Assumptions & limitations
- Folder structure

---

## 📄 `README.md`

````markdown
# Product Catalog API

A RESTful API for managing a product catalog system with MongoDB, Express.js, and Node.js.  
Supports **products**, **categories**, **search**, **filtering**, **inventory tracking**, and more.

---

## 🧩 Features

- **Product Management**: Create, Read, Update, Delete (CRUD)
- **Category Management**: Organize products under categories
- **Product Variants**: Support for color, size, price, and stock
- **Search & Filtering**:
  - Search by name (`q`)
  - Filter by category (`category`)
- **Inventory Tracking**: Track product and variant stock levels
- **Pricing & Discounts**: Manage product pricing and apply discounts
- **Low Stock Report**: Get a list of low-stock products
- **Swagger Documentation**: Interactive API documentation
- **Input Validation**: Using `Joi`
- **Error Handling & Logging**: Using `winston` and custom middleware

---

## 🧰 Requirements

### 🔧 Tools & Technologies

- Node.js (v18 or higher)
- Express.js
- MongoDB (local or cloud)
- Mongoose (ODM for MongoDB)
- Swagger UI for API documentation
- Joi for input validation
- Winston for logging
- Morgan for HTTP request logging
- Cors & Helmet for security

---

## 📦 Dependencies

### 📥 Install Dependencies

```bash
npm install
```
````

### 📦 Required Packages

```json
"dependencies": {
  "cors": "^2.8.5",
  "dotenv": "^16.0.3",
  "express": "^4.18.2",
  "helmet": "^6.1.2",
  "joi": "^17.9.1",
  "mongoose": "^7.0.3",
  "morgan": "^1.10.0",
  "swagger-ui-express": "^4.18.2",
  "winston": "^3.10.0"
},
"devDependencies": {
  "nodemon": "^2.0.22"
}
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/product-catalog-api.git
cd product-catalog-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/productCatalog
NODE_ENV=development
```

> If using MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string.

### 4. Start MongoDB

For local MongoDB:

```bash
mongod
```

### 5. Run the server in development mode

```bash
npm run dev
```

The server will start at `http://localhost:3000`

---

## 📁 Folder Structure

```
product-catalog-api/
│
├── src/
│   ├── config/            # DB connection, logging
│   ├── controllers/       # Product and category logic
│   ├── models/            # MongoDB schema definitions
│   ├── routes/            # API route definitions
│   ├── middleware/        # Validation and error handling
│   ├── utils/             # Utility functions (e.g., response helpers)
│   ├── swagger/           # Swagger documentation
│   └── app.js             # Express app setup
│
├── .env                   # Environment variables
├── .gitignore
├── package.json
├── README.md
└── server.js              # Entry point
```

---

## 🌐 API Endpoints

All endpoints are under the base path:  
**`http://localhost:3000/api`**

### 📁 Categories

| Method | Endpoint          | Description           |
| ------ | ----------------- | --------------------- |
| POST   | `/categories`     | Create a new category |
| GET    | `/categories`     | Get all categories    |
| GET    | `/categories/:id` | Get category by ID    |
| PUT    | `/categories/:id` | Update category       |
| DELETE | `/categories/:id` | Delete category       |

### 📦 Products

| Method | Endpoint              | Description                 |
| ------ | --------------------- | --------------------------- |
| POST   | `/products`           | Create a new product        |
| GET    | `/products`           | Get all products            |
| GET    | `/products/:id`       | Get product by ID           |
| PUT    | `/products/:id`       | Update product              |
| DELETE | `/products/:id`       | Delete product              |
| GET    | `/products/search`    | Search and filter products  |
| GET    | `/products/low-stock` | Get products with low stock |

---

## 🔍 Example Requests

### 🟢 Create a Category

**POST** `http://localhost:3000/api/categories`

```json
{
  "name": "Electronics",
  "description": "Electronic devices and accessories"
}
```

### 🟢 Create a Product

**POST** `http://localhost:3000/api/products`

```json
{
  "name": "iPhone 15",
  "description": "Apple iPhone 15 Pro",
  "price": 999,
  "stock": 50,
  "category": "64a1b2c3d4e5f6a7b8c9d0e1", // Use category ID from above
  "variants": [
    {
      "color": "Silver",
      "size": "6.1 inches",
      "price": 999,
      "stock": 20
    },
    {
      "color": "Space Gray",
      "size": "6.1 inches",
      "price": 1099,
      "stock": 30
    }
  ],
  "discount": 5
}
```

### 🔍 Search Products

**GET** `http://localhost:3000/api/products/search?q=iphone`

**GET** `http://localhost:3000/api/products/search?category=64a1b2c3d4e5f6a7b8c9d0e1`

---

## 📚 Swagger Documentation

You can view and test all endpoints interactively:

```
http://localhost:3000/api-docs
```

---

## 🛠️ Scripts

| Script        | Description                                         |
| ------------- | --------------------------------------------------- |
| `npm run dev` | Start the server in development mode (with nodemon) |
| `npm start`   | Start the server in production mode                 |

---

## 📋 Logging

Logs are written to:

- `logs/combined.log` – All logs
- `logs/error.log` – Only error logs

---

## 🧪 Testing

I Used **Postman**, to test the API.

---

## 📌 Assumptions

- MongoDB is running locally or on Atlas
- All routes are protected by basic input validation
- Product variants are optional but support price and stock tracking
- Discount is applied as a percentage (0–100)

---

## ⚠️ Limitations

- No authentication or authorization
- No JWT or session-based login
- Basic filtering (can be expanded with more query params)
- No advanced search (e.g., fuzzy search, full-text search)

---
