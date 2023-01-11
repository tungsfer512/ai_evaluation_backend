const { Submission, Problem, SubmissionDetail, User } = require('../models/index');
const ProblemController = require('./problemController');
const csv = require('csvtojson')
const fs = require('fs');
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
                accuracy: newSubmissionData.accuracy,
                f1score: newSubmissionData.f1score,
                precision: newSubmissionData.precision,
                recall: newSubmissionData.recall,
                executionTime: newSubmissionData.executionTime,
                executionMemories: newSubmissionData.executionMemories,
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
        let submissions = await Submission.findAll({ 
            order: [['updatedAt', 'DESC']],
            raw: true 
        });
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
            order: [['updatedAt', 'DESC']],
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
            order: [['updatedAt', 'DESC']],
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
            order: [['updatedAt', 'DESC']],
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
            order: [['updatedAt', 'DESC']],
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
            order: [['updatedAt', 'DESC']],
            raw: true
        });
        if (!submission) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Submission not found.'
            });
        }
        let problem = await Problem.findOne({
            where: {
                id: req.params.problemId
            },
            raw: true
        });
        let user = await User.findOne({
            where: {
                id: req.params.userId
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
const getSubmissionById = async (req, res) => {
    try {
        let submission = await Submission.findOne({
            where: {
                id: req.params.submissionId
            },
            order: [['updatedAt', 'DESC']],
            raw: true
        });
        if (!submission) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Submission not found.'
            });
        }
        let details = await SubmissionDetail.findAll({
            where: {
                submissionId: req.params.submissionId
            }, 
            raw: true
        });
        submission.details = details;
        let user = await User.findOne({
            where: {
                id: submission.userId
            }, 
            raw: true
        });
        if(!user) {
            user = {
                username: '', 
                firstName: '', 
                lastName: ''
            }
        }
        submission.user = user;
        let problem = await Problem.findOne({
            where: {
                id: submission.problemId
            }, 
            raw: true
        });
        if(!problem) {
            problem = {
                id: '', 
                title: ''
            }
        }
        const jsonArray = await csv().fromFile(`./src/downloads/samples/${problem.outputSample}`);
        problem.outputTable = jsonArray.slice(0, 10);
        submission.problem = problem;
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
