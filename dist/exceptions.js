'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ParamsShouldBeObject = exports.InvalidRecipientList = exports.NoTemplateNoFeatures = exports.NoSearchArgsInstance = exports.InvalidServerUri = exports.NotMailInstance = exports.WrongTypeParamX = exports.InvalidSendAt = exports.NoSearchArgs = exports.NoReplyEmail = exports.NoRecipient = exports.NoSecretKey = exports.NoPublicKey = exports.InvalidFrom = exports.NoTemplate = exports.NoEndpoint = exports.NoSubject = exports.NoParamX = exports.NoText = exports.NoMail = exports.ApiError = undefined;

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
exports.InvalidSendAt = InvalidSendAt;
exports.WrongTypeParamX = WrongTypeParamX;
exports.NotMailInstance = NotMailInstance;
exports.InvalidServerUri = InvalidServerUri;
exports.NoSearchArgsInstance = NoSearchArgsInstance;
exports.NoTemplateNoFeatures = NoTemplateNoFeatures;
exports.InvalidRecipientList = InvalidRecipientList;
exports.ParamsShouldBeObject = ParamsShouldBeObject;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9leGNlcHRpb25zLmpzIl0sIm5hbWVzIjpbIkV4dGVuZGFibGVFcnJvciIsIm1lc3NhZ2UiLCJuYW1lIiwiRXJyb3IiLCJjYXB0dXJlU3RhY2tUcmFjZSIsImNvbnN0cnVjdG9yIiwic3RhY2siLCJBcGlFcnJvciIsInJlYXNvbiIsIk5vVGV4dCIsIk5vVGVtcGxhdGUiLCJOb1RlbXBsYXRlTm9GZWF0dXJlcyIsIk5vTWFpbCIsIk5vdE1haWxJbnN0YW5jZSIsIk5vRW5kcG9pbnQiLCJOb1N1YmplY3QiLCJOb1JlY2lwaWVudCIsIk5vUHVibGljS2V5IiwiTm9TZWNyZXRLZXkiLCJJbnZhbGlkU2VydmVyVXJpIiwiTm9SZXBseUVtYWlsIiwiTm9TZWFyY2hBcmdzIiwicGFyYW1OYW1lIiwiTm9TZWFyY2hBcmdzSW5zdGFuY2UiLCJOb1BhcmFtWCIsImNhcGl0YWxpemUiLCJXcm9uZ1R5cGVQYXJhbVgiLCJkVHlwZSIsIkludmFsaWRSZWNpcGllbnRMaXN0IiwiSW52YWxpZEZyb20iLCJQYXJhbXNTaG91bGRCZU9iamVjdCIsIkludmFsaWRTZW5kQXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRU1BLGU7OztBQUNGLDZCQUFZQyxPQUFaLEVBQXFCQyxJQUFyQixFQUEyQjtBQUFBOztBQUFBLHNJQUNqQkQsT0FEaUI7O0FBRXZCLGNBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUNBLFlBQUksT0FBT0MsTUFBTUMsaUJBQWIsS0FBbUMsVUFBdkMsRUFBbUQ7QUFDL0NELGtCQUFNQyxpQkFBTixRQUE4QixNQUFLQyxXQUFuQztBQUNILFNBRkQsTUFFTztBQUNILGtCQUFLQyxLQUFMLEdBQWMsSUFBSUgsS0FBSixDQUFVRixPQUFWLENBQUQsQ0FBcUJLLEtBQWxDO0FBQ0g7QUFQc0I7QUFRMUI7OztFQVR5QkgsSzs7SUFZeEJJLFE7OztBQUNGLHNCQUFZQyxNQUFaLEVBQW9CO0FBQUE7O0FBQUEsK0lBQ2dCQSxNQURoQixFQUMw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LFcsR0FBQUEsVztRQUNBQyxXLEdBQUFBLFc7UUFDQUYsVyxHQUFBQSxXO1FBQ0FJLFksR0FBQUEsWTtRQUNBQyxZLEdBQUFBLFk7UUFDQVUsYSxHQUFBQSxhO1FBQ0FMLGUsR0FBQUEsZTtRQUNBYixlLEdBQUFBLGU7UUFDQU0sZ0IsR0FBQUEsZ0I7UUFDQUksb0IsR0FBQUEsb0I7UUFDQVosb0IsR0FBQUEsb0I7UUFDQWlCLG9CLEdBQUFBLG9CO1FBQ0FFLG9CLEdBQUFBLG9CIiwiZmlsZSI6ImV4Y2VwdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuXG5jbGFzcyBFeHRlbmRhYmxlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgbmFtZSkge1xuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgaWYgKHR5cGVvZiBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN0YWNrID0gKG5ldyBFcnJvcihtZXNzYWdlKSkuc3RhY2s7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNsYXNzIEFwaUVycm9yIGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihyZWFzb24pIHtcbiAgICAgICAgc3VwZXIoYE1pdHRlUHJvRXJyb3IuIFJlYXNvbjogJHtyZWFzb259YCwgJ0FwaUVycm9yJyk7XG4gICAgfVxufVxuXG5jbGFzcyBOb1RleHQgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcignSW1wb3NzaWJsZSB0byBzZW5kIGEgc2ltcGxlIGVtYWlsIHdpdGhvdXQgYSB0ZXh0IGNvbnRlbnQnLCAnTm9UZXh0Jyk7XG4gICAgfVxufVxuXG5jbGFzcyBOb1RlbXBsYXRlIGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICAnSW1wb3NzaWJsZSB0byBzZW5kIGEgdGVtcGxhdGUgZW1haWwgd2l0aG91dCBhIGh0bWwgY29udGVudC4gJyArXG4gICAgICAgICAgICAnRWl0aGVyIHlvdSBwYXNzIHRoZSB0ZW1wbGF0ZVNsdWcgb3IgdGhlIG1lc3NhZ2VIdG1sJyxcbiAgICAgICAgICAgICdOb1RlbXBsYXRlJ1xuICAgICAgICApO1xuICAgIH1cbn1cblxuY2xhc3MgTm9UZW1wbGF0ZU5vRmVhdHVyZXMgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIFwiSW1wb3NzaWJsZSB0byB1c2UgdGVtcGxhdGUgZmVhdHVyZXMsIHdpdGhvdXQgcGFzc2luZyAndGVtcGxhdGVTbHVnJ1wiLFxuICAgICAgICAgICAgJ05vVGVtcGxhdGVOb0ZlYXR1cmVzJ1xuICAgICAgICApO1xuICAgIH1cbn1cblxuY2xhc3MgTm9NYWlsIGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoXCJJbXBvc3NpYmxlIHRvIHNlbmQgYW4gZW1haWwgaWYgdGhlcmUncyBubyBtYWlsXCIsICdOb01haWwnKTtcbiAgICB9XG59XG5cbmNsYXNzIE5vdE1haWxJbnN0YW5jZSBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdFeHBlY3RpbmcgYSBNYWlsIGluc3RhbmNlJywgJ05vdE1haWxJbnN0YW5jZScpO1xuICAgIH1cbn1cblxuY2xhc3MgTm9FbmRwb2ludCBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdJbXBvc3NpYmxlIHRvIGdldCB0aGUgcGF5bG9hZCB3aXRob3V0IHRoZSBlbmRwb2ludCcsICdOb0VuZHBvaW50Jyk7XG4gICAgfVxufVxuXG5jbGFzcyBOb1N1YmplY3QgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcignSW1wb3NzaWJsZSB0byBzZW5kIGVtYWlsIHdpdGhvdXQgYSBzdWJqZWN0JywgJ05vU3ViamVjdCcpO1xuICAgIH1cbn1cblxuY2xhc3MgTm9SZWNpcGllbnQgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcignSW1wb3NzaWJsZSB0byBzZW5kIGVtYWlsIHdpdGhvdXQgYW55IHJlY2lwaWVudCcsICdOb1JlY2lwaWVudCcpO1xuICAgIH1cbn1cblxuY2xhc3MgTm9QdWJsaWNLZXkgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihcIk1pdHRlUHJvRXJyb3IuIFRoZXJlJ3Mgbm8gUHVibGljIEtleS5cIiwgJ05vUHVibGljS2V5Jyk7XG4gICAgfVxufVxuXG5jbGFzcyBOb1NlY3JldEtleSBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFwiTWl0dGVQcm9FcnJvci4gVGhlcmUncyBubyBTZWNyZXQgS2V5LlwiLCAnTm9TZWNyZXRLZXknKTtcbiAgICB9XG59XG5cbmNsYXNzIEludmFsaWRTZXJ2ZXJVcmkgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcignTWl0dGVQcm9FcnJvci4gSW52YWxpZCBzZXJ2ZXIgdXJpLCBpdCB3YXMgZXhwZWN0aW5nIGEgc3RyaW5nLicsICdJbnZhbGlkU2VydmVyVXJpJyk7XG4gICAgfVxufVxuXG5jbGFzcyBOb1JlcGx5RW1haWwgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcignUGxlYXNlIHByb3ZpZGUgYW4gcmVwbHkgZW1haWwnLCAnTm9SZXBseUVtYWlsJyk7XG4gICAgfVxufVxuXG5jbGFzcyBOb1NlYXJjaEFyZ3MgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKHBhcmFtTmFtZSkge1xuICAgICAgICBzdXBlcignSW1wb3NzaWJsZSB0byBnZXQgZW1haWxzIHdpdGhvdXQgc2VhcmNoIGFyZ3VtZW50cycsICdOb1NlYXJjaEFyZ3MnKTtcbiAgICB9XG59XG5cbmNsYXNzIE5vU2VhcmNoQXJnc0luc3RhbmNlIGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJhbU5hbWUpIHtcbiAgICAgICAgc3VwZXIoJ0V4cGVjdGluZyBhIFNlYXJjaEFyZ3MgaW5zdGFuY2UnLCAnTm9TZWFyY2hBcmdzSW5zdGFuY2UnKTtcbiAgICB9XG59XG5cbmNsYXNzIE5vUGFyYW1YIGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJhbU5hbWUpIHtcbiAgICAgICAgc3VwZXIoYFBsZWFzZSBwcm92aWRlIHRoZSAke3BhcmFtTmFtZX1gLCBgTm9QYXJhbSR7Xy5jYXBpdGFsaXplKHBhcmFtTmFtZSl9YCk7XG4gICAgfVxufVxuXG5jbGFzcyBXcm9uZ1R5cGVQYXJhbVggZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKGRUeXBlLCBwYXJhbU5hbWUpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBgUGFyYW1ldGVyICR7cGFyYW1OYW1lfSBoYXMgdG8gYmUgb2YgdGhlIHR5cGUgJHtkVHlwZX1gLFxuICAgICAgICAgICAgYFdyb25nVHlwZVBhcmFtJHtfLmNhcGl0YWxpemUocGFyYW1OYW1lKX1gXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jbGFzcyBJbnZhbGlkUmVjaXBpZW50TGlzdCBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgXCJFeHBlY3RlZCBmb3JtYXQgKCdOYW1lIDxlbWFpbD4nOyBvciAnPGVtYWlsPicpIHdhc24ndCBtYXRjaGVkXCIsXG4gICAgICAgICAgICAnSW52YWxpZFJlY2lwaWVudExpc3QnXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jbGFzcyBJbnZhbGlkRnJvbSBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFwiRXhwZWN0ZWQgZm9ybWF0ICgnTmFtZSA8ZW1haWw+Jzsgb3IgJzxlbWFpbD4nKSB3YXNuJ3QgbWF0Y2hlZFwiLCAnSW52YWxpZEZyb20nKTtcbiAgICB9XG59XG5cbmNsYXNzIFBhcmFtc1Nob3VsZEJlT2JqZWN0IGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ1BhcmFtZXRlcnMgc2hvdWxkIGl0IGJlIGFuIG9iamVjdCcsICdQYXJhbXNTaG91bGRCZU9iamVjdCcpO1xuICAgIH1cbn1cblxuY2xhc3MgSW52YWxpZFNlbmRBdCBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFwiRXhwZWN0ZWQgZm9ybWF0ICdZWVlZLU1NLUREIEhIOm1tOnNzJyB3YXNuJ3QgbWF0Y2hlZFwiLCAnSW52YWxpZFNlbmRBdCcpO1xuICAgIH1cbn1cblxuXG5leHBvcnQge1xuICAgIEFwaUVycm9yLFxuICAgIE5vTWFpbCxcbiAgICBOb1RleHQsXG4gICAgTm9QYXJhbVgsXG4gICAgTm9TdWJqZWN0LFxuICAgIE5vRW5kcG9pbnQsXG4gICAgTm9UZW1wbGF0ZSxcbiAgICBJbnZhbGlkRnJvbSxcbiAgICBOb1B1YmxpY0tleSxcbiAgICBOb1NlY3JldEtleSxcbiAgICBOb1JlY2lwaWVudCxcbiAgICBOb1JlcGx5RW1haWwsXG4gICAgTm9TZWFyY2hBcmdzLFxuICAgIEludmFsaWRTZW5kQXQsXG4gICAgV3JvbmdUeXBlUGFyYW1YLFxuICAgIE5vdE1haWxJbnN0YW5jZSxcbiAgICBJbnZhbGlkU2VydmVyVXJpLFxuICAgIE5vU2VhcmNoQXJnc0luc3RhbmNlLFxuICAgIE5vVGVtcGxhdGVOb0ZlYXR1cmVzLFxuICAgIEludmFsaWRSZWNpcGllbnRMaXN0LFxuICAgIFBhcmFtc1Nob3VsZEJlT2JqZWN0LFxufTtcbiJdfQ==