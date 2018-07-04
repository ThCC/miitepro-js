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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbHMuanMiXSwibmFtZXMiOlsiTWFpbCIsInBhcmFtcyIsInZhbGlkYXRvcnMiLCJjaGVja01haWxQYXJhbXMiLCJleHBlY3RlZEtleXMiLCJrZXlzIiwiZm9yRWFjaCIsImtleSIsImluZGV4T2YiLCJlbmRwb2ludCIsImhhcyIsIm1lc3NhZ2VUZXh0IiwibWVzc2FnZUh0bWwiLCJhdHRhY2htZW50cyIsInRlbXBsYXRlU2x1ZyIsInBheWxvYWQiLCJzbmFrZUNhc2UiLCJzZW5kZWRfYnkiLCJTZWFyY2hBcmdzIiwiY2hlY2tTZWFyY2hQYXJhbXMiLCJhcHBfaWRzIiwiYXBwSWRzIiwidG9TdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRU1BLEk7QUFDRixrQkFBWUMsTUFBWixFQUFvQjtBQUFBOztBQUFBOztBQUNoQixZQUFNQyxhQUFhLHlCQUFlRCxNQUFmLENBQW5CO0FBQ0FDLG1CQUFXQyxlQUFYOztBQUVBLGFBQUtDLFlBQUwsR0FBb0IsQ0FDaEIsTUFEZ0IsRUFFaEIsUUFGZ0IsRUFHaEIsU0FIZ0IsRUFJaEIsTUFKZ0IsRUFLaEIsYUFMZ0IsRUFNaEIsYUFOZ0IsRUFPaEIsZUFQZ0IsRUFRaEIsa0JBUmdCLEVBU2hCLGlCQVRnQixFQVVoQixTQVZnQixFQVdoQixTQVhnQixFQVloQixjQVpnQixFQWFoQixtQkFiZ0IsRUFjaEIsb0JBZGdCLEVBZWhCLHNCQWZnQixFQWdCaEIscUJBaEJnQixFQWlCaEIsV0FqQmdCLEVBa0JoQixlQWxCZ0IsRUFtQmhCLGVBbkJnQixFQW9CaEIsYUFwQmdCLENBQXBCO0FBc0JBLFlBQU1DLE9BQU8saUJBQUVBLElBQUYsQ0FBT0osTUFBUCxDQUFiO0FBQ0EseUJBQUVLLE9BQUYsQ0FBVUQsSUFBVixFQUFnQixVQUFDRSxHQUFELEVBQVM7QUFDckIsZ0JBQUksTUFBS0gsWUFBTCxDQUFrQkksT0FBbEIsQ0FBMEJELEdBQTFCLElBQWlDLENBQUMsQ0FBdEMsRUFBeUM7QUFDckMsc0JBQUtBLEdBQUwsSUFBWU4sT0FBT00sR0FBUCxDQUFaO0FBQ0g7QUFDSixTQUpEO0FBS0g7Ozs7bUNBQ1VFLFEsRUFBVTtBQUFBOztBQUNqQixnQkFBSSxDQUFDQSxRQUFMLEVBQWUsTUFBTSw0QkFBTjtBQUNmLGdCQUFJQSxhQUFhLE1BQWpCLEVBQXlCO0FBQ3JCLG9CQUFJLEVBQUUsaUJBQUVDLEdBQUYsQ0FBTSxJQUFOLEVBQVksYUFBWixLQUE4QixLQUFLQyxXQUFyQyxLQUNHLEVBQUUsaUJBQUVELEdBQUYsQ0FBTSxJQUFOLEVBQVksYUFBWixLQUE4QixLQUFLRSxXQUFyQyxDQURILElBRUcsRUFBRSxpQkFBRUYsR0FBRixDQUFNLElBQU4sRUFBWSxhQUFaLEtBQThCLEtBQUtHLFdBQXJDLENBRlAsRUFFMEQ7QUFDdEQsMEJBQU0sMkJBQU47QUFDSDtBQUNKLGFBTkQsTUFNTztBQUNILG9CQUFJLEVBQUUsaUJBQUVILEdBQUYsQ0FBTSxJQUFOLEVBQVksY0FBWixLQUErQixpQkFBRUEsR0FBRixDQUFNLElBQU4sRUFBWSxhQUFaLENBQWpDLENBQUosRUFBa0U7QUFDOUQsMEJBQU0sNEJBQU47QUFDSDtBQUNELG9CQUFJLEVBQUUsS0FBS0ksWUFBTCxJQUFxQixLQUFLRixXQUE1QixDQUFKLEVBQThDO0FBQzFDLDBCQUFNLDRCQUFOO0FBQ0g7QUFDSjs7QUFFRCxnQkFBTUcsVUFBVSxFQUFoQjtBQUNBLDZCQUFFVCxPQUFGLENBQVUsS0FBS0YsWUFBZixFQUE2QixVQUFDRyxHQUFELEVBQVM7QUFDbEMsb0JBQUksaUJBQUVHLEdBQUYsU0FBWUgsR0FBWixLQUFvQixPQUFLQSxHQUFMLENBQXhCLEVBQW1DO0FBQy9CUSw0QkFBUSxpQkFBRUMsU0FBRixDQUFZVCxHQUFaLENBQVIsSUFBNEIsT0FBS0EsR0FBTCxDQUE1QjtBQUNIO0FBQ0osYUFKRDtBQUtBUSxvQkFBUUUsU0FBUixHQUFvQixDQUFwQjtBQUNBLG1CQUFPRixPQUFQO0FBQ0g7Ozs7OztJQUdDRyxVO0FBQ0Ysd0JBQVlqQixNQUFaLEVBQW9CO0FBQUE7O0FBQUE7O0FBQ2hCLFlBQU1DLGFBQWEseUJBQWVELE1BQWYsQ0FBbkI7QUFDQUMsbUJBQVdpQixpQkFBWCxDQUE2QmxCLE1BQTdCOztBQUVBLGFBQUtHLFlBQUwsR0FBb0IsQ0FDaEIsS0FEZ0IsRUFFaEIsT0FGZ0IsRUFHaEIsUUFIZ0IsRUFJaEIsUUFKZ0IsRUFLaEIsWUFMZ0IsRUFNaEIsYUFOZ0IsRUFPaEIsY0FQZ0IsRUFRaEIsY0FSZ0IsRUFTaEIsZUFUZ0IsQ0FBcEI7QUFXQSxZQUFNQyxPQUFPLGlCQUFFQSxJQUFGLENBQU9KLE1BQVAsQ0FBYjtBQUNBLHlCQUFFSyxPQUFGLENBQVVELElBQVYsRUFBZ0IsVUFBQ0UsR0FBRCxFQUFTO0FBQ3JCLGdCQUFJLE9BQUtILFlBQUwsQ0FBa0JJLE9BQWxCLENBQTBCRCxHQUExQixJQUFpQyxDQUFDLENBQXRDLEVBQXlDO0FBQ3JDLHVCQUFLQSxHQUFMLElBQVlOLE9BQU9NLEdBQVAsQ0FBWjtBQUNIO0FBQ0osU0FKRDtBQUtIOzs7O3FDQUNZO0FBQUE7O0FBQ1QsZ0JBQU1RLFVBQVUsRUFBaEI7QUFDQSw2QkFBRVQsT0FBRixDQUFVLEtBQUtGLFlBQWYsRUFBNkIsVUFBQ0csR0FBRCxFQUFTO0FBQ2xDLG9CQUFJLGlCQUFFRyxHQUFGLFNBQVlILEdBQVosS0FBb0IsT0FBS0EsR0FBTCxDQUF4QixFQUFtQztBQUMvQlEsNEJBQVEsaUJBQUVDLFNBQUYsQ0FBWVQsR0FBWixDQUFSLElBQTRCLE9BQUtBLEdBQUwsQ0FBNUI7QUFDSDtBQUNKLGFBSkQ7QUFLQVEsb0JBQVFLLE9BQVIsR0FBa0IsS0FBS0MsTUFBTCxDQUFZQyxRQUFaLEVBQWxCO0FBQ0EsbUJBQU9QLE9BQVA7QUFDSDs7Ozs7O1FBSURmLEksR0FBQUEsSTtRQUNBa0IsVSxHQUFBQSxVIiwiZmlsZSI6Im1vZGVscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgVmFsaWRhdG9ycyBmcm9tICcuL3ZhbGlkYXRvcnMnO1xuaW1wb3J0IHsgTm9FbmRwb2ludCwgTm9Db250ZW50LCBOb1RlbXBsYXRlIH0gZnJvbSAnLi9leGNlcHRpb25zJztcblxuY2xhc3MgTWFpbCB7XG4gICAgY29uc3RydWN0b3IocGFyYW1zKSB7XG4gICAgICAgIGNvbnN0IHZhbGlkYXRvcnMgPSBuZXcgVmFsaWRhdG9ycyhwYXJhbXMpO1xuICAgICAgICB2YWxpZGF0b3JzLmNoZWNrTWFpbFBhcmFtcygpO1xuXG4gICAgICAgIHRoaXMuZXhwZWN0ZWRLZXlzID0gW1xuICAgICAgICAgICAgJ3RhZ3MnLFxuICAgICAgICAgICAgJ3NlbmRBdCcsXG4gICAgICAgICAgICAnc3ViamVjdCcsXG4gICAgICAgICAgICAnZnJvbScsXG4gICAgICAgICAgICAnbWVzc2FnZVRleHQnLFxuICAgICAgICAgICAgJ21lc3NhZ2VIdG1sJyxcbiAgICAgICAgICAgICdyZWNpcGllbnRMaXN0JyxcbiAgICAgICAgICAgICdhY3RpdmF0ZVRyYWNraW5nJyxcbiAgICAgICAgICAgICdnZXRUZXh0RnJvbUh0bWwnLFxuICAgICAgICAgICAgJ2hlYWRlcnMnLFxuICAgICAgICAgICAgJ2NvbnRleHQnLFxuICAgICAgICAgICAgJ3RlbXBsYXRlU2x1ZycsXG4gICAgICAgICAgICAndXNlVHBsRGVmYXVsdE5hbWUnLFxuICAgICAgICAgICAgJ3VzZVRwbERlZmF1bHRFbWFpbCcsXG4gICAgICAgICAgICAndXNlVHBsRGVmYXVsdFN1YmplY3QnLFxuICAgICAgICAgICAgJ2NvbnRleHRQZXJSZWNpcGllbnQnLFxuICAgICAgICAgICAgJ3RyYWNrT3BlbicsXG4gICAgICAgICAgICAndHJhY2tIdG1sTGluaycsXG4gICAgICAgICAgICAndHJhY2tUZXh0TGluaycsXG4gICAgICAgICAgICAnYXR0YWNobWVudHMnLFxuICAgICAgICBdO1xuICAgICAgICBjb25zdCBrZXlzID0gXy5rZXlzKHBhcmFtcyk7XG4gICAgICAgIF8uZm9yRWFjaChrZXlzLCAoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5leHBlY3RlZEtleXMuaW5kZXhPZihrZXkpID4gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBwYXJhbXNba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldFBheWxvYWQoZW5kcG9pbnQpIHtcbiAgICAgICAgaWYgKCFlbmRwb2ludCkgdGhyb3cgbmV3IE5vRW5kcG9pbnQoKTtcbiAgICAgICAgaWYgKGVuZHBvaW50ID09PSAndGV4dCcpIHtcbiAgICAgICAgICAgIGlmICghKF8uaGFzKHRoaXMsICdtZXNzYWdlVGV4dCcpICYmIHRoaXMubWVzc2FnZVRleHQpXG4gICAgICAgICAgICAgICAgJiYgIShfLmhhcyh0aGlzLCAnbWVzc2FnZUh0bWwnKSAmJiB0aGlzLm1lc3NhZ2VIdG1sKVxuICAgICAgICAgICAgICAgICYmICEoXy5oYXModGhpcywgJ2F0dGFjaG1lbnRzJykgJiYgdGhpcy5hdHRhY2htZW50cykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTm9Db250ZW50KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIShfLmhhcyh0aGlzLCAndGVtcGxhdGVTbHVnJykgfHwgXy5oYXModGhpcywgJ21lc3NhZ2VIdG1sJykpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE5vVGVtcGxhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghKHRoaXMudGVtcGxhdGVTbHVnIHx8IHRoaXMubWVzc2FnZUh0bWwpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE5vVGVtcGxhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSB7fTtcbiAgICAgICAgXy5mb3JFYWNoKHRoaXMuZXhwZWN0ZWRLZXlzLCAoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoXy5oYXModGhpcywga2V5KSAmJiB0aGlzW2tleV0pIHtcbiAgICAgICAgICAgICAgICBwYXlsb2FkW18uc25ha2VDYXNlKGtleSldID0gdGhpc1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcGF5bG9hZC5zZW5kZWRfYnkgPSA1O1xuICAgICAgICByZXR1cm4gcGF5bG9hZDtcbiAgICB9XG59XG5cbmNsYXNzIFNlYXJjaEFyZ3Mge1xuICAgIGNvbnN0cnVjdG9yKHBhcmFtcykge1xuICAgICAgICBjb25zdCB2YWxpZGF0b3JzID0gbmV3IFZhbGlkYXRvcnMocGFyYW1zKTtcbiAgICAgICAgdmFsaWRhdG9ycy5jaGVja1NlYXJjaFBhcmFtcyhwYXJhbXMpO1xuXG4gICAgICAgIHRoaXMuZXhwZWN0ZWRLZXlzID0gW1xuICAgICAgICAgICAgJ2VuZCcsXG4gICAgICAgICAgICAnc3RhcnQnLFxuICAgICAgICAgICAgJ3N0YXR1cycsXG4gICAgICAgICAgICAnYXBwSWRzJyxcbiAgICAgICAgICAgICduYW1lU2VuZGVyJyxcbiAgICAgICAgICAgICdlbWFpbFNlbmRlcicsXG4gICAgICAgICAgICAndGVtcGxhdGVTbHVnJyxcbiAgICAgICAgICAgICduYW1lUmVjZWl2ZXInLFxuICAgICAgICAgICAgJ2VtYWlsUmVjZWl2ZXInLFxuICAgICAgICBdO1xuICAgICAgICBjb25zdCBrZXlzID0gXy5rZXlzKHBhcmFtcyk7XG4gICAgICAgIF8uZm9yRWFjaChrZXlzLCAoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5leHBlY3RlZEtleXMuaW5kZXhPZihrZXkpID4gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBwYXJhbXNba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldFBheWxvYWQoKSB7XG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSB7fTtcbiAgICAgICAgXy5mb3JFYWNoKHRoaXMuZXhwZWN0ZWRLZXlzLCAoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoXy5oYXModGhpcywga2V5KSAmJiB0aGlzW2tleV0pIHtcbiAgICAgICAgICAgICAgICBwYXlsb2FkW18uc25ha2VDYXNlKGtleSldID0gdGhpc1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcGF5bG9hZC5hcHBfaWRzID0gdGhpcy5hcHBJZHMudG9TdHJpbmcoKTtcbiAgICAgICAgcmV0dXJuIHBheWxvYWQ7XG4gICAgfVxufVxuXG5leHBvcnQge1xuICAgIE1haWwsXG4gICAgU2VhcmNoQXJncyxcbn07XG4iXX0=