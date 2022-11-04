const axios = require('axios');

const AUTH_TOKEN = 'token 6b31ae0a90ca4ea9a6b8911cf0d9ad7d';

axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const findAvailableHub = async (req, res) => {
    const response = await axios.get('https://hub.zcode.vn/hub/api/users');
    // console.log(response);
    let data = response.data;
    let resData = [];
    data.forEach((item) => {
        if (!item.server) {
            resData.push(item);
        }
    });
    console.log(resData);
    let newPassword = Math.random().toString(36).slice(-8);
    const patchResponse = await axios.patch(
        `https://hub.zcode.vn/hub/api/users/nunt`,
        {
            password: newPassword
        }
    );

    return res.status(200).json({
        username: patchResponse.data.name,
        token: newPassword
    });
};

const getNewHubInfo = async (req, res) => {};

module.exports = {
    findAvailableHub,
    getNewHubInfo
};
