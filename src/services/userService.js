const { User } = require('../models/index');

const handleAddNewUser = async (newUserData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            if (!newUserData.username ||
                !newUserData.password ||
                !newUserData.email ||
                !newUserData.firstName ||
                !newUserData.lastName) {
                userData.errCode = 1;
                userData.errMessage = 'Missing input(s) parameters';
                userData.data = {};
            } else {
                let isEmailExist = await isEmailExisted(newUserData.email);
                let isUsernameExist = await isUsernameExisted(newUserData.username);
                if (isUsernameExist) {
                    userData.errCode = 2;
                    userData.errMessage = "Username already existed, please choose another name!!!";
                    userData.data = {};
                }
                else if (isEmailExist) {
                    userData.errCode = 2;
                    userData.errMessage = "Email already used, please choose another email!!!";
                    userData.data = {};
                }
                else {
                    userData.errCode = 0;
                    userData.errMessage = "OK";
                    userData.data = newUserData;
                    let NEWUSER = new User(newUserData);
                    NEWUSER.save();
                    delete userData.data.password;
                }
            }
            resolve(userData);
        }
        catch (err) {
            reject(err);
        }
    });
}

const handleDeleteUserById = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let user = await User.findOne({
                attributes: {
                    exclude: ["password", "role"]
                },
                where: {
                    id: userId,
                    role: "user"
                },
                raw: true
            })
            if (!user) {
                userData.errCode = 3;
                userData.errMessage = "User not found";
                userData.data = {};
            } else {
                userData.errCode = 0;
                userData.errMessage = "OK";
                userData.data = user;
                await User.destroy({
                    where: {
                        id : userId
                    }
                })
            }
            resolve(userData);
        }
        catch (err) {
            reject(err);
        }
    });
}

const handleUpdateUser = async (newUserData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let updatedUserData = {};
            let userData = await User.findOne({
                attributes: {
                    exclude: ['password']
                },
                where: {
                    id: newUserData.id
                },
                raw: true
            })

            if (!newUserData.email ||
                !newUserData.firstName ||
                !newUserData.lastName) {
                updatedUserData.errCode = 1;
                updatedUserData.errMessage = 'Missing input(s) parameters';
                updatedUserData.data = {};
            } else {
                let isEmailExist = await isEmailExisted(newUserData.email);
                if (isEmailExist && newUserData.email !== userData.email) {
                    updatedUserData.errCode = 2;
                    updatedUserData.errMessage = "Email already used, please choose another email!!!";
                    updatedUserData.data = {};
                }
                else {
                    updatedUserData.errCode = 0;
                    updatedUserData.errMessage = "OK";
                    updatedUserData.data = userData;
                    await User.update({
                        email: newUserData.email,
                        firstName: newUserData.firstName,
                        lastName: newUserData.lastName
                    }, {
                        where: {
                            id: newUserData.id
                        }
                    });
                }
            }
            resolve(updatedUserData);
        }
        catch (err) {
            reject(err);
        }
    });
}

const handleGetUserById = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let user = await User.findOne({
                attributes: {
                    exclude: ["password", "role"]
                },
                where: {
                    id: userId,
                    role: "user"
                }, 
                raw: true
            })
            if (!user) {
                userData.errCode = 3;
                userData.errMessage = "User not found";
                userData.data = {};
            } else {
                userData.errCode = 0;
                userData.errMessage = "OK";
                userData.data = user;
            }
            resolve(userData);
        }
        catch (err) {
            reject(err);
        }
    });
}

const handleGetAllUser = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let usersData = {};
            let users = await User.findAll({
                attributes: {
                    exclude: ["password", "role"]
                },
                where: {
                    role: "user"
                }
            });
            if (!users) {
                usersData.errCode = 3;
                usersData.errMessage = "Users not found";
                usersData.data = {};
            } else {
                usersData.errCode = 0;
                usersData.errMessage = "OK";
                usersData.data = users;
            }
            resolve(usersData);
        }
        catch (err) {
            reject(err);
        }
    });
}

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
        }
        catch (err) {
            reject(err);
        }
    })
}

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
        }
        catch (err) {
            reject(err);
        }
    })
}

module.exports = {
    handleAddNewUser,
    handleDeleteUserById,
    handleUpdateUser,
    handleGetUserById,
    handleGetAllUser
}