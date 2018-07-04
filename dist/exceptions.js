'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AttachmentFileShouldBeBase64 = exports.AttachmentShouldHaveFile = exports.AttachmentShouldHaveName = exports.AttachmentShouldBeObject = exports.AttachmentsShouldBeList = exports.ParamsShouldBeObject = exports.InvalidRecipientList = exports.NoTemplateNoFeatures = exports.NoSearchArgsInstance = exports.AttachmentsSizeLimit = exports.AttachmentSizeLimit = exports.InvalidServerUri = exports.NotMailInstance = exports.WrongTypeParamX = exports.InvalidSendAt = exports.TimeoutError = exports.NoSearchArgs = exports.NoReplyEmail = exports.NoRecipient = exports.NoSecretKey = exports.NoPublicKey = exports.InvalidFrom = exports.NoTemplate = exports.NoEndpoint = exports.NoContent = exports.NoSubject = exports.NoParamX = exports.NoMail = exports.ApiError = undefined;

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

var NoContent = function (_ExtendableError2) {
    _inherits(NoContent, _ExtendableError2);

    function NoContent() {
        _classCallCheck(this, NoContent);

        return _possibleConstructorReturn(this, (NoContent.__proto__ || Object.getPrototypeOf(NoContent)).call(this, 'Impossible to send a simple email without content. Pass one of these arguments: ' + '"message_text", "message_html" ou "attachments"', 'NoContent'));
    }

    return NoContent;
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

        return _possibleConstructorReturn(this, (TimeoutError.__proto__ || Object.getPrototypeOf(TimeoutError)).call(this, 'The server did not respond within the ' + timeout + ' second(s) you stipulated', 'TimeoutError'));
    }

    return TimeoutError;
}(ExtendableError);

var AttachmentsShouldBeList = function (_ExtendableError23) {
    _inherits(AttachmentsShouldBeList, _ExtendableError23);

    function AttachmentsShouldBeList() {
        _classCallCheck(this, AttachmentsShouldBeList);

        return _possibleConstructorReturn(this, (AttachmentsShouldBeList.__proto__ || Object.getPrototypeOf(AttachmentsShouldBeList)).call(this, 'Attachments should be a List of objects. \n            Like: [{name: \'foo.bar\', file: \'IJHJHbkhyi876\'}]', 'AttachmentsShouldBeList'));
    }

    return AttachmentsShouldBeList;
}(ExtendableError);

var AttachmentShouldBeObject = function (_ExtendableError24) {
    _inherits(AttachmentShouldBeObject, _ExtendableError24);

    function AttachmentShouldBeObject() {
        _classCallCheck(this, AttachmentShouldBeObject);

        return _possibleConstructorReturn(this, (AttachmentShouldBeObject.__proto__ || Object.getPrototypeOf(AttachmentShouldBeObject)).call(this, 'Attachment should be an object. \n            Like: {name: \'foo.bar\', file: \'IJHJHbkhyi876\'}', 'AttachmentShouldBeObject'));
    }

    return AttachmentShouldBeObject;
}(ExtendableError);

var AttachmentShouldHaveName = function (_ExtendableError25) {
    _inherits(AttachmentShouldHaveName, _ExtendableError25);

    function AttachmentShouldHaveName() {
        _classCallCheck(this, AttachmentShouldHaveName);

        return _possibleConstructorReturn(this, (AttachmentShouldHaveName.__proto__ || Object.getPrototypeOf(AttachmentShouldHaveName)).call(this, 'Attachment should have an name. \n            Like: {name: \'foo.bar\', file: \'IJHJHbkhyi876\'}', 'AttachmentShouldHaveName'));
    }

    return AttachmentShouldHaveName;
}(ExtendableError);

var AttachmentShouldHaveFile = function (_ExtendableError26) {
    _inherits(AttachmentShouldHaveFile, _ExtendableError26);

    function AttachmentShouldHaveFile() {
        _classCallCheck(this, AttachmentShouldHaveFile);

        return _possibleConstructorReturn(this, (AttachmentShouldHaveFile.__proto__ || Object.getPrototypeOf(AttachmentShouldHaveFile)).call(this, 'Attachment should have the contents of the file in base64. \n            Like: {name: \'foo.bar\', file: \'IJHJHbkhyi876\'}', 'AttachmentShouldHaveFile'));
    }

    return AttachmentShouldHaveFile;
}(ExtendableError);

