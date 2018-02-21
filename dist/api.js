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
        this.serverUri = serverUri || 'http://postman.alterdata.com.br';
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
                        if (error.code === 'ETIMEDOUT') {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcGkuanMiXSwibmFtZXMiOlsiYXBpcyIsInRleHQiLCJ0ZW1wbGF0ZSIsInNlYXJjaCIsInNwZWNpZmljcyIsImdldFVybCIsIm9wdGlvbnMiLCJzZW5kTWV0aG9kIiwiZW5kcG9pbnQiLCJzaWduZWRSZXEiLCJSZXF1ZXN0IiwibWV0aG9kIiwidG9rZW4iLCJUb2tlbiIsImFwaUtleSIsImFwaVNlY3JldCIsInNpZ24iLCJhdXRoRGljdCIsImdldEF1dGhEaWN0Iiwic2VydmVyVXJpIiwic3RyaW5naWZ5IiwiQXBpIiwia2V5Iiwic2VjcmV0IiwicmV0dXJuUmF3RXJyb3IiLCJ0aW1lb3V0UmVhZCIsInRpbWVvdXQiLCJwYXlsb2FkIiwiaGVhZGVycyIsImh0dHBNZXRob2QiLCJ0b0xvd2VyQ2FzZSIsInVybCIsInRvVXBwZXJDYXNlIiwicXMiLCJqc29uIiwiUHJvbWlzZSIsImYiLCJyZWplY3QiLCJlcnJvciIsInJlc3BvbnNlIiwiYm9keSIsImluZGV4T2YiLCJzdGF0dXNDb2RlIiwiZXJyUmVzcG9uc2UiLCJjb2RlIiwiZXJyIiwibXNnRXJyb3IiLCJpc1N0cmluZyIsImhhcyIsImRldGFpbCIsIkVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLE9BQU87QUFDVEMsVUFBTSxpQkFERztBQUVUQyxjQUFVLDBCQUZEO0FBR1RDLFlBQVEsbUJBSEM7QUFJVEMsZUFBVztBQUpGLENBQWI7O0FBT0EsU0FBU0MsTUFBVCxDQUFnQkMsT0FBaEIsRUFBeUI7QUFDckIsUUFBTUMsYUFBYVAsS0FBS00sUUFBUUUsUUFBYixDQUFuQjtBQUNBLFFBQU1DLFlBQVksSUFBSSx1QkFBVUMsT0FBZCxDQUFzQkosUUFBUUssTUFBOUIsRUFBc0NKLFVBQXRDLEVBQWtELEVBQWxELENBQWxCO0FBQ0EsUUFBTUssUUFBUSxJQUFJLHVCQUFVQyxLQUFkLENBQW9CUCxR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LElBQVg7QUFDSCxpQ0FGRCxNQUVPO0FBQ0hNLCtDQUFXLGlCQUFFRSxHQUFGLENBQU1SLElBQU4sRUFBWSxPQUFaLElBQXVCQSxLQUFLRixLQUE1QixHQUFvQ0UsS0FBS1MsTUFBcEQ7QUFDSDs7QUFFREosc0NBQU0sRUFBRUssT0FBT0osUUFBVCxFQUFOO0FBQ0g7QUFDREgsMENBQWNFLEdBQWQ7QUFDSDtBQUNEUiwrQkFBT00sV0FBUDtBQUNIO0FBQ0osaUJBNUJEO0FBNkJILGFBOUJNLENBQVA7QUErQkg7Ozs7OztrQkF0RWdCdEIsRyIsImZpbGUiOiJhcGkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAncmVxdWVzdCc7XG5pbXBvcnQgc2lnbmF0dXJlIGZyb20gJ2FweXNpZ25hdHVyZSc7XG5pbXBvcnQgcXVlcnlzdHJpbmcgZnJvbSAncXVlcnlzdHJpbmcnO1xuaW1wb3J0IHsgTm9QdWJsaWNLZXksIE5vU2VjcmV0S2V5LCBJbnZhbGlkU2VydmVyVXJpLCBUaW1lb3V0RXJyb3IgfSBmcm9tICcuL2V4Y2VwdGlvbnMnO1xuXG5jb25zdCBhcGlzID0ge1xuICAgIHRleHQ6ICcvYXBpL3NlbmRfbWFpbC8nLFxuICAgIHRlbXBsYXRlOiAnL2FwaS9zZW5kX21haWwvdGVtcGxhdGUvJyxcbiAgICBzZWFyY2g6ICcvYXBpL21haWwvc2VhcmNoLycsXG4gICAgc3BlY2lmaWNzOiAnL2FwaS9tYWlsL3NlYXJjaC9zcGVjaWZpY3MvJyxcbn07XG5cbmZ1bmN0aW9uIGdldFVybChvcHRpb25zKSB7XG4gICAgY29uc3Qgc2VuZE1ldGhvZCA9IGFwaXNbb3B0aW9ucy5lbmRwb2ludF07XG4gICAgY29uc3Qgc2lnbmVkUmVxID0gbmV3IHNpZ25hdHVyZS5SZXF1ZXN0KG9wdGlvbnMubWV0aG9kLCBzZW5kTWV0aG9kLCB7fSk7XG4gICAgY29uc3QgdG9rZW4gPSBuZXcgc2lnbmF0dXJlLlRva2VuKG9wdGlvbnMuYXBpS2V5LCBvcHRpb25zLmFwaVNlY3JldCk7XG4gICAgdG9rZW4uc2lnbihzaWduZWRSZXEpO1xuICAgIGNvbnN0IGF1dGhEaWN0ID0gc2lnbmVkUmVxLmdldEF1dGhEaWN0KCk7XG4gICAgcmV0dXJuIGAke29wdGlvbnMuc2VydmVyVXJpfSR7c2VuZE1ldGhvZH0/JHtxdWVyeXN0cmluZy5zdHJpbmdpZnkoYXV0aERpY3QpfWA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwaSB7XG4gICAgY29uc3RydWN0b3Ioa2V5LCBzZWNyZXQsIHJldHVyblJhd0Vycm9yLCBzZXJ2ZXJVcmksIHRpbWVvdXRSZWFkKSB7XG4gICAgICAgIGlmICgha2V5IHx8IHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTm9QdWJsaWNLZXkoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXNlY3JldCB8fCB0eXBlb2Ygc2VjcmV0ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE5vU2VjcmV0S2V5KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlcnZlclVyaSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzZXJ2ZXJVcmkgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRTZXJ2ZXJVcmkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFwaUtleSA9IGtleTtcbiAgICAgICAgdGhpcy5hcGlTZWNyZXQgPSBzZWNyZXQ7XG4gICAgICAgIHRoaXMucmV0dXJuUmF3RXJyb3IgPSByZXR1cm5SYXdFcnJvciB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5zZXJ2ZXJVcmkgPSBzZXJ2ZXJVcmkgfHwgJ2h0dHA6Ly9wb3N0bWFuLmFsdGVyZGF0YS5jb20uYnInO1xuICAgICAgICB0aGlzLnRpbWVvdXQgPSB0aW1lb3V0UmVhZCAqIDEwMDA7XG4gICAgfVxuICAgIHNlbmRSZXF1ZXN0KHBheWxvYWQsIGVuZHBvaW50LCBtZXRob2QsIGhlYWRlcnMpIHtcbiAgICAgICAgY29uc3QgaHR0cE1ldGhvZCA9IG1ldGhvZCA/IG1ldGhvZC50b0xvd2VyQ2FzZSgpIDogJ3Bvc3QnO1xuICAgICAgICBjb25zdCB1cmwgPSBnZXRVcmwoe1xuICAgICAgICAgICAgYXBpS2V5OiB0aGlzLmFwaUtleSxcbiAgICAgICAgICAgIGFwaVNlY3JldDogdGhpcy5hcGlTZWNyZXQsXG4gICAgICAgICAgICBzZXJ2ZXJVcmk6IHRoaXMuc2VydmVyVXJpLFxuICAgICAgICAgICAgbWV0aG9kOiBodHRwTWV0aG9kLFxuICAgICAgICAgICAgZW5kcG9pbnQsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgbWV0aG9kOiBodHRwTWV0aG9kLnRvVXBwZXJDYXNlKCksXG4gICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzIHx8IHt9LFxuICAgICAgICAgICAgdGltZW91dDogdGhpcy50aW1lb3V0LFxuICAgICAgICB9O1xuICAgICAgICBpZiAoaHR0cE1ldGhvZCA9PT0gJ2dldCcpIHtcbiAgICAgICAgICAgIG9wdGlvbnMucXMgPSBwYXlsb2FkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3B0aW9ucy5qc29uID0gcGF5bG9hZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKGYsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgcmVxdWVzdChvcHRpb25zLCAoZXJyb3IsIHJlc3BvbnNlLCBib2R5KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFlcnJvciAmJiBbMjAwLCAyMDFdLmluZGV4T2YocmVzcG9uc2Uuc3RhdHVzQ29kZSkgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICBmKGJvZHkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBlcnJSZXNwb25zZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvci5jb2RlID09PSAnRVRJTUVET1VUJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyUmVzcG9uc2UgPSB7IGVycm9yOiBgVGhlIHNlcnZlciBkaWQgbm90IHJlc3BvbmQgd2l0aGluIHRoZSAke3RoaXMudGltZW91dH0gc2Vjb25kKHMpIHlvdSBzdGlwdWxhdGVkYCB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucmV0dXJuUmF3RXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVGltZW91dEVycm9yKHRoaXMudGltZW91dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5yZXR1cm5SYXdFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyUmVzcG9uc2UgPSB7IGVycm9yLCBib2R5IH07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXJyID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtc2dFcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXy5pc1N0cmluZyhib2R5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtc2dFcnJvciA9IGJvZHk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXNnRXJyb3IgPSBfLmhhcyhib2R5LCAnZXJyb3InKSA/IGJvZHkuZXJyb3IgOiBib2R5LmRldGFpbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnIgPSB7IEVycm9yOiBtc2dFcnJvciB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyUmVzcG9uc2UgPSBlcnI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVyclJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19