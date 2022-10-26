const { Dataset } = require('../models/index');

const handleAddNewDataset = async (newDatasetData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let datasetData = {};
            if (
                !newDatasetData.title ||
                !newDatasetData.description ||
                !newDatasetData.path
            ) {
                datasetData.errCode = 1;
                datasetData.errMessage = 'Missing input(s) parameters';
                datasetData.data = {};
            } else {
                datasetData.errCode = 0;
                datasetData.errMessage = 'OK';
                datasetData.data = newDatasetData;
                let NEWPROBLEM = new Dataset(newDatasetData);
                NEWPROBLEM.save();
            }
            resolve(datasetData);
        } catch (err) {
            reject(err);
        }
    });
};

const handleDeleteDatasetById = async (datasetId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let datasetData = {};
            let dataset = await Dataset.findOne({
                where: {
                    id: datasetId
                },
                raw: true
            });
            if (!dataset) {
                datasetData.errCode = 3;
                datasetData.errMessage = 'Dataset not found';
                datasetData.data = {};
            } else {
                datasetData.errCode = 0;
                datasetData.errMessage = 'OK';
                datasetData.data = dataset;
                await Dataset.destroy({
                    where: {
                        id: datasetId
                    }
                });
            }
            resolve(datasetData);
        } catch (err) {
            reject(err);
        }
    });
};

const handleUpdateDataset = async (newDatasetData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let updatedDatasetData = {};
            let datasetData = await Dataset.findOne({
                where: {
                    id: newDatasetData.id
                },
                raw: true
            });
            if (
                !newDatasetData.title ||
                !newDatasetData.description ||
                !newDatasetData.path
            ) {
                updatedDatasetData.errCode = 1;
                updatedDatasetData.errMessage = 'Missing input(s) parameters';
                updatedDatasetData.data = {};
            } else {
                updatedDatasetData.errCode = 0;
                updatedDatasetData.errMessage = 'OK';
                updatedDatasetData.data = datasetData;
                await Dataset.update(
                    {
                        title: newDatasetData.title,
                        description: newDatasetData.description,
                        path: newDatasetData.path
                    },
                    {
                        where: {
                            id: newDatasetData.id
                        }
                    }
                );
            }
            resolve(updatedDatasetData);
        } catch (err) {
            reject(err);
        }
    });
};

const handleGetDatasetById = async (datasetId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let datasetData = {};
            let dataset = await Dataset.findOne({
                where: {
                    id: datasetId
                },
                raw: true
            });
            if (!dataset) {
                datasetData.errCode = 3;
                datasetData.errMessage = 'Dataset not found';
                datasetData.data = {};
            } else {
                datasetData.errCode = 0;
                datasetData.errMessage = 'OK';
                datasetData.data = dataset;
            }
            resolve(datasetData);
        } catch (err) {
            reject(err);
        }
    });
};

const handleGetAllDataset = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let datasetsData = {};
            let datasets = await Dataset.findAll({});
            if (!datasets) {
                datasetsData.errCode = 3;
                datasetsData.errMessage = 'Datasets not found';
                datasetsData.data = {};
            } else {
                datasetsData.errCode = 0;
                datasetsData.errMessage = 'OK';
                datasetsData.data = datasets;
            }
            resolve(datasetsData);
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = {
    handleAddNewDataset,
    handleDeleteDatasetById,
    handleUpdateDataset,
    handleGetDatasetById,
    handleGetAllDataset
};
