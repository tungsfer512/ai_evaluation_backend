const { Group } = require('../models/index');

// Create
const addNewGroup = async (req, res) => {
    try {
        let newGroupData = req.body;
        if (
            !newGroupData.title ||
            !newGroupData.description
        ) {
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
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: newGroup
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resCode: err
        })
    }
}
// Read
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
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: groups
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resCode: err
        });
    }
}
const getGroupById = async (req, res) => {
    try {
        let group = await Group.findOne({
            where: {
                id: req.params.id
            },
            raw: true
        });
        if (!group) {
            return res.status(404).json({
                resCode: 404,
                resCode: 'Group not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: group
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resCode: err
        });
    }
}
// Update
const updateGroup = async (req, res) => {
    try {
        let newGroupData = req.body;
        if (
            !newGroupData.title ||
            !newGroupData.description
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        await newGroup.update(
            {
                title: newGroupData.title,
                description: newGroupData.description
            },
            {
                where: {
                    id: newGroupData.id,
                },
                raw: true
            }
        );
        let resData = newGroupData;
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: resData
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resCode: err
        })
    }
}
// Delete
const deleteGroupById = async (req, res) => {
    try {
        let group = await Group.findOne({
            where: {
                id: req.params.id
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
                id: req.params.id,
            }
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: group
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resCode: err
        });
    }
}

module.exports = {
    addNewGroup,
    getAllGroup,
    getGroupById,
    updateGroup,
    deleteGroupById
}