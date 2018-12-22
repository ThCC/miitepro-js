'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AttachmentFileShouldBeBase64 = exports.InvalidFormatRecipientList = exports.TimeBetweemBatchsLessThan5 = exports.BatchDistributionInvalid = exports.InvalidTimeBetweemBatchs = exports.AttachmentShouldHaveFile = exports.AttachmentShouldHaveName = exports.AttachmentShouldBeObject = exports.RecipientPerBatchGreater = exports.AttachmentsShouldBeList = exports.ParamsShouldBeObject = exports.InvalidRecipientList = exports.NoTemplateNoFeatures = exports.NoSearchArgsInstance = exports.AttachmentsSizeLimit = exports.BatchParamsNotInform = exports.SendAtLowerThanToday = exports.InvalidSendAtFormat = exports.AttachmentSizeLimit = exports.InvalidFromFormat = exports.InvalidServerUri = exports.NotMailInstance = exports.WrongTypeParamX = exports.BatchLowerThan2 = exports.BatchIsRequired = exports.BatchSizeLimit = exports.InvalidBatch = exports.TimeoutError = exports.NoSearchArgs = exports.NoReplyEmail = exports.NoRecipient = exports.NoSecretKey = exports.NoPublicKey = exports.InvalidFrom = exports.NoTemplate = exports.NoEndpoint = exports.NoContent = exports.NoSubject = exports.NoParamX = exports.NoMail = exports.ApiError = undefined;

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

var BatchIsRequired = function (_ExtendableError33) {
    _inherits(BatchIsRequired, _ExtendableError33);

    function BatchIsRequired(contacts) {
        _classCallCheck(this, BatchIsRequired);

        return _possibleConstructorReturn(this, (BatchIsRequired.__proto__ || Object.getPrototypeOf(BatchIsRequired)).call(this, 'N\xE3o pode enviar mais do que ' + contacts + ' emails sem fornecer\n        o par\xE2metro batch com uma valor m\xEDnimo de 2', 'BatchIsRequired'));
    }

    return BatchIsRequired;
}(ExtendableError);

var InvalidBatch = function (_ExtendableError34) {
    _inherits(InvalidBatch, _ExtendableError34);

    function InvalidBatch() {
        _classCallCheck(this, InvalidBatch);

        return _possibleConstructorReturn(this, (InvalidBatch.__proto__ || Object.getPrototypeOf(InvalidBatch)).call(this, 'Parâmetro não fornecido ou valor inválido', 'InvalidBatch'));
    }

    return InvalidBatch;
}(ExtendableError);

var BatchParamsNotInform = function (_ExtendableError35) {
    _inherits(BatchParamsNotInform, _ExtendableError35);

    function BatchParamsNotInform() {
        _classCallCheck(this, BatchParamsNotInform);

        return _possibleConstructorReturn(this, (BatchParamsNotInform.__proto__ || Object.getPrototypeOf(BatchParamsNotInform)).call(this, 'Parâmetros "batchs" e "recipientsPerBatchs" não fornecidos', 'BatchParamsNotInform'));
    }

    return BatchParamsNotInform;
}(ExtendableError);

var InvalidTimeBetweemBatchs = function (_ExtendableError36) {
    _inherits(InvalidTimeBetweemBatchs, _ExtendableError36);

    function InvalidTimeBetweemBatchs() {
        _classCallCheck(this, InvalidTimeBetweemBatchs);

        return _possibleConstructorReturn(this, (InvalidTimeBetweemBatchs.__proto__ || Object.getPrototypeOf(InvalidTimeBetweemBatchs)).call(this, 'Parâmetro não fornecido ou valor inválido', 'InvalidTimeBetweemBatchs'));
    }

    return InvalidTimeBetweemBatchs;
}(ExtendableError);

var BatchLowerThan2 = function (_ExtendableError37) {
    _inherits(BatchLowerThan2, _ExtendableError37);

    function BatchLowerThan2() {
        _classCallCheck(this, BatchLowerThan2);

        return _possibleConstructorReturn(this, (BatchLowerThan2.__proto__ || Object.getPrototypeOf(BatchLowerThan2)).call(this, 'O parâmetro é menor que 2', 'BatchLowerThan2'));
    }

    return BatchLowerThan2;
}(ExtendableError);

