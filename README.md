# ticket-house
An E-Commerce Web Application with Microservices and Event-Based Architecture

### Technologies Used
Node.js, Express, Typescript for backend of the microservices <br>
React, Next.js for minimalistic front-end and server-side rendering
NATS for event-bus architecture
Docker, Kubernetes for deployment
Bull.js, Redis to manage job queues and store jobs
StripeJS for payments

### Setup
Setup Instructions for Windows
Clone the repository in WSL2 folders
Ensure Docker is running and Kubernetes is enabled
Run the following commands

```
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=random_secret
skaffold dev
```

### Common NPM module
Common NPM module is available at https://www.npmjs.com/package/@tickethouse/common

### REST API's Deployed
#### TICKETS
GET /api/tickets
GET /api/tickets/:id
POST /api/tickets
PUT /api/tickets/:id

#### AUTH
GET /api/users/currentUser
POST /api/users/signup
POST /api/users/signin
POST /api/users/signout

#### ORDERS
GET /api/orders
GET /api/orders/:id
POST /api/orders
DELETE /api/orders/:id

#### PAYMENTS
POST /api/payments


