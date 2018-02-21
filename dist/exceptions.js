'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ParamsShouldBeObject = exports.InvalidRecipientList = exports.NoTemplateNoFeatures = exports.NoSearchArgsInstance = exports.InvalidServerUri = exports.NotMailInstance = exports.WrongTypeParamX = exports.InvalidSendAt = exports.TimeoutError = exports.NoSearchArgs = exports.NoReplyEmail = exports.NoRecipient = exports.NoSecretKey = exports.NoPublicKey = exports.InvalidFrom = exports.NoTemplate = exports.NoEndpoint = exports.NoSubject = exports.NoParamX = exports.NoText = exports.NoMail = exports.ApiError = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ExtendableError = function (_Error) {
    _inherits(ExtendableError, _Error);

    function ExtendableError(message, name) {
        _classCallCheck(this, ExtendableError);

        var _this = _possibleConstructorReturn(this, (ExtendableError.__proto__ || Object.getPrototypeOf(ExtendableError)).call(this, message));

        _this.name = name;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(_this, _this.constructor);
        } else {
            _this.stack = new Error(message).stack;
        }
        return _this;
    }

    return ExtendableError;
}(Error);

var ApiError = function (_ExtendableError) {
    _inherits(ApiError, _ExtendableError);

    function ApiError(reason) {
        _classCallCheck(this, ApiError);

        return _possibleConstructorReturn(this, (ApiError.__proto__ || Object.getPrototypeOf(ApiError)).call(this, 'MitteProError. Reason: ' + reason, 'ApiError'));
    }

    return ApiError;
}(ExtendableError);

var NoText = function (_ExtendableError2) {
    _inherits(NoText, _ExtendableError2);

    function NoText() {
        _classCallCheck(this, NoText);

        return _possibleConstructorReturn(this, (NoText.__proto__ || Object.getPrototypeOf(NoText)).call(this, 'Impossible to send a simple email without a text content', 'NoText'));
    }

    return NoText;
}(ExtendableError);

var NoTemplate = function (_ExtendableError3) {
    _inherits(NoTemplate, _ExtendableError3);

    function NoTemplate() {
        _classCallCheck(this, NoTemplate);

        return _possibleConstructorReturn(this, (NoTemplate.__proto__ || Object.getPrototypeOf(NoTemplate)).call(this, 'Impossible to send a template email without a html content. ' + 'Either you pass the templateSlug or the messageHtml', 'NoTemplate'));
    }

    return NoTemplate;
}(ExtendableError);

var NoTemplateNoFeatures = function (_ExtendableError4) {
    _inherits(NoTemplateNoFeatures, _ExtendableError4);

    function NoTemplateNoFeatures() {
        _classCallCheck(this, NoTemplateNoFeatures);

        return _possibleConstructorReturn(this, (NoTemplateNoFeatures.__proto__ || Object.getPrototypeOf(NoTemplateNoFeatures)).call(this, "Impossible to use template features, without passing 'templateSlug'", 'NoTemplateNoFeatures'));
    }

    return NoTemplateNoFeatures;
}(ExtendableError);

var NoMail = function (_ExtendableError5) {
    _inherits(NoMail, _ExtendableError5);

    function NoMail() {
        _classCallCheck(this, NoMail);

        return _possibleConstructorReturn(this, (NoMail.__proto__ || Object.getPrototypeOf(NoMail)).call(this, "Impossible to send an email if there's no mail", 'NoMail'));
    }

    return NoMail;
}(ExtendableError);

var NotMailInstance = function (_ExtendableError6) {
    _inherits(NotMailInstance, _ExtendableError6);

    function NotMailInstance() {
        _classCallCheck(this, NotMailInstance);

        return _possibleConstructorReturn(this, (NotMailInstance.__proto__ || Object.getPrototypeOf(NotMailInstance)).call(this, 'Expecting a Mail instance', 'NotMailInstance'));
    }

    return NotMailInstance;
}(ExtendableError);

var NoEndpoint = function (_ExtendableError7) {
    _inherits(NoEndpoint, _ExtendableError7);

    function NoEndpoint() {
        _classCallCheck(this, NoEndpoint);

        return _possibleConstructorReturn(this, (NoEndpoint.__proto__ || Object.getPrototypeOf(NoEndpoint)).call(this, 'Impossible to get the payload without the endpoint', 'NoEndpoint'));
    }

    return NoEndpoint;
}(ExtendableError);