var TimeBetweemBatchsLessThan5 = function (_ExtendableError38) {
    _inherits(TimeBetweemBatchsLessThan5, _ExtendableError38);

    function TimeBetweemBatchsLessThan5() {
        _classCallCheck(this, TimeBetweemBatchsLessThan5);

        return _possibleConstructorReturn(this, (TimeBetweemBatchsLessThan5.__proto__ || Object.getPrototypeOf(TimeBetweemBatchsLessThan5)).call(this, 'O parâmetro é menor que 5', 'TimeBetweemBatchsLessThan5'));
    }

    return TimeBetweemBatchsLessThan5;
}(ExtendableError);

var BatchSizeLimit = function (_ExtendableError39) {
    _inherits(BatchSizeLimit, _ExtendableError39);

    function BatchSizeLimit(limit) {
        _classCallCheck(this, BatchSizeLimit);

        return _possibleConstructorReturn(this, (BatchSizeLimit.__proto__ || Object.getPrototypeOf(BatchSizeLimit)).call(this, 'O tamanho do batch excede o limite de ' + limit + ' emails', 'BatchSizeLimit'));
    }

    return BatchSizeLimit;
}(ExtendableError);

var RecipientPerBatchGreater = function (_ExtendableError40) {
    _inherits(RecipientPerBatchGreater, _ExtendableError40);

    function RecipientPerBatchGreater() {
        _classCallCheck(this, RecipientPerBatchGreater);

        return _possibleConstructorReturn(this, (RecipientPerBatchGreater.__proto__ || Object.getPrototypeOf(RecipientPerBatchGreater)).call(this, 'O valor do parâmetro "recipientsPerBatchs" é maior que a quantidade de destinatários', 'RecipientPerBatchGreater'));
    }

    return RecipientPerBatchGreater;
}(ExtendableError);

