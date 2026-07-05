<div align="center">

# 🏡 StayNix

### Discover • Stay • Experience

A full-stack property rental platform designed and developed from scratch.

🌐 **Live Demo : ** https://staynix-1p32.onrender.com/

</div>

---

# 1. Project Overview

StayNix is a full-stack web application that allows users to discover properties, publish listings, upload images, write reviews, and securely manage their own content.

The project follows the MVC Architecture and demonstrates CRUD operations, authentication, authorization, image uploads, server-side validation, and responsive UI design.

---

# 2. Tech Stack

<table>
<tr>

<td valign="top" width="33%">

### Frontend

- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- EJS

</td>

<td valign="top" width="33%">

### ⚙️ Backend

- Node.js
- Express.js

</td>

<td valign="top" width="33%">

### 🗄 Database

- MongoDB Atlas
- Mongoose

</td>








<td valign="top" width="33%">

###  Authentication

- Passport.js
- Passport Local
- Express Session

</td>

<td valign="top" width="33%">

### ☁️ Image Upload

- Multer
- Cloudinary

</td>

<td valign="top" width="33%">

### Validation

- Joi
- Custom Middleware

</td>

<td valign="top" width="33%">

### 🚀 Deployment

- Render

</td>

</tr>
</table>

---
# 3. Functionality

<table>

<tr>

<td width="50%" valign="top">

## 👤 Guest

- Browse all listings
- View property details
- Search listings
- Register account
- Login securely

</td>

<td width="50%" valign="top">

## 👨‍💼 Registered User

- Create listings
- Upload images
- Edit own listings
- Delete own listings
- Add reviews
- Delete own reviews
- Logout

</td>

</tr>

</table>

---

# 4. Authentication

<table>

<tr>

<td width="50%" valign="top">

### 🔑 Login

- Username
- Password

</td>

<td width="50%" valign="top">

### 🛡 Security

- Passport.js
- Express Session
- Password Hashing
- Passport Local Mongoose

</td>

</tr>

</table>

---

# 5. Authorization

<table>

<tr>

<td width="33%" valign="top">

### 🏠 Listing Owner

- Edit own listings
- Delete own listings

</td>

<td width="33%" valign="top">

### ⭐ Review Owner

- Delete own reviews

</td>

<td width="33%" valign="top">

### 👀 Guest User

- View listings
- Search listings
- Cannot modify content

</td>

</tr>

</table>

---

# 6. Property Management

<table>

<tr>

<td width="33%" valign="top">

### 🏡 Listings

- View Listings
- Create Listing
- Edit Listing
- Delete Listing
- Search Listings

</td>

<td width="33%" valign="top">

### ⭐ Reviews

- Add Review
- Delete Review
- Average Rating
- Starability Rating

</td>

<td width="33%" valign="top">

### 📷 Images

- Upload Images
- Cloudinary Storage
- Multer Integration

</td>

</tr>

</table>

---

# 7. Project Structure

```text
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

# 8. Key Features

- MVC Architecture
- RESTful Routing
- Authentication & Authorization
- Cloudinary Image Upload
- Responsive Design
- Hero Carousel
- Property Reviews & Ratings
- Search Functionality
- Flash Messages
- Secure Session Management

---

# 9. Installation

```bash
git clone https://github.com/ANANDCHITYALA/StayNix.git
```

```bash
cd StayNix
```

```bash
npm install
```

Create a `.env`

```env
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

---

# 10. Deployment

🌐 Live URL : https://staynix-1p32.onrender.com/

---

# 11. Future Enhancements

- ❤️ Wishlist
- 📅 Booking System
- 📍 Google Maps
- 💳 Online Payments
- 🔔 Notifications
- 🌙 Dark Mode

---

# 12. What I Learned

- MVC Architecture
- REST APIs
- Authentication & Authorization
- Express Middleware
- MongoDB Relationships
- Cloudinary Integration
- Multer File Uploads
- Session Management
- Server-side Validation
- Deployment using Render

---

<div align="center">

# 👨‍💻 Author

**Chityala Anand**

⭐ If you found this project interesting, consider giving it a Star!

</div>