var AttachmentFileShouldBeBase64 = function (_ExtendableError27) {
    _inherits(AttachmentFileShouldBeBase64, _ExtendableError27);

    function AttachmentFileShouldBeBase64() {
        _classCallCheck(this, AttachmentFileShouldBeBase64);

        return _possibleConstructorReturn(this, (AttachmentFileShouldBeBase64.__proto__ || Object.getPrototypeOf(AttachmentFileShouldBeBase64)).call(this, 'Attachment file should be in base64.', 'AttachmentFileShouldBeBase64'));
    }

    return AttachmentFileShouldBeBase64;
}(ExtendableError);

var AttachmentSizeLimit = function (_ExtendableError28) {
    _inherits(AttachmentSizeLimit, _ExtendableError28);

    function AttachmentSizeLimit(limit, name, diff) {
        _classCallCheck(this, AttachmentSizeLimit);

        return _possibleConstructorReturn(this, (AttachmentSizeLimit.__proto__ || Object.getPrototypeOf(AttachmentSizeLimit)).call(this, 'The size of one of the attachments exceeds the of ' + limit + ' MB allowed. \n            The attachment \'' + name + '\' exceeds in ' + diff + ' MB', 'AttachmentSizeLimit'));
    }

    return AttachmentSizeLimit;
}(ExtendableError);

var AttachmentsSizeLimit = function (_ExtendableError29) {
    _inherits(AttachmentsSizeLimit, _ExtendableError29);

    function AttachmentsSizeLimit(limit, diff) {
        _classCallCheck(this, AttachmentsSizeLimit);

        return _possibleConstructorReturn(this, (AttachmentsSizeLimit.__proto__ || Object.getPrototypeOf(AttachmentsSizeLimit)).call(this, 'The sum of the size of the attachments exceeds the ' + limit + ' MB allowed. \n            The total exceeds in ' + diff + ' MB', 'AttachmentSizeLimit'));
    }

    return AttachmentsSizeLimit;
}(ExtendableError);

