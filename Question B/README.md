# Simple Ticket System

This is a simple ticket system with 2 separate view, Customer View and Counter Managment.

If you want to try it yourself, you can follow the instrucion below for demo.

### Local Host

To launch the server locally in your machine, please follow these steps.

1. Inside this directory, run
```
npm install
```
2. Fill in the required info in .env.example for MySQL database and save as ".env"
3. Initialize the database and insert data
```
sequelize db:migrate
sequelize db:seed:all
```
4. Start the backend server
```
npm run dev
```
5. Now we proceed to the frontend. DON'T CLOSE THE BACKEND
```
cd client
npm install
npm start
```
6. Viola! You have made it.
