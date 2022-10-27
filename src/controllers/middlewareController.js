const jwt = require('jsonwebtoken');

const verify_Token = (req, res, next) => {
    const token = req.headers.token;
    if (token) {
        const accessToken = token.trim();
        jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({
                    resCode: 403,
                    resMessage: 'Token is not valid.'
                });
            }
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json({
            resCode: 401,
            resMessage: 'You are not authenticated.'
        });
    }
};
const verify_Token_Admin_Superadmin_Role = (req, res, next) => {
    verify_Token(req, res, () => {
        console.log(req.user.role);
        if (req.user.role === 'admin' || req.user.role === 'superadmin') {
            next();
        } else {
            return res.status(403).json({
                resCode: 403,
                resMessage:
                    "You are not allowed to modify other's information(s)."
            });
        }
    });
};
const verify_Token_Superadmin_Role = (req, res, next) => {
    verify_Token(req, res, () => {
        console.log(req.user.role);
        if (req.user.role === 'superadmin') {
            next();
        } else {
            return res.status(403).json({
                resCode: 403,
                resMessage:
                    "You are not allowed to modify other's information(s)."
            });
        }
    });
};
const verify_Token_UserId_Admin_Superadmin_Role = (req, res, next) => {
    verify_Token(req, res, () => {
        console.log(req.user.role);
        if (
            req.user.id === req.params.id ||
            req.user.role === 'admin' ||
            req.user.role === 'superadmin'
        ) {
            next();
        } else {
            return res.status(403).json({
                resCode: 403,
                resMessage:
                    "You are not allowed to modify other's information(s)."
            });
        }
    });
};
const verify_Token_AdminId_Superadmin_Role = (req, res, next) => {
    verify_Token(req, res, () => {
        console.log(req.user.role);
        if (req.user.id === req.params.id || req.user.role === 'superadmin') {
            next();
        } else {
            return res.status(403).json({
                resCode: 403,
                resMessage:
                    "You are not allowed to modify other's information(s)."
            });
        }
    });
};
const verify_Token_SuperadminId = (req, res, next) => {
    verify_Token(req, res, () => {
        if (req.user.id === req.params.id && req.user.role === 'superadmin') {
            next();
        } else {
            return res.status(403).json({
                resCode: 403,
                resMessage:
                    "You are not allowed to modify other's information(s)."
            });
        }
    });
};
module.exports = {
    verify_Token,
    verify_Token_Admin_Superadmin_Role,
    verify_Token_Superadmin_Role,
    verify_Token_UserId_Admin_Superadmin_Role,
    verify_Token_AdminId_Superadmin_Role,
    verify_Token_SuperadminId
};
