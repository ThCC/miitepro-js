'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _apysignature = require('./apysignature');

var _exceptions = require('./exceptions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
* VERSION 1.10.0
* */

var AuthTimeStampError = function (_Error) {
    _inherits(AuthTimeStampError, _Error);

    function AuthTimeStampError(message) {
        _classCallCheck(this, AuthTimeStampError);

        var _this = _possibleConstructorReturn(this, (AuthTimeStampError.__proto__ || Object.getPrototypeOf(AuthTimeStampError)).call(this));

        _this.message = message;
        _this.name = 'AuthTimeStampError';
        return _this;
    }

    return AuthTimeStampError;
}(Error);

var apis = {
    text: '/api/send_mail/',
    template: '/api/send_mail/template/',
    search: '/api/mail/search/',
    specifics: '/api/mail/search/specifics/'
};

function getUrl(options) {
    var sendMethod = apis[options.endpoint];
    var token = new _apysignature.Token(options.apiKey, options.apiSecret);
    var signedReq = new _apysignature.Request(options.method, sendMethod, {});
    token.sign(signedReq, options.authTimestamp);
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
        value: function sendRequest(payload, endpoint, method, headers, authTimestamp) {
            var _this2 = this;

            if (!authTimestamp) authTimestamp = null;
            var httpMethod = method ? method.toLowerCase() : 'post';
            var url = getUrl({
                apiKey: this.apiKey,
                apiSecret: this.apiSecret,
                serverUri: this.serverUri,
                method: httpMethod,
                endpoint: endpoint,
                authTimestamp: authTimestamp
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
            return new Promise(function (resolve, reject) {
                (0, _request2.default)(options, function (error, response, body) {
                    if (!error && [200, 201].indexOf(response.statusCode) > -1) {
                        resolve(body);
                    } else {
                        try {
                            var errResponse = _this2.errorTreatment(error, body);
                            reject(errResponse);
                        } catch (e) {
                            if (e.name = 'AuthTimeStampError') {
                                var rightAuthTimestamp = _this2.getRightAuthTimestamp(e.message);
                                _this2.sendRequest(payload, endpoint, method, headers, rightAuthTimestamp).then(function (result) {
                                    resolve(result);
                                }, function (error) {
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
    }, {
        key: 'getRightAuthTimestamp',
        value: function getRightAuthTimestamp(msg) {
            var tempStr = msg.substring(msg.indexOf('Server time: '), msg.length + 1);
            return tempStr.substring(tempStr.indexOf(': ') + 2, tempStr.length + 1);
        }
    }, {
        key: 'getErrorMsg',
        value: function getErrorMsg(body) {
            if (_lodash2.default.isString(body)) {
                return body.slice(0, body.indexOf('Request Method')).trim();
            } else {
                return _lodash2.default.has(body, 'error') ? body.error : body.detail;
            }
        }
    }, {
        key: 'errorTreatment',
        value: function errorTreatment(error, body) {
            var errResponse = null;
            var errorMsg = this.getErrorMsg(body);
            if (error && (error.code === 'ETIMEDOUT' || error.code === 'ESOCKETTIMEDOUT')) {
                errResponse = {
                    error: 'The server did not respond within the \n                ' + this.timeout + ' second(s) you stipulated'
                };
                if (this.returnRawError) {
                    throw new _exceptions.TimeoutError(this.timeout);
                }
            } else if (errorMsg.indexOf('Server time: ') > 0) {
                throw new AuthTimeStampError(errorMsg);
            } else if (this.returnRawError) {
                if (_lodash2.default.isString(body)) {
                    errResponse = { error: error, body: errorMsg };
                } else {
                    errResponse = { error: errorMsg };
                }
            } else {
                errResponse = !error ? { error: errorMsg } : error;
            }
            return errResponse;
        }
    }]);

    return Api;
}();

exports.default = Api;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcGkuanMiXSwibmFtZXMiOlsiQXV0aFRpbWVTdGFtcEVycm9yIiwibWVzc2FnZSIsIm5hbWUiLCJFcnJvciIsImFwaXMiLCJ0ZXh0IiwidGVtcGxhdGUiLCJzZWFyY2giLCJzcGVjaWZpY3MiLCJnZXRVcmwiLCJvcHRpb25zIiwic2VuZE1ldGhvZCIsImVuZHBvaW50IiwidG9rZW4iLCJUb2tlbiIsImFwaUtleSIsImFwaVNlY3JldCIsInNpZ25lZFJlcSIsIlJlcXVlc3QiLCJtZXRob2QiLCJzaWduIiwiYXV0aFRpbWVzdGFtcCIsImF1dGhEaWN0IiwiZ2V0QXV0aERpY3QiLCJzZXJ2ZXJVcmkiLCJxdWVyeXN0cmluZyIsInN0cmluZ2lmeSIsIkFwaSIsImtleSIsInNlY3JldCIsInJldHVyblJhd0Vycm9yIiwidGltZW91dFJlYWQiLCJOb1B1YmxpY0tleSIsIk5vU2VjcmV0S2V5IiwiSW52YWxpZFNlcnZlclVyaSIsInRpbWVvdXQiLCJwYXlsb2FkIiwiaGVhZGVycyIsImh0dHBNZXRob2QiLCJ0b0xvd2VyQ2FzZSIsInVybCIsInRvVXBwZXJDYXNlIiwicXMiLCJqc29uIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJlcnJvciIsInJlc3BvbnNlIiwiYm9keSIsImluZGV4T2YiLCJzdGF0dXNDb2RlIiwiZXJyUmVzcG9uc2UiLCJlcnJvclRyZWF0bWVudCIsImUiLCJyaWdodEF1dGhUaW1lc3RhbXAiLCJnZXRSaWdodEF1dGhUaW1lc3RhbXAiLCJzZW5kUmVxdWVzdCIsInRoZW4iLCJyZXN1bHQiLCJtc2ciLCJ0ZW1wU3RyIiwic3Vic3RyaW5nIiwibGVuZ3RoIiwiXyIsImlzU3RyaW5nIiwic2xpY2UiLCJ0cmltIiwiaGFzIiwiZGV0YWlsIiwiZXJyb3JNc2ciLCJnZXRFcnJvck1zZyIsImNvZGUiLCJUaW1lb3V0RXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQTs7OztJQUlNQSxrQjs7O0FBQ0YsZ0NBQVlDLE9BQVosRUFBcUI7QUFBQTs7QUFBQTs7QUFFakIsY0FBS0EsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsY0FBS0MsSUFBTCxHQUFZLG9CQUFaO0FBSGlCO0FBSXBCOzs7RUFMNEJDLEs7O0FBUWpDLElBQU1DLE9BQU87QUFDVEMsVUFBTSxpQkFERztBQUVUQyxjQUFVLDBCQUZEO0FBR1RDLFlBQVEsbUJBSEM7QUFJVEMsZUFBVztBQUpGLENBQWI7O0FBT0EsU0FBU0MsTUFBVCxDQUFnQkMsT0FBaEIsRUFBeUI7QUFDckIsUUFBTUMsYUFBYVAsS0FBS00sUUFBUUUsUUFBYixDQUFuQjtBQUNBLFFBQU1DLFFBQVEsSUFBSUMsbUJBQUosQ0FBVUosUUFBUUssTUFBbEIsRUFBMEJMLFFBQVFNLFNBQWxDLENBQWQ7QUFDQSxRQUFNQyxZQUFZLElBQUlDLHFCQUFKLENBQVlSLFFBQVFTLE1BQXBCLEVBQTRCUixVQUE1QixFQUF3QyxFQUF4QyxDQUFsQjtBQUNBRSxVQUFNTyxJQUFOLENBQVdILFNBQVgsRUFBc0JQLFFBQVFXLGFBQTlCO0FBQ0EsUUFBTUMsV0FBV0wsVUFBVU0sV0FBVixFQUFqQjtBQUNBLGdCQUFVYixRQUFRYyxTQUFsQixHQUE4QmIsVUFBOUIsU0FBNENjLHNCQUFZQyxTQUFaLENBQXNCSixRQUF0QixDQUE1QztBQUNIOztJQUVvQkssRztBQUNqQixpQkFBWUMsR0FBWixFQUFpQkMsTUFBakIsRUFBeUJDLGNBQXpCLEVBQXlDTixTQUF6QyxFQUFvRE8sV0FBcEQsRUFBaUU7QUFBQTs7QUFDN0QsWUFBSSxDQUFDSCxHQUFELElBQVEsT0FBT0EsR0FBUCxLQUFlLFFBQTNCLEVBQXFDO0FBQ2pDLGtCQUFNLElBQUlJLHVCQUFKLEVBQU47QUFDSDtBQUNELFlBQUksQ0FBQ0gsTUFBRCxJQUFXLE9BQU9BLE1BQVAsS0FBa0IsUUFBakMsRUFBMkM7QUFDdkMsa0JBQU0sSUFBSUksdUJBQUosRUFBTjtBQUNIO0FBQ0QsWUFBSVQsU0FBSixFQUFlO0FBQ1gsZ0JBQUksT0FBT0EsU0FBUCxLQUFxQixRQUF6QixFQUFtQztBQUMvQixzQkFBTSxJQUFJVSw0QkFBSixFQUFOO0FBQ0g7QUFDSjtBQUNELGFBQUtuQixNQUFMLEdBQWNhLEdBQWQ7QUFDQSxhQUFLWixTQUFMLEdBQWlCYSxNQUFqQjtBQUNBLGFBQUtDLGNBQUwsR0FBc0JBLGtCQUFrQixLQUF4QztBQUNBLGFBQUtOLFNBQUwsR0FBaUJBLGFBQWEsc0JBQTlCO0FBQ0EsYUFBS1csT0FBTCxHQUFlSixjQUFjLElBQTdCO0FBQ0g7Ozs7b0NBQ1dLLE8sRUFBU3hCLFEsRUFBVU8sTSxFQUFRa0IsTyxFQUFTaEIsYSxFQUFlO0FBQUE7O0FBQzNELGdCQUFJLENBQUNBLGFBQUwsRUFBb0JBLGdCQUFnQixJQUFoQjtBQUNwQixnQkFBTWlCLGFBQWFuQixTQUFTQSxPQUFPb0IsV0FBUCxFQUFULEdBQWdDLE1BQW5EO0FBQ0EsZ0JBQU1DLE1BQU0vQixPQUFPO0FBQ2ZNLHdCQUFRLEtBQUtBLE1BREU7QUFFZkMsMkJBQVcsS0FBS0EsU0FGRDtBQUdmUSwyQkFBVyxLQUFLQSxTQUhEO0FBSWZMLHdCQUFRbUIsVUFKTztBQUtmMUIsa0NBTGU7QUFNZlM7QUFOZSxhQUFQLENBQVo7QUFRQSxnQkFBTVgsVUFBVTtBQUNaOEIsd0JBRFk7QUFFWnJCLHdCQUFRbUIsV0FBV0csV0FBWCxFQUZJO0FBR1pKLHlCQUFTQSxXQUFXLEVBSFI7QUFJWkYseUJBQVMsS0FBS0E7QUFKRixhQUFoQjtBQU1BLGdCQUFJRyxlQUFlLEtBQW5CLEVBQTBCO0FBQ3RCNUIsd0JBQVFnQyxFQUFSLEdBQWFOLE9BQWI7QUFDSCxhQUZELE1BRU87QUFDSDFCLHdCQUFRaUMsSUFBUixHQUFlUCxPQUFmO0FBQ0g7QUFDRCxtQkFBTyxJQUFJUSxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3BDLHVDQUFRcEMsT0FBUixFQUFpQixVQUFDcUMsS0FBRCxFQUFRQyxRQUFSLEVBQWtCQyxJQUFsQixFQUEyQjtBQUN4Qyx3QkFBSSxDQUFDRixLQUFELElBQVUsQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXRyxPQUFYLENBQW1CRixTQUFTRyxVQUE1QixJQUEwQyxDQUFDLENBQXpELEVBQTREO0FBQ3hETixnQ0FBUUksSUFBUjtBQUNILHFCQUZELE1BRU87QUFDSCw0QkFBSTtBQUNBLGdDQUFNRyxjQUFjLE9BQUtDLGNBQUwsQ0FBb0JOLEtBQXBCLEVBQTJCRSxJQUEzQixDQUFwQjtBQUNBSCxtQ0FBT00sV0FBUDtBQUNILHlCQUhELENBR0UsT0FBT0UsQ0FBUCxFQUFVO0FBQ1IsZ0NBQUlBLEVBQUVwRCxJQUFGLEdBQVMsb0JBQWIsRUFBbUM7QUFDL0Isb0NBQU1xRCxxQkFBcUIsT0FBS0MscUJBQUwsQ0FBMkJGLEVBQUVyRCxPQUE3QixDQUEzQjtBQUNBLHVDQUFLd0QsV0FBTCxDQUNJckIsT0FESixFQUVJeEIsUUFGSixFQUdJTyxNQUhKLEVBSUlrQixPQUpKLEVBS0lrQixrQkFMSixFQU1FRyxJQU5GLENBTU8sVUFBQ0MsTUFBRCxFQUFZO0FBQ2ZkLDRDQUFRYyxNQUFSO0FBQ0gsaUNBUkQsRUFRRyxVQUFDWixLQUFELEVBQVc7QUFDVkQsMkNBQU9DLEtBQVA7QUFDSCxpQ0FWRDtBQVdILDZCQWJELE1BYU87QUFDSEQsdUNBQU9RLEVBQUVyRCxPQUFUO0FBQ0g7QUFDSjtBQUNKO0FBQ0osaUJBMUJEO0FBMkJILGFBNUJNLENBQVA7QUE2Qkg7Ozs4Q0FDcUIyRCxHLEVBQUs7QUFDdkIsZ0JBQU1DLFVBQVVELElBQUlFLFNBQUosQ0FBY0YsSUFBSVYsT0FBSixDQUFZLGVBQVosQ0FBZCxFQUE0Q1UsSUFBSUcsTUFBSixHQUFhLENBQXpELENBQWhCO0FBQ0EsbUJBQU9GLFFBQVFDLFNBQVIsQ0FBa0JELFFBQVFYLE9BQVIsQ0FBZ0IsSUFBaEIsSUFBd0IsQ0FBMUMsRUFBNkNXLFFBQVFFLE1BQVIsR0FBaUIsQ0FBOUQsQ0FBUDtBQUNIOzs7b0NBQ1dkLEksRUFBTTtBQUNkLGdCQUFJZSxpQkFBRUMsUUFBRixDQUFXaEIsSUFBWCxDQUFKLEVBQXNCO0FBQ2xCLHVCQUFPQSxLQUFLaUIsS0FBTCxDQUFXLENBQVgsRUFBY2pCLEtBQUtDLE9BQUwsQ0FBYSxnQkFBYixDQUFkLEVBQThDaUIsSUFBOUMsRUFBUDtBQUNILGFBRkQsTUFFTztBQUNILHVCQUFPSCxpQkFBRUksR0FBRixDQUFNbkIsSUFBTixFQUFZLE9BQVosSUFBdUJBLEtBQUtGLEtBQTVCLEdBQW9DRSxLQUFLb0IsTUFBaEQ7QUFDSDtBQUNKOzs7dUNBQ2N0QixLLEVBQU9FLEksRUFBTTtBQUN4QixnQkFBSUcsY0FBYyxJQUFsQjtBQUNBLGdCQUFNa0IsV0FBVyxLQUFLQyxXQUFMLENBQWlCdEIsSUFBakIsQ0FBakI7QUFDQSxnQkFBSUYsVUFBVUEsTUFBTXlCLElBQU4sS0FBZSxXQUFmLElBQThCekIsTUFBTXlCLElBQU4sS0FBZSxpQkFBdkQsQ0FBSixFQUErRTtBQUMzRXBCLDhCQUFjO0FBQ1ZMLHdGQUNFLEtBQUtaLE9BRFA7QUFEVSxpQkFBZDtBQUlBLG9CQUFJLEtBQUtMLGNBQVQsRUFBeUI7QUFDckIsMEJBQU0sSUFBSTJDLHdCQUFKLENBQWlCLEtBQUt0QyxPQUF0QixDQUFOO0FBQ0g7QUFDSixhQVJELE1BUU8sSUFBSW1DLFNBQVNwQixPQUFULENBQWlCLGVBQWpCLElBQW9DLENBQXhDLEVBQTJDO0FBQzlDLHNCQUFNLElBQUlsRCxrQkFBSixDQUF1QnNFLFFBQXZCLENBQU47QUFDSCxhQUZNLE1BRUEsSUFBSSxLQUFLeEMsY0FBVCxFQUF5QjtBQUM1QixvQkFBSWtDLGlCQUFFQyxRQUFGLENBQVdoQixJQUFYLENBQUosRUFBc0I7QUFDbEJHLGtDQUFjLEVBQUVMLFlBQUYsRUFBU0UsTUFBTXFCLFFBQWYsRUFBZDtBQUNILGlCQUZELE1BRU87QUFDSGxCLGtDQUFjLEVBQUVMLE9BQU91QixRQUFULEVBQWQ7QUFDSDtBQUNKLGFBTk0sTUFNQTtBQUNIbEIsOEJBQWMsQ0FBQ0wsS0FBRCxHQUFTLEVBQUVBLE9BQU91QixRQUFULEVBQVQsR0FBK0J2QixLQUE3QztBQUNIO0FBQ0QsbUJBQU9LLFdBQVA7QUFDSDs7Ozs7O2tCQXpHZ0J6QixHIiwiZmlsZSI6ImFwaS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgcmVxdWVzdCBmcm9tICdyZXF1ZXN0JztcbmltcG9ydCBxdWVyeXN0cmluZyBmcm9tICdxdWVyeXN0cmluZyc7XG5pbXBvcnQgeyBUb2tlbiwgUmVxdWVzdCB9IGZyb20gJy4vYXB5c2lnbmF0dXJlJztcbmltcG9ydCB7IE5vUHVibGljS2V5LCBOb1NlY3JldEtleSwgSW52YWxpZFNlcnZlclVyaSwgVGltZW91dEVycm9yIH0gZnJvbSAnLi9leGNlcHRpb25zJztcblxuLypcbiogVkVSU0lPTiAxLjEwLjBcbiogKi9cblxuY2xhc3MgQXV0aFRpbWVTdGFtcEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTsgXG4gICAgICAgIHRoaXMubmFtZSA9ICdBdXRoVGltZVN0YW1wRXJyb3InO1xuICAgIH1cbn1cblxuY29uc3QgYXBpcyA9IHtcbiAgICB0ZXh0OiAnL2FwaS9zZW5kX21haWwvJyxcbiAgICB0ZW1wbGF0ZTogJy9hcGkvc2VuZF9tYWlsL3RlbXBsYXRlLycsXG4gICAgc2VhcmNoOiAnL2FwaS9tYWlsL3NlYXJjaC8nLFxuICAgIHNwZWNpZmljczogJy9hcGkvbWFpbC9zZWFyY2gvc3BlY2lmaWNzLycsXG59O1xuXG5mdW5jdGlvbiBnZXRVcmwob3B0aW9ucykge1xuICAgIGNvbnN0IHNlbmRNZXRob2QgPSBhcGlzW29wdGlvbnMuZW5kcG9pbnRdO1xuICAgIGNvbnN0IHRva2VuID0gbmV3IFRva2VuKG9wdGlvbnMuYXBpS2V5LCBvcHRpb25zLmFwaVNlY3JldCk7XG4gICAgY29uc3Qgc2lnbmVkUmVxID0gbmV3IFJlcXVlc3Qob3B0aW9ucy5tZXRob2QsIHNlbmRNZXRob2QsIHt9KTtcbiAgICB0b2tlbi5zaWduKHNpZ25lZFJlcSwgb3B0aW9ucy5hdXRoVGltZXN0YW1wKTtcbiAgICBjb25zdCBhdXRoRGljdCA9IHNpZ25lZFJlcS5nZXRBdXRoRGljdCgpO1xuICAgIHJldHVybiBgJHtvcHRpb25zLnNlcnZlclVyaX0ke3NlbmRNZXRob2R9PyR7cXVlcnlzdHJpbmcuc3RyaW5naWZ5KGF1dGhEaWN0KX1gO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcGkge1xuICAgIGNvbnN0cnVjdG9yKGtleSwgc2VjcmV0LCByZXR1cm5SYXdFcnJvciwgc2VydmVyVXJpLCB0aW1lb3V0UmVhZCkge1xuICAgICAgICBpZiAoIWtleSB8fCB0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE5vUHVibGljS2V5KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFzZWNyZXQgfHwgdHlwZW9mIHNlY3JldCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBOb1NlY3JldEtleSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZXJ2ZXJVcmkpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2VydmVyVXJpICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkU2VydmVyVXJpKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hcGlLZXkgPSBrZXk7XG4gICAgICAgIHRoaXMuYXBpU2VjcmV0ID0gc2VjcmV0O1xuICAgICAgICB0aGlzLnJldHVyblJhd0Vycm9yID0gcmV0dXJuUmF3RXJyb3IgfHwgZmFsc2U7XG4gICAgICAgIHRoaXMuc2VydmVyVXJpID0gc2VydmVyVXJpIHx8ICdodHRwOi8vd3d3Lm1pdHRlLnBybyc7XG4gICAgICAgIHRoaXMudGltZW91dCA9IHRpbWVvdXRSZWFkICogMTAwMDtcbiAgICB9XG4gICAgc2VuZFJlcXVlc3QocGF5bG9hZCwgZW5kcG9pbnQsIG1ldGhvZCwgaGVhZGVycywgYXV0aFRpbWVzdGFtcCkge1xuICAgICAgICBpZiAoIWF1dGhUaW1lc3RhbXApIGF1dGhUaW1lc3RhbXAgPSBudWxsO1xuICAgICAgICBjb25zdCBodHRwTWV0aG9kID0gbWV0aG9kID8gbWV0aG9kLnRvTG93ZXJDYXNlKCkgOiAncG9zdCc7XG4gICAgICAgIGNvbnN0IHVybCA9IGdldFVybCh7XG4gICAgICAgICAgICBhcGlLZXk6IHRoaXMuYXBpS2V5LFxuICAgICAgICAgICAgYXBpU2VjcmV0OiB0aGlzLmFwaVNlY3JldCxcbiAgICAgICAgICAgIHNlcnZlclVyaTogdGhpcy5zZXJ2ZXJVcmksXG4gICAgICAgICAgICBtZXRob2Q6IGh0dHBNZXRob2QsXG4gICAgICAgICAgICBlbmRwb2ludCxcbiAgICAgICAgICAgIGF1dGhUaW1lc3RhbXAsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgbWV0aG9kOiBodHRwTWV0aG9kLnRvVXBwZXJDYXNlKCksXG4gICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzIHx8IHt9LFxuICAgICAgICAgICAgdGltZW91dDogdGhpcy50aW1lb3V0LFxuICAgICAgICB9O1xuICAgICAgICBpZiAoaHR0cE1ldGhvZCA9PT0gJ2dldCcpIHtcbiAgICAgICAgICAgIG9wdGlvbnMucXMgPSBwYXlsb2FkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3B0aW9ucy5qc29uID0gcGF5bG9hZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgcmVxdWVzdChvcHRpb25zLCAoZXJyb3IsIHJlc3BvbnNlLCBib2R5KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFlcnJvciAmJiBbMjAwLCAyMDFdLmluZGV4T2YocmVzcG9uc2Uuc3RhdHVzQ29kZSkgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGJvZHkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlcnJSZXNwb25zZSA9IHRoaXMuZXJyb3JUcmVhdG1lbnQoZXJyb3IsIGJvZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVyclJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUubmFtZSA9ICdBdXRoVGltZVN0YW1wRXJyb3InKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmlnaHRBdXRoVGltZXN0YW1wID0gdGhpcy5nZXRSaWdodEF1dGhUaW1lc3RhbXAoZS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRSZXF1ZXN0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRwb2ludCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodEF1dGhUaW1lc3RhbXBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXRSaWdodEF1dGhUaW1lc3RhbXAobXNnKSB7XG4gICAgICAgIGNvbnN0IHRlbXBTdHIgPSBtc2cuc3Vic3RyaW5nKG1zZy5pbmRleE9mKCdTZXJ2ZXIgdGltZTogJyksIG1zZy5sZW5ndGggKyAxKTtcbiAgICAgICAgcmV0dXJuIHRlbXBTdHIuc3Vic3RyaW5nKHRlbXBTdHIuaW5kZXhPZignOiAnKSArIDIsIHRlbXBTdHIubGVuZ3RoICsgMSk7XG4gICAgfVxuICAgIGdldEVycm9yTXNnKGJvZHkpIHtcbiAgICAgICAgaWYgKF8uaXNTdHJpbmcoYm9keSkpIHtcbiAgICAgICAgICAgIHJldHVybiBib2R5LnNsaWNlKDAsIGJvZHkuaW5kZXhPZignUmVxdWVzdCBNZXRob2QnKSkudHJpbSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIF8uaGFzKGJvZHksICdlcnJvcicpID8gYm9keS5lcnJvciA6IGJvZHkuZGV0YWlsO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVycm9yVHJlYXRtZW50KGVycm9yLCBib2R5KSB7XG4gICAgICAgIGxldCBlcnJSZXNwb25zZSA9IG51bGw7XG4gICAgICAgIGNvbnN0IGVycm9yTXNnID0gdGhpcy5nZXRFcnJvck1zZyhib2R5KTtcbiAgICAgICAgaWYgKGVycm9yICYmIChlcnJvci5jb2RlID09PSAnRVRJTUVET1VUJyB8fCBlcnJvci5jb2RlID09PSAnRVNPQ0tFVFRJTUVET1VUJykpIHtcbiAgICAgICAgICAgIGVyclJlc3BvbnNlID0ge1xuICAgICAgICAgICAgICAgIGVycm9yOiBgVGhlIHNlcnZlciBkaWQgbm90IHJlc3BvbmQgd2l0aGluIHRoZSBcbiAgICAgICAgICAgICAgICAke3RoaXMudGltZW91dH0gc2Vjb25kKHMpIHlvdSBzdGlwdWxhdGVkYCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAodGhpcy5yZXR1cm5SYXdFcnJvcikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUaW1lb3V0RXJyb3IodGhpcy50aW1lb3V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChlcnJvck1zZy5pbmRleE9mKCdTZXJ2ZXIgdGltZTogJykgPiAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgQXV0aFRpbWVTdGFtcEVycm9yKGVycm9yTXNnKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnJldHVyblJhd0Vycm9yKSB7XG4gICAgICAgICAgICBpZiAoXy5pc1N0cmluZyhib2R5KSkge1xuICAgICAgICAgICAgICAgIGVyclJlc3BvbnNlID0geyBlcnJvciwgYm9keTogZXJyb3JNc2cgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXJyUmVzcG9uc2UgPSB7IGVycm9yOiBlcnJvck1zZyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXJyUmVzcG9uc2UgPSAhZXJyb3IgPyB7IGVycm9yOiBlcnJvck1zZyB9IDogZXJyb3I7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVyclJlc3BvbnNlO1xuICAgIH1cbn1cbiJdfQ==