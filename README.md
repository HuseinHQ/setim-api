# SETIM GAMESTORE API

Welcome to the documentation for Setim Gamestore!.

## Table of Contents
- [Getting Started](#getting-started)
  - [Base URL](#base-url)
- [Endpoints](#endpoints)
  - [1. /register](#1-register)
  - [2. /login](#2-login)
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

## Global Errors
#### Response
- _500 - Internal Server Error_
```json
{
  "message": "Internal Server Error"
}
```