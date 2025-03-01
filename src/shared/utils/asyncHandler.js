export const asyncHandler = (fn) => (req, res, next) =>
  fn(req, res).catch(next);
