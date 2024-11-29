
# 🌟 DLA Global - E-Commerce Web App 🌟

Welcome to **DLA Global**, a fully-featured and modern e-commerce web application designed to deliver a seamless shopping experience. Built with the **MERN Stack** and enhanced with **Redux** for state management, DLA Global empowers both users and administrators with powerful functionalities.

---

## 🚀 Features

### 🛒 **Full-Featured Shopping Cart**
- Add, update, or remove products from the cart effortlessly.
- Persistent cart for logged-in users.

### ⭐ **Product Reviews and Ratings**
- Customers can leave reviews and rate products.
- Average rating and review count displayed for each product.

### 🎡 **Top Products Carousel**
- Highlight the most popular and top-rated products on the homepage.

### 🔍 **Product Search**
- Intuitive search bar to find products by name or description.

### 🛠️ **Admin Product Management**
- CRUD operations for product inventory.
- Upload and manage product images seamlessly.

### 👥 **Admin User Management**
- Create, update, and delete user accounts.
- Full control over user access and roles.

### 🛍️ **Streamlined Checkout Process**
- Step-by-step checkout: Shipping → Payment → Order Review.
- Hassle-free purchasing with detailed order summaries.

### 💳 **Secure Payment Integration**
- Integration with **PayPal** and credit cards for secure transactions.

---

## 🛠️ Tech Stack

### 🌐 **Frontend**
- **React.js**: Dynamic and interactive user interfaces.
- **Redux**: Efficient state management.
- **Bootstrap**: Beautiful, responsive design components.

### 🖥️ **Backend**
- **Node.js**: Fast and scalable server-side runtime.
- **Express.js**: Robust framework for API development.
- **MongoDB**: NoSQL database for flexible data storage.

### 🔒 **Security & Tools**
- **JWT (JSON Web Tokens)**: Secure authentication and authorization.
- **Bcrypt.js**: Password hashing for user safety.
- **PayPal API**: Safe and convenient online payment processing.

---

## 📝 Getting Started

### 🧰 **Prerequisites**
Ensure the following are installed:
- **Node.js** (v16+)
- **MongoDB** (local or Atlas)

### ⚙️ **Installation**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/VidithAgarwal/dlaglobal.git
   cd dlaglobal
   ```

2. **Install dependencies**:
   - Backend:
     ```bash
     cd backend
     npm install
     ```
   - Frontend:
     ```bash
     cd ../frontend
     npm install
     ```

3. **Set up environment variables**:
   - Create a `.env` file in the `backend` directory:
     ```env
     NODE_ENV=development
     PORT=5000
     MONGO_URI=your_mongo_uri
     JWT_SECRET=your_jwt_secret
     PAYPAL_CLIENT_ID=your_paypal_client_id
     ```

4. **Run the application**:
   - Start the backend server:
     ```bash
     cd backend
     npm run dev
     ```
   - Start the frontend:
     ```bash
     cd ../frontend
     npm start
     ```

---

## 📸 Preview

### **Homepage**
> Showcase top-rated products with a carousel and featured categories.

### **Product Page**
> Detailed product information, reviews, and add-to-cart functionality.

### **Admin Dashboard**
> Manage products, users, and orders with ease.

---

## ❤️ Contribution
Contributions are welcome! Feel free to open a PR or suggest new features.

---

## 🛡️ License
This project is licensed under the [MIT License](LICENSE).

