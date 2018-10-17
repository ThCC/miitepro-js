'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AttachmentFileShouldBeBase64 = exports.InvalidFormatRecipientList = exports.TimeBetweemBatchsLessThan5 = exports.BatchDistributionInvalid = exports.InvalidTimeBetweemBatchs = exports.AttachmentShouldHaveFile = exports.AttachmentShouldHaveName = exports.AttachmentShouldBeObject = exports.RecipientPerBatchGreater = exports.AttachmentsShouldBeList = exports.ParamsShouldBeObject = exports.InvalidRecipientList = exports.NoTemplateNoFeatures = exports.NoSearchArgsInstance = exports.AttachmentsSizeLimit = exports.BatchParamsNotInform = exports.AttachmentSizeLimit = exports.InvalidFromFormat = exports.InvalidServerUri = exports.NotMailInstance = exports.WrongTypeParamX = exports.BatchLowerThan2 = exports.BatchIsRequired = exports.BatchSizeLimit = exports.InvalidSendAt = exports.InvalidBatch = exports.TimeoutError = exports.NoSearchArgs = exports.NoReplyEmail = exports.NoRecipient = exports.NoSecretKey = exports.NoPublicKey = exports.InvalidFrom = exports.NoTemplate = exports.NoEndpoint = exports.NoContent = exports.NoSubject = exports.NoParamX = exports.NoMail = exports.ApiError = undefined;

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

var InvalidSendAt = function (_ExtendableError23) {
    _inherits(InvalidSendAt, _ExtendableError23);

    function InvalidSendAt() {
        _classCallCheck(this, InvalidSendAt);

        return _possibleConstructorReturn(this, (InvalidSendAt.__proto__ || Object.getPrototypeOf(InvalidSendAt)).call(this, "O formato esperado 'YYYY-MM-DD HH:mm:ss' não foi encontrado", 'InvalidSendAt'));
    }

    return InvalidSendAt;
}(ExtendableError);

var TimeoutError = function (_ExtendableError24) {
    _inherits(TimeoutError, _ExtendableError24);

    function TimeoutError(timeout) {
        _classCallCheck(this, TimeoutError);

        return _possibleConstructorReturn(this, (TimeoutError.__proto__ || Object.getPrototypeOf(TimeoutError)).call(this, 'O servidor n\xE3o respondeu dentro tempo que voc\xEA estipulou de ' + timeout + ' segundo(s)', 'TimeoutError'));
    }

    return TimeoutError;
}(ExtendableError);

var AttachmentsShouldBeList = function (_ExtendableError25) {
    _inherits(AttachmentsShouldBeList, _ExtendableError25);

    function AttachmentsShouldBeList() {
        _classCallCheck(this, AttachmentsShouldBeList);

        return _possibleConstructorReturn(this, (AttachmentsShouldBeList.__proto__ || Object.getPrototypeOf(AttachmentsShouldBeList)).call(this, 'Anexos devem ser uma lista de objetos. \n            Exemplo: [{name: \'foo.bar\', file: \'IJHJHbkhyi876\'}]', 'AttachmentsShouldBeList'));
    }

    return AttachmentsShouldBeList;
}(ExtendableError);

var AttachmentShouldBeObject = function (_ExtendableError26) {
    _inherits(AttachmentShouldBeObject, _ExtendableError26);

    function AttachmentShouldBeObject() {
        _classCallCheck(this, AttachmentShouldBeObject);

        return _possibleConstructorReturn(this, (AttachmentShouldBeObject.__proto__ || Object.getPrototypeOf(AttachmentShouldBeObject)).call(this, 'Anexo deve ser um objeto. \n            Exemplo: {name: \'foo.bar\', file: \'IJHJHbkhyi876\'}', 'AttachmentShouldBeObject'));
    }

    return AttachmentShouldBeObject;
}(ExtendableError);

var AttachmentShouldHaveName = function (_ExtendableError27) {
    _inherits(AttachmentShouldHaveName, _ExtendableError27);

    function AttachmentShouldHaveName() {
        _classCallCheck(this, AttachmentShouldHaveName);

        return _possibleConstructorReturn(this, (AttachmentShouldHaveName.__proto__ || Object.getPrototypeOf(AttachmentShouldHaveName)).call(this, 'Anexo tem que conter um name (\'nome\'). \n            Exemplo: {name: \'foo.bar\', file: \'IJHJHbkhyi876\'}', 'AttachmentShouldHaveName'));
    }

    return AttachmentShouldHaveName;
}(ExtendableError);

var AttachmentShouldHaveFile = function (_ExtendableError28) {
    _inherits(AttachmentShouldHaveFile, _ExtendableError28);

    function AttachmentShouldHaveFile() {
        _classCallCheck(this, AttachmentShouldHaveFile);

        return _possibleConstructorReturn(this, (AttachmentShouldHaveFile.__proto__ || Object.getPrototypeOf(AttachmentShouldHaveFile)).call(this, 'Anexo tem que conter o conte\xFAdo do arquivo em base64. \n            Exemplo: {name: \'foo.bar\', file: \'IJHJHbkhyi876\'}', 'AttachmentShouldHaveFile'));
    }

    return AttachmentShouldHaveFile;
}(ExtendableError);

