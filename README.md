# ticket-house
An E-Commerce Web Application with Microservices and Event-Based Architecture <br>

### Technologies Used
Node.js, Express, Typescript for backend of the microservices <br>
React, Next.js for minimalistic front-end and server-side rendering <br>
NATS for event-bus architecture <br>
Docker, Kubernetes for deployment <br>
Bull.js, Redis to manage job queues and store jobs <br>
StripeJS for payments <br>

### Setup
Setup Instructions for Windows <br>
Clone the repository in WSL2 folders <br>
Ensure Docker is running and Kubernetes is enabled <br>
Run the following commands <br>

```
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=random_secret
skaffold dev
```

### Common NPM module
Common NPM module is available at https://www.npmjs.com/package/@tickethouse/common

### REST API's Deployed
#### TICKETS
GET /api/tickets <br>
GET /api/tickets/:id <br>
POST /api/tickets <br>
PUT /api/tickets/:id <br>

#### AUTH
GET /api/users/currentUser <br>
POST /api/users/signup <br>
POST /api/users/signin <br>
POST /api/users/signout <br>
 
#### ORDERS
GET /api/orders <br>
GET /api/orders/:id <br>
POST /api/orders <br>
DELETE /api/orders/:id <br>

#### PAYMENTS
POST /api/payments <br>


