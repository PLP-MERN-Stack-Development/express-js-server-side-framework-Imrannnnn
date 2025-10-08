# Express.js Product API

A RESTful API for managing products, built with Express.js. Features CRUD operations, middleware, error handling, filtering, pagination, and search.

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or higher
- npm
- (Optional) MongoDB if using a database

### Installation

1. Clone your repository:
   ```sh
   git clone <your-repo-url>
   cd express-js-server-side-framework-Imrannnnn
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your environment variables.

### Running the Server

```sh
npm start
```
Server runs at `http://localhost:3000` by default.

---

## 🛠️ Environment Variables

Create a `.env` file based on `.env.example`:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/productsdb
API_KEY=mysecretkey123
```

---

## 📦 API Endpoints

All endpoints require the header:  
`x-api-key: <your-api-key>`

### Product CRUD

- **GET /api/products**  
  List all products. Supports `category`, `page`, and `limit` query parameters.

- **GET /api/products/:id**  
  Get a product by its ID.

- **POST /api/products**  
  Create a new product.  
  **Body:**
  ```json
  {
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 1200,
    "category": "electronics",
    "inStock": true
  }
  ```

- **PUT /api/products/:id**  
  Update a product by ID.

- **DELETE /api/products/:id**  
  Delete a product by ID.

### Advanced Features

- **GET /api/products/search/by-name?name=term**  
  Search products by name.

- **GET /api/products/stats/by-category**  
  Get product count grouped by category.

---

## 🧪 Example Requests

**Create a Product**
```sh
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "x-api-key: mysecretkey123" \
  -d '{"name":"Laptop","description":"High-performance laptop","price":1200,"category":"electronics","inStock":true}'
```

**Get All Products (with pagination)**
```sh
curl -X GET "http://localhost:3000/api/products?page=1&limit=10" \
  -H "x-api-key: mysecretkey123"
```

**Search by Name**
```sh
curl -X GET "http://localhost:3000/api/products/search/by-name?name=laptop" \
  -H "x-api-key: mysecretkey123"
```

---

## 🧩 Project Structure

```
server.js
.env.example
README.md
src/
  config/db.js
  customErrors.js
  middleware/
    auth.js
    errorHandler.js
    logger.js
    validateProduct.js
  models/
    product.js
  routes/
    productRoutes.js
```

---

## 🛡️ Middleware

- **Logger:** Logs request method, URL, and timestamp.
- **Authentication:** Checks for valid API key.
- **Validation:** Validates product data.
- **Error Handling:** Handles errors and sends appropriate responses.

---

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [RESTful API Design](https://restfulapi.net/)

---

## 📝 License

ISC
