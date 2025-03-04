Sure! Here's a **README.md** template for your project. This README includes essential sections like project setup, usage, and functionality.

---

# **Note-taking API with User Authentication**

This is a simple **Note-taking API** built with **Koa.js**, providing authentication and basic CRUD operations for managing notes. The data is persisted on the local file system, making use of a simple **JSON file** as a database.

---

## **Table of Contents**

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Sign Up](#sign-up)
  - [Sign In](#sign-in)
  - [Notes Endpoints](#notes-endpoints)
  - [Private Data](#private-data)
- [Validation](#validation)

---

## **Installation**

1. **Clone the repository**:

   ```bash
   git clone https://github.com/kyordanov-intellias/task-5.git
   cd task-5
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create a `.env` file for configuration** (Optional if you're using a configuration file):

   - Add your JWT secret and server port to the `.env` file:

     ```plaintext
     PORT=3000
     ```

4. **Run the app**:

   ```bash
   npm run dev
   ```

   The application will be running on `http://localhost:3000`.

---

## **Usage**

This API allows users to sign up, sign in, manage their notes, and access private data. Notes are stored locally in a file called `db.json`. Authentication is done via **JWT tokens**, and data validation is handled using **Ajv**.

---

## **API Endpoints**

### **Sign Up**

- **POST** `/users/signup`
- Request Body:
  ```json
  {
    "email": "user@example.com",
    "name": "John Doe",
    "password": "password123"
  }
  ```
- Response:
  ```json
  {
    "message": "User created",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "password": "password123"
    }
  }
  ```

### **Sign In**

- **POST** `/users/signin`
- Request Body:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- Response:
  ```json
  {
    "token": "your-jwt-token"
  }
  ```

### **Notes Endpoints**

#### **Create a Note**

- **POST** `/notes`
- **Authorization**: Bearer JWT token
- Request Body:
  ```json
  {
    "title": "Meeting Notes",
    "content": "Discuss project updates."
  }
  ```
- Response:
  ```json
  {
    "message": "Note created",
    "note": {
      "id": "uuid",
      "userId": "user-uuid",
      "title": "Meeting Notes",
      "content": "Discuss project updates.",
      "createdAt": "2024-03-04T12:34:56Z"
    }
  }
  ```

#### **Get All Notes**

- **GET** `/notes`
- **Authorization**: Bearer JWT token
- Response:
  ```json
  {
    "notes": [
      {
        "id": "uuid",
        "userId": "user-uuid",
        "title": "Meeting Notes",
        "content": "Discuss project updates.",
        "createdAt": "2024-03-04T12:34:56Z"
      }
    ]
  }
  ```

#### **Get a Single Note**

- **GET** `/notes/:id`
- **Authorization**: Bearer JWT token
- Response:
  ```json
  {
    "note": {
      "id": "uuid",
      "userId": "user-uuid",
      "title": "Meeting Notes",
      "content": "Discuss project updates.",
      "createdAt": "2024-03-04T12:34:56Z"
    }
  }
  ```

#### **Update a Note**

- **PUT** `/notes/:id`
- **Authorization**: Bearer JWT token
- Request Body:
  ```json
  {
    "title": "Updated Meeting Notes",
    "content": "New project updates."
  }
  ```
- Response:
  ```json
  {
    "message": "Note updated",
    "note": {
      "id": "uuid",
      "userId": "user-uuid",
      "title": "Updated Meeting Notes",
      "content": "New project updates.",
      "createdAt": "2024-03-04T12:34:56Z"
    }
  }
  ```

#### **Delete a Note**

- **DELETE** `/notes/:id`
- **Authorization**: Bearer JWT token
- Response:
  ```json
  {
    "message": "Note deleted"
  }
  ```

### **Private Data**

- **GET** `/private/data`
- **Authorization**: Bearer JWT token
- Response:
  ```json
  {
    "message": "This is private data"
  }
  ```

---

## **Validation**

- The API uses **Ajv** for data validation to ensure that the user’s input is in the correct format.
- For **user sign-up**, validation is done on fields like `email`, `name`, and `password`.
- For **note creation and update**, it ensures `title` and `content` are provided and not empty.

---

## **Testing with Postman**

You can test this API using Postman. Here's how to set up requests:

1. **Sign Up**: Make a `POST` request to `/users/signup` with JSON body.
2. **Sign In**: Make a `POST` request to `/users/signin` with `email` and `password`, and get the JWT token.
3. **Access Notes**: Make `GET`, `POST`, `PUT`, or `DELETE` requests to `/notes` using the JWT token in the Authorization header.

---

### **End of README**

Let me know if you need further adjustments! 😊
