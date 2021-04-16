/* global gapi */

// Client ID and API key from the Developer Console
var CLIENT_ID = '569214060627-bf9hrcjag8bi66275dr7hea44a4f3sni.apps.googleusercontent.com';
var API_KEY = 'AIzaSyCTQjsnITLbLqFDO42WMiokKyf38qe8Mms';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = 'https://mail.google.com/';

const metaHeaders = ["From", "To", "Date", "Subject"];

class GmailAPI {
    constructor() {
        this.signIn = false;
        this.listenCallback = null;
        try {
            this.initClient = this.initClient.bind(this);
            this.handleError = this.handleError.bind(this);
            this.getMessages = this.getMessages.bind(this);
            this.updateSigninStatus = this.updateSigninStatus.bind(this);
            this.normalizeData = this.normalizeData.bind(this);
            this.listenSign = this.listenSign.bind(this);

            gapi.load("client:auth2", this.initClient);
        } catch (e) {
            console.log(e);
        }
    }

    // Initialize the API client library
    initClient() {
        try {
            gapi.client.init(
                {
                    apiKey: API_KEY,
                    clientId: CLIENT_ID,
                    discoveryDocs: DISCOVERY_DOCS,
                    scope: SCOPES
                }
            ).then(() => {
                this.listenSign(this.updateSigninStatus);
                this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
                if (!!this.listenCallback) {
                    this.listenSign(this.listenCallback);
                    this.listenCallback(gapi.auth2.getAuthInstance().isSignedIn.get());
                }
            });
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Sign in google account
     * @returns {Promise}
     */
    handleSignIn() {
        try {
            return gapi.auth2.getAuthInstance().signIn();
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Sign out google account
     * @returns {Promise}
     */
    handleSignOut() {
        try {
            return gapi.auth2.getAuthInstance().signOut();
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Method for update your sign if it was changed
     * @param {*} callback function for updating sign status
     */
    listenSign(callback) {
        if (gapi.auth2) {
            gapi.auth2.getAuthInstance().isSignedIn.listen(callback);
        } else {
            this.listenCallback = callback;
        }
    }

    // Update SignIn property
    updateSigninStatus(isSignedIn) {
        this.signIn = isSignedIn;
    }

    /**
     * @param {string} userId
     * @returns {Promise} Object: { emailAddress, messagesTotal, threadsTotal , historyId }
     */
    getProfile(userId = "me") {
        if (this.signIn) {
            return gapi.client.gmail.users.getProfile({ userId });
        } else {
            return this.handleError();
        }
    }

    /**
     * @param {boolean} [unread=false]
     * @param {number} [maxResults=10]
     * @param {string} [userId="me"]
     * @returns {Promise} [{id, labelIds, snippet, internalDate, payload}] | {...}
     */
    getMessages(unread = false, maxResults = 10, userId = "me", labelIds = "INBOX") {
        if (this.signIn) {
            let q = "";
            if (!!unread) {
                q = "is:unread";
            }

            return new Promise((resolve, reject) => {
                gapi.client.gmail.users.messages
                    .list({ userId, maxResults, q, labelIds })
                    .then(resIds => {
                        if (typeof ids === "string") {
                            resolve(gapi.client.gmail.users.messages.get({ userId, id: resIds.result.id }));
                        } else {
                            let resData = [];
                            if (resIds.result.hasOwnProperty("messages")) {
                                resData = Promise.all(
                                    resIds.result.messages.map(({ id }) => gapi.client.gmail.users.messages.get({ userId, id }))
                                );
                            }
                            resolve(resData);
                        }
                    })
                    .catch(e => {
                        reject(e);
                    });
            });
        } else {
            return this.handleError();
        }
    }

    sendMessage(sender, receiver, title, content) {
        if (this.signIn) {

            var to = 'To: ' + receiver;
            var from = 'From: ' + sender;
            var subject = 'Subject: ' + title;
            var contentType = 'Content-Type: text/plain; charset=utf-8';
            var mime = 'MIME-Version: 1.0';

            let message = "";
            message += to + "\r\n";
            message += from + "\r\n";
            message += subject + "\r\n";
            message += contentType + "\r\n";
            message += mime + "\r\n";
            message += "\r\n" + content;

            // The body needs to be base64url encoded.
            const encodedMessage = btoa(message).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

            gapi.client.gmail.users.messages.send({
                userId: 'me',
                resource: {
                    raw: encodedMessage
                }
            }).then(response => {
                console.log(response)
            });
        }
        else {
            return this.handleError();
        }
    }


    /*---------- Helper Functions ----------*/

    /**
     *  Normalize data
     * @param {array | object} data getMessages response
     * @returns {array | object}
     */
    normalizeData(data) {
        let result;

        if (Array.isArray(data)) {
            result = data.map(res => {
                const { id, snippet } = res.result;
                return {
                    ...this.getMetaFromHeaders(res),
                    id,
                    snippet,
                    body: this.getBody(res)
                };
            });
        } else {
            const { id, snippet } = data.result;
            result = {
                ...this.getMetaFromHeaders(data),
                id,
                snippet,
                body: this.getBody(data)
            };
        }
        return result;
    }

    /**
    * Get headers for preview
    * @param {object} data getMessageIds headers response
    */
    getMetaFromHeaders(data) {
        if (data.hasOwnProperty("signIn")) return;
        let result = {};
        const { headers } = data.result.payload;
        headers.forEach(header => {
            if (metaHeaders.indexOf(header.name) > -1) {
                result[header.name.toLowerCase()] = header.value;
            }
        });
        return result;
    }

    /**
     * Get body and decode
     * @param {array | object} data getMessages response
     * @returns {object} text, html
     */
    getBody(data) {
        if (data.hasOwnProperty("signIn")) return;
        const {
            result: { payload }
        } = data;
        let result = {
            text: "",
            html: ""
        };

        if (payload.hasOwnProperty("parts")) {
            payload.parts.forEach(part => {
                if (part.mimeType === "text/plain") {
                    result.text = atob(part.body.data.replace(/-/g, "+").replace(/_/g, "/"));
                }
                if (part.mimeType === "text/html") {
                    result.html = decodeURIComponent(escape(atob(part.body.data.replace(/-/g, "+").replace(/_/g, "/"))));
                }
            });
        } else {
            if (!!payload.body.size) {
                result.text = atob(payload.body.data.replace(/-/g, "+").replace(/_/g, "/"));
            }
        }
        return result;
    }

    /**
   * Error Handler
   * @param {string} message
   */
    handleError(message = "You are not authorized or api not initialized!") {
        return new Promise((_, reject) => {
            reject({
                message,
                signIn: this.signIn
            });
        });
    }

}

// Instance of GmailApi
let gmailAPI;
try {
    gmailAPI = new GmailAPI();
} catch (e) {
    console.log(e);
}


export default gmailAPI;