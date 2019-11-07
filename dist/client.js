'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Client = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _exceptions = require('./exceptions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function checkMail(mail) {
    if (!mail) throw new _exceptions.NoMail();
    if (!_lodash2.default.isObject(mail)) throw new _exceptions.NoMail();
    if (!(mail.constructor.name === 'Mail')) throw new _exceptions.NotMailInstance();
}

var Client = exports.Client = function (_Api) {
    _inherits(Client, _Api);

    function Client() {
        _classCallCheck(this, Client);

        return _possibleConstructorReturn(this, (Client.__proto__ || Object.getPrototypeOf(Client)).apply(this, arguments));
    }

    _createClass(Client, [{
        key: 'send',
        value: function send(mail) {
            checkMail(mail);
            var endpoint = 'text';
            return this.sendRequest(mail.getPayload(endpoint), endpoint);
        }
    }, {
        key: 'sendTemplate',
        value: function sendTemplate(mail) {
            checkMail(mail);
            var endpoint = 'template';
            return this.sendRequest(mail.getPayload(endpoint), endpoint);
        }
    }, {
        key: 'searchEmails',
        value: function searchEmails(searchArgs) {
            if (!searchArgs) throw new _exceptions.NoSearchArgs();
            if (!(searchArgs.constructor.name === 'SearchArgs')) throw new _exceptions.NoSearchArgsInstance();

            return this.sendRequest(searchArgs.getPayload(), 'search', 'GET');
        }
    }, {
        key: 'getSpecificEmails',
        value: function getSpecificEmails(uuids) {
            if (!uuids) throw new _exceptions.NoParamX('uuids');
            var specifics = uuids;
            if (!_lodash2.default.isArray(specifics)) specifics = [specifics];
            specifics = JSON.stringify(specifics);
            return this.sendRequest({ uuids: specifics }, 'specifics', 'GET');
        }
    }]);

    return Client;
}(_api2.default);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbGllbnQuanMiXSwibmFtZXMiOlsiY2hlY2tNYWlsIiwibWFpbCIsIk5vTWFpbCIsIl8iLCJpc09iamVjdCIsImNvbnN0cnVjdG9yIiwibmFtZSIsIk5vdE1haWxJbnN0YW5jZSIsIkNsaWVudCIsImVuZHBvaW50Iiwic2VuZFJlcXVlc3QiLCJnZXRQYXlsb2FkIiwic2VhcmNoQXJncyIsIk5vU2VhcmNoQXJncyIsIk5vU2VhcmNoQXJnc0luc3RhbmNlIiwidXVpZHMiLCJOb1BhcmFtWCIsInNwZWNpZmljcyIsImlzQXJyYXkiLCJKU09OIiwic3RyaW5naWZ5IiwiQXBpIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQSxTQUFTQSxTQUFULENBQW1CQyxJQUFuQixFQUF5QjtBQUNyQixRQUFJLENBQUNBLElBQUwsRUFBVyxNQUFNLElBQUlDLGtCQUFKLEVBQU47QUFDWCxRQUFJLENBQUNDLGlCQUFFQyxRQUFGLENBQVdILElBQVgsQ0FBTCxFQUF1QixNQUFNLElBQUlDLGtCQUFKLEVBQU47QUFDdkIsUUFBSSxFQUFFRCxLQUFLSSxXQUFMLENBQWlCQyxJQUFqQixLQUEwQixNQUE1QixDQUFKLEVBQXlDLE1BQU0sSUFBSUMsMkJBQUosRUFBTjtBQUM1Qzs7SUFFWUMsTSxXQUFBQSxNOzs7Ozs7Ozs7Ozs2QkFDSlAsSSxFQUFNO0FBQ1BELHNCQUFVQyxJQUFWO0FBQ0EsZ0JBQU1RLFdBQVcsTUFBakI7QUFDQSxtQkFBTyxLQUFLQyxXQUFMLENBQWlCVCxLQUFLVSxVQUFMLENBQWdCRixRQUFoQixDQUFqQixFQUE0Q0EsUUFBNUMsQ0FBUDtBQUNIOzs7cUNBQ1lSLEksRUFBTTtBQUNmRCxzQkFBVUMsSUFBVjtBQUNBLGdCQUFNUSxXQUFXLFVBQWpCO0FBQ0EsbUJBQU8sS0FBS0MsV0FBTCxDQUFpQlQsS0FBS1UsVUFBTCxDQUFnQkYsUUFBaEIsQ0FBakIsRUFBNENBLFFBQTVDLENBQVA7QUFDSDs7O3FDQUNZRyxVLEVBQVk7QUFDckIsZ0JBQUksQ0FBQ0EsVUFBTCxFQUFpQixNQUFNLElBQUlDLHdCQUFKLEVBQU47QUFDakIsZ0JBQUksRUFBRUQsV0FBV1AsV0FBWCxDQUF1QkMsSUFBdkIsS0FBZ0MsWUFBbEMsQ0FBSixFQUFxRCxNQUFNLElBQUlRLGdDQUFKLEVBQU47O0FBRXJELG1CQUFPLEtBQUtKLFdBQUwsQ0FBaUJFLFdBQVdELFVBQVgsRUFBakIsRUFBMEMsUUFBMUMsRUFBb0QsS0FBcEQsQ0FBUDtBQUNIOzs7MENBQ2lCSSxLLEVBQU87QUFDckIsZ0JBQUksQ0FBQ0EsS0FBTCxFQUFZLE1BQU0sSUFBSUMsb0JBQUosQ0FBYSxPQUFiLENBQU47QUFDWixnQkFBSUMsWUFBWUYsS0FBaEI7QUFDQSxnQkFBSSxDQUFDWixpQkFBRWUsT0FBRixDQUFVRCxTQUFWLENBQUwsRUFBMkJBLFlBQVksQ0FBQ0EsU0FBRCxDQUFaO0FBQzNCQSx3QkFBWUUsS0FBS0MsU0FBTCxDQUFlSCxTQUFmLENBQVo7QUFDQSxtQkFBTyxLQUFLUCxXQUFMLENBQWlCLEVBQUVLLE9BQU9FLFNBQVQsRUFBakIsRUFBdUMsV0FBdkMsRUFBb0QsS0FBcEQsQ0FBUDtBQUNIOzs7O0VBdkJ1QkksYSIsImZpbGUiOiJjbGllbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IEFwaSBmcm9tICcuL2FwaSc7XG5pbXBvcnQgeyBOb01haWwsIE5vdE1haWxJbnN0YW5jZSwgTm9TZWFyY2hBcmdzLCBOb1NlYXJjaEFyZ3NJbnN0YW5jZSwgTm9QYXJhbVggfSBmcm9tICcuL2V4Y2VwdGlvbnMnO1xuXG5mdW5jdGlvbiBjaGVja01haWwobWFpbCkge1xuICAgIGlmICghbWFpbCkgdGhyb3cgbmV3IE5vTWFpbCgpO1xuICAgIGlmICghXy5pc09iamVjdChtYWlsKSkgdGhyb3cgbmV3IE5vTWFpbCgpO1xuICAgIGlmICghKG1haWwuY29uc3RydWN0b3IubmFtZSA9PT0gJ01haWwnKSkgdGhyb3cgbmV3IE5vdE1haWxJbnN0YW5jZSgpO1xufVxuXG5leHBvcnQgY2xhc3MgQ2xpZW50IGV4dGVuZHMgQXBpIHtcbiAgICBzZW5kKG1haWwpIHtcbiAgICAgICAgY2hlY2tNYWlsKG1haWwpO1xuICAgICAgICBjb25zdCBlbmRwb2ludCA9ICd0ZXh0JztcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZFJlcXVlc3QobWFpbC5nZXRQYXlsb2FkKGVuZHBvaW50KSwgZW5kcG9pbnQpO1xuICAgIH1cbiAgICBzZW5kVGVtcGxhdGUobWFpbCkge1xuICAgICAgICBjaGVja01haWwobWFpbCk7XG4gICAgICAgIGNvbnN0IGVuZHBvaW50ID0gJ3RlbXBsYXRlJztcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZFJlcXVlc3QobWFpbC5nZXRQYXlsb2FkKGVuZHBvaW50KSwgZW5kcG9pbnQpO1xuICAgIH1cbiAgICBzZWFyY2hFbWFpbHMoc2VhcmNoQXJncykge1xuICAgICAgICBpZiAoIXNlYXJjaEFyZ3MpIHRocm93IG5ldyBOb1NlYXJjaEFyZ3MoKTtcbiAgICAgICAgaWYgKCEoc2VhcmNoQXJncy5jb25zdHJ1Y3Rvci5uYW1lID09PSAnU2VhcmNoQXJncycpKSB0aHJvdyBuZXcgTm9TZWFyY2hBcmdzSW5zdGFuY2UoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5zZW5kUmVxdWVzdChzZWFyY2hBcmdzLmdldFBheWxvYWQoKSwgJ3NlYXJjaCcsICdHRVQnKTtcbiAgICB9XG4gICAgZ2V0U3BlY2lmaWNFbWFpbHModXVpZHMpIHtcbiAgICAgICAgaWYgKCF1dWlkcykgdGhyb3cgbmV3IE5vUGFyYW1YKCd1dWlkcycpO1xuICAgICAgICBsZXQgc3BlY2lmaWNzID0gdXVpZHM7XG4gICAgICAgIGlmICghXy5pc0FycmF5KHNwZWNpZmljcykpIHNwZWNpZmljcyA9IFtzcGVjaWZpY3NdO1xuICAgICAgICBzcGVjaWZpY3MgPSBKU09OLnN0cmluZ2lmeShzcGVjaWZpY3MpO1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5kUmVxdWVzdCh7IHV1aWRzOiBzcGVjaWZpY3MgfSwgJ3NwZWNpZmljcycsICdHRVQnKTtcbiAgICB9XG59XG4iXX0=