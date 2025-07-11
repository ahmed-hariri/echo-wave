# EchoWave API

## Description
This project is an API built with Express.js and MongoDB for building a chat application.  
It includes various middleware such as JWT authentication, Helmet, and validation middlewares for security and reliability. The API allows users to manage authentication, profiles, conversations, messages, and contacts efficiently.

## Features and Optimizations

### Performance Optimizations
- **Optimized Queries:** Uses lean queries and selective fields in Mongoose to enhance performance.
- **Indexes:** MongoDB indexes improve the speed of frequent searches (e.g. phone numbers).

### Main Features
- **User Authentication:** Secure registration and login with JWT tokens.
- **User Profile:** Allows updating profile information like bio and profile picture.
- **Conversations:** Create, list, and delete personal or group conversations.
- **Messages:** Create, edit, delete, and list messages within conversations.
- **Contacts Management:** Add, list, and delete user contacts.
- **Swagger Documentation:** Interactive API docs for testing endpoints.

### Security and Middleware
- **JWT Authentication:** Secures routes and validates user identity.
- **Helmet:** Enhances security by setting HTTP headers.
- **CORS:** Enables or restricts cross-origin requests.
- **Validation Middleware:** Checks required fields to prevent invalid data.
- **Error Handling:** Centralized error management for consistent responses.

## Prerequisites
Before starting, make sure you have:
- [Node.js](https://nodejs.org/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or a local MongoDB installation

## Installation

### Back-End

1. Clone the project:
   ```bash
   git clone https://github.com/your-username/chat-app-api.git
   cd chat-app-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file at the project root and add:
   ```
   PORT=5000
   MONGO_URL=mongodb://localhost:27017/chat-app
   JWT_SECRET=your_jwt_secret
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. The back-end server will be running at:
   ```
   http://localhost:5000
   ```

## Main Dependencies

- **Express.js:** Web framework for Node.js.
- **MongoDB:** Database to store user, message, and conversation data.
- **Mongoose:** ODM for MongoDB to simplify database operations.
- **jsonwebtoken:** Handles JWT creation and verification.
- **Helmet:** Secures HTTP headers.
- **CORS:** Handles cross-origin requests.
- **Swagger:** Generates interactive API documentation.
- **Cookie Parser:** Parses cookies for session handling.

## Running the Application

To run the app in development mode:
```bash
npm run dev
```

To run in production:
```bash
npm run build
npm start
```

## API Documentation

Once the server is running, visit:
```
http://localhost:5000/api-docs
```
to view the Swagger interactive API documentation.

## API Endpoints

### Auth

- `POST /auth/register` → Register a new user
- `POST /auth/login` → Login a user and receive a token

### Conversations

- `GET /api/conversations` → Fetch all conversations for the authenticated user
- `POST /api/conversation` → Create a new conversation
- `DELETE /api/conversation/:id` → Delete a conversation by ID

### Messages

- `GET /api/messages/:conversationId` → Get all messages for a conversation
- `POST /api/message` → Add a new message to a conversation
- `PUT /api/message/:id` → Update a message by ID
- `DELETE /api/message/:id` → Delete a message by ID

### Contacts

- `GET /api/contacts` → Get all user contacts
- `POST /api/contacts` → Add a new contact by phone number
- `DELETE /api/contacts/:id` → Delete a contact by ID

### Profile

- `GET /api/profile/:id` → Get user profile info
- `PUT /api/profile/:id` → Update user profile info

## Testing

### End-to-End (E2E) Testing
- Future improvements include E2E tests to ensure the entire system behaves as expected.

### Unit Testing
- Unit tests verify the correctness of individual functions and components.

Tests will help guarantee the API’s reliability, security, and performance.

---
