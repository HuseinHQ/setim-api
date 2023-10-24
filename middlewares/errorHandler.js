function errorHandler(err, req, res, next) {
  let status = 500;
  let message = "Internal Server Error";

  if (err.name === "SequelizeUniqueConstraintError") {
    status = 400;
    message = "Email already taken";
  }
  if (err.name === "SequelizeValidationError") {
    status = 400;
    message = err.errors.map((error) => error.message);
  }
  if (err.name === "invalid_username_password") {
    status = 400;
    message = "Invalid Username/Password";
  }

  res.status(status).json({ message });
}

module.exports = errorHandler;
