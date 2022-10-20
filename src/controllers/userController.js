const UserService = require('../services/userService');

const addNewUser = async (req, res) => {
    let newUserData = req.body;

    let userData = await UserService.handleAddNewUser(newUserData);

    if(userData.errCode !== 0) {
        return res.status(500).json({
            errCode: userData.errCode,
            errMesssage: userData.errMessage,
            data: userData.data
        })
    }

    return res.status(200).json({
        errCode: userData.errCode,
        errMesssage: userData.errMessage,
        data: userData.data
    });
}

const deleteUserById = async (req, res) => {

}

const updateUser = async (req, res) => {
    let newUserData = req.body;
    newUserData.id = req.params.id;
    let userData = await UserService.handleUpdateUser(newUserData);

    if (userData.errCode !== 0) {
        return res.status(500).json({
            errCode: userData.errCode,
            errMesssage: userData.errMessage,
            data: userData.data
        })
    }

    return res.status(200).json({
        errCode: userData.errCode,
        errMesssage: userData.errMessage,
        data: userData.data
    });
}

const getUserById = async (req, res) => {

}

const getAllUser = async (req, res) => {

}


module.exports = {
    addNewUser,
    deleteUserById,
    updateUser,
    getUserById,
    getAllUser
}