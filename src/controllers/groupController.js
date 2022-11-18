const { Group, SubGroup } = require('../models/index');

// Create
const addNewGroup = async (req, res) => {
    try {
        let newGroupData = req.body;
        if (!newGroupData.title) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let newGroup = new Group({
            title: newGroupData.title,
            description: newGroupData.description
        });
        await newGroup.save();
        let resData = newGroup.dataValues;
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
const addNewSubGroup = async (req, res) => {
    try {
        let newSubGroupData = req.body;
        if (!newSubGroupData.title || !newSubGroupData.groupId) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let newSubGroup = new SubGroup({
            title: newSubGroupData.title,
            description: newSubGroupData.description,
            groupId: newSubGroupData.groupId
        });
        newSubGroup.save();
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: newSubGroup
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};

// Delete
const deleteGroupById = async (req, res) => {
    try {
        let group = await Group.findOne({
            where: {
                id: req.params.groupId
            },
            raw: true
        });
        if (!group) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Group not found.'
            });
        }
        await Group.destroy({
            where: {
                id: req.params.groupId
            },
            raw: true
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: group
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const deleteSubGroupById = async (req, res) => {
    try {
        let subGroup = await SubGroup.findOne({
            where: {
                id: req.params.subGroupId
            },
            raw: true
        });
        if (!subGroup) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'SubGroup not found.'
            });
        }
        await SubGroup.destroy({
            where: {
                id: req.params.subGroupId
            },
            raw: true
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: subGroup
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Update
const updateGroupById = async (req, res) => {
    try {
        let group = await Group.findOne({
            where: {
                id: req.params.groupId
            },
            raw: true
        });
        if (!group) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Group not found.'
            });
        }
        let newGroupData = req.body;
        if (!newGroupData.title) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        await Group.update(
            {
                title: newGroupData.title,
                description: newGroupData.description
            },
            {
                where: {
                    id: req.params.groupId
                },
                raw: true
            }
        );
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: group
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const updateSubGroupById = async (req, res) => {
    try {
        let subGroup = await SubGroup.findOne({
            where: {
                id: req.params.subGroupId
            },
            raw: true
        });
        if (!subGroup) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'SubGroup not found.'
            });
        }
        let newSubGroupData = req.body;
        if (!newSubGroupData.title || !newSubGroupData.groupId) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        await SubGroup.update(
            {
                title: newSubGroupData.title,
                description: newSubGroupData.description,
                groupId: newSubGroupData.groupId
            },
            {
                where: {
                    id: req.params.subGroupId
                },
                raw: true
            }
        );
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: subGroup
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Read
const getSubGroupById = async (req, res) => {
    try {
        let subGroup = await SubGroup.findOne({
            where: {
                id: req.params.subGroupId
            },
            raw: true
        });
        if (!subGroup) {
            return res.status(404).json({
                resCode: 404,
                resCode: 'SubGroup not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: subGroup
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getAllSubGroup = async (req, res) => {
    try {
        let subgroups = await SubGroup.findAll({ raw: true });
        if (!subgroups) {
            return res.status(404).json({
                resCode: 404,
                resCode: 'Group not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: subgroups
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getGroupById = async (req, res) => {
    try {
        let group = await Group.findOne({
            where: {
                id: req.params.groupId
            },
            raw: true
        });
        if (!group) {
            return res.status(404).json({
                resCode: 404,
                resCode: 'Group not found.'
            });
        }
        let subgroups = await SubGroup.findAll({
            where: {
                groupId: req.params.groupId
            },
            raw: true
        });
        group.subgroups = subgroups;
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: group
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getAllGroup = async (req, res) => {
    try {
        let groups = await Group.findAll({
            raw: true
        });
        if (!groups) {
            return res.status(404).json({
                resCode: 404,
                resCode: 'Group not found.'
            });
        }
        for (let i = 0; i < groups.length; i++) {
            let subgroups = await SubGroup.findAll({
                where: {
                    groupId: groups[i].id
                },
                raw: true
            });
            groups[i].subgroups = subgroups;
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: groups
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};

module.exports = {
    addNewGroup,
    deleteGroupById,
    updateGroupById,
    addNewSubGroup,
    deleteSubGroupById,
    updateSubGroupById,
    getSubGroupById,
    getAllSubGroup,
    getGroupById,
    getAllGroup
};
