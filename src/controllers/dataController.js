const DataService = require('../services/dataService');

const addNewData = async (req, res) => {
    let newDataData = req.body;

    let datasetData = await DataService.handleAddNewDataset(newDataData);

    if (datasetData.errCode !== 0) {
        return res.status(500).json({
            errCode: datasetData.errCode,
            errMesssage: datasetData.errMessage,
            data: datasetData.data
        });
    }

    return res.status(200).json({
        errCode: datasetData.errCode,
        errMesssage: datasetData.errMessage,
        data: datasetData.data
    });
};

const deleteDataById = async (req, res) => {
    let datasetId = req.params.id;
    let datasetData = await DataService.handleDeleteDatasetById(datasetId);
    if (datasetData.errCode !== 0) {
        return res.status(500).json({
            errCode: datasetData.errCode,
            errMesssage: datasetData.errMessage,
            data: datasetData.data
        });
    }

    return res.status(200).json({
        errCode: datasetData.errCode,
        errMesssage: datasetData.errMessage,
        data: datasetData.data
    });
};

const updateData = async (req, res) => {
    let newDataData = req.body;
    newDataData.id = req.params.id;
    let datasetData = await DataService.handleUpdateDataset(newDataData);

    if (datasetData.errCode !== 0) {
        return res.status(500).json({
            errCode: datasetData.errCode,
            errMesssage: datasetData.errMessage,
            data: datasetData.data
        });
    }

    return res.status(200).json({
        errCode: datasetData.errCode,
        errMesssage: datasetData.errMessage,
        data: datasetData.data
    });
};

const getDataById = async (req, res) => {
    let datasetId = req.params.id;
    let datasetData = await DataService.handleGetDatasetById(datasetId);
    if (datasetData.errCode !== 0) {
        return res.status(500).json({
            errCode: datasetData.errCode,
            errMesssage: datasetData.errMessage,
            data: datasetData.data
        });
    }

    return res.status(200).json({
        errCode: datasetData.errCode,
        errMesssage: datasetData.errMessage,
        data: datasetData.data
    });
};

const getAllData = async (req, res) => {
    let datasetsData = await DataService.handleGetAllDataset();

    if (datasetsData.errCode !== 0) {
        return res.status(500).json({
            errCode: datasetsData.errCode,
            errMesssage: datasetsData.errMessage,
            data: datasetsData.data
        });
    }

    return res.status(200).json({
        errCode: datasetsData.errCode,
        errMesssage: datasetsData.errMessage,
        data: datasetsData.data
    });
};

module.exports = {
    addNewData,
    deleteDataById,
    updateData,
    getDataById,
    getAllData
};
