# Healthcare Management Backend API

## Features

-  User Authentication (Register/Login) with AccessToken & RefreshToken
-  Manage Patients (CRUD)
-  Manage Doctors (CRUD)
-  Map Patients with Doctors
-  Prisma ORM for PostgreSQL interaction
-  Global Error Handling with custom responses
-  Logging using Winston & Morgan
-  Scalable Folder Structure (MVC + Service)

---

## Tech Stack

| Layer           | Technology                     |
|----------------|----------------------------------|
| Runtime        | Node.js                         |
| Framework      | Express.js                      |
| Database       | PostgreSQL                      |
| ORM            | Prisma ORM                      |
| Auth           | JWT(AccessToken & RefreshToken) + bcrypt                    |
| Logging        | Winston + Morgan                |
| Error Handling | Custom Middleware + Response Wrappers |


## Environment Variables

Create a `.env` file in the root with:

PORT=5000
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/healthcare
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development


- git clone https://github.com/munnukumar/HealthCare.git
- cd healthcare-api

- npm install

- npx prisma migrate dev --name init
- npx prisma generate

- npm start
