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
* VERSION 1.9.0
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcGkuanMiXSwibmFtZXMiOlsiYXBpcyIsInRleHQiLCJ0ZW1wbGF0ZSIsInNlYXJjaCIsInNwZWNpZmljcyIsImdldFVybCIsIm9wdGlvbnMiLCJzZW5kTWV0aG9kIiwiZW5kcG9pbnQiLCJzaWduZWRSZXEiLCJSZXF1ZXN0IiwibWV0aG9kIiwidG9rZW4iLCJUb2tlbiIsImFwaUtleSIsImFwaVNlY3JldCIsInNpZ24iLCJhdXRoRGljdCIsImdldEF1dGhEaWN0Iiwic2VydmVyVXJpIiwic3RyaW5naWZ5IiwiQXBpIiwia2V5Iiwic2VjcmV0IiwicmV0dXJuUmF3RXJyb3IiLCJ0aW1lb3V0UmVhZCIsInRpbWVvdXQiLCJwYXlsb2FkIiwiaGVhZGVycyIsImh0dHBNZXRob2QiLCJ0b0xvd2VyQ2FzZSIsInVybCIsInRvVXBwZXJDYXNlIiwicXMiLCJqc29uIiwiUHJvbWlzZSIsImYiLCJyZWplY3QiLCJlcnJvciIsInJlc3BvbnNlIiwiYm9keSIsImluZGV4T2YiLCJzdGF0dXNDb2RlIiwiZXJyUmVzcG9uc2UiLCJjb2RlIiwiaXNTdHJpbmciLCJzbGljZSIsInRyaW0iLCJoYXMiLCJkZXRhaWwiLCJlcnIiLCJtc2dFcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTs7OztBQUlBLElBQU1BLE9BQU87QUFDVEMsVUFBTSxpQkFERztBQUVUQyxjQUFVLDBCQUZEO0FBR1RDLFlBQVEsbUJBSEM7QUFJVEMsZUFBVztBQUpGLENBQWI7O0FBT0EsU0FBU0MsTUFBVCxDQUFnQkMsT0FBaEIsRUFBeUI7QUFDckIsUUFBTUMsYUFBYVAsS0FBS00sUUFBUUUsUUFBYixDQUFuQjtBQUNBLFFBQU1DLFlBQVksSUFBSSx1QkFBVUMsT0FBZCxDQUFzQkosUUFBUUssTUFBOUIsRUFBc0NKLFVBQXRDLEVBQWtELEVBQWxELENBQWxCO0FBQ0EsUUFBTUssUUFBUSxJQUFJLHVCQUFV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QUFiLENBQWQsRUFBOENNLElBQTlDO0FBRkksaUNBQWQ7QUFJSCw2QkFMRCxNQUtPO0FBQ0hKLDhDQUFjO0FBQ1ZMLDJDQUFPLGlCQUFFVSxHQUFGLENBQU1SLElBQU4sRUFBWSxPQUFaLElBQXVCQSxLQUFLRixLQUE1QixHQUFvQ0UsS0FBS1M7QUFEdEMsaUNBQWQ7QUFHSDtBQUNKLHlCQVhNLE1BV0E7QUFDSCxnQ0FBSUMsTUFBTVosS0FBVjtBQUNBLGdDQUFJLENBQUNZLEdBQUwsRUFBVTtBQUNOLG9DQUFJQyxpQkFBSjtBQUNBLG9DQUFJLGlCQUFFTixRQUFGLENBQVdMLElBQVgsQ0FBSixFQUFzQjtBQUNsQlcsK0NBQVdYLEtBQUtNLEtBQUwsQ0FBVyxDQUFYLEVBQWNOLEtBQUtDLE9BQUwsQ0FBYSxnQkFBYixDQUFkLEVBQThDTSxJQUE5QyxFQUFYO0FBQ0gsaUNBRkQsTUFFTztBQUNISSwrQ0FBVyxpQkFBRUgsR0FBRixDQUFNUixJQUFOLEVBQVksT0FBWixJQUF1QkEsS0FBS0YsS0FBNUIsR0FBb0NFLEtBQUtTLE1BQXBEO0FBQ0g7O0FBRURDLHNDQUFNLEVBQUVaLE9BQU9hLFFBQVQsRUFBTjtBQUNIO0FBQ0RSLDBDQUFjTyxHQUFkO0FBQ0g7QUFDRGIsK0JBQU9NLFdBQVA7QUFDSDtBQUNKLGlCQXhDRDtBQXlDSCxhQTFDTSxDQUFQO0FBMkNIOzs7Ozs7a0JBbEZnQnRCLEciLCJmaWxlIjoiYXBpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3JlcXVlc3QnO1xuaW1wb3J0IHNpZ25hdHVyZSBmcm9tICdhcHlzaWduYXR1cmUnO1xuaW1wb3J0IHF1ZXJ5c3RyaW5nIGZyb20gJ3F1ZXJ5c3RyaW5nJztcbmltcG9ydCB7IE5vUHVibGljS2V5LCBOb1NlY3JldEtleSwgSW52YWxpZFNlcnZlclVyaSwgVGltZW91dEVycm9yIH0gZnJvbSAnLi9leGNlcHRpb25zJztcblxuLypcbiogVkVSU0lPTiAxLjkuMFxuKiAqL1xuXG5jb25zdCBhcGlzID0ge1xuICAgIHRleHQ6ICcvYXBpL3NlbmRfbWFpbC8nLFxuICAgIHRlbXBsYXRlOiAnL2FwaS9zZW5kX21haWwvdGVtcGxhdGUvJyxcbiAgICBzZWFyY2g6ICcvYXBpL21haWwvc2VhcmNoLycsXG4gICAgc3BlY2lmaWNzOiAnL2FwaS9tYWlsL3NlYXJjaC9zcGVjaWZpY3MvJyxcbn07XG5cbmZ1bmN0aW9uIGdldFVybChvcHRpb25zKSB7XG4gICAgY29uc3Qgc2VuZE1ldGhvZCA9IGFwaXNbb3B0aW9ucy5lbmRwb2ludF07XG4gICAgY29uc3Qgc2lnbmVkUmVxID0gbmV3IHNpZ25hdHVyZS5SZXF1ZXN0KG9wdGlvbnMubWV0aG9kLCBzZW5kTWV0aG9kLCB7fSk7XG4gICAgY29uc3QgdG9rZW4gPSBuZXcgc2lnbmF0dXJlLlRva2VuKG9wdGlvbnMuYXBpS2V5LCBvcHRpb25zLmFwaVNlY3JldCk7XG4gICAgdG9rZW4uc2lnbihzaWduZWRSZXEpO1xuICAgIGNvbnN0IGF1dGhEaWN0ID0gc2lnbmVkUmVxLmdldEF1dGhEaWN0KCk7XG4gICAgcmV0dXJuIGAke29wdGlvbnMuc2VydmVyVXJpfSR7c2VuZE1ldGhvZH0/JHtxdWVyeXN0cmluZy5zdHJpbmdpZnkoYXV0aERpY3QpfWA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwaSB7XG4gICAgY29uc3RydWN0b3Ioa2V5LCBzZWNyZXQsIHJldHVyblJhd0Vycm9yLCBzZXJ2ZXJVcmksIHRpbWVvdXRSZWFkKSB7XG4gICAgICAgIGlmICgha2V5IHx8IHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTm9QdWJsaWNLZXkoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXNlY3JldCB8fCB0eXBlb2Ygc2VjcmV0ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE5vU2VjcmV0S2V5KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlcnZlclVyaSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzZXJ2ZXJVcmkgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRTZXJ2ZXJVcmkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFwaUtleSA9IGtleTtcbiAgICAgICAgdGhpcy5hcGlTZWNyZXQgPSBzZWNyZXQ7XG4gICAgICAgIHRoaXMucmV0dXJuUmF3RXJyb3IgPSByZXR1cm5SYXdFcnJvciB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5zZXJ2ZXJVcmkgPSBzZXJ2ZXJVcmkgfHwgJ2h0dHA6Ly93d3cubWl0dGUucHJvJztcbiAgICAgICAgdGhpcy50aW1lb3V0ID0gdGltZW91dFJlYWQgKiAxMDAwO1xuICAgIH1cbiAgICBzZW5kUmVxdWVzdChwYXlsb2FkLCBlbmRwb2ludCwgbWV0aG9kLCBoZWFkZXJzKSB7XG4gICAgICAgIGNvbnN0IGh0dHBNZXRob2QgPSBtZXRob2QgPyBtZXRob2QudG9Mb3dlckNhc2UoKSA6ICdwb3N0JztcbiAgICAgICAgY29uc3QgdXJsID0gZ2V0VXJsKHtcbiAgICAgICAgICAgIGFwaUtleTogdGhpcy5hcGlLZXksXG4gICAgICAgICAgICBhcGlTZWNyZXQ6IHRoaXMuYXBpU2VjcmV0LFxuICAgICAgICAgICAgc2VydmVyVXJpOiB0aGlzLnNlcnZlclVyaSxcbiAgICAgICAgICAgIG1ldGhvZDogaHR0cE1ldGhvZCxcbiAgICAgICAgICAgIGVuZHBvaW50LFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgIG1ldGhvZDogaHR0cE1ldGhvZC50b1VwcGVyQ2FzZSgpLFxuICAgICAgICAgICAgaGVhZGVyczogaGVhZGVycyB8fCB7fSxcbiAgICAgICAgICAgIHRpbWVvdXQ6IHRoaXMudGltZW91dCxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGh0dHBNZXRob2QgPT09ICdnZXQnKSB7XG4gICAgICAgICAgICBvcHRpb25zLnFzID0gcGF5bG9hZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9wdGlvbnMuanNvbiA9IHBheWxvYWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChmLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHJlcXVlc3Qob3B0aW9ucywgKGVycm9yLCByZXNwb25zZSwgYm9keSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghZXJyb3IgJiYgWzIwMCwgMjAxXS5pbmRleE9mKHJlc3BvbnNlLnN0YXR1c0NvZGUpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgZihib2R5KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZXJyUmVzcG9uc2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgJiYgKGVycm9yLmNvZGUgPT09ICdFVElNRURPVVQnIHx8IGVycm9yLmNvZGUgPT09ICdFU09DS0VUVElNRURPVVQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyUmVzcG9uc2UgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGBUaGUgc2VydmVyIGRpZCBub3QgcmVzcG9uZCB3aXRoaW4gdGhlIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy50aW1lb3V0fSBzZWNvbmQocykgeW91IHN0aXB1bGF0ZWRgLFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJldHVyblJhd0Vycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFRpbWVvdXRFcnJvcih0aGlzLnRpbWVvdXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucmV0dXJuUmF3RXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfLmlzU3RyaW5nKGJvZHkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyUmVzcG9uc2UgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5OiBib2R5LnNsaWNlKDAsIGJvZHkuaW5kZXhPZignUmVxdWVzdCBNZXRob2QnKSkudHJpbSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVyclJlc3BvbnNlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogXy5oYXMoYm9keSwgJ2Vycm9yJykgPyBib2R5LmVycm9yIDogYm9keS5kZXRhaWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlcnIgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1zZ0Vycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfLmlzU3RyaW5nKGJvZHkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1zZ0Vycm9yID0gYm9keS5zbGljZSgwLCBib2R5LmluZGV4T2YoJ1JlcXVlc3QgTWV0aG9kJykpLnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtc2dFcnJvciA9IF8uaGFzKGJvZHksICdlcnJvcicpID8gYm9keS5lcnJvciA6IGJvZHkuZGV0YWlsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVyciA9IHsgZXJyb3I6IG1zZ0Vycm9yIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJSZXNwb25zZSA9IGVycjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyUmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=