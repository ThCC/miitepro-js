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
                if (!(_lodash2.default.has(this, 'messageText') && this.messageText)) {
                    throw new _exceptions.NoText();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbHMuanMiXSwibmFtZXMiOlsiTWFpbCIsInBhcmFtcyIsInZhbGlkYXRvcnMiLCJjaGVja01haWxQYXJhbXMiLCJleHBlY3RlZEtleXMiLCJrZXlzIiwiZm9yRWFjaCIsImtleSIsImluZGV4T2YiLCJlbmRwb2ludCIsImhhcyIsIm1lc3NhZ2VUZXh0IiwidGVtcGxhdGVTbHVnIiwibWVzc2FnZUh0bWwiLCJwYXlsb2FkIiwic25ha2VDYXNlIiwic2VuZGVkX2J5IiwiU2VhcmNoQXJncyIsImNoZWNrU2VhcmNoUGFyYW1zIiwiYXBwX2lkcyIsImFwcElkcyIsInRvU3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVNQSxJO0FBQ0Ysa0JBQVlDLE1BQVosRUFBb0I7QUFBQTs7QUFBQTs7QUFDaEIsWUFBTUMsYUFBYSx5QkFBZUQsTUFBZixDQUFuQjtBQUNBQyxtQkFBV0MsZUFBWDs7QUFFQSxhQUFLQyxZQUFMLEdBQW9CLENBQ2hCLE1BRGdCLEVBRWhCLFFBRmdCLEVBR2hCLFNBSGdCLEVBSWhCLE1BSmdCLEVBS2hCLGFBTGdCLEVBTWhCLGFBTmdCLEVBT2hCLGVBUGdCLEVBUWhCLGtCQVJnQixFQVNoQixpQkFUZ0IsRUFVaEIsU0FWZ0IsRUFXaEIsU0FYZ0IsRUFZaEIsY0FaZ0IsRUFhaEIsbUJBYmdCLEVBY2hCLG9CQWRnQixFQWVoQixzQkFmZ0IsRUFnQmhCLHFCQWhCZ0IsRUFpQmhCLFdBakJnQixFQWtCaEIsZUFsQmdCLEVBbUJoQixlQW5CZ0IsRUFvQmhCLGFBcEJnQixDQUFwQjtBQXNCQSxZQUFNQyxPQUFPLGlCQUFFQSxJQUFGLENBQU9KLE1BQVAsQ0FBYjtBQUNBLHlCQUFFSyxPQUFGLENBQVVELElBQVYsRUFBZ0IsVUFBQ0UsR0FBRCxFQUFTO0FBQ3JCLGdCQUFJLE1BQUtILFlBQUwsQ0FBa0JJLE9BQWxCLENBQTBCRCxHQUExQixJQUFpQyxDQUFDLENBQXRDLEVBQXlDO0FBQ3JDLHNCQUFLQSxHQUFMLElBQVlOLE9BQU9NLEdBQVAsQ0FBWjtBQUNIO0FBQ0osU0FKRDtBQUtIOzs7O21DQUNVRSxRLEVBQVU7QUFBQTs7QUFDakIsZ0JBQUksQ0FBQ0EsUUFBTCxFQUFlLE1BQU0sNEJBQU47QUFDZixnQkFBSUEsYUFBYSxNQUFqQixFQUF5QjtBQUNyQixvQkFBSSxFQUFFLGlCQUFFQyxHQUFGLENBQU0sSUFBTixFQUFZLGFBQVosS0FBOEIsS0FBS0MsV0FBckMsQ0FBSixFQUF1RDtBQUNuRCwwQkFBTSx3QkFBTjtBQUNIO0FBQ0osYUFKRCxNQUlPO0FBQ0gsb0JBQUksRUFBRSxpQkFBRUQsR0FBRixDQUFNLElBQU4sRUFBWSxjQUFaLEtBQStCLGlCQUFFQSxHQUFGLENBQU0sSUFBTixFQUFZLGFBQVosQ0FBakMsQ0FBSixFQUFrRTtBQUM5RCwwQkFBTSw0QkFBTjtBQUNIO0FBQ0Qsb0JBQUksRUFBRSxLQUFLRSxZQUFMLElBQXFCLEtBQUtDLFdBQTVCLENBQUosRUFBOEM7QUFDMUMsMEJBQU0sNEJBQU47QUFDSDtBQUNKOztBQUVELGdCQUFNQyxVQUFVLEVBQWhCO0FBQ0EsNkJBQUVSLE9BQUYsQ0FBVSxLQUFLRixZQUFmLEVBQTZCLFVBQUNHLEdBQUQsRUFBUztBQUNsQyxvQkFBSSxpQkFBRUcsR0FBRixTQUFZSCxHQUFaLEtBQW9CLE9BQUtBLEdBQUwsQ0FBeEIsRUFBbUM7QUFDL0JPLDRCQUFRLGlCQUFFQyxTQUFGLENBQVlSLEdBQVosQ0FBUixJQUE0QixPQUFLQSxHQUFMLENBQTVCO0FBQ0g7QUFDSixhQUpEO0FBS0FPLG9CQUFRRSxTQUFSLEdBQW9CLENBQXBCO0FBQ0EsbUJBQU9GLE9BQVA7QUFDSDs7Ozs7O0lBR0NHLFU7QUFDRix3QkFBWWhCLE1BQVosRUFBb0I7QUFBQTs7QUFBQTs7QUFDaEIsWUFBTUMsYUFBYSx5QkFBZUQsTUFBZixDQUFuQjtBQUNBQyxtQkFBV2dCLGlCQUFYLENBQTZCakIsTUFBN0I7O0FBRUEsYUFBS0csWUFBTCxHQUFvQixDQUNoQixLQURnQixFQUVoQixPQUZnQixFQUdoQixRQUhnQixFQUloQixRQUpnQixFQUtoQixZQUxnQixFQU1oQixhQU5nQixFQU9oQixjQVBnQixFQVFoQixjQVJnQixFQVNoQixlQVRnQixDQUFwQjtBQVdBLFlBQU1DLE9BQU8saUJBQUVBLElBQUYsQ0FBT0osTUFBUCxDQUFiO0FBQ0EseUJBQUVLLE9BQUYsQ0FBVUQsSUFBVixFQUFnQixVQUFDRSxHQUFELEVBQVM7QUFDckIsZ0JBQUksT0FBS0gsWUFBTCxDQUFrQkksT0FBbEIsQ0FBMEJELEdBQTFCLElBQWlDLENBQUMsQ0FBdEMsRUFBeUM7QUFDckMsdUJBQUtBLEdBQUwsSUFBWU4sT0FBT00sR0FBUCxDQUFaO0FBQ0g7QUFDSixTQUpEO0FBS0g7Ozs7cUNBQ1k7QUFBQTs7QUFDVCxnQkFBTU8sVUFBVSxFQUFoQjtBQUNBLDZCQUFFUixPQUFGLENBQVUsS0FBS0YsWUFBZixFQUE2QixVQUFDRyxHQUFELEVBQVM7QUFDbEMsb0JBQUksaUJBQUVHLEdBQUYsU0FBWUgsR0FBWixLQUFvQixPQUFLQSxHQUFMLENBQXhCLEVBQW1DO0FBQy9CTyw0QkFBUSxpQkFBRUMsU0FBRixDQUFZUixHQUFaLENBQVIsSUFBNEIsT0FBS0EsR0FBTCxDQUE1QjtBQUNIO0FBQ0osYUFKRDtBQUtBTyxvQkFBUUssT0FBUixHQUFrQixLQUFLQyxNQUFMLENBQVlDLFFBQVosRUFBbEI7QUFDQSxtQkFBT1AsT0FBUDtBQUNIOzs7Ozs7UUFJRGQsSSxHQUFBQSxJO1FBQ0FpQixVLEdBQUFBLFUiLCJmaWxlIjoibW9kZWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBWYWxpZGF0b3JzIGZyb20gJy4vdmFsaWRhdG9ycyc7XG5pbXBvcnQgeyBOb0VuZHBvaW50LCBOb1RleHQsIE5vVGVtcGxhdGUgfSBmcm9tICcuL2V4Y2VwdGlvbnMnO1xuXG5jbGFzcyBNYWlsIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcbiAgICAgICAgY29uc3QgdmFsaWRhdG9ycyA9IG5ldyBWYWxpZGF0b3JzKHBhcmFtcyk7XG4gICAgICAgIHZhbGlkYXRvcnMuY2hlY2tNYWlsUGFyYW1zKCk7XG5cbiAgICAgICAgdGhpcy5leHBlY3RlZEtleXMgPSBbXG4gICAgICAgICAgICAndGFncycsXG4gICAgICAgICAgICAnc2VuZEF0JyxcbiAgICAgICAgICAgICdzdWJqZWN0JyxcbiAgICAgICAgICAgICdmcm9tJyxcbiAgICAgICAgICAgICdtZXNzYWdlVGV4dCcsXG4gICAgICAgICAgICAnbWVzc2FnZUh0bWwnLFxuICAgICAgICAgICAgJ3JlY2lwaWVudExpc3QnLFxuICAgICAgICAgICAgJ2FjdGl2YXRlVHJhY2tpbmcnLFxuICAgICAgICAgICAgJ2dldFRleHRGcm9tSHRtbCcsXG4gICAgICAgICAgICAnaGVhZGVycycsXG4gICAgICAgICAgICAnY29udGV4dCcsXG4gICAgICAgICAgICAndGVtcGxhdGVTbHVnJyxcbiAgICAgICAgICAgICd1c2VUcGxEZWZhdWx0TmFtZScsXG4gICAgICAgICAgICAndXNlVHBsRGVmYXVsdEVtYWlsJyxcbiAgICAgICAgICAgICd1c2VUcGxEZWZhdWx0U3ViamVjdCcsXG4gICAgICAgICAgICAnY29udGV4dFBlclJlY2lwaWVudCcsXG4gICAgICAgICAgICAndHJhY2tPcGVuJyxcbiAgICAgICAgICAgICd0cmFja0h0bWxMaW5rJyxcbiAgICAgICAgICAgICd0cmFja1RleHRMaW5rJyxcbiAgICAgICAgICAgICdhdHRhY2htZW50cycsXG4gICAgICAgIF07XG4gICAgICAgIGNvbnN0IGtleXMgPSBfLmtleXMocGFyYW1zKTtcbiAgICAgICAgXy5mb3JFYWNoKGtleXMsIChrZXkpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmV4cGVjdGVkS2V5cy5pbmRleE9mKGtleSkgPiAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IHBhcmFtc1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0UGF5bG9hZChlbmRwb2ludCkge1xuICAgICAgICBpZiAoIWVuZHBvaW50KSB0aHJvdyBuZXcgTm9FbmRwb2ludCgpO1xuICAgICAgICBpZiAoZW5kcG9pbnQgPT09ICd0ZXh0Jykge1xuICAgICAgICAgICAgaWYgKCEoXy5oYXModGhpcywgJ21lc3NhZ2VUZXh0JykgJiYgdGhpcy5tZXNzYWdlVGV4dCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTm9UZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIShfLmhhcyh0aGlzLCAndGVtcGxhdGVTbHVnJykgfHwgXy5oYXModGhpcywgJ21lc3NhZ2VIdG1sJykpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE5vVGVtcGxhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghKHRoaXMudGVtcGxhdGVTbHVnIHx8IHRoaXMubWVzc2FnZUh0bWwpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE5vVGVtcGxhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSB7fTtcbiAgICAgICAgXy5mb3JFYWNoKHRoaXMuZXhwZWN0ZWRLZXlzLCAoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoXy5oYXModGhpcywga2V5KSAmJiB0aGlzW2tleV0pIHtcbiAgICAgICAgICAgICAgICBwYXlsb2FkW18uc25ha2VDYXNlKGtleSldID0gdGhpc1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcGF5bG9hZC5zZW5kZWRfYnkgPSA1O1xuICAgICAgICByZXR1cm4gcGF5bG9hZDtcbiAgICB9XG59XG5cbmNsYXNzIFNlYXJjaEFyZ3Mge1xuICAgIGNvbnN0cnVjdG9yKHBhcmFtcykge1xuICAgICAgICBjb25zdCB2YWxpZGF0b3JzID0gbmV3IFZhbGlkYXRvcnMocGFyYW1zKTtcbiAgICAgICAgdmFsaWRhdG9ycy5jaGVja1NlYXJjaFBhcmFtcyhwYXJhbXMpO1xuXG4gICAgICAgIHRoaXMuZXhwZWN0ZWRLZXlzID0gW1xuICAgICAgICAgICAgJ2VuZCcsXG4gICAgICAgICAgICAnc3RhcnQnLFxuICAgICAgICAgICAgJ3N0YXR1cycsXG4gICAgICAgICAgICAnYXBwSWRzJyxcbiAgICAgICAgICAgICduYW1lU2VuZGVyJyxcbiAgICAgICAgICAgICdlbWFpbFNlbmRlcicsXG4gICAgICAgICAgICAndGVtcGxhdGVTbHVnJyxcbiAgICAgICAgICAgICduYW1lUmVjZWl2ZXInLFxuICAgICAgICAgICAgJ2VtYWlsUmVjZWl2ZXInLFxuICAgICAgICBdO1xuICAgICAgICBjb25zdCBrZXlzID0gXy5rZXlzKHBhcmFtcyk7XG4gICAgICAgIF8uZm9yRWFjaChrZXlzLCAoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5leHBlY3RlZEtleXMuaW5kZXhPZihrZXkpID4gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBwYXJhbXNba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldFBheWxvYWQoKSB7XG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSB7fTtcbiAgICAgICAgXy5mb3JFYWNoKHRoaXMuZXhwZWN0ZWRLZXlzLCAoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoXy5oYXModGhpcywga2V5KSAmJiB0aGlzW2tleV0pIHtcbiAgICAgICAgICAgICAgICBwYXlsb2FkW18uc25ha2VDYXNlKGtleSldID0gdGhpc1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcGF5bG9hZC5hcHBfaWRzID0gdGhpcy5hcHBJZHMudG9TdHJpbmcoKTtcbiAgICAgICAgcmV0dXJuIHBheWxvYWQ7XG4gICAgfVxufVxuXG5leHBvcnQge1xuICAgIE1haWwsXG4gICAgU2VhcmNoQXJncyxcbn07XG4iXX0=