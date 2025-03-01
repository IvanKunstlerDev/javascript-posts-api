import AppError from "../AppError.js";

export const errorHandlingMiddleware = (error, req, res, next) => {
  const timestamp = new Date();

  const responseBody = {
    timestamp,
    path: req.path,
    method: req.method,
    message: "Internal Server Error",
  };

  if (error instanceof AppError) {
    responseBody.message = error.message;
    res.status(error.statusCode).json(responseBody);
    return;
  }

  console.error(
    `[ErrorHandler middleware] - ${timestamp.toLocaleString()} \n${error}`
  );

  res.status(500).json(responseBody);
};
