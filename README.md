E-Learning Backend
A Node.js backend for an e-learning platform with user authentication, course management, and real-time messaging. Supports English and Arabic.
Setup

Install Node.js and MongoDB: Download from Node.js and MongoDB.
Clone the repo: git clone <repo-url>
Install dependencies: npm install
Create .env file:MONGO_URI=mongodb://localhost:27017/elearning
JWT_SECRET=your-secure-secret-key
NODE_ENV=development
PORT=4000


Run seeders: npm run seed
Start server: npm start
Run tests: npm test

Features

JWT Authentication: Secure login with HttpOnly cookies.
MongoDB: Stores data with Mongoose.
WebSocket Messaging: Real-time chat.
Languages: English and Arabic support.
Security: CORS, rate limiting, XSS protection.
Testing: Unit tests with Chai/Mocha.
Seeders: Initial data setup.

Project Structure

config/: Database and i18n setup.
models/: MongoDB schemas.
controllers/: Business logic.
routes/: API endpoints.
middleware/: Authentication and validation.
helpers/: Response and logging utilities.
seeders/: Initial data scripts.
tests/: Unit tests.
enums/: Constants for roles, statuses, etc.
schemas/: Joi validation schemas.
socket/: WebSocket setup.
locales/: Translation files.

Notes

Ensure MongoDB is running before starting the server.
Use a secure JWT_SECRET in production.
Deploy on platforms like Heroku or AWS.

