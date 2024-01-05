const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not Authenticated");
    error.status = 401;
    return next(error);
  }
  const token = authHeader.split(" ")[1];
  
  if (!token || token==="null") {
    const error = new Error("Not Authenticated");
    error.status = 401;
    return next(error);
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "kerwani123");
  } catch (error) {
    return next(error);
  }
  if (!decodedToken) {
    const error = new Error("Not Authenticated");
    error.status = 401;
    return next(error);
  }
  req.userId = decodedToken.userId;
  next();
};
