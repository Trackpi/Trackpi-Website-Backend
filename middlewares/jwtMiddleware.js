const jwt = require('jsonwebtoken');

// Secret key for JWT signing and verification
const secretKey = process.env.JWT_KEY // Use your secret key here

// JWT verification middleware
const verifyJwt=(req, res, next) =>{
  // Get the token from the Authorization header
  const token = req.headers['authorization']?.split(' ')[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Token is missing' });
  }

  try {
    // Verify the token and decode it
    const decodedToken = jwt.verify(token, secretKey);

    // Extract the JWT ID (jti) from the decoded token
    const jwtId = decodedToken.jti;

    if (jwtId) {
      console.log(`JWT ID (jti): ${jwtId}`);
      req.jwtId = jwtId; // Attach JWT ID to the request object
      req.user = decodedToken;  // Optionally attach the entire decoded token (e.g., user info) to req.user
      next();  // Proceed to the next middleware or route handler
    } else {
      return res.status(400).json({ message: 'JWT ID (jti) is missing in the token' });
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token has expired' });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid token' });
    } else {
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
}

module.exports = verifyJwt;
