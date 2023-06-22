Node.js Express API with Prisma, MongoDB, and TypeScript

This repository contains a backend API built with Node.js, Express.js, Prisma, MongoDB, and TypeScript. The API provides CRUD operations for a user module, with different levels of authorization.

Features:
- User module with CRUD operations
- JWT token-based authorization
- Role-based access control
- Request validation using express-validator
- MongoDB as the database
- Prisma as the database ORM
- Written in TypeScript

Prerequisites:
- Node.js (version 18.14.2)

Getting Started:
1. Clone the repository:
   git clone https://github.com/Sarthak-Bhadiyadra/weblight-.git

2. Install dependencies:
   cd your-repo
   npm install

3. Set up the environment variables:
   - Create a .env file in the root directory.
   - Copy the content of .env.example into .env.
   - Provide the necessary values for the environment variables.

4. Start the development server:
   npm run dev
   This will start the API on http://localhost:3000.

API Endpoints:
User Module:
- GET /users - Retrieve a list of users (accessible by both ADMIN and USER).
- POST /login - login (accessible by both ADMIN and USER).
- POST /users - Create a new user (accessible by ADMIN).
- PUT /users/:id - Update a specific user (accessible by ADMIN).
- DELETE /api/users/:id - Delete a specific user (accessible by ADMIN).

Authorization:
- The API uses JWT tokens for authorization.
- Every request (except for creating a new user) must include an Authorization header with a valid JWT token.
- The token can be obtained by signing in with valid credentials and including the token in subsequent requests.

Validation:
- Request validation is performed using express-validator.
- The API validates incoming requests to ensure the required fields are present and have the correct format.

Error Handling:
- Errors are returned in a standardized format, with appropriate HTTP status codes.
- If an error occurs during a request, the API will respond with a JSON object containing an error field.

Contributing:
- Contributions to this project are welcome. To contribute, follow these steps:
  1. Fork the repository.
  2. Create a new branch: git checkout -b my-feature.
  3. Make your changes and commit them: git commit -m 'Add some feature'.
  4. Push to the branch: git push origin my-feature.
  5. Create a pull request.

License:
- This project is licensed under the MIT License.

Acknowledgements:
- Express.js: https://expressjs.com/
- Prisma: https://www.prisma.io/
- MongoDB: https://www.mongodb.com/
- TypeScript: https://www.typescriptlang.org/
- JWT: https://jwt.io/
- express-validator: https://express-validator.github.io/
- dotenv: https://www.npmjs.com/package/dotenv
