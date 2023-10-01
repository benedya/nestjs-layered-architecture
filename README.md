# [NestJS + Layered (Clean) Architecture + TypeORM + Serverless](https://github.com/benedya/nestjs-layered-architecture)

This is a project template for building NestJS applications with layered architecture (Clean), utilizing TypeORM for database access, and designed for serverless deployment. This template is a starting point for your serverless NestJS projects.

## Features

- **[NestJS Framework](https://nestjs.com/)**: A progressive Node.js framework for building efficient, reliable, and scalable serverless applications.

- **[Layered (Clean) Architecture](https://github.com/benedya/nodejs-layered-architecture)**: The project follows the Clean architecture pattern that separates concerns by dividing the application into concentric layers, with each layer having its responsibilities and dependencies

- **[TypeORM](https://typeorm.io/)**: Integrated with TypeORM for easy database interaction, allowing you to use various database systems like MySQL, PostgreSQL, MongoDB, etc.

- **[Serverless Deployment](https://www.serverless.com/)**: Designed to be deployed on serverless platforms like AWS Lambda, Azure Functions, or Google Cloud Functions.

## Getting Started

1. Clone this repository to your local machine:

```bash
   git clone https://github.com/benedya/nestjs-layered-architecture.git
```
2. Configure your environment variables by creating a `.env` file and populating it with your database connection details and other configuration:
```bash
cd nestjs-layered-architecture
cp .env.example .env
```
3. Run services:
```bash
make up
```
4. Create & run migrations:
```bash
make gsm name=Init
make m
```
5. Your NestJS application is now running locally. You can access it at http://localhost:3001.

## Project Structure
The project is structured as follows:
```
├─ src/
│   ├── ApiGateway
│   ├── Constant
│   ├── Database
│   ├── Helper
│   ├── Lambda
│   ├── Module
│   └── app.module.ts
```

- `ApiGateway`: This directory contains the API endpoints for your NestJS application.

- `Constants`: Here, you store constant values and configurations used throughout the application.

- `Database`: The database directory holds configurations related to database connectivity and setup.

- `Helper`: This directory is meant for utility functions and helper classes that can be used across the application.

- `Lambda`: In this directory, you configure and manage your serverless AWS Lambda functions if you are deploying your application serverlessly on AWS.

- `Module`: The `Module` directory is where the heart of your application resides. It follows the [layered architecture](https://github.com/benedya/nodejs-layered-architecture) pattern to keep the codebase organized:

- `app.module.ts`: The main NestJS application module where you import and configure all your feature modules.

## Contributing
Contributions are warmly encouraged to enhance and extend this template. If you have any ideas, bug fixes, or enhancements, please feel free to open an issue or submit a pull request.

---

Hopefully this example helps you build robust and scalable applications using the power of Clean Architecture. Happy coding! If you have any questions or need assistance, please don't hesitate to reach out.
