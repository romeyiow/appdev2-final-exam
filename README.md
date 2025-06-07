# 🚀 Event Management REST API

## 📌 Introduction

This project is an Event Management REST API built with Node.js, Express, and MongoDB. It allows users to authenticate and manage events. Authenticated users can create new events and view their own events, while a public endpoint is available for anyone to view all upcoming events. The API features JWT-based authentication and sends email notifications upon event creation using Nodemailer and Pug templates.

## 🔗 Live Demo

You can access the deployed API here: [**https://appdev2-final-exam-curu.onrender.com**](https://appdev2-final-exam-curu.onrender.com)

---

## 🛠️ Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens (JWT)
- **Emailing:** Nodemailer, Pug (for HTML templates)
- **Data Seeding:** Faker.js
- **Deployment:** Render, MongoDB Atlas

---

## ⚙️ How to Run the Project Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/romeyiow/appdev2-final-exam.git
    cd appdev2-final-exam
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the variables from `.env.example`.
    ```bash
    cp .env.example .env
    ```
    Update the `.env` file with your local configuration (e.g., local MongoDB URI, JWT secret, email credentials).

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:5000` (or the port you specified).

---

## 🧪 How to Run the Seeder

The seeder script populates the database with fake users and events for testing purposes.

-   **To seed the database (clears existing data first):**
    ```bash
    npm run seed
    ```
    This will create 5 users (password: `secret123`) and 10 events linked to them.

-   **To clear all data from the database:**
    ```bash
    npm run seed:destroy
    ```

---

## 📋 `.env.example`

This file lists all the necessary environment variables to run the application.

```ini
PORT=5000
MONGODB_URI=your_mongodb_uri_here
JWT_SECRET=your_jwt_secret_here
EMAIL_USER=your_email_here
EMAIL_PASS=your_email_password_here
EMAIL_HOST=your_email_host
EMAIL_PORT=your_email_port