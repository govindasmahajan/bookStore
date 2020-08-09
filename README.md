# Introduction 
Sample Backend service for library or bookstore to lend books to it's users. 

# Build and Test
1. CREATE DATABASE book_store;
2. npm i
3. start the app : npm run start 

If you wish to change the Database configurations then you can pass these as NODE_ENV while starting the application : 
- DB_USER="root" DB_PWD="password@123" DB_NAME="book_store" npm run start
				

# Add Sample Data
 Here {{base_url}} is default "http://localhost:3000" 

- {{base_url}}/data/author-data/
- {{base_url}}/data/publisher-data/
- {{base_url}}/data/book-data/
- {{base_url}}/data/user-data/

# API Details

- List of Users : {{base_url}}/users/get-users/
- List of all books : {{base_url}}/books/get-books/
- Issue a book to specific user : {{base_url}}/books/order-book/
- Book details with available quantity : {{base_url}}/books/book-details
- Return a book & make available for reissue to other users : {{base_url}}/books/return-book/2
- Get all order from last 30 days : {{base_url}}/books/order-history