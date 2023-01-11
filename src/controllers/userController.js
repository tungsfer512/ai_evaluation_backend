const { User } = require('../models/index');
const bcrypt = require('bcrypt');

// Create
const addNewUser = async (req, res) => {
    try {
        let newUserData = req.body;
        newUserData.role = 'user';
        if (
            !newUserData.username ||
            !newUserData.password ||
            !newUserData.email ||
            !newUserData.firstName ||
            !newUserData.lastName ||
            !newUserData.role
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let isUsernameExist = await isUsernameExisted(newUserData.username);
        if (isUsernameExist) {
            return res.status(400).json({
                resCode: 400,
                resMessage:
                    'Username already existed, please choose another name.'
            });
        }
        let salt = await bcrypt.genSalt(10);
        let encodedPassword = await bcrypt.hash(newUserData.password, salt);
        let newUser = new User({
            username: newUserData.username,
            password: encodedPassword,
            email: newUserData.email,
            firstName: newUserData.firstName,
            lastName: newUserData.lastName,
            role: newUserData.role
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
        newUserData.role = 'admin';
        if (
            !newUserData.username ||
            !newUserData.password ||
            !newUserData.email ||
            !newUserData.firstName ||
            !newUserData.lastName ||
            !newUserData.role
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let isUsernameExist = await isUsernameExisted(newUserData.username);
        if (isUsernameExist) {
            return res.status(400).json({
                resCode: 400,
                resMessage:
                    'Username already existed, please choose another name.'
            });
        }
        let salt = await bcrypt.genSalt(10);
        let encodedPassword = await bcrypt.hash(newUserData.password, salt);
        let newUser = new User({
            username: newUserData.username,
            password: encodedPassword,
            email: newUserData.email,
            firstName: newUserData.firstName,
            lastName: newUserData.lastName,
            role: newUserData.role
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
// Update
const updateUserById = async (req, res) => {
    try {
        let user = await User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.userId,
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
        let newUserData = req.body;
        if (
            !newUserData.password ||
            !newUserData.firstName ||
            !newUserData.lastName ||
            !newUserData.email
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let salt = await bcrypt.genSalt(10);
        let encodedPassword = await bcrypt.hash(newUserData.password, salt);
        await User.update(
            {
                password: encodedPassword,
                firstName: newUserData.firstName,
                lastName: newUserData.lastName,
                email: newUserData.email
            },
            {
                where: {
                    id: req.params.userId,
                    role: 'user'
                },
                raw: true
            }
        );
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: user
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const updateAdminById = async (req, res) => {
    try {
        let user = await User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.userId,
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
        let newUserData = req.body;
        if (
            !newUserData.password ||
            !newUserData.firstName ||
            !newUserData.lastName ||
            !newUserData.email
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let salt = await bcrypt.genSalt(10);
        let encodedPassword = await bcrypt.hash(newUserData.password, salt);
        await User.update(
            {
                password: encodedPassword,
                firstName: newUserData.firstName,
                lastName: newUserData.lastName,
                email: newUserData.email
            },
            {
                where: {
                    id: req.params.userId,
                    role: 'admin'
                },
                raw: true
            }
        );
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: user
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const updatesuperadminById = async (req, res) => {
    try {
        let user = await User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.userId,
                role: 'superadmin'
            },
            raw: true
        });
        if (!user) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'User not found.'
            });
        }
        let newUserData = req.body;
        if (
            !newUserData.password ||
            !newUserData.firstName ||
            !newUserData.lastName ||
            !newUserData.email
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let salt = await bcrypt.genSalt(10);
        let encodedPassword = await bcrypt.hash(newUserData.password, salt);
        await User.update(
            {
                password: encodedPassword,
                firstName: newUserData.firstName,
                lastName: newUserData.lastName,
                email: newUserData.email
            },
            {
                where: {
                    id: req.params.userId,
                    role: 'superadmin'
                },
                raw: true
            }
        );
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: user
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Delete
const deleteUserById = async (req, res) => {
    try {
        let user = await User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.userId,
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
                id: req.params.userId,
                role: 'user'
            },
            raw: true
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
};
const deleteAdminById = async (req, res) => {
    try {
        let user = await User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.userId,
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
                id: req.params.userId,
                role: 'admin'
            },
            raw: true
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
            },
            raw: true
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
                id: req.params.userId,
                role: 'user'
            },
            raw: true
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
                id: req.params.userId,
                role: 'admin'
            },
            raw: true
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
const getSuperadminById = async (req, res) => {
    try {
        let users = await User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.userId,
                role: 'superadmin'
            },
            raw: true
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
            },
            raw: true
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
module.exports = {
    addNewUser,
    deleteUserById,
    updateUserById,
    getAllUser,
    getAllAdmin,
    getUserById,
    addNewAdmin,
    updateAdminById,
    updatesuperadminById,
    deleteAdminById,
    getAdminById,
    getSuperadminById
};
