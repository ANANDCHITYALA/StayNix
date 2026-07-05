<div align="center">
# 🏡 StayNix
</div>

StayNix is a full-stack property rental platform designed and developed from scratch where users can discover properties, publish listings, upload images, write reviews, and securely manage their own content.

---

# 🎬 Live Demo

live : https://staynix-1p32.onrender.com/

---

# 1. Project Overview

StayNix is a full-stack web application that allows users to list rental properties, browse available accommodations, leave reviews, and manage their own listings through a secure authentication and authorization system.

The project follows the MVC Architecture and demonstrates CRUD operations, user authentication, role-based authorization, image uploads, server-side validation, and responsive UI design.

---

# 2. Tech Stack

### Frontend

- HTML5
- CSS3
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
- Express Session
- Passport Local Mongoose

### Image Upload

- Multer
- Cloudinary

### Validation

- Joi

### Deployment

- Render

---

# 3. Functionality

### Guest

- Browse all available listings
- View property details
- Search properties
- Register a new account
- Login securely

### Registered User

- Create new property listings
- Upload property images
- Edit own listings
- Delete own listings
- Add reviews
- Delete own reviews
- Logout securely

---

# 4. Authentication

Users can securely access the application using:

- Username
- Password

Authentication is implemented using:

- Passport.js
- Passport Local Strategy
- Express Sessions
- Password hashing using Passport Local Mongoose

---

# 5. Authorization

The application enforces ownership-based authorization.

### Listing Owner

Only the creator of a listing can:

- Edit the listing
- Delete the listing

### Review Owner

Only the creator of a review can:

- Delete the review

### Guest User

Guest users can:

- Browse listings
- View listing details

Guest users cannot:

- Create listings
- Add reviews
- Edit or delete any content

---

# 6. Property Management Features

### Listings

- View all property listings
- View detailed listing page
- Create new listing
- Edit existing listing
- Delete listing
- Upload property images
- Search listings by title

### Reviews

- Add reviews
- Delete own reviews
- Star rating system
- Average rating calculation

### Media

- Upload images using Multer
- Store images securely on Cloudinary

---

# 7. Project Structure

The application follows the MVC Architecture.

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

# 8. Key Features

- MVC Architecture
- RESTful Routing
- Authentication using Passport.js
- Authorization Middleware
- Cloudinary Image Uploads
- Multer File Handling
- Server-side Validation using Joi
- Flash Messages
- Search Functionality
- Responsive Design
- Hero Carousel
- Property Reviews & Ratings

---

# 9. Installation

Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/StayNix.git
```

Move into project

```bash
cd StayNix
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
Mongo_URL=

CLOUD_NAME=

CLOUD_API_KEY=

CLOUD_API_SECRET=

SECRET=
```

Start the server

```bash
npm start
```

or

```bash
nodemon app.js
```

Visit

```
http://localhost:3000
```

---

# 10. Deployment

### Live Application

https://staynix-1p32.onrender.com/

---

# 11. Future Enhancements

- Booking System
- Wishlist
- Google Maps Integration
- Payment Gateway
- Categories Filter
- User Dashboard
- Notifications
- Dark Mode

---

# 12. What I Learned

During the development of StayNix, I gained hands-on experience with:

- MVC Architecture
- RESTful APIs
- Authentication & Authorization
- Express Middleware
- MongoDB Relationships
- Cloudinary Integration
- Multer File Uploads
- Session Management
- Server-side Validation
- Deployment using Render

---

# 👨‍💻 Author

**Chityala Anand**

<div align="center">

### ⭐ If you found this project interesting, consider giving it a Star ⭐

</div>
