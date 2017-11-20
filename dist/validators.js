'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92YWxpZGF0b3JzLmpzIl0sIm5hbWVzIjpbIlZhbGlkYXRvcnMiLCJwYXJhbXMiLCJmb3JFYWNoIiwicmVjaXBpZW50TGlzdCIsInJlY2lwaWVudCIsImlzRW1haWxJbnZhbGlkIiwiZnJvbSIsImF0dHIiLCJoYXMiLCJpc09iamVjdCIsImF0dHJOb3RJblBhcmFtcyIsImF0dHJJblBhcmFtcyIsInZhbGlkYWRlRnJvbSIsImlzQXJyYXkiLCJsZW5ndGgiLCJ2YWxpZGF0ZVJlY2lwaWVudHMiLCJhcHBJZHMiLCJ0ZXh0IiwiVFJBQ0tfRU1BSUxfUkVHRVgiLCJ0cmFja2VkIiwibWF0Y2giLCJFTUFJTF9SRUdFWCIsImVtYWlsIiwidHJhY2tFbWFpbCIsInJlc3VsdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7SUFZcUJBLFU7QUFDakIsd0JBQVlDLE1BQVosRUFBb0I7QUFBQTs7QUFDaEIsYUFBS0EsTUFBTCxHQUFjQSxNQUFkO0FBQ0g7Ozs7NkNBYW9CO0FBQ2pCLDZCQUFFQyxPQUFGLENBQVUsS0FBS0QsTUFBTCxDQUFZRSxhQUF0QixFQUFxQyxVQUFDQyxTQUFELEVBQWU7QUFDaEQsb0JBQUlKLFdBQVdLLGNBQVgsQ0FBMEJELFNBQTFCLENBQUosRUFBMEM7QUFDdEMsMEJBQU0sc0NBQU47QUFDSDtBQUNKLGFBSkQ7QUFLSDs7O3VDQUNjO0FBQ1gsZ0JBQUlKLFdBQVdLLGNBQVgsQ0FBMEIsS0FBS0osTUFBTCxDQUFZSyxJQUF0QyxDQUFKLEVBQWlEO0FBQzdDLHNCQUFNLDZCQUFOO0FBQ0g7QUFDSjs7O3dDQUNlQyxJLEVBQU07QUFDbEIsbUJBQU8sQ0FBQyxpQkFBRUMsR0FBRixDQUFNLEtBQUtQLE1BQVgsRUFBbUJNLElBQW5CLENBQUQsSUFBNkIsQ0FBQyxLQUFLTixNQUFMLENBQVlNLElBQVosQ0FBckM7QUFDSDs7O3FDQUNZQSxJLEVBQU07QUFDZixtQkFBTyxpQkFBRUMsR0FBRixDQUFNLEtBQUtQLE1BQVgsRUFBbUJNLElBQW5CLEtBQTRCLEtBQUtOLE1BQUwsQ0FBWU0sSUFBWixDQUFuQztBQUNIOzs7MENBQ2lCO0FBQ2QsZ0JBQUksQ0FBQyxpQkFBRUUsUUFBRixDQUFXLEtBQUtSLE1BQWhCLENBQUwsRUFBOEIsTUFBTSxzQ0FBTjtBQUM5QixnQkFBSSxLQUFLUyxlQUFMLENBQXFCLE1BQXJCLEtBQ0csS0FBS0EsZUFBTCxDQUFxQixvQkFBckIsQ0FEUCxFQUNtRDtBQUMvQyxzQkFBTSw4QkFBTjtBQUNIO0FBQ0QsZ0JBQUksS0FBS0MsWUFBTCxDQUFrQixNQUFsQixDQUFKLEVBQStCLEtBQUtDLFlBQUw7QUFDL0IsZ0JBQUksS0FBS0YsZUFBTCxDQUFxQixlQUFyQixDQUFKLEVBQTJDLE1BQU0sNkJBQU47QUFDM0MsZ0JBQUksQ0FBQyxpQkFBRUcsT0FBRixDQUFVLEtBQUtaLE1BQUwsQ0FBWUUsYUFBdEIsQ0FBTCxFQUEyQyxNQUFNLDZCQUFOO0FBQzNDLGdCQUFJLENBQUMsS0FBS0YsTUFBTCxDQUFZRSxhQUFaLENBQTBCVyxNQUEvQixFQUF1QyxNQUFNLDZCQUFOO0FBQ3ZDLGlCQUFLQyxrQkFBTDs7QUFFQSxnQkFBSSxLQUFLTCxlQUFMLENBQXFCLFNBQXJCLEtBQ0csS0FBS0EsZUFBTCxDQUFxQixzQkFBckIsQ0FEUCxFQUNxRDtBQUNqRCxzQkFBTSwyQkFBTjtBQUNIO0FBQ0QsZ0JBQUksQ0FBQyxLQUFLQyxZQUFMLENBQWtCLHNCQUFsQixLQUNFLEtBQUtBLFlBQUwsQ0FBa0IsbUJBQWxCLENBREYsSUFFRSxLQUFLQSxZQUFMLENBQWtCLG9CQUFsQixDQUZILEtBR0csS0FBS0QsZUFBTCxDQUFxQixjQUFyQixDQUhQLEVBRzZDO0FBQ3pDLHNCQUFNLHNDQUFOO0FBQ0g7QUFDSjs7OzRDQUNtQjtBQUNoQixnQkFBSSxDQUFDLGlCQUFFRCxRQUFGLENBQVcsS0FBS1IsTUFBaEIsQ0FBTCxFQUE4QixNQUFNLHNDQUFOO0FBQzlCLGdCQUFJLEtBQUtTLGVBQUwsQ0FBcUIsT0FBckIsQ0FBSixFQUFtQyxNQUFNLHlCQUFhLE9BQWIsQ0FBTjtBQUNuQyxnQkFBSSxLQUFLQSxlQUFMLENBQXFCLEtBQXJCLENBQUosRUFBaUMsTUFBTSx5QkFBYSxLQUFiLENBQU47QUFDakMsZ0JBQUksS0FBS0EsZUFBTCxDQUFxQixRQUFyQixDQUFKLEVBQW9DLE1BQU0seUJBQWEsUUFBYixDQUFOO0FBQ3BDLGdCQUFJLENBQUMsaUJBQUVHLE9BQUYsQ0FBVSxLQUFLWixNQUFMLENBQVllLE1BQXRCLENBQUwsRUFBb0MsTUFBTSxnQ0FBb0IsT0FBcEIsRUFBNkIsUUFBN0IsQ0FBTjtBQUN2Qzs7O21DQTNEaUJDLEksRUFBTTtBQUNwQixnQkFBTUMsb0JBQW9CLHNEQUExQjtBQUNBLGdCQUFNQyxVQUFVRixLQUFLRyxLQUFMLENBQVdGLGlCQUFYLENBQWhCO0FBQ0EsbUJBQU9DLFVBQVVBLFFBQVEsQ0FBUixDQUFWLEdBQXVCLElBQTlCO0FBQ0g7Ozt1Q0FDcUJGLEksRUFBTTtBQUN4QixnQkFBTUksY0FBYywwRUFBcEI7QUFDQSxnQkFBTUMsUUFBUXRCLFdBQVd1QixVQUFYLENBQXNCTixJQUF0QixDQUFkO0FBQ0EsZ0JBQUksQ0FBQ0ssS0FBTCxFQUFZLE9BQU8sSUFBUDtBQUNaLGdCQUFNRSxTQUFTRixNQUFNRixLQUFOLENBQVlDLFdBQVosQ0FBZjtBQUNBLG1CQUFPRyxXQUFXLElBQWxCO0FBQ0g7Ozs7OztrQkFmZ0J4QixVIiwiZmlsZSI6InZhbGlkYXRvcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHtcbiAgICBOb1BhcmFtWCxcbiAgICBOb1N1YmplY3QsXG4gICAgTm9SZWNpcGllbnQsXG4gICAgSW52YWxpZEZyb20sXG4gICAgTm9SZXBseUVtYWlsLFxuICAgIFdyb25nVHlwZVBhcmFtWCxcbiAgICBJbnZhbGlkUmVjaXBpZW50TGlzdCxcbiAgICBQYXJhbXNTaG91bGRCZU9iamVjdCxcbiAgICBOb1RlbXBsYXRlTm9GZWF0dXJlcyxcbn0gZnJvbSAnLi9leGNlcHRpb25zJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmFsaWRhdG9ycyB7XG4gICAgY29uc3RydWN0b3IocGFyYW1zKSB7XG4gICAgICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xuICAgIH1cbiAgICBzdGF0aWMgdHJhY2tFbWFpbCh0ZXh0KSB7XG4gICAgICAgIGNvbnN0IFRSQUNLX0VNQUlMX1JFR0VYID0gLyhbYS16QS1aMC05Ll8tXStAW2EtekEtWjAtOS5fLV0rXFwuW2EtekEtWjAtOS5fLV0rKS9naTtcbiAgICAgICAgY29uc3QgdHJhY2tlZCA9IHRleHQubWF0Y2goVFJBQ0tfRU1BSUxfUkVHRVgpO1xuICAgICAgICByZXR1cm4gdHJhY2tlZCA/IHRyYWNrZWRbMF0gOiBudWxsO1xuICAgIH1cbiAgICBzdGF0aWMgaXNFbWFpbEludmFsaWQodGV4dCkge1xuICAgICAgICBjb25zdCBFTUFJTF9SRUdFWCA9IC8oXlthLXpBLVowLTkuISMkJSbigJkqKy89P15fYHt8fX4tXStAW2EtekEtWjAtOS1dKyg/OlxcLlthLXpBLVowLTktXSspKiQpL2dpO1xuICAgICAgICBjb25zdCBlbWFpbCA9IFZhbGlkYXRvcnMudHJhY2tFbWFpbCh0ZXh0KTtcbiAgICAgICAgaWYgKCFlbWFpbCkgcmV0dXJuIHRydWU7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGVtYWlsLm1hdGNoKEVNQUlMX1JFR0VYKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdCA9PT0gbnVsbDtcbiAgICB9XG4gICAgdmFsaWRhdGVSZWNpcGllbnRzKCkge1xuICAgICAgICBfLmZvckVhY2godGhpcy5wYXJhbXMucmVjaXBpZW50TGlzdCwgKHJlY2lwaWVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKFZhbGlkYXRvcnMuaXNFbWFpbEludmFsaWQocmVjaXBpZW50KSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkUmVjaXBpZW50TGlzdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgdmFsaWRhZGVGcm9tKCkge1xuICAgICAgICBpZiAoVmFsaWRhdG9ycy5pc0VtYWlsSW52YWxpZCh0aGlzLnBhcmFtcy5mcm9tKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRGcm9tKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXR0ck5vdEluUGFyYW1zKGF0dHIpIHtcbiAgICAgICAgcmV0dXJuICFfLmhhcyh0aGlzLnBhcmFtcywgYXR0cikgfHwgIXRoaXMucGFyYW1zW2F0dHJdO1xuICAgIH1cbiAgICBhdHRySW5QYXJhbXMoYXR0cikge1xuICAgICAgICByZXR1cm4gXy5oYXModGhpcy5wYXJhbXMsIGF0dHIpICYmIHRoaXMucGFyYW1zW2F0dHJdO1xuICAgIH1cbiAgICBjaGVja01haWxQYXJhbXMoKSB7XG4gICAgICAgIGlmICghXy5pc09iamVjdCh0aGlzLnBhcmFtcykpIHRocm93IG5ldyBQYXJhbXNTaG91bGRCZU9iamVjdCgpO1xuICAgICAgICBpZiAodGhpcy5hdHRyTm90SW5QYXJhbXMoJ2Zyb20nKVxuICAgICAgICAgICAgJiYgdGhpcy5hdHRyTm90SW5QYXJhbXMoJ3VzZVRwbERlZmF1bHRFbWFpbCcpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTm9SZXBseUVtYWlsKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYXR0ckluUGFyYW1zKCdmcm9tJykpIHRoaXMudmFsaWRhZGVGcm9tKCk7XG4gICAgICAgIGlmICh0aGlzLmF0dHJOb3RJblBhcmFtcygncmVjaXBpZW50TGlzdCcpKSB0aHJvdyBuZXcgTm9SZWNpcGllbnQoKTtcbiAgICAgICAgaWYgKCFfLmlzQXJyYXkodGhpcy5wYXJhbXMucmVjaXBpZW50TGlzdCkpIHRocm93IG5ldyBOb1JlY2lwaWVudCgpO1xuICAgICAgICBpZiAoIXRoaXMucGFyYW1zLnJlY2lwaWVudExpc3QubGVuZ3RoKSB0aHJvdyBuZXcgTm9SZWNpcGllbnQoKTtcbiAgICAgICAgdGhpcy52YWxpZGF0ZVJlY2lwaWVudHMoKTtcblxuICAgICAgICBpZiAodGhpcy5hdHRyTm90SW5QYXJhbXMoJ3N1YmplY3QnKVxuICAgICAgICAgICAgJiYgdGhpcy5hdHRyTm90SW5QYXJhbXMoJ3VzZVRwbERlZmF1bHRTdWJqZWN0JykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBOb1N1YmplY3QoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKHRoaXMuYXR0ckluUGFyYW1zKCd1c2VUcGxEZWZhdWx0U3ViamVjdCcpXG4gICAgICAgICAgICB8fCB0aGlzLmF0dHJJblBhcmFtcygndXNlVHBsRGVmYXVsdE5hbWUnKVxuICAgICAgICAgICAgfHwgdGhpcy5hdHRySW5QYXJhbXMoJ3VzZVRwbERlZmF1bHRFbWFpbCcpKVxuICAgICAgICAgICAgJiYgdGhpcy5hdHRyTm90SW5QYXJhbXMoJ3RlbXBsYXRlU2x1ZycpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTm9UZW1wbGF0ZU5vRmVhdHVyZXMoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjaGVja1NlYXJjaFBhcmFtcygpIHtcbiAgICAgICAgaWYgKCFfLmlzT2JqZWN0KHRoaXMucGFyYW1zKSkgdGhyb3cgbmV3IFBhcmFtc1Nob3VsZEJlT2JqZWN0KCk7XG4gICAgICAgIGlmICh0aGlzLmF0dHJOb3RJblBhcmFtcygnc3RhcnQnKSkgdGhyb3cgbmV3IE5vUGFyYW1YKCdzdGFydCcpO1xuICAgICAgICBpZiAodGhpcy5hdHRyTm90SW5QYXJhbXMoJ2VuZCcpKSB0aHJvdyBuZXcgTm9QYXJhbVgoJ2VuZCcpO1xuICAgICAgICBpZiAodGhpcy5hdHRyTm90SW5QYXJhbXMoJ2FwcElkcycpKSB0aHJvdyBuZXcgTm9QYXJhbVgoJ2FwcElkcycpO1xuICAgICAgICBpZiAoIV8uaXNBcnJheSh0aGlzLnBhcmFtcy5hcHBJZHMpKSB0aHJvdyBuZXcgV3JvbmdUeXBlUGFyYW1YKCdBcnJheScsICdhcHBJZHMnKTtcbiAgICB9XG59XG4iXX0=