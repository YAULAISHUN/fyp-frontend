import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://14.136.81.5:5000/'
});

export default instance;