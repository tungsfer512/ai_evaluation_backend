const { Submission, Problem } = require('../models/index');
const ProblemController = require('./problemController');

// Create
const addNewSubmission = async (req, res) => {
    try {
        let newSubmissionData = req.body;
        if (!newSubmissionData.userId || !newSubmissionData.problemId) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let newSubmission = new Submission(newSubmissionData);
        let resData = newSubmission.dataValues;
        await newSubmission.save();
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
const deleteSubmissionById = async (req, res) => {
    try {
        let submission = await Submission.findOne({
            where: {
                id: req.params.submissionId
            },
            raw: true
        });
        if (!submission) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Submission not found.'
            });
        }
        await Submission.destroy({
            where: {
                id: req.params.submissionId
            },
            raw: true
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: submission
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Update
const updateSubmissionById = async (req, res) => {
    try {
        let submission = await Submission.findOne({
            where: {
                id: req.params.submissionId
            },
            raw: true
        });
        if (!submission) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Submission not found.'
            });
        }
        let newSubmissionData = req.body;
        if (!newSubmissionData.userId || !newSubmissionData.problemId) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        await Submission.update(
            {
                accuracyModel: newSubmissionData.accuracyModel,
                accuracyTest: newSubmissionData.accuracyTest,
                excutionTime: newSubmissionData.excutionTime,
                excutionMemories: newSubmissionData.excutionMemories,
                status: newSubmissionData.status,
                description: newSubmissionData.description
            },
            {
                where: {
                    id: req.params.submissionId
                },
                raw: true
            }
        );
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: submission
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Read
const getAllSubmission = async (req, res) => {
    try {
        let submissions = await Submission.findAll({ raw: true });
        if (!submissions) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Submission not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: submissions
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getAllSubmissionByGroupId = async (req, res) => {
    try {
        let problems = await Problem.findAll({
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
        let submissions = [];
        problems.forEach(async (problem) => {
            let data = await Submission.findOne({
                where: {
                    problemId: problem.id
                },
                raw: true
            });
            submissions.push(data);
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: submissions
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getAllSubmissionBySubGroupId = async (req, res) => {
    try {
        let problems = await Problem.findAll({
            where: {
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
        let submissions = [];
        problems.forEach(async (problem) => {
            let data = await Submission.findOne({
                where: {
                    problemId: problem.id
                },
                raw: true
            });
            submissions.push(data);
        });
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: submissions
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getAllSubmissionByProblemId = async (req, res) => {
    try {
        let submission = await Submission.findAll({
            where: {
                problemId: req.params.problemId
            },
            raw: true
        });
        if (!submission) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Submission not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: submission
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getAllSubmissionByUserId = async (req, res) => {
    try {
        let submission = await Submission.findAll({
            where: {
                userId: req.params.userId
            },
            raw: true
        });
        if (!submission) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Submission not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: submission
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getAllSubmissionByUserIdAndProblemId = async (req, res) => {
    try {
        let submission = await Submission.findAll({
            where: {
                userId: req.params.userId,
                problemId: req.params.problemId
            },
            raw: true
        });
        if (!submission) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Submission not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: submission
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getSubmissionById = async (req, res) => {
    try {
        let submission = await Submission.findOne({
            where: {
                id: req.params.submissionId
            },
            raw: true
        });
        if (!submission) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Submission not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: submission
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};

module.exports = {
    addNewSubmission,
    deleteSubmissionById,
    updateSubmissionById,
    getAllSubmission,
    getAllSubmissionByGroupId,
    getAllSubmissionBySubGroupId,
    getAllSubmissionByProblemId,
    getAllSubmissionByUserId,
    getSubmissionById, 
    getAllSubmissionByUserIdAndProblemId
};
