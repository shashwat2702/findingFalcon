const axios = require('axios');

const getData = url => axios.get(url);
const postData = (url, payload) => axios.post(url, { data: payload });
export { getData, postData };
