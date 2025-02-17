# COMP3133 Assignment 1 - Employee Management System

## 📌 Project Overview
This is a **GraphQL-based Employee Management System** built using **Node.js, Express, MongoDB, and Apollo Server**. It allows users to perform CRUD operations on employee data through GraphQL queries and mutations.

## 🚀 Setup Instructions
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/lara-alkhatabi/COMP3133_Assignment1.git
cd COMP3133_Assignment1
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root directory and add the following:
```env
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.n72jq.mongodb.net/comp3133_101461068_assignment1?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_secret_key_here
```

### 4️⃣ Start the Server
```sh
npm start
```

Server will start at: **http://localhost:5000/graphql**

## 📌 GraphQL API Endpoints
### Queries
| Query | Description |
|--------|-------------|
| `getAllEmployees` | Fetch all employees |
| `searchEmployeeByEid(id: ID!)` | Get employee details by ID |
| `searchEmployeeByDesignationOrDepartment(designation: String, department: String)` | Search employees by designation or department |
| `login(email: String!, password: String!)` | Authenticate user |

### Mutations
| Mutation | Description |
|-------------|----------------|
| `signup(username: String!, email: String!, password: String!)` | Register a new user |
| `addNewEmployee(first_name: String!, last_name: String!, email: String!, ...)` | Add a new employee |
| `updateEmployeeByEid(id: ID!, first_name: String, ...)` | Update employee details |
| `deleteEmployeeByEid(id: ID!)` | Delete employee by ID |

## 📝 Postman API Collection
1. Open **Postman**.
2. Create a new collection: `COMP3133_Assignment1`.
3. Add requests for queries and mutations.

---
### 📌 **Author**: Lara Alkhatabi
### 📆 **Submission Deadline**: Sunday, 16th Feb 2025, 11:59 PM
---
