
# JobSearchApp

JobSearchApp is a microservices-based job search web application similar to kariyer.net.  
It enables users to search for jobs, apply, and receive notifications, while admins and companies can manage job postings.

---

## Technologies

- Frontend: React.js  
- Backend: Spring Boot Microservices  
- API Gateway: Spring Cloud Gateway (or Node.js alternative)  
- Databases: PostgreSQL (Relational), MongoDB (NoSQL)  
- Messaging Queue: RabbitMQ or Azure Messaging  
- Security: JWT Authentication  
- Cache: Redis or similar distributed caching  
- API Documentation: Swagger (OpenAPI)

---

## Microservices Architecture

The backend consists of several independent microservices:

### 1. Auth Service

Handles user registration, login, and JWT token management.

- `POST /api/v1/auth/register` — Register a new user  
- `POST /api/v1/auth/login` — Authenticate user and receive JWT  
- `GET /api/v1/auth/company-register` — Register a new company 

---

### 2. Admin Service

Allows authorized admins and companies to manage job postings (create, update, delete).

- `POST /api/v1/admin/jobs` — Create job posting  
- `PUT /api/v1/admin/jobs/{id}` — Update job posting  
- `DELETE /api/v1/admin/jobs/{id}` — Delete job posting  
- `GET /api/v1/admin/jobs?userId={userId}` — List job postings, optionally filtered by company userId

---

### 3. Job Posting Service

Manages job postings data and caching.

- `GET /api/v1/jobs` — Get all job postings with pagination and filtering  
- `GET /api/v1/jobs/{id}` — Get job posting details

---

### 4. Search Service

Handles job searches and stores recent searches in NoSQL DB.

- `POST /api/v1/search` — Save a new job search  
- `GET /api/v1/search/user/{userId}` — Get all searches by user  
- `GET /api/v1/search/recent/{userId}` — Get last 5 searches by user  
- `DELETE /api/v1/search/{id}` — Delete a specific search

---

### 5. Notification Service

Manages user notifications and sends job alerts.

- `GET /api/v1/notifications/{userId}` — Get notifications for user  
- Scheduled tasks send alerts based on new job postings and saved user alerts.

---

### 6. AI Agent Service

Provides AI-powered chat functionality to help users search and apply for jobs interactively.

---

### 7. API Gateway

Routes all frontend requests to the appropriate backend microservices.  
Manages CORS, authentication (JWT verification), and request forwarding.

---

## Frontend

- Built with React.js, calling backend APIs via API Gateway  
- Supports job search by position and city (with autocomplete)  
- Shows featured jobs and recent user searches on the home page  
- Allows users to apply for jobs, view job details, and manage saved jobs and alerts  
- Provides admin and company dashboards for job posting management

---

### Databases

- PostgreSQL: Relational data storage for job postings, users, etc.  
- MongoDB: NoSQL DB for storing user job search history.  
- Redis: Distributed cache for job posting data.

### Messaging Queue

- RabbitMQ for queue-based communication (notifications, scheduled tasks).


---

## How to Run Locally

1. Setup and run PostgreSQL, MongoDB, Redis, RabbitMQ locally or via Docker.  
2. Configure each microservice’s `application.properties` with your DB and cache connection details.  
3. Build and run each backend microservice individually (`mvn spring-boot:run`).  
4. Run API Gateway to route requests.  
5. Start React frontend (`npm start`) pointing API calls to the gateway URL.  

---


=======
# JobSearchApp

JobSearchApp is a microservices-based job search web application similar to kariyer.net.  
It enables users to search for jobs, apply, and receive notifications, while admins and companies can manage job postings.

---

## Technologies

- Frontend: React.js  
- Backend: Spring Boot Microservices  
- API Gateway: Spring Cloud Gateway (or Node.js alternative)  
- Databases: PostgreSQL (Relational), MongoDB (NoSQL)  
- Messaging Queue: RabbitMQ or Azure Messaging  
- Security: JWT Authentication  
- Cache: Redis or similar distributed caching  
- API Documentation: Swagger (OpenAPI)

---

## Microservices Architecture

The backend consists of several independent microservices:

### 1. Auth Service

Handles user registration, login, and JWT token management.

- `POST /api/v1/auth/register` — Register a new user  
- `POST /api/v1/auth/login` — Authenticate user and receive JWT  
- `GET /api/v1/auth/company-register` — Register a new company 

---

### 2. Admin Service

Allows authorized admins and companies to manage job postings (create, update, delete).

- `POST /api/v1/admin/jobs` — Create job posting  
- `PUT /api/v1/admin/jobs/{id}` — Update job posting  
- `DELETE /api/v1/admin/jobs/{id}` — Delete job posting  
- `GET /api/v1/admin/jobs?userId={userId}` — List job postings, optionally filtered by company userId

---

### 3. Job Posting Service

Manages job postings data and caching.

- `GET /api/v1/jobs` — Get all job postings with pagination and filtering  
- `GET /api/v1/jobs/{id}` — Get job posting details

---

### 4. Search Service

Handles job searches and stores recent searches in NoSQL DB.

- `POST /api/v1/search` — Save a new job search  
- `GET /api/v1/search/user/{userId}` — Get all searches by user  
- `GET /api/v1/search/recent/{userId}` — Get last 5 searches by user  
- `DELETE /api/v1/search/{id}` — Delete a specific search

---

### 5. Notification Service

Manages user notifications and sends job alerts.

- `GET /api/v1/notifications/{userId}` — Get notifications for user  
- Scheduled tasks send alerts based on new job postings and saved user alerts.

---

### 6. AI Agent Service

Provides AI-powered chat functionality to help users search and apply for jobs interactively.

---

### 7. API Gateway

Routes all frontend requests to the appropriate backend microservices.  
Manages CORS, authentication (JWT verification), and request forwarding.

---

## Frontend

- Built with React.js, calling backend APIs via API Gateway  
- Supports job search by position and city (with autocomplete)  
- Shows featured jobs and recent user searches on the home page  
- Allows users to apply for jobs, view job details, and manage saved jobs and alerts  
- Provides admin and company dashboards for job posting management

---

### Databases

- PostgreSQL: Relational data storage for job postings, users, etc.  
- MongoDB: NoSQL DB for storing user job search history.  
- Redis: Distributed cache for job posting data.

### Messaging Queue

- RabbitMQ for queue-based communication (notifications, scheduled tasks).


---

## How to Run Locally

1. Setup and run PostgreSQL, MongoDB, Redis, RabbitMQ locally or via Docker.  
2. Configure each microservice’s `application.properties` with your DB and cache connection details.  
3. Build and run each backend microservice individually (`mvn spring-boot:run`).  
4. Run API Gateway to route requests.  
5. Start React frontend (`npm start`) pointing API calls to the gateway URL.  

---



