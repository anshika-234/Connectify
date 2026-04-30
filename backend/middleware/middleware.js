import User from "./../model/user.model.js";
import jwt from "jsonwebtoken";

const tokenVerify = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(404).json({ message: "Login requires" });
    }
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User don't exists.." });
    }
    req.user = user;
    console.log(token);
    console.log(user);
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token.." });
  }
};
export default tokenVerify;
