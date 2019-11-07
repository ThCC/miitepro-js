'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SearchArgs = exports.Mail = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _validators = require('./validators');

var _validators2 = _interopRequireDefault(_validators);

var _exceptions = require('./exceptions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mail = function () {
    function Mail(params) {
        var _this = this;

        _classCallCheck(this, Mail);

        var validators = new _validators2.default(params);
        validators.checkMailParams();

        this.expectedKeys = ['tags', 'sendAt', 'subject', 'from', 'messageText', 'messageHtml', 'recipientList', 'activateTracking', 'getTextFromHtml', 'headers', 'context', 'templateSlug', 'useTplDefaultName', 'useTplDefaultEmail', 'useTplDefaultSubject', 'contextPerRecipient', 'trackOpen', 'trackHtmlLink', 'trackTextLink', 'attachments'];
        var keys = _lodash2.default.keys(params);
        _lodash2.default.forEach(keys, function (key) {
            if (_this.expectedKeys.indexOf(key) > -1) {
                _this[key] = params[key];
            }
        });
    }

    _createClass(Mail, [{
        key: 'getPayload',
        value: function getPayload(endpoint) {
            var _this2 = this;

            if (!endpoint) throw new _exceptions.NoEndpoint();
            if (endpoint === 'text') {
                if (!(_lodash2.default.has(this, 'messageText') && this.messageText) && !(_lodash2.default.has(this, 'messageHtml') && this.messageHtml) && !(_lodash2.default.has(this, 'attachments') && this.attachments)) {
                    throw new _exceptions.NoContent();
                }
            } else {
                if (!(_lodash2.default.has(this, 'templateSlug') || _lodash2.default.has(this, 'messageHtml'))) {
                    throw new _exceptions.NoTemplate();
                }
                if (!(this.templateSlug || this.messageHtml)) {
                    throw new _exceptions.NoTemplate();
                }
            }

            var payload = {};
            _lodash2.default.forEach(this.expectedKeys, function (key) {
                if (_lodash2.default.has(_this2, key) && _this2[key]) {
                    payload[_lodash2.default.snakeCase(key)] = _this2[key];
                }
            });
            payload.sended_by = 5;
            return payload;
        }
    }]);

    return Mail;
}();

var SearchArgs = function () {
    function SearchArgs(params) {
        var _this3 = this;

        _classCallCheck(this, SearchArgs);

        var validators = new _validators2.default(params);
        validators.checkSearchParams(params);

        this.expectedKeys = ['end', 'start', 'status', 'appIds', 'nameSender', 'emailSender', 'templateSlug', 'nameReceiver', 'emailReceiver'];
        var keys = _lodash2.default.keys(params);
        _lodash2.default.forEach(keys, function (key) {
            if (_this3.expectedKeys.indexOf(key) > -1) {
                _this3[key] = params[key];
            }
        });
    }

    _createClass(SearchArgs, [{
        key: 'getPayload',
        value: function getPayload() {
            var _this4 = this;

            var payload = {};
            _lodash2.default.forEach(this.expectedKeys, function (key) {
                if (_lodash2.default.has(_this4, key) && _this4[key]) {
                    payload[_lodash2.default.snakeCase(key)] = _this4[key];
                }
            });
            payload.app_ids = this.appIds.toString();
            return payload;
        }
    }]);

    return SearchArgs;
}();

