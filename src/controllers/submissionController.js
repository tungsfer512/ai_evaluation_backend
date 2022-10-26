const SubmissionService = require('../services/submissionService');

const addNewSubmission = async (req, res) => {
    let newSubmissionData = req.body;

    let submissionData = await SubmissionService.handleAddNewSubmission(
        newSubmissionData
    );

    if (submissionData.errCode !== 0) {
        return res.status(500).json({
            errCode: submissionData.errCode,
            errMesssage: submissionData.errMessage,
            data: submissionData.data
        });
    }

    return res.status(200).json({
        errCode: submissionData.errCode,
        errMesssage: submissionData.errMessage,
        data: submissionData.data
    });
};

const deleteSubmissionById = async (req, res) => {
    let submissionId = req.params.id;
    let submissionData = await SubmissionService.handleDeleteSubmissionById(
        submissionId
    );
    if (submissionData.errCode !== 0) {
        return res.status(500).json({
            errCode: submissionData.errCode,
            errMesssage: submissionData.errMessage,
            data: submissionData.data
        });
    }

    return res.status(200).json({
        errCode: submissionData.errCode,
        errMesssage: submissionData.errMessage,
        data: submissionData.data
    });
};

const updateSubmission = async (req, res) => {
    let newSubmissionData = req.body;
    newSubmissionData.id = req.params.id;
    let submissionData = await SubmissionService.handleUpdateSubmission(
        newSubmissionData
    );

    if (submissionData.errCode !== 0) {
        return res.status(500).json({
            errCode: submissionData.errCode,
            errMesssage: submissionData.errMessage,
            data: submissionData.data
        });
    }

    return res.status(200).json({
        errCode: submissionData.errCode,
        errMesssage: submissionData.errMessage,
        data: submissionData.data
    });
};

const getSubmissionById = async (req, res) => {
    let submissionId = req.params.id;
    let submissionData = await SubmissionService.handleGetSubmissionById(
        submissionId
    );
    if (submissionData.errCode !== 0) {
        return res.status(500).json({
            errCode: submissionData.errCode,
            errMesssage: submissionData.errMessage,
            data: submissionData.data
        });
    }

    return res.status(200).json({
        errCode: submissionData.errCode,
        errMesssage: submissionData.errMessage,
        data: submissionData.data
    });
};

const getAllSubmission = async (req, res) => {
    let submissionsData = await SubmissionService.handleGetAllSubmission();

    if (submissionsData.errCode !== 0) {
        return res.status(500).json({
            errCode: submissionsData.errCode,
            errMesssage: submissionsData.errMessage,
            data: submissionsData.data
        });
    }

    return res.status(200).json({
        errCode: submissionsData.errCode,
        errMesssage: submissionsData.errMessage,
        data: submissionsData.data
    });
};

module.exports = {
    addNewSubmission,
    deleteSubmissionById,
    updateSubmission,
    getSubmissionById,
    getAllSubmission
};
