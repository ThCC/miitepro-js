'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AttachmentFileShouldBeBase64 = exports.InvalidFormatRecipientList = exports.AttachmentShouldHaveFile = exports.AttachmentShouldHaveName = exports.AttachmentShouldBeObject = exports.AttachmentsShouldBeList = exports.ParamsShouldBeObject = exports.InvalidRecipientList = exports.NoTemplateNoFeatures = exports.NoSearchArgsInstance = exports.AttachmentsSizeLimit = exports.SendAtLowerThanToday = exports.InvalidSendAtFormat = exports.AttachmentSizeLimit = exports.InvalidFromFormat = exports.InvalidServerUri = exports.NotMailInstance = exports.WrongTypeParamX = exports.TimeoutError = exports.NoSearchArgs = exports.NoReplyEmail = exports.NoRecipient = exports.NoSecretKey = exports.NoPublicKey = exports.InvalidFrom = exports.NoTemplate = exports.NoEndpoint = exports.NoContent = exports.NoSubject = exports.NoParamX = exports.NoMail = exports.ApiError = undefined;

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

        return _possibleConstructorReturn(this, (NoContent.__proto__ || Object.getPrototypeOf(NoContent)).call(this, 'Impossível enviar um email sem conteúdo. É preciso fornecer um dos parâmetros ' + '"messageText", "messageHtml" ou "attachments"', 'NoContent'));
    }

    return NoContent;
}(ExtendableError);

var NoTemplate = function (_ExtendableError3) {
    _inherits(NoTemplate, _ExtendableError3);

    function NoTemplate() {
        _classCallCheck(this, NoTemplate);

        return _possibleConstructorReturn(this, (NoTemplate.__proto__ || Object.getPrototypeOf(NoTemplate)).call(this, 'Impossível enviar um email de template, sem conteúdo html. ' + 'Ou você fornece o templateSlug ou o messageHtml', 'NoTemplate'));
    }

    return NoTemplate;
}(ExtendableError);

var NoTemplateNoFeatures = function (_ExtendableError4) {
    _inherits(NoTemplateNoFeatures, _ExtendableError4);

    function NoTemplateNoFeatures() {
        _classCallCheck(this, NoTemplateNoFeatures);

        return _possibleConstructorReturn(this, (NoTemplateNoFeatures.__proto__ || Object.getPrototypeOf(NoTemplateNoFeatures)).call(this, "Impossível usar as funcionalidade de template, sem fornecer o 'templateSlug'", 'NoTemplateNoFeatures'));
    }

    return NoTemplateNoFeatures;
}(ExtendableError);

var NoMail = function (_ExtendableError5) {
    _inherits(NoMail, _ExtendableError5);

    function NoMail() {
        _classCallCheck(this, NoMail);

        return _possibleConstructorReturn(this, (NoMail.__proto__ || Object.getPrototypeOf(NoMail)).call(this, 'Impossível enviar um email sem os parâmetros', 'NoMail'));
    }

    return NoMail;
}(ExtendableError);

var NotMailInstance = function (_ExtendableError6) {
    _inherits(NotMailInstance, _ExtendableError6);

    function NotMailInstance() {
        _classCallCheck(this, NotMailInstance);

        return _possibleConstructorReturn(this, (NotMailInstance.__proto__ || Object.getPrototypeOf(NotMailInstance)).call(this, 'Esperando uma instância do modelo Mail', 'NotMailInstance'));
    }

    return NotMailInstance;
}(ExtendableError);

var NoEndpoint = function (_ExtendableError7) {
    _inherits(NoEndpoint, _ExtendableError7);

    function NoEndpoint() {
        _classCallCheck(this, NoEndpoint);

        return _possibleConstructorReturn(this, (NoEndpoint.__proto__ || Object.getPrototypeOf(NoEndpoint)).call(this, 'Impossível de adquirir o payload sem o endpoint', 'NoEndpoint'));
    }

    return NoEndpoint;
}(ExtendableError);

var NoSubject = function (_ExtendableError8) {
    _inherits(NoSubject, _ExtendableError8);

    function NoSubject() {
        _classCallCheck(this, NoSubject);

        return _possibleConstructorReturn(this, (NoSubject.__proto__ || Object.getPrototypeOf(NoSubject)).call(this, 'Impossível de enviar um email sem assunto', 'NoSubject'));
    }

    return NoSubject;
}(ExtendableError);

var NoRecipient = function (_ExtendableError9) {
    _inherits(NoRecipient, _ExtendableError9);

    function NoRecipient() {
        _classCallCheck(this, NoRecipient);

        return _possibleConstructorReturn(this, (NoRecipient.__proto__ || Object.getPrototypeOf(NoRecipient)).call(this, 'Impossível de enviar um email sem ao menos um destinatário', 'NoRecipient'));
    }

    return NoRecipient;
}(ExtendableError);

var NoPublicKey = function (_ExtendableError10) {
    _inherits(NoPublicKey, _ExtendableError10);

    function NoPublicKey() {
        _classCallCheck(this, NoPublicKey);

        return _possibleConstructorReturn(this, (NoPublicKey.__proto__ || Object.getPrototypeOf(NoPublicKey)).call(this, 'MitteProError. Sem chave pública.', 'NoPublicKey'));
    }

    return NoPublicKey;
}(ExtendableError);

var NoSecretKey = function (_ExtendableError11) {
    _inherits(NoSecretKey, _ExtendableError11);

    function NoSecretKey() {
        _classCallCheck(this, NoSecretKey);

        return _possibleConstructorReturn(this, (NoSecretKey.__proto__ || Object.getPrototypeOf(NoSecretKey)).call(this, "MitteProError. Sem chave privada.", 'NoSecretKey'));
    }

    return NoSecretKey;
}(ExtendableError);

var InvalidServerUri = function (_ExtendableError12) {
    _inherits(InvalidServerUri, _ExtendableError12);

    function InvalidServerUri() {
        _classCallCheck(this, InvalidServerUri);

        return _possibleConstructorReturn(this, (InvalidServerUri.__proto__ || Object.getPrototypeOf(InvalidServerUri)).call(this, 'MitteProError. Inválida uride do servidor, é esperado uma string.', 'InvalidServerUri'));
    }

    return InvalidServerUri;
}(ExtendableError);

