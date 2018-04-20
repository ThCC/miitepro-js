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
                        if (error && (error.code === 'ETIMEDOUT' || error.code === 'ESOCKETTIMEDOUT')) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcGkuanMiXSwibmFtZXMiOlsiYXBpcyIsInRleHQiLCJ0ZW1wbGF0ZSIsInNlYXJjaCIsInNwZWNpZmljcyIsImdldFVybCIsIm9wdGlvbnMiLCJzZW5kTWV0aG9kIiwiZW5kcG9pbnQiLCJzaWduZWRSZXEiLCJSZXF1ZXN0IiwibWV0aG9kIiwidG9rZW4iLCJUb2tlbiIsImFwaUtleSIsImFwaVNlY3JldCIsInNpZ24iLCJhdXRoRGljdCIsImdldEF1dGhEaWN0Iiwic2VydmVyVXJpIiwic3RyaW5naWZ5IiwiQXBpIiwia2V5Iiwic2VjcmV0IiwicmV0dXJuUmF3RXJyb3IiLCJ0aW1lb3V0UmVhZCIsInRpbWVvdXQiLCJwYXlsb2FkIiwiaGVhZGVycyIsImh0dHBNZXRob2QiLCJ0b0xvd2VyQ2FzZSIsInVybCIsInRvVXBwZXJDYXNlIiwicXMiLCJqc29uIiwiUHJvbWlzZSIsImYiLCJyZWplY3QiLCJlcnJvciIsInJlc3BvbnNlIiwiYm9keSIsImluZGV4T2YiLCJzdGF0dXNDb2RlIiwiZXJyUmVzcG9uc2UiLCJjb2RlIiwiZXJyIiwibXNnRXJyb3IiLCJpc1N0cmluZyIsImhhcyIsImRldGFpbCIsIkVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLE9BQU87QUFDVEMsVUFBTSxpQkFERztBQUVUQyxjQUFVLDBCQUZEO0FBR1RDLFlBQVEsbUJBSEM7QUFJVEMsZUFBVztBQUpGLENBQWI7O0FBT0EsU0FBU0MsTUFBVCxDQUFnQkMsT0FBaEIsRUFBeUI7QUFDckIsUUFBTUMsYUFBYVAsS0FBS00sUUFBUUUsUUFBYixDQUFuQjtBQUNBLFFBQU1DLFlBQVksSUFBSSx1QkFBVUMsT0FBZCxDQUFzQkosUUFBUUssTUFBOUIsRUFBc0NKLFVBQXRDLEVBQWtELEVBQWxELENBQWxCO0FBQ0EsUUFBTUssUUFBUSxJQUFJLHVCQUFVQyxLQUFkLENBQW9CUCxR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UUFBRixDQUFXUCxJQUFYLENBQUosRUFBc0I7QUFDbEJNLCtDQUFXTixJQUFYO0FBQ0gsaUNBRkQsTUFFTztBQUNITSwrQ0FBVyxpQkFBRUUsR0FBRixDQUFNUixJQUFOLEVBQVksT0FBWixJQUF1QkEsS0FBS0YsS0FBNUIsR0FBb0NFLEtBQUtTLE1BQXBEO0FBQ0g7O0FBRURKLHNDQUFNLEVBQUVLLE9BQU9KLFFBQVQsRUFBTjtBQUNIO0FBQ0RILDBDQUFjRSxHQUFkO0FBQ0g7QUFDRFIsK0JBQU9NLFdBQVA7QUFDSDtBQUNKLGlCQTVCRDtBQTZCSCxhQTlCTSxDQUFQO0FBK0JIOzs7Ozs7a0JBdEVnQnRCLEciLCJmaWxlIjoiYXBpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCByZXF1ZXN0IGZyb20gJ3JlcXVlc3QnO1xuaW1wb3J0IHNpZ25hdHVyZSBmcm9tICdhcHlzaWduYXR1cmUnO1xuaW1wb3J0IHF1ZXJ5c3RyaW5nIGZyb20gJ3F1ZXJ5c3RyaW5nJztcbmltcG9ydCB7IE5vUHVibGljS2V5LCBOb1NlY3JldEtleSwgSW52YWxpZFNlcnZlclVyaSwgVGltZW91dEVycm9yIH0gZnJvbSAnLi9leGNlcHRpb25zJztcblxuY29uc3QgYXBpcyA9IHtcbiAgICB0ZXh0OiAnL2FwaS9zZW5kX21haWwvJyxcbiAgICB0ZW1wbGF0ZTogJy9hcGkvc2VuZF9tYWlsL3RlbXBsYXRlLycsXG4gICAgc2VhcmNoOiAnL2FwaS9tYWlsL3NlYXJjaC8nLFxuICAgIHNwZWNpZmljczogJy9hcGkvbWFpbC9zZWFyY2gvc3BlY2lmaWNzLycsXG59O1xuXG5mdW5jdGlvbiBnZXRVcmwob3B0aW9ucykge1xuICAgIGNvbnN0IHNlbmRNZXRob2QgPSBhcGlzW29wdGlvbnMuZW5kcG9pbnRdO1xuICAgIGNvbnN0IHNpZ25lZFJlcSA9IG5ldyBzaWduYXR1cmUuUmVxdWVzdChvcHRpb25zLm1ldGhvZCwgc2VuZE1ldGhvZCwge30pO1xuICAgIGNvbnN0IHRva2VuID0gbmV3IHNpZ25hdHVyZS5Ub2tlbihvcHRpb25zLmFwaUtleSwgb3B0aW9ucy5hcGlTZWNyZXQpO1xuICAgIHRva2VuLnNpZ24oc2lnbmVkUmVxKTtcbiAgICBjb25zdCBhdXRoRGljdCA9IHNpZ25lZFJlcS5nZXRBdXRoRGljdCgpO1xuICAgIHJldHVybiBgJHtvcHRpb25zLnNlcnZlclVyaX0ke3NlbmRNZXRob2R9PyR7cXVlcnlzdHJpbmcuc3RyaW5naWZ5KGF1dGhEaWN0KX1gO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcGkge1xuICAgIGNvbnN0cnVjdG9yKGtleSwgc2VjcmV0LCByZXR1cm5SYXdFcnJvciwgc2VydmVyVXJpLCB0aW1lb3V0UmVhZCkge1xuICAgICAgICBpZiAoIWtleSB8fCB0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE5vUHVibGljS2V5KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFzZWNyZXQgfHwgdHlwZW9mIHNlY3JldCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBOb1NlY3JldEtleSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZXJ2ZXJVcmkpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2VydmVyVXJpICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkU2VydmVyVXJpKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hcGlLZXkgPSBrZXk7XG4gICAgICAgIHRoaXMuYXBpU2VjcmV0ID0gc2VjcmV0O1xuICAgICAgICB0aGlzLnJldHVyblJhd0Vycm9yID0gcmV0dXJuUmF3RXJyb3IgfHwgZmFsc2U7XG4gICAgICAgIHRoaXMuc2VydmVyVXJpID0gc2VydmVyVXJpIHx8ICdodHRwOi8vd3d3Lm1pdHRlLnBybyc7XG4gICAgICAgIHRoaXMudGltZW91dCA9IHRpbWVvdXRSZWFkICogMTAwMDtcbiAgICB9XG4gICAgc2VuZFJlcXVlc3QocGF5bG9hZCwgZW5kcG9pbnQsIG1ldGhvZCwgaGVhZGVycykge1xuICAgICAgICBjb25zdCBodHRwTWV0aG9kID0gbWV0aG9kID8gbWV0aG9kLnRvTG93ZXJDYXNlKCkgOiAncG9zdCc7XG4gICAgICAgIGNvbnN0IHVybCA9IGdldFVybCh7XG4gICAgICAgICAgICBhcGlLZXk6IHRoaXMuYXBpS2V5LFxuICAgICAgICAgICAgYXBpU2VjcmV0OiB0aGlzLmFwaVNlY3JldCxcbiAgICAgICAgICAgIHNlcnZlclVyaTogdGhpcy5zZXJ2ZXJVcmksXG4gICAgICAgICAgICBtZXRob2Q6IGh0dHBNZXRob2QsXG4gICAgICAgICAgICBlbmRwb2ludCxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICBtZXRob2Q6IGh0dHBNZXRob2QudG9VcHBlckNhc2UoKSxcbiAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMgfHwge30sXG4gICAgICAgICAgICB0aW1lb3V0OiB0aGlzLnRpbWVvdXQsXG4gICAgICAgIH07XG4gICAgICAgIGlmIChodHRwTWV0aG9kID09PSAnZ2V0Jykge1xuICAgICAgICAgICAgb3B0aW9ucy5xcyA9IHBheWxvYWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvcHRpb25zLmpzb24gPSBwYXlsb2FkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgoZiwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICByZXF1ZXN0KG9wdGlvbnMsIChlcnJvciwgcmVzcG9uc2UsIGJvZHkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWVycm9yICYmIFsyMDAsIDIwMV0uaW5kZXhPZihyZXNwb25zZS5zdGF0dXNDb2RlKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGYoYm9keSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVyclJlc3BvbnNlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yICYmIChlcnJvci5jb2RlID09PSAnRVRJTUVET1VUJyB8fCBlcnJvci5jb2RlID09PSAnRVNPQ0tFVFRJTUVET1VUJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyclJlc3BvbnNlID0geyBlcnJvcjogYFRoZSBzZXJ2ZXIgZGlkIG5vdCByZXNwb25kIHdpdGhpbiB0aGUgJHt0aGlzLnRpbWVvdXR9IHNlY29uZChzKSB5b3Ugc3RpcHVsYXRlZGAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnJldHVyblJhd0Vycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFRpbWVvdXRFcnJvcih0aGlzLnRpbWVvdXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucmV0dXJuUmF3RXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyclJlc3BvbnNlID0geyBlcnJvciwgYm9keSB9O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVyciA9IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbXNnRXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF8uaXNTdHJpbmcoYm9keSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXNnRXJyb3IgPSBib2R5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1zZ0Vycm9yID0gXy5oYXMoYm9keSwgJ2Vycm9yJykgPyBib2R5LmVycm9yIDogYm9keS5kZXRhaWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyID0geyBFcnJvcjogbXNnRXJyb3IgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVyclJlc3BvbnNlID0gZXJyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJSZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==