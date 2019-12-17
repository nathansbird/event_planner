const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).json({message: "No token found. Authorization denied."});
    }

    try {
        const verifiedToken = jwt.verify(token, config.get('jwtSecret'));
        console.log(verifiedToken);
        req.user = verifiedToken.user;
        next();
    } catch (e) {
        res.status(401).json({message: "Token is not valid. Authorization denied."})
    }
}
