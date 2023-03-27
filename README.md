# Social-Media-NodeJS-ITI
Social Media NodeJS ITI
Node.js Social Media Project
This project is a social media backend server that allows for user authentication and CRUD operations for users, posts, comments, and reviews. It also includes features such as profile picture uploading and request validation.

## Features

- User model and CRUD operations with role-based authentication (admin, creator, user)
- Post model and CRUD operations
- Comments model and CRUD operations
- Review system where users can create reviews for posts created by creators
- Profile pictures for users with image uploading through Multer and Cloudinary
- API protection for allowed roles
- Retrieval of comments and reviews with each post
- Retrieval of posts with each user
- Protection of sensitive information such as passwords
- Request validation using Joi
- Error handling strategy
- Bonus feature: top 5 rated posts based on highest average reviews using MongoDB aggregation pipelines

## Getting Started


To get started with the project, follow these steps:

## Prerequisites
Make sure you have the following installed on your system:

- Node.js (v14 or later)
- MongoDB
- NPM

## Installing
1-Clone the repository: git clone https://github.com/mahmoudmohamed22/Social-Media-NodeJS-ITI.git

2-Install dependencies: 
```
npm install
```

3-Create .env file and add required environment variables.
```
MONGO_URI=<your MongoDB URI>
JWT_SECRET=<your JWT secret>
CLOUDINARY_CLOUD_NAME=<your Cloudinary cloud name>
CLOUDINARY_API_KEY=<your Cloudinary API key>
CLOUDINARY_API_SECRET=<your Cloudinary API secret>
```

4-Start the server: 

``` 
npm start
```


## Usage
Once the server is running, you can use the following endpoints:

- `/api/user/signup` - POST request to register a new user
- `/api/user/login`- POST request to log in an existing user
- `/api/user` - GET request to retrieve all users (admin role only)
- `/api/user/:id` - GET request to retrieve a single user (admin role only)
- `/api/user/:id` - PUT request to update a user's information (user can update their own information, admin role can update any user)
- `/api/user/:id` - DELETE request to delete a user (admin role only)
- `/api/posts` - GET request to retrieve all posts
- `/api/posts/:id` - GET request to retrieve a single post
- `/api/posts` - POST request to create a new post (creator role only)
- `/api/posts/:id` - PUT request to update a post (creator role only)
- `/api/posts/:id` - DELETE request to delete a post (creator role only)
- `/api/comments` - GET request to retrieve all comments
- `/api/comments/:id` - GET request to retrieve a single comment
- `/api/comments` - POST request to create a new comment
- `/api/comments/:id` - PUT request to update a comment (user can update their own comments, admin role can update any comment)
- `/api/comments/:id` - DELETE request to delete a comment (user can delete their own comments, admin role can delete any comment)
- `/api/reviews` - GET request to retrieve all reviews
- `/api/reviews/:id` - GET request to retrieve a single review
- `/api/reviews` - POST request to create a new review
- `/api/reviews/:id` - PUT request to update a review (user can update their own reviews, admin role can update any review)


