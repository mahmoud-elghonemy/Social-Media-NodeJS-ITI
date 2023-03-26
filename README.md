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




