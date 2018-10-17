'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _apysignature = require('apysignature');

var _apysignature2 = _interopRequireDefault(_apysignature);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _exceptions = require('./exceptions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
* VERSION 1.8.4
* */

var apis = {
    text: '/api/send_mail/',
    template: '/api/send_mail/template/',
    search: '/api/mail/search/',
    specifics: '/api/mail/search/specifics/'
};

function getUrl(options) {
    var sendMethod = apis[options.endpoint];
    var signedReq = new _apysignature2.default.Request(options.method, sendMethod, {});
    var token = new _apysignature2.default.Token(options.apiKey, options.apiSecret);
    token.sign(signedReq);
    var authDict = signedReq.getAuthDict();
    return '' + options.serverUri + sendMethod + '?' + _querystring2.default.stringify(authDict);
}

var Api = function () {
    function Api(key, secret, returnRawError, serverUri, timeoutRead) {
        _classCallCheck(this, Api);

        if (!key || typeof key !== 'string') {
            throw new _exceptions.NoPublicKey();
        }
        if (!secret || typeof secret !== 'string') {
            throw new _exceptions.NoSecretKey();
        }
        if (serverUri) {
            if (typeof serverUri !== 'string') {
                throw new _exceptions.InvalidServerUri();
            }
        }
        this.apiKey = key;
        this.apiSecret = secret;
        this.returnRawError = returnRawError || false;
        this.serverUri = serverUri || 'mittepro.mittepro.svc';
        this.timeout = timeoutRead * 1000;
    }

    _createClass(Api, [{
        key: 'sendRequest',
        value: function sendRequest(payload, endpoint, method, headers) {
            var _this = this;

            var httpMethod = method ? method.toLowerCase() : 'post';
            var url = getUrl({
                apiKey: this.apiKey,
                apiSecret: this.apiSecret,
                serverUri: this.serverUri,
                method: httpMethod,
                endpoint: endpoint
            });
            var options = {
                url: url,
                method: httpMethod.toUpperCase(),
                headers: headers || {},
                timeout: this.timeout
            };
            if (httpMethod === 'get') {
                options.qs = payload;
            } else {
                options.json = payload;
            }
            return new Promise(function (f, reject) {
                (0, _request2.default)(options, function (error, response, body) {
                    if (!error && [200, 201].indexOf(response.statusCode) > -1) {
                        f(body);
                    } else {
                        var errResponse = null;
                        if (error && (error.code === 'ETIMEDOUT' || error.code === 'ESOCKETTIMEDOUT')) {
                            errResponse = {
                                error: 'The server did not respond within the \n                            ' + _this.timeout + ' second(s) you stipulated'
                            };
                            if (_this.returnRawError) {
                                throw new _exceptions.TimeoutError(_this.timeout);
                            }
                        } else if (_this.returnRawError) {
                            errResponse = {
                                error: error,
                                body: body.slice(0, body.indexOf('Request Method')).trim()
                            };
                        } else {
                            var err = error;
                            if (!err) {
                                var msgError = void 0;
                                if (_lodash2.default.isString(body)) {
                                    msgError = body.slice(0, body.indexOf('Request Method')).trim();
                                } else {
                                    msgError = _lodash2.default.has(body, 'error') ? body.error : body.detail;
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
    }]);

    return Api;
}();

exports.default = Api;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcGkuanMiXSwibmFtZXMiOlsiYXBpcyIsInRleHQiLCJ0ZW1wbGF0ZSIsInNlYXJjaCIsInNwZWNpZmljcyIsImdldFVybCIsIm9wdGlvbnMiLCJzZW5kTWV0aG9kIiwiZW5kcG9pbnQiLCJzaWduZWRSZXEiLCJSZXF1ZXN0IiwibWV0aG9kIiwidG9rZW4iLCJUb2tlbiIsImFwaUtleSIsImFwaVNlY3JldCIsInNpZ24iLCJhdXRoRGljdCIsImdldEF1dGhEaWN0Iiwic2VydmVyVXJpIiwic3RyaW5naWZ5IiwiQXBpIiwia2V5Iiwic2VjcmV0IiwicmV0dXJuUmF3RXJyb3IiLCJ0aW1lb3V0UmVhZCIsInRpbWVvdXQiLCJwYXlsb2FkIiwiaGVhZGVycyIsImh0dHBNZXRob2QiLCJ0b0xvd2VyQ2FzZSIsInVybCIsInRvVXBwZXJDYXNlIiwicXMiLCJqc29uIiwiUHJvbWlzZSIsImYiLCJyZWplY3QiLCJlcnJvciIsInJlc3BvbnNlIiwiYm9keSIsImluZGV4T2YiLCJzdGF0dXNDb2RlIiwiZXJyUmVzcG9uc2UiLCJjb2RlIiwic2xpY2UiLCJ0cmltIiwiZXJyIiwibXNnRXJyb3IiLCJpc1N0cmluZyIsImhhcyIsImRldGFpbCIsIkVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBOzs7O0FBSUEsSUFBTUEsT0FBTztBQUNUQyxVQUFNLGlCQURHO0FBRVRDLGNBQVUsMEJBRkQ7QUFHVEMsWUFBUSxtQkFIQztBQUlUQyxlQUFXO0FBSkYsQ0FBYjs7QUFPQSxTQUFTQyxNQUFULENBQWdCQyxPQUFoQixFQUF5QjtBQUNyQixRQUFNQyxhQUFhUCxLQUFLTSxRQUFRRSxRQUFiLENBQW5CO0FBQ0EsUUFBTUMsWUFBWSxJQUFJLHVCQUFVQyxPQUFkLENBQXNCSixRQUFRSyxNQUE5QixFQUFzQ0osVUFBdEMsRUFBa0QsRUFBbEQsQ0FBbEI7QUFDQSxRQUFNSyxRQUFRLElB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eUJBTE0sTUFLQTtBQUNILGdDQUFJQyxNQUFNVCxLQUFWO0FBQ0EsZ0NBQUksQ0FBQ1MsR0FBTCxFQUFVO0FBQ04sb0NBQUlDLGlCQUFKO0FBQ0Esb0NBQUksaUJBQUVDLFFBQUYsQ0FBV1QsSUFBWCxDQUFKLEVBQXNCO0FBQ2xCUSwrQ0FBV1IsS0FBS0ssS0FBTCxDQUFXLENBQVgsRUFBY0wsS0FBS0MsT0FBTCxDQUFhLGdCQUFiLENBQWQsRUFBOENLLElBQTlDLEVBQVg7QUFDSCxpQ0FGRCxNQUVPO0FBQ0hFLCtDQUFXLGlCQUFFRSxHQUFGLENBQU1WLElBQU4sRUFBWSxPQUFaLElBQXVCQSxLQUFLRixLQUE1QixHQUFvQ0UsS0FBS1csTUFBcEQ7QUFDSDs7QUFFREosc0NBQU0sRUFBRUssT0FBT0osUUFBVCxFQUFOO0FBQ0g7QUFDREwsMENBQWNJLEdBQWQ7QUFDSDtBQUNEViwrQkFBT00sV0FBUDtBQUNIO0FBQ0osaUJBbENEO0FBbUNILGFBcENNLENBQVA7QUFxQ0g7Ozs7OztrQkE1RWdCdEIsRyIsImZpbGUiOiJhcGkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAncmVxdWVzdCc7XG5pbXBvcnQgc2lnbmF0dXJlIGZyb20gJ2FweXNpZ25hdHVyZSc7XG5pbXBvcnQgcXVlcnlzdHJpbmcgZnJvbSAncXVlcnlzdHJpbmcnO1xuaW1wb3J0IHsgTm9QdWJsaWNLZXksIE5vU2VjcmV0S2V5LCBJbnZhbGlkU2VydmVyVXJpLCBUaW1lb3V0RXJyb3IgfSBmcm9tICcuL2V4Y2VwdGlvbnMnO1xuXG4vKlxuKiBWRVJTSU9OIDEuOC40XG4qICovXG5cbmNvbnN0IGFwaXMgPSB7XG4gICAgdGV4dDogJy9hcGkvc2VuZF9tYWlsLycsXG4gICAgdGVtcGxhdGU6ICcvYXBpL3NlbmRfbWFpbC90ZW1wbGF0ZS8nLFxuICAgIHNlYXJjaDogJy9hcGkvbWFpbC9zZWFyY2gvJyxcbiAgICBzcGVjaWZpY3M6ICcvYXBpL21haWwvc2VhcmNoL3NwZWNpZmljcy8nLFxufTtcblxuZnVuY3Rpb24gZ2V0VXJsKG9wdGlvbnMpIHtcbiAgICBjb25zdCBzZW5kTWV0aG9kID0gYXBpc1tvcHRpb25zLmVuZHBvaW50XTtcbiAgICBjb25zdCBzaWduZWRSZXEgPSBuZXcgc2lnbmF0dXJlLlJlcXVlc3Qob3B0aW9ucy5tZXRob2QsIHNlbmRNZXRob2QsIHt9KTtcbiAgICBjb25zdCB0b2tlbiA9IG5ldyBzaWduYXR1cmUuVG9rZW4ob3B0aW9ucy5hcGlLZXksIG9wdGlvbnMuYXBpU2VjcmV0KTtcbiAgICB0b2tlbi5zaWduKHNpZ25lZFJlcSk7XG4gICAgY29uc3QgYXV0aERpY3QgPSBzaWduZWRSZXEuZ2V0QXV0aERpY3QoKTtcbiAgICByZXR1cm4gYCR7b3B0aW9ucy5zZXJ2ZXJVcml9JHtzZW5kTWV0aG9kfT8ke3F1ZXJ5c3RyaW5nLnN0cmluZ2lmeShhdXRoRGljdCl9YDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBpIHtcbiAgICBjb25zdHJ1Y3RvcihrZXksIHNlY3JldCwgcmV0dXJuUmF3RXJyb3IsIHNlcnZlclVyaSwgdGltZW91dFJlYWQpIHtcbiAgICAgICAgaWYgKCFrZXkgfHwgdHlwZW9mIGtleSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBOb1B1YmxpY0tleSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghc2VjcmV0IHx8IHR5cGVvZiBzZWNyZXQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTm9TZWNyZXRLZXkoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VydmVyVXJpKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNlcnZlclVyaSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZFNlcnZlclVyaSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXBpS2V5ID0ga2V5O1xuICAgICAgICB0aGlzLmFwaVNlY3JldCA9IHNlY3JldDtcbiAgICAgICAgdGhpcy5yZXR1cm5SYXdFcnJvciA9IHJldHVyblJhd0Vycm9yIHx8IGZhbHNlO1xuICAgICAgICB0aGlzLnNlcnZlclVyaSA9IHNlcnZlclVyaSB8fCAnbWl0dGVwcm8ubWl0dGVwcm8uc3ZjJztcbiAgICAgICAgdGhpcy50aW1lb3V0ID0gdGltZW91dFJlYWQgKiAxMDAwO1xuICAgIH1cbiAgICBzZW5kUmVxdWVzdChwYXlsb2FkLCBlbmRwb2ludCwgbWV0aG9kLCBoZWFkZXJzKSB7XG4gICAgICAgIGNvbnN0IGh0dHBNZXRob2QgPSBtZXRob2QgPyBtZXRob2QudG9Mb3dlckNhc2UoKSA6ICdwb3N0JztcbiAgICAgICAgY29uc3QgdXJsID0gZ2V0VXJsKHtcbiAgICAgICAgICAgIGFwaUtleTogdGhpcy5hcGlLZXksXG4gICAgICAgICAgICBhcGlTZWNyZXQ6IHRoaXMuYXBpU2VjcmV0LFxuICAgICAgICAgICAgc2VydmVyVXJpOiB0aGlzLnNlcnZlclVyaSxcbiAgICAgICAgICAgIG1ldGhvZDogaHR0cE1ldGhvZCxcbiAgICAgICAgICAgIGVuZHBvaW50LFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgIG1ldGhvZDogaHR0cE1ldGhvZC50b1VwcGVyQ2FzZSgpLFxuICAgICAgICAgICAgaGVhZGVyczogaGVhZGVycyB8fCB7fSxcbiAgICAgICAgICAgIHRpbWVvdXQ6IHRoaXMudGltZW91dCxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGh0dHBNZXRob2QgPT09ICdnZXQnKSB7XG4gICAgICAgICAgICBvcHRpb25zLnFzID0gcGF5bG9hZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9wdGlvbnMuanNvbiA9IHBheWxvYWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChmLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHJlcXVlc3Qob3B0aW9ucywgKGVycm9yLCByZXNwb25zZSwgYm9keSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghZXJyb3IgJiYgWzIwMCwgMjAxXS5pbmRleE9mKHJlc3BvbnNlLnN0YXR1c0NvZGUpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgZihib2R5KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZXJyUmVzcG9uc2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgJiYgKGVycm9yLmNvZGUgPT09ICdFVElNRURPVVQnIHx8IGVycm9yLmNvZGUgPT09ICdFU09DS0VUVElNRURPVVQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyUmVzcG9uc2UgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGBUaGUgc2VydmVyIGRpZCBub3QgcmVzcG9uZCB3aXRoaW4gdGhlIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy50aW1lb3V0fSBzZWNvbmQocykgeW91IHN0aXB1bGF0ZWRgLFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJldHVyblJhd0Vycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFRpbWVvdXRFcnJvcih0aGlzLnRpbWVvdXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucmV0dXJuUmF3RXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyclJlc3BvbnNlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IGJvZHkuc2xpY2UoMCwgYm9keS5pbmRleE9mKCdSZXF1ZXN0IE1ldGhvZCcpKS50cmltKCksXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVyciA9IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbXNnRXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF8uaXNTdHJpbmcoYm9keSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXNnRXJyb3IgPSBib2R5LnNsaWNlKDAsIGJvZHkuaW5kZXhPZignUmVxdWVzdCBNZXRob2QnKSkudHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1zZ0Vycm9yID0gXy5oYXMoYm9keSwgJ2Vycm9yJykgPyBib2R5LmVycm9yIDogYm9keS5kZXRhaWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyID0geyBFcnJvcjogbXNnRXJyb3IgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVyclJlc3BvbnNlID0gZXJyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJSZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==