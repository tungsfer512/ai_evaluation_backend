const { Dataset, Problem, Sample } = require('../models/index');
const { uploadFilesMiddleware } = require('./middlewareController');
const Minio = require('minio');
const dotenv = require('dotenv');
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
const addNewDataset = async (req, res) => {
    try {
        await uploadFilesMiddleware(req, res);
        if (req.files == undefined) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Upload files please!'
            });
        }
        const sample_names = req.files.videos.map((sample) => sample.filename);
        const result_names = req.files.results.map((result) => result.filename);
        sample_names.sort();
        result_names.sort();
        const sample_names_f = req.files.videos.map(
            (sample) => sample.filename.split('.')[0]
        );
        const result_names_f = req.files.results.map(
            (result) => result.filename.split('.')[0]
        );
        if (
            !(
                sample_names_f.length === result_names_f.length &&
                sample_names_f.every((item) => result_names_f.includes(item)) &&
                result_names_f.every((item) => sample_names_f.includes(item))
            )
        ) {
            return res.status(500).json({
                resCode: 500,
                resMessage: 'Invalid number of files or file names uploaded!'
            });
        }
        let newDatasetData = req.body;
        newDatasetData.path = newDatasetData.title
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '_');
        let datasetDuplicate = await Dataset.findOne({
            where: {
                path: newDatasetData.path
            },
            raw: true
        });
        if (datasetDuplicate) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Dataset already existed!'
            });
        }
        if (!newDatasetData.title) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Missing input value(s).'
            });
        }
        let newDataset = new Dataset({
            title: newDatasetData.title,
            path: newDatasetData.path
        });
        let resData = newDataset.dataValues;
        await newDataset.save();
        for (let i = 0; i < sample_names.length; i++) {
            let newSampleData = {};
            newSampleData.title = `${sample_names[i]}`;
            newSampleData.path = `${videosRoot}/${resData.path}/${sample_names[i]}`;
            newSampleData.truth = `${resultsRoot}/${resData.path}/${result_names[i]}`;
            // console.log(req.files['videos'][i].size);
            newSampleData.size = req.files['videos'][i].size;
            let sample = new Sample({
                title: newSampleData.title,
                path: newSampleData.path,
                truth: newSampleData.truth,
                size: newSampleData.size,
                datasetId: resData.id
            });
            await sample.save();
        }
        for (let i = 0; i < sample_names.length; i++) {
            minioClient.fPutObject(
                bucket,
                `${videosRoot}/${newDataset.path}/${sample_names[i]}`,
                `./src/uploads/videos/${sample_names[i]}`,
                (err, sampleInfo) => {
                    if (err) {
                        return res.status(500).json({
                            resCode: 500,
                            resMessage: err
                        });
                    }
                    console.log('Upload videos successfull');
                    minioClient.fPutObject(
                        bucket,
                        `${resultsRoot}/${newDataset.path}/${result_names[i]}`,
                        `./src/uploads/results/${result_names[i]}`,
                        (err, sampleInfo) => {
                            if (err) {
                                return res.status(500).json({
                                    resCode: 500,
                                    resMessage: err
                                });
                            }
                            console.log('Upload truth file successfull');
                            if (i == sample_names.length - 1) {
                                return res.status(200).json({
                                    resCode: 200,
                                    resMessage: 'OK',
                                    data: resData
                                });
                            }
                        }
                    );
                }
            );
        }
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Delete
const deleteDatasetById = async (req, res) => {
    try {
        let dataset = await Dataset.findOne({
            where: {
                id: req.params.datasetId
            },
            raw: true
        });
        if (!dataset) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Dataset not found.'
            });
        }
        let samples = await Sample.findAll({
            where: {
                datasetId: req.params.datasetId
            },
            raw: true
        });
        if (!dataset) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Dataset not found.'
            });
        }
        await Dataset.destroy({
            where: {
                id: req.params.datasetId
            },
            raw: true
        });
        let samplesName = samples.map((sample) => sample.path);
        let resultsName = samples.map((sample) => sample.truth);
        minioClient.removeObjects(bucket, samplesName, (e) => {
            if (e) {
                return res.status(500).json({
                    resCode: 500,
                    resMessage: e
                });
            }
            console.log('Removed samples successfully');
            minioClient.removeObjects(bucket, resultsName, (err) => {
                if (err) {
                    return res.status(500).json({
                        resCode: 500,
                        resMessage: err
                    });
                }
                console.log('Removed truths successfully');
                return res.status(200).json({
                    resCode: 200,
                    resMessage: 'OK',
                    data: dataset
                });
            });
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Update
const addNewSamples = async (req, res) => {
    try {
        await uploadFilesMiddleware(req, res);
        if (req.files == undefined) {
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Upload files please!'
            });
        }
        console.log(req.files);
        const sample_names = req.files.videos.map((sample) => sample.filename);
        const result_names = req.files.results.map((result) => result.filename);
        sample_names.sort();
        result_names.sort();
        const sample_names_f = req.files.videos.map(
            (sample) => sample.filename.split('.')[0]
        );
        const result_names_f = req.files.results.map(
            (result) => result.filename.split('.')[0]
        );
        if (
            !(
                sample_names_f.length === result_names_f.length &&
                sample_names_f.every((item) => result_names_f.includes(item)) &&
                result_names_f.every((item) => sample_names_f.includes(item))
            )
        ) {
            return res.status(500).json({
                resCode: 500,
                resMessage: 'Invalid number of files or file names uploaded!'
            });
        }
        let dataset = await Dataset.findOne({
            where: {
                id: req.body.datasetId
            },
            raw: true
        });
        if (!dataset) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Dataset not found.'
            });
        }
        for (let i = 0; i < sample_names.length; i++) {
            let newSampleData = {};
            newSampleData.title = `${sample_names[i]}`;
            newSampleData.path = `${videosRoot}/${dataset.path}/${sample_names[i]}`;
            newSampleData.truth = `${resultsRoot}/${dataset.path}/${result_names[i]}`;
            newSampleData.size = req.files['videos'][i].size;
            let sample = new Sample({
                title: newSampleData.title,
                path: newSampleData.path,
                truth: newSampleData.truth,
                size: newSampleData.size,
                datasetId: dataset.id
            });
            await sample.save();
        }
        for (let i = 0; i < sample_names.length; i++) {
            minioClient.fPutObject(
                bucket,
                `${videosRoot}/${dataset.path}/${sample_names[i]}`,
                `./src/uploads/${videosRoot}/${sample_names[i]}`,
                (err, sampleInfo) => {
                    if (err) {
                        return res.status(500).json({
                            resCode: 500,
                            resMessage: err
                        });
                    }
                    console.log('Upload videos successfull');
                    minioClient.fPutObject(
                        bucket,
                        `${resultsRoot}/${dataset.path}/${result_names[i]}`,
                        `./src/uploads/${resultsRoot}/${result_names[i]}`,
                        (err, sampleInfo) => {
                            if (err) {
                                return res.status(500).json({
                                    resCode: 500,
                                    resMessage: err
                                });
                            }
                            console.log('Upload truth successfull');
                            if (i == sample_names.length - 1) {
                                return res.status(200).json({
                                    resCode: 200,
                                    resMessage: 'OK'
                                });
                            }
                        }
                    );
                }
            );
        }
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const deleteSampleById = async (req, res) => {
    try {
        let sampleId = req.params.sampleId;
        let sample = await Sample.findOne({
            where: {
                id: sampleId
            },
            raw: true
        });
        if (!sample) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Sample not found!'
            });
        }
        await Sample.destroy({
            where: {
                id: sampleId
            },
            raw: true
        });
        let videoPath = `${sample.path}`;
        let resultPath = `${sample.truth}`;
        console.log(videoPath, resultPath);
        minioClient.removeObject(bucket, videoPath, async (err) => {
            if (err) {
                return res.status(500).json({
                    resCode: 500,
                    resMessage: err
                });
            }
            minioClient.removeObject(bucket, resultPath, async (err) => {
                if (err) {
                    return res.status(500).json({
                        resCode: 500,
                        resMessage: err
                    });
                }
                console.log('Removed samples and truths');
                return res.status(200).json({
                    resCode: 200,
                    resMessage: 'OK'
                });
            });
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
// Read
const getAllDataset = async (req, res) => {
    try {
        let datasets = await Dataset.findAll({ raw: true });
        if (!datasets) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Dataset not found.'
            });
        }
        for (let i = 0; i < datasets.length; i++) {
            datasets[i].samples = await Sample.findAll({
                where: {
                    datasetId: datasets[i].id
                },
                raw: true
            });
            datasets[i].numberOfSamples = datasets[i].samples.length;
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: datasets
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getDatasetByProblemId = async (req, res) => {
    try {
        let dataset = await Dataset.findOne({
            where: {
                problemId: req.params.problemId
            },
            raw: true
        });
        if (!dataset) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Dataset not found.'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: dataset
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const getDatasetById = async (req, res) => {
    try {
        let dataset = await Dataset.findOne({
            where: {
                id: req.params.datasetId
            },
            raw: true
        });
        if (!dataset) {
            return res.status(404).json({
                resCode: 404,
                resMessage: 'Dataset not found.'
            });
        }
        dataset.samples = await Sample.findAll({
            where: {
                datasetId: dataset.id
            },
            raw: true
        });
        dataset.numberOfSamples = dataset.samples.length;
        delete dataset.truth;
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: dataset
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: err
        });
    }
};
const checkMinio = async (req, res) => {
    let data;
    minioClient.getObject(bucket, 'results/ob.csv', function (err, dataStream) {
        if (err) {
            return console.log(err);
        }
        dataStream.on('data', function (chunk) {
            data += chunk;
        });
        dataStream.on('end', function () {
            return res.status(200).json({
                resCode: 200,
                resMessage: 'OK',
                data: data
            });
        });
        dataStream.on('error', function (err) {
            return console.log(err);
        });
    });
};

module.exports = {
    addNewDataset,
    deleteDatasetById,
    addNewSamples,
    deleteSampleById,
    getAllDataset,
    getDatasetByProblemId,
    checkMinio,
    getDatasetById
};