var AttachmentFileShouldBeBase64 = function (_ExtendableError29) {
    _inherits(AttachmentFileShouldBeBase64, _ExtendableError29);

    function AttachmentFileShouldBeBase64() {
        _classCallCheck(this, AttachmentFileShouldBeBase64);

        return _possibleConstructorReturn(this, (AttachmentFileShouldBeBase64.__proto__ || Object.getPrototypeOf(AttachmentFileShouldBeBase64)).call(this, 'O arquivo do anexo tem que estar em base64.', 'AttachmentFileShouldBeBase64'));
    }

    return AttachmentFileShouldBeBase64;
}(ExtendableError);

var AttachmentSizeLimit = function (_ExtendableError30) {
    _inherits(AttachmentSizeLimit, _ExtendableError30);

    function AttachmentSizeLimit(limit, name, diff) {
        _classCallCheck(this, AttachmentSizeLimit);

        return _possibleConstructorReturn(this, (AttachmentSizeLimit.__proto__ || Object.getPrototypeOf(AttachmentSizeLimit)).call(this, 'O tamanho dos anexos excedem o limite de ' + limit + ' MB permitido. \n            O anexo \'' + name + '\' excede em ' + diff + ' MB', 'AttachmentSizeLimit'));
    }

    return AttachmentSizeLimit;
}(ExtendableError);

var AttachmentsSizeLimit = function (_ExtendableError31) {
    _inherits(AttachmentsSizeLimit, _ExtendableError31);

    function AttachmentsSizeLimit(limit, diff) {
        _classCallCheck(this, AttachmentsSizeLimit);

        return _possibleConstructorReturn(this, (AttachmentsSizeLimit.__proto__ || Object.getPrototypeOf(AttachmentsSizeLimit)).call(this, 'A soma do tamanho dos anexos excede o limite de ' + limit + ' MB permitido. \n            O total excede em ' + diff + ' MB', 'AttachmentSizeLimit'));
    }

    return AttachmentsSizeLimit;
}(ExtendableError);

var BatchIsRequired = function (_ExtendableError32) {
    _inherits(BatchIsRequired, _ExtendableError32);

    function BatchIsRequired(contacts) {
        _classCallCheck(this, BatchIsRequired);

        return _possibleConstructorReturn(this, (BatchIsRequired.__proto__ || Object.getPrototypeOf(BatchIsRequired)).call(this, 'N\xE3o pode enviar mais do que ' + contacts + ' emails sem fornecer\n        o par\xE2metro batch com uma valor m\xEDnimo de 2', 'BatchIsRequired'));
    }

    return BatchIsRequired;
}(ExtendableError);

var InvalidBatch = function (_ExtendableError33) {
    _inherits(InvalidBatch, _ExtendableError33);

    function InvalidBatch() {
        _classCallCheck(this, InvalidBatch);

        return _possibleConstructorReturn(this, (InvalidBatch.__proto__ || Object.getPrototypeOf(InvalidBatch)).call(this, 'Parâmetro não fornecido ou valor inválido', 'InvalidBatch'));
    }

    return InvalidBatch;
}(ExtendableError);

var BatchParamsNotInform = function (_ExtendableError34) {
    _inherits(BatchParamsNotInform, _ExtendableError34);

    function BatchParamsNotInform() {
        _classCallCheck(this, BatchParamsNotInform);

        return _possibleConstructorReturn(this, (BatchParamsNotInform.__proto__ || Object.getPrototypeOf(BatchParamsNotInform)).call(this, 'Parâmetros "batchs" e "recipientsPerBatchs" não fornecidos', 'BatchParamsNotInform'));
    }

    return BatchParamsNotInform;
}(ExtendableError);

var InvalidTimeBetweemBatchs = function (_ExtendableError35) {
    _inherits(InvalidTimeBetweemBatchs, _ExtendableError35);

    function InvalidTimeBetweemBatchs() {
        _classCallCheck(this, InvalidTimeBetweemBatchs);

        return _possibleConstructorReturn(this, (InvalidTimeBetweemBatchs.__proto__ || Object.getPrototypeOf(InvalidTimeBetweemBatchs)).call(this, 'Parâmetro não fornecido ou valor inválido', 'InvalidTimeBetweemBatchs'));
    }

    return InvalidTimeBetweemBatchs;
}(ExtendableError);

var BatchLowerThan2 = function (_ExtendableError36) {
    _inherits(BatchLowerThan2, _ExtendableError36);

    function BatchLowerThan2() {
        _classCallCheck(this, BatchLowerThan2);

        return _possibleConstructorReturn(this, (BatchLowerThan2.__proto__ || Object.getPrototypeOf(BatchLowerThan2)).call(this, 'O parâmetro é menor que 2', 'BatchLowerThan2'));
    }

    return BatchLowerThan2;
}(ExtendableError);

var TimeBetweemBatchsLessThan5 = function (_ExtendableError37) {
    _inherits(TimeBetweemBatchsLessThan5, _ExtendableError37);

    function TimeBetweemBatchsLessThan5() {
        _classCallCheck(this, TimeBetweemBatchsLessThan5);

        return _possibleConstructorReturn(this, (TimeBetweemBatchsLessThan5.__proto__ || Object.getPrototypeOf(TimeBetweemBatchsLessThan5)).call(this, 'O parâmetro é menor que 5', 'TimeBetweemBatchsLessThan5'));
    }

    return TimeBetweemBatchsLessThan5;
}(ExtendableError);

