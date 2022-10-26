const { Problem } = require('../models/index');

const handleAddNewProblem = async (newProblemData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let problemData = {};
            if (
                !newProblemData.title ||
                !newProblemData.description ||
                !newProblemData.inputDescription ||
                !newProblemData.outputDescription
            ) {
                problemData.errCode = 1;
                problemData.errMessage = 'Missing input(s) parameters';
                problemData.data = {};
            } else {
                problemData.errCode = 0;
                problemData.errMessage = 'OK';
                problemData.data = newProblemData;
                let NEWPROBLEM = new Problem(newProblemData);
                NEWPROBLEM.save();
            }
            resolve(problemData);
        } catch (err) {
            reject(err);
        }
    });
};

const handleDeleteProblemById = async (problemId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let problemData = {};
            let problem = await Problem.findOne({
                where: {
                    id: problemId
                },
                raw: true
            });
            if (!problem) {
                problemData.errCode = 3;
                problemData.errMessage = 'Problem not found';
                problemData.data = {};
            } else {
                problemData.errCode = 0;
                problemData.errMessage = 'OK';
                problemData.data = problem;
                await Problem.destroy({
                    where: {
                        id: problemId
                    }
                });
            }
            resolve(problemData);
        } catch (err) {
            reject(err);
        }
    });
};

const handleUpdateProblem = async (newProblemData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let updatedProblemData = {};
            let problemData = await Problem.findOne({
                where: {
                    id: newProblemData.id
                },
                raw: true
            });
            if (
                !newProblemData.title ||
                !newProblemData.description ||
                !newProblemData.inputDescription ||
                !newProblemData.outputDescription
            ) {
                updatedProblemData.errCode = 1;
                updatedProblemData.errMessage = 'Missing input(s) parameters';
                updatedProblemData.data = {};
            } else {
                updatedProblemData.errCode = 0;
                updatedProblemData.errMessage = 'OK';
                updatedProblemData.data = problemData;
                await Problem.update(
                    {
                        title: newProblemData.title,
                        description: newProblemData.description,
                        inputDescription: newProblemData.inputDescription,
                        outputDescription: newProblemData.outputDescription,
                        groupId: newProblemData.groupId,
                        subGroupId: newProblemData.subGroupId
                    },
                    {
                        where: {
                            id: newProblemData.id
                        }
                    }
                );
            }
            resolve(updatedProblemData);
        } catch (err) {
            reject(err);
        }
    });
};

const handleGetProblemById = async (problemId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let problemData = {};
            let problem = await Problem.findOne({
                where: {
                    id: problemId
                },
                raw: true
            });
            if (!problem) {
                problemData.errCode = 3;
                problemData.errMessage = 'Problem not found';
                problemData.data = {};
            } else {
                problemData.errCode = 0;
                problemData.errMessage = 'OK';
                problemData.data = problem;
            }
            resolve(problemData);
        } catch (err) {
            reject(err);
        }
    });
};

const handleGetAllProblem = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let problemsData = {};
            let problems = await Problem.findAll({});
            if (!problems) {
                problemsData.errCode = 3;
                problemsData.errMessage = 'Problems not found';
                problemsData.data = {};
            } else {
                problemsData.errCode = 0;
                problemsData.errMessage = 'OK';
                problemsData.data = problems;
            }
            resolve(problemsData);
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = {
    handleAddNewProblem,
    handleDeleteProblemById,
    handleUpdateProblem,
    handleGetProblemById,
    handleGetAllProblem
};
