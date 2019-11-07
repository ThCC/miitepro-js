"use strict";

import _ from 'lodash';
import crypto from 'crypto';
import moment from 'moment';
import querystring from 'querystring';

const wrongTimestamp = moment().subtract(4, 'hours').unix();

class Token {
    constructor(key, secret) {
        this.key = key;
        this.secret = secret;
    }
    sign(request, authTimestamp) {
        request.sign(this, authTimestamp);
    }
}

class Request {
    constructor(method, path, query) {
        var _this = this;
        this.authDict = {};
        this.queryDict = {};
        this.signed = false;
        this.AUTH_VERSION = '1.0';
        this.ISO8601 = moment().toISOString();
        if (typeof path != 'string') throw new Error('Expected string');
        if (typeof query != 'object') throw new Error('Expected object');

        _.forEach(query, function (value, key) {
            var keyLower = key.toLowerCase();
            if (keyLower.search('auth_') >= 0) {
                _this.authDict[keyLower] = value.trim();
            }
            else {
                if (_.isArray(value)) {
                    _.forEach(value, function (v, idx) {
                        value[idx] = v.trim();
                    });
                    _this.queryDict[keyLower + '[]'] = value;
                } else if (_.isObject(value)) {
                    _this.queryDict[keyLower] = value;
                } else {
                    _this.queryDict[keyLower] = value.trim();
                }

            }
        });
        this.path = path;
        this.method = method.toUpperCase();
    }

    sign(token, authTimestamp) {
        this.authDict = {
            auth_version: this.AUTH_VERSION,
            auth_key: token.key,
            auth_timestamp: authTimestamp || moment().unix()
        };

        this.authDict['auth_signature'] = this.signature(token);
        this.signed = true;
        return this.authDict;
    }

    getAuthDict() {
        if (!this.signed) throw new Error('Request not signed');
        return this.authDict;
    }

    signedParams() {
        return _.extend(this.queryDict, this.authDict);
    }

    sortObj(obj) {
        var ordered = {};
        Object.keys(obj).sort().forEach((key) => ordered[key] = obj[key]);
        return ordered;
    }

    parameterString() {
        var paramDict = this.signedParams() || {};
        var paramDictLower = {};
        _.forEach(paramDict, function (value, key) {
            paramDictLower[key.toLowerCase()] = value;
        });
        delete paramDictLower['auth_signature'];
        var stringifyed = querystring.stringify(this.sortObj(paramDictLower));
        return querystring.unescape(stringifyed);
    }

    stringToSign() {
        return [this.method, this.path, this.parameterString()].join('\n');
    }

    signature(token) {
        return crypto.createHmac('sha256', token.secret).update(this.stringToSign()).digest('hex');
    }
}

export { Token, Request }