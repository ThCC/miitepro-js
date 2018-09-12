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

        this.expectedKeys = ['tags', 'sendAt', 'subject', 'from', 'messageText', 'messageHtml', 'recipientList', 'activateTracking', 'getTextFromHtml', 'headers', 'context', 'templateSlug', 'useTplDefaultName', 'useTplDefaultEmail', 'useTplDefaultSubject', 'contextPerRecipient', 'trackOpen', 'trackHtmlLink', 'trackTextLink', 'attachments', 'batchs', 'timeBetweenBatchs'];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbHMuanMiXSwibmFtZXMiOlsiTWFpbCIsInBhcmFtcyIsInZhbGlkYXRvcnMiLCJjaGVja01haWxQYXJhbXMiLCJleHBlY3RlZEtleXMiLCJrZXlzIiwiZm9yRWFjaCIsImtleSIsImluZGV4T2YiLCJlbmRwb2ludCIsImhhcyIsIm1lc3NhZ2VUZXh0IiwibWVzc2FnZUh0bWwiLCJhdHRhY2htZW50cyIsInRlbXBsYXRlU2x1ZyIsInBheWxvYWQiLCJzbmFrZUNhc2UiLCJzZW5kZWRfYnkiLCJTZWFyY2hBcmdzIiwiY2hlY2tTZWFyY2hQYXJhbXMiLCJhcHBfaWRzIiwiYXBwSWRzIiwidG9TdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRU1BLEk7QUFDRixrQkFBWUMsTUFBWixFQUFvQjtBQUFBOztBQUFBOztBQUNoQixZQUFNQyxhQUFhLHlCQUFlRCxNQUFmLENBQW5CO0FBQ0FDLG1CQUFXQyxlQUFYOztBQUVBLGFBQUtDLFlBQUwsR0FBb0IsQ0FDaEIsTUFEZ0IsRUFFaEIsUUFGZ0IsRUFHaEIsU0FIZ0IsRUFJaEIsTUFKZ0IsRUFLaEIsYUFMZ0IsRUFNaEIsYUFOZ0IsRUFPaEIsZUFQZ0IsRUFRaEIsa0JBUmdCLEVBU2hCLGlCQVRnQixFQVVoQixTQVZnQixFQVdoQixTQVhnQixFQVloQixjQVpnQixFQWFoQixtQkFiZ0IsRUFjaEIsb0JBZGdCLEVBZWhCLHNCQWZnQixFQWdCaEIscUJBaEJnQixFQWlCaEIsV0FqQmdCLEVBa0JoQixlQWxCZ0IsRUFtQmhCLGVBbkJnQixFQW9CaEIsYUFwQmdCLEVBcUJoQixRQXJCZ0IsRUFzQmhCLG1CQXRCZ0IsQ0FBcEI7QUF3QkEsWUFBTUMsT0FBTyxpQkFBRUEsSUFBRixDQUFPSixNQUFQLENBQWI7QUFDQSx5QkFBRUssT0FBRixDQUFVRCxJQUFWLEVBQWdCLFVBQUNFLEdBQUQsRUFBUztBQUNyQixnQkFBSSxNQUFLSCxZQUFMLENBQWtCSSxPQUFsQixDQUEwQkQsR0FBMUIsSUFBaUMsQ0FBQyxDQUF0QyxFQUF5QztBQUNyQyxzQkFBS0EsR0FBTCxJQUFZTixPQUFPTSxHQUFQLENBQVo7QUFDSDtBQUNKLFNBSkQ7QUFLSDs7OzttQ0FDVUUsUSxFQUFVO0FBQUE7O0FBQ2pCLGdCQUFJLENBQUNBLFFBQUwsRUFBZSxNQUFNLDRCQUFOO0FBQ2YsZ0JBQUlBLGFBQWEsTUFBakIsRUFBeUI7QUFDckIsb0JBQUksRUFBRSxpQkFBRUMsR0FBRixDQUFNLElBQU4sRUFBWSxhQUFaLEtBQThCLEtBQUtDLFdBQXJDLEtBQ0csRUFBRSxpQkFBRUQsR0FBRixDQUFNLElBQU4sRUFBWSxhQUFaLEtBQThCLEtBQUtFLFdBQXJDLENBREgsSUFFRyxFQUFFLGlCQUFFRixHQUFGLENBQU0sSUFBTixFQUFZLGFBQVosS0FBOEIsS0FBS0csV0FBckMsQ0FGUCxFQUUwRDtBQUN0RCwwQkFBTSwyQkFBTjtBQUNIO0FBQ0osYUFORCxNQU1PO0FBQ0gsb0JBQUksRUFBRSxpQkFBRUgsR0FBRixDQUFNLElBQU4sRUFBWSxjQUFaLEtBQStCLGlCQUFFQSxHQUFGLENBQU0sSUFBTixFQUFZLGFBQVosQ0FBakMsQ0FBSixFQUFrRTtBQUM5RCwwQkFBTSw0QkFBTjtBQUNIO0FBQ0Qsb0JBQUksRUFBRSxLQUFLSSxZQUFMLElBQXFCLEtBQUtGLFdBQTVCLENBQUosRUFBOEM7QUFDMUMsMEJBQU0sNEJBQU47QUFDSDtBQUNKOztBQUVELGdCQUFNRyxVQUFVLEVBQWhCO0FBQ0EsNkJBQUVULE9BQUYsQ0FBVSxLQUFLRixZQUFmLEVBQTZCLFVBQUNHLEdBQUQsRUFBUztBQUNsQyxvQkFBSSxpQkFBRUcsR0FBRixTQUFZSCxHQUFaLEtBQW9CLE9BQUtBLEdBQUwsQ0FBeEIsRUFBbUM7QUFDL0JRLDRCQUFRLGlCQUFFQyxTQUFGLENBQVlULEdBQVosQ0FBUixJQUE0QixPQUFLQSxHQUFMLENBQTVCO0FBQ0g7QUFDSixhQUpEO0FBS0FRLG9CQUFRRSxTQUFSLEdBQW9CLENBQXBCO0FBQ0EsbUJBQU9GLE9BQVA7QUFDSDs7Ozs7O0lBR0NHLFU7QUFDRix3QkFBWWpCLE1BQVosRUFBb0I7QUFBQTs7QUFBQTs7QUFDaEIsWUFBTUMsYUFBYSx5QkFBZUQsTUFBZixDQUFuQjtBQUNBQyxtQkFBV2lCLGlCQUFYLENBQTZCbEIsTUFBN0I7O0FBRUEsYUFBS0csWUFBTCxHQUFvQixDQUNoQixLQURnQixFQUVoQixPQUZnQixFQUdoQixRQUhnQixFQUloQixRQUpnQixFQUtoQixZQUxnQixFQU1oQixhQU5nQixFQU9oQixjQVBnQixFQVFoQixjQVJnQixFQVNoQixlQVRnQixDQUFwQjtBQVdBLFlBQU1DLE9BQU8saUJBQUVBLElBQUYsQ0FBT0osTUFBUCxDQUFiO0FBQ0EseUJBQUVLLE9BQUYsQ0FBVUQsSUFBVixFQUFnQixVQUFDRSxHQUFELEVBQVM7QUFDckIsZ0JBQUksT0FBS0gsWUFBTCxDQUFrQkksT0FBbEIsQ0FBMEJELEdBQTFCLElBQWlDLENBQUMsQ0FBdEMsRUFBeUM7QUFDckMsdUJBQUtBLEdBQUwsSUFBWU4sT0FBT00sR0FBUCxDQUFaO0FBQ0g7QUFDSixTQUpEO0FBS0g7Ozs7cUNBQ1k7QUFBQTs7QUFDVCxnQkFBTVEsVUFBVSxFQUFoQjtBQUNBLDZCQUFFVCxPQUFGLENBQVUsS0FBS0YsWUFBZixFQUE2QixVQUFDRyxHQUFELEVBQVM7QUFDbEMsb0JBQUksaUJBQUVHLEdBQUYsU0FBWUgsR0FBWixLQUFvQixPQUFLQSxHQUFMLENBQXhCLEVBQW1DO0FBQy9CUSw0QkFBUSxpQkFBRUMsU0FBRixDQUFZVCxHQUFaLENBQVIsSUFBNEIsT0FBS0EsR0FBTCxDQUE1QjtBQUNIO0FBQ0osYUFKRDtBQUtBUSxvQkFBUUssT0FBUixHQUFrQixLQUFLQyxNQUFMLENBQVlDLFFBQVosRUFBbEI7QUFDQSxtQkFBT1AsT0FBUDtBQUNIOzs7Ozs7UUFJRGYsSSxHQUFBQSxJO1FBQ0FrQixVLEdBQUFBLFUiLCJmaWxlIjoibW9kZWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBWYWxpZGF0b3JzIGZyb20gJy4vdmFsaWRhdG9ycyc7XG5pbXBvcnQgeyBOb0VuZHBvaW50LCBOb0NvbnRlbnQsIE5vVGVtcGxhdGUgfSBmcm9tICcuL2V4Y2VwdGlvbnMnO1xuXG5jbGFzcyBNYWlsIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcbiAgICAgICAgY29uc3QgdmFsaWRhdG9ycyA9IG5ldyBWYWxpZGF0b3JzKHBhcmFtcyk7XG4gICAgICAgIHZhbGlkYXRvcnMuY2hlY2tNYWlsUGFyYW1zKCk7XG5cbiAgICAgICAgdGhpcy5leHBlY3RlZEtleXMgPSBbXG4gICAgICAgICAgICAndGFncycsXG4gICAgICAgICAgICAnc2VuZEF0JyxcbiAgICAgICAgICAgICdzdWJqZWN0JyxcbiAgICAgICAgICAgICdmcm9tJyxcbiAgICAgICAgICAgICdtZXNzYWdlVGV4dCcsXG4gICAgICAgICAgICAnbWVzc2FnZUh0bWwnLFxuICAgICAgICAgICAgJ3JlY2lwaWVudExpc3QnLFxuICAgICAgICAgICAgJ2FjdGl2YXRlVHJhY2tpbmcnLFxuICAgICAgICAgICAgJ2dldFRleHRGcm9tSHRtbCcsXG4gICAgICAgICAgICAnaGVhZGVycycsXG4gICAgICAgICAgICAnY29udGV4dCcsXG4gICAgICAgICAgICAndGVtcGxhdGVTbHVnJyxcbiAgICAgICAgICAgICd1c2VUcGxEZWZhdWx0TmFtZScsXG4gICAgICAgICAgICAndXNlVHBsRGVmYXVsdEVtYWlsJyxcbiAgICAgICAgICAgICd1c2VUcGxEZWZhdWx0U3ViamVjdCcsXG4gICAgICAgICAgICAnY29udGV4dFBlclJlY2lwaWVudCcsXG4gICAgICAgICAgICAndHJhY2tPcGVuJyxcbiAgICAgICAgICAgICd0cmFja0h0bWxMaW5rJyxcbiAgICAgICAgICAgICd0cmFja1RleHRMaW5rJyxcbiAgICAgICAgICAgICdhdHRhY2htZW50cycsXG4gICAgICAgICAgICAnYmF0Y2hzJyxcbiAgICAgICAgICAgICd0aW1lQmV0d2VlbkJhdGNocycsXG4gICAgICAgIF07XG4gICAgICAgIGNvbnN0IGtleXMgPSBfLmtleXMocGFyYW1zKTtcbiAgICAgICAgXy5mb3JFYWNoKGtleXMsIChrZXkpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmV4cGVjdGVkS2V5cy5pbmRleE9mKGtleSkgPiAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IHBhcmFtc1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0UGF5bG9hZChlbmRwb2ludCkge1xuICAgICAgICBpZiAoIWVuZHBvaW50KSB0aHJvdyBuZXcgTm9FbmRwb2ludCgpO1xuICAgICAgICBpZiAoZW5kcG9pbnQgPT09ICd0ZXh0Jykge1xuICAgICAgICAgICAgaWYgKCEoXy5oYXModGhpcywgJ21lc3NhZ2VUZXh0JykgJiYgdGhpcy5tZXNzYWdlVGV4dClcbiAgICAgICAgICAgICAgICAmJiAhKF8uaGFzKHRoaXMsICdtZXNzYWdlSHRtbCcpICYmIHRoaXMubWVzc2FnZUh0bWwpXG4gICAgICAgICAgICAgICAgJiYgIShfLmhhcyh0aGlzLCAnYXR0YWNobWVudHMnKSAmJiB0aGlzLmF0dGFjaG1lbnRzKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBOb0NvbnRlbnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghKF8uaGFzKHRoaXMsICd0ZW1wbGF0ZVNsdWcnKSB8fCBfLmhhcyh0aGlzLCAnbWVzc2FnZUh0bWwnKSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTm9UZW1wbGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCEodGhpcy50ZW1wbGF0ZVNsdWcgfHwgdGhpcy5tZXNzYWdlSHRtbCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTm9UZW1wbGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IHt9O1xuICAgICAgICBfLmZvckVhY2godGhpcy5leHBlY3RlZEtleXMsIChrZXkpID0+IHtcbiAgICAgICAgICAgIGlmIChfLmhhcyh0aGlzLCBrZXkpICYmIHRoaXNba2V5XSkge1xuICAgICAgICAgICAgICAgIHBheWxvYWRbXy5zbmFrZUNhc2Uoa2V5KV0gPSB0aGlzW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBwYXlsb2FkLnNlbmRlZF9ieSA9IDU7XG4gICAgICAgIHJldHVybiBwYXlsb2FkO1xuICAgIH1cbn1cblxuY2xhc3MgU2VhcmNoQXJncyB7XG4gICAgY29uc3RydWN0b3IocGFyYW1zKSB7XG4gICAgICAgIGNvbnN0IHZhbGlkYXRvcnMgPSBuZXcgVmFsaWRhdG9ycyhwYXJhbXMpO1xuICAgICAgICB2YWxpZGF0b3JzLmNoZWNrU2VhcmNoUGFyYW1zKHBhcmFtcyk7XG5cbiAgICAgICAgdGhpcy5leHBlY3RlZEtleXMgPSBbXG4gICAgICAgICAgICAnZW5kJyxcbiAgICAgICAgICAgICdzdGFydCcsXG4gICAgICAgICAgICAnc3RhdHVzJyxcbiAgICAgICAgICAgICdhcHBJZHMnLFxuICAgICAgICAgICAgJ25hbWVTZW5kZXInLFxuICAgICAgICAgICAgJ2VtYWlsU2VuZGVyJyxcbiAgICAgICAgICAgICd0ZW1wbGF0ZVNsdWcnLFxuICAgICAgICAgICAgJ25hbWVSZWNlaXZlcicsXG4gICAgICAgICAgICAnZW1haWxSZWNlaXZlcicsXG4gICAgICAgIF07XG4gICAgICAgIGNvbnN0IGtleXMgPSBfLmtleXMocGFyYW1zKTtcbiAgICAgICAgXy5mb3JFYWNoKGtleXMsIChrZXkpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmV4cGVjdGVkS2V5cy5pbmRleE9mKGtleSkgPiAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IHBhcmFtc1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0UGF5bG9hZCgpIHtcbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IHt9O1xuICAgICAgICBfLmZvckVhY2godGhpcy5leHBlY3RlZEtleXMsIChrZXkpID0+IHtcbiAgICAgICAgICAgIGlmIChfLmhhcyh0aGlzLCBrZXkpICYmIHRoaXNba2V5XSkge1xuICAgICAgICAgICAgICAgIHBheWxvYWRbXy5zbmFrZUNhc2Uoa2V5KV0gPSB0aGlzW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBwYXlsb2FkLmFwcF9pZHMgPSB0aGlzLmFwcElkcy50b1N0cmluZygpO1xuICAgICAgICByZXR1cm4gcGF5bG9hZDtcbiAgICB9XG59XG5cbmV4cG9ydCB7XG4gICAgTWFpbCxcbiAgICBTZWFyY2hBcmdzLFxufTtcbiJdfQ==