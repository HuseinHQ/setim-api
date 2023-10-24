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

  res.status(status).json({ message });
}

module.exports = errorHandler;
