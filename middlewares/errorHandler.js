function errorHandler(err, req, res, next) {
  console.log(err);
  let status = 500;
  let message = "Internal Server Error";

  if (err.name === "SequelizeUniqueConstraintError") {
    status = 400;
    message = "Email already taken";
  }
  if (err.name === "SequelizeValidationError") {
    status = 400;
    message = err.errors[0].message;
  }
  if (err.name === "invalid_username_password") {
    status = 401;
    message = "Invalid Username/Password";
  }

  if (err.name === "game_not_found") {
    status = 404;
    message = "Game not found!";
  }

  if (err.response.status === 401) {
    status = 401;
    message = "Unauthorized";
  }

  if (err.name === "JsonWebTokenError") {
    status = 401;
    message = "Invalid Token";
  }

  res.status(status).json({ message });
}

module.exports = errorHandler;
