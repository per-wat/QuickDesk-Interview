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