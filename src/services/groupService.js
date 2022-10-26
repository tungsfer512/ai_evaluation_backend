const { Group, SubGroup } = require('../models/index');

const handleAddNewGroup = async (newGroupData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let groupData = {};
            if (!newGroupData.title || !newGroupData.description) {
                groupData.errCode = 1;
                groupData.errMessage = 'Missing input(s) parameters';
                groupData.data = {};
            } else {
                groupData.errCode = 0;
                groupData.errMessage = 'OK';
                groupData.data = newGroupData;
                let NEWGROUP = new Group(newGroupData);
                NEWGROUP.save();
            }
            resolve(groupData);
        } catch (err) {
            reject(err);
        }
    });
};

const handleDeleteGroupById = async (groupId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let groupData = {};
            let group = await Group.findOne({
                where: {
                    id: groupId
                },
                raw: true
            });
            if (!group) {
                groupData.errCode = 3;
                groupData.errMessage = 'Group not found';
                groupData.data = {};
            } else {
                groupData.errCode = 0;
                groupData.errMessage = 'OK';
                groupData.data = group;
                await Group.destroy({
                    where: {
                        id: groupId
                    }
                });
            }
            resolve(groupData);
        } catch (err) {
            reject(err);
        }
    });
};

const handleUpdateGroup = async (newGroupData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let updatedGroupData = {};
            let groupData = await Group.findOne({
                where: {
                    id: newGroupData.id
                },
                raw: true
            });
            if (!newGroupData.title || !newGroupData.description) {
                updatedGroupData.errCode = 1;
                updatedGroupData.errMessage = 'Missing input(s) parameters';
                updatedGroupData.data = {};
            } else {
                updatedGroupData.errCode = 0;
                updatedGroupData.errMessage = 'OK';
                updatedGroupData.data = groupData;
                await Group.update(
                    {
                        title: newGroupData.title,
                        description: newGroupData.description
                    },
                    {
                        where: {
                            id: newGroupData.id
                        }
                    }
                );
            }
            resolve(updatedGroupData);
        } catch (err) {
            reject(err);
        }
    });
};

const handleGetGroupById = async (groupId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let groupData = {};
            let group = await Group.findOne({
                where: {
                    id: groupId
                },
                raw: true
            });
            if (!group) {
                groupData.errCode = 3;
                groupData.errMessage = 'Group not found';
                groupData.data = {};
            } else {
                groupData.errCode = 0;
                groupData.errMessage = 'OK';
                groupData.data = group;
            }
            resolve(groupData);
        } catch (err) {
            reject(err);
        }
    });
};

const handleGetAllGroup = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let groupsData = {};
            let groups = await Group.findAll({});
            if (!groups) {
                groupsData.errCode = 3;
                groupsData.errMessage = 'Groups not found';
                groupsData.data = {};
            } else {
                groupsData.errCode = 0;
                groupsData.errMessage = 'OK';
                groupsData.data = groups;
            }
            resolve(groupsData);
        } catch (err) {
            reject(err);
        }
    });
};

const handleAddNewSubGroup = async (newSubGroupData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let subGroupData = {};
            if (!newSubGroupData.title || !newSubGroupData.description) {
                subGroupData.errCode = 1;
                subGroupData.errMessage = 'Missing input(s) parameters';
                subGroupData.data = {};
            } else {
                subGroupData.errCode = 0;
                subGroupData.errMessage = 'OK';
                subGroupData.data = newSubGroupData;
                let NEWSUBGROUP = new SubGroup(newSubGroupData);
                NEWSUBGROUP.save();
            }
            resolve(subGroupData);
        } catch (err) {
            reject(err);
        }
    });
};

const handleDeleteSubGroupById = async (subGroupId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let subGroupData = {};
            let subGroup = await SubGroup.findOne({
                where: {
                    id: subGroupId
                },
                raw: true
            });
            if (!subGroup) {
                subGroupData.errCode = 3;
                subGroupData.errMessage = 'SubGroup not found';
                subGroupData.data = {};
            } else {
                subGroupData.errCode = 0;
                subGroupData.errMessage = 'OK';
                subGroupData.data = subGroup;
                await SubGroup.destroy({
                    where: {
                        id: subGroupId
                    }
                });
            }
            resolve(subGroupData);
        } catch (err) {
            reject(err);
        }
    });
};

const handleUpdateSubGroup = async (newSubGroupData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let updatedSubGroupData = {};
            let subGroupData = await SubGroup.findOne({
                where: {
                    id: newSubGroupData.id
                },
                raw: true
            });
            if (!newSubGroupData.title || !newSubGroupData.description) {
                updatedSubGroupData.errCode = 1;
                updatedSubGroupData.errMessage = 'Missing input(s) parameters';
                updatedSubGroupData.data = {};
            } else {
                updatedSubGroupData.errCode = 0;
                updatedSubGroupData.errMessage = 'OK';
                updatedSubGroupData.data = subGroupData;
                await SubGroup.update(
                    {
                        title: newSubGroupData.title,
                        description: newSubGroupData.description,
                        groupId: newSubGroupData.groupId
                    },
                    {
                        where: {
                            id: newSubGroupData.id
                        }
                    }
                );
            }
            resolve(updatedSubGroupData);
        } catch (err) {
            reject(err);
        }
    });
};

const handleGetSubGroupById = async (subGroupId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let subGroupData = {};
            let subGroup = await SubGroup.findOne({
                where: {
                    id: subGroupId
                },
                raw: true
            });
            if (!subGroup) {
                subGroupData.errCode = 3;
                subGroupData.errMessage = 'SubGroup not found';
                subGroupData.data = {};
            } else {
                subGroupData.errCode = 0;
                subGroupData.errMessage = 'OK';
                subGroupData.data = subGroup;
            }
            resolve(subGroupData);
        } catch (err) {
            reject(err);
        }
    });
};

const handleGetAllSubGroup = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let subGroupsData = {};
            let subGroups = await SubGroup.findAll({});
            if (!subGroups) {
                subGroupsData.errCode = 3;
                subGroupsData.errMessage = 'SubGroups not found';
                subGroupsData.data = {};
            } else {
                subGroupsData.errCode = 0;
                subGroupsData.errMessage = 'OK';
                subGroupsData.data = subGroups;
            }
            resolve(subGroupsData);
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = {
    handleAddNewGroup,
    handleDeleteGroupById,
    handleUpdateGroup,
    handleGetGroupById,
    handleGetAllGroup,
    handleAddNewSubGroup,
    handleDeleteSubGroupById,
    handleUpdateSubGroup,
    handleGetSubGroupById,
    handleGetAllSubGroup
};
