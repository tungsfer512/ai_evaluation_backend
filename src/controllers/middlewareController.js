const jwt = require('jsonwebtoken');
const util = require('util');
const multer = require('multer');

// Authentication
const verify_Token = (req, res, next) => {
    const token = req.headers.token;
    if (token) {
        const accessToken = token.trim();
        jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
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
        if (req.user.role === 'admin' || req.user.role === 'superadmin') {
            next();
        } else {
            return res.status(403).json({
                resCode: 403,
                resMessage: 'You are not allowed to perform this action.'
            });
        }
    });
};
const verify_Token_Superadmin_Role = (req, res, next) => {
    verify_Token(req, res, () => {
        if (req.user.role === 'superadmin') {
            next();
        } else {
            return res.status(403).json({
                resCode: 403,
                resMessage: 'You are not allowed to perform this action.'
            });
        }
    });
};
const verify_Token_UserId_Admin_Superadmin_Role = (req, res, next) => {
    verify_Token(req, res, () => {
        if (
            req.user.id === req.params.userId ||
            req.user.role === 'admin' ||
            req.user.role === 'superadmin'
        ) {
            next();
        } else {
            return res.status(403).json({
                resCode: 403,
                resMessage: 'You are not allowed to perform this action.'
            });
        }
    });
};
const verify_Token_AdminId_Superadmin_Role = (req, res, next) => {
    verify_Token(req, res, () => {
        if (
            req.user.id === req.params.userId ||
            req.user.role === 'superadmin'
        ) {
            next();
        } else {
            return res.status(403).json({
                resCode: 403,
                resMessage: 'You are not allowed to perform this action.'
            });
        }
    });
};
const verify_Token_SuperadminId = (req, res, next) => {
    verify_Token(req, res, () => {
        if (
            req.user.id === req.params.userId &&
            req.user.role === 'superadmin'
        ) {
            next();
        } else {
            return res.status(403).json({
                resCode: 403,
                resMessage: 'You are not allowed to perform this action.'
            });
        }
    });
};

// File upload

let storage = multer.diskStorage({
    // destination: './src/uploads/',
    destination: (req, file, cb) => {
        if (file.fieldname === 'videos') {
            cb(null, './src/uploads/videos');
        } else if (file.fieldname === 'results') {
            cb(null, './src/uploads/results');
        }
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, file.originalname);
    }
});

const multi_upload = multer({
    storage: storage
}).fields([
    { name: 'videos', maxCount: 20 },
    { name: 'results', maxCount: 20 }
]);

let uploadFilesMiddleware = util.promisify(multi_upload);

module.exports = {
    verify_Token,
    verify_Token_Admin_Superadmin_Role,
    verify_Token_Superadmin_Role,
    verify_Token_UserId_Admin_Superadmin_Role,
    verify_Token_AdminId_Superadmin_Role,
    verify_Token_SuperadminId,
    uploadFilesMiddleware
};
