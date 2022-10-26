const GroupService = require('../services/groupService');

const addNewGroup = async (req, res) => {
    let newGroupData = req.body;

    let groupData = await GroupService.handleAddNewGroup(newGroupData);

    if (groupData.errCode !== 0) {
        return res.status(500).json({
            errCode: groupData.errCode,
            errMesssage: groupData.errMessage,
            data: groupData.data
        });
    }

    return res.status(200).json({
        errCode: groupData.errCode,
        errMesssage: groupData.errMessage,
        data: groupData.data
    });
};

const deleteGroupById = async (req, res) => {
    let problemId = req.params.id;
    let groupData = await GroupService.handleDeleteGroupById(problemId);
    if (groupData.errCode !== 0) {
        return res.status(500).json({
            errCode: groupData.errCode,
            errMesssage: groupData.errMessage,
            data: groupData.data
        });
    }

    return res.status(200).json({
        errCode: groupData.errCode,
        errMesssage: groupData.errMessage,
        data: groupData.data
    });
};

const updateGroup = async (req, res) => {
    let newGroupData = req.body;
    newGroupData.id = req.params.id;
    let groupData = await GroupService.handleUpdateGroup(newGroupData);

    if (groupData.errCode !== 0) {
        return res.status(500).json({
            errCode: groupData.errCode,
            errMesssage: groupData.errMessage,
            data: groupData.data
        });
    }

    return res.status(200).json({
        errCode: groupData.errCode,
        errMesssage: groupData.errMessage,
        data: groupData.data
    });
};

const getGroupById = async (req, res) => {
    let problemId = req.params.id;
    let groupData = await GroupService.handleGetGroupById(problemId);
    if (groupData.errCode !== 0) {
        return res.status(500).json({
            errCode: groupData.errCode,
            errMesssage: groupData.errMessage,
            data: groupData.data
        });
    }

    return res.status(200).json({
        errCode: groupData.errCode,
        errMesssage: groupData.errMessage,
        data: groupData.data
    });
};

const getAllGroup = async (req, res) => {
    let problemsData = await GroupService.handleGetAllGroup();

    if (problemsData.errCode !== 0) {
        return res.status(500).json({
            errCode: problemsData.errCode,
            errMesssage: problemsData.errMessage,
            data: problemsData.data
        });
    }

    return res.status(200).json({
        errCode: problemsData.errCode,
        errMesssage: problemsData.errMessage,
        data: problemsData.data
    });
};

const addNewSubGroup = async (req, res) => {
    let newSubGroupData = req.body;

    let subGroupData = await GroupService.handleAddNewSubGroup(newSubGroupData);

    if (subGroupData.errCode !== 0) {
        return res.status(500).json({
            errCode: subGroupData.errCode,
            errMesssage: subGroupData.errMessage,
            data: subGroupData.data
        });
    }

    return res.status(200).json({
        errCode: subGroupData.errCode,
        errMesssage: subGroupData.errMessage,
        data: subGroupData.data
    });
};

const deleteSubGroupById = async (req, res) => {
    let problemId = req.params.id;
    let subGroupData = await GroupService.handleDeleteSubGroupById(problemId);
    if (subGroupData.errCode !== 0) {
        return res.status(500).json({
            errCode: subGroupData.errCode,
            errMesssage: subGroupData.errMessage,
            data: subGroupData.data
        });
    }

    return res.status(200).json({
        errCode: subGroupData.errCode,
        errMesssage: subGroupData.errMessage,
        data: subGroupData.data
    });
};

const updateSubGroup = async (req, res) => {
    let newSubGroupData = req.body;
    newSubGroupData.id = req.params.id;
    let subGroupData = await GroupService.handleUpdateSubGroup(newSubGroupData);

    if (subGroupData.errCode !== 0) {
        return res.status(500).json({
            errCode: subGroupData.errCode,
            errMesssage: subGroupData.errMessage,
            data: subGroupData.data
        });
    }

    return res.status(200).json({
        errCode: subGroupData.errCode,
        errMesssage: subGroupData.errMessage,
        data: subGroupData.data
    });
};

const getSubGroupById = async (req, res) => {
    let problemId = req.params.id;
    let subGroupData = await GroupService.handleGetSubGroupById(problemId);
    if (subGroupData.errCode !== 0) {
        return res.status(500).json({
            errCode: subGroupData.errCode,
            errMesssage: subGroupData.errMessage,
            data: subGroupData.data
        });
    }

    return res.status(200).json({
        errCode: subGroupData.errCode,
        errMesssage: subGroupData.errMessage,
        data: subGroupData.data
    });
};

const getAllSubGroup = async (req, res) => {
    let problemsData = await GroupService.handleGetAllSubGroup();

    if (problemsData.errCode !== 0) {
        return res.status(500).json({
            errCode: problemsData.errCode,
            errMesssage: problemsData.errMessage,
            data: problemsData.data
        });
    }

    return res.status(200).json({
        errCode: problemsData.errCode,
        errMesssage: problemsData.errMessage,
        data: problemsData.data
    });
};

module.exports = {
    addNewGroup,
    deleteGroupById,
    updateGroup,
    getGroupById,
    getAllGroup,
    addNewSubGroup,
    deleteSubGroupById,
    updateSubGroup,
    getSubGroupById,
    getAllSubGroup
};
