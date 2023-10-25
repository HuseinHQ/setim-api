function errorHandler(err, req, res, next) {
  console.log(err, "<<<<<<<<<<<<<<");
  let status = 500;
  let message = "Internal Server Error";

  if (err.name === "SequelizeUniqueConstraintError") {
    status = 400;
    message = "Email already taken";
  } else if (err.name === "SequelizeValidationError") {
    status = 400;
    message = err.errors[0].message;
  } else if (err.name === "invalid_username_password") {
    status = 401;
    message = "Invalid Username/Password";
  } else if (err.name === "game_not_found") {
    status = 404;
    message = "Game not found!";
  } else if (err.name === "JsonWebTokenError") {
    status = 401;
    message = "Invalid Token";
  } else if (err.name === "user_not_found") {
    status = 404;
    message = "User not found";
  } else if (err.response.status === 401) {
    status = 401;
    message = "Unauthorized";
  }

  res.status(status).json({ message });
}

module.exports = errorHandler;
