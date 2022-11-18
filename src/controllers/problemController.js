const { Problem } = require('../models/index');

// Create
const addNewProblem = async (req, res) => {
    try {
        let newProblemData = req.body;
        if (
            !newProblemData.title ||
            !newProblemData.description ||
            !newProblemData.inputDescription ||
            !newProblemData.outputDescription ||
            !newProblemData.subGroupId
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let newProblem = new Problem({
            title: newProblemData.title,
            description: newProblemData.description,
            inputDescription: newProblemData.inputDescription,
            outputDescription: newProblemData.outputDescription,
            subGroupId: newProblemData.subGroupId
        });
        let resData = newProblem.dataValues;
        await newProblem.save();
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
const deleteProblemById = async (req, res) => {
    try {
        let problem = await Problem.findOne({
            where: {
                id: req.params.problemId
            },
            raw: true
        });
        if (!problem) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Problem not found.'
            });
        }
        await Problem.destroy({
            where: {
                id: req.params.problemId
            },
            raw: true
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: problem
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Update
const updateProblemById = async (req, res) => {
    try {
        let problem = await Problem.findOne({
            where: {
                id: req.params.problemId
            },
            raw: true
        });
        if (!problem) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Problem not found.'
            });
        }
        let newProblemData = req.body;
        if (
            !newProblemData.title ||
            !newProblemData.description ||
            !newProblemData.inputDescription ||
            !newProblemData.outputDescription ||
            !newProblemData.subGroupId
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        await Problem.update(
            {
                title: newProblemData.title,
                description: newProblemData.description,
                inputDescription: newProblemData.inputDescription,
                outputDescription: newProblemData.outputDescription,
                subGroupId: newProblemData.subGroupId
            },
            {
                where: {
                    id: req.params.problemId
                },
                raw: true
            }
        );
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: problem
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Read
const getAllProblem = async (req, res) => {
    try {
        let problems = await Problem.findAll({ raw: true });
        if (!problems) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Problem not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: problems
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// const getAllProblemByGroupId = async (req, res) => {
//     try {
//         let problems = await Problem.findAll({
//             where: {
//                 groupId: req.params.groupId
//             },
//             raw: true
//         });
//         if (!problems) {
//             return res.status(404).json({
//                 resCode: 404,
//                 resMessage: 'Problem not found.'
//             });
//         }
//         return res.status(200).json({
//             resCode: 200,
//             resMessage: 'OK',
//             data: problems
//         });
//     } catch (err) {
//         return res.status(500).json({
//             resCode: 500,
//             resMessage: err
//         });
//     }
// };
const getAllProblemBySubGroupId = async (req, res) => {
    try {
        let problems = await Problem.findAll({
            where: {
                subGroupId: req.params.subGroupId
            },
            raw: true
        });
        if (!problems) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Problem not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: problems
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getProblemById = async (req, res) => {
    try {
        let problem = await Problem.findOne({
            where: {
                id: req.params.problemId
            },
            raw: true
        });
        if (!problem) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Problem not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: problem
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};

module.exports = {
    addNewProblem,
    deleteProblemById,
    updateProblemById,
    getAllProblem,
    // getAllProblemByGroupId,
    getAllProblemBySubGroupId,
    getProblemById
};
