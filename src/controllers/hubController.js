const axios = require('axios');
const delay = require('delay');

const AUTH_TOKEN = 'token 6b31ae0a90ca4ea9a6b8911cf0d9ad7d';

axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json, text/plain, */*';

const findAvailableHub = async (req, res) => {
    try {
        let newPassword = Math.random().toString(36).slice(-8);
        const response = await axios.get('https://hub.zcode.vn/hub/api/users');
        let data = response.data;
        for (let i = 0; i < data.length; i++) {
            let server = data[i];
            let servers = server.servers?.[''];
            if (
                server.admin === false &&
                server.server === null &&
                server.name !== 'server01' &&
                (!servers)
            ) {
                const postResponse = await axios.post(
                    `https://hub.zcode.vn/hub/api/users/${server.name}/server`
                );
                if (postResponse.status === 202) {
                    const patchResponse = await axios.patch(
                        `https://hub.zcode.vn/hub/api/users/${server.name}`,
                        {
                            password: newPassword
                        }
                    );

                    if (patchResponse) {
                        return res.status(200).json({
                            resCode: 200,
                            resMessage: 'OK',
                            data: {
                                username: patchResponse.data.name,
                                token: newPassword
                            }
                        });
                    }
                }
            }
        }
        return res.status(404).json({
            resCode: 404,
            resMessage: 'Not found'
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: 'Somethings went wrong'
        });
    }
};

const evaluate = async (req, res) => {
    try {
        let username = req.body.username;
        console.log(req.body);
        let nbConvert = await axios.post(
            'https://kube-connect.zcode.vn/nbconvert',
            {
                username: username,
                filename: 'predict5121.ipynb'
            }
        );
        if (nbConvert.data.code !== 0) {
            return res.status(500).json({
                resCode: 500,
                resMessage: 'Somethings went wrong'
            });
        }
        let cpRes = await axios.post('https://kube-connect.zcode.vn/cp', {
            username: username,
            src_filename: '/home/jovyan/predict5121.html'
        });
        if (cpRes.data.code !== 0) {
            return res.status(500).json({
                resCode: 500,
                resMessage: 'Somethings went wrong'
            });
        }
        return res.status(200).json({
            resCode: 200,
            resMessage: 'OK',
            data: cpRes.data
        });
    } catch (err) {
        return res.status(500).json({
            resCode: 500,
            resMessage: 'Somethings went wrong'
        });
    }
};

module.exports = {
    findAvailableHub,
    evaluate
};
