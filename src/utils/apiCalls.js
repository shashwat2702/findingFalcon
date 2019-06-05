const axios = require('axios');

const getData = url => axios.get(url);
const postData = (url, data) => axios.post(url, data, {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
export { getData, postData };
