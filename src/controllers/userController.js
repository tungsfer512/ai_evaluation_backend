const { User } = require('../models/index');
const bcrypt = require('bcrypt');

// Create
const addNewUser = async (req, res) => {
    try {
        let newUserData = req.body;
        if (
            !newUserData.username ||
            !newUserData.password ||
            !newUserData.email ||
            !newUserData.firstName ||
            !newUserData.lastName
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let isEmailExist = await isEmailExisted(newUserData.email);
        let isUsernameExist = await isUsernameExisted(newUserData.username);
        if (isUsernameExist) {
            return res.status(400).json({
                resCode: 400,
                resMessage:
                    'Username already existed, please choose another name.'
            });
        }
        if (isEmailExist) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Email already used, please choose another email.'
            });
        }
        let salt = await bcrypt.genSalt(10);
        let encodedPassword = await bcrypt.hash(newUserData.password, salt);
        let newUser = new User({
            role: newUserData.role,
            username: newUserData.username,
            password: encodedPassword,
            email: newUserData.email,
            firstName: newUserData.firstName,
            lastName: newUserData.lastName
        });
        let resData = newUser.dataValues;
        await newUser.save();
        delete resData.password;
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: resData
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const addNewAdmin = async (req, res) => {
    try {
        let newUserData = req.body;
        if (
            !newUserData.username ||
            !newUserData.password ||
            !newUserData.email ||
            !newUserData.firstName ||
            !newUserData.lastName
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let isEmailExist = await isEmailExisted(newUserData.email);
        let isUsernameExist = await isUsernameExisted(newUserData.username);
        if (isUsernameExist) {
            return res.status(400).json({
                resCode: 400,
                resMessage:
                    'Username already existed, please choose another name.'
            });
        }
        if (isEmailExist) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Email already used, please choose another email.'
            });
        }
        let salt = await bcrypt.genSalt(10);
        let encodedPassword = await bcrypt.hash(newUserData.password, salt);
        let newUser = new User({
            role: newUserData.role,
            username: newUserData.username,
            password: encodedPassword,
            email: newUserData.email,
            firstName: newUserData.firstName,
            lastName: newUserData.lastName,
            role: 'admin'
        });
        let resData = newUser.dataValues;
        await newUser.save();
        delete resData.password;
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: resData
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Read
const getAllUser = async (req, res) => {
    try {
        let users = await User.findAll({
            attributes: {
                exclude: ['password']
            },
            where: {
                role: 'user'
            }
        });
        if (!users) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'User not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: users
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getUserById = async (req, res) => {
    try {
        let users = await User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                role: 'user',
                id: req.params.id
            }
        });
        if (!users) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'User not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: users
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getAllAdmin = async (req, res) => {
    try {
        let users = await User.findAll({
            attributes: {
                exclude: ['password']
            },
            where: {
                role: 'admin'
            }
        });
        if (!users) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'User not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: users
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getAdminById = async (req, res) => {
    try {
        let users = await User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                role: 'admin',
                id: req.params.id
            }
        });
        if (!users) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Admin not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: users
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getSuperadminById = async (req, res) => {
    try {
        let users = await User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                role: 'superadmin',
                id: req.params.id
            }
        });
        if (!users) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Admin not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: users
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Update
const updateUser = async (req, res) => {
    try {
        let newUserData = req.body;
        if (
            !newUserData.username ||
            !newUserData.password ||
            !newUserData.email ||
            !newUserData.firstName ||
            !newUserData.lastName
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let isEmailExist = await isEmailExisted(newUserData.email);
        if (isEmailExist) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Email already used, please choose another email.'
            });
        }
        let salt = await bcrypt.genSalt(10);
        let encodedPassword = await bcrypt.hash(newUserData.password, salt);
        await User.update(
            {
                email: newUserData.email,
                password: encodedPassword,
                firstName: newUserData.firstName,
                lastName: newUserData.lastName,
                role: newUserData.role
            },
            {
                where: {
                    id: newUserData.id,
                    role: 'user'
                },
                raw: true
            },
        );
        let resData = newUserData;
        delete resData.password;
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: resData
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
}
const updateAdmin = async (req, res) => {
    try {
        let newUserData = req.body;
        if (
            !newUserData.username ||
            !newUserData.password ||
            !newUserData.email ||
            !newUserData.firstName ||
            !newUserData.lastName
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let isEmailExist = await isEmailExisted(newUserData.email);
        if (isEmailExist) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Email already used, please choose another email.'
            });
        }
        let salt = await bcrypt.genSalt(10);
        let encodedPassword = await bcrypt.hash(newUserData.password, salt);
        await User.update(
            {
                email: newUserData.email,
                password: encodedPassword,
                firstName: newUserData.firstName,
                lastName: newUserData.lastName,
                role: newUserData.role
            },
            {
                where: {
                    id: newUserData.id,
                    role: 'admin'
                },
                raw: true
            },
        );
        let resData = newUserData;
        delete resData.password;
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: resData
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
}
const updateSuperadmin = async (req, res) => {
    try {
        let newUserData = req.body;
        if (
            !newUserData.username ||
            !newUserData.password ||
            !newUserData.email ||
            !newUserData.firstName ||
            !newUserData.lastName
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let isEmailExist = await isEmailExisted(newUserData.email);
        if (isEmailExist) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Email already used, please choose another email.'
            });
        }
        let salt = await bcrypt.genSalt(10);
        let encodedPassword = await bcrypt.hash(newUserData.password, salt);
        await User.update(
            {
                email: newUserData.email,
                password: encodedPassword,
                firstName: newUserData.firstName,
                lastName: newUserData.lastName,
            },
            {
                where: {
                    id: newUserData.id,
                    role: 'superadmin'
                },
                raw: true
            },
        );
        let resData = newUserData;
        delete resData.password;
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: resData
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
}
// Delete
const deleteUserById = async (req, res) => {
    try {
        let user = await User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.id,
                role: 'user'
            },
            raw: true
        });
        if (!user) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'User not found.'
            });
        }
        await User.destroy({
            where: {
                id: req.params.id,
                role: 'user'
            }
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: user
        });
    } catch (err) {
        res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
}
const deleteAdminById = async (req, res) => {
    try {
        let user = await User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.id,
                role: 'admin'
            },
            raw: true
        });
        if (!user) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'User not found.'
            });
        }
        await User.destroy({
            where: {
                id: req.params.id,
                role: 'admin'
            }
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: user
        });
    } catch (err) {
        res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
}
// Validate
const isUsernameExisted = (username) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.findOne({
                attributes: {
                    exclude: ['password']
                },
                where: {
                    username: username
                },
                raw: true
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (err) {
            reject(err);
        }
    });
};

const isEmailExisted = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.findOne({
                attributes: {
                    exclude: ['password']
                },
                where: {
                    email: email
                },
                raw: true
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = {
    addNewUser,
    addNewAdmin,
    getAllUser,
    getAllAdmin,
    getUserById,
    getAdminById,
    getSuperadminById,
    updateUser,
    updateAdmin,
    updateSuperadmin,
    deleteUserById,
    deleteAdminById
};
