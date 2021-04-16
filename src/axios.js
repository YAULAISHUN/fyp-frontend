import axios from 'axios';

var BASE_URL = 'http://14.136.81.5:5000/';

const instance = axios.create({
    baseURL: BASE_URL
});

export default instance;