var NoReplyEmail = function (_ExtendableError13) {
    _inherits(NoReplyEmail, _ExtendableError13);

    function NoReplyEmail() {
        _classCallCheck(this, NoReplyEmail);

        return _possibleConstructorReturn(this, (NoReplyEmail.__proto__ || Object.getPrototypeOf(NoReplyEmail)).call(this, 'Forneça um email de rementente', 'NoReplyEmail'));
    }

    return NoReplyEmail;
}(ExtendableError);

var NoSearchArgs = function (_ExtendableError14) {
    _inherits(NoSearchArgs, _ExtendableError14);

    function NoSearchArgs() {
        _classCallCheck(this, NoSearchArgs);

        return _possibleConstructorReturn(this, (NoSearchArgs.__proto__ || Object.getPrototypeOf(NoSearchArgs)).call(this, 'Impossível adquirir emails sem parâmetros para pesquisa', 'NoSearchArgs'));
    }

    return NoSearchArgs;
}(ExtendableError);

var NoSearchArgsInstance = function (_ExtendableError15) {
    _inherits(NoSearchArgsInstance, _ExtendableError15);

    function NoSearchArgsInstance() {
        _classCallCheck(this, NoSearchArgsInstance);

        return _possibleConstructorReturn(this, (NoSearchArgsInstance.__proto__ || Object.getPrototypeOf(NoSearchArgsInstance)).call(this, 'Esperando uma instância do modelo SearchArgs', 'NoSearchArgsInstance'));
    }

    return NoSearchArgsInstance;
}(ExtendableError);

var NoParamX = function (_ExtendableError16) {
    _inherits(NoParamX, _ExtendableError16);

    function NoParamX(paramName) {
        _classCallCheck(this, NoParamX);

        return _possibleConstructorReturn(this, (NoParamX.__proto__ || Object.getPrototypeOf(NoParamX)).call(this, 'Forne\xE7a o par\xE2metro ' + paramName, 'NoParam' + _lodash2.default.capitalize(paramName)));
    }

    return NoParamX;
}(ExtendableError);

var WrongTypeParamX = function (_ExtendableError17) {
    _inherits(WrongTypeParamX, _ExtendableError17);

    function WrongTypeParamX(dType, paramName) {
        _classCallCheck(this, WrongTypeParamX);

        return _possibleConstructorReturn(this, (WrongTypeParamX.__proto__ || Object.getPrototypeOf(WrongTypeParamX)).call(this, 'Par\xE2metro ' + paramName + ' tem que ser do tipo ' + dType, 'WrongTypeParam' + _lodash2.default.capitalize(paramName)));
    }

    return WrongTypeParamX;
}(ExtendableError);

var InvalidRecipientList = function (_ExtendableError18) {
    _inherits(InvalidRecipientList, _ExtendableError18);

    function InvalidRecipientList(email) {
        _classCallCheck(this, InvalidRecipientList);

        return _possibleConstructorReturn(this, (InvalidRecipientList.__proto__ || Object.getPrototypeOf(InvalidRecipientList)).call(this, 'O email ' + email + ' do par\xE2metro \'recipientList\' \xE9 inv\xE1lido', 'InvalidRecipientList'));
    }

    return InvalidRecipientList;
}(ExtendableError);

var InvalidFormatRecipientList = function (_ExtendableError19) {
    _inherits(InvalidFormatRecipientList, _ExtendableError19);

    function InvalidFormatRecipientList() {
        _classCallCheck(this, InvalidFormatRecipientList);

        return _possibleConstructorReturn(this, (InvalidFormatRecipientList.__proto__ || Object.getPrototypeOf(InvalidFormatRecipientList)).call(this, "O formato esperado ('Name <email>'; or '<email>') não foi encontrado", 'InvalidFormatRecipientList'));
    }

    return InvalidFormatRecipientList;
}(ExtendableError);

var InvalidFrom = function (_ExtendableError20) {
    _inherits(InvalidFrom, _ExtendableError20);

    function InvalidFrom() {
        _classCallCheck(this, InvalidFrom);

        return _possibleConstructorReturn(this, (InvalidFrom.__proto__ || Object.getPrototypeOf(InvalidFrom)).call(this, "O email do parâmetro 'From' está inválido", 'InvalidFrom'));
    }

    return InvalidFrom;
}(ExtendableError);

var InvalidFromFormat = function (_ExtendableError21) {
    _inherits(InvalidFromFormat, _ExtendableError21);

    function InvalidFromFormat() {
        _classCallCheck(this, InvalidFromFormat);

        return _possibleConstructorReturn(this, (InvalidFromFormat.__proto__ || Object.getPrototypeOf(InvalidFromFormat)).call(this, "O formato esperado ('Name <email>'; or '<email>') não foi encontrado", 'InvalidFromFormat'));
    }

    return InvalidFromFormat;
}(ExtendableError);

var ParamsShouldBeObject = function (_ExtendableError22) {
    _inherits(ParamsShouldBeObject, _ExtendableError22);

    function ParamsShouldBeObject() {
        _classCallCheck(this, ParamsShouldBeObject);

        return _possibleConstructorReturn(this, (ParamsShouldBeObject.__proto__ || Object.getPrototypeOf(ParamsShouldBeObject)).call(this, 'Parâmetros devem ser objetos', 'ParamsShouldBeObject'));
    }

    return ParamsShouldBeObject;
}(ExtendableError);

var InvalidSendAtFormat = function (_ExtendableError23) {
    _inherits(InvalidSendAtFormat, _ExtendableError23);

    function InvalidSendAtFormat() {
        _classCallCheck(this, InvalidSendAtFormat);

        return _possibleConstructorReturn(this, (InvalidSendAtFormat.__proto__ || Object.getPrototypeOf(InvalidSendAtFormat)).call(this, "O formato esperado 'YYYY-MM-DD HH:mm:ss' não foi encontrado", 'InvalidSendAtFormat'));
    }

    return InvalidSendAtFormat;
}(ExtendableError);