var NoSubject = function (_ExtendableError8) {
    _inherits(NoSubject, _ExtendableError8);

    function NoSubject() {
        _classCallCheck(this, NoSubject);

        return _possibleConstructorReturn(this, (NoSubject.__proto__ || Object.getPrototypeOf(NoSubject)).call(this, 'Impossible to send email without a subject', 'NoSubject'));
    }

    return NoSubject;
}(ExtendableError);

var NoRecipient = function (_ExtendableError9) {
    _inherits(NoRecipient, _ExtendableError9);

    function NoRecipient() {
        _classCallCheck(this, NoRecipient);

        return _possibleConstructorReturn(this, (NoRecipient.__proto__ || Object.getPrototypeOf(NoRecipient)).call(this, 'Impossible to send email without any recipient', 'NoRecipient'));
    }

    return NoRecipient;
}(ExtendableError);

var NoPublicKey = function (_ExtendableError10) {
    _inherits(NoPublicKey, _ExtendableError10);

    function NoPublicKey() {
        _classCallCheck(this, NoPublicKey);

        return _possibleConstructorReturn(this, (NoPublicKey.__proto__ || Object.getPrototypeOf(NoPublicKey)).call(this, "MitteProError. There's no Public Key.", 'NoPublicKey'));
    }

    return NoPublicKey;
}(ExtendableError);

var NoSecretKey = function (_ExtendableError11) {
    _inherits(NoSecretKey, _ExtendableError11);

    function NoSecretKey() {
        _classCallCheck(this, NoSecretKey);

        return _possibleConstructorReturn(this, (NoSecretKey.__proto__ || Object.getPrototypeOf(NoSecretKey)).call(this, "MitteProError. There's no Secret Key.", 'NoSecretKey'));
    }

    return NoSecretKey;
}(ExtendableError);

var InvalidServerUri = function (_ExtendableError12) {
    _inherits(InvalidServerUri, _ExtendableError12);

    function InvalidServerUri() {
        _classCallCheck(this, InvalidServerUri);

        return _possibleConstructorReturn(this, (InvalidServerUri.__proto__ || Object.getPrototypeOf(InvalidServerUri)).call(this, 'MitteProError. Invalid server uri, it was expecting a string.', 'InvalidServerUri'));
    }

    return InvalidServerUri;
}(ExtendableError);

var NoReplyEmail = function (_ExtendableError13) {
    _inherits(NoReplyEmail, _ExtendableError13);

    function NoReplyEmail() {
        _classCallCheck(this, NoReplyEmail);

        return _possibleConstructorReturn(this, (NoReplyEmail.__proto__ || Object.getPrototypeOf(NoReplyEmail)).call(this, 'Please provide an reply email', 'NoReplyEmail'));
    }

    return NoReplyEmail;
}(ExtendableError);

var NoSearchArgs = function (_ExtendableError14) {
    _inherits(NoSearchArgs, _ExtendableError14);

    function NoSearchArgs(paramName) {
        _classCallCheck(this, NoSearchArgs);

        return _possibleConstructorReturn(this, (NoSearchArgs.__proto__ || Object.getPrototypeOf(NoSearchArgs)).call(this, 'Impossible to get emails without search arguments', 'NoSearchArgs'));
    }

    return NoSearchArgs;
}(ExtendableError);

var NoSearchArgsInstance = function (_ExtendableError15) {
    _inherits(NoSearchArgsInstance, _ExtendableError15);

    function NoSearchArgsInstance(paramName) {
        _classCallCheck(this, NoSearchArgsInstance);

        return _possibleConstructorReturn(this, (NoSearchArgsInstance.__proto__ || Object.getPrototypeOf(NoSearchArgsInstance)).call(this, 'Expecting a SearchArgs instance', 'NoSearchArgsInstance'));
    }

    return NoSearchArgsInstance;
}(ExtendableError);

var NoParamX = function (_ExtendableError16) {
    _inherits(NoParamX, _ExtendableError16);

    function NoParamX(paramName) {
        _classCallCheck(this, NoParamX);

        return _possibleConstructorReturn(this, (NoParamX.__proto__ || Object.getPrototypeOf(NoParamX)).call(this, 'Please provide the ' + paramName, 'NoParam' + _lodash2.default.capitalize(paramName)));
    }

    return NoParamX;
}(ExtendableError);

