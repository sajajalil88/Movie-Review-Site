const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.SECRET_KEY

//middleware to verify token

const verifyToken = (req,res,next) =>{
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
        res.status(401).json({ message: 'Invalid Token' });

    }
}

const verifyAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

module.exports = { verifyToken, verifyAdmin };