var BatchSizeLimit = function (_ExtendableError38) {
    _inherits(BatchSizeLimit, _ExtendableError38);

    function BatchSizeLimit(limit) {
        _classCallCheck(this, BatchSizeLimit);

        return _possibleConstructorReturn(this, (BatchSizeLimit.__proto__ || Object.getPrototypeOf(BatchSizeLimit)).call(this, 'O tamanho do batch excede o limite de ' + limit + ' emails', 'BatchSizeLimit'));
    }

    return BatchSizeLimit;
}(ExtendableError);

var RecipientPerBatchGreater = function (_ExtendableError39) {
    _inherits(RecipientPerBatchGreater, _ExtendableError39);

    function RecipientPerBatchGreater() {
        _classCallCheck(this, RecipientPerBatchGreater);

        return _possibleConstructorReturn(this, (RecipientPerBatchGreater.__proto__ || Object.getPrototypeOf(RecipientPerBatchGreater)).call(this, 'O valor do parâmetro "recipientsPerBatchs" é maior que a quantidade de destinatários', 'RecipientPerBatchGreater'));
    }

    return RecipientPerBatchGreater;
}(ExtendableError);

var BatchDistributionInvalid = function (_ExtendableError40) {
    _inherits(BatchDistributionInvalid, _ExtendableError40);

    function BatchDistributionInvalid() {
        _classCallCheck(this, BatchDistributionInvalid);

        return _possibleConstructorReturn(this, (BatchDistributionInvalid.__proto__ || Object.getPrototypeOf(BatchDistributionInvalid)).call(this, 'A distribui\xE7\xE3o de batches \xE9 inv\xE1lida, provavelmente o n\xFAmero de \n            destinat\xE1rios n\xE3o \xE9 m\xFAltipla dos batches', 'BatchDistributionInvalid'));
    }

    return BatchDistributionInvalid;
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
exports.InvalidBatch = InvalidBatch;
exports.InvalidSendAt = InvalidSendAt;
exports.BatchSizeLimit = BatchSizeLimit;
exports.BatchIsRequired = BatchIsRequired;
exports.BatchLowerThan2 = BatchLowerThan2;
exports.WrongTypeParamX = WrongTypeParamX;
exports.NotMailInstance = NotMailInstance;
exports.InvalidServerUri = InvalidServerUri;
exports.InvalidFromFormat = InvalidFromFormat;
exports.AttachmentSizeLimit = AttachmentSizeLimit;
exports.BatchParamsNotInform = BatchParamsNotInform;
exports.AttachmentsSizeLimit = AttachmentsSizeLimit;
exports.NoSearchArgsInstance = NoSearchArgsInstance;
exports.NoTemplateNoFeatures = NoTemplateNoFeatures;
exports.InvalidRecipientList = InvalidRecipientList;
exports.ParamsShouldBeObject = ParamsShouldBeObject;
exports.AttachmentsShouldBeList = AttachmentsShouldBeList;
exports.RecipientPerBatchGreater = RecipientPerBatchGreater;
exports.AttachmentShouldBeObject = AttachmentShouldBeObject;
exports.AttachmentShouldHaveName = AttachmentShouldHaveName;
exports.AttachmentShouldHaveFile = AttachmentShouldHaveFile;
exports.InvalidTimeBetweemBatchs = InvalidTimeBetweemBatchs;
exports.BatchDistributionInvalid = BatchDistributionInvalid;
exports.TimeBetweemBatchsLessThan5 = TimeBetweemBatchsLessThan5;
exports.InvalidFormatRecipientList = InvalidFormatRecipientList;
exports.AttachmentFileShouldBeBase64 = AttachmentFileShouldBeBase64;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9leGNlcHRpb25zLmpzIl0sIm5hbWVzIjpbIkV4dGVuZGFibGVFcnJvciIsIm1lc3NhZ2UiLCJuYW1lIiwiRXJyb3IiLCJjYXB0dXJlU3RhY2tUcmFjZSIsImNvbnN0cnVjdG9yIiwic3RhY2siLCJBcGlFcnJvciIsInJlYXNvbiIsIk5vQ29udGVudCIsIk5vVGVtcGxhdGUiLCJOb1RlbXBsYXRlTm9GZWF0dXJlcyIsIk5vTWFpbCIsIk5vdE1haWxJbnN0YW5jZSIsIk5vRW5kcG9pbnQiLCJOb1N1YmplY3QiLCJOb1JlY2lwaWVudCIsIk5vUHVibGljS2V5IiwiTm9TZWNyZXRLZXkiLCJJbnZhbGlkU2VydmVyVXJpIiwiTm9SZXBseUVtYWlsIiwiTm9TZWFyY2hBcmdzIiwiTm9TZWFyY2hBcmdzSW5zdGFuY2UiLCJOb1BhcmFtWCIsInBhcmFtTmFtZSIsImNhcGl0YWxpemUiLCJXcm9uZ1R5cGVQYXJhbVgiLCJkVHlwZSIsIkludmFsaWRSZWNpcGllbnRMaXN0IiwiZW1haWwiLCJJbnZhbGlkRm9ybWF0UmVjaXBpZW50TGlzdCIsIkludmFsaWRGcm9tIiwiSW52YWxpZEZyb21Gb3JtYXQiLCJQYXJhbXNTaG91bGRCZU9iamVjdCIsIkludmFsaWRTZW5kQXQiLCJUaW1lb3V0RXJyb3IiLCJ0aW1lb3V0IiwiQXR0YWNobWVudHNTaG91bGRCZUxpc3QiLCJBdHRhY2htZW50U2hvdWxkQmVPYmplY3QiLCJBdHRhY2htZW50U2hvdWxkSGF2ZU5hbWUiLCJBdHRhY2htZW50U2hvdWxkSGF2ZUZpbGUiLCJBdHRhY2htZW50RmlsZVNob3VsZEJlQmFzZTY0IiwiQXR0YWNobWVudFNpemVMaW1pdCIsImxpbWl0IiwiZGlmZiIsIkF0dGFjaG1lbnRzU2l6ZUxpbWl0IiwiQmF0Y2hJc1JlcXVpcmVkIiwiY29udGFjdHMiLCJJbnZhbGlkQmF0Y2giLCJCYXRjaFBhcmFtc05vdEluZm9ybSIsIkludmFsaWRUaW1lQmV0d2VlbUJhdGNocyIsIkJhdGNoTG93ZXJUaGFuMiIsIlRpbWVCZXR3ZWVtQmF0Y2hzTGVzc1RoYW41IiwiQmF0Y2hTaXplTGltaXQiLCJSZWNpcGllbnRQZXJCYXRjaEdyZWF0ZXIiLCJCYXRjaERpc3RyaWJ1dGlvbkludmFsaWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRU1BLGU7OztBQUNGLDZCQUFZQyxPQUFaLEVBQXFCQyxJQUFyQixFQUEyQjtBQUFBOztBQUFBLHNJQUNqQkQsT0FEaUI7O0FBRXZCLGNBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUNBLFlBQUksT0FBT0MsTUFBTUMsaUJBQWIsS0FBbUMsVUFBdkMsRUFBbUQ7QUFDL0NELGtCQUFNQyxpQkFBTixRQUE4QixNQUFLQyxXQUFuQztBQUNILFNBRkQsTUFFTztBQUNILGtCQUFLQyxLQUFMLEdBQWMsSUFBSUgsS0FBSixDQUFVRixPQUFWLENBQUQsQ0FBcUJLLEtBQWxDO0FBQ0g7QUFQc0I7QUFRMUI7OztFQVR5QkgsSzs7SUFZeEJJLFE7OztBQUNGLHNCQUFZQyxNQUFaLEVBQW9CO0FBQUE7O0FBQUEsK0lBQ2dCQSxNQURoQixFQUMwQixVQUQxQjtBQUVuQjs7O0VBSGtCUixlOztJQU1qQlMsUzs7O0FBQ0YseUJBQWM7QUFBQTs7QUFBQSxxSEFDSixtRkFDRiwrQ0FGTSxFQUUyQyxXQUYzQztBQUdiOzs7RUFKbUJULGU7O0lBT2xCVSxVOzs7QUFDRiwwQkFBYztBQUFBOztBQUFBLHVIQUVOLGdFQUNBLGlEQUhNLEVBSU4sWUFKTTtBQU1iOzs7RUFQb0JWLGU7O0lBVW5CVyxvQjs7O0FBQ0Ysb0NBQWM7QUFBQTs7QUFBQSwySUFFTiw4RUFGTSxFQUdOLHNCQUhNO0FBS2I7OztFQU44QlgsZTs7SUFTN0JZLE07OztBQUNGLHNCQUFjO0FBQUE7O0FBQUEsK0dBQ0osOENBREksRUFDNEMsUUFENUM7QUFFYjs7O0VBSGdCWixlOztJQU1mYSxlOzs7QUFDRiwrQkFBYztBQUFBOztBQUFBLGlJQUNKLHdDQURJLEVBQ3NDLGlCQUR0QztBQUViOzs7RUFIeUJiLGU7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QUFBQSxtSkFFTixzRkFGTSxFQUdOLDBCQUhNO0FBS2I7OztFQU5rQ3RELGU7O0lBU2pDdUQsd0I7OztBQUNGLHdDQUFjO0FBQUE7O0FBQUEsd1NBSU4sMEJBSk07QUFNYjs7O0VBUGtDdkQsZTs7UUFXbkNPLFEsR0FBQUEsUTtRQUNBSyxNLEdBQUFBLE07UUFDQVcsUSxHQUFBQSxRO1FBQ0FSLFMsR0FBQUEsUztRQUNBTixTLEdBQUFBLFM7UUFDQUssVSxHQUFBQSxVO1FBQ0FKLFUsR0FBQUEsVTtRQUNBcUIsVyxHQUFBQSxXO1FBQ0FkLFcsR0FBQUEsVztRQUNBQyxXLEdBQUFBLFc7UUFDQUYsVyxHQUFBQSxXO1FBQ0FJLFksR0FBQUEsWTtRQUNBQyxZLEdBQUFBLFk7UUFDQWMsWSxHQUFBQSxZO1FBQ0FhLFksR0FBQUEsWTtRQUNBZCxhLEdBQUFBLGE7UUFDQW1CLGMsR0FBQUEsYztRQUNBUCxlLEdBQUFBLGU7UUFDQUssZSxHQUFBQSxlO1FBQ0F6QixlLEdBQUFBLGU7UUFDQWIsZSxHQUFBQSxlO1FBQ0FNLGdCLEdBQUFBLGdCO1FBQ0FhLGlCLEdBQUFBLGlCO1FBQ0FVLG1CLEdBQUFBLG1CO1FBQ0FPLG9CLEdBQUFBLG9CO1FBQ0FKLG9CLEdBQUFBLG9CO1FBQ0F2QixvQixHQUFBQSxvQjtRQUNBWCxvQixHQUFBQSxvQjtRQUNBaUIsb0IsR0FBQUEsb0I7UUFDQUssb0IsR0FBQUEsb0I7UUFDQUksdUIsR0FBQUEsdUI7UUFDQWlCLHdCLEdBQUFBLHdCO1FBQ0FoQix3QixHQUFBQSx3QjtRQUNBQyx3QixHQUFBQSx3QjtRQUNBQyx3QixHQUFBQSx3QjtRQUNBVSx3QixHQUFBQSx3QjtRQUNBSyx3QixHQUFBQSx3QjtRQUNBSCwwQixHQUFBQSwwQjtRQUNBdEIsMEIsR0FBQUEsMEI7UUFDQVcsNEIsR0FBQUEsNEIiLCJmaWxlIjoiZXhjZXB0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5cbmNsYXNzIEV4dGVuZGFibGVFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBuYW1lKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICBpZiAodHlwZW9mIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhY2sgPSAobmV3IEVycm9yKG1lc3NhZ2UpKS5zdGFjaztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuY2xhc3MgQXBpRXJyb3IgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKHJlYXNvbikge1xuICAgICAgICBzdXBlcihgTWl0dGVQcm9FcnJvci4gUmVhc29uOiAke3JlYXNvbn1gLCAnQXBpRXJyb3InKTtcbiAgICB9XG59XG5cbmNsYXNzIE5vQ29udGVudCBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdJbXBvc3PDrXZlbCBlbnZpYXIgdW0gZW1haWwgc2VtIGNvbnRlw7pkby4gw4kgcHJlY2lzbyBmb3JuZWNlciB1bSBkb3MgcGFyw6JtZXRyb3MgJyArXG4gICAgICAgICAgICAnXCJtZXNzYWdlVGV4dFwiLCBcIm1lc3NhZ2VIdG1sXCIgb3UgXCJhdHRhY2htZW50c1wiJywgJ05vQ29udGVudCcpO1xuICAgIH1cbn1cblxuY2xhc3MgTm9UZW1wbGF0ZSBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgJ0ltcG9zc8OtdmVsIGVudmlhciB1bSBlbWFpbCBkZSB0ZW1wbGF0ZSwgc2VtIGNvbnRlw7pkbyBodG1sLiAnICtcbiAgICAgICAgICAgICdPdSB2b2PDqiBmb3JuZWNlIG8gdGVtcGxhdGVTbHVnIG91IG8gbWVzc2FnZUh0bWwnLFxuICAgICAgICAgICAgJ05vVGVtcGxhdGUnXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jbGFzcyBOb1RlbXBsYXRlTm9GZWF0dXJlcyBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgXCJJbXBvc3PDrXZlbCB1c2FyIGFzIGZ1bmNpb25hbGlkYWRlIGRlIHRlbXBsYXRlLCBzZW0gZm9ybmVjZXIgbyAndGVtcGxhdGVTbHVnJ1wiLFxuICAgICAgICAgICAgJ05vVGVtcGxhdGVOb0ZlYXR1cmVzJ1xuICAgICAgICApO1xuICAgIH1cbn1cblxuY2xhc3MgTm9NYWlsIGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ0ltcG9zc8OtdmVsIGVudmlhciB1bSBlbWFpbCBzZW0gb3MgcGFyw6JtZXRyb3MnLCAnTm9NYWlsJyk7XG4gICAgfVxufVxuXG5jbGFzcyBOb3RNYWlsSW5zdGFuY2UgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcignRXNwZXJhbmRvIHVtYSBpbnN0w6JuY2lhIGRvIG1vZGVsbyBNYWlsJywgJ05vdE1haWxJbnN0YW5jZScpO1xuICAgIH1cbn1cblxuY2xhc3MgTm9FbmRwb2ludCBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdJbXBvc3PDrXZlbCBkZSBhZHF1aXJpciBvIHBheWxvYWQgc2VtIG8gZW5kcG9pbnQnLCAnTm9FbmRwb2ludCcpO1xuICAgIH1cbn1cblxuY2xhc3MgTm9TdWJqZWN0IGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ0ltcG9zc8OtdmVsIGRlIGVudmlhciB1bSBlbWFpbCBzZW0gYXNzdW50bycsICdOb1N1YmplY3QnKTtcbiAgICB9XG59XG5cbmNsYXNzIE5vUmVjaXBpZW50IGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ0ltcG9zc8OtdmVsIGRlIGVudmlhciB1bSBlbWFpbCBzZW0gYW8gbWVub3MgdW0gZGVzdGluYXTDoXJpbycsICdOb1JlY2lwaWVudCcpO1xuICAgIH1cbn1cblxuY2xhc3MgTm9QdWJsaWNLZXkgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcignTWl0dGVQcm9FcnJvci4gU2VtIGNoYXZlIHDDumJsaWNhLicsICdOb1B1YmxpY0tleScpO1xuICAgIH1cbn1cblxuY2xhc3MgTm9TZWNyZXRLZXkgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihcIk1pdHRlUHJvRXJyb3IuIFNlbSBjaGF2ZSBwcml2YWRhLlwiLCAnTm9TZWNyZXRLZXknKTtcbiAgICB9XG59XG5cbmNsYXNzIEludmFsaWRTZXJ2ZXJVcmkgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgICdNaXR0ZVByb0Vycm9yLiBJbnbDoWxpZGEgdXJpZGUgZG8gc2Vydmlkb3IsIMOpIGVzcGVyYWRvIHVtYSBzdHJpbmcuJyxcbiAgICAgICAgICAgICdJbnZhbGlkU2VydmVyVXJpJ1xuICAgICAgICApO1xuICAgIH1cbn1cblxuY2xhc3MgTm9SZXBseUVtYWlsIGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ0Zvcm5lw6dhIHVtIGVtYWlsIGRlIHJlbWVudGVudGUnLCAnTm9SZXBseUVtYWlsJyk7XG4gICAgfVxufVxuXG5jbGFzcyBOb1NlYXJjaEFyZ3MgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcignSW1wb3Nzw612ZWwgYWRxdWlyaXIgZW1haWxzIHNlbSBwYXLDom1ldHJvcyBwYXJhIHBlc3F1aXNhJywgJ05vU2VhcmNoQXJncycpO1xuICAgIH1cbn1cblxuY2xhc3MgTm9TZWFyY2hBcmdzSW5zdGFuY2UgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcignRXNwZXJhbmRvIHVtYSBpbnN0w6JuY2lhIGRvIG1vZGVsbyBTZWFyY2hBcmdzJywgJ05vU2VhcmNoQXJnc0luc3RhbmNlJyk7XG4gICAgfVxufVxuXG5jbGFzcyBOb1BhcmFtWCBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IocGFyYW1OYW1lKSB7XG4gICAgICAgIHN1cGVyKGBGb3JuZcOnYSBvIHBhcsOibWV0cm8gJHtwYXJhbU5hbWV9YCwgYE5vUGFyYW0ke18uY2FwaXRhbGl6ZShwYXJhbU5hbWUpfWApO1xuICAgIH1cbn1cblxuY2xhc3MgV3JvbmdUeXBlUGFyYW1YIGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihkVHlwZSwgcGFyYW1OYW1lKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgYFBhcsOibWV0cm8gJHtwYXJhbU5hbWV9IHRlbSBxdWUgc2VyIGRvIHRpcG8gJHtkVHlwZX1gLFxuICAgICAgICAgICAgYFdyb25nVHlwZVBhcmFtJHtfLmNhcGl0YWxpemUocGFyYW1OYW1lKX1gXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jbGFzcyBJbnZhbGlkUmVjaXBpZW50TGlzdCBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoZW1haWwpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBgTyBlbWFpbCAke2VtYWlsfSBkbyBwYXLDom1ldHJvICdyZWNpcGllbnRMaXN0JyDDqSBpbnbDoWxpZG9gLFxuICAgICAgICAgICAgJ0ludmFsaWRSZWNpcGllbnRMaXN0J1xuICAgICAgICApO1xuICAgIH1cbn1cblxuY2xhc3MgSW52YWxpZEZvcm1hdFJlY2lwaWVudExpc3QgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIFwiTyBmb3JtYXRvIGVzcGVyYWRvICgnTmFtZSA8ZW1haWw+Jzsgb3IgJzxlbWFpbD4nKSBuw6NvIGZvaSBlbmNvbnRyYWRvXCIsXG4gICAgICAgICAgICAnSW52YWxpZEZvcm1hdFJlY2lwaWVudExpc3QnXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jbGFzcyBJbnZhbGlkRnJvbSBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFwiTyBlbWFpbCBkbyBwYXLDom1ldHJvICdGcm9tJyBlc3TDoSBpbnbDoWxpZG9cIiwgJ0ludmFsaWRGcm9tJyk7XG4gICAgfVxufVxuXG5jbGFzcyBJbnZhbGlkRnJvbUZvcm1hdCBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgXCJPIGZvcm1hdG8gZXNwZXJhZG8gKCdOYW1lIDxlbWFpbD4nOyBvciAnPGVtYWlsPicpIG7Do28gZm9pIGVuY29udHJhZG9cIixcbiAgICAgICAgICAgICdJbnZhbGlkRnJvbUZvcm1hdCdcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNsYXNzIFBhcmFtc1Nob3VsZEJlT2JqZWN0IGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ1BhcsOibWV0cm9zIGRldmVtIHNlciBvYmpldG9zJywgJ1BhcmFtc1Nob3VsZEJlT2JqZWN0Jyk7XG4gICAgfVxufVxuXG5jbGFzcyBJbnZhbGlkU2VuZEF0IGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoXCJPIGZvcm1hdG8gZXNwZXJhZG8gJ1lZWVktTU0tREQgSEg6bW06c3MnIG7Do28gZm9pIGVuY29udHJhZG9cIiwgJ0ludmFsaWRTZW5kQXQnKTtcbiAgICB9XG59XG5cbmNsYXNzIFRpbWVvdXRFcnJvciBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IodGltZW91dCkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIGBPIHNlcnZpZG9yIG7Do28gcmVzcG9uZGV1IGRlbnRybyB0ZW1wbyBxdWUgdm9jw6ogZXN0aXB1bG91IGRlICR7dGltZW91dH0gc2VndW5kbyhzKWAsXG4gICAgICAgICAgICAnVGltZW91dEVycm9yJ1xuICAgICAgICApO1xuICAgIH1cbn1cblxuY2xhc3MgQXR0YWNobWVudHNTaG91bGRCZUxpc3QgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIGBBbmV4b3MgZGV2ZW0gc2VyIHVtYSBsaXN0YSBkZSBvYmpldG9zLiBcbiAgICAgICAgICAgIEV4ZW1wbG86IFt7bmFtZTogJ2Zvby5iYXInLCBmaWxlOiAnSUpISkhia2h5aTg3Nid9XWAsXG4gICAgICAgICAgICAnQXR0YWNobWVudHNTaG91bGRCZUxpc3QnXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jbGFzcyBBdHRhY2htZW50U2hvdWxkQmVPYmplY3QgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIGBBbmV4byBkZXZlIHNlciB1bSBvYmpldG8uIFxuICAgICAgICAgICAgRXhlbXBsbzoge25hbWU6ICdmb28uYmFyJywgZmlsZTogJ0lKSEpIYmtoeWk4NzYnfWAsXG4gICAgICAgICAgICAnQXR0YWNobWVudFNob3VsZEJlT2JqZWN0J1xuICAgICAgICApO1xuICAgIH1cbn1cblxuY2xhc3MgQXR0YWNobWVudFNob3VsZEhhdmVOYW1lIGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBgQW5leG8gdGVtIHF1ZSBjb250ZXIgdW0gbmFtZSAoJ25vbWUnKS4gXG4gICAgICAgICAgICBFeGVtcGxvOiB7bmFtZTogJ2Zvby5iYXInLCBmaWxlOiAnSUpISkhia2h5aTg3Nid9YCxcbiAgICAgICAgICAgICdBdHRhY2htZW50U2hvdWxkSGF2ZU5hbWUnXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jbGFzcyBBdHRhY2htZW50U2hvdWxkSGF2ZUZpbGUgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIGBBbmV4byB0ZW0gcXVlIGNvbnRlciBvIGNvbnRlw7pkbyBkbyBhcnF1aXZvIGVtIGJhc2U2NC4gXG4gICAgICAgICAgICBFeGVtcGxvOiB7bmFtZTogJ2Zvby5iYXInLCBmaWxlOiAnSUpISkhia2h5aTg3Nid9YCxcbiAgICAgICAgICAgICdBdHRhY2htZW50U2hvdWxkSGF2ZUZpbGUnXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jbGFzcyBBdHRhY2htZW50RmlsZVNob3VsZEJlQmFzZTY0IGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ08gYXJxdWl2byBkbyBhbmV4byB0ZW0gcXVlIGVzdGFyIGVtIGJhc2U2NC4nLCAnQXR0YWNobWVudEZpbGVTaG91bGRCZUJhc2U2NCcpO1xuICAgIH1cbn1cblxuY2xhc3MgQXR0YWNobWVudFNpemVMaW1pdCBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IobGltaXQsIG5hbWUsIGRpZmYpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBgTyB0YW1hbmhvIGRvcyBhbmV4b3MgZXhjZWRlbSBvIGxpbWl0ZSBkZSAke2xpbWl0fSBNQiBwZXJtaXRpZG8uIFxuICAgICAgICAgICAgTyBhbmV4byAnJHtuYW1lfScgZXhjZWRlIGVtICR7ZGlmZn0gTUJgLFxuICAgICAgICAgICAgJ0F0dGFjaG1lbnRTaXplTGltaXQnXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jbGFzcyBBdHRhY2htZW50c1NpemVMaW1pdCBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IobGltaXQsIGRpZmYpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBgQSBzb21hIGRvIHRhbWFuaG8gZG9zIGFuZXhvcyBleGNlZGUgbyBsaW1pdGUgZGUgJHtsaW1pdH0gTUIgcGVybWl0aWRvLiBcbiAgICAgICAgICAgIE8gdG90YWwgZXhjZWRlIGVtICR7ZGlmZn0gTUJgLFxuICAgICAgICAgICAgJ0F0dGFjaG1lbnRTaXplTGltaXQnXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jbGFzcyBCYXRjaElzUmVxdWlyZWQgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKGNvbnRhY3RzKSB7XG4gICAgICAgIHN1cGVyKGBOw6NvIHBvZGUgZW52aWFyIG1haXMgZG8gcXVlICR7Y29udGFjdHN9IGVtYWlscyBzZW0gZm9ybmVjZXJcbiAgICAgICAgbyBwYXLDom1ldHJvIGJhdGNoIGNvbSB1bWEgdmFsb3IgbcOtbmltbyBkZSAyYCwgJ0JhdGNoSXNSZXF1aXJlZCcpO1xuICAgIH1cbn1cblxuY2xhc3MgSW52YWxpZEJhdGNoIGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ1BhcsOibWV0cm8gbsOjbyBmb3JuZWNpZG8gb3UgdmFsb3IgaW52w6FsaWRvJywgJ0ludmFsaWRCYXRjaCcpO1xuICAgIH1cbn1cblxuY2xhc3MgQmF0Y2hQYXJhbXNOb3RJbmZvcm0gZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgICdQYXLDom1ldHJvcyBcImJhdGNoc1wiIGUgXCJyZWNpcGllbnRzUGVyQmF0Y2hzXCIgbsOjbyBmb3JuZWNpZG9zJywgJ0JhdGNoUGFyYW1zTm90SW5mb3JtJ1xuICAgICAgICApO1xuICAgIH1cbn1cblxuY2xhc3MgSW52YWxpZFRpbWVCZXR3ZWVtQmF0Y2hzIGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ1BhcsOibWV0cm8gbsOjbyBmb3JuZWNpZG8gb3UgdmFsb3IgaW52w6FsaWRvJywgJ0ludmFsaWRUaW1lQmV0d2VlbUJhdGNocycpO1xuICAgIH1cbn1cblxuY2xhc3MgQmF0Y2hMb3dlclRoYW4yIGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ08gcGFyw6JtZXRybyDDqSBtZW5vciBxdWUgMicsICdCYXRjaExvd2VyVGhhbjInKTtcbiAgICB9XG59XG5cbmNsYXNzIFRpbWVCZXR3ZWVtQmF0Y2hzTGVzc1RoYW41IGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ08gcGFyw6JtZXRybyDDqSBtZW5vciBxdWUgNScsICdUaW1lQmV0d2VlbUJhdGNoc0xlc3NUaGFuNScpO1xuICAgIH1cbn1cblxuY2xhc3MgQmF0Y2hTaXplTGltaXQgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKGxpbWl0KSB7XG4gICAgICAgIHN1cGVyKGBPIHRhbWFuaG8gZG8gYmF0Y2ggZXhjZWRlIG8gbGltaXRlIGRlICR7bGltaXR9IGVtYWlsc2AsICdCYXRjaFNpemVMaW1pdCcpO1xuICAgIH1cbn1cblxuY2xhc3MgUmVjaXBpZW50UGVyQmF0Y2hHcmVhdGVyIGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICAnTyB2YWxvciBkbyBwYXLDom1ldHJvIFwicmVjaXBpZW50c1BlckJhdGNoc1wiIMOpIG1haW9yIHF1ZSBhIHF1YW50aWRhZGUgZGUgZGVzdGluYXTDoXJpb3MnLFxuICAgICAgICAgICAgJ1JlY2lwaWVudFBlckJhdGNoR3JlYXRlcidcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNsYXNzIEJhdGNoRGlzdHJpYnV0aW9uSW52YWxpZCBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgYEEgZGlzdHJpYnVpw6fDo28gZGUgYmF0Y2hlcyDDqSBpbnbDoWxpZGEsIHByb3ZhdmVsbWVudGUgbyBuw7ptZXJvIGRlIFxuICAgICAgICAgICAgZGVzdGluYXTDoXJpb3MgbsOjbyDDqSBtw7psdGlwbGEgZG9zIGJhdGNoZXNgLFxuICAgICAgICAgICAgJ0JhdGNoRGlzdHJpYnV0aW9uSW52YWxpZCdcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCB7XG4gICAgQXBpRXJyb3IsXG4gICAgTm9NYWlsLFxuICAgIE5vUGFyYW1YLFxuICAgIE5vU3ViamVjdCxcbiAgICBOb0NvbnRlbnQsXG4gICAgTm9FbmRwb2ludCxcbiAgICBOb1RlbXBsYXRlLFxuICAgIEludmFsaWRGcm9tLFxuICAgIE5vUHVibGljS2V5LFxuICAgIE5vU2VjcmV0S2V5LFxuICAgIE5vUmVjaXBpZW50LFxuICAgIE5vUmVwbHlFbWFpbCxcbiAgICBOb1NlYXJjaEFyZ3MsXG4gICAgVGltZW91dEVycm9yLFxuICAgIEludmFsaWRCYXRjaCxcbiAgICBJbnZhbGlkU2VuZEF0LFxuICAgIEJhdGNoU2l6ZUxpbWl0LFxuICAgIEJhdGNoSXNSZXF1aXJlZCxcbiAgICBCYXRjaExvd2VyVGhhbjIsXG4gICAgV3JvbmdUeXBlUGFyYW1YLFxuICAgIE5vdE1haWxJbnN0YW5jZSxcbiAgICBJbnZhbGlkU2VydmVyVXJpLFxuICAgIEludmFsaWRGcm9tRm9ybWF0LFxuICAgIEF0dGFjaG1lbnRTaXplTGltaXQsXG4gICAgQmF0Y2hQYXJhbXNOb3RJbmZvcm0sXG4gICAgQXR0YWNobWVudHNTaXplTGltaXQsXG4gICAgTm9TZWFyY2hBcmdzSW5zdGFuY2UsXG4gICAgTm9UZW1wbGF0ZU5vRmVhdHVyZXMsXG4gICAgSW52YWxpZFJlY2lwaWVudExpc3QsXG4gICAgUGFyYW1zU2hvdWxkQmVPYmplY3QsXG4gICAgQXR0YWNobWVudHNTaG91bGRCZUxpc3QsXG4gICAgUmVjaXBpZW50UGVyQmF0Y2hHcmVhdGVyLFxuICAgIEF0dGFjaG1lbnRTaG91bGRCZU9iamVjdCxcbiAgICBBdHRhY2htZW50U2hvdWxkSGF2ZU5hbWUsXG4gICAgQXR0YWNobWVudFNob3VsZEhhdmVGaWxlLFxuICAgIEludmFsaWRUaW1lQmV0d2VlbUJhdGNocyxcbiAgICBCYXRjaERpc3RyaWJ1dGlvbkludmFsaWQsXG4gICAgVGltZUJldHdlZW1CYXRjaHNMZXNzVGhhbjUsXG4gICAgSW52YWxpZEZvcm1hdFJlY2lwaWVudExpc3QsXG4gICAgQXR0YWNobWVudEZpbGVTaG91bGRCZUJhc2U2NCxcbn07XG4iXX0=