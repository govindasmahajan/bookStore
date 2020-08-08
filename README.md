# Introduction 
Sample Backend service for library or bookstore to lend books to it's users. 

# Getting Started
Create Database: 
- CREATE DATABASE `book_store` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

# Build and Test
1. run command : npm i
2. start the app : npm run start 

If you wish to change the Database configurations then you can pass these as NODE_ENV while starting the application : 
- DB_USER="root" DB_PWD="password@123" DB_NAME="book_store" npm run start
				

# Add Sample Data
 Here {{base_url}} is default "http://localhost:3000" 

- {{base_url}}/data/author-data/
- {{base_url}}/data/publisher-data/
- {{base_url}}/data/book-data/
- {{base_url}}/data/user-data/