var SendAtLowerThanToday = function (_ExtendableError24) {
    _inherits(SendAtLowerThanToday, _ExtendableError24);

    function SendAtLowerThanToday() {
        _classCallCheck(this, SendAtLowerThanToday);

        return _possibleConstructorReturn(this, (SendAtLowerThanToday.__proto__ || Object.getPrototypeOf(SendAtLowerThanToday)).call(this, 'O valor para data tem que ser maior do que a atual', 'SendAtLowerThanToday'));
    }

    return SendAtLowerThanToday;
}(ExtendableError);

var TimeoutError = function (_ExtendableError25) {
    _inherits(TimeoutError, _ExtendableError25);

    function TimeoutError(timeout) {
        _classCallCheck(this, TimeoutError);

        return _possibleConstructorReturn(this, (TimeoutError.__proto__ || Object.getPrototypeOf(TimeoutError)).call(this, 'O servidor n\xE3o respondeu dentro tempo que voc\xEA estipulou de ' + timeout + ' segundo(s)', 'TimeoutError'));
    }

    return TimeoutError;
}(ExtendableError);

var AttachmentsShouldBeList = function (_ExtendableError26) {
    _inherits(AttachmentsShouldBeList, _ExtendableError26);

    function AttachmentsShouldBeList() {
        _classCallCheck(this, AttachmentsShouldBeList);

        return _possibleConstructorReturn(this, (AttachmentsShouldBeList.__proto__ || Object.getPrototypeOf(AttachmentsShouldBeList)).call(this, 'Anexos devem ser uma lista de objetos. \n            Exemplo: [{name: \'foo.bar\', file: \'IJHJHbkhyi876\'}]', 'AttachmentsShouldBeList'));
    }

    return AttachmentsShouldBeList;
}(ExtendableError);

var AttachmentShouldBeObject = function (_ExtendableError27) {
    _inherits(AttachmentShouldBeObject, _ExtendableError27);

    function AttachmentShouldBeObject() {
        _classCallCheck(this, AttachmentShouldBeObject);

        return _possibleConstructorReturn(this, (AttachmentShouldBeObject.__proto__ || Object.getPrototypeOf(AttachmentShouldBeObject)).call(this, 'Anexo deve ser um objeto. \n            Exemplo: {name: \'foo.bar\', file: \'IJHJHbkhyi876\'}', 'AttachmentShouldBeObject'));
    }

    return AttachmentShouldBeObject;
}(ExtendableError);

var AttachmentShouldHaveName = function (_ExtendableError28) {
    _inherits(AttachmentShouldHaveName, _ExtendableError28);

    function AttachmentShouldHaveName() {
        _classCallCheck(this, AttachmentShouldHaveName);

        return _possibleConstructorReturn(this, (AttachmentShouldHaveName.__proto__ || Object.getPrototypeOf(AttachmentShouldHaveName)).call(this, 'Anexo tem que conter um name (\'nome\'). \n            Exemplo: {name: \'foo.bar\', file: \'IJHJHbkhyi876\'}', 'AttachmentShouldHaveName'));
    }

    return AttachmentShouldHaveName;
}(ExtendableError);

var AttachmentShouldHaveFile = function (_ExtendableError29) {
    _inherits(AttachmentShouldHaveFile, _ExtendableError29);

    function AttachmentShouldHaveFile() {
        _classCallCheck(this, AttachmentShouldHaveFile);

        return _possibleConstructorReturn(this, (AttachmentShouldHaveFile.__proto__ || Object.getPrototypeOf(AttachmentShouldHaveFile)).call(this, 'Anexo tem que conter o conte\xFAdo do arquivo em base64. \n            Exemplo: {name: \'foo.bar\', file: \'IJHJHbkhyi876\'}', 'AttachmentShouldHaveFile'));
    }

    return AttachmentShouldHaveFile;
}(ExtendableError);

var AttachmentFileShouldBeBase64 = function (_ExtendableError30) {
    _inherits(AttachmentFileShouldBeBase64, _ExtendableError30);

    function AttachmentFileShouldBeBase64() {
        _classCallCheck(this, AttachmentFileShouldBeBase64);

        return _possibleConstructorReturn(this, (AttachmentFileShouldBeBase64.__proto__ || Object.getPrototypeOf(AttachmentFileShouldBeBase64)).call(this, 'O arquivo do anexo tem que estar em base64.', 'AttachmentFileShouldBeBase64'));
    }

    return AttachmentFileShouldBeBase64;
}(ExtendableError);

var AttachmentSizeLimit = function (_ExtendableError31) {
    _inherits(AttachmentSizeLimit, _ExtendableError31);

    function AttachmentSizeLimit(limit, name, diff) {
        _classCallCheck(this, AttachmentSizeLimit);

        return _possibleConstructorReturn(this, (AttachmentSizeLimit.__proto__ || Object.getPrototypeOf(AttachmentSizeLimit)).call(this, 'O tamanho dos anexos excedem o limite de ' + limit + ' MB permitido. \n            O anexo \'' + name + '\' excede em ' + diff + ' MB', 'AttachmentSizeLimit'));
    }

    return AttachmentSizeLimit;
}(ExtendableError);

