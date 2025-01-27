Lavadero API

API for managing a car wash, sending WhatsApp messages using whatsapp-web.js, generating QR codes, and exposing Swagger documentation.

## Prerequisites

- Node.js: Version 20 or higher.
- Docker: Version 20.10 or higher.
- Docker Compose: Version 3.8 or higher.
- PostgreSQL: Running in a container.
- ßRedis: Running in a container.

## Technologies Used

- NestJS: Framework for building robust applications.
- TypeORM: ORM for managing the PostgreSQL database.
- Redis: Used as in-memory storage.
- whatsapp-web.js: For sending WhatsApp messages.
- Swagger: For API documentation.
- PgAdmin: Graphical tool for managing PostgreSQL.

## Installation and Setup

1. Clone the repository

```bash
$ git clone <REPOSITORY_URL>
cd lavadero-api
```

2. Start services with Docker

```bash
docker-compose up --build -d
```

- This will start the following services:
  - API: Available at http://localhost:3000.
  - PgAdmin: Available at http://localhost:5050.
  - Redis: On the configured port.
  - PostgreSQL: On the configured port.

## Using Swagger

Swagger is available at:

http://localhost:3000/api/docs

Use this interface to explore and test the API endpoints.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Key Endpoints

WhatsApp Management

- Send messages to clients.
- Generate and scan QR codes.

Client and Vehicle Management

- Create, update, and delete clients and their vehicles.

Interactive Documentation

- Use Swagger to test API endpoints.

## Common Error Handling

Error: Cannot find module 'dist/main.js'

- Ensure the project is correctly built:

```bash
npm run build
```

Error: getaddrinfo ENOTFOUND database

- Confirm that the PostgreSQL service is running:

```bash
docker-compose ps
```

Error: connect ECONNREFUSED 127.0.0.1:6379

- Confirm that Redis is running on the configured port.

## Contributing

- Fork the repository.
- Create a branch for your new feature or fix.
- Submit a detailed pull request.

## Contact

Created by Andres Wittouck.
Email: andreswittouck@gmail.com
