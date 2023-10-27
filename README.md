# SETIM GAMESTORE API

Welcome to the documentation for Setim Gamestore!.

## Table of Contents
- [Getting Started](#getting-started)
  - [Base URL](#base-url)
- [Endpoints](#endpoints)
  - [1. /register](#1-register)
  - [2. /login](#2-login)
  - [3. /games](#3-games)
  - [4. /games/:id](#4-games)
  - [5. /libraries](#5-libraries)
  - [6. /generate-midtrans-token](#6-generate-midtrans-token)
- [Global Errors](#global-errors)


## Getting Started

### Base URL

The base URL for all API endpoints is: `http://localhost:3000`

## Endpoints

### 1. /register

#### Endpoint Description

Register a new user.

#### Request

- **Method**: `POST`
- **Endpoint**: `/register`
- **Body**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```

#### Response

- _201 - Created_.
```json
{
  "message": "New user created"
}
```
- _400 - Bad Request_
```json
{
  "message": "Email already taken"
}
  OR
{
  "message": [
    "Username is required",
    "Email is required",
    "Please enter a valid email",
    "Password is required"
  ]
}
```

### 2. /login

#### Endpoint Description

Login into apps.

#### Request

- **Method**: `POST`
- **Endpoint**: `/login`
- **Body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

#### Response

- _200 - OK_.
```json
{
  "access_token": "string"
}
```
- _400 - Bad Request_
```json
{
  "message": "Invalid Username/Password"
}
```

### 3. /games

#### Endpoint Description

Fetch games from database.

#### Request

- **Method**: `GET`
- **Endpoint**: `/games`

#### Response

- _200 - OK_.
```json
[
  {
    "id": Number,
    "cover": [
      {
        "id": Number,
        "height": Number,
        "image_id": String,
        "url": String,
        "width": Number
      }
    ],
    "genres": [
      {
        "id": Number,
        "name": String
      },
      {
        "id": Number,
        "name": String
      },
      {
        "id": Number,
        "name": String
      },
      {
        "id": Number,
        "name": String
      }
    ],
    "name": String,
    "total_rating_count": Number
  },
  ...
]
```

### 4. /games/:id

#### Endpoint Description

Fetch detail games.

#### Request

- **Method**: `GET`
- **Endpoint**: `/games/:id`

#### Response

- _200 - OK_.
```json
[
  {
    "id": Number,
    "cover": [
        {
            "id": Number,
            "height": Number,
            "image_id": String,
            "url": String,
            "width": Number
        }
    ],
    "first_release_date": Number,
    "genres": [
        {
            "id": Number,
            "name": String
        },
        ...
    ],
    "name": String,
    "rating": Number,
    "rating_count": Number,
    "screenshots": [
      {
        "id": Number,
        "height": Number,
        "image_id": String,
        "url": String,
        "width": Number
      },
      ...
    ],
    "storyline": String,
    "summary": String
  }
]
```

### 5. /libraries

#### Endpoint Description

Fetch libraries

#### Request

- **Method**: `GET`
- **Endpoint**: `/libraries`
  **Headers**
  ```json
  {
    "access_token": String
  }
  ```

#### Response

- _200 - OK_.
```json
[
  {
    "id": Number,
    "UserId": Number,
    "GameId": Number,
    "isComplete": Boolean,
    "createdAt": Date,
    "updatedAt": Date,
    "game_detail": {
      "id": Number,
      "cover": {
        "id": Number,
        "url": String
      },
      "genres": [
          {
            "id": Number,
            "name": String
          },
          ...
      ],
      "name": String,
      "summary": String
    }
  },
  ...
]
```

- **Method**: `POST`
- **Endpoint**: `/libraries`
- **Headers**:
  ```json
  {
    "access_token": String
  }
  ```
- **Body**:
  ```json
  {
    "GameId": Number
  }
  ```

#### Response

- _201 - Created_.

```json
{
  "id": Number,
  "UserId": Number,
  "GameId": Number,
  "updatedAt": Date,
  "createdAt": Date,
  "isComplete": Boolean
}
```

### 6. /generate-midtrans-token

#### Endpoint Description

Generate midtrans token

#### Request

- **Method**: `GET`
- **Endpoint**: `/generate-midtrans-token`
  **Headers**
  ```json
  {
    "access_token": String
  }
  ```

#### Response

- _200 - OK_.

```json
{
  "transactionToken": "661dcf11-59b6-4293-8911-f9aa2722b184"
}
```



## Global Errors
#### Response
- _401 - Unauthorized_
```json
{
  "message": "Invalid Token
}
```

- _500 - Internal Server Error_
```json
{
  "message": "Internal Server Error"
}
```