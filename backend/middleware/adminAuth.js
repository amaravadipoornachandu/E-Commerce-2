import jwt from "jsonwebtoken";
import "dotenv/config";
const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({ success: false, message: "Not Authorized" });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
		return res.json({ success: false, message: "Not Authorized" });
    }
	next();
  } catch (err) {
	console.log("error in adminAuth middleware");
	res.json({ success: false, message: err.message });
  }
};
export default adminAuth;
