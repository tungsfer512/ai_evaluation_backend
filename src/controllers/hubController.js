const axios = require('axios');

const AUTH_TOKEN = 'token 6b31ae0a90ca4ea9a6b8911cf0d9ad7d';

axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const findAvailableHub = async (req, res) => {
    while (true) {
        let newPassword = Math.random().toString(36).slice(-8);
        const response = await axios.get('https://hub.zcode.vn/hub/api/users');
        let data = response.data;
        for (let i = 0; i < data.length; i++) {
            let server = data[i];
            if (server.admin === false && server.server === null) {
                const postResponse = await axios.post(
                    `https://hub.zcode.vn/hub/api/users/${server.name}/server`
                );
                if(postResponse.status === 202) {
                    const patchResponse = await axios.patch(
                        `https://hub.zcode.vn/hub/api/users/${server.name}`,
                        {
                            password: newPassword
                        }
                    );
                    if (patchResponse) {
                        return res.status(200).json({
                            username: patchResponse.data.name,
                            token: newPassword
                        });
                    }
                }
            }
        }
    }
};

module.exports = {
    findAvailableHub
};
