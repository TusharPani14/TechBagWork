# TechBag Project

TechBag is a web application developed using React, Express.js, MySQL, Prisma, AWS RDS, and Nodemailer. It provides a user-friendly form to capture customer details and store them in a relational database, while also sending a confirmation email to the customer.

## Running the Project Locally

To run the project locally, follow these steps:

1. Clone the repository:
git clone https://github.com/TusharPani14/TechBagWork.git

2. Navigate to the project's root directory:
cd TechBagWork

3. Install backend dependencies:
cd backend
npm install

4. Create a `.env` file in the backend directory and add the following environment variables:
DATABASE_URL=mysql://root:tusharpani14@localhost:3306/techbag
PORT=5000
EMAILUSER=tusharpanigrahi66@gmail.com
EMAILPASSWORD=oybfacyqeowzauxa
NODE_ENV=development

5. Start the backend server:
cd ..
cd frontend
npm install

7. Create a `.env` file in the frontend directory and add the following environment variable:
REACT_APP_BACKEND_URL=http://localhost:5000

8. Start the frontend development server:
npm run dev

9. Open your browser and visit [http://localhost:3000](http://localhost:3000) to access the TechBag website.

## Tech Stack Used

- React: A JavaScript library for building user interfaces.
- Express.js: A web application framework for Node.js.
- MySQL: A popular open-source relational database management system.
- Prisma: An ORM (Object-Relational Mapping) tool used for database management and querying.
- AWS RDS: Amazon Relational Database Service, a managed database service provided by AWS.
- Nodemailer: A module for Node.js used for sending emails.

