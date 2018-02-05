'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _exceptions = require('./exceptions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validators = function () {
    function Validators(params) {
        _classCallCheck(this, Validators);

        this.params = params;
    }

    _createClass(Validators, [{
        key: 'validateRecipients',
        value: function validateRecipients() {
            _lodash2.default.forEach(this.params.recipientList, function (recipient) {
                if (Validators.isEmailInvalid(recipient)) {
                    throw new _exceptions.InvalidRecipientList();
                }
            });
        }
    }, {
        key: 'validadeFrom',
        value: function validadeFrom() {
            if (Validators.isEmailInvalid(this.params.from)) {
                throw new _exceptions.InvalidFrom();
            }
        }
    }, {
        key: 'validateSendAt',
        value: function validateSendAt() {
            if (_lodash2.default.has(this.params, 'sendAt') && this.params.sendAt) {
                if (!(0, _moment2.default)(this.params.sendAt, ['YYYY-MM-DD HH:mm:ss'], true).isValid()) {
                    throw new _exceptions.InvalidSendAt();
                }
            }
        }
    }, {
        key: 'attrNotInParams',
        value: function attrNotInParams(attr) {
            return !_lodash2.default.has(this.params, attr) || !this.params[attr];
        }
    }, {
        key: 'attrInParams',
        value: function attrInParams(attr) {
            return _lodash2.default.has(this.params, attr) && this.params[attr];
        }
    }, {
        key: 'checkMailParams',
        value: function checkMailParams() {
            if (!_lodash2.default.isObject(this.params)) throw new _exceptions.ParamsShouldBeObject();
            if (this.attrNotInParams('from') && this.attrNotInParams('useTplDefaultEmail')) {
                throw new _exceptions.NoReplyEmail();
            }
            if (this.attrInParams('from')) this.validadeFrom();
            if (this.attrNotInParams('recipientList')) throw new _exceptions.NoRecipient();
            if (!_lodash2.default.isArray(this.params.recipientList)) throw new _exceptions.NoRecipient();
            if (!this.params.recipientList.length) throw new _exceptions.NoRecipient();
            this.validateRecipients();
            this.validateSendAt();

            if (this.attrNotInParams('subject') && this.attrNotInParams('useTplDefaultSubject')) {
                throw new _exceptions.NoSubject();
            }
            if ((this.attrInParams('useTplDefaultSubject') || this.attrInParams('useTplDefaultName') || this.attrInParams('useTplDefaultEmail')) && this.attrNotInParams('templateSlug')) {
                throw new _exceptions.NoTemplateNoFeatures();
            }
        }
    }, {
        key: 'checkSearchParams',
        value: function checkSearchParams() {
            if (!_lodash2.default.isObject(this.params)) throw new _exceptions.ParamsShouldBeObject();
            if (this.attrNotInParams('start')) throw new _exceptions.NoParamX('start');
            if (this.attrNotInParams('end')) throw new _exceptions.NoParamX('end');
            if (this.attrNotInParams('appIds')) throw new _exceptions.NoParamX('appIds');
            if (!_lodash2.default.isArray(this.params.appIds)) throw new _exceptions.WrongTypeParamX('Array', 'appIds');
        }
    }], [{
        key: 'trackEmail',
        value: function trackEmail(text) {
            var TRACK_EMAIL_REGEX = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
            var tracked = text.match(TRACK_EMAIL_REGEX);
            return tracked ? tracked[0] : null;
        }
    }, {
        key: 'isEmailInvalid',
        value: function isEmailInvalid(text) {
            var EMAIL_REGEX = /(^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$)/gi;
            var email = Validators.trackEmail(text);
            if (!email) return true;
            var result = email.match(EMAIL_REGEX);
            return result === null;
        }
    }]);

    return Validators;
}();

