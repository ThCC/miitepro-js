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

        this.expectedKeys = ['tags', 'subject', 'from', 'messageText', 'messageHtml', 'recipientList', 'activateTracking', 'getTextFromHtml', 'headers', 'context', 'templateSlug', 'useTplDefaultName', 'useTplDefaultEmail', 'useTplDefaultSubject', 'contextPerRecipient'];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbHMuanMiXSwibmFtZXMiOlsiTWFpbCIsInBhcmFtcyIsInZhbGlkYXRvcnMiLCJjaGVja01haWxQYXJhbXMiLCJleHBlY3RlZEtleXMiLCJrZXlzIiwiZm9yRWFjaCIsImtleSIsImluZGV4T2YiLCJlbmRwb2ludCIsImhhcyIsIm1lc3NhZ2VUZXh0IiwidGVtcGxhdGVTbHVnIiwibWVzc2FnZUh0bWwiLCJwYXlsb2FkIiwic25ha2VDYXNlIiwic2VuZGVkX2J5IiwiU2VhcmNoQXJncyIsImNoZWNrU2VhcmNoUGFyYW1zIiwiYXBwX2lkcyIsImFwcElkcyIsInRvU3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVNQSxJO0FBQ0Ysa0JBQVlDLE1BQVosRUFBb0I7QUFBQTs7QUFBQTs7QUFDaEIsWUFBTUMsYUFBYSx5QkFBZUQsTUFBZixDQUFuQjtBQUNBQyxtQkFBV0MsZUFBWDs7QUFFQSxhQUFLQyxZQUFMLEdBQW9CLENBQ2hCLE1BRGdCLEVBRWhCLFNBRmdCLEVBR2hCLE1BSGdCLEVBSWhCLGFBSmdCLEVBS2hCLGFBTGdCLEVBTWhCLGVBTmdCLEVBT2hCLGtCQVBnQixFQVFoQixpQkFSZ0IsRUFTaEIsU0FUZ0IsRUFVaEIsU0FWZ0IsRUFXaEIsY0FYZ0IsRUFZaEIsbUJBWmdCLEVBYWhCLG9CQWJnQixFQWNoQixzQkFkZ0IsRUFlaEIscUJBZmdCLENBQXBCO0FBaUJBLFlBQU1DLE9BQU8saUJBQUVBLElBQUYsQ0FBT0osTUFBUCxDQUFiO0FBQ0EseUJBQUVLLE9BQUYsQ0FBVUQsSUFBVixFQUFnQixVQUFDRSxHQUFELEVBQVM7QUFDckIsZ0JBQUksTUFBS0gsWUFBTCxDQUFrQkksT0FBbEIsQ0FBMEJELEdBQTFCLElBQWlDLENBQUMsQ0FBdEMsRUFBeUM7QUFDckMsc0JBQUtBLEdBQUwsSUFBWU4sT0FBT00sR0FBUCxDQUFaO0FBQ0g7QUFDSixTQUpEO0FBS0g7Ozs7bUNBQ1VFLFEsRUFBVTtBQUFBOztBQUNqQixnQkFBSSxDQUFDQSxRQUFMLEVBQWUsTUFBTSw0QkFBTjtBQUNmLGdCQUFJQSxhQUFhLE1BQWpCLEVBQXlCO0FBQ3JCLG9CQUFJLEVBQUUsaUJBQUVDLEdBQUYsQ0FBTSxJQUFOLEVBQVksYUFBWixLQUE4QixLQUFLQyxXQUFyQyxDQUFKLEVBQXVEO0FBQ25ELDBCQUFNLHdCQUFOO0FBQ0g7QUFDSixhQUpELE1BSU87QUFDSCxvQkFBSSxFQUFFLGlCQUFFRCxHQUFGLENBQU0sSUFBTixFQUFZLGNBQVosS0FBK0IsaUJBQUVBLEdBQUYsQ0FBTSxJQUFOLEVBQVksYUFBWixDQUFqQyxDQUFKLEVBQWtFO0FBQzlELDBCQUFNLDRCQUFOO0FBQ0g7QUFDRCxvQkFBSSxFQUFFLEtBQUtFLFlBQUwsSUFBcUIsS0FBS0MsV0FBNUIsQ0FBSixFQUE4QztBQUMxQywwQkFBTSw0QkFBTjtBQUNIO0FBQ0o7O0FBRUQsZ0JBQU1DLFVBQVUsRUFBaEI7QUFDQSw2QkFBRVIsT0FBRixDQUFVLEtBQUtGLFlBQWYsRUFBNkIsVUFBQ0csR0FBRCxFQUFTO0FBQ2xDLG9CQUFJLGlCQUFFRyxHQUFGLFNBQVlILEdBQVosS0FBb0IsT0FBS0EsR0FBTCxDQUF4QixFQUFtQztBQUMvQk8sNEJBQVEsaUJBQUVDLFNBQUYsQ0FBWVIsR0FBWixDQUFSLElBQTRCLE9BQUtBLEdBQUwsQ0FBNUI7QUFDSDtBQUNKLGFBSkQ7QUFLQU8sb0JBQVFFLFNBQVIsR0FBb0IsQ0FBcEI7QUFDQSxtQkFBT0YsT0FBUDtBQUNIOzs7Ozs7SUFHQ0csVTtBQUNGLHdCQUFZaEIsTUFBWixFQUFvQjtBQUFBOztBQUFBOztBQUNoQixZQUFNQyxhQUFhLHlCQUFlRCxNQUFmLENBQW5CO0FBQ0FDLG1CQUFXZ0IsaUJBQVgsQ0FBNkJqQixNQUE3Qjs7QUFFQSxhQUFLRyxZQUFMLEdBQW9CLENBQ2hCLEtBRGdCLEVBRWhCLE9BRmdCLEVBR2hCLFFBSGdCLEVBSWhCLFFBSmdCLEVBS2hCLFlBTGdCLEVBTWhCLGFBTmdCLEVBT2hCLGNBUGdCLEVBUWhCLGNBUmdCLEVBU2hCLGVBVGdCLENBQXBCO0FBV0EsWUFBTUMsT0FBTyxpQkFBRUEsSUFBRixDQUFPSixNQUFQLENBQWI7QUFDQSx5QkFBRUssT0FBRixDQUFVRCxJQUFWLEVBQWdCLFVBQUNFLEdBQUQsRUFBUztBQUNyQixnQkFBSSxPQUFLSCxZQUFMLENBQWtCSSxPQUFsQixDQUEwQkQsR0FBMUIsSUFBaUMsQ0FBQyxDQUF0QyxFQUF5QztBQUNyQyx1QkFBS0EsR0FBTCxJQUFZTixPQUFPTSxHQUFQLENBQVo7QUFDSDtBQUNKLFNBSkQ7QUFLSDs7OztxQ0FDWTtBQUFBOztBQUNULGdCQUFNTyxVQUFVLEVBQWhCO0FBQ0EsNkJBQUVSLE9BQUYsQ0FBVSxLQUFLRixZQUFmLEVBQTZCLFVBQUNHLEdBQUQsRUFBUztBQUNsQyxvQkFBSSxpQkFBRUcsR0FBRixTQUFZSCxHQUFaLEtBQW9CLE9BQUtBLEdBQUwsQ0FBeEIsRUFBbUM7QUFDL0JPLDRCQUFRLGlCQUFFQyxTQUFGLENBQVlSLEdBQVosQ0FBUixJQUE0QixPQUFLQSxHQUFMLENBQTVCO0FBQ0g7QUFDSixhQUpEO0FBS0FPLG9CQUFRSyxPQUFSLEdBQWtCLEtBQUtDLE1BQUwsQ0FBWUMsUUFBWixFQUFsQjtBQUNBLG1CQUFPUCxPQUFQO0FBQ0g7Ozs7OztRQUlEZCxJLEdBQUFBLEk7UUFDQWlCLFUsR0FBQUEsVSIsImZpbGUiOiJtb2RlbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IFZhbGlkYXRvcnMgZnJvbSAnLi92YWxpZGF0b3JzJztcbmltcG9ydCB7IE5vRW5kcG9pbnQsIE5vVGV4dCwgTm9UZW1wbGF0ZSB9IGZyb20gJy4vZXhjZXB0aW9ucyc7XG5cbmNsYXNzIE1haWwge1xuICAgIGNvbnN0cnVjdG9yKHBhcmFtcykge1xuICAgICAgICBjb25zdCB2YWxpZGF0b3JzID0gbmV3IFZhbGlkYXRvcnMocGFyYW1zKTtcbiAgICAgICAgdmFsaWRhdG9ycy5jaGVja01haWxQYXJhbXMoKTtcblxuICAgICAgICB0aGlzLmV4cGVjdGVkS2V5cyA9IFtcbiAgICAgICAgICAgICd0YWdzJyxcbiAgICAgICAgICAgICdzdWJqZWN0JyxcbiAgICAgICAgICAgICdmcm9tJyxcbiAgICAgICAgICAgICdtZXNzYWdlVGV4dCcsXG4gICAgICAgICAgICAnbWVzc2FnZUh0bWwnLFxuICAgICAgICAgICAgJ3JlY2lwaWVudExpc3QnLFxuICAgICAgICAgICAgJ2FjdGl2YXRlVHJhY2tpbmcnLFxuICAgICAgICAgICAgJ2dldFRleHRGcm9tSHRtbCcsXG4gICAgICAgICAgICAnaGVhZGVycycsXG4gICAgICAgICAgICAnY29udGV4dCcsXG4gICAgICAgICAgICAndGVtcGxhdGVTbHVnJyxcbiAgICAgICAgICAgICd1c2VUcGxEZWZhdWx0TmFtZScsXG4gICAgICAgICAgICAndXNlVHBsRGVmYXVsdEVtYWlsJyxcbiAgICAgICAgICAgICd1c2VUcGxEZWZhdWx0U3ViamVjdCcsXG4gICAgICAgICAgICAnY29udGV4dFBlclJlY2lwaWVudCcsXG4gICAgICAgIF07XG4gICAgICAgIGNvbnN0IGtleXMgPSBfLmtleXMocGFyYW1zKTtcbiAgICAgICAgXy5mb3JFYWNoKGtleXMsIChrZXkpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmV4cGVjdGVkS2V5cy5pbmRleE9mKGtleSkgPiAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IHBhcmFtc1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0UGF5bG9hZChlbmRwb2ludCkge1xuICAgICAgICBpZiAoIWVuZHBvaW50KSB0aHJvdyBuZXcgTm9FbmRwb2ludCgpO1xuICAgICAgICBpZiAoZW5kcG9pbnQgPT09ICd0ZXh0Jykge1xuICAgICAgICAgICAgaWYgKCEoXy5oYXModGhpcywgJ21lc3NhZ2VUZXh0JykgJiYgdGhpcy5tZXNzYWdlVGV4dCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTm9UZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIShfLmhhcyh0aGlzLCAndGVtcGxhdGVTbHVnJykgfHwgXy5oYXModGhpcywgJ21lc3NhZ2VIdG1sJykpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE5vVGVtcGxhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghKHRoaXMudGVtcGxhdGVTbHVnIHx8IHRoaXMubWVzc2FnZUh0bWwpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE5vVGVtcGxhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSB7fTtcbiAgICAgICAgXy5mb3JFYWNoKHRoaXMuZXhwZWN0ZWRLZXlzLCAoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoXy5oYXModGhpcywga2V5KSAmJiB0aGlzW2tleV0pIHtcbiAgICAgICAgICAgICAgICBwYXlsb2FkW18uc25ha2VDYXNlKGtleSldID0gdGhpc1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcGF5bG9hZC5zZW5kZWRfYnkgPSA1O1xuICAgICAgICByZXR1cm4gcGF5bG9hZDtcbiAgICB9XG59XG5cbmNsYXNzIFNlYXJjaEFyZ3Mge1xuICAgIGNvbnN0cnVjdG9yKHBhcmFtcykge1xuICAgICAgICBjb25zdCB2YWxpZGF0b3JzID0gbmV3IFZhbGlkYXRvcnMocGFyYW1zKTtcbiAgICAgICAgdmFsaWRhdG9ycy5jaGVja1NlYXJjaFBhcmFtcyhwYXJhbXMpO1xuXG4gICAgICAgIHRoaXMuZXhwZWN0ZWRLZXlzID0gW1xuICAgICAgICAgICAgJ2VuZCcsXG4gICAgICAgICAgICAnc3RhcnQnLFxuICAgICAgICAgICAgJ3N0YXR1cycsXG4gICAgICAgICAgICAnYXBwSWRzJyxcbiAgICAgICAgICAgICduYW1lU2VuZGVyJyxcbiAgICAgICAgICAgICdlbWFpbFNlbmRlcicsXG4gICAgICAgICAgICAndGVtcGxhdGVTbHVnJyxcbiAgICAgICAgICAgICduYW1lUmVjZWl2ZXInLFxuICAgICAgICAgICAgJ2VtYWlsUmVjZWl2ZXInLFxuICAgICAgICBdO1xuICAgICAgICBjb25zdCBrZXlzID0gXy5rZXlzKHBhcmFtcyk7XG4gICAgICAgIF8uZm9yRWFjaChrZXlzLCAoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5leHBlY3RlZEtleXMuaW5kZXhPZihrZXkpID4gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBwYXJhbXNba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldFBheWxvYWQoKSB7XG4gICAgICAgIGNvbnN0IHBheWxvYWQgPSB7fTtcbiAgICAgICAgXy5mb3JFYWNoKHRoaXMuZXhwZWN0ZWRLZXlzLCAoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoXy5oYXModGhpcywga2V5KSAmJiB0aGlzW2tleV0pIHtcbiAgICAgICAgICAgICAgICBwYXlsb2FkW18uc25ha2VDYXNlKGtleSldID0gdGhpc1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcGF5bG9hZC5hcHBfaWRzID0gdGhpcy5hcHBJZHMudG9TdHJpbmcoKTtcbiAgICAgICAgcmV0dXJuIHBheWxvYWQ7XG4gICAgfVxufVxuXG5leHBvcnQge1xuICAgIE1haWwsXG4gICAgU2VhcmNoQXJncyxcbn07XG4iXX0=