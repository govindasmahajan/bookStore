# Introduction 
Sample Backend service for library or bookstore to lend books to it's users. 

# Build and Test
1. CREATE DATABASE book_store;
2. npm i
3. start the app : npm run start 

If you wish to change the Database configurations then you can pass these as NODE_ENV while starting the application : 
- DB_USER="root" DB_PWD="password@123" DB_NAME="book_store" npm run start
				

# Add Sample Data
 Below are GET API Calls to load sample data for the application :

- http://localhost:3000/data/author-data/
- http://localhost:3000/data/publisher-data/
- http://localhost:3000/data/book-data/
- http://localhost:3000/data/user-data/

# API Details

- List of Users : http://localhost:3000/users/get-users/
- List of all books : http://localhost:3000/books/get-books/
- Issue a book to specific user : http://localhost:3000/books/order-book/
- Book details with available quantity : http://localhost:3000/books/book-details
- Return a book & make available for reissue to other users : http://localhost:3000/books/return-book/2
- Get all order from last 30 days : http://localhost:3000/books/order-history