const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.token;
    if (token) {
        const accessToken = token.trim();
        jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({
                    resCode: 403,
                    resMessage: 'Token is not valid.'
                })
            }
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json({
            resCode: 401,
            resMessage: 'You are not authenticated.'
        })
    }
}

const verifyTokenAndRoleAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id && req.user.role === 'admin') {
            next();
        } else {
            return res.status(403).json({
                resCode: 403, 
                resMessage: 'You are not an administrator.'
            });
        }
    })
}

module.exports = {
    verifyToken,
    verifyTokenAndRoleAdmin
}