var AttachmentsSizeLimit = function (_ExtendableError32) {
    _inherits(AttachmentsSizeLimit, _ExtendableError32);

    function AttachmentsSizeLimit(limit, diff) {
        _classCallCheck(this, AttachmentsSizeLimit);

        return _possibleConstructorReturn(this, (AttachmentsSizeLimit.__proto__ || Object.getPrototypeOf(AttachmentsSizeLimit)).call(this, 'A soma do tamanho dos anexos excede o limite de ' + limit + ' MB permitido. \n            O total excede em ' + diff + ' MB', 'AttachmentSizeLimit'));
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
exports.WrongTypeParamX = WrongTypeParamX;
exports.NotMailInstance = NotMailInstance;
exports.InvalidServerUri = InvalidServerUri;
exports.InvalidFromFormat = InvalidFromFormat;
exports.AttachmentSizeLimit = AttachmentSizeLimit;
exports.InvalidSendAtFormat = InvalidSendAtFormat;
exports.SendAtLowerThanToday = SendAtLowerThanToday;
exports.AttachmentsSizeLimit = AttachmentsSizeLimit;
exports.NoSearchArgsInstance = NoSearchArgsInstance;
exports.NoTemplateNoFeatures = NoTemplateNoFeatures;
exports.InvalidRecipientList = InvalidRecipientList;
exports.ParamsShouldBeObject = ParamsShouldBeObject;
exports.AttachmentsShouldBeList = AttachmentsShouldBeList;
exports.AttachmentShouldBeObject = AttachmentShouldBeObject;
exports.AttachmentShouldHaveName = AttachmentShouldHaveName;
exports.AttachmentShouldHaveFile = AttachmentShouldHaveFile;
exports.InvalidFormatRecipientList = InvalidFormatRecipientList;
exports.AttachmentFileShouldBeBase64 = AttachmentFileShouldBeBase64;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9leGNlcHRpb25zLmpzIl0sIm5hbWVzIjpbIkV4dGVuZGFibGVFcnJvciIsIm1lc3NhZ2UiLCJuYW1lIiwiRXJyb3IiLCJjYXB0dXJlU3RhY2tUcmFjZSIsImNvbnN0cnVjdG9yIiwic3RhY2siLCJBcGlFcnJvciIsInJlYXNvbiIsIk5vQ29udGVudCIsIk5vVGVtcGxhdGUiLCJOb1RlbXBsYXRlTm9GZWF0dXJlcyIsIk5vTWFpbCIsIk5vdE1haWxJbnN0YW5jZSIsIk5vRW5kcG9pbnQiLCJOb1N1YmplY3QiLCJOb1JlY2lwaWVudCIsIk5vUHVibGljS2V5IiwiTm9TZWNyZXRLZXkiLCJJbnZhbGlkU2VydmVyVXJpIiwiTm9SZXBseUVtYWlsIiwiTm9TZWFyY2hBcmdzIiwiTm9TZWFyY2hBcmdzSW5zdGFuY2UiLCJOb1BhcmFtWCIsInBhcmFtTmFtZSIsIl8iLCJjYXBpdGFsaXplIiwiV3JvbmdUeXBlUGFyYW1YIiwiZFR5cGUiLCJJbnZhbGlkUmVjaXBpZW50TGlzdCIsImVtYWlsIiwiSW52YWxpZEZvcm1hdFJlY2lwaWVudExpc3QiLCJJbnZhbGlkRnJvbSIsIkludmFsaWRGcm9tRm9ybWF0IiwiUGFyYW1zU2hvdWxkQmVPYmplY3QiLCJJbnZhbGlkU2VuZEF0Rm9ybWF0IiwiU2VuZEF0TG93ZXJUaGFuVG9kYXkiLCJUaW1lb3V0RXJyb3IiLCJ0aW1lb3V0IiwiQXR0YWNobWVudHNTaG91bGRCZUxpc3QiLCJBdHRhY2htZW50U2hvdWxkQmVPYmplY3QiLCJBdHRhY2htZW50U2hvdWxkSGF2ZU5hbWUiLCJBdHRhY2htZW50U2hvdWxkSGF2ZUZpbGUiLCJBdHRhY2htZW50RmlsZVNob3VsZEJlQmFzZTY0IiwiQXR0YWNobWVudFNpemVMaW1pdCIsImxpbWl0IiwiZGlmZiIsIkF0dGFjaG1lbnRzU2l6ZUxpbWl0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVNQSxlOzs7QUFDRiw2QkFBWUMsT0FBWixFQUFxQkMsSUFBckIsRUFBMkI7QUFBQTs7QUFBQSxzSUFDakJELE9BRGlCOztBQUV2QixjQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDQSxZQUFJLE9BQU9DLE1BQU1DLGlCQUFiLEtBQW1DLFVBQXZDLEVBQW1EO0FBQy9DRCxrQkFBTUMsaUJBQU4sUUFBOEIsTUFBS0MsV0FBbkM7QUFDSCxTQUZELE1BRU87QUFDSCxrQkFBS0MsS0FBTCxHQUFjLElBQUlILEtBQUosQ0FBVUYsT0FBVixDQUFELENBQXFCSyxLQUFsQztBQUNIO0FBUHNCO0FBUTFCOzs7RUFUeUJILEs7O0lBWXhCSSxROzs7QUFDRixzQkFBWUMsTUFBWixFQUFvQjtBQUFBOztBQUFBLCtJQUNnQkEsTUFEaEIsRUFDMEIsVUFEMUI7QUFFbkI7OztFQUhrQlIsZTs7SUFNakJTLFM7OztBQUNGLHlCQUFjO0FBQUE7O0FBQUEscUhBQ0osbUZBQ0YsK0NBRk0sRUFFMkMsV0FGM0M7QUFHYjs7O0VBSm1CVCxlOztJQU9sQlUsVTs7O0FBQ0YsMEJBQWM7QUFBQTs7QUFBQSx1SEFFTixnRUFDQSxpREFITSxFQUlOLFlBSk07QUFNYjs7O0VBUG9CVixlOztJQVVuQlcsb0I7OztBQUNGLG9DQUFjO0FBQUE7O0FBQUEsMklBRU4sOEVBRk0sRUFHTixzQkFITTtBQUtiOzs7RUFOOEJYLGU7O0lBUzdCWSxNOzs7QUFDRixzQkFBYztBQUFBOztBQUFBLCtHQUNKLDhDQURJLEVBQzRDLFFBRDVDO0FBRWI7OztFQUhnQlosZTs7SUFNZmEsZTs7O0FBQ0YsK0JBQWM7QUFBQTs7QUFBQSxpSUFDSix3Q0FESSxFQUNzQyxpQkFEdEM7QUFFYjs7O0VBSHlCYixlOztJQU14QmMsVTs7O0FBQ0YsMEJBQWM7QUFBQTs7QUFBQSx1SEFDSixpREFESSxFQUMrQyxZQUQvQztBQUViOzs7RUFIb0JkLGU7O0lBTW5CZSxTOzs7QUFDRix5QkFBYztBQUFBOztBQUFBLHFIQUNKLDJDQURJLEVBQ3lDLFdBRHpDO0FBRWI7OztFQUhtQmYsZTs7SUFNbEJnQixXOzs7QUFDRiwyQkFBYztBQUFBOztBQUFBLHlIQUNKLDREQURJLEVBQzBELGFBRDFEO0FBRWI7OztFQUhxQmhCLGU7O0lBTXBCaUIsVzs7O0FBQ0YsMkJBQWM7QUFBQTs7QUFBQSx5SEFDSixtQ0FESSxFQUNpQyxhQURqQztBQUViOzs7RUFIcUJqQixlOztJQU1wQmtCLFc7OztBQUNGLDJCQUFjO0FBQUE7O0FBQUEseUhBQ0osbUNBREksRUFDaUMsYUFEakM7QUFFYjs7O0VBSHFCbEIsZTs7SUFNcEJtQixnQjs7O0FBQ0YsZ0NBQWM7QUFBQTs7QUFBQSxtSUFFTixtRUFGTSxFQUdOLGtCQUhNO0FBS2I7OztFQU4wQm5CLGU7O0lBU3pCb0IsWTs7O0FBQ0YsNEJBQWM7QUFBQTs7QUFBQSwySEFDSixnQ0FESSxFQUM4QixjQUQ5QjtBQUViOzs7RUFIc0JwQixlOztJQU1yQnFCLFk7OztBQUNGLDRCQUFjO0FBQUE7O0FBQUEsMkhBQ0oseURBREksRUFDdUQsY0FEdkQ7QUFFYjs7O0VBSHNCckIsZTs7SUFNckJzQixvQjs7O0FBQ0Ysb0NBQWM7QUFBQTs7QUFBQSwySUFDSiw4Q0FESSxFQUM0QyxzQkFENUM7QUFFYjs7O0VBSDhCdEIsZTs7SUFNN0J1QixROzs7QUFDRixzQkFBWUMsU0FBWixFQUF1QjtBQUFBOztBQUFBLGtKQUNVQSxTQURWLGNBQ2lDQyxpQkFBRUMsVUFBRixDQUFhRixTQUFiLENBRGpDO0FBRXRCOzs7RUFIa0J4QixlOztJQU1qQjJCLGU7OztBQUNGLDZCQUFZQyxLQUFaLEVBQW1CSixTQUFuQixFQUE4QjtBQUFBOztBQUFBLG1KQUVUQSxTQUZTLDZCQUV3QkksS0FGeEIscUJBR0xILGlCQUFFQyxVQUFGLENBQWFGLFNBQWIsQ0FISztBQUs3Qjs7O0VBTnlCeEIsZTs7SUFTeEI2QixvQjs7O0FBQ0Ysa0NBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSx3SkFFQUEsS0FGQSwwREFHWCxzQkFIVztBQUtsQjs7O0VBTjhCOUIsZTs7SUFTN0IrQiwwQjs7O0FBQ0YsMENBQWM7QUFBQTs7QUFBQSx1SkFFTixzRUFGTSxFQUdOLDRCQUhNO0FBS2I7OztFQU5vQy9CLGU7O0lBU25DZ0MsVzs7O0FBQ0YsMkJBQWM7QUFBQTs7QUFBQSx5SEFDSiwyQ0FESSxFQUN5QyxhQUR6QztBQUViOzs7RUFIcUJoQyxlOztJQU1wQmlDLGlCOzs7QUFDRixpQ0FBYztBQUFBOztBQUFBLHFJQUVOLHNFQUZNLEVBR04sbUJBSE07QUFLYjs7O0VBTjJCakMsZTs7SUFTMUJrQyxvQjs7O0FBQ0Ysb0NBQWM7QUFBQTs7QUFBQSwySUFDSiw4QkFESSxFQUM0QixzQkFENUI7QUFFYjs7O0VBSDhCbEMsZTs7SUFNN0JtQyxtQjs7O0FBQ0YsbUNBQWM7QUFBQTs7QUFBQSx5SUFDSiw2REFESSxFQUMyRCxxQkFEM0Q7QUFFYjs7O0VBSDZCbkMsZTs7SUFNNUJvQyxvQjs7O0FBQ0Ysb0NBQWM7QUFBQTs7QUFBQSwySUFDSixvREFESSxFQUNrRCxzQkFEbEQ7QUFFYjs7O0VBSDhCcEMsZTs7SUFNN0JxQyxZOzs7QUFDRiwwQkFBWUMsT0FBWixFQUFxQjtBQUFBOztBQUFBLGtNQUVrREEsT0FGbEQsa0JBR2IsY0FIYTtBQUtwQjs7O0VBTnNCdEMsZTs7SUFTckJ1Qyx1Qjs7O0FBQ0YsdUNBQWM7QUFBQTs7QUFBQSxpUUFJTix5QkFKTTtBQU1iOzs7RUFQaUN2QyxlOztJQVVoQ3dDLHdCOzs7QUFDRix3Q0FBYztBQUFBOztBQUFBLG9QQUlOLDBCQUpNO0FBTWI7OztFQVBrQ3hDLGU7O0lBVWpDeUMsd0I7OztBQUNGLHdDQUFjO0FBQUE7O0FBQUEsbVFBSU4sMEJBSk07QUFNYjs7O0VBUGtDekMsZTs7SUFVakMwQyx3Qjs7O0FBQ0Ysd0NBQWM7QUFBQTs7QUFBQSxtUkFJTiwwQkFKTTtBQU1iOzs7RUFQa0MxQyxlOztJQVVqQzJDLDRCOzs7QUFDRiw0Q0FBYztBQUFBOztBQUFBLDJKQUNKLDZDQURJLEVBQzJDLDhCQUQzQztBQUViOzs7RUFIc0MzQyxlOztJQU1yQzRDLG1COzs7QUFDRixpQ0FBWUMsS0FBWixFQUFtQjNDLElBQW5CLEVBQXlCNEMsSUFBekIsRUFBK0I7QUFBQTs7QUFBQSx1TEFFcUJELEtBRnJCLCtDQUdaM0MsSUFIWSxxQkFHTzRDLElBSFAsVUFJdkIscUJBSnVCO0FBTTlCOzs7RUFQNkI5QyxlOztJQVU1QitDLG9COzs7QUFDRixrQ0FBWUYsS0FBWixFQUFtQkMsSUFBbkIsRUFBeUI7QUFBQTs7QUFBQSxnTUFFa0NELEtBRmxDLHVEQUdHQyxJQUhILFVBSWpCLHFCQUppQjtBQU14Qjs7O0VBUDhCOUMsZTs7UUFXL0JPLFEsR0FBQUEsUTtRQUNBSyxNLEdBQUFBLE07UUFDQVcsUSxHQUFBQSxRO1FBQ0FSLFMsR0FBQUEsUztRQUNBTixTLEdBQUFBLFM7UUFDQUssVSxHQUFBQSxVO1FBQ0FKLFUsR0FBQUEsVTtRQUNBc0IsVyxHQUFBQSxXO1FBQ0FmLFcsR0FBQUEsVztRQUNBQyxXLEdBQUFBLFc7UUFDQUYsVyxHQUFBQSxXO1FBQ0FJLFksR0FBQUEsWTtRQUNBQyxZLEdBQUFBLFk7UUFDQWdCLFksR0FBQUEsWTtRQUNBVixlLEdBQUFBLGU7UUFDQWQsZSxHQUFBQSxlO1FBQ0FNLGdCLEdBQUFBLGdCO1FBQ0FjLGlCLEdBQUFBLGlCO1FBQ0FXLG1CLEdBQUFBLG1CO1FBQ0FULG1CLEdBQUFBLG1CO1FBQ0FDLG9CLEdBQUFBLG9CO1FBQ0FXLG9CLEdBQUFBLG9CO1FBQ0F6QixvQixHQUFBQSxvQjtRQUNBWCxvQixHQUFBQSxvQjtRQUNBa0Isb0IsR0FBQUEsb0I7UUFDQUssb0IsR0FBQUEsb0I7UUFDQUssdUIsR0FBQUEsdUI7UUFDQUMsd0IsR0FBQUEsd0I7UUFDQUMsd0IsR0FBQUEsd0I7UUFDQUMsd0IsR0FBQUEsd0I7UUFDQVgsMEIsR0FBQUEsMEI7UUFDQVksNEIsR0FBQUEsNEIiLCJmaWxlIjoiZXhjZXB0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5cbmNsYXNzIEV4dGVuZGFibGVFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBuYW1lKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICBpZiAodHlwZW9mIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhY2sgPSAobmV3IEVycm9yKG1lc3NhZ2UpKS5zdGFjaztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuY2xhc3MgQXBpRXJyb3IgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKHJlYXNvbikge1xuICAgICAgICBzdXBlcihgTWl0dGVQcm9FcnJvci4gUmVhc29uOiAke3JlYXNvbn1gLCAnQXBpRXJyb3InKTtcbiAgICB9XG59XG5cbmNsYXNzIE5vQ29udGVudCBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdJbXBvc3PDrXZlbCBlbnZpYXIgdW0gZW1haWwgc2VtIGNvbnRlw7pkby4gw4kgcHJlY2lzbyBmb3JuZWNlciB1bSBkb3MgcGFyw6JtZXRyb3MgJyArXG4gICAgICAgICAgICAnXCJtZXNzYWdlVGV4dFwiLCBcIm1lc3NhZ2VIdG1sXCIgb3UgXCJhdHRhY2htZW50c1wiJywgJ05vQ29udGVudCcpO1xuICAgIH1cbn1cblxuY2xhc3MgTm9UZW1wbGF0ZSBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgJ0ltcG9zc8OtdmVsIGVudmlhciB1bSBlbWFpbCBkZSB0ZW1wbGF0ZSwgc2VtIGNvbnRlw7pkbyBodG1sLiAnICtcbiAgICAgICAgICAgICdPdSB2b2PDqiBmb3JuZWNlIG8gdGVtcGxhdGVTbHVnIG91IG8gbWVzc2FnZUh0bWwnLFxuICAgICAgICAgICAgJ05vVGVtcGxhdGUnXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jbGFzcyBOb1RlbXBsYXRlTm9GZWF0dXJlcyBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgXCJJbXBvc3PDrXZlbCB1c2FyIGFzIGZ1bmNpb25hbGlkYWRlIGRlIHRlbXBsYXRlLCBzZW0gZm9ybmVjZXIgbyAndGVtcGxhdGVTbHVnJ1wiLFxuICAgICAgICAgICAgJ05vVGVtcGxhdGVOb0ZlYXR1cmVzJ1xuICAgICAgICApO1xuICAgIH1cbn1cblxuY2xhc3MgTm9NYWlsIGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ0ltcG9zc8OtdmVsIGVudmlhciB1bSBlbWFpbCBzZW0gb3MgcGFyw6JtZXRyb3MnLCAnTm9NYWlsJyk7XG4gICAgfVxufVxuXG5jbGFzcyBOb3RNYWlsSW5zdGFuY2UgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcignRXNwZXJhbmRvIHVtYSBpbnN0w6JuY2lhIGRvIG1vZGVsbyBNYWlsJywgJ05vdE1haWxJbnN0YW5jZScpO1xuICAgIH1cbn1cblxuY2xhc3MgTm9FbmRwb2ludCBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdJbXBvc3PDrXZlbCBkZSBhZHF1aXJpciBvIHBheWxvYWQgc2VtIG8gZW5kcG9pbnQnLCAnTm9FbmRwb2ludCcpO1xuICAgIH1cbn1cblxuY2xhc3MgTm9TdWJqZWN0IGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ0ltcG9zc8OtdmVsIGRlIGVudmlhciB1bSBlbWFpbCBzZW0gYXNzdW50bycsICdOb1N1YmplY3QnKTtcbiAgICB9XG59XG5cbmNsYXNzIE5vUmVjaXBpZW50IGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ0ltcG9zc8OtdmVsIGRlIGVudmlhciB1bSBlbWFpbCBzZW0gYW8gbWVub3MgdW0gZGVzdGluYXTDoXJpbycsICdOb1JlY2lwaWVudCcpO1xuICAgIH1cbn1cblxuY2xhc3MgTm9QdWJsaWNLZXkgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcignTWl0dGVQcm9FcnJvci4gU2VtIGNoYXZlIHDDumJsaWNhLicsICdOb1B1YmxpY0tleScpO1xuICAgIH1cbn1cblxuY2xhc3MgTm9TZWNyZXRLZXkgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihcIk1pdHRlUHJvRXJyb3IuIFNlbSBjaGF2ZSBwcml2YWRhLlwiLCAnTm9TZWNyZXRLZXknKTtcbiAgICB9XG59XG5cbmNsYXNzIEludmFsaWRTZXJ2ZXJVcmkgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgICdNaXR0ZVByb0Vycm9yLiBJbnbDoWxpZGEgdXJpZGUgZG8gc2Vydmlkb3IsIMOpIGVzcGVyYWRvIHVtYSBzdHJpbmcuJyxcbiAgICAgICAgICAgICdJbnZhbGlkU2VydmVyVXJpJ1xuICAgICAgICApO1xuICAgIH1cbn1cblxuY2xhc3MgTm9SZXBseUVtYWlsIGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ0Zvcm5lw6dhIHVtIGVtYWlsIGRlIHJlbWVudGVudGUnLCAnTm9SZXBseUVtYWlsJyk7XG4gICAgfVxufVxuXG5jbGFzcyBOb1NlYXJjaEFyZ3MgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcignSW1wb3Nzw612ZWwgYWRxdWlyaXIgZW1haWxzIHNlbSBwYXLDom1ldHJvcyBwYXJhIHBlc3F1aXNhJywgJ05vU2VhcmNoQXJncycpO1xuICAgIH1cbn1cblxuY2xhc3MgTm9TZWFyY2hBcmdzSW5zdGFuY2UgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcignRXNwZXJhbmRvIHVtYSBpbnN0w6JuY2lhIGRvIG1vZGVsbyBTZWFyY2hBcmdzJywgJ05vU2VhcmNoQXJnc0luc3RhbmNlJyk7XG4gICAgfVxufVxuXG5jbGFzcyBOb1BhcmFtWCBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IocGFyYW1OYW1lKSB7XG4gICAgICAgIHN1cGVyKGBGb3JuZcOnYSBvIHBhcsOibWV0cm8gJHtwYXJhbU5hbWV9YCwgYE5vUGFyYW0ke18uY2FwaXRhbGl6ZShwYXJhbU5hbWUpfWApO1xuICAgIH1cbn1cblxuY2xhc3MgV3JvbmdUeXBlUGFyYW1YIGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihkVHlwZSwgcGFyYW1OYW1lKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgYFBhcsOibWV0cm8gJHtwYXJhbU5hbWV9IHRlbSBxdWUgc2VyIGRvIHRpcG8gJHtkVHlwZX1gLFxuICAgICAgICAgICAgYFdyb25nVHlwZVBhcmFtJHtfLmNhcGl0YWxpemUocGFyYW1OYW1lKX1gXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jbGFzcyBJbnZhbGlkUmVjaXBpZW50TGlzdCBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoZW1haWwpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBgTyBlbWFpbCAke2VtYWlsfSBkbyBwYXLDom1ldHJvICdyZWNpcGllbnRMaXN0JyDDqSBpbnbDoWxpZG9gLFxuICAgICAgICAgICAgJ0ludmFsaWRSZWNpcGllbnRMaXN0J1xuICAgICAgICApO1xuICAgIH1cbn1cblxuY2xhc3MgSW52YWxpZEZvcm1hdFJlY2lwaWVudExpc3QgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIFwiTyBmb3JtYXRvIGVzcGVyYWRvICgnTmFtZSA8ZW1haWw+Jzsgb3IgJzxlbWFpbD4nKSBuw6NvIGZvaSBlbmNvbnRyYWRvXCIsXG4gICAgICAgICAgICAnSW52YWxpZEZvcm1hdFJlY2lwaWVudExpc3QnXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jbGFzcyBJbnZhbGlkRnJvbSBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFwiTyBlbWFpbCBkbyBwYXLDom1ldHJvICdGcm9tJyBlc3TDoSBpbnbDoWxpZG9cIiwgJ0ludmFsaWRGcm9tJyk7XG4gICAgfVxufVxuXG5jbGFzcyBJbnZhbGlkRnJvbUZvcm1hdCBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgXCJPIGZvcm1hdG8gZXNwZXJhZG8gKCdOYW1lIDxlbWFpbD4nOyBvciAnPGVtYWlsPicpIG7Do28gZm9pIGVuY29udHJhZG9cIixcbiAgICAgICAgICAgICdJbnZhbGlkRnJvbUZvcm1hdCdcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNsYXNzIFBhcmFtc1Nob3VsZEJlT2JqZWN0IGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ1BhcsOibWV0cm9zIGRldmVtIHNlciBvYmpldG9zJywgJ1BhcmFtc1Nob3VsZEJlT2JqZWN0Jyk7XG4gICAgfVxufVxuXG5jbGFzcyBJbnZhbGlkU2VuZEF0Rm9ybWF0IGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoXCJPIGZvcm1hdG8gZXNwZXJhZG8gJ1lZWVktTU0tREQgSEg6bW06c3MnIG7Do28gZm9pIGVuY29udHJhZG9cIiwgJ0ludmFsaWRTZW5kQXRGb3JtYXQnKTtcbiAgICB9XG59XG5cbmNsYXNzIFNlbmRBdExvd2VyVGhhblRvZGF5IGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ08gdmFsb3IgcGFyYSBkYXRhIHRlbSBxdWUgc2VyIG1haW9yIGRvIHF1ZSBhIGF0dWFsJywgJ1NlbmRBdExvd2VyVGhhblRvZGF5Jyk7XG4gICAgfVxufVxuXG5jbGFzcyBUaW1lb3V0RXJyb3IgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKHRpbWVvdXQpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBgTyBzZXJ2aWRvciBuw6NvIHJlc3BvbmRldSBkZW50cm8gdGVtcG8gcXVlIHZvY8OqIGVzdGlwdWxvdSBkZSAke3RpbWVvdXR9IHNlZ3VuZG8ocylgLFxuICAgICAgICAgICAgJ1RpbWVvdXRFcnJvcidcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNsYXNzIEF0dGFjaG1lbnRzU2hvdWxkQmVMaXN0IGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBgQW5leG9zIGRldmVtIHNlciB1bWEgbGlzdGEgZGUgb2JqZXRvcy4gXG4gICAgICAgICAgICBFeGVtcGxvOiBbe25hbWU6ICdmb28uYmFyJywgZmlsZTogJ0lKSEpIYmtoeWk4NzYnfV1gLFxuICAgICAgICAgICAgJ0F0dGFjaG1lbnRzU2hvdWxkQmVMaXN0J1xuICAgICAgICApO1xuICAgIH1cbn1cblxuY2xhc3MgQXR0YWNobWVudFNob3VsZEJlT2JqZWN0IGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBgQW5leG8gZGV2ZSBzZXIgdW0gb2JqZXRvLiBcbiAgICAgICAgICAgIEV4ZW1wbG86IHtuYW1lOiAnZm9vLmJhcicsIGZpbGU6ICdJSkhKSGJraHlpODc2J31gLFxuICAgICAgICAgICAgJ0F0dGFjaG1lbnRTaG91bGRCZU9iamVjdCdcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNsYXNzIEF0dGFjaG1lbnRTaG91bGRIYXZlTmFtZSBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgYEFuZXhvIHRlbSBxdWUgY29udGVyIHVtIG5hbWUgKCdub21lJykuIFxuICAgICAgICAgICAgRXhlbXBsbzoge25hbWU6ICdmb28uYmFyJywgZmlsZTogJ0lKSEpIYmtoeWk4NzYnfWAsXG4gICAgICAgICAgICAnQXR0YWNobWVudFNob3VsZEhhdmVOYW1lJ1xuICAgICAgICApO1xuICAgIH1cbn1cblxuY2xhc3MgQXR0YWNobWVudFNob3VsZEhhdmVGaWxlIGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBgQW5leG8gdGVtIHF1ZSBjb250ZXIgbyBjb250ZcO6ZG8gZG8gYXJxdWl2byBlbSBiYXNlNjQuIFxuICAgICAgICAgICAgRXhlbXBsbzoge25hbWU6ICdmb28uYmFyJywgZmlsZTogJ0lKSEpIYmtoeWk4NzYnfWAsXG4gICAgICAgICAgICAnQXR0YWNobWVudFNob3VsZEhhdmVGaWxlJ1xuICAgICAgICApO1xuICAgIH1cbn1cblxuY2xhc3MgQXR0YWNobWVudEZpbGVTaG91bGRCZUJhc2U2NCBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdPIGFycXVpdm8gZG8gYW5leG8gdGVtIHF1ZSBlc3RhciBlbSBiYXNlNjQuJywgJ0F0dGFjaG1lbnRGaWxlU2hvdWxkQmVCYXNlNjQnKTtcbiAgICB9XG59XG5cbmNsYXNzIEF0dGFjaG1lbnRTaXplTGltaXQgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKGxpbWl0LCBuYW1lLCBkaWZmKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgYE8gdGFtYW5obyBkb3MgYW5leG9zIGV4Y2VkZW0gbyBsaW1pdGUgZGUgJHtsaW1pdH0gTUIgcGVybWl0aWRvLiBcbiAgICAgICAgICAgIE8gYW5leG8gJyR7bmFtZX0nIGV4Y2VkZSBlbSAke2RpZmZ9IE1CYCxcbiAgICAgICAgICAgICdBdHRhY2htZW50U2l6ZUxpbWl0J1xuICAgICAgICApO1xuICAgIH1cbn1cblxuY2xhc3MgQXR0YWNobWVudHNTaXplTGltaXQgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKGxpbWl0LCBkaWZmKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgYEEgc29tYSBkbyB0YW1hbmhvIGRvcyBhbmV4b3MgZXhjZWRlIG8gbGltaXRlIGRlICR7bGltaXR9IE1CIHBlcm1pdGlkby4gXG4gICAgICAgICAgICBPIHRvdGFsIGV4Y2VkZSBlbSAke2RpZmZ9IE1CYCxcbiAgICAgICAgICAgICdBdHRhY2htZW50U2l6ZUxpbWl0J1xuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IHtcbiAgICBBcGlFcnJvcixcbiAgICBOb01haWwsXG4gICAgTm9QYXJhbVgsXG4gICAgTm9TdWJqZWN0LFxuICAgIE5vQ29udGVudCxcbiAgICBOb0VuZHBvaW50LFxuICAgIE5vVGVtcGxhdGUsXG4gICAgSW52YWxpZEZyb20sXG4gICAgTm9QdWJsaWNLZXksXG4gICAgTm9TZWNyZXRLZXksXG4gICAgTm9SZWNpcGllbnQsXG4gICAgTm9SZXBseUVtYWlsLFxuICAgIE5vU2VhcmNoQXJncyxcbiAgICBUaW1lb3V0RXJyb3IsXG4gICAgV3JvbmdUeXBlUGFyYW1YLFxuICAgIE5vdE1haWxJbnN0YW5jZSxcbiAgICBJbnZhbGlkU2VydmVyVXJpLFxuICAgIEludmFsaWRGcm9tRm9ybWF0LFxuICAgIEF0dGFjaG1lbnRTaXplTGltaXQsXG4gICAgSW52YWxpZFNlbmRBdEZvcm1hdCxcbiAgICBTZW5kQXRMb3dlclRoYW5Ub2RheSxcbiAgICBBdHRhY2htZW50c1NpemVMaW1pdCxcbiAgICBOb1NlYXJjaEFyZ3NJbnN0YW5jZSxcbiAgICBOb1RlbXBsYXRlTm9GZWF0dXJlcyxcbiAgICBJbnZhbGlkUmVjaXBpZW50TGlzdCxcbiAgICBQYXJhbXNTaG91bGRCZU9iamVjdCxcbiAgICBBdHRhY2htZW50c1Nob3VsZEJlTGlzdCxcbiAgICBBdHRhY2htZW50U2hvdWxkQmVPYmplY3QsXG4gICAgQXR0YWNobWVudFNob3VsZEhhdmVOYW1lLFxuICAgIEF0dGFjaG1lbnRTaG91bGRIYXZlRmlsZSxcbiAgICBJbnZhbGlkRm9ybWF0UmVjaXBpZW50TGlzdCxcbiAgICBBdHRhY2htZW50RmlsZVNob3VsZEJlQmFzZTY0LFxufTtcbiJdfQ==