exports.Mail = Mail;
exports.SearchArgs = SearchArgs;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbHMuanMiXSwibmFtZXMiOlsiTWFpbCIsInBhcmFtcyIsInZhbGlkYXRvcnMiLCJWYWxpZGF0b3JzIiwiY2hlY2tNYWlsUGFyYW1zIiwiZXhwZWN0ZWRLZXlzIiwia2V5cyIsIl8iLCJmb3JFYWNoIiwia2V5IiwiaW5kZXhPZiIsImVuZHBvaW50IiwiTm9FbmRwb2ludCIsImhhcyIsIm1lc3NhZ2VUZXh0IiwibWVzc2FnZUh0bWwiLCJhdHRhY2htZW50cyIsIk5vQ29udGVudCIsIk5vVGVtcGxhdGUiLCJ0ZW1wbGF0ZVNsdWciLCJwYXlsb2FkIiwic25ha2VDYXNlIiwic2VuZGVkX2J5IiwiU2VhcmNoQXJncyIsImNoZWNrU2VhcmNoUGFyYW1zIiwiYXBwX2lkcyIsImFwcElkcyIsInRvU3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVNQSxJO0FBQ0Ysa0JBQVlDLE1BQVosRUFBb0I7QUFBQTs7QUFBQTs7QUFDaEIsWUFBTUMsYUFBYSxJQUFJQyxvQkFBSixDQUFlRixNQUFmLENBQW5CO0FBQ0FDLG1CQUFXRSxlQUFYOztBQUVBLGFBQUtDLFlBQUwsR0FBb0IsQ0FDaEIsTUFEZ0IsRUFFaEIsUUFGZ0IsRUFHaEIsU0FIZ0IsRUFJaEIsTUFKZ0IsRUFLaEIsYUFMZ0IsRUFNaEIsYUFOZ0IsRUFPaEIsZUFQZ0IsRUFRaEIsa0JBUmdCLEVBU2hCLGlCQVRnQixFQVVoQixTQVZnQixFQVdoQixTQVhnQixFQVloQixjQVpnQixFQWFoQixtQkFiZ0IsRUFjaEIsb0JBZGdCLEVBZWhCLHNCQWZnQixFQWdCaEIscUJBaEJnQixFQWlCaEIsV0FqQmdCLEVBa0JoQixlQWxCZ0IsRUFtQmhCLGVBbkJnQixFQW9CaEIsYUFwQmdCLENBQXBCO0FBc0JBLFlBQU1DLE9BQU9DLGlCQUFFRCxJQUFGLENBQU9MLE1BQVAsQ0FBYjtBQUNBTSx5QkFBRUMsT0FBRixDQUFVRixJQUFWLEVBQWdCLFVBQUNH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QUFZQyxRQUFaLEVBQWxCO0FBQ0EsbUJBQU9QLE9BQVA7QUFDSDs7Ozs7O1FBSURwQixJLEdBQUFBLEk7UUFDQXVCLFUsR0FBQUEsVSIsImZpbGUiOiJtb2RlbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IFZhbGlkYXRvcnMgZnJvbSAnLi92YWxpZGF0b3JzJztcbmltcG9ydCB7IE5vRW5kcG9pbnQsIE5vQ29udGVudCwgTm9UZW1wbGF0ZSB9IGZyb20gJy4vZXhjZXB0aW9ucyc7XG5cbmNsYXNzIE1haWwge1xuICAgIGNvbnN0cnVjdG9yKHBhcmFtcykge1xuICAgICAgICBjb25zdCB2YWxpZGF0b3JzID0gbmV3IFZhbGlkYXRvcnMocGFyYW1zKTtcbiAgICAgICAgdmFsaWRhdG9ycy5jaGVja01haWxQYXJhbXMoKTtcblxuICAgICAgICB0aGlzLmV4cGVjdGVkS2V5cyA9IFtcbiAgICAgICAgICAgICd0YWdzJyxcbiAgICAgICAgICAgICdzZW5kQXQnLFxuICAgICAgICAgICAgJ3N1YmplY3QnLFxuICAgICAgICAgICAgJ2Zyb20nLFxuICAgICAgICAgICAgJ21lc3NhZ2VUZXh0JyxcbiAgICAgICAgICAgICdtZXNzYWdlSHRtbCcsXG4gICAgICAgICAgICAncmVjaXBpZW50TGlzdCcsXG4gICAgICAgICAgICAnYWN0aXZhdGVUcmFja2luZycsXG4gICAgICAgICAgICAnZ2V0VGV4dEZyb21IdG1sJyxcbiAgICAgICAgICAgICdoZWFkZXJzJyxcbiAgICAgICAgICAgICdjb250ZXh0JyxcbiAgICAgICAgICAgICd0ZW1wbGF0ZVNsdWcnLFxuICAgICAgICAgICAgJ3VzZVRwbERlZmF1bHROYW1lJyxcbiAgICAgICAgICAgICd1c2VUcGxEZWZhdWx0RW1haWwnLFxuICAgICAgICAgICAgJ3VzZVRwbERlZmF1bHRTdWJqZWN0JyxcbiAgICAgICAgICAgICdjb250ZXh0UGVyUmVjaXBpZW50JyxcbiAgICAgICAgICAgICd0cmFja09wZW4nLFxuICAgICAgICAgICAgJ3RyYWNrSHRtbExpbmsnLFxuICAgICAgICAgICAgJ3RyYWNrVGV4dExpbmsnLFxuICAgICAgICAgICAgJ2F0dGFjaG1lbnRzJyxcbiAgICAgICAgXTtcbiAgICAgICAgY29uc3Qga2V5cyA9IF8ua2V5cyhwYXJhbXMpO1xuICAgICAgICBfLmZvckVhY2goa2V5cywgKGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZXhwZWN0ZWRLZXlzLmluZGV4T2Yoa2V5KSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gcGFyYW1zW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXRQYXlsb2FkKGVuZHBvaW50KSB7XG4gICAgICAgIGlmICghZW5kcG9pbnQpIHRocm93IG5ldyBOb0VuZHBvaW50KCk7XG4gICAgICAgIGlmIChlbmRwb2ludCA9PT0gJ3RleHQnKSB7XG4gICAgICAgICAgICBpZiAoIShfLmhhcyh0aGlzLCAnbWVzc2FnZVRleHQnKSAmJiB0aGlzLm1lc3NhZ2VUZXh0KVxuICAgICAgICAgICAgICAgICYmICEoXy5oYXModGhpcywgJ21lc3NhZ2VIdG1sJykgJiYgdGhpcy5tZXNzYWdlSHRtbClcbiAgICAgICAgICAgICAgICAmJiAhKF8uaGFzKHRoaXMsICdhdHRhY2htZW50cycpICYmIHRoaXMuYXR0YWNobWVudHMpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE5vQ29udGVudCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCEoXy5oYXModGhpcywgJ3RlbXBsYXRlU2x1ZycpIHx8IF8uaGFzKHRoaXMsICdtZXNzYWdlSHRtbCcpKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBOb1RlbXBsYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoISh0aGlzLnRlbXBsYXRlU2x1ZyB8fCB0aGlzLm1lc3NhZ2VIdG1sKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBOb1RlbXBsYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXlsb2FkID0ge307XG4gICAgICAgIF8uZm9yRWFjaCh0aGlzLmV4cGVjdGVkS2V5cywgKGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKF8uaGFzKHRoaXMsIGtleSkgJiYgdGhpc1trZXldKSB7XG4gICAgICAgICAgICAgICAgcGF5bG9hZFtfLnNuYWtlQ2FzZShrZXkpXSA9IHRoaXNba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHBheWxvYWQuc2VuZGVkX2J5ID0gNTtcbiAgICAgICAgcmV0dXJuIHBheWxvYWQ7XG4gICAgfVxufVxuXG5jbGFzcyBTZWFyY2hBcmdzIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcbiAgICAgICAgY29uc3QgdmFsaWRhdG9ycyA9IG5ldyBWYWxpZGF0b3JzKHBhcmFtcyk7XG4gICAgICAgIHZhbGlkYXRvcnMuY2hlY2tTZWFyY2hQYXJhbXMocGFyYW1zKTtcblxuICAgICAgICB0aGlzLmV4cGVjdGVkS2V5cyA9IFtcbiAgICAgICAgICAgICdlbmQnLFxuICAgICAgICAgICAgJ3N0YXJ0JyxcbiAgICAgICAgICAgICdzdGF0dXMnLFxuICAgICAgICAgICAgJ2FwcElkcycsXG4gICAgICAgICAgICAnbmFtZVNlbmRlcicsXG4gICAgICAgICAgICAnZW1haWxTZW5kZXInLFxuICAgICAgICAgICAgJ3RlbXBsYXRlU2x1ZycsXG4gICAgICAgICAgICAnbmFtZVJlY2VpdmVyJyxcbiAgICAgICAgICAgICdlbWFpbFJlY2VpdmVyJyxcbiAgICAgICAgXTtcbiAgICAgICAgY29uc3Qga2V5cyA9IF8ua2V5cyhwYXJhbXMpO1xuICAgICAgICBfLmZvckVhY2goa2V5cywgKGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZXhwZWN0ZWRLZXlzLmluZGV4T2Yoa2V5KSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gcGFyYW1zW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXRQYXlsb2FkKCkge1xuICAgICAgICBjb25zdCBwYXlsb2FkID0ge307XG4gICAgICAgIF8uZm9yRWFjaCh0aGlzLmV4cGVjdGVkS2V5cywgKGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKF8uaGFzKHRoaXMsIGtleSkgJiYgdGhpc1trZXldKSB7XG4gICAgICAgICAgICAgICAgcGF5bG9hZFtfLnNuYWtlQ2FzZShrZXkpXSA9IHRoaXNba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHBheWxvYWQuYXBwX2lkcyA9IHRoaXMuYXBwSWRzLnRvU3RyaW5nKCk7XG4gICAgICAgIHJldHVybiBwYXlsb2FkO1xuICAgIH1cbn1cblxuZXhwb3J0IHtcbiAgICBNYWlsLFxuICAgIFNlYXJjaEFyZ3MsXG59O1xuIl19