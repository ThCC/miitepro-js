import _ from 'lodash';
import request from 'request';
import querystring from 'querystring';
import { Token, Request } from './apysignature';
import { NoPublicKey, NoSecretKey, InvalidServerUri, TimeoutError } from './exceptions';

/*
* VERSION 1.10.0
* */

class AuthTimeStampError extends Error {
    constructor(message) {
        super();
        this.message = message; 
        this.name = 'AuthTimeStampError';
    }
}

const apis = {
    text: '/api/send_mail/',
    template: '/api/send_mail/template/',
    search: '/api/mail/search/',
    specifics: '/api/mail/search/specifics/',
};

function getUrl(options) {
    const sendMethod = apis[options.endpoint];
    const token = new Token(options.apiKey, options.apiSecret);
    const signedReq = new Request(options.method, sendMethod, {});
    token.sign(signedReq, options.authTimestamp);
    const authDict = signedReq.getAuthDict();
    return `${options.serverUri}${sendMethod}?${querystring.stringify(authDict)}`;
}

export default class Api {
    constructor(key, secret, returnRawError, serverUri, timeoutRead) {
        if (!key || typeof key !== 'string') {
            throw new NoPublicKey();
        }
        if (!secret || typeof secret !== 'string') {
            throw new NoSecretKey();
        }
        if (serverUri) {
            if (typeof serverUri !== 'string') {
                throw new InvalidServerUri();
            }
        }
        this.apiKey = key;
        this.apiSecret = secret;
        this.returnRawError = returnRawError || false;
        this.serverUri = serverUri || 'http://www.mitte.pro';
        this.timeout = timeoutRead * 1000;
    }
    sendRequest(payload, endpoint, method, headers, authTimestamp) {
        if (!authTimestamp) authTimestamp = null;
        const httpMethod = method ? method.toLowerCase() : 'post';
        const url = getUrl({
            apiKey: this.apiKey,
            apiSecret: this.apiSecret,
            serverUri: this.serverUri,
            method: httpMethod,
            endpoint,
            authTimestamp,
        });
        const options = {
            url,
            method: httpMethod.toUpperCase(),
            headers: headers || {},
            timeout: this.timeout,
        };
        if (httpMethod === 'get') {
            options.qs = payload;
        } else {
            options.json = payload;
        }
        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                if (!error && [200, 201].indexOf(response.statusCode) > -1) {
                    resolve(body);
                } else {
                    try {
                        const errResponse = this.errorTreatment(error, body);
                        reject(errResponse);
                    } catch (e) {
                        if (e.name = 'AuthTimeStampError') {
                            const rightAuthTimestamp = this.getRightAuthTimestamp(e.message);
                            this.sendRequest(
                                payload,
                                endpoint,
                                method,
                                headers,
                                rightAuthTimestamp
                            ).then((result) => {
                                resolve(result);
                            }, (error) => {
                                reject(error);
                            });
                        } else {
                            reject(e.message);
                        }
                    }
                }
            });
        });
    }
    getRightAuthTimestamp(msg) {
        const tempStr = msg.substring(msg.indexOf('Server time: '), msg.length + 1);
        return tempStr.substring(tempStr.indexOf(': ') + 2, tempStr.length + 1);
    }
    getErrorMsg(body) {
        if (_.isString(body)) {
            return body.slice(0, body.indexOf('Request Method')).trim();
        } else {
            return _.has(body, 'error') ? body.error : body.detail;
        }
    }
    errorTreatment(error, body) {
        let errResponse = null;
        const errorMsg = this.getErrorMsg(body);
        if (error && (error.code === 'ETIMEDOUT' || error.code === 'ESOCKETTIMEDOUT')) {
            errResponse = {
                error: `The server did not respond within the 
                ${this.timeout} second(s) you stipulated`,
            };
            if (this.returnRawError) {
                throw new TimeoutError(this.timeout);
            }
        } else if (errorMsg.indexOf('Server time: ') > 0) {
            throw new AuthTimeStampError(errorMsg);
        } else if (this.returnRawError) {
            if (_.isString(body)) {
                errResponse = { error, body: errorMsg };
            } else {
                errResponse = { error: errorMsg };
            }
        } else {
            errResponse = !error ? { error: errorMsg } : error;
        }
        return errResponse;
    }
}
