import jwt from "jsonwebtoken";

const authMiddleWare = async (req, res, next) => {
    let token = req.headers.token || req.headers.authorization;

    // If token is in "Bearer <TOKEN>" format, extract it
    if (token && token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
    }

    console.log("Received Token:", token); // Debugging

    if (!token) {
        return res.json({ success: false, message: "Not authorized, Login Again" });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id; // Ensure 'id' exists in the token payload
        console.log("Decoded User ID:", req.body.userId); // Debugging
        next();
    } catch (error) {
        console.log("JWT Error:", error);
        res.json({ success: false, message: "Invalid Token" });
    }
};

export default authMiddleWare;
