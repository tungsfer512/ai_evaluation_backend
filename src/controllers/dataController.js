const { Dataset, Problem } = require('../models/index');
const ProblemController = require('./problemController');

// Create
const addNewDataset = async (req, res) => {
    try {
        let newDatasetData = req.body;
        if (
            !newDatasetData.title ||
            !newDatasetData.path ||
            !newDatasetData.description ||
            !newDatasetData.problemId
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let newDataset = new Dataset({
            title: newDatasetData.title,
            path: newDatasetData.path,
            description: newDatasetData.description,
            problemId: newDatasetData.problemId
        });
        let resData = newDataset.dataValues;
        await newDataset.save();
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
// Delete
const deleteDatasetById = async (req, res) => {
    try {
        let dataset = await Dataset.findOne({
            where: {
                id: req.params.datasetId
            },
            raw: true
        });
        if (!dataset) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Dataset not found.'
            });
        }
        await Dataset.destroy({
            where: {
                id: req.params.datasetId
            },
            raw: true
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: dataset
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Update
const updateDatasetById = async (req, res) => {
    try {
        let dataset = await Dataset.findOne({
            where: {
                id: req.params.datasetId
            },
            raw: true
        });
        if (!dataset) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Dataset not found.'
            });
        }
        let newDatasetData = req.body;
        if (
            !newDatasetData.title ||
            !newDatasetData.path ||
            !newDatasetData.description ||
            !newDatasetData.problemId
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        await Dataset.update(
            {
                title: newDatasetData.title,
                path: newDatasetData.path,
                description: newDatasetData.description,
                problemId: newDatasetData.problemId
            },
            {
                where: {
                    id: req.params.datasetId
                },
                raw: true
            }
        );
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Read
const getAllDataset = async (req, res) => {
    try {
        let datasets = await Dataset.findall({ raw: true });
        if (!datasets) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Dataset not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: datasets
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getAllDatasetByGroupId = async (req, res) => {
    try {
        let problems = await Problem.findall({
            where: {
                groupId: req.params.groupId
            },
            raw: true
        });
        if (!problems) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Group not found.'
            });
        }
        let datasets = [];
        problems.forEach(async (problem) => {
            let data = await Dataset.findOne({
                where: {
                    problemId: problem.id
                },
                raw: true
            });
            datasets.push(data);
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: datasets
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getAllDatasetBySubGroupId = async (req, res) => {
    try {
        let problems = await Problem.findall({
            where: {
                groupId: req.params.groupId,
                subGroupId: res.params.subGroupId
            },
            raw: true
        });
        if (!problems) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'SubGroup not found.'
            });
        }
        let datasets = [];
        problems.forEach(async (problem) => {
            let data = await Dataset.findOne({
                where: {
                    problemId: problem.id
                },
                raw: true
            });
            datasets.push(data);
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: datasets
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getAllDatasetByProblemId = async (req, res) => {
    try {
        let dataset = await Dataset.findAll({
            where: {
                problemId: req.params.problemId
            },
            raw: true
        });
        if (!dataset) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Dataset not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: dataset
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getDatasetById = async (req, res) => {
    try {
        let dataset = await Dataset.findOne({
            where: {
                id: req.params.datasetId
            },
            raw: true
        });
        if (!dataset) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Dataset not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: dataset
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};

module.exports = {
    addNewDataset,
    deleteDatasetById,
    updateDatasetById,
    getAllDataset,
    getAllDatasetByGroupId,
    getAllDatasetBySubGroupId,
    getAllDatasetByProblemId,
    getDatasetById
};
