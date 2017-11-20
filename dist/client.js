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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbGllbnQuanMiXSwibmFtZXMiOlsiY2hlY2tNYWlsIiwibWFpbCIsImlzT2JqZWN0IiwiY29uc3RydWN0b3IiLCJuYW1lIiwiQ2xpZW50IiwiZW5kcG9pbnQiLCJzZW5kUmVxdWVzdCIsImdldFBheWxvYWQiLCJzZWFyY2hBcmdzIiwidXVpZHMiLCJzcGVjaWZpY3MiLCJpc0FycmF5IiwiSlNPTiIsInN0cmluZ2lmeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0FBRUEsU0FBU0EsU0FBVCxDQUFtQkMsSUFBbkIsRUFBeUI7QUFDckIsUUFBSSxDQUFDQSxJQUFMLEVBQVcsTUFBTSx3QkFBTjtBQUNYLFFBQUksQ0FBQyxpQkFBRUMsUUFBRixDQUFXRCxJQUFYLENBQUwsRUFBdUIsTUFBTSx3QkFBTjtBQUN2QixRQUFJLEVBQUVBLEtBQUtFLFdBQUwsQ0FBaUJDLElBQWpCLEtBQTBCLE1BQTVCLENBQUosRUFBeUMsTUFBTSxpQ0FBTjtBQUM1Qzs7SUFFWUMsTSxXQUFBQSxNOzs7Ozs7Ozs7Ozs2QkFDSkosSSxFQUFNO0FBQ1BELHNCQUFVQyxJQUFWO0FBQ0EsZ0JBQU1LLFdBQVcsTUFBakI7QUFDQSxtQkFBTyxLQUFLQyxXQUFMLENBQWlCTixLQUFLTyxVQUFMLENBQWdCRixRQUFoQixDQUFqQixFQUE0Q0EsUUFBNUMsQ0FBUDtBQUNIOzs7cUNBQ1lMLEksRUFBTTtBQUNmRCxzQkFBVUMsSUFBVjtBQUNBLGdCQUFNSyxXQUFXLFVBQWpCO0FBQ0EsbUJBQU8sS0FBS0MsV0FBTCxDQUFpQk4sS0FBS08sVUFBTCxDQUFnQkYsUUFBaEIsQ0FBakIsRUFBNENBLFFBQTVDLENBQVA7QUFDSDs7O3FDQUNZRyxVLEVBQVk7QUFDckIsZ0JBQUksQ0FBQ0EsVUFBTCxFQUFpQixNQUFNLDhCQUFOO0FBQ2pCLGdCQUFJLEVBQUVBLFdBQVdOLFdBQVgsQ0FBdUJDLElBQXZCLEtBQWdDLFlBQWxDLENBQUosRUFBcUQsTUFBTSxzQ0FBTjs7QUFFckQsbUJBQU8sS0FBS0csV0FBTCxDQUFpQkUsV0FBV0QsVUFBWCxFQUFqQixFQUEwQyxRQUExQyxFQUFvRCxLQUFwRCxDQUFQO0FBQ0g7OzswQ0FDaUJFLEssRUFBTztBQUNyQixnQkFBSSxDQUFDQSxLQUFMLEVBQVksTUFBTSx5QkFBYSxPQUFiLENBQU47QUFDWixnQkFBSUMsWUFBWUQsS0FBaEI7QUFDQSxnQkFBSSxDQUFDLGlCQUFFRSxPQUFGLENBQVVELFNBQVYsQ0FBTCxFQUEyQkEsWUFBWSxDQUFDQSxTQUFELENBQVo7QUFDM0JBLHdCQUFZRSxLQUFLQyxTQUFMLENBQWVILFNBQWYsQ0FBWjtBQUNBLG1CQUFPLEtBQUtKLFdBQUwsQ0FBaUIsRUFBRUcsT0FBT0MsU0FBVCxFQUFqQixFQUF1QyxXQUF2QyxFQUFvRCxLQUFwRCxDQUFQO0FBQ0giLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBBcGkgZnJvbSAnLi9hcGknO1xuaW1wb3J0IHsgTm9NYWlsLCBOb3RNYWlsSW5zdGFuY2UsIE5vU2VhcmNoQXJncywgTm9TZWFyY2hBcmdzSW5zdGFuY2UsIE5vUGFyYW1YIH0gZnJvbSAnLi9leGNlcHRpb25zJztcblxuZnVuY3Rpb24gY2hlY2tNYWlsKG1haWwpIHtcbiAgICBpZiAoIW1haWwpIHRocm93IG5ldyBOb01haWwoKTtcbiAgICBpZiAoIV8uaXNPYmplY3QobWFpbCkpIHRocm93IG5ldyBOb01haWwoKTtcbiAgICBpZiAoIShtYWlsLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdNYWlsJykpIHRocm93IG5ldyBOb3RNYWlsSW5zdGFuY2UoKTtcbn1cblxuZXhwb3J0IGNsYXNzIENsaWVudCBleHRlbmRzIEFwaSB7XG4gICAgc2VuZChtYWlsKSB7XG4gICAgICAgIGNoZWNrTWFpbChtYWlsKTtcbiAgICAgICAgY29uc3QgZW5kcG9pbnQgPSAndGV4dCc7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmRSZXF1ZXN0KG1haWwuZ2V0UGF5bG9hZChlbmRwb2ludCksIGVuZHBvaW50KTtcbiAgICB9XG4gICAgc2VuZFRlbXBsYXRlKG1haWwpIHtcbiAgICAgICAgY2hlY2tNYWlsKG1haWwpO1xuICAgICAgICBjb25zdCBlbmRwb2ludCA9ICd0ZW1wbGF0ZSc7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmRSZXF1ZXN0KG1haWwuZ2V0UGF5bG9hZChlbmRwb2ludCksIGVuZHBvaW50KTtcbiAgICB9XG4gICAgc2VhcmNoRW1haWxzKHNlYXJjaEFyZ3MpIHtcbiAgICAgICAgaWYgKCFzZWFyY2hBcmdzKSB0aHJvdyBuZXcgTm9TZWFyY2hBcmdzKCk7XG4gICAgICAgIGlmICghKHNlYXJjaEFyZ3MuY29uc3RydWN0b3IubmFtZSA9PT0gJ1NlYXJjaEFyZ3MnKSkgdGhyb3cgbmV3IE5vU2VhcmNoQXJnc0luc3RhbmNlKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZFJlcXVlc3Qoc2VhcmNoQXJncy5nZXRQYXlsb2FkKCksICdzZWFyY2gnLCAnR0VUJyk7XG4gICAgfVxuICAgIGdldFNwZWNpZmljRW1haWxzKHV1aWRzKSB7XG4gICAgICAgIGlmICghdXVpZHMpIHRocm93IG5ldyBOb1BhcmFtWCgndXVpZHMnKTtcbiAgICAgICAgbGV0IHNwZWNpZmljcyA9IHV1aWRzO1xuICAgICAgICBpZiAoIV8uaXNBcnJheShzcGVjaWZpY3MpKSBzcGVjaWZpY3MgPSBbc3BlY2lmaWNzXTtcbiAgICAgICAgc3BlY2lmaWNzID0gSlNPTi5zdHJpbmdpZnkoc3BlY2lmaWNzKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZFJlcXVlc3QoeyB1dWlkczogc3BlY2lmaWNzIH0sICdzcGVjaWZpY3MnLCAnR0VUJyk7XG4gICAgfVxufVxuIl19