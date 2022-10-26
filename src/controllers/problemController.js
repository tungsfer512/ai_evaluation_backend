const ProblemService = require('../services/problemService');

const addNewProblem = async (req, res) => {
    let newProblemData = req.body;

    let problemData = await ProblemService.handleAddNewProblem(newProblemData);

    if (problemData.errCode !== 0) {
        return res.status(500).json({
            errCode: problemData.errCode,
            errMesssage: problemData.errMessage,
            data: problemData.data
        });
    }

    return res.status(200).json({
        errCode: problemData.errCode,
        errMesssage: problemData.errMessage,
        data: problemData.data
    });
};

const deleteProblemById = async (req, res) => {
    let problemId = req.params.id;
    let problemData = await ProblemService.handleDeleteProblemById(problemId);
    if (problemData.errCode !== 0) {
        return res.status(500).json({
            errCode: problemData.errCode,
            errMesssage: problemData.errMessage,
            data: problemData.data
        });
    }

    return res.status(200).json({
        errCode: problemData.errCode,
        errMesssage: problemData.errMessage,
        data: problemData.data
    });
};

const updateProblem = async (req, res) => {
    let newProblemData = req.body;
    newProblemData.id = req.params.id;
    let problemData = await ProblemService.handleUpdateProblem(newProblemData);

    if (problemData.errCode !== 0) {
        return res.status(500).json({
            errCode: problemData.errCode,
            errMesssage: problemData.errMessage,
            data: problemData.data
        });
    }

    return res.status(200).json({
        errCode: problemData.errCode,
        errMesssage: problemData.errMessage,
        data: problemData.data
    });
};

const getProblemById = async (req, res) => {
    let problemId = req.params.id;
    let problemData = await ProblemService.handleGetProblemById(problemId);
    if (problemData.errCode !== 0) {
        return res.status(500).json({
            errCode: problemData.errCode,
            errMesssage: problemData.errMessage,
            data: problemData.data
        });
    }

    return res.status(200).json({
        errCode: problemData.errCode,
        errMesssage: problemData.errMessage,
        data: problemData.data
    });
};

const getAllProblem = async (req, res) => {
    let problemsData = await ProblemService.handleGetAllProblem();

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
    addNewProblem,
    deleteProblemById,
    updateProblem,
    getProblemById,
    getAllProblem
};
