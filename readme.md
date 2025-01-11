# Auth & users REST API

## Content

1. [Technical Requirements](#technical-requirements)
2. [Installation](#installation)
3. [Running the Application](#running-the-application)
4. [Running tests](#running-tests)
5. [Database Schema](#database-schema-design)
6. [Security](#security)
7. [API Documentation](#api-documentation)

   - [Authentication](#authentication)

     - [Login](#login)
     - [Register](#register)
     - [Get Me](#get-me)
     - [Forgot Password](#forgot-password)
     - [Reset Password](#reset-password)
     - [Change My Password](#change-my-password)
     - [Delete Me](#delete-me)
     - [Logout](#logout)

   - [Users](#users)

     - [Create User](#create-user)
     - [Get Many Users](#get-many-users)
     - [Get User By ID](#get-user-by-id)
     - [Update User](#update-user)
     - [Delete User](#delete-user)

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

- Rename `env.dev.example` to `.env.dev` and adjust the variables as needed.
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
  - `resetPasswordToken` String,
  - `resetPasswordTokenExpiration` Date,
  - `passwordChangedAt` Date,
  - `failedLoginAttempts` Number default 0,
  - `lockUntil` Date

## Security

The following security measures have been implemented:

- Encrypted passwords and reset password tokens
- Rate limiting
- JWT stored in cookies
- Denial of access after password change
- Security headers with `Helmet`
- Sanitizes user-supplied data to prevent MongoDB Operator Injection
