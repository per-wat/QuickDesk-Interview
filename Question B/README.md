# Simple Ticket System

> This is a simple ticket system with 2 separate view, Customer View and Counter Managment.

This system is built using [React](https://reactjs.org/) for frontend, [ApolloGraphQl](https://www.apollographql.com/docs/apollo-server) for the backend server with [MySql](https://www.mysql.com/) database.

Everything is hosted on [AWS](https://aws.amazon.com/console/), using [EC2](https://aws.amazon.com/ec2/?nc2=h_ql_prod_fs_ec2) for the frontend and backend hosting, and [RDS](https://aws.amazon.com/rds/?nc2=h_ql_prod_fs_rds) for database.

Check out the live [demo](http://13.212.185.195/).

## Local Host

To launch the server locally in your machine, please follow these steps.

1. Inside this directory, run

    ```node
    npm install
    ```

2. Fill in the required info in .env.example for MySQL database and save as ".env"
3. Initialize the database and insert data

    ```node
    sequelize db:migrate
    sequelize db:seed:all
    ```

4. Start the backend server

    ```node
    npm run dev
    ```

5. Now we proceed to the frontend. DON'T CLOSE THE BACKEND

    ```node
    cd client
    npm install
    npm start
    ```

6. Viola! You have made it.