var BatchDistributionInvalid = function (_ExtendableError41) {
    _inherits(BatchDistributionInvalid, _ExtendableError41);

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
exports.BatchSizeLimit = BatchSizeLimit;
exports.BatchIsRequired = BatchIsRequired;
exports.BatchLowerThan2 = BatchLowerThan2;
exports.WrongTypeParamX = WrongTypeParamX;
exports.NotMailInstance = NotMailInstance;
exports.InvalidServerUri = InvalidServerUri;
exports.InvalidFromFormat = InvalidFromFormat;
exports.AttachmentSizeLimit = AttachmentSizeLimit;
exports.InvalidSendAtFormat = InvalidSendAtFormat;
exports.SendAtLowerThanToday = SendAtLowerThanToday;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9leGNlcHRpb25zLmpzIl0sIm5hbWVzIjpbIkV4dGVuZGFibGVFcnJvciIsIm1lc3NhZ2UiLCJuYW1lIiwiRXJyb3IiLCJjYXB0dXJlU3RhY2tUcmFjZSIsImNvbnN0cnVjdG9yIiwic3RhY2siLCJBcGlFcnJvciIsInJlYXNvbiIsIk5vQ29udGVudCIsIk5vVGVtcGxhdGUiLCJOb1RlbXBsYXRlTm9GZWF0dXJlcyIsIk5vTWFpbCIsIk5vdE1haWxJbnN0YW5jZSIsIk5vRW5kcG9pbnQiLCJOb1N1YmplY3QiLCJOb1JlY2lwaWVudCIsIk5vUHVibGljS2V5IiwiTm9TZWNyZXRLZXkiLCJJbnZhbGlkU2VydmVyVXJpIiwiTm9SZXBseUVtYWlsIiwiTm9TZWFyY2hBcmdzIiwiTm9TZWFyY2hBcmdzSW5zdGFuY2UiLCJOb1BhcmFtWCIsInBhcmFtTmFtZSIsImNhcGl0YWxpemUiLCJXcm9uZ1R5cGVQYXJhbVgiLCJkVHlwZSIsIkludmFsaWRSZWNpcGllbnRMaXN0IiwiZW1haWwiLCJJbnZhbGlkRm9ybWF0UmVjaXBpZW50TGlzdCIsIkludmFsaWRGcm9tIiwiSW52YWxpZEZyb21Gb3JtYXQiLCJQYXJhbXNTaG91bGRCZU9iamVjdCIsIkludmFsaWRTZW5kQXRGb3JtYXQiLCJTZW5kQXRMb3dlclRoYW5Ub2RheSIsIlRpbWVvdXRFcnJvciIsInRpbWVvdXQiLCJBdHRhY2htZW50c1Nob3VsZEJlTGlzdCIsIkF0dGFjaG1lbnRTaG91bGRCZU9iamVjdCIsIkF0dGFjaG1lbnRTaG91bGRIYXZlTmFtZSIsIkF0dGFjaG1lbnRTaG91bGRIYXZlRmlsZSIsIkF0dGFjaG1lbnRGaWxlU2hvdWxkQmVCYXNlNjQiLCJBdHRhY2htZW50U2l6ZUxpbWl0IiwibGltaXQiLCJkaWZmIiwiQXR0YWNobWVudHNTaXplTGltaXQiLCJCYXRjaElzUmVxdWlyZWQiLCJjb250YWN0cyIsIkludmFsaWRCYXRjaCIsIkJhdGNoUGFyYW1zTm90SW5mb3JtIiwiSW52YWxpZFRpbWVCZXR3ZWVtQmF0Y2hzIiwiQmF0Y2hMb3dlclRoYW4yIiwiVGltZUJldHdlZW1CYXRjaHNMZXNzVGhhbjUiLCJCYXRjaFNpemVMaW1pdCIsIlJlY2lwaWVudFBlckJhdGNoR3JlYXRlciIsIkJhdGNoRGlzdHJpYnV0aW9uSW52YWxpZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFTUEsZTs7O0FBQ0YsNkJBQVlDLE9BQVosRUFBcUJDLElBQXJCLEVBQTJCO0FBQUE7O0FBQUEsc0lBQ2pCRCxPQURpQjs7QUFFdkIsY0FBS0MsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsWUFBSSxPQUFPQyxNQUFNQyxpQkFBYixLQUFtQyxVQUF2QyxFQUFtRDtBQUMvQ0Qsa0JBQU1DLGlCQUFOLFFBQThCLE1BQUtDLFdBQW5DO0FBQ0gsU0FGRCxNQUVPO0FBQ0gsa0JBQUtDLEtBQUwsR0FBYyxJQUFJSCxLQUFKLENBQVVGLE9BQVYsQ0FBRCxDQUFxQkssS0FBbEM7QUFDSDtBQVBzQjtBQVExQjs7O0VBVHlCSCxLOztJQVl4QkksUTs7O0FBQ0Ysc0JBQVlDLE1BQVosRUFBb0I7QUFBQTs7QUFBQSwrSUFDZ0JBLE1BRGhCLEVBQzBCLFVBRDFCO0FBRW5COzs7RUFIa0JSLGU7O0lBTWpCUyxTOzs7QUFDRix5QkFBYztBQUFBOztBQUFBLHFIQUNKLG1GQUNGLCtDQUZNLEVBRTJDLFdBRjNDO0FBR2I7OztFQUptQlQsZTs7SUFPbEJVLFU7OztBQUNGLDBCQUFjO0FBQUE7O0FBQUEsdUhBRU4sZ0VBQ0EsaURBSE0sRUFJTixZQUpNO0FBTWI7OztFQVBvQlYsZTs7SUFVbkJXLG9COzs7QUFDRixvQ0FBYztBQUFBOztBQUFBLDJJQUVOLDhFQUZNLEVBR04sc0JBSE07QUFLYjs7O0VBTjhCWCxlOztJQVM3QlksTTs7O0FBQ0Ysc0JBQWM7QUFBQTs7QUFBQSwrR0FDSiw4Q0FESSxFQUM0QyxRQUQ1QztBQUViOzs7RUFIZ0JaLGU7O0lBTWZhLGU7OztBQUNGLCtCQUFjO0FBQUE7O0FBQUEsaUlBQ0osd0NBREks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QUFBQSwwQjtRQUNBWSw0QixHQUFBQSw0QiIsImZpbGUiOiJleGNlcHRpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuY2xhc3MgRXh0ZW5kYWJsZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIG5hbWUpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIGlmICh0eXBlb2YgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdGFjayA9IChuZXcgRXJyb3IobWVzc2FnZSkpLnN0YWNrO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5jbGFzcyBBcGlFcnJvciBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IocmVhc29uKSB7XG4gICAgICAgIHN1cGVyKGBNaXR0ZVByb0Vycm9yLiBSZWFzb246ICR7cmVhc29ufWAsICdBcGlFcnJvcicpO1xuICAgIH1cbn1cblxuY2xhc3MgTm9Db250ZW50IGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ0ltcG9zc8OtdmVsIGVudmlhciB1bSBlbWFpbCBzZW0gY29udGXDumRvLiDDiSBwcmVjaXNvIGZvcm5lY2VyIHVtIGRvcyBwYXLDom1ldHJvcyAnICtcbiAgICAgICAgICAgICdcIm1lc3NhZ2VUZXh0XCIsIFwibWVzc2FnZUh0bWxcIiBvdSBcImF0dGFjaG1lbnRzXCInLCAnTm9Db250ZW50Jyk7XG4gICAgfVxufVxuXG5jbGFzcyBOb1RlbXBsYXRlIGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICAnSW1wb3Nzw612ZWwgZW52aWFyIHVtIGVtYWlsIGRlIHRlbXBsYXRlLCBzZW0gY29udGXDumRvIGh0bWwuICcgK1xuICAgICAgICAgICAgJ091IHZvY8OqIGZvcm5lY2UgbyB0ZW1wbGF0ZVNsdWcgb3UgbyBtZXNzYWdlSHRtbCcsXG4gICAgICAgICAgICAnTm9UZW1wbGF0ZSdcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNsYXNzIE5vVGVtcGxhdGVOb0ZlYXR1cmVzIGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBcIkltcG9zc8OtdmVsIHVzYXIgYXMgZnVuY2lvbmFsaWRhZGUgZGUgdGVtcGxhdGUsIHNlbSBmb3JuZWNlciBvICd0ZW1wbGF0ZVNsdWcnXCIsXG4gICAgICAgICAgICAnTm9UZW1wbGF0ZU5vRmVhdHVyZXMnXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jbGFzcyBOb01haWwgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcignSW1wb3Nzw612ZWwgZW52aWFyIHVtIGVtYWlsIHNlbSBvcyBwYXLDom1ldHJvcycsICdOb01haWwnKTtcbiAgICB9XG59XG5cbmNsYXNzIE5vdE1haWxJbnN0YW5jZSBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdFc3BlcmFuZG8gdW1hIGluc3TDom5jaWEgZG8gbW9kZWxvIE1haWwnLCAnTm90TWFpbEluc3RhbmNlJyk7XG4gICAgfVxufVxuXG5jbGFzcyBOb0VuZHBvaW50IGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ0ltcG9zc8OtdmVsIGRlIGFkcXVpcmlyIG8gcGF5bG9hZCBzZW0gbyBlbmRwb2ludCcsICdOb0VuZHBvaW50Jyk7XG4gICAgfVxufVxuXG5jbGFzcyBOb1N1YmplY3QgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcignSW1wb3Nzw612ZWwgZGUgZW52aWFyIHVtIGVtYWlsIHNlbSBhc3N1bnRvJywgJ05vU3ViamVjdCcpO1xuICAgIH1cbn1cblxuY2xhc3MgTm9SZWNpcGllbnQgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcignSW1wb3Nzw612ZWwgZGUgZW52aWFyIHVtIGVtYWlsIHNlbSBhbyBtZW5vcyB1bSBkZXN0aW5hdMOhcmlvJywgJ05vUmVjaXBpZW50Jyk7XG4gICAgfVxufVxuXG5jbGFzcyBOb1B1YmxpY0tleSBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdNaXR0ZVByb0Vycm9yLiBTZW0gY2hhdmUgcMO6YmxpY2EuJywgJ05vUHVibGljS2V5Jyk7XG4gICAgfVxufVxuXG5jbGFzcyBOb1NlY3JldEtleSBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFwiTWl0dGVQcm9FcnJvci4gU2VtIGNoYXZlIHByaXZhZGEuXCIsICdOb1NlY3JldEtleScpO1xuICAgIH1cbn1cblxuY2xhc3MgSW52YWxpZFNlcnZlclVyaSBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgJ01pdHRlUHJvRXJyb3IuIEludsOhbGlkYSB1cmlkZSBkbyBzZXJ2aWRvciwgw6kgZXNwZXJhZG8gdW1hIHN0cmluZy4nLFxuICAgICAgICAgICAgJ0ludmFsaWRTZXJ2ZXJVcmknXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jbGFzcyBOb1JlcGx5RW1haWwgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcignRm9ybmXDp2EgdW0gZW1haWwgZGUgcmVtZW50ZW50ZScsICdOb1JlcGx5RW1haWwnKTtcbiAgICB9XG59XG5cbmNsYXNzIE5vU2VhcmNoQXJncyBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdJbXBvc3PDrXZlbCBhZHF1aXJpciBlbWFpbHMgc2VtIHBhcsOibWV0cm9zIHBhcmEgcGVzcXVpc2EnLCAnTm9TZWFyY2hBcmdzJyk7XG4gICAgfVxufVxuXG5jbGFzcyBOb1NlYXJjaEFyZ3NJbnN0YW5jZSBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdFc3BlcmFuZG8gdW1hIGluc3TDom5jaWEgZG8gbW9kZWxvIFNlYXJjaEFyZ3MnLCAnTm9TZWFyY2hBcmdzSW5zdGFuY2UnKTtcbiAgICB9XG59XG5cbmNsYXNzIE5vUGFyYW1YIGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJhbU5hbWUpIHtcbiAgICAgICAgc3VwZXIoYEZvcm5lw6dhIG8gcGFyw6JtZXRybyAke3BhcmFtTmFtZX1gLCBgTm9QYXJhbSR7Xy5jYXBpdGFsaXplKHBhcmFtTmFtZSl9YCk7XG4gICAgfVxufVxuXG5jbGFzcyBXcm9uZ1R5cGVQYXJhbVggZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKGRUeXBlLCBwYXJhbU5hbWUpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBgUGFyw6JtZXRybyAke3BhcmFtTmFtZX0gdGVtIHF1ZSBzZXIgZG8gdGlwbyAke2RUeXBlfWAsXG4gICAgICAgICAgICBgV3JvbmdUeXBlUGFyYW0ke18uY2FwaXRhbGl6ZShwYXJhbU5hbWUpfWBcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNsYXNzIEludmFsaWRSZWNpcGllbnRMaXN0IGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihlbWFpbCkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIGBPIGVtYWlsICR7ZW1haWx9IGRvIHBhcsOibWV0cm8gJ3JlY2lwaWVudExpc3QnIMOpIGludsOhbGlkb2AsXG4gICAgICAgICAgICAnSW52YWxpZFJlY2lwaWVudExpc3QnXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jbGFzcyBJbnZhbGlkRm9ybWF0UmVjaXBpZW50TGlzdCBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgXCJPIGZvcm1hdG8gZXNwZXJhZG8gKCdOYW1lIDxlbWFpbD4nOyBvciAnPGVtYWlsPicpIG7Do28gZm9pIGVuY29udHJhZG9cIixcbiAgICAgICAgICAgICdJbnZhbGlkRm9ybWF0UmVjaXBpZW50TGlzdCdcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNsYXNzIEludmFsaWRGcm9tIGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoXCJPIGVtYWlsIGRvIHBhcsOibWV0cm8gJ0Zyb20nIGVzdMOhIGludsOhbGlkb1wiLCAnSW52YWxpZEZyb20nKTtcbiAgICB9XG59XG5cbmNsYXNzIEludmFsaWRGcm9tRm9ybWF0IGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBcIk8gZm9ybWF0byBlc3BlcmFkbyAoJ05hbWUgPGVtYWlsPic7IG9yICc8ZW1haWw+JykgbsOjbyBmb2kgZW5jb250cmFkb1wiLFxuICAgICAgICAgICAgJ0ludmFsaWRGcm9tRm9ybWF0J1xuICAgICAgICApO1xuICAgIH1cbn1cblxuY2xhc3MgUGFyYW1zU2hvdWxkQmVPYmplY3QgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcignUGFyw6JtZXRyb3MgZGV2ZW0gc2VyIG9iamV0b3MnLCAnUGFyYW1zU2hvdWxkQmVPYmplY3QnKTtcbiAgICB9XG59XG5cbmNsYXNzIEludmFsaWRTZW5kQXRGb3JtYXQgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihcIk8gZm9ybWF0byBlc3BlcmFkbyAnWVlZWS1NTS1ERCBISDptbTpzcycgbsOjbyBmb2kgZW5jb250cmFkb1wiLCAnSW52YWxpZFNlbmRBdEZvcm1hdCcpO1xuICAgIH1cbn1cblxuY2xhc3MgU2VuZEF0TG93ZXJUaGFuVG9kYXkgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcignTyB2YWxvciBwYXJhIGRhdGEgdGVtIHF1ZSBzZXIgbWFpb3IgZG8gcXVlIGEgYXR1YWwnLCAnU2VuZEF0TG93ZXJUaGFuVG9kYXknKTtcbiAgICB9XG59XG5cbmNsYXNzIFRpbWVvdXRFcnJvciBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IodGltZW91dCkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIGBPIHNlcnZpZG9yIG7Do28gcmVzcG9uZGV1IGRlbnRybyB0ZW1wbyBxdWUgdm9jw6ogZXN0aXB1bG91IGRlICR7dGltZW91dH0gc2VndW5kbyhzKWAsXG4gICAgICAgICAgICAnVGltZW91dEVycm9yJ1xuICAgICAgICApO1xuICAgIH1cbn1cblxuY2xhc3MgQXR0YWNobWVudHNTaG91bGRCZUxpc3QgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIGBBbmV4b3MgZGV2ZW0gc2VyIHVtYSBsaXN0YSBkZSBvYmpldG9zLiBcbiAgICAgICAgICAgIEV4ZW1wbG86IFt7bmFtZTogJ2Zvby5iYXInLCBmaWxlOiAnSUpISkhia2h5aTg3Nid9XWAsXG4gICAgICAgICAgICAnQXR0YWNobWVudHNTaG91bGRCZUxpc3QnXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jbGFzcyBBdHRhY2htZW50U2hvdWxkQmVPYmplY3QgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIGBBbmV4byBkZXZlIHNlciB1bSBvYmpldG8uIFxuICAgICAgICAgICAgRXhlbXBsbzoge25hbWU6ICdmb28uYmFyJywgZmlsZTogJ0lKSEpIYmtoeWk4NzYnfWAsXG4gICAgICAgICAgICAnQXR0YWNobWVudFNob3VsZEJlT2JqZWN0J1xuICAgICAgICApO1xuICAgIH1cbn1cblxuY2xhc3MgQXR0YWNobWVudFNob3VsZEhhdmVOYW1lIGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBgQW5leG8gdGVtIHF1ZSBjb250ZXIgdW0gbmFtZSAoJ25vbWUnKS4gXG4gICAgICAgICAgICBFeGVtcGxvOiB7bmFtZTogJ2Zvby5iYXInLCBmaWxlOiAnSUpISkhia2h5aTg3Nid9YCxcbiAgICAgICAgICAgICdBdHRhY2htZW50U2hvdWxkSGF2ZU5hbWUnXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jbGFzcyBBdHRhY2htZW50U2hvdWxkSGF2ZUZpbGUgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIGBBbmV4byB0ZW0gcXVlIGNvbnRlciBvIGNvbnRlw7pkbyBkbyBhcnF1aXZvIGVtIGJhc2U2NC4gXG4gICAgICAgICAgICBFeGVtcGxvOiB7bmFtZTogJ2Zvby5iYXInLCBmaWxlOiAnSUpISkhia2h5aTg3Nid9YCxcbiAgICAgICAgICAgICdBdHRhY2htZW50U2hvdWxkSGF2ZUZpbGUnXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jbGFzcyBBdHRhY2htZW50RmlsZVNob3VsZEJlQmFzZTY0IGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ08gYXJxdWl2byBkbyBhbmV4byB0ZW0gcXVlIGVzdGFyIGVtIGJhc2U2NC4nLCAnQXR0YWNobWVudEZpbGVTaG91bGRCZUJhc2U2NCcpO1xuICAgIH1cbn1cblxuY2xhc3MgQXR0YWNobWVudFNpemVMaW1pdCBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IobGltaXQsIG5hbWUsIGRpZmYpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBgTyB0YW1hbmhvIGRvcyBhbmV4b3MgZXhjZWRlbSBvIGxpbWl0ZSBkZSAke2xpbWl0fSBNQiBwZXJtaXRpZG8uIFxuICAgICAgICAgICAgTyBhbmV4byAnJHtuYW1lfScgZXhjZWRlIGVtICR7ZGlmZn0gTUJgLFxuICAgICAgICAgICAgJ0F0dGFjaG1lbnRTaXplTGltaXQnXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jbGFzcyBBdHRhY2htZW50c1NpemVMaW1pdCBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IobGltaXQsIGRpZmYpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBgQSBzb21hIGRvIHRhbWFuaG8gZG9zIGFuZXhvcyBleGNlZGUgbyBsaW1pdGUgZGUgJHtsaW1pdH0gTUIgcGVybWl0aWRvLiBcbiAgICAgICAgICAgIE8gdG90YWwgZXhjZWRlIGVtICR7ZGlmZn0gTUJgLFxuICAgICAgICAgICAgJ0F0dGFjaG1lbnRTaXplTGltaXQnXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jbGFzcyBCYXRjaElzUmVxdWlyZWQgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKGNvbnRhY3RzKSB7XG4gICAgICAgIHN1cGVyKGBOw6NvIHBvZGUgZW52aWFyIG1haXMgZG8gcXVlICR7Y29udGFjdHN9IGVtYWlscyBzZW0gZm9ybmVjZXJcbiAgICAgICAgbyBwYXLDom1ldHJvIGJhdGNoIGNvbSB1bWEgdmFsb3IgbcOtbmltbyBkZSAyYCwgJ0JhdGNoSXNSZXF1aXJlZCcpO1xuICAgIH1cbn1cblxuY2xhc3MgSW52YWxpZEJhdGNoIGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ1BhcsOibWV0cm8gbsOjbyBmb3JuZWNpZG8gb3UgdmFsb3IgaW52w6FsaWRvJywgJ0ludmFsaWRCYXRjaCcpO1xuICAgIH1cbn1cblxuY2xhc3MgQmF0Y2hQYXJhbXNOb3RJbmZvcm0gZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgICdQYXLDom1ldHJvcyBcImJhdGNoc1wiIGUgXCJyZWNpcGllbnRzUGVyQmF0Y2hzXCIgbsOjbyBmb3JuZWNpZG9zJywgJ0JhdGNoUGFyYW1zTm90SW5mb3JtJ1xuICAgICAgICApO1xuICAgIH1cbn1cblxuY2xhc3MgSW52YWxpZFRpbWVCZXR3ZWVtQmF0Y2hzIGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ1BhcsOibWV0cm8gbsOjbyBmb3JuZWNpZG8gb3UgdmFsb3IgaW52w6FsaWRvJywgJ0ludmFsaWRUaW1lQmV0d2VlbUJhdGNocycpO1xuICAgIH1cbn1cblxuY2xhc3MgQmF0Y2hMb3dlclRoYW4yIGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ08gcGFyw6JtZXRybyDDqSBtZW5vciBxdWUgMicsICdCYXRjaExvd2VyVGhhbjInKTtcbiAgICB9XG59XG5cbmNsYXNzIFRpbWVCZXR3ZWVtQmF0Y2hzTGVzc1RoYW41IGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoJ08gcGFyw6JtZXRybyDDqSBtZW5vciBxdWUgNScsICdUaW1lQmV0d2VlbUJhdGNoc0xlc3NUaGFuNScpO1xuICAgIH1cbn1cblxuY2xhc3MgQmF0Y2hTaXplTGltaXQgZXh0ZW5kcyBFeHRlbmRhYmxlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKGxpbWl0KSB7XG4gICAgICAgIHN1cGVyKGBPIHRhbWFuaG8gZG8gYmF0Y2ggZXhjZWRlIG8gbGltaXRlIGRlICR7bGltaXR9IGVtYWlsc2AsICdCYXRjaFNpemVMaW1pdCcpO1xuICAgIH1cbn1cblxuY2xhc3MgUmVjaXBpZW50UGVyQmF0Y2hHcmVhdGVyIGV4dGVuZHMgRXh0ZW5kYWJsZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICAnTyB2YWxvciBkbyBwYXLDom1ldHJvIFwicmVjaXBpZW50c1BlckJhdGNoc1wiIMOpIG1haW9yIHF1ZSBhIHF1YW50aWRhZGUgZGUgZGVzdGluYXTDoXJpb3MnLFxuICAgICAgICAgICAgJ1JlY2lwaWVudFBlckJhdGNoR3JlYXRlcidcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNsYXNzIEJhdGNoRGlzdHJpYnV0aW9uSW52YWxpZCBleHRlbmRzIEV4dGVuZGFibGVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgYEEgZGlzdHJpYnVpw6fDo28gZGUgYmF0Y2hlcyDDqSBpbnbDoWxpZGEsIHByb3ZhdmVsbWVudGUgbyBuw7ptZXJvIGRlIFxuICAgICAgICAgICAgZGVzdGluYXTDoXJpb3MgbsOjbyDDqSBtw7psdGlwbGEgZG9zIGJhdGNoZXNgLFxuICAgICAgICAgICAgJ0JhdGNoRGlzdHJpYnV0aW9uSW52YWxpZCdcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCB7XG4gICAgQXBpRXJyb3IsXG4gICAgTm9NYWlsLFxuICAgIE5vUGFyYW1YLFxuICAgIE5vU3ViamVjdCxcbiAgICBOb0NvbnRlbnQsXG4gICAgTm9FbmRwb2ludCxcbiAgICBOb1RlbXBsYXRlLFxuICAgIEludmFsaWRGcm9tLFxuICAgIE5vUHVibGljS2V5LFxuICAgIE5vU2VjcmV0S2V5LFxuICAgIE5vUmVjaXBpZW50LFxuICAgIE5vUmVwbHlFbWFpbCxcbiAgICBOb1NlYXJjaEFyZ3MsXG4gICAgVGltZW91dEVycm9yLFxuICAgIEludmFsaWRCYXRjaCxcbiAgICBCYXRjaFNpemVMaW1pdCxcbiAgICBCYXRjaElzUmVxdWlyZWQsXG4gICAgQmF0Y2hMb3dlclRoYW4yLFxuICAgIFdyb25nVHlwZVBhcmFtWCxcbiAgICBOb3RNYWlsSW5zdGFuY2UsXG4gICAgSW52YWxpZFNlcnZlclVyaSxcbiAgICBJbnZhbGlkRnJvbUZvcm1hdCxcbiAgICBBdHRhY2htZW50U2l6ZUxpbWl0LFxuICAgIEludmFsaWRTZW5kQXRGb3JtYXQsXG4gICAgU2VuZEF0TG93ZXJUaGFuVG9kYXksXG4gICAgQmF0Y2hQYXJhbXNOb3RJbmZvcm0sXG4gICAgQXR0YWNobWVudHNTaXplTGltaXQsXG4gICAgTm9TZWFyY2hBcmdzSW5zdGFuY2UsXG4gICAgTm9UZW1wbGF0ZU5vRmVhdHVyZXMsXG4gICAgSW52YWxpZFJlY2lwaWVudExpc3QsXG4gICAgUGFyYW1zU2hvdWxkQmVPYmplY3QsXG4gICAgQXR0YWNobWVudHNTaG91bGRCZUxpc3QsXG4gICAgUmVjaXBpZW50UGVyQmF0Y2hHcmVhdGVyLFxuICAgIEF0dGFjaG1lbnRTaG91bGRCZU9iamVjdCxcbiAgICBBdHRhY2htZW50U2hvdWxkSGF2ZU5hbWUsXG4gICAgQXR0YWNobWVudFNob3VsZEhhdmVGaWxlLFxuICAgIEludmFsaWRUaW1lQmV0d2VlbUJhdGNocyxcbiAgICBCYXRjaERpc3RyaWJ1dGlvbkludmFsaWQsXG4gICAgVGltZUJldHdlZW1CYXRjaHNMZXNzVGhhbjUsXG4gICAgSW52YWxpZEZvcm1hdFJlY2lwaWVudExpc3QsXG4gICAgQXR0YWNobWVudEZpbGVTaG91bGRCZUJhc2U2NCxcbn07XG4iXX0=