var WrongTypeParamX = function (_ExtendableError17) {
    _inherits(WrongTypeParamX, _ExtendableError17);

    function WrongTypeParamX(dType, paramName) {
        _classCallCheck(this, WrongTypeParamX);

        return _possibleConstructorReturn(this, (WrongTypeParamX.__proto__ || Object.getPrototypeOf(WrongTypeParamX)).call(this, 'Parameter ' + paramName + ' has to be of the type ' + dType, 'WrongTypeParam' + _lodash2.default.capitalize(paramName)));
    }

    return WrongTypeParamX;
}(ExtendableError);

var InvalidRecipientList = function (_ExtendableError18) {
    _inherits(InvalidRecipientList, _ExtendableError18);

    function InvalidRecipientList() {
        _classCallCheck(this, InvalidRecipientList);

        return _possibleConstructorReturn(this, (InvalidRecipientList.__proto__ || Object.getPrototypeOf(InvalidRecipientList)).call(this, "Expected format ('Name <email>'; or '<email>') wasn't matched", 'InvalidRecipientList'));
    }

    return InvalidRecipientList;
}(ExtendableError);

var InvalidFrom = function (_ExtendableError19) {
    _inherits(InvalidFrom, _ExtendableError19);

    function InvalidFrom() {
        _classCallCheck(this, InvalidFrom);

        return _possibleConstructorReturn(this, (InvalidFrom.__proto__ || Object.getPrototypeOf(InvalidFrom)).call(this, "Expected format ('Name <email>'; or '<email>') wasn't matched", 'InvalidFrom'));
    }

    return InvalidFrom;
}(ExtendableError);

var ParamsShouldBeObject = function (_ExtendableError20) {
    _inherits(ParamsShouldBeObject, _ExtendableError20);

    function ParamsShouldBeObject() {
        _classCallCheck(this, ParamsShouldBeObject);

        return _possibleConstructorReturn(this, (ParamsShouldBeObject.__proto__ || Object.getPrototypeOf(ParamsShouldBeObject)).call(this, 'Parameters should it be an object', 'ParamsShouldBeObject'));
    }

    return ParamsShouldBeObject;
}(ExtendableError);

var InvalidSendAt = function (_ExtendableError21) {
    _inherits(InvalidSendAt, _ExtendableError21);

    function InvalidSendAt() {
        _classCallCheck(this, InvalidSendAt);

        return _possibleConstructorReturn(this, (InvalidSendAt.__proto__ || Object.getPrototypeOf(InvalidSendAt)).call(this, "Expected format 'YYYY-MM-DD HH:mm:ss' wasn't matched", 'InvalidSendAt'));
    }

    return InvalidSendAt;
}(ExtendableError);

var TimeoutError = function (_ExtendableError22) {
    _inherits(TimeoutError, _ExtendableError22);

    function TimeoutError(timeout) {
        _classCallCheck(this, TimeoutError);

        return _possibleConstructorReturn(this, (TimeoutError.__proto__ || Object.getPrototypeOf(TimeoutError)).call(this, 'The server did not respond within the ' + timeout + ' second(s) you stipulated', 'InvalidSendAt'));
    }

    return TimeoutError;
}(ExtendableError);

