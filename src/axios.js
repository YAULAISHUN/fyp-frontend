import axios from 'axios';

var BASE_URL = 'https://fyp20054-backend-classifier.uc.r.appspot.com/';

const instance = axios.create({
    baseURL: BASE_URL
});

export default instance;