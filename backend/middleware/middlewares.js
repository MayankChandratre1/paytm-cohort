const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config");

function authMiddleware(req, res, next) {
  const tokenHeader = req.headers.authorization;
  // console.log(tokenHeader);
  if (!tokenHeader || !tokenHeader.startsWith("Bearer"))
    return res.status(403).json({
      msg: "No header found",
      tokenHeader,
    });

  const token = tokenHeader.split(" ")[1];
  // console.log(token);

  try {
    const decoded = jwt.verify(token, JWT_KEY);

    if (decoded.userId) {
      const userId = decoded.userId;
      req.userId = userId;
      console.log(req.userId);
      next();
    } else {
      throw Error();
    }
  } catch (err) {
    res.status(403).json({
      msg: "error in token",
      err,
    });
  }
}

module.exports = {
  authMiddleware,
};
