import axios from '../../axios';


class URLClassifier {

    constructor() {
        this.validateURL = this.validateURL.bind(this);
        this.classify = this.classify.bind(this);
    }

    /**
     * @param {string} [url]
     * @returns {string} [url]
     */
    validateURL = url => {
        if (url.indexOf("http://") === 0 || url.indexOf("https://") === 0) {
            return url;
        }
        else {
            return ("http://" + url);
        }
    }

    /**
     * @param {string} [url]
     * @returns {Promise} {url, blacklist, predict} | {...}
     */
    async classify(url) {
        // const response = axios.get('classify?url=' + url);
        // return response;
        url = this.validateURL(url);

        return new Promise((resolve, reject) => {
            axios.get('classify?url=' + url).then(response => {
                resolve(JSON.stringify(response.data, null, ' '))
            })
            .catch(e => {
                reject(e)
            })
        });
    }
}

let classifier;
try {
    classifier = new URLClassifier();
} catch (e) {
    console.log(e);
}

export default classifier;