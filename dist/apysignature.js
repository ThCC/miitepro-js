"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Request = exports.Token = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var wrongTimestamp = (0, _moment2.default)().subtract(4, 'hours').unix();

var Token = function () {
    function Token(key, secret) {
        _classCallCheck(this, Token);

        this.key = key;
        this.secret = secret;
    }

    _createClass(Token, [{
        key: 'sign',
        value: function sign(request, authTimestamp) {
            request.sign(this, authTimestamp);
        }
    }]);

    return Token;
}();

var Request = function () {
    function Request(method, path, query) {
        _classCallCheck(this, Request);

        var _this = this;
        this.authDict = {};
        this.queryDict = {};
        this.signed = false;
        this.AUTH_VERSION = '1.0';
        this.ISO8601 = (0, _moment2.default)().toISOString();
        if (typeof path != 'string') throw new Error('Expected string');
        if ((typeof query === 'undefined' ? 'undefined' : _typeof(query)) != 'object') throw new Error('Expected object');

        _lodash2.default.forEach(query, function (value, key) {
            var keyLower = key.toLowerCase();
            if (keyLower.search('auth_') >= 0) {
                _this.authDict[keyLower] = value.trim();
            } else {
                if (_lodash2.default.isArray(value)) {
                    _lodash2.default.forEach(value, function (v, idx) {
                        value[idx] = v.trim();
                    });
                    _this.queryDict[keyLower + '[]'] = value;
                } else if (_lodash2.default.isObject(value)) {
                    _this.queryDict[keyLower] = value;
                } else {
                    _this.queryDict[keyLower] = value.trim();
                }
            }
        });
        this.path = path;
        this.method = method.toUpperCase();
    }

    _createClass(Request, [{
        key: 'sign',
        value: function sign(token, authTimestamp) {
            this.authDict = {
                auth_version: this.AUTH_VERSION,
                auth_key: token.key,
                auth_timestamp: authTimestamp || (0, _moment2.default)().unix()
            };

            this.authDict['auth_signature'] = this.signature(token);
            this.signed = true;
            return this.authDict;
        }
    }, {
        key: 'getAuthDict',
        value: function getAuthDict() {
            if (!this.signed) throw new Error('Request not signed');
            return this.authDict;
        }
    }, {
        key: 'signedParams',
        value: function signedParams() {
            return _lodash2.default.extend(this.queryDict, this.authDict);
        }
    }, {
        key: 'sortObj',
        value: function sortObj(obj) {
            var ordered = {};
            Object.keys(obj).sort().forEach(function (key) {
                return ordered[key] = obj[key];
            });
            return ordered;
        }
    }, {
        key: 'parameterString',
        value: function parameterString() {
            var paramDict = this.signedParams() || {};
            var paramDictLower = {};
            _lodash2.default.forEach(paramDict, function (value, key) {
                paramDictLower[key.toLowerCase()] = value;
            });
            delete paramDictLower['auth_signature'];
            var stringifyed = _querystring2.default.stringify(this.sortObj(paramDictLower));
            return _querystring2.default.unescape(stringifyed);
        }
    }, {
        key: 'stringToSign',
        value: function stringToSign() {
            return [this.method, this.path, this.parameterString()].join('\n');
        }
    }, {
        key: 'signature',
        value: function signature(token) {
            return _crypto2.default.createHmac('sha256', token.secret).update(this.stringToSign()).digest('hex');
        }
    }]);

    return Request;
}();

