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

        this.expectedKeys = ['tags', 'sendAt', 'subject', 'from', 'messageText', 'messageHtml', 'recipientList', 'activateTracking', 'getTextFromHtml', 'headers', 'context', 'templateSlug', 'useTplDefaultName', 'useTplDefaultEmail', 'useTplDefaultSubject', 'contextPerRecipient', 'trackOpen', 'trackHtmlLink', 'trackTextLink', 'attachments', 'batchs', 'timeBetweenBatchs', 'recipientsPerBatchs'];
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
            if (_lodash2.default.has(payload, 'headers')) {
                _lodash2.default.forEach(_lodash2.default.keys(payload.headers), function (key) {
                    payload.headers[_lodash2.default.snakeCase(key)] = payload.headers[key];
                    if (_lodash2.default.snakeCase(key) !== key) delete payload.headers[key];
                });
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbHMuanMiXSwibmFtZXMiOlsiTWFpbCIsInBhcmFtcyIsInZhbGlkYXRvcnMiLCJjaGVja01haWxQYXJhbXMiLCJleHBlY3RlZEtleXMiLCJrZXlzIiwiZm9yRWFjaCIsImtleSIsImluZGV4T2YiLCJlbmRwb2ludCIsImhhcyIsIm1lc3NhZ2VUZXh0IiwibWVzc2FnZUh0bWwiLCJhdHRhY2htZW50cyIsInRlbXBsYXRlU2x1ZyIsInBheWxvYWQiLCJzbmFrZUNhc2UiLCJoZWFkZXJzIiwic2VuZGVkX2J5IiwiU2VhcmNoQXJncyIsImNoZWNrU2VhcmNoUGFyYW1zIiwiYXBwX2lkcyIsImFwcElkcyIsInRvU3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVNQSxJO0FBQ0Ysa0JBQVlDLE1BQVosRUFBb0I7QUFBQTs7QUFBQTs7QUFDaEIsWUFBTUMsYUFBYSx5QkFBZUQsTUFBZixDQUFuQjtBQUNBQyxtQkFBV0MsZUFBWDs7QUFFQSxhQUFLQyxZQUFMLEdBQW9CLENBQ2hCLE1BRGdCLEVBRWhCLFFBRmdCLEVBR2hCLFNBSGdCLEVBSWhCLE1BSmdCLEVBS2hCLGFBTGdCLEVBTWhCLGFBTmdCLEVBT2hCLGVBUGdCLEVBUWhCLGtCQVJnQixFQVNoQixpQkFUZ0IsRUFVaEIsU0FWZ0IsRUFXaEIsU0FYZ0IsRUFZaEIsY0FaZ0IsRUFhaEIsbUJBYmdCLEVBY2hCLG9CQWRnQixFQWVoQixzQkFmZ0IsRUFnQmhCLHFCQWhCZ0IsRUFpQmhCLFdBakJnQixFQWtCaEIsZUFsQmdCLEVBbUJoQixlQW5CZ0IsRUFvQmhCLGFBcEJnQixFQXFCaEIsUUFyQmdCLEVBc0JoQixtQkF0QmdCLEVBdUJoQixxQkF2QmdCLENBQXBCO0FBeUJBLFlBQU1DLE9BQU8saUJBQUVBLElBQUYsQ0FBT0osTUFBUCxDQUFiO0FBQ0EseUJBQUVLLE9BQUYsQ0FBVUQsSUFBVixFQUFnQixVQUFDRSxHQUFELEVBQVM7QUFD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QkFBRVQsT0FBRixDQUFVLEtBQUtGLFlBQWYsRUFBNkIsVUFBQ0csR0FBRCxFQUFTO0FBQ2xDLG9CQUFJLGlCQUFFRyxHQUFGLFNBQVlILEdBQVosS0FBb0IsT0FBS0EsR0FBTCxDQUF4QixFQUFtQztBQUMvQlEsNEJBQVEsaUJBQUVDLFNBQUYsQ0FBWVQsR0FBWixDQUFSLElBQTRCLE9BQUtBLEdBQUwsQ0FBNUI7QUFDSDtBQUNKLGFBSkQ7QUFLQVEsb0JBQVFNLE9BQVIsR0FBa0IsS0FBS0MsTUFBTCxDQUFZQyxRQUFaLEVBQWxCO0FBQ0EsbUJBQU9SLE9BQVA7QUFDSDs7Ozs7O1FBSURmLEksR0FBQUEsSTtRQUNBbUIsVSxHQUFBQSxVIiwiZmlsZSI6Im1vZGVscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgVmFsaWRhdG9ycyBmcm9tICcuL3ZhbGlkYXRvcnMnO1xuaW1wb3J0IHsgTm9FbmRwb2ludCwgTm9Db250ZW50LCBOb1RlbXBsYXRlIH0gZnJvbSAnLi9leGNlcHRpb25zJztcblxuY2xhc3MgTWFpbCB7XG4gICAgY29uc3RydWN0b3IocGFyYW1zKSB7XG4gICAgICAgIGNvbnN0IHZhbGlkYXRvcnMgPSBuZXcgVmFsaWRhdG9ycyhwYXJhbXMpO1xuICAgICAgICB2YWxpZGF0b3JzLmNoZWNrTWFpbFBhcmFtcygpO1xuXG4gICAgICAgIHRoaXMuZXhwZWN0ZWRLZXlzID0gW1xuICAgICAgICAgICAgJ3RhZ3MnLFxuICAgICAgICAgICAgJ3NlbmRBdCcsXG4gICAgICAgICAgICAnc3ViamVjdCcsXG4gICAgICAgICAgICAnZnJvbScsXG4gICAgICAgICAgICAnbWVzc2FnZVRleHQnLFxuICAgICAgICAgICAgJ21lc3NhZ2VIdG1sJyxcbiAgICAgICAgICAgICdyZWNpcGllbnRMaXN0JyxcbiAgICAgICAgICAgICdhY3RpdmF0ZVRyYWNraW5nJyxcbiAgICAgICAgICAgICdnZXRUZXh0RnJvbUh0bWwnLFxuICAgICAgICAgICAgJ2hlYWRlcnMnLFxuICAgICAgICAgICAgJ2NvbnRleHQnLFxuICAgICAgICAgICAgJ3RlbXBsYXRlU2x1ZycsXG4gICAgICAgICAgICAndXNlVHBsRGVmYXVsdE5hbWUnLFxuICAgICAgICAgICAgJ3VzZVRwbERlZmF1bHRFbWFpbCcsXG4gICAgICAgICAgICAndXNlVHBsRGVmYXVsdFN1YmplY3QnLFxuICAgICAgICAgICAgJ2NvbnRleHRQZXJSZWNpcGllbnQnLFxuICAgICAgICAgICAgJ3RyYWNrT3BlbicsXG4gICAgICAgICAgICAndHJhY2tIdG1sTGluaycsXG4gICAgICAgICAgICAndHJhY2tUZXh0TGluaycsXG4gICAgICAgICAgICAnYXR0YWNobWVudHMnLFxuICAgICAgICAgICAgJ2JhdGNocycsXG4gICAgICAgICAgICAndGltZUJldHdlZW5CYXRjaHMnLFxuICAgICAgICAgICAgJ3JlY2lwaWVudHNQZXJCYXRjaHMnLFxuICAgICAgICBdO1xuICAgICAgICBjb25zdCBrZXlzID0gXy5rZXlzKHBhcmFtcyk7XG4gICAgICAgIF8uZm9yRWFjaChrZXlzLCAoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5leHBlY3RlZEtleXMuaW5kZXhPZihrZXkpID4gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBwYXJhbXNba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldFBheWxvYWQoZW5kcG9pbnQpIHtcbiAgICAgICAgaWYgKCFlbmRwb2ludCkgdGhyb3cgbmV3IE5vRW5kcG9pbnQoKTtcbiAgICAgICAgaWYgKGVuZHBvaW50ID09PSAndGV4dCcpIHtcbiAgICAgICAgICAgIGlmICghKF8uaGFzKHRoaXMsICdtZXNzYWdlVGV4dCcpICYmIHRoaXMubWVzc2FnZVRleHQpXG4gICAgICAgICAgICAgICAgJiYgIShfLmhhcyh0aGlzLCAnbWVzc2FnZUh0bWwnKSAmJiB0aGlzLm1lc3NhZ2VIdG1sKVxuICAgICAgICAgICAgICAgICYmICEoXy5oYXModGhpcywgJ2F0dGFjaG1lbnRzJykgJiYgdGhpcy5hdHRhY2htZW50cykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTm9Db250ZW50KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIShfLmhhcyh0aGlzLCAndGVtcGxhdGVTbHVnJykgfHwgXy5oYXModGhpcywgJ21lc3NhZ2VIdG1sJykpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE5vVGVtcGxhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghKHRoaXMudGVtcGxhdGVTbHVnIHx8IHRoaXMubWVzc2FnZUh0bWwpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE5vVGVtcGxhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSB7fTtcbiAgICAgICAgXy5mb3JFYWNoKHRoaXMuZXhwZWN0ZWRLZXlzLCAoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoXy5oYXModGhpcywga2V5KSAmJiB0aGlzW2tleV0pIHtcbiAgICAgICAgICAgICAgICBwYXlsb2FkW18uc25ha2VDYXNlKGtleSldID0gdGhpc1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKF8uaGFzKHBheWxvYWQsICdoZWFkZXJzJykpIHtcbiAgICAgICAgICAgIF8uZm9yRWFjaChfLmtleXMocGF5bG9hZC5oZWFkZXJzKSwgKGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIHBheWxvYWQuaGVhZGVyc1tfLnNuYWtlQ2FzZShrZXkpXSA9IHBheWxvYWQuaGVhZGVyc1trZXldO1xuICAgICAgICAgICAgICAgIGlmIChfLnNuYWtlQ2FzZShrZXkpICE9PSBrZXkpIGRlbGV0ZSBwYXlsb2FkLmhlYWRlcnNba2V5XTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHBheWxvYWQuc2VuZGVkX2J5ID0gNTtcbiAgICAgICAgcmV0dXJuIHBheWxvYWQ7XG4gICAgfVxufVxuXG5jbGFzcyBTZWFyY2hBcmdzIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcbiAgICAgICAgY29uc3QgdmFsaWRhdG9ycyA9IG5ldyBWYWxpZGF0b3JzKHBhcmFtcyk7XG4gICAgICAgIHZhbGlkYXRvcnMuY2hlY2tTZWFyY2hQYXJhbXMocGFyYW1zKTtcblxuICAgICAgICB0aGlzLmV4cGVjdGVkS2V5cyA9IFtcbiAgICAgICAgICAgICdlbmQnLFxuICAgICAgICAgICAgJ3N0YXJ0JyxcbiAgICAgICAgICAgICdzdGF0dXMnLFxuICAgICAgICAgICAgJ2FwcElkcycsXG4gICAgICAgICAgICAnbmFtZVNlbmRlcicsXG4gICAgICAgICAgICAnZW1haWxTZW5kZXInLFxuICAgICAgICAgICAgJ3RlbXBsYXRlU2x1ZycsXG4gICAgICAgICAgICAnbmFtZVJlY2VpdmVyJyxcbiAgICAgICAgICAgICdlbWFpbFJlY2VpdmVyJyxcbiAgICAgICAgXTtcbiAgICAgICAgY29uc3Qga2V5cyA9IF8ua2V5cyhwYXJhbXMpO1xuICAgICAgICBfLmZvckVhY2goa2V5cywgKGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZXhwZWN0ZWRLZXlzLmluZGV4T2Yoa2V5KSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gcGFyYW1zW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXRQYXlsb2FkKCkge1xuICAgICAgICBjb25zdCBwYXlsb2FkID0ge307XG4gICAgICAgIF8uZm9yRWFjaCh0aGlzLmV4cGVjdGVkS2V5cywgKGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKF8uaGFzKHRoaXMsIGtleSkgJiYgdGhpc1trZXldKSB7XG4gICAgICAgICAgICAgICAgcGF5bG9hZFtfLnNuYWtlQ2FzZShrZXkpXSA9IHRoaXNba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHBheWxvYWQuYXBwX2lkcyA9IHRoaXMuYXBwSWRzLnRvU3RyaW5nKCk7XG4gICAgICAgIHJldHVybiBwYXlsb2FkO1xuICAgIH1cbn1cblxuZXhwb3J0IHtcbiAgICBNYWlsLFxuICAgIFNlYXJjaEFyZ3MsXG59O1xuIl19