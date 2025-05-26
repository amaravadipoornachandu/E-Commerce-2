import jwt from "jsonwebtoken";
import "dotenv/config";
const authUser = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized" });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
	console.log(token_decode);
    req.body.userId = token_decode.id;
    next();
  } catch (err) {
    console.log("error in auth middleware");
    res.json({ success: false, message: err.message });
  }
};
export default authUser;
