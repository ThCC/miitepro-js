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
        this.serverUri = serverUri || 'http://www.mitte.pro';
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
                        if (error.code === 'ETIMEDOUT' || error.code === 'ESOCKETTIMEDOUT') {
                            errResponse = { error: 'The server did not respond within the ' + _this.timeout + ' second(s) you stipulated' };
                            if (_this.returnRawError) {
                                throw new _exceptions.TimeoutError(_this.timeout);
                            }
                        } else if (_this.returnRawError) {
                            errResponse = { error: error, body: body };
                        } else {
                            var err = error;
                            if (!err) {
                                var msgError = void 0;
                                if (_lodash2.default.isString(body)) {
                                    msgError = body;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcGkuanMiXSwibmFtZXMiOlsiYXBpcyIsInRleHQiLCJ0ZW1wbGF0ZSIsInNlYXJjaCIsInNwZWNpZmljcyIsImdldFVybCIsIm9wdGlvbnMiLCJzZW5kTWV0aG9kIiwiZW5kcG9pbnQiLCJzaWduZWRSZXEiLCJSZXF1ZXN0IiwibWV0aG9kIiwidG9rZW4iLCJUb2tlbiIsImFwaUtleSIsImFwaVNlY3JldCIsInNpZ24iLCJhdXRoRGljdCIsImdldEF1dGhEaWN0Iiwic2VydmVyVXJpIiwic3RyaW5naWZ5IiwiQXBpIiwia2V5Iiwic2VjcmV0IiwicmV0dXJuUmF3RXJyb3IiLCJ0aW1lb3V0UmVhZCIsInRpbWVvdXQiLCJwYXlsb2FkIiwiaGVhZGVycyIsImh0dHBNZXRob2QiLCJ0b0xvd2VyQ2FzZSIsInVybCIsInRvVXBwZXJDYXNlIiwicXMiLCJqc29uIiwiUHJvbWlzZSIsImYiLCJyZWplY3QiLCJlcnJvciIsInJlc3BvbnNlIiwiYm9keSIsImluZGV4T2YiLCJzdGF0dXNDb2RlIiwiZXJyUmVzcG9uc2UiLCJjb2RlIiwiZXJyIiwibXNnRXJyb3IiLCJpc1N0cmluZyIsImhhcyIsImRldGFpbCIsIkVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLE9BQU87QUFDVEMsVUFBTSxpQkFERztBQUVUQyxjQUFVLDBCQUZEO0FBR1RDLFlBQVEsbUJBSEM7QUFJVEMsZUFBVztBQUpGLENBQWI7O0FBT0EsU0FBU0MsTUFBVCxDQUFnQkMsT0FBaEIsRUFBeUI7QUFDckIsUUFBTUMsYUFBYVAsS0FBS00sUUFBUUUsUUFBYixDQUFuQjtBQUNBLFFBQU1DLFlBQVksSUFBSSx1QkFBVUMsT0FBZCxDQUFzQkosUUFBUUssTUFBOUIsRUFBc0NKLFVBQXRDLEVBQWtELEVBQWxELENBQWxCO0FBQ0EsUUFBTUssUUFBUSxJQUFJLHVCQUFVQyxLQUFkLENBQW9CUCxR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SUFBWCxDQUFKLEVBQXNCO0FBQ2xCTSwrQ0FBV04sSUFBWDtBQUNILGlDQUZELE1BRU87QUFDSE0sK0NBQVcsaUJBQUVFLEdBQUYsQ0FBTVIsSUFBTixFQUFZLE9BQVosSUFBdUJBLEtBQUtGLEtBQTVCLEdBQW9DRSxLQUFLUyxNQUFwRDtBQUNIOztBQUVESixzQ0FBTSxFQUFFSyxPQUFPSixRQUFULEVBQU47QUFDSDtBQUNESCwwQ0FBY0UsR0FBZDtBQUNIO0FBQ0RSLCtCQUFPTSxXQUFQO0FBQ0g7QUFDSixpQkE1QkQ7QUE2QkgsYUE5Qk0sQ0FBUDtBQStCSDs7Ozs7O2tCQXRFZ0J0QixHIiwiZmlsZSI6ImFwaS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgcmVxdWVzdCBmcm9tICdyZXF1ZXN0JztcbmltcG9ydCBzaWduYXR1cmUgZnJvbSAnYXB5c2lnbmF0dXJlJztcbmltcG9ydCBxdWVyeXN0cmluZyBmcm9tICdxdWVyeXN0cmluZyc7XG5pbXBvcnQgeyBOb1B1YmxpY0tleSwgTm9TZWNyZXRLZXksIEludmFsaWRTZXJ2ZXJVcmksIFRpbWVvdXRFcnJvciB9IGZyb20gJy4vZXhjZXB0aW9ucyc7XG5cbmNvbnN0IGFwaXMgPSB7XG4gICAgdGV4dDogJy9hcGkvc2VuZF9tYWlsLycsXG4gICAgdGVtcGxhdGU6ICcvYXBpL3NlbmRfbWFpbC90ZW1wbGF0ZS8nLFxuICAgIHNlYXJjaDogJy9hcGkvbWFpbC9zZWFyY2gvJyxcbiAgICBzcGVjaWZpY3M6ICcvYXBpL21haWwvc2VhcmNoL3NwZWNpZmljcy8nLFxufTtcblxuZnVuY3Rpb24gZ2V0VXJsKG9wdGlvbnMpIHtcbiAgICBjb25zdCBzZW5kTWV0aG9kID0gYXBpc1tvcHRpb25zLmVuZHBvaW50XTtcbiAgICBjb25zdCBzaWduZWRSZXEgPSBuZXcgc2lnbmF0dXJlLlJlcXVlc3Qob3B0aW9ucy5tZXRob2QsIHNlbmRNZXRob2QsIHt9KTtcbiAgICBjb25zdCB0b2tlbiA9IG5ldyBzaWduYXR1cmUuVG9rZW4ob3B0aW9ucy5hcGlLZXksIG9wdGlvbnMuYXBpU2VjcmV0KTtcbiAgICB0b2tlbi5zaWduKHNpZ25lZFJlcSk7XG4gICAgY29uc3QgYXV0aERpY3QgPSBzaWduZWRSZXEuZ2V0QXV0aERpY3QoKTtcbiAgICByZXR1cm4gYCR7b3B0aW9ucy5zZXJ2ZXJVcml9JHtzZW5kTWV0aG9kfT8ke3F1ZXJ5c3RyaW5nLnN0cmluZ2lmeShhdXRoRGljdCl9YDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBpIHtcbiAgICBjb25zdHJ1Y3RvcihrZXksIHNlY3JldCwgcmV0dXJuUmF3RXJyb3IsIHNlcnZlclVyaSwgdGltZW91dFJlYWQpIHtcbiAgICAgICAgaWYgKCFrZXkgfHwgdHlwZW9mIGtleSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBOb1B1YmxpY0tleSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghc2VjcmV0IHx8IHR5cGVvZiBzZWNyZXQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTm9TZWNyZXRLZXkoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VydmVyVXJpKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNlcnZlclVyaSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZFNlcnZlclVyaSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXBpS2V5ID0ga2V5O1xuICAgICAgICB0aGlzLmFwaVNlY3JldCA9IHNlY3JldDtcbiAgICAgICAgdGhpcy5yZXR1cm5SYXdFcnJvciA9IHJldHVyblJhd0Vycm9yIHx8IGZhbHNlO1xuICAgICAgICB0aGlzLnNlcnZlclVyaSA9IHNlcnZlclVyaSB8fCAnaHR0cDovL3d3dy5taXR0ZS5wcm8nO1xuICAgICAgICB0aGlzLnRpbWVvdXQgPSB0aW1lb3V0UmVhZCAqIDEwMDA7XG4gICAgfVxuICAgIHNlbmRSZXF1ZXN0KHBheWxvYWQsIGVuZHBvaW50LCBtZXRob2QsIGhlYWRlcnMpIHtcbiAgICAgICAgY29uc3QgaHR0cE1ldGhvZCA9IG1ldGhvZCA/IG1ldGhvZC50b0xvd2VyQ2FzZSgpIDogJ3Bvc3QnO1xuICAgICAgICBjb25zdCB1cmwgPSBnZXRVcmwoe1xuICAgICAgICAgICAgYXBpS2V5OiB0aGlzLmFwaUtleSxcbiAgICAgICAgICAgIGFwaVNlY3JldDogdGhpcy5hcGlTZWNyZXQsXG4gICAgICAgICAgICBzZXJ2ZXJVcmk6IHRoaXMuc2VydmVyVXJpLFxuICAgICAgICAgICAgbWV0aG9kOiBodHRwTWV0aG9kLFxuICAgICAgICAgICAgZW5kcG9pbnQsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgbWV0aG9kOiBodHRwTWV0aG9kLnRvVXBwZXJDYXNlKCksXG4gICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzIHx8IHt9LFxuICAgICAgICAgICAgdGltZW91dDogdGhpcy50aW1lb3V0LFxuICAgICAgICB9O1xuICAgICAgICBpZiAoaHR0cE1ldGhvZCA9PT0gJ2dldCcpIHtcbiAgICAgICAgICAgIG9wdGlvbnMucXMgPSBwYXlsb2FkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3B0aW9ucy5qc29uID0gcGF5bG9hZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKGYsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgcmVxdWVzdChvcHRpb25zLCAoZXJyb3IsIHJlc3BvbnNlLCBib2R5KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFlcnJvciAmJiBbMjAwLCAyMDFdLmluZGV4T2YocmVzcG9uc2Uuc3RhdHVzQ29kZSkgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICBmKGJvZHkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBlcnJSZXNwb25zZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvci5jb2RlID09PSAnRVRJTUVET1VUJyB8fCBlcnJvci5jb2RlID09PSAnRVNPQ0tFVFRJTUVET1VUJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyUmVzcG9uc2UgPSB7IGVycm9yOiBgVGhlIHNlcnZlciBkaWQgbm90IHJlc3BvbmQgd2l0aGluIHRoZSAke3RoaXMudGltZW91dH0gc2Vjb25kKHMpIHlvdSBzdGlwdWxhdGVkYCB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucmV0dXJuUmF3RXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVGltZW91dEVycm9yKHRoaXMudGltZW91dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5yZXR1cm5SYXdFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyUmVzcG9uc2UgPSB7IGVycm9yLCBib2R5IH07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXJyID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtc2dFcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXy5pc1N0cmluZyhib2R5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtc2dFcnJvciA9IGJvZHk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXNnRXJyb3IgPSBfLmhhcyhib2R5LCAnZXJyb3InKSA/IGJvZHkuZXJyb3IgOiBib2R5LmRldGFpbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnIgPSB7IEVycm9yOiBtc2dFcnJvciB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyUmVzcG9uc2UgPSBlcnI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVyclJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19