exports.Token = Token;
exports.Request = Request;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHlzaWduYXR1cmUuanMiXSwibmFtZXMiOlsid3JvbmdUaW1lc3RhbXAiLCJzdWJ0cmFjdCIsInVuaXgiLCJUb2tlbiIsImtleSIsInNlY3JldCIsInJlcXVlc3QiLCJhdXRoVGltZXN0YW1wIiwic2lnbiIsIlJlcXVlc3QiLCJtZXRob2QiLCJwYXRoIiwicXVlcnkiLCJfdGhpcyIsImF1dGhEaWN0IiwicXVlcnlEaWN0Iiwic2lnbmVkIiwiQVVUSF9WRVJTSU9OIiwiSVNPODYwMSIsInRvSVNPU3RyaW5nIiwiRXJyb3IiLCJfIiwiZm9yRWFjaCIsInZhbHVlIiwia2V5TG93ZXIiLCJ0b0xvd2VyQ2FzZSIsInNlYXJjaCIsInRyaW0iLCJpc0FycmF5IiwidiIsImlkeCIsImlzT2JqZWN0IiwidG9VcHBlckNhc2UiLCJ0b2tlbiIsImF1dGhfdmVyc2lvbiIsImF1dGhfa2V5IiwiYXV0aF90aW1lc3RhbXAiLCJzaWduYXR1cmUiLCJleHRlbmQiLCJvYmoiLCJvcmRlcmVkIiwiT2JqZWN0Iiwia2V5cyIsInNvcnQiLCJwYXJhbURpY3QiLCJzaWduZWRQYXJhbXMiLCJwYXJhbURpY3RMb3dlciIsInN0cmluZ2lmeWVkIiwicXVlcnlzdHJpbmciLCJzdHJpbmdpZnkiLCJzb3J0T2JqIiwidW5lc2NhcGUiLCJwYXJhbWV0ZXJTdHJpbmciLCJqb2luIiwiY3J5cHRvIiwiY3JlYXRlSG1hYyIsInVwZGF0ZSIsInN0cmluZ1RvU2lnbiIsImRpZ2VzdCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTUEsaUJBQWlCLHdCQUFTQyxRQUFULENBQWtCLENBQWxCLEVBQXFCLE9BQXJCLEVBQThCQyxJQUE5QixFQUF2Qjs7SUFFTUMsSztBQUNGLG1CQUFZQyxHQUFaLEVBQWlCQyxNQUFqQixFQUF5QjtBQUFBOztBQUNyQixhQUFLRCxHQUFMLEdBQVdBLEdBQVg7QUFDQSxhQUFL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O0FBQUEsYUFBaEM7QUFDQSxtQkFBT29DLE9BQVA7QUFDSDs7OzBDQUVpQjtBQUNkLGdCQUFJSSxZQUFZLEtBQUtDLFlBQUwsTUFBdUIsRUFBdkM7QUFDQSxnQkFBSUMsaUJBQWlCLEVBQXJCO0FBQ0F6Qiw2QkFBRUMsT0FBRixDQUFVc0IsU0FBVixFQUFxQixVQUFVckIsS0FBVixFQUFpQm5CLEdBQWpCLEVBQXNCO0FBQ3ZDMEMsK0JBQWUxQyxJQUFJcUIsV0FBSixFQUFmLElBQW9DRixLQUFwQztBQUNILGFBRkQ7QUFHQSxtQkFBT3VCLGVBQWUsZ0JBQWYsQ0FBUDtBQUNBLGdCQUFJQyxjQUFjQyxzQkFBWUMsU0FBWixDQUFzQixLQUFLQyxPQUFMLENBQWFKLGNBQWIsQ0FBdEIsQ0FBbEI7QUFDQSxtQkFBT0Usc0JBQVlHLFFBQVosQ0FBcUJKLFdBQXJCLENBQVA7QUFDSDs7O3VDQUVjO0FBQ1gsbUJBQU8sQ0FBQyxLQUFLckMsTUFBTixFQUFjLEtBQUtDLElBQW5CLEVBQXlCLEtBQUt5QyxlQUFMLEVBQXpCLEVBQWlEQyxJQUFqRCxDQUFzRCxJQUF0RCxDQUFQO0FBQ0g7OztrQ0FFU3BCLEssRUFBTztBQUNiLG1CQUFPcUIsaUJBQU9DLFVBQVAsQ0FBa0IsUUFBbEIsRUFBNEJ0QixNQUFNNUIsTUFBbEMsRUFBMENtRCxNQUExQyxDQUFpRCxLQUFLQyxZQUFMLEVBQWpELEVBQXNFQyxNQUF0RSxDQUE2RSxLQUE3RSxDQUFQO0FBQ0g7Ozs7OztRQUdJdkQsSyxHQUFBQSxLO1FBQU9NLE8sR0FBQUEsTyIsImZpbGUiOiJhcHlzaWduYXR1cmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBjcnlwdG8gZnJvbSAnY3J5cHRvJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCBxdWVyeXN0cmluZyBmcm9tICdxdWVyeXN0cmluZyc7XG5cbmNvbnN0IHdyb25nVGltZXN0YW1wID0gbW9tZW50KCkuc3VidHJhY3QoNCwgJ2hvdXJzJykudW5peCgpO1xuXG5jbGFzcyBUb2tlbiB7XG4gICAgY29uc3RydWN0b3Ioa2V5LCBzZWNyZXQpIHtcbiAgICAgICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgICAgIHRoaXMuc2VjcmV0ID0gc2VjcmV0O1xuICAgIH1cbiAgICBzaWduKHJlcXVlc3QsIGF1dGhUaW1lc3RhbXApIHtcbiAgICAgICAgcmVxdWVzdC5zaWduKHRoaXMsIGF1dGhUaW1lc3RhbXApO1xuICAgIH1cbn1cblxuY2xhc3MgUmVxdWVzdCB7XG4gICAgY29uc3RydWN0b3IobWV0aG9kLCBwYXRoLCBxdWVyeSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmF1dGhEaWN0ID0ge307XG4gICAgICAgIHRoaXMucXVlcnlEaWN0ID0ge307XG4gICAgICAgIHRoaXMuc2lnbmVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuQVVUSF9WRVJTSU9OID0gJzEuMCc7XG4gICAgICAgIHRoaXMuSVNPODYwMSA9IG1vbWVudCgpLnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIGlmICh0eXBlb2YgcGF0aCAhPSAnc3RyaW5nJykgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBzdHJpbmcnKTtcbiAgICAgICAgaWYgKHR5cGVvZiBxdWVyeSAhPSAnb2JqZWN0JykgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBvYmplY3QnKTtcblxuICAgICAgICBfLmZvckVhY2gocXVlcnksIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICB2YXIga2V5TG93ZXIgPSBrZXkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmIChrZXlMb3dlci5zZWFyY2goJ2F1dGhfJykgPj0gMCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmF1dGhEaWN0W2tleUxvd2VyXSA9IHZhbHVlLnRyaW0oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChfLmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIF8uZm9yRWFjaCh2YWx1ZSwgZnVuY3Rpb24gKHYsIGlkeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVbaWR4XSA9IHYudHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMucXVlcnlEaWN0W2tleUxvd2VyICsgJ1tdJ10gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKF8uaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnF1ZXJ5RGljdFtrZXlMb3dlcl0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5xdWVyeURpY3Rba2V5TG93ZXJdID0gdmFsdWUudHJpbSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBtZXRob2QudG9VcHBlckNhc2UoKTtcbiAgICB9XG5cbiAgICBzaWduKHRva2VuLCBhdXRoVGltZXN0YW1wKSB7XG4gICAgICAgIHRoaXMuYXV0aERpY3QgPSB7XG4gICAgICAgICAgICBhdXRoX3ZlcnNpb246IHRoaXMuQVVUSF9WRVJTSU9OLFxuICAgICAgICAgICAgYXV0aF9rZXk6IHRva2VuLmtleSxcbiAgICAgICAgICAgIGF1dGhfdGltZXN0YW1wOiBhdXRoVGltZXN0YW1wIHx8IG1vbWVudCgpLnVuaXgoKVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuYXV0aERpY3RbJ2F1dGhfc2lnbmF0dXJlJ10gPSB0aGlzLnNpZ25hdHVyZSh0b2tlbik7XG4gICAgICAgIHRoaXMuc2lnbmVkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXV0aERpY3Q7XG4gICAgfVxuXG4gICAgZ2V0QXV0aERpY3QoKSB7XG4gICAgICAgIGlmICghdGhpcy5zaWduZWQpIHRocm93IG5ldyBFcnJvcignUmVxdWVzdCBub3Qgc2lnbmVkJyk7XG4gICAgICAgIHJldHVybiB0aGlzLmF1dGhEaWN0O1xuICAgIH1cblxuICAgIHNpZ25lZFBhcmFtcygpIHtcbiAgICAgICAgcmV0dXJuIF8uZXh0ZW5kKHRoaXMucXVlcnlEaWN0LCB0aGlzLmF1dGhEaWN0KTtcbiAgICB9XG5cbiAgICBzb3J0T2JqKG9iaikge1xuICAgICAgICB2YXIgb3JkZXJlZCA9IHt9O1xuICAgICAgICBPYmplY3Qua2V5cyhvYmopLnNvcnQoKS5mb3JFYWNoKChrZXkpID0+IG9yZGVyZWRba2V5XSA9IG9ialtrZXldKTtcbiAgICAgICAgcmV0dXJuIG9yZGVyZWQ7XG4gICAgfVxuXG4gICAgcGFyYW1ldGVyU3RyaW5nKCkge1xuICAgICAgICB2YXIgcGFyYW1EaWN0ID0gdGhpcy5zaWduZWRQYXJhbXMoKSB8fCB7fTtcbiAgICAgICAgdmFyIHBhcmFtRGljdExvd2VyID0ge307XG4gICAgICAgIF8uZm9yRWFjaChwYXJhbURpY3QsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICBwYXJhbURpY3RMb3dlcltrZXkudG9Mb3dlckNhc2UoKV0gPSB2YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRlbGV0ZSBwYXJhbURpY3RMb3dlclsnYXV0aF9zaWduYXR1cmUnXTtcbiAgICAgICAgdmFyIHN0cmluZ2lmeWVkID0gcXVlcnlzdHJpbmcuc3RyaW5naWZ5KHRoaXMuc29ydE9iaihwYXJhbURpY3RMb3dlcikpO1xuICAgICAgICByZXR1cm4gcXVlcnlzdHJpbmcudW5lc2NhcGUoc3RyaW5naWZ5ZWQpO1xuICAgIH1cblxuICAgIHN0cmluZ1RvU2lnbigpIHtcbiAgICAgICAgcmV0dXJuIFt0aGlzLm1ldGhvZCwgdGhpcy5wYXRoLCB0aGlzLnBhcmFtZXRlclN0cmluZygpXS5qb2luKCdcXG4nKTtcbiAgICB9XG5cbiAgICBzaWduYXR1cmUodG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIGNyeXB0by5jcmVhdGVIbWFjKCdzaGEyNTYnLCB0b2tlbi5zZWNyZXQpLnVwZGF0ZSh0aGlzLnN0cmluZ1RvU2lnbigpKS5kaWdlc3QoJ2hleCcpO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgVG9rZW4sIFJlcXVlc3QgfSJdfQ==