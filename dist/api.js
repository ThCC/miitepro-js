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
* VERSION 1.8.6
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
                            if (_lodash2.default.isString(body)) {
                                errResponse = {
                                    error: error,
                                    body: body.slice(0, body.indexOf('Request Method')).trim()
                                };
                            } else {
                                errResponse = {
                                    error: _lodash2.default.has(body, 'error') ? body.error : body.detail
                                };
                            }
                        } else {
                            var err = error;
                            if (!err) {
                                var msgError = void 0;
                                if (_lodash2.default.isString(body)) {
                                    msgError = body.slice(0, body.indexOf('Request Method')).trim();
                                } else {
                                    msgError = _lodash2.default.has(body, 'error') ? body.error : body.detail;
                                }

                                err = { error: msgError };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcGkuanMiXSwibmFtZXMiOlsiYXBpcyIsInRleHQiLCJ0ZW1wbGF0ZSIsInNlYXJjaCIsInNwZWNpZmljcyIsImdldFVybCIsIm9wdGlvbnMiLCJzZW5kTWV0aG9kIiwiZW5kcG9pbnQiLCJzaWduZWRSZXEiLCJSZXF1ZXN0IiwibWV0aG9kIiwidG9rZW4iLCJUb2tlbiIsImFwaUtleSIsImFwaVNlY3JldCIsInNpZ24iLCJhdXRoRGljdCIsImdldEF1dGhEaWN0Iiwic2VydmVyVXJpIiwic3RyaW5naWZ5IiwiQXBpIiwia2V5Iiwic2VjcmV0IiwicmV0dXJuUmF3RXJyb3IiLCJ0aW1lb3V0UmVhZCIsInRpbWVvdXQiLCJwYXlsb2FkIiwiaGVhZGVycyIsImh0dHBNZXRob2QiLCJ0b0xvd2VyQ2FzZSIsInVybCIsInRvVXBwZXJDYXNlIiwicXMiLCJqc29uIiwiUHJvbWlzZSIsImYiLCJyZWplY3QiLCJlcnJvciIsInJlc3BvbnNlIiwiYm9keSIsImluZGV4T2YiLCJzdGF0dXNDb2RlIiwiZXJyUmVzcG9uc2UiLCJjb2RlIiwiaXNTdHJpbmciLCJzbGljZSIsInRyaW0iLCJoYXMiLCJkZXRhaWwiLCJlcnIiLCJtc2dFcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTs7OztBQUlBLElBQU1BLE9BQU87QUFDVEMsVUFBTSxpQkFERztBQUVUQyxjQUFVLDBCQUZEO0FBR1RDLFlBQVEsbUJBSEM7QUFJVEMsZUFBVztBQUpGLENBQWI7O0FBT0EsU0FBU0MsTUFBVCxDQUFnQkMsT0FBaEIsRUFBeUI7QUFDckIsUUFBTUMsYUFBYVAsS0FBS00sUUFBUUUsUUFBYixDQUFuQjtBQUNBLFFBQU1DLFlBQVksSUFBSSx1QkFBVUMsT0FBZCxDQUFzQkosUUFBUUssTUFBOUIsRUFBc0NKLFVBQXRDLEVBQWtELEVBQWxELENBQWxCO0FBQ0EsUUFBTUssUUFBUSxJQUFJLHVCQUFV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QUFiLENBQWQsRUFBOENNLElBQTlDO0FBRkksaUNBQWQ7QUFJSCw2QkFMRCxNQUtPO0FBQ0hKLDhDQUFjO0FBQ1ZMLDJDQUFPLGlCQUFFVSxHQUFGLENBQU1SLElBQU4sRUFBWSxPQUFaLElBQXVCQSxLQUFLRixLQUE1QixHQUFvQ0UsS0FBS1M7QUFEdEMsaUNBQWQ7QUFHSDtBQUNKLHlCQVhNLE1BV0E7QUFDSCxnQ0FBSUMsTUFBTVosS0FBVjtBQUNBLGdDQUFJLENBQUNZLEdBQUwsRUFBVTtBQUNOLG9DQUFJQyxpQkFBSjtBQUNBLG9DQUFJLGlCQUFFTixRQUFGLENBQVdMLElBQVgsQ0FBSixFQUFzQjtBQUNsQlcsK0NBQVdYLEtBQUtNLEtBQUwsQ0FBVyxDQUFYLEVBQWNOLEtBQUtDLE9BQUwsQ0FBYSxnQkFBYixDQUFkLEVBQThDTSxJQUE5QyxFQUFYO0FBQ0gsaUNBRkQsTUFFTztBQUNISSwrQ0FBVyxpQkFBRUgsR0FBRixDQUFNUixJQUFOLEVBQVksT0FBWixJQUF1QkEsS0FBS0YsS0FBNUIsR0FBb0NFLEtBQUtTLE1BQXBEO0FBQ0g7O0FBRURDLHNDQUFNLEVBQUVaLE9BQU9hLFFBQVQsRUFBTjtBQUNIO0FBQ0RSLDBDQUFjTyxHQUFkO0FBQ0g7QUFDRGIsK0JBQU9NLFdBQVA7QUFDSDtBQUNKLGlCQXhDRDtBQXlDSCxhQTFDTSxDQUFQO0FBMkNIOzs7Ozs7a0JBbEZnQnRCLEciLCJmaWxlIjoiYXBpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3JlcXVlc3QnO1xuaW1wb3J0IHNpZ25hdHVyZSBmcm9tICdhcHlzaWduYXR1cmUnO1xuaW1wb3J0IHF1ZXJ5c3RyaW5nIGZyb20gJ3F1ZXJ5c3RyaW5nJztcbmltcG9ydCB7IE5vUHVibGljS2V5LCBOb1NlY3JldEtleSwgSW52YWxpZFNlcnZlclVyaSwgVGltZW91dEVycm9yIH0gZnJvbSAnLi9leGNlcHRpb25zJztcblxuLypcbiogVkVSU0lPTiAxLjguNlxuKiAqL1xuXG5jb25zdCBhcGlzID0ge1xuICAgIHRleHQ6ICcvYXBpL3NlbmRfbWFpbC8nLFxuICAgIHRlbXBsYXRlOiAnL2FwaS9zZW5kX21haWwvdGVtcGxhdGUvJyxcbiAgICBzZWFyY2g6ICcvYXBpL21haWwvc2VhcmNoLycsXG4gICAgc3BlY2lmaWNzOiAnL2FwaS9tYWlsL3NlYXJjaC9zcGVjaWZpY3MvJyxcbn07XG5cbmZ1bmN0aW9uIGdldFVybChvcHRpb25zKSB7XG4gICAgY29uc3Qgc2VuZE1ldGhvZCA9IGFwaXNbb3B0aW9ucy5lbmRwb2ludF07XG4gICAgY29uc3Qgc2lnbmVkUmVxID0gbmV3IHNpZ25hdHVyZS5SZXF1ZXN0KG9wdGlvbnMubWV0aG9kLCBzZW5kTWV0aG9kLCB7fSk7XG4gICAgY29uc3QgdG9rZW4gPSBuZXcgc2lnbmF0dXJlLlRva2VuKG9wdGlvbnMuYXBpS2V5LCBvcHRpb25zLmFwaVNlY3JldCk7XG4gICAgdG9rZW4uc2lnbihzaWduZWRSZXEpO1xuICAgIGNvbnN0IGF1dGhEaWN0ID0gc2lnbmVkUmVxLmdldEF1dGhEaWN0KCk7XG4gICAgcmV0dXJuIGAke29wdGlvbnMuc2VydmVyVXJpfSR7c2VuZE1ldGhvZH0/JHtxdWVyeXN0cmluZy5zdHJpbmdpZnkoYXV0aERpY3QpfWA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwaSB7XG4gICAgY29uc3RydWN0b3Ioa2V5LCBzZWNyZXQsIHJldHVyblJhd0Vycm9yLCBzZXJ2ZXJVcmksIHRpbWVvdXRSZWFkKSB7XG4gICAgICAgIGlmICgha2V5IHx8IHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTm9QdWJsaWNLZXkoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXNlY3JldCB8fCB0eXBlb2Ygc2VjcmV0ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE5vU2VjcmV0S2V5KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlcnZlclVyaSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzZXJ2ZXJVcmkgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRTZXJ2ZXJVcmkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFwaUtleSA9IGtleTtcbiAgICAgICAgdGhpcy5hcGlTZWNyZXQgPSBzZWNyZXQ7XG4gICAgICAgIHRoaXMucmV0dXJuUmF3RXJyb3IgPSByZXR1cm5SYXdFcnJvciB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5zZXJ2ZXJVcmkgPSBzZXJ2ZXJVcmkgfHwgJ21pdHRlcHJvLm1pdHRlcHJvLnN2Yyc7XG4gICAgICAgIHRoaXMudGltZW91dCA9IHRpbWVvdXRSZWFkICogMTAwMDtcbiAgICB9XG4gICAgc2VuZFJlcXVlc3QocGF5bG9hZCwgZW5kcG9pbnQsIG1ldGhvZCwgaGVhZGVycykge1xuICAgICAgICBjb25zdCBodHRwTWV0aG9kID0gbWV0aG9kID8gbWV0aG9kLnRvTG93ZXJDYXNlKCkgOiAncG9zdCc7XG4gICAgICAgIGNvbnN0IHVybCA9IGdldFVybCh7XG4gICAgICAgICAgICBhcGlLZXk6IHRoaXMuYXBpS2V5LFxuICAgICAgICAgICAgYXBpU2VjcmV0OiB0aGlzLmFwaVNlY3JldCxcbiAgICAgICAgICAgIHNlcnZlclVyaTogdGhpcy5zZXJ2ZXJVcmksXG4gICAgICAgICAgICBtZXRob2Q6IGh0dHBNZXRob2QsXG4gICAgICAgICAgICBlbmRwb2ludCxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICBtZXRob2Q6IGh0dHBNZXRob2QudG9VcHBlckNhc2UoKSxcbiAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMgfHwge30sXG4gICAgICAgICAgICB0aW1lb3V0OiB0aGlzLnRpbWVvdXQsXG4gICAgICAgIH07XG4gICAgICAgIGlmIChodHRwTWV0aG9kID09PSAnZ2V0Jykge1xuICAgICAgICAgICAgb3B0aW9ucy5xcyA9IHBheWxvYWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvcHRpb25zLmpzb24gPSBwYXlsb2FkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgoZiwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICByZXF1ZXN0KG9wdGlvbnMsIChlcnJvciwgcmVzcG9uc2UsIGJvZHkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWVycm9yICYmIFsyMDAsIDIwMV0uaW5kZXhPZihyZXNwb25zZS5zdGF0dXNDb2RlKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGYoYm9keSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVyclJlc3BvbnNlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yICYmIChlcnJvci5jb2RlID09PSAnRVRJTUVET1VUJyB8fCBlcnJvci5jb2RlID09PSAnRVNPQ0tFVFRJTUVET1VUJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyclJlc3BvbnNlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBgVGhlIHNlcnZlciBkaWQgbm90IHJlc3BvbmQgd2l0aGluIHRoZSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3RoaXMudGltZW91dH0gc2Vjb25kKHMpIHlvdSBzdGlwdWxhdGVkYCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yZXR1cm5SYXdFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUaW1lb3V0RXJyb3IodGhpcy50aW1lb3V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnJldHVyblJhd0Vycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXy5pc1N0cmluZyhib2R5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVyclJlc3BvbnNlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogYm9keS5zbGljZSgwLCBib2R5LmluZGV4T2YoJ1JlcXVlc3QgTWV0aG9kJykpLnRyaW0oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJSZXNwb25zZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IF8uaGFzKGJvZHksICdlcnJvcicpID8gYm9keS5lcnJvciA6IGJvZHkuZGV0YWlsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXJyID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtc2dFcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXy5pc1N0cmluZyhib2R5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtc2dFcnJvciA9IGJvZHkuc2xpY2UoMCwgYm9keS5pbmRleE9mKCdSZXF1ZXN0IE1ldGhvZCcpKS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXNnRXJyb3IgPSBfLmhhcyhib2R5LCAnZXJyb3InKSA/IGJvZHkuZXJyb3IgOiBib2R5LmRldGFpbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnIgPSB7IGVycm9yOiBtc2dFcnJvciB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyUmVzcG9uc2UgPSBlcnI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVyclJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19