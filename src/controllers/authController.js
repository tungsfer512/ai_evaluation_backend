const { User } = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
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
const login = async (req, res) => {
    try {
        let reqUserData = req.body;
        if (!reqUserData.username || !reqUserData.password) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let userData = await User.findOne({
            where: {
                username: reqUserData.username
            },
            raw: true
        });
        if (!userData) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'User not found.'
            });
        }
        let validPassword = await bcrypt.compare(
            reqUserData.password,
            userData.password
        );
        if (!validPassword) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Wrong password.'
            });
        }
        let resData = userData;
        delete resData.password;
        const accessToken = jwt.sign(
            {
                id: userData.id,
                role: userData.role
            },
            process.env.JWT_ACCESS_KEY,
            {
                expiresIn: '365d'
            }
        );
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: {
                ...resData,
                accessToken: accessToken
            }
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
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
    register,
    login
};
