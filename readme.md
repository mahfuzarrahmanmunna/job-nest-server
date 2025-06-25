# 🚀 Freelancing Task Marketplace Server

This is the **backend server** for the Freelancing Task Marketplace web app. It is built using **Node.js**, **Express.js**, and **MongoDB**. The server handles user registration, task posting, task management, and bidding functionalities.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js  
- **Framework**: Express.js  
- **Database**: MongoDB (using `mongodb` native driver)  
- **Other Tools**:  
  - `dotenv` for environment config  
  - `cors` for cross-origin resource sharing  

---

## 🌐 Deployment

**Production URL**: [https://your-production-url.com](https://freelance-task-marketplace-server.vercel.app/)
**Frontend URL**: [https://jobnest-a10.web.app/](https://jobnest-a10.web.app/)

> 🔐 Make sure to create a `.env` file with the following variables:

```env
PORT=3000
DB_USERS=your_db_user
DB_PASS=your_db_password
```

---

## 🔑 API Endpoints

### 👤 Users Endpoints (`/users`)

#### `GET /users`
- 📌 Returns all users

#### `POST /users`
- 📌 Adds a new user  
**Body**:
```json
{
  "name": "User Name",
  "email": "user@example.com"
}
```

#### `PATCH /users`
- 📌 Updates user's last sign-in time  
**Body**:
```json
{
  "email": "user@example.com",
  "lastSignInTime": "2024-06-25T15:00:00Z"
}
```

---

### 📋 Tasks Endpoints (`/tasks-nest`)

#### `GET /tasks-nest`
- 📌 Returns all tasks

#### `GET /tasks-nest/sorted`
- 📌 Returns latest 6 tasks sorted by `formateDate`

#### `GET /tasks-nest/:id`
- 📌 Returns a task by its ID

#### `POST /tasks-nest`
- 📌 Creates a new task  
**Body**:
```json
{
  "title": "Task Title",
  "description": "Details...",
  "formateDate": "2024-06-30"
}
```

#### `PUT /tasks-nest/:id`
- 📌 Updates an existing task completely  
**Body**:
```json
{
  "title": "Updated Title",
  "formateDate": "2024-07-01"
}
```

#### `PATCH /tasks-nest/:id`
- 📌 Updates only `bids` field  
**Body**:
```json
{
  "bids": [
    { "user": "User A", "amount": 200 }
  ]
}
```

#### `DELETE /tasks-nest/:id`
- 📌 Deletes a task by ID

---

## 🚦 Root Endpoint

#### `GET /`
- 📌 Returns server status  
**Response**:
```
Freelancing Task Marketplace Server is running...
```

---

## ✅ Project Features

- Create and manage users
- Post, update, delete, and sort freelance tasks
- Track bids and updates
- Full RESTful API support
- Proper MongoDB indexing and date formatting

---

## 🧪 MongoDB Configuration

Connection string template:
```js
const uri = `mongodb+srv://${process.env.DB_USERS}:${process.env.DB_PASS}@cluster0.xf1yv4o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
```

---

## 🚀 How to Clone & Run Locally

```bash
# Clone the repository
git clone https://github.com/mahfuzarrahmanmunna/job-nest-server.git

# Go into the project directory
cd freelancing-task-backend

# Install dependencies
npm install

# Create a .env file with your MongoDB credentials
PORT=3000
DB_USERS=your_db_user
DB_PASS=your_db_password

# Start the server
node index.js
```

---

## 🔗 Author

- **Md. Mahfuzar Rahman Munna**  
- GitHub: [@mahfuzarrahmanmunna](https://github.com/mahfuzarrahmanmunna)
