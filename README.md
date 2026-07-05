# 🏡 StayNix

StayNix is a full-stack property rental and accommodation platform that I designed and developed from scratch using modern web technologies.

The application allows users to discover, publish, manage, and review properties through a secure and responsive web interface. It follows the MVC architecture and implements authentication, authorization, image uploads, server-side validation, and responsive design.

---

## 🚀 Live Demo

https://staynix-1p32.onrender.com/

---

# ✨ Features

## 🔐 Authentication

- User Registration
- User Login
- Secure Password Hashing
- Session Management using Passport.js

---

## 👤 Authorization

- Only authenticated users can create listings
- Listing owners can edit and delete only their own listings
- Review owners can delete only their own reviews

---

## 🏠 Property Listings

- Create Listings
- Edit Listings
- Delete Listings
- Search Listings
- Image Uploads
- Responsive Listing Pages

---

## ⭐ Reviews & Ratings

- Add Reviews
- Delete Reviews
- Star Rating System
- Average Rating Display

---

## 📷 Media Upload

- Multer
- Cloudinary Integration

---

## 🛡 Validation

- Joi Validation
- Custom Error Handling
- Server-side Validation

---

## 🧩 Project Architecture

- MVC Architecture
- RESTful Routing
- Express Middleware
- Modular Folder Structure

---

# 🛠 Tech Stack

### Frontend

- HTML
- CSS
- Bootstrap 5
- JavaScript
- EJS

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas
- Mongoose

### Authentication

- Passport.js
- Passport Local
- Express Session

### Cloud Storage

- Cloudinary
- Multer

### Validation

- Joi

### Deployment

- Render

---

# 📂 Folder Structure

```
StayNix
│
├── config
├── controllers
├── middlewares
├── models
├── public
├── routes
├── utils
├── views
├── app.js
└── package.json
```

---

# 💻 Installation

```bash
git clone https://github.com/YOUR_USERNAME/StayNix.git
```

```bash
cd StayNix
```

```bash
npm install
```

Create a `.env`

```
Mongo_URL=
CLOUD_NAME=
CLOUD_API_KEY=
CLOUD_API_SECRET=
SECRET=
```

Run

```bash
npm start
```

or

```bash
nodemon app.js
```

---

# 🚀 Future Improvements

- Booking System
- Wishlist
- Google Maps Integration
- Payment Gateway
- Categories
- Notifications
- User Dashboard

---

# 👨‍💻 Developed By

**Chityala Anand**
