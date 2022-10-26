const { Submission } = require('../models/index');

const handleAddNewSubmission = async (newSubmissionData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let submissionData = {};

            submissionData.errCode = 0;
            submissionData.errMessage = 'OK';
            submissionData.data = newSubmissionData;
            let NEWPROBLEM = new Submission(newSubmissionData);
            NEWPROBLEM.save();
            resolve(submissionData);
        } catch (err) {
            reject(err);
        }
    });
};

const handleDeleteSubmissionById = async (submissionId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let submissionData = {};
            let submission = await Submission.findOne({
                where: {
                    id: submissionId
                },
                raw: true
            });
            if (!submission) {
                submissionData.errCode = 3;
                submissionData.errMessage = 'Submission not found';
                submissionData.data = {};
            } else {
                submissionData.errCode = 0;
                submissionData.errMessage = 'OK';
                submissionData.data = submission;
                await Submission.destroy({
                    where: {
                        id: submissionId
                    }
                });
            }
            resolve(submissionData);
        } catch (err) {
            reject(err);
        }
    });
};

const handleUpdateSubmission = async (newSubmissionData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let updatedSubmissionData = {};
            let submissionData = await Submission.findOne({
                where: {
                    id: newSubmissionData.id
                },
                raw: true
            });
            updatedSubmissionData.errCode = 0;
            updatedSubmissionData.errMessage = 'OK';
            updatedSubmissionData.data = submissionData;
            await Submission.update(
                {
                    title: newSubmissionData.title,
                    description: newSubmissionData.description,
                    inputDescription: newSubmissionData.inputDescription,
                    outputDescription: newSubmissionData.outputDescription,
                    groupId: newSubmissionData.groupId,
                    subGroupId: newSubmissionData.subGroupId
                },
                {
                    where: {
                        id: newSubmissionData.id
                    }
                }
            );
            resolve(updatedSubmissionData);
        } catch (err) {
            reject(err);
        }
    });
};

const handleGetSubmissionById = async (submissionId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let submissionData = {};
            let submission = await Submission.findOne({
                where: {
                    id: submissionId
                },
                raw: true
            });
            if (!submission) {
                submissionData.errCode = 3;
                submissionData.errMessage = 'Submission not found';
                submissionData.data = {};
            } else {
                submissionData.errCode = 0;
                submissionData.errMessage = 'OK';
                submissionData.data = submission;
            }
            resolve(submissionData);
        } catch (err) {
            reject(err);
        }
    });
};

const handleGetAllSubmission = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let submissionsData = {};
            let submissions = await Submission.findAll({});
            if (!submissions) {
                submissionsData.errCode = 3;
                submissionsData.errMessage = 'Submissions not found';
                submissionsData.data = {};
            } else {
                submissionsData.errCode = 0;
                submissionsData.errMessage = 'OK';
                submissionsData.data = submissions;
            }
            resolve(submissionsData);
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = {
    handleAddNewSubmission,
    handleDeleteSubmissionById,
    handleUpdateSubmission,
    handleGetSubmissionById,
    handleGetAllSubmission
};
