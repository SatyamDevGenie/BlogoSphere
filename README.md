## Blog Applicaion Documentation

Create a simple blog application that allows users to create, read, update, and delete (CRUD) blog posts. The application should have a RESTful API built using Node.js and Express.js, and a frontend built using React.

## Features

- User registration and login with JWT authentication
- Get list of latest blogs and trending blogs
- Add blogs
- Update blogs
- Delete blogs
- All blogs

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your system
- MongoDB Atlas

## Getting Started

1. Clone the repository:
2. Install dependencies using npm install in both frontend and backend.
3. Set up your MongoDB database and provide the connection URI in the .env file.
4. Set environment variables for other configurations if needed.
5. Start the server using npm run dev in root folder.

## It starts on http://localhost:3000

## API Endpoints

- http://localhost:5000/api/users           -   Register
- http://localhost:5000/api/users/login     -   Login
- http://localhost:5000/api/users/profile   -   User Profile
- http://localhost:5000/api/blogs           -   All Blogs
- http://localhost:5000/api/blogs/:id       -   Get Single Blog
- http://localhost:5000/api/blogs/:id       -   Update Blog
- http://localhost:5000/api/blogs/:id       -   Delete Blog

## .env File

NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://satyam:123@cluster0.mhmfhbx.mongodb.net/Blogosphere?retryWrites=true&w=majority
JWT_SECRET=satyam

## Frontend

1. It runs on localhost:3000 port.
2. For state management i had used core redux.
3. Chakra UI library for the user interface.
4. The entire application is responsive in mobile devices.



