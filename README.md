# E-Commerce Microservices Application

This project is an e-commerce application built using a microservices architecture with NestJS, RabbitMQ, Prisma, and PostgreSQL. The system is designed to be scalable, fault-tolerant, and easily maintainable, leveraging CQRS and Domain-Driven Design (DDD) principles.

### Note

- This is just my hobbies not recommended for production
- Just learning from youtube
- Sorry if the code is "amburadul" 😂😂😂
- This is prove that people like me can make this kind of shit 🔥🔥🔥, even i don't have an it degree . So please hire me 😊😊😊

### To-Do List

- Backend :
  - [x] User management
  - [x] Auth management
  - [x] Product management
  - [x] Inventory management
  - [x] Cart management
  - [x] Order management
  - [x] Billing management
- Frontend :
  - [ ] Initial setup

## **Table of Contents**

- [Features](#features)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## **Features**

- **Microservices Architecture**: Modular services for authentication, products, orders, and more.
- **Message Broker**: RabbitMQ for asynchronous communication between services.
- **API Gateway**: Acts as a single entry point for all client requests, with load balancing capabilities.
- **Scalable**: Horizontal scaling of services with Docker.
- **PostgreSQL Database**: Managed using Prisma ORM.
- **Secure**: JWT-based authentication and role-based access control.

## **Architecture**

The application consists of multiple microservices:

- **API Gateway**: Routes incoming requests to the appropriate service.
- **Auth Service**: Manages user registration, login, and authentication.
- **Product Service**: Handles product management, including CRUD operations.
- **Order Service**: Manages orders and inventory status.
- **Cart Service**: Manages cart.
- **User Service**: Manages users and profiles.
- **Billing Service**: Manages billing and payment gateways.
- **RabbitMQ**: Facilitates communication between services.
- **PostgreSQL**: Stores all application data.

## **Technology Stack**

- **NestJS**: Backend framework for building scalable and maintainable server-side applications.
- **RabbitMQ**: Message broker for communication between microservices.
- **Prisma**: ORM for managing PostgreSQL databases.
- **PostgreSQL**: Relational database for storing data.
- **Docker**: Containerization of services for easy deployment and scaling.
- **Cloudinary**: Storage for store images such as product-images, profile-pictures , etc.
- **Midtrans**: as Payment gateways.

## **Getting Started**

### **Prerequisites**

- Node.js v16 or later
- Docker and Docker Compose
- PostgreSQL

### **Environment Variables**

Configure your environment variables in the `.env` files located in the root and each microservice directory.

**Example `.env` file:**

```dotenv
# Root .env
DATABASE_URL="postgresql://postgres:password@localhost:5432/e-commerce?schema=public"

BASE_URL="http://localhost:4000"

EMAIL_ADMIN="your-email-admin"
MAIL_HOST="your-email-host"
SMTP_USERNAME="your-username-host"
SMTP_PASSWORD="your-password-host"

CLOUDINARY_NAME="your-cloudinary-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-secret"
CLOUDINARY_URL="your-cloudinary-url"
```

```dotenv
# Microservices .env
RABBIT_MQ_URI="amqp://localhost:5672"
RABBIT_MQ_AUTH_QUEUE="auth_queue"
RABBIT_MQ_USER_QUEUE="user_queue"
RABBIT_MQ_PRODUCT_QUEUE="product_queue"
RABBIT_MQ_INVENTORY_QUEUE="inventory_queue"
RABBIT_MQ_CART_QUEUE="cart_queue"
RABBIT_MQ_ORDER_QUEUE="order_queue"

ACCESS_TOKEN_SECRET="your-access-token-secret"
REFRESH_TOKEN_SECRET="your-refresh-token-secret"
JWT_EXPIRATION=3600

VERIFY_TOKEN_SECRET="your-verify-token-secret"

MIDTRANS_MERCHANT_ID="your-midtrans-merchanr-id"
MIDTRANS_CLIENT_KEY="your-midtrans-client-key"
MIDTRANS_SERVER_KEY="your-miodtrans-server-key"
MIDTRANS_MODE="production/sandbox"
```

### **Installation**

Clone the repository:

```bash
git clone https://github.com/shelllbyyyyyy/e-commerce.git

cd e-commerce
```

## **Running the Application**

Start Services: Use Docker Compose to start all services.

```bash
docker-compose up --build
```

Access the API Gateway: The gateway will be available at http://localhost:4000.

## **Usage**

Register a User: Use the /api/auth/register endpoint via the gateway to register new users.
Login: Authenticate using the /api/auth/login endpoint.
Manage Products: Use the /api/products endpoints to manage product data.

## **API Documentation**

The Swagger documentation for the API can be accessed at:

Gateway Swagger: http://localhost:4000/api/docs

## **Deployment**

Build Docker Images:

- For development:

```bash
docker-compose -f docker-compose.yml up --build
```

- Deploy to Production:

```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

## **Contributing**

Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Commit your changes (git commit -m 'Add new feature').
Push to the branch (git push origin feature-branch).
Open a Pull Request.

## **License**

This project is licensed under the MIT License.
