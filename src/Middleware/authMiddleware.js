const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract Bearer token
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const verified = jwt.verify(token, JWT_SECRET); // Verify token
    req.user = verified; // Attach user info from token to req.user
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};

const authorize = (requiredRoles) => {
  return (req, res, next) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: "Access denied. No user found." });
    }

    // Check if the user has one of the required roles
    if (!requiredRoles.includes(user.role)) {
      return res
        .status(403)
        .json({ error: "Access denied. You do not have the required role." });
    }

    next();
  };
};

module.exports = { authenticate, authorize };
