import jwt from "jsonwebtoken";
import User from "../models/User.js";


// 1. Extract token from Authorization header
// 2. Verify token
// 3. Find user
// 4. Attach user to req.user
// 5. Call next()
// 6. If invalid → return 401

const authMiddleware = async (req, res, next) => {
  try{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
      return res.status(401).json({
        status: "error",
        message: "Access denied.No token provided."
      });
    }
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || '##tsikata@18');
      const user = await User.findById(decoded.id).select("-password");

      if(!user){
        return res.status(401).json({
          status: "error",
          message: "User not found."
        });
      }
      req.user = user;
      next()
  }catch(error){
    return res.status(401).json({
      status: "error",
      message: "Invalid or expired token."
    });
  }
}


export default authMiddleware;