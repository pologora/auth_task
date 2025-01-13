# Auth & users REST API

## Content

1. [Technical Requirements](#technical-requirements)
2. [Installation](#installation)
3. [Running the Application](#running-the-application)
4. [Running tests](#running-tests)
5. [Database Schema](#database-schema)
6. [Security](#security)
7. [API Documentation](#api-documentation)

## Technical requirements

- Programming language - `Typescript`
- API development - `Node.js` with `Express`
- Database - `MongoDB` with `Mongoose`

## Installation

### Clone the Project

```bash
git clone https://github.com/pologora/auth_task.git
```

### Install dependencies

```Bash
npm install
```

## Running the Application

### Docker Setup

1. **Install docker:** Ensure Docker is installed on your machine. You can follow the installation instructions on [the official Docker website](https://www.docker.com/).

2. **Configuration:**

- Rename `env.dev.example` to `.env.dev`.
- Rename `env.prod.example` to `.env.prod.` Ensure all necessary variables are set for the application to function properly in the production environment.

### Development Enviroment

The difference between enviroments is that **error messages** are user friendly in production mode, while they provide full error information in development mode.

To run the application in development mode:

```Bash
npm run start:dev
```

The application will be accessible at `http://localhost:3000/api/v1`

### Production Enviroment

To run the application in production mode:

```Bash
npm run start:prod
```

The application will be accessible at `http://localhost:3000/api/v1`

## Database Schema

- **User**:

  - `email` String Unique required,
  - `firstName` String,
  - `lastName` String,
  - `password` String required,
  - `role` String enum ('admin', 'user') required,
  - `failedLoginAttempts` Number default 0,
  - `lockUntil` Date

## Security

The following security measures have been implemented:

- Passwords are encrypted
- Rate limiting is enforced
- JWT is stored in cookies
- Failed login attempts are limited. After multiple unsuccessful attempts, the account will be temporarily blocked for a limited period
- Security headers are configured with `Helmet`
- User-supplied data is sanitized to prevent MongoDB Operator Injection
- Body payload size is limited
- All incoming data is validated before processing

## Api documentation

The API documentation is generated using Swagger and is accessible when the server is running at the following URL:

```bash
http://localhost:3000/api/v1/api-docs
```