exports.ApiError = ApiError;
exports.NoMail = NoMail;
exports.NoText = NoText;
exports.NoParamX = NoParamX;
exports.NoSubject = NoSubject;
exports.NoEndpoint = NoEndpoint;
exports.NoTemplate = NoTemplate;
exports.InvalidFrom = InvalidFrom;
exports.NoPublicKey = NoPublicKey;
exports.NoSecretKey = NoSecretKey;
exports.NoRecipient = NoRecipient;
exports.NoReplyEmail = NoReplyEmail;
exports.NoSearchArgs = NoSearchArgs;
exports.TimeoutError = TimeoutError;
exports.InvalidSendAt = InvalidSendAt;
exports.WrongTypeParamX = WrongTypeParamX;
exports.NotMailInstance = NotMailInstance;
exports.InvalidServerUri = InvalidServerUri;
exports.NoSearchArgsInstance = NoSearchArgsInstance;
exports.NoTemplateNoFeatures = NoTemplateNoFeatures;
exports.InvalidRecipientList = InvalidRecipientList;
exports.ParamsShouldBeObject = ParamsShouldBeObject;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9leGNlcHRpb25zLmpzIl0sIm5hbWVzIjpbIkV4dGVuZGFibGVFcnJvciIsIm1lc3NhZ2UiLCJuYW1lIiwiRXJyb3IiLCJjYXB0dXJlU3RhY2tUcmFjZSIsImNvbnN0cnVjdG9yIiwic3RhY2siLCJBcGlFcnJvciIsInJlYXNvbiIsIk5vVGV4dCIsIk5vVGVtcGxhdGUiLCJOb1RlbXBsYXRlTm9GZWF0dXJlcyIsIk5vTWFpbCIsIk5vdE1haWxJbnN0YW5jZSIsIk5vRW5kcG9pbnQiLCJOb1N1YmplY3QiLCJOb1JlY2lwaWVudCIsIk5vUHVibGljS2V5IiwiTm9TZWNyZXRLZXkiLCJJbnZhbGlkU2VydmVyVXJpIiwiTm9SZXBseUVtYWlsIiwiTm9TZWFyY2hBcmdzIiwicGFyYW1OYW1lIiwiTm9TZWFyY2hBcmdzSW5zdGFuY2UiLCJOb1BhcmFtWCIsImNhcGl0YWxpemUiLCJXcm9uZ1R5cGVQYXJhbVgiLCJkVHlwZSIsIkludmFsaWRSZWNpcGllbnRMaXN0IiwiSW52YWxpZEZyb20iLCJQYXJhbXNTaG91bGRCZU9iamVjdCIsIkludmFsaWRTZW5kQXQiLCJUaW1lb3V0RXJyb3IiLCJ0aW1lb3V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVNQSxlOzs7QUFDRiw2QkFBWUMsT0FBWixFQUFxQkMsSUFBckIsRUFBMkI7QUFBQTs7QUFBQSxzSUFDakJELE9BRGlCOztBQUV2QixjQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDQSxZQUFJLE9BQU9DLE1BQU1DLGlCQUFiLEtBQW1DLFVBQXZDLEVBQW1EO0FBQy9DRCxrQkFBTUMsaUJBQU4sUUFBOEIsTUFBS0MsV0FBbkM7QUFDSCxTQUZELE1BRU87QUFDSCxrQkFBS0MsS0FBTCxHQUFjLElBQUlILEtBQUosQ0FBVUYsT0FBVixDQUFELENBQXFCSyxLQUFsQztBQUNIO0FBUHNCO0FBUTFCOzs7RUFUeUJILEs7O0lBWXhCSSxROzs7QUFDRixzQkFBWUMsTUFBWixFQUFvQjtBQUFB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QUssTSxHQUFBQSxNO1FBQ0FILE0sR0FBQUEsTTtRQUNBZSxRLEdBQUFBLFE7UUFDQVQsUyxHQUFBQSxTO1FBQ0FELFUsR0FBQUEsVTtRQUNBSixVLEdBQUFBLFU7UUFDQW1CLFcsR0FBQUEsVztRQUNBWixXLEdBQUFBLFc7UUFDQUMsVyxHQUFBQSxXO1FBQ0FGLFcsR0FBQUEsVztRQUNBSSxZLEdBQUFBLFk7UUFDQUMsWSxHQUFBQSxZO1FBQ0FXLFksR0FBQUEsWTtRQUNBRCxhLEdBQUFBLGE7UUFDQUwsZSxHQUFBQSxlO1FBQ0FiLGUsR0FBQUEsZTtRQUNBTSxnQixHQUFBQSxnQjtRQUNBSSxvQixHQUFBQSxvQjtRQUNBWixvQixHQUFBQSxvQjtRQUNBaUIsb0IsR0FBQUEsb0I7UUFDQUUsb0IsR0FBQUEsb0IiLCJmaWxlIjoiZXhjZXB0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5cbmNsYXNzIEV4dGVuZGFibGVFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBuYW1lKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICBpZiAodHlwZW9mIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhY2sgPSAobmV3IEVycm9yKG1lc3NhZ2UpKS5zdGFjaztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuY2xhc3MgQXBpRXJyb3IgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKHJlYXNvbikge1xuICAgICAgICBzdXBlcihgTWl0dGVQcm9FcnJvci4gUmVhc29uOiAke3JlYXNvbn1gLCAnQXBpRXJyb3InKTtcbiAgICB9XG59XG5cbmNsYXNzIE5vVGV4dCBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdJbXBvc3NpYmxlIHRvIHNlbmQgYSBzaW1wbGUgZW1haWwgd2l0aG91dCBhIHRleHQgY29udGVudCcsICdOb1RleHQnKTtcbiAgICB9XG59XG5cbmNsYXNzIE5vVGVtcGxhdGUgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgICdJbXBvc3NpYmxlIHRvIHNlbmQgYSB0ZW1wbGF0ZSBlbWFpbCB3aXRob3V0IGEgaHRtbCBjb250ZW50LiAnICtcbiAgICAgICAgICAgICdFaXRoZXIgeW91IHBhc3MgdGhlIHRlbXBsYXRlU2x1ZyBvciB0aGUgbWVzc2FnZUh0bWwnLFxuICAgICAgICAgICAgJ05vVGVtcGxhdGUnXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jbGFzcyBOb1RlbXBsYXRlTm9GZWF0dXJlcyBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgXCJJbXBvc3NpYmxlIHRvIHVzZSB0ZW1wbGF0ZSBmZWF0dXJlcywgd2l0aG91dCBwYXNzaW5nICd0ZW1wbGF0ZVNsdWcnXCIsXG4gICAgICAgICAgICAnTm9UZW1wbGF0ZU5vRmVhdHVyZXMnXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jbGFzcyBOb01haWwgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihcIkltcG9zc2libGUgdG8gc2VuZCBhbiBlbWFpbCBpZiB0aGVyZSdzIG5vIG1haWxcIiwgJ05vTWFpbCcpO1xuICAgIH1cbn1cblxuY2xhc3MgTm90TWFpbEluc3RhbmNlIGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ0V4cGVjdGluZyBhIE1haWwgaW5zdGFuY2UnLCAnTm90TWFpbEluc3RhbmNlJyk7XG4gICAgfVxufVxuXG5jbGFzcyBOb0VuZHBvaW50IGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ0ltcG9zc2libGUgdG8gZ2V0IHRoZSBwYXlsb2FkIHdpdGhvdXQgdGhlIGVuZHBvaW50JywgJ05vRW5kcG9pbnQnKTtcbiAgICB9XG59XG5cbmNsYXNzIE5vU3ViamVjdCBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdJbXBvc3NpYmxlIHRvIHNlbmQgZW1haWwgd2l0aG91dCBhIHN1YmplY3QnLCAnTm9TdWJqZWN0Jyk7XG4gICAgfVxufVxuXG5jbGFzcyBOb1JlY2lwaWVudCBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdJbXBvc3NpYmxlIHRvIHNlbmQgZW1haWwgd2l0aG91dCBhbnkgcmVjaXBpZW50JywgJ05vUmVjaXBpZW50Jyk7XG4gICAgfVxufVxuXG5jbGFzcyBOb1B1YmxpY0tleSBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFwiTWl0dGVQcm9FcnJvci4gVGhlcmUncyBubyBQdWJsaWMgS2V5LlwiLCAnTm9QdWJsaWNLZXknKTtcbiAgICB9XG59XG5cbmNsYXNzIE5vU2VjcmV0S2V5IGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoXCJNaXR0ZVByb0Vycm9yLiBUaGVyZSdzIG5vIFNlY3JldCBLZXkuXCIsICdOb1NlY3JldEtleScpO1xuICAgIH1cbn1cblxuY2xhc3MgSW52YWxpZFNlcnZlclVyaSBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdNaXR0ZVByb0Vycm9yLiBJbnZhbGlkIHNlcnZlciB1cmksIGl0IHdhcyBleHBlY3RpbmcgYSBzdHJpbmcuJywgJ0ludmFsaWRTZXJ2ZXJVcmknKTtcbiAgICB9XG59XG5cbmNsYXNzIE5vUmVwbHlFbWFpbCBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdQbGVhc2UgcHJvdmlkZSBhbiByZXBseSBlbWFpbCcsICdOb1JlcGx5RW1haWwnKTtcbiAgICB9XG59XG5cbmNsYXNzIE5vU2VhcmNoQXJncyBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IocGFyYW1OYW1lKSB7XG4gICAgICAgIHN1cGVyKCdJbXBvc3NpYmxlIHRvIGdldCBlbWFpbHMgd2l0aG91dCBzZWFyY2ggYXJndW1lbnRzJywgJ05vU2VhcmNoQXJncycpO1xuICAgIH1cbn1cblxuY2xhc3MgTm9TZWFyY2hBcmdzSW5zdGFuY2UgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKHBhcmFtTmFtZSkge1xuICAgICAgICBzdXBlcignRXhwZWN0aW5nIGEgU2VhcmNoQXJncyBpbnN0YW5jZScsICdOb1NlYXJjaEFyZ3NJbnN0YW5jZScpO1xuICAgIH1cbn1cblxuY2xhc3MgTm9QYXJhbVggZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKHBhcmFtTmFtZSkge1xuICAgICAgICBzdXBlcihgUGxlYXNlIHByb3ZpZGUgdGhlICR7cGFyYW1OYW1lfWAsIGBOb1BhcmFtJHtfLmNhcGl0YWxpemUocGFyYW1OYW1lKX1gKTtcbiAgICB9XG59XG5cbmNsYXNzIFdyb25nVHlwZVBhcmFtWCBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoZFR5cGUsIHBhcmFtTmFtZSkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIGBQYXJhbWV0ZXIgJHtwYXJhbU5hbWV9IGhhcyB0byBiZSBvZiB0aGUgdHlwZSAke2RUeXBlfWAsXG4gICAgICAgICAgICBgV3JvbmdUeXBlUGFyYW0ke18uY2FwaXRhbGl6ZShwYXJhbU5hbWUpfWBcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNsYXNzIEludmFsaWRSZWNpcGllbnRMaXN0IGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBcIkV4cGVjdGVkIGZvcm1hdCAoJ05hbWUgPGVtYWlsPic7IG9yICc8ZW1haWw+Jykgd2Fzbid0IG1hdGNoZWRcIixcbiAgICAgICAgICAgICdJbnZhbGlkUmVjaXBpZW50TGlzdCdcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNsYXNzIEludmFsaWRGcm9tIGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoXCJFeHBlY3RlZCBmb3JtYXQgKCdOYW1lIDxlbWFpbD4nOyBvciAnPGVtYWlsPicpIHdhc24ndCBtYXRjaGVkXCIsICdJbnZhbGlkRnJvbScpO1xuICAgIH1cbn1cblxuY2xhc3MgUGFyYW1zU2hvdWxkQmVPYmplY3QgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcignUGFyYW1ldGVycyBzaG91bGQgaXQgYmUgYW4gb2JqZWN0JywgJ1BhcmFtc1Nob3VsZEJlT2JqZWN0Jyk7XG4gICAgfVxufVxuXG5jbGFzcyBJbnZhbGlkU2VuZEF0IGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoXCJFeHBlY3RlZCBmb3JtYXQgJ1lZWVktTU0tREQgSEg6bW06c3MnIHdhc24ndCBtYXRjaGVkXCIsICdJbnZhbGlkU2VuZEF0Jyk7XG4gICAgfVxufVxuXG5jbGFzcyBUaW1lb3V0RXJyb3IgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKHRpbWVvdXQpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBgVGhlIHNlcnZlciBkaWQgbm90IHJlc3BvbmQgd2l0aGluIHRoZSAke3RpbWVvdXR9IHNlY29uZChzKSB5b3Ugc3RpcHVsYXRlZGAsXG4gICAgICAgICAgICAnSW52YWxpZFNlbmRBdCdcbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IHtcbiAgICBBcGlFcnJvcixcbiAgICBOb01haWwsXG4gICAgTm9UZXh0LFxuICAgIE5vUGFyYW1YLFxuICAgIE5vU3ViamVjdCxcbiAgICBOb0VuZHBvaW50LFxuICAgIE5vVGVtcGxhdGUsXG4gICAgSW52YWxpZEZyb20sXG4gICAgTm9QdWJsaWNLZXksXG4gICAgTm9TZWNyZXRLZXksXG4gICAgTm9SZWNpcGllbnQsXG4gICAgTm9SZXBseUVtYWlsLFxuICAgIE5vU2VhcmNoQXJncyxcbiAgICBUaW1lb3V0RXJyb3IsXG4gICAgSW52YWxpZFNlbmRBdCxcbiAgICBXcm9uZ1R5cGVQYXJhbVgsXG4gICAgTm90TWFpbEluc3RhbmNlLFxuICAgIEludmFsaWRTZXJ2ZXJVcmksXG4gICAgTm9TZWFyY2hBcmdzSW5zdGFuY2UsXG4gICAgTm9UZW1wbGF0ZU5vRmVhdHVyZXMsXG4gICAgSW52YWxpZFJlY2lwaWVudExpc3QsXG4gICAgUGFyYW1zU2hvdWxkQmVPYmplY3QsXG59O1xuIl19