exports.ApiError = ApiError;
exports.NoMail = NoMail;
exports.NoParamX = NoParamX;
exports.NoSubject = NoSubject;
exports.NoContent = NoContent;
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
exports.AttachmentSizeLimit = AttachmentSizeLimit;
exports.AttachmentsSizeLimit = AttachmentsSizeLimit;
exports.NoSearchArgsInstance = NoSearchArgsInstance;
exports.NoTemplateNoFeatures = NoTemplateNoFeatures;
exports.InvalidRecipientList = InvalidRecipientList;
exports.ParamsShouldBeObject = ParamsShouldBeObject;
exports.AttachmentsShouldBeList = AttachmentsShouldBeList;
exports.AttachmentShouldBeObject = AttachmentShouldBeObject;
exports.AttachmentShouldHaveName = AttachmentShouldHaveName;
exports.AttachmentShouldHaveFile = AttachmentShouldHaveFile;
exports.AttachmentFileShouldBeBase64 = AttachmentFileShouldBeBase64;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9leGNlcHRpb25zLmpzIl0sIm5hbWVzIjpbIkV4dGVuZGFibGVFcnJvciIsIm1lc3NhZ2UiLCJuYW1lIiwiRXJyb3IiLCJjYXB0dXJlU3RhY2tUcmFjZSIsImNvbnN0cnVjdG9yIiwic3RhY2siLCJBcGlFcnJvciIsInJlYXNvbiIsIk5vQ29udGVudCIsIk5vVGVtcGxhdGUiLCJOb1RlbXBsYXRlTm9GZWF0dXJlcyIsIk5vTWFpbCIsIk5vdE1haWxJbnN0YW5jZSIsIk5vRW5kcG9pbnQiLCJOb1N1YmplY3QiLCJOb1JlY2lwaWVudCIsIk5vUHVibGljS2V5IiwiTm9TZWNyZXRLZXkiLCJJbnZhbGlkU2VydmVyVXJpIiwiTm9SZXBseUVtYWlsIiwiTm9TZWFyY2hBcmdzIiwicGFyYW1OYW1lIiwiTm9TZWFyY2hBcmdzSW5zdGFuY2UiLCJOb1BhcmFtWCIsImNhcGl0YWxpemUiLCJXcm9uZ1R5cGVQYXJhbVgiLCJkVHlwZSIsIkludmFsaWRSZWNpcGllbnRMaXN0IiwiSW52YWxpZEZyb20iLCJQYXJhbXNTaG91bGRCZU9iamVjdCIsIkludmFsaWRTZW5kQXQiLCJUaW1lb3V0RXJyb3IiLCJ0aW1lb3V0IiwiQXR0YWNobWVudHNTaG91bGRCZUxpc3QiLCJBdHRhY2htZW50U2hvdWxkQmVPYmplY3QiLCJBdHRhY2htZW50U2hvdWxkSGF2ZU5hbWUiLCJBdHRhY2htZW50U2hvdWxkSGF2ZUZpbGUiLCJBdHRhY2htZW50RmlsZVNob3VsZEJlQmFzZTY0IiwiQXR0YWNobWVudFNpemVMaW1pdCIsImxpbWl0IiwiZGlmZiIsIkF0dGFjaG1lbnRzU2l6ZUxpbWl0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVNQSxlOzs7QUFDRiw2QkFBWUMsT0FBWixFQUFxQkMsSUFBckIsRUFBMkI7QUFBQTs7QUFBQSxzSUFDakJELE9BRGlCOztBQUV2QixjQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDQSxZQUFJLE9BQU9DLE1BQU1DLGlCQUFi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QSxVO1FBQ0FtQixXLEdBQUFBLFc7UUFDQVosVyxHQUFBQSxXO1FBQ0FDLFcsR0FBQUEsVztRQUNBRixXLEdBQUFBLFc7UUFDQUksWSxHQUFBQSxZO1FBQ0FDLFksR0FBQUEsWTtRQUNBVyxZLEdBQUFBLFk7UUFDQUQsYSxHQUFBQSxhO1FBQ0FMLGUsR0FBQUEsZTtRQUNBYixlLEdBQUFBLGU7UUFDQU0sZ0IsR0FBQUEsZ0I7UUFDQW9CLG1CLEdBQUFBLG1CO1FBQ0FHLG9CLEdBQUFBLG9CO1FBQ0FuQixvQixHQUFBQSxvQjtRQUNBWixvQixHQUFBQSxvQjtRQUNBaUIsb0IsR0FBQUEsb0I7UUFDQUUsb0IsR0FBQUEsb0I7UUFDQUksdUIsR0FBQUEsdUI7UUFDQUMsd0IsR0FBQUEsd0I7UUFDQUMsd0IsR0FBQUEsd0I7UUFDQUMsd0IsR0FBQUEsd0I7UUFDQUMsNEIsR0FBQUEsNEIiLCJmaWxlIjoiZXhjZXB0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5cbmNsYXNzIEV4dGVuZGFibGVFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBuYW1lKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICBpZiAodHlwZW9mIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhY2sgPSAobmV3IEVycm9yKG1lc3NhZ2UpKS5zdGFjaztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuY2xhc3MgQXBpRXJyb3IgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKHJlYXNvbikge1xuICAgICAgICBzdXBlcihgTWl0dGVQcm9FcnJvci4gUmVhc29uOiAke3JlYXNvbn1gLCAnQXBpRXJyb3InKTtcbiAgICB9XG59XG5cbmNsYXNzIE5vQ29udGVudCBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdJbXBvc3NpYmxlIHRvIHNlbmQgYSBzaW1wbGUgZW1haWwgd2l0aG91dCBjb250ZW50LiBQYXNzIG9uZSBvZiB0aGVzZSBhcmd1bWVudHM6ICcgK1xuICAgICAgICAgICAgJ1wibWVzc2FnZV90ZXh0XCIsIFwibWVzc2FnZV9odG1sXCIgb3UgXCJhdHRhY2htZW50c1wiJywgJ05vQ29udGVudCcpO1xuICAgIH1cbn1cblxuY2xhc3MgTm9UZW1wbGF0ZSBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgJ0ltcG9zc2libGUgdG8gc2VuZCBhIHRlbXBsYXRlIGVtYWlsIHdpdGhvdXQgYSBodG1sIGNvbnRlbnQuICcgK1xuICAgICAgICAgICAgJ0VpdGhlciB5b3UgcGFzcyB0aGUgdGVtcGxhdGVTbHVnIG9yIHRoZSBtZXNzYWdlSHRtbCcsXG4gICAgICAgICAgICAnTm9UZW1wbGF0ZSdcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNsYXNzIE5vVGVtcGxhdGVOb0ZlYXR1cmVzIGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBcIkltcG9zc2libGUgdG8gdXNlIHRlbXBsYXRlIGZlYXR1cmVzLCB3aXRob3V0IHBhc3NpbmcgJ3RlbXBsYXRlU2x1ZydcIixcbiAgICAgICAgICAgICdOb1RlbXBsYXRlTm9GZWF0dXJlcydcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNsYXNzIE5vTWFpbCBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFwiSW1wb3NzaWJsZSB0byBzZW5kIGFuIGVtYWlsIGlmIHRoZXJlJ3Mgbm8gbWFpbFwiLCAnTm9NYWlsJyk7XG4gICAgfVxufVxuXG5jbGFzcyBOb3RNYWlsSW5zdGFuY2UgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcignRXhwZWN0aW5nIGEgTWFpbCBpbnN0YW5jZScsICdOb3RNYWlsSW5zdGFuY2UnKTtcbiAgICB9XG59XG5cbmNsYXNzIE5vRW5kcG9pbnQgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcignSW1wb3NzaWJsZSB0byBnZXQgdGhlIHBheWxvYWQgd2l0aG91dCB0aGUgZW5kcG9pbnQnLCAnTm9FbmRwb2ludCcpO1xuICAgIH1cbn1cblxuY2xhc3MgTm9TdWJqZWN0IGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ0ltcG9zc2libGUgdG8gc2VuZCBlbWFpbCB3aXRob3V0IGEgc3ViamVjdCcsICdOb1N1YmplY3QnKTtcbiAgICB9XG59XG5cbmNsYXNzIE5vUmVjaXBpZW50IGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ0ltcG9zc2libGUgdG8gc2VuZCBlbWFpbCB3aXRob3V0IGFueSByZWNpcGllbnQnLCAnTm9SZWNpcGllbnQnKTtcbiAgICB9XG59XG5cbmNsYXNzIE5vUHVibGljS2V5IGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoXCJNaXR0ZVByb0Vycm9yLiBUaGVyZSdzIG5vIFB1YmxpYyBLZXkuXCIsICdOb1B1YmxpY0tleScpO1xuICAgIH1cbn1cblxuY2xhc3MgTm9TZWNyZXRLZXkgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihcIk1pdHRlUHJvRXJyb3IuIFRoZXJlJ3Mgbm8gU2VjcmV0IEtleS5cIiwgJ05vU2VjcmV0S2V5Jyk7XG4gICAgfVxufVxuXG5jbGFzcyBJbnZhbGlkU2VydmVyVXJpIGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ01pdHRlUHJvRXJyb3IuIEludmFsaWQgc2VydmVyIHVyaSwgaXQgd2FzIGV4cGVjdGluZyBhIHN0cmluZy4nLCAnSW52YWxpZFNlcnZlclVyaScpO1xuICAgIH1cbn1cblxuY2xhc3MgTm9SZXBseUVtYWlsIGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ1BsZWFzZSBwcm92aWRlIGFuIHJlcGx5IGVtYWlsJywgJ05vUmVwbHlFbWFpbCcpO1xuICAgIH1cbn1cblxuY2xhc3MgTm9TZWFyY2hBcmdzIGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJhbU5hbWUpIHtcbiAgICAgICAgc3VwZXIoJ0ltcG9zc2libGUgdG8gZ2V0IGVtYWlscyB3aXRob3V0IHNlYXJjaCBhcmd1bWVudHMnLCAnTm9TZWFyY2hBcmdzJyk7XG4gICAgfVxufVxuXG5jbGFzcyBOb1NlYXJjaEFyZ3NJbnN0YW5jZSBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IocGFyYW1OYW1lKSB7XG4gICAgICAgIHN1cGVyKCdFeHBlY3RpbmcgYSBTZWFyY2hBcmdzIGluc3RhbmNlJywgJ05vU2VhcmNoQXJnc0luc3RhbmNlJyk7XG4gICAgfVxufVxuXG5jbGFzcyBOb1BhcmFtWCBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IocGFyYW1OYW1lKSB7XG4gICAgICAgIHN1cGVyKGBQbGVhc2UgcHJvdmlkZSB0aGUgJHtwYXJhbU5hbWV9YCwgYE5vUGFyYW0ke18uY2FwaXRhbGl6ZShwYXJhbU5hbWUpfWApO1xuICAgIH1cbn1cblxuY2xhc3MgV3JvbmdUeXBlUGFyYW1YIGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihkVHlwZSwgcGFyYW1OYW1lKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgYFBhcmFtZXRlciAke3BhcmFtTmFtZX0gaGFzIHRvIGJlIG9mIHRoZSB0eXBlICR7ZFR5cGV9YCxcbiAgICAgICAgICAgIGBXcm9uZ1R5cGVQYXJhbSR7Xy5jYXBpdGFsaXplKHBhcmFtTmFtZSl9YFxuICAgICAgICApO1xuICAgIH1cbn1cblxuY2xhc3MgSW52YWxpZFJlY2lwaWVudExpc3QgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIFwiRXhwZWN0ZWQgZm9ybWF0ICgnTmFtZSA8ZW1haWw+Jzsgb3IgJzxlbWFpbD4nKSB3YXNuJ3QgbWF0Y2hlZFwiLFxuICAgICAgICAgICAgJ0ludmFsaWRSZWNpcGllbnRMaXN0J1xuICAgICAgICApO1xuICAgIH1cbn1cblxuY2xhc3MgSW52YWxpZEZyb20gZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihcIkV4cGVjdGVkIGZvcm1hdCAoJ05hbWUgPGVtYWlsPic7IG9yICc8ZW1haWw+Jykgd2Fzbid0IG1hdGNoZWRcIiwgJ0ludmFsaWRGcm9tJyk7XG4gICAgfVxufVxuXG5jbGFzcyBQYXJhbXNTaG91bGRCZU9iamVjdCBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdQYXJhbWV0ZXJzIHNob3VsZCBpdCBiZSBhbiBvYmplY3QnLCAnUGFyYW1zU2hvdWxkQmVPYmplY3QnKTtcbiAgICB9XG59XG5cbmNsYXNzIEludmFsaWRTZW5kQXQgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihcIkV4cGVjdGVkIGZvcm1hdCAnWVlZWS1NTS1ERCBISDptbTpzcycgd2Fzbid0IG1hdGNoZWRcIiwgJ0ludmFsaWRTZW5kQXQnKTtcbiAgICB9XG59XG5cbmNsYXNzIFRpbWVvdXRFcnJvciBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IodGltZW91dCkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIGBUaGUgc2VydmVyIGRpZCBub3QgcmVzcG9uZCB3aXRoaW4gdGhlICR7dGltZW91dH0gc2Vjb25kKHMpIHlvdSBzdGlwdWxhdGVkYCxcbiAgICAgICAgICAgICdUaW1lb3V0RXJyb3InXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jbGFzcyBBdHRhY2htZW50c1Nob3VsZEJlTGlzdCBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgYEF0dGFjaG1lbnRzIHNob3VsZCBiZSBhIExpc3Qgb2Ygb2JqZWN0cy4gXG4gICAgICAgICAgICBMaWtlOiBbe25hbWU6ICdmb28uYmFyJywgZmlsZTogJ0lKSEpIYmtoeWk4NzYnfV1gLFxuICAgICAgICAgICAgJ0F0dGFjaG1lbnRzU2hvdWxkQmVMaXN0J1xuICAgICAgICApO1xuICAgIH1cbn1cblxuY2xhc3MgQXR0YWNobWVudFNob3VsZEJlT2JqZWN0IGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBgQXR0YWNobWVudCBzaG91bGQgYmUgYW4gb2JqZWN0LiBcbiAgICAgICAgICAgIExpa2U6IHtuYW1lOiAnZm9vLmJhcicsIGZpbGU6ICdJSkhKSGJraHlpODc2J31gLFxuICAgICAgICAgICAgJ0F0dGFjaG1lbnRTaG91bGRCZU9iamVjdCdcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNsYXNzIEF0dGFjaG1lbnRTaG91bGRIYXZlTmFtZSBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgYEF0dGFjaG1lbnQgc2hvdWxkIGhhdmUgYW4gbmFtZS4gXG4gICAgICAgICAgICBMaWtlOiB7bmFtZTogJ2Zvby5iYXInLCBmaWxlOiAnSUpISkhia2h5aTg3Nid9YCxcbiAgICAgICAgICAgICdBdHRhY2htZW50U2hvdWxkSGF2ZU5hbWUnXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jbGFzcyBBdHRhY2htZW50U2hvdWxkSGF2ZUZpbGUgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIGBBdHRhY2htZW50IHNob3VsZCBoYXZlIHRoZSBjb250ZW50cyBvZiB0aGUgZmlsZSBpbiBiYXNlNjQuIFxuICAgICAgICAgICAgTGlrZToge25hbWU6ICdmb28uYmFyJywgZmlsZTogJ0lKSEpIYmtoeWk4NzYnfWAsXG4gICAgICAgICAgICAnQXR0YWNobWVudFNob3VsZEhhdmVGaWxlJ1xuICAgICAgICApO1xuICAgIH1cbn1cblxuY2xhc3MgQXR0YWNobWVudEZpbGVTaG91bGRCZUJhc2U2NCBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdBdHRhY2htZW50IGZpbGUgc2hvdWxkIGJlIGluIGJhc2U2NC4nLCAnQXR0YWNobWVudEZpbGVTaG91bGRCZUJhc2U2NCcpO1xuICAgIH1cbn1cblxuY2xhc3MgQXR0YWNobWVudFNpemVMaW1pdCBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IobGltaXQsIG5hbWUsIGRpZmYpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBgVGhlIHNpemUgb2Ygb25lIG9mIHRoZSBhdHRhY2htZW50cyBleGNlZWRzIHRoZSBvZiAke2xpbWl0fSBNQiBhbGxvd2VkLiBcbiAgICAgICAgICAgIFRoZSBhdHRhY2htZW50ICcke25hbWV9JyBleGNlZWRzIGluICR7ZGlmZn0gTUJgLFxuICAgICAgICAgICAgJ0F0dGFjaG1lbnRTaXplTGltaXQnXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jbGFzcyBBdHRhY2htZW50c1NpemVMaW1pdCBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IobGltaXQsIGRpZmYpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBgVGhlIHN1bSBvZiB0aGUgc2l6ZSBvZiB0aGUgYXR0YWNobWVudHMgZXhjZWVkcyB0aGUgJHtsaW1pdH0gTUIgYWxsb3dlZC4gXG4gICAgICAgICAgICBUaGUgdG90YWwgZXhjZWVkcyBpbiAke2RpZmZ9IE1CYCxcbiAgICAgICAgICAgICdBdHRhY2htZW50U2l6ZUxpbWl0J1xuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQge1xuICAgIEFwaUVycm9yLFxuICAgIE5vTWFpbCxcbiAgICBOb1BhcmFtWCxcbiAgICBOb1N1YmplY3QsXG4gICAgTm9Db250ZW50LFxuICAgIE5vRW5kcG9pbnQsXG4gICAgTm9UZW1wbGF0ZSxcbiAgICBJbnZhbGlkRnJvbSxcbiAgICBOb1B1YmxpY0tleSxcbiAgICBOb1NlY3JldEtleSxcbiAgICBOb1JlY2lwaWVudCxcbiAgICBOb1JlcGx5RW1haWwsXG4gICAgTm9TZWFyY2hBcmdzLFxuICAgIFRpbWVvdXRFcnJvcixcbiAgICBJbnZhbGlkU2VuZEF0LFxuICAgIFdyb25nVHlwZVBhcmFtWCxcbiAgICBOb3RNYWlsSW5zdGFuY2UsXG4gICAgSW52YWxpZFNlcnZlclVyaSxcbiAgICBBdHRhY2htZW50U2l6ZUxpbWl0LFxuICAgIEF0dGFjaG1lbnRzU2l6ZUxpbWl0LFxuICAgIE5vU2VhcmNoQXJnc0luc3RhbmNlLFxuICAgIE5vVGVtcGxhdGVOb0ZlYXR1cmVzLFxuICAgIEludmFsaWRSZWNpcGllbnRMaXN0LFxuICAgIFBhcmFtc1Nob3VsZEJlT2JqZWN0LFxuICAgIEF0dGFjaG1lbnRzU2hvdWxkQmVMaXN0LFxuICAgIEF0dGFjaG1lbnRTaG91bGRCZU9iamVjdCxcbiAgICBBdHRhY2htZW50U2hvdWxkSGF2ZU5hbWUsXG4gICAgQXR0YWNobWVudFNob3VsZEhhdmVGaWxlLFxuICAgIEF0dGFjaG1lbnRGaWxlU2hvdWxkQmVCYXNlNjQsXG59O1xuIl19