exports.default = Validators;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92YWxpZGF0b3JzLmpzIl0sIm5hbWVzIjpbIlZhbGlkYXRvcnMiLCJwYXJhbXMiLCJmb3JFYWNoIiwicmVjaXBpZW50TGlzdCIsInJlY2lwaWVudCIsImlzRW1haWxJbnZhbGlkIiwiZnJvbSIsImhhcyIsInNlbmRBdCIsImlzVmFsaWQiLCJhdHRyIiwiaXNPYmplY3QiLCJhdHRyTm90SW5QYXJhbXMiLCJhdHRySW5QYXJhbXMiLCJ2YWxpZGFkZUZyb20iLCJpc0FycmF5IiwibGVuZ3RoIiwidmFsaWRhdGVSZWNpcGllbnRzIiwidmFsaWRhdGVTZW5kQXQiLCJhcHBJZHMiLCJ0ZXh0IiwiVFJBQ0tfRU1BSUxfUkVHRVgiLCJ0cmFja2VkIiwibWF0Y2giLCJFTUFJTF9SRUdFWCIsImVtYWlsIiwidHJhY2tFbWFpbCIsInJlc3VsdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQWFxQkEsVTtBQUNqQix3QkFBWUMsTUFBWixFQUFvQjtBQUFBOztBQUNoQixhQUFLQSxNQUFMLEdBQWNBLE1BQWQ7QUFDSDs7Ozs2Q0Fhb0I7QUFDakIsNkJBQUVDLE9BQUYsQ0FBVSxLQUFLRCxNQUFMLENBQVlFLGFBQXRCLEVBQXFDLFVBQUNDLFNBQUQsRUFBZTtBQUNoRCxvQkFBSUosV0FBV0ssY0FBWCxDQUEwQkQsU0FBMUIsQ0FBSixFQUEwQztBQUN0QywwQkFBTSxzQ0FBTjtBQUNIO0FBQ0osYUFKRDtBQUtIOzs7dUNBQ2M7QUFDWCxnQkFBSUosV0FBV0ssY0FBWCxDQUEwQixLQUFLSixNQUFMLENBQVlLLElBQXRDLENBQUosRUFBaUQ7QUFDN0Msc0JBQU0sNkJBQU47QUFDSDtBQUNKOzs7eUNBQ2dCO0FBQ2IsZ0JBQUksaUJBQUVDLEdBQUYsQ0FBTSxLQUFLTixNQUFYLEVBQW1CLFFBQW5CLEtBQWdDLEtBQUtBLE1BQUwsQ0FBWU8sTUFBaEQsRUFBd0Q7QUFDcEQsb0JBQUksQ0FBQyxzQkFBTyxLQUFLUCxNQUFMLENB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QjtBQUNIOzs7Ozs7a0JBZmdCM0IsVSIsImZpbGUiOiJ2YWxpZGF0b3JzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7XG4gICAgTm9QYXJhbVgsXG4gICAgTm9TdWJqZWN0LFxuICAgIE5vUmVjaXBpZW50LFxuICAgIEludmFsaWRGcm9tLFxuICAgIE5vUmVwbHlFbWFpbCxcbiAgICBJbnZhbGlkU2VuZEF0LFxuICAgIFdyb25nVHlwZVBhcmFtWCxcbiAgICBJbnZhbGlkUmVjaXBpZW50TGlzdCxcbiAgICBQYXJhbXNTaG91bGRCZU9iamVjdCxcbiAgICBOb1RlbXBsYXRlTm9GZWF0dXJlcyxcbn0gZnJvbSAnLi9leGNlcHRpb25zJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmFsaWRhdG9ycyB7XG4gICAgY29uc3RydWN0b3IocGFyYW1zKSB7XG4gICAgICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xuICAgIH1cbiAgICBzdGF0aWMgdHJhY2tFbWFpbCh0ZXh0KSB7XG4gICAgICAgIGNvbnN0IFRSQUNLX0VNQUlMX1JFR0VYID0gLyhbYS16QS1aMC05Ll8tXStAW2EtekEtWjAtOS5fLV0rXFwuW2EtekEtWjAtOS5fLV0rKS9naTtcbiAgICAgICAgY29uc3QgdHJhY2tlZCA9IHRleHQubWF0Y2goVFJBQ0tfRU1BSUxfUkVHRVgpO1xuICAgICAgICByZXR1cm4gdHJhY2tlZCA/IHRyYWNrZWRbMF0gOiBudWxsO1xuICAgIH1cbiAgICBzdGF0aWMgaXNFbWFpbEludmFsaWQodGV4dCkge1xuICAgICAgICBjb25zdCBFTUFJTF9SRUdFWCA9IC8oXlthLXpBLVowLTkuISMkJSbigJkqKy89P15fYHt8fX4tXStAW2EtekEtWjAtOS1dKyg/OlxcLlthLXpBLVowLTktXSspKiQpL2dpO1xuICAgICAgICBjb25zdCBlbWFpbCA9IFZhbGlkYXRvcnMudHJhY2tFbWFpbCh0ZXh0KTtcbiAgICAgICAgaWYgKCFlbWFpbCkgcmV0dXJuIHRydWU7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGVtYWlsLm1hdGNoKEVNQUlMX1JFR0VYKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdCA9PT0gbnVsbDtcbiAgICB9XG4gICAgdmFsaWRhdGVSZWNpcGllbnRzKCkge1xuICAgICAgICBfLmZvckVhY2godGhpcy5wYXJhbXMucmVjaXBpZW50TGlzdCwgKHJlY2lwaWVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKFZhbGlkYXRvcnMuaXNFbWFpbEludmFsaWQocmVjaXBpZW50KSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkUmVjaXBpZW50TGlzdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgdmFsaWRhZGVGcm9tKCkge1xuICAgICAgICBpZiAoVmFsaWRhdG9ycy5pc0VtYWlsSW52YWxpZCh0aGlzLnBhcmFtcy5mcm9tKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRGcm9tKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFsaWRhdGVTZW5kQXQoKSB7XG4gICAgICAgIGlmIChfLmhhcyh0aGlzLnBhcmFtcywgJ3NlbmRBdCcpICYmIHRoaXMucGFyYW1zLnNlbmRBdCkge1xuICAgICAgICAgICAgaWYgKCFtb21lbnQodGhpcy5wYXJhbXMuc2VuZEF0LCBbJ1lZWVktTU0tREQgSEg6bW06c3MnXSwgdHJ1ZSkuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRTZW5kQXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBhdHRyTm90SW5QYXJhbXMoYXR0cikge1xuICAgICAgICByZXR1cm4gIV8uaGFzKHRoaXMucGFyYW1zLCBhdHRyKSB8fCAhdGhpcy5wYXJhbXNbYXR0cl07XG4gICAgfVxuICAgIGF0dHJJblBhcmFtcyhhdHRyKSB7XG4gICAgICAgIHJldHVybiBfLmhhcyh0aGlzLnBhcmFtcywgYXR0cikgJiYgdGhpcy5wYXJhbXNbYXR0cl07XG4gICAgfVxuICAgIGNoZWNrTWFpbFBhcmFtcygpIHtcbiAgICAgICAgaWYgKCFfLmlzT2JqZWN0KHRoaXMucGFyYW1zKSkgdGhyb3cgbmV3IFBhcmFtc1Nob3VsZEJlT2JqZWN0KCk7XG4gICAgICAgIGlmICh0aGlzLmF0dHJOb3RJblBhcmFtcygnZnJvbScpXG4gICAgICAgICAgICAmJiB0aGlzLmF0dHJOb3RJblBhcmFtcygndXNlVHBsRGVmYXVsdEVtYWlsJykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBOb1JlcGx5RW1haWwoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5hdHRySW5QYXJhbXMoJ2Zyb20nKSkgdGhpcy52YWxpZGFkZUZyb20oKTtcbiAgICAgICAgaWYgKHRoaXMuYXR0ck5vdEluUGFyYW1zKCdyZWNpcGllbnRMaXN0JykpIHRocm93IG5ldyBOb1JlY2lwaWVudCgpO1xuICAgICAgICBpZiAoIV8uaXNBcnJheSh0aGlzLnBhcmFtcy5yZWNpcGllbnRMaXN0KSkgdGhyb3cgbmV3IE5vUmVjaXBpZW50KCk7XG4gICAgICAgIGlmICghdGhpcy5wYXJhbXMucmVjaXBpZW50TGlzdC5sZW5ndGgpIHRocm93IG5ldyBOb1JlY2lwaWVudCgpO1xuICAgICAgICB0aGlzLnZhbGlkYXRlUmVjaXBpZW50cygpO1xuICAgICAgICB0aGlzLnZhbGlkYXRlU2VuZEF0KCk7XG5cbiAgICAgICAgaWYgKHRoaXMuYXR0ck5vdEluUGFyYW1zKCdzdWJqZWN0JylcbiAgICAgICAgICAgICYmIHRoaXMuYXR0ck5vdEluUGFyYW1zKCd1c2VUcGxEZWZhdWx0U3ViamVjdCcpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTm9TdWJqZWN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCh0aGlzLmF0dHJJblBhcmFtcygndXNlVHBsRGVmYXVsdFN1YmplY3QnKVxuICAgICAgICAgICAgfHwgdGhpcy5hdHRySW5QYXJhbXMoJ3VzZVRwbERlZmF1bHROYW1lJylcbiAgICAgICAgICAgIHx8IHRoaXMuYXR0ckluUGFyYW1zKCd1c2VUcGxEZWZhdWx0RW1haWwnKSlcbiAgICAgICAgICAgICYmIHRoaXMuYXR0ck5vdEluUGFyYW1zKCd0ZW1wbGF0ZVNsdWcnKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IE5vVGVtcGxhdGVOb0ZlYXR1cmVzKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2hlY2tTZWFyY2hQYXJhbXMoKSB7XG4gICAgICAgIGlmICghXy5pc09iamVjdCh0aGlzLnBhcmFtcykpIHRocm93IG5ldyBQYXJhbXNTaG91bGRCZU9iamVjdCgpO1xuICAgICAgICBpZiAodGhpcy5hdHRyTm90SW5QYXJhbXMoJ3N0YXJ0JykpIHRocm93IG5ldyBOb1BhcmFtWCgnc3RhcnQnKTtcbiAgICAgICAgaWYgKHRoaXMuYXR0ck5vdEluUGFyYW1zKCdlbmQnKSkgdGhyb3cgbmV3IE5vUGFyYW1YKCdlbmQnKTtcbiAgICAgICAgaWYgKHRoaXMuYXR0ck5vdEluUGFyYW1zKCdhcHBJZHMnKSkgdGhyb3cgbmV3IE5vUGFyYW1YKCdhcHBJZHMnKTtcbiAgICAgICAgaWYgKCFfLmlzQXJyYXkodGhpcy5wYXJhbXMuYXBwSWRzKSkgdGhyb3cgbmV3IFdyb25nVHlwZVBhcmFtWCgnQXJyYXknLCAnYXBwSWRzJyk7XG4gICAgfVxufVxuIl19