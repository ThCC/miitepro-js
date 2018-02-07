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
        this.timeout = (timeoutRead > 0 ? timeoutRead : 1) * 1000;
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
                        if (_this.returnRawError) {
                            reject({ error: error, body: body });
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
                            reject(err);
                        }
                    }
                });
            });
        }
    }]);

    return Api;
}();

exports.default = Api;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcGkuanMiXSwibmFtZXMiOlsiYXBpcyIsInRleHQiLCJ0ZW1wbGF0ZSIsInNlYXJjaCIsInNwZWNpZmljcyIsImdldFVybCIsIm9wdGlvbnMiLCJzZW5kTWV0aG9kIiwiZW5kcG9pbnQiLCJzaWduZWRSZXEiLCJSZXF1ZXN0IiwibWV0aG9kIiwidG9rZW4iLCJUb2tlbiIsImFwaUtleSIsImFwaVNlY3JldCIsInNpZ24iLCJhdXRoRGljdCIsImdldEF1dGhEaWN0Iiwic2VydmVyVXJpIiwic3RyaW5naWZ5IiwiQXBpIiwia2V5Iiwic2VjcmV0IiwicmV0dXJuUmF3RXJyb3IiLCJ0aW1lb3V0UmVhZCIsInRpbWVvdXQiLCJwYXlsb2FkIiwiaGVhZGVycyIsImh0dHBNZXRob2QiLCJ0b0xvd2VyQ2FzZSIsInVybCIsInRvVXBwZXJDYXNlIiwicXMiLCJqc29uIiwiUHJvbWlzZSIsImYiLCJyZWplY3QiLCJlcnJvciIsInJlc3BvbnNlIiwiYm9keSIsImluZGV4T2YiLCJzdGF0dXNDb2RlIiwiZXJyIiwibXNnRXJyb3IiLCJpc1N0cmluZyIsImhhcyIsImRldGFpbCIsIkVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLE9BQU87QUFDVEMsVUFBTSxpQkFERztBQUVUQyxjQUFVLDBCQUZEO0FBR1RDLFlBQVEsbUJBSEM7QUFJVEMsZUFBVztBQUpGLENBQWI7O0FBT0EsU0FBU0MsTUFBVCxDQUFnQkMsT0FBaEIsRUFBeUI7QUFDckIsUUFBTUMsYUFBYVAsS0FBS00sUUFBUUUsUUFBYixDQUFuQjtBQUNBLFFBQU1DLFlBQVksSUFBSSx1QkFBVUMsT0FBZCxDQUFzQkosUUFBUUssTUFBOUIsRUFBc0NKLFVBQXRDLEVBQWtELEVBQWxELENBQWxCO0FBQ0EsUUFBTUssUUFBUSxJQUFJLHVCQUFVQyxLQUFkLENBQW9CUCxRQUFRUSxNQUE1QixFQUFvQ1IsUUFB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SDtBQUNKO0FBQ0osaUJBckJEO0FBc0JILGFBdkJNLENBQVA7QUF3Qkg7Ozs7OztrQkEvRGdCdEIsRyIsImZpbGUiOiJhcGkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHJlcXVlc3QgZnJvbSAncmVxdWVzdCc7XG5pbXBvcnQgc2lnbmF0dXJlIGZyb20gJ2FweXNpZ25hdHVyZSc7XG5pbXBvcnQgcXVlcnlzdHJpbmcgZnJvbSAncXVlcnlzdHJpbmcnO1xuaW1wb3J0IHsgTm9QdWJsaWNLZXksIE5vU2VjcmV0S2V5LCBJbnZhbGlkU2VydmVyVXJpIH0gZnJvbSAnLi9leGNlcHRpb25zJztcblxuY29uc3QgYXBpcyA9IHtcbiAgICB0ZXh0OiAnL2FwaS9zZW5kX21haWwvJyxcbiAgICB0ZW1wbGF0ZTogJy9hcGkvc2VuZF9tYWlsL3RlbXBsYXRlLycsXG4gICAgc2VhcmNoOiAnL2FwaS9tYWlsL3NlYXJjaC8nLFxuICAgIHNwZWNpZmljczogJy9hcGkvbWFpbC9zZWFyY2gvc3BlY2lmaWNzLycsXG59O1xuXG5mdW5jdGlvbiBnZXRVcmwob3B0aW9ucykge1xuICAgIGNvbnN0IHNlbmRNZXRob2QgPSBhcGlzW29wdGlvbnMuZW5kcG9pbnRdO1xuICAgIGNvbnN0IHNpZ25lZFJlcSA9IG5ldyBzaWduYXR1cmUuUmVxdWVzdChvcHRpb25zLm1ldGhvZCwgc2VuZE1ldGhvZCwge30pO1xuICAgIGNvbnN0IHRva2VuID0gbmV3IHNpZ25hdHVyZS5Ub2tlbihvcHRpb25zLmFwaUtleSwgb3B0aW9ucy5hcGlTZWNyZXQpO1xuICAgIHRva2VuLnNpZ24oc2lnbmVkUmVxKTtcbiAgICBjb25zdCBhdXRoRGljdCA9IHNpZ25lZFJlcS5nZXRBdXRoRGljdCgpO1xuICAgIHJldHVybiBgJHtvcHRpb25zLnNlcnZlclVyaX0ke3NlbmRNZXRob2R9PyR7cXVlcnlzdHJpbmcuc3RyaW5naWZ5KGF1dGhEaWN0KX1gO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcGkge1xuICAgIGNvbnN0cnVjdG9yKGtleSwgc2VjcmV0LCByZXR1cm5SYXdFcnJvciwgc2VydmVyVXJpLCB0aW1lb3V0UmVhZCkge1xuICAgICAgICBpZiAoIWtleSB8fCB0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE5vUHVibGljS2V5KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFzZWNyZXQgfHwgdHlwZW9mIHNlY3JldCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBOb1NlY3JldEtleSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZXJ2ZXJVcmkpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2VydmVyVXJpICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkU2VydmVyVXJpKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hcGlLZXkgPSBrZXk7XG4gICAgICAgIHRoaXMuYXBpU2VjcmV0ID0gc2VjcmV0O1xuICAgICAgICB0aGlzLnJldHVyblJhd0Vycm9yID0gcmV0dXJuUmF3RXJyb3IgfHwgZmFsc2U7XG4gICAgICAgIHRoaXMuc2VydmVyVXJpID0gc2VydmVyVXJpIHx8ICdodHRwOi8vcG9zdG1hbi5hbHRlcmRhdGEuY29tLmJyJztcbiAgICAgICAgdGhpcy50aW1lb3V0ID0gKHRpbWVvdXRSZWFkID4gMCA/IHRpbWVvdXRSZWFkIDogMSkgKiAxMDAwO1xuICAgIH1cbiAgICBzZW5kUmVxdWVzdChwYXlsb2FkLCBlbmRwb2ludCwgbWV0aG9kLCBoZWFkZXJzKSB7XG4gICAgICAgIGNvbnN0IGh0dHBNZXRob2QgPSBtZXRob2QgPyBtZXRob2QudG9Mb3dlckNhc2UoKSA6ICdwb3N0JztcbiAgICAgICAgY29uc3QgdXJsID0gZ2V0VXJsKHtcbiAgICAgICAgICAgIGFwaUtleTogdGhpcy5hcGlLZXksXG4gICAgICAgICAgICBhcGlTZWNyZXQ6IHRoaXMuYXBpU2VjcmV0LFxuICAgICAgICAgICAgc2VydmVyVXJpOiB0aGlzLnNlcnZlclVyaSxcbiAgICAgICAgICAgIG1ldGhvZDogaHR0cE1ldGhvZCxcbiAgICAgICAgICAgIGVuZHBvaW50LFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgIG1ldGhvZDogaHR0cE1ldGhvZC50b1VwcGVyQ2FzZSgpLFxuICAgICAgICAgICAgaGVhZGVyczogaGVhZGVycyB8fCB7fSxcbiAgICAgICAgICAgIHRpbWVvdXQ6IHRoaXMudGltZW91dCxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGh0dHBNZXRob2QgPT09ICdnZXQnKSB7XG4gICAgICAgICAgICBvcHRpb25zLnFzID0gcGF5bG9hZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9wdGlvbnMuanNvbiA9IHBheWxvYWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChmLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHJlcXVlc3Qob3B0aW9ucywgKGVycm9yLCByZXNwb25zZSwgYm9keSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghZXJyb3IgJiYgWzIwMCwgMjAxXS5pbmRleE9mKHJlc3BvbnNlLnN0YXR1c0NvZGUpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgZihib2R5KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yZXR1cm5SYXdFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHsgZXJyb3IsIGJvZHkgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXJyID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtc2dFcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXy5pc1N0cmluZyhib2R5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtc2dFcnJvciA9IGJvZHk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXNnRXJyb3IgPSBfLmhhcyhib2R5LCAnZXJyb3InKSA/IGJvZHkuZXJyb3IgOiBib2R5LmRldGFpbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnIgPSB7IEVycm9yOiBtc2dFcnJvciB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19