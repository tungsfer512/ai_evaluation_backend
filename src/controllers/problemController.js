const {
    Problem,
    SubGroup,
    Group,
    Submission,
    Dataset,
    Sample,
    User,
    SubmissionDetail
} = require('../models/index');
const Minio = require('minio');
const dotenv = require('dotenv');
const csv = require('csvtojson')
const fs = require('fs');
dotenv.config();

const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_END_POINT,
    port: Number.parseInt(process.env.MINIO_PORT) || 9000,
    useSSL: process.env.MINIO_SSL === 'true',
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY
});
const bucket = process.env.MINIO_BUCKET_NAME;
const videosRoot = process.env.MINIO_VIDEO_ROOT;
const resultsRoot = process.env.MINIO_RESULT_ROOT;


// Create
const addNewProblem = async (req, res) => {
    try {
        let newProblemData = req.body;
        // console.log(newProblemData);
        if (
            !newProblemData.title ||
            !newProblemData.description ||
            !newProblemData.inputDescription ||
            !newProblemData.outputDescription ||
            !newProblemData.datasetId ||
            !newProblemData.subGroupId
        ) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let sample = await Sample.findOne({
            where: {
                datasetId: newProblemData.datasetId
            },
            order: ['size'],
            raw: true
        });
        let pathArray = sample.path.split('/');
        let name = pathArray[pathArray.length - 2];
        let newProblem = new Problem({
            title: newProblemData.title,
            description: newProblemData.description,
            inputDescription: newProblemData.inputDescription,
            outputDescription: newProblemData.outputDescription,
            datasetId: newProblemData.datasetId,
            subGroupId: newProblemData.subGroupId,
            inputSample: name + '.mp4',
            outputSample: name + '.csv'
        });
        let resData = newProblem.dataValues;
        await newProblem.save();
        minioClient.fGetObject(
            bucket,
            sample.path,
            `./src/downloads/samples/${name}.mp4`,
            async function (err) {
                if (err) {
                    console.log(err);
                }
                console.log('success video');
                minioClient.fGetObject(
                    bucket,
                    sample.truth,
                    `./src/downloads/samples/${name}.csv`,
                    async function (err) {
                        if (err) {
                            console.log(err);
                        }
                        console.log('success csv');
                        return res.status(200).json({
                            resCode: 200,
                            resMessage: 'OK',
                            data: resData
                        });
                    }
                );
            }
        );
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
            !newProblemData.datasetId ||
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
                datasetId: newProblemData.datasetId,
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
        for (let i = 0; i < problems.length; i++) {
            let subGroup = await SubGroup.findOne({
                where: {
                    id: problems[i].subGroupId
                },
                raw: true
            });
            let group = await Group.findOne({
                where: {
                    id: subGroup.groupId
                },
                raw: true
            });
            let submissions = await Submission.findAll({
                where: {
                    problemId: problems[i].id
                },
                raw: true
            });
            problems[i].subGroup = subGroup;
            problems[i].group = group;
            problems[i].submissions = submissions.length || 0;
            problems[i].dataset = await Dataset.findOne({
                where: {
                    id: problems[i].datasetId
                },
                raw: true
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
const getAllFreeProblem = async (req, res) => {
    try {
        let datasets = await Dataset.findAll({ raw: true });
        if (!datasets) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Dataset not found.'
            });
        }
        let busyProblemsId = datasets.map((dataset) => dataset.problemId);
        let problems = await Problem.findAll({ raw: true });
        if (!problems) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Problem not found.'
            });
        }
        let resData = problems.filter(
            (problem) => !busyProblemsId.includes(problem.id)
        );
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
        let submissions = await Submission.findAll({
            where: {
                problemId: problem.id
            },
            raw: true
        });
        for (let j = 0; j < submissions.length; j++) {
            submissions[j].user = await User.findOne({
                where: {
                    id: submissions[j].userId
                },
                raw: true
            });
            submissions[j].details = await SubmissionDetail.findAll({
                where: {
                    submissionId: submissions[j].id
                },
                raw: true
            });
            
        }
        problem.submissions = submissions;
        problem.dataset = await Dataset.findOne({
            where: {
                id: problem.datasetId
            },
            raw: true
        });
        const jsonArray = await csv().fromFile(`./src/downloads/samples/${problem.outputSample}`);
        problem.outputTable = jsonArray.slice(0, 10);
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
    getAllFreeProblem,
    getAllProblemBySubGroupId,
    getProblemById
};
