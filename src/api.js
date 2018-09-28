import _ from 'lodash';
import request from 'request';
import signature from 'apysignature';
import querystring from 'querystring';
import { NoPublicKey, NoSecretKey, InvalidServerUri, TimeoutError } from './exceptions';

/*
* VERSION 1.8.0
* */

const apis = {
    text: '/api/send_mail/',
    template: '/api/send_mail/template/',
    search: '/api/mail/search/',
    specifics: '/api/mail/search/specifics/',
};

function getUrl(options) {
    const sendMethod = apis[options.endpoint];
    const signedReq = new signature.Request(options.method, sendMethod, {});
    const token = new signature.Token(options.apiKey, options.apiSecret);
    token.sign(signedReq);
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
        this.serverUri = serverUri || 'mittepro.mittepro.svc';
        this.timeout = timeoutRead * 1000;
    }
    sendRequest(payload, endpoint, method, headers) {
        const httpMethod = method ? method.toLowerCase() : 'post';
        const url = getUrl({
            apiKey: this.apiKey,
            apiSecret: this.apiSecret,
            serverUri: this.serverUri,
            method: httpMethod,
            endpoint,
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
        return new Promise((f, reject) => {
            request(options, (error, response, body) => {
                if (!error && [200, 201].indexOf(response.statusCode) > -1) {
                    f(body);
                } else {
                    let errResponse = null;
                    if (error && (error.code === 'ETIMEDOUT' || error.code === 'ESOCKETTIMEDOUT')) {
                        errResponse = { error: `The server did not respond within the ${this.timeout} second(s) you stipulated` };
                        if (this.returnRawError) {
                            throw new TimeoutError(this.timeout);
                        }
                    } else if (this.returnRawError) {
                        errResponse = { error, body };
                    } else {
                        let err = error;
                        if (!err) {
                            let msgError;
                            if (_.isString(body)) {
                                msgError = body;
                            } else {
                                msgError = _.has(body, 'error') ? body.error : body.detail;
                            }

                            err = { Error: msgError };
                        }
                        errResponse = err;
                    }
                    reject(errResponse);
                }
            });
        });
    }
}
