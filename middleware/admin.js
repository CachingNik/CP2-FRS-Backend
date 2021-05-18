export default function (req, res, next) {
  if (!req.user.isAdmin) return res.status(403).send("Access denied.");

  next();
}

// 401 Unauthorized - when user tries to access protected resource
// but they don't supply a valid json web token, so that they can
// retry.
// 403 Forbidden - with valid json token, if user is not allowed to
// access a resource.
