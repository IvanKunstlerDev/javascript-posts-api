export const notFoundRoute = (req, res) => {
  res.status(404).json({
    timestamp: new Date(),
    path: req.path,
    method: req.method,
    message: "Page not found.",
  });
};
