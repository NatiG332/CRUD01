# CRUD01
Assigment fOR web

 Movies REST API (Node.js - No Express)

A simple CRUD REST API built using **Node.js core modules (http + fs)** with file-based storage.

 Features

* Get all movies
* Get a movie by ID
* Add a new movie
* Update a movie by ID
* Delete a movie by ID
* JSON file-based storage (`movies.json`)
 Technologies Used

* Node.js (Core modules only)
* HTTP module
* File System (fs)
* JSON file storage

 Project Structure

```
CRUD-REST-API/
│
├── server.js        # Main server file (API logic)
├── movies.json      # Data storage file
└── README.md        # Documentation
```

 How to Run the Project

### 1. Install Node.js

Make sure Node.js is installed:

```bash
node -v
```

---

### 2. Run the server

```bash
node server.js
```

---

### 3. Server will start on:

```
http://localhost:3000
```
API Endpoints

 Get all movies

```
GET /movies
```

**Response:**

```json
[
  {
    "id": 1,
    "title": "Inception",
    "year": 2010
  }
]
```

Get movie by ID

```
GET /movies/:id
```

Example:

```
GET /movies/1
```

**Response:**

```json
{
  "id": 1,
  "title": "Inception",
  "year": 2010
}
```

 Add new movie

```
POST /movies
```

**Body (JSON):**

```json
{
  "title": "Interstellar",
  "year": 2014
}
```

**Response:**

```json
{
  "message": "Movie added successfully",
  "movie": {
    "id": 2,
    "title": "Interstellar",
    "year": 2014
  }
}
```
 Update movie

```
PUT /movies/:id
```

**Body (JSON):**

```json
{
  "title": "Updated Movie",
  "year": 2020
}
```

**Response:**

```json
{
  "message": "Movie updated successfully",
  "movie": {
    "id": 1,
    "title": "Updated Movie",
    "year": 2020
  }
}
```

 Delete movie

```
DELETE /movies/:id
```

**Response:**

```json
{
  "message": "Movie deleted successfully"
}
```

 How to Test (Postman Guide)

### 1. Open Postman

### 2. Use base URL:

```
http://localhost:3000
```

### 3. Test routes:

* GET → `/movies`
* GET → `/movies/1`
* POST → `/movies`
* PUT → `/movies/1`
* DELETE → `/movies/1`



