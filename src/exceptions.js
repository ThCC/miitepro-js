import _ from 'lodash';

class ExtendableError extends Error {
    constructor(message, name) {
        super(message);
        this.name = name;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }
    }
}

class ApiError extends ExtendableError {
    constructor(reason) {
        super(`MitteProError. Reason: ${reason}`, 'ApiError');
    }
}

class NoContent extends ExtendableError {
    constructor() {
        super('Impossível enviar um email sem conteúdo. É preciso fornecer um dos parâmetros ' +
            '"messageText", "messageHtml" ou "attachments"', 'NoContent');
    }
}

class NoTemplate extends ExtendableError {
    constructor() {
        super(
            'Impossível enviar um email de template, sem conteúdo html. ' +
            'Ou você fornece o templateSlug ou o messageHtml',
            'NoTemplate'
        );
    }
}

class NoTemplateNoFeatures extends ExtendableError {
    constructor() {
        super(
            "Impossível usar as funcionalidade de template, sem fornecer o 'templateSlug'",
            'NoTemplateNoFeatures'
        );
    }
}

class NoMail extends ExtendableError {
    constructor() {
        super('Impossível enviar um email sem os parâmetros', 'NoMail');
    }
}

class NotMailInstance extends ExtendableError {
    constructor() {
        super('Esperando uma instância do modelo Mail', 'NotMailInstance');
    }
}

class NoEndpoint extends ExtendableError {
    constructor() {
        super('Impossível de adquirir o payload sem o endpoint', 'NoEndpoint');
    }
}

class NoSubject extends ExtendableError {
    constructor() {
        super('Impossível de enviar um email sem assunto', 'NoSubject');
    }
}

class NoRecipient extends ExtendableError {
    constructor() {
        super('Impossível de enviar um email sem ao menos um destinatário', 'NoRecipient');
    }
}

class NoPublicKey extends ExtendableError {
    constructor() {
        super('MitteProError. Sem chave pública.', 'NoPublicKey');
    }
}

class NoSecretKey extends ExtendableError {
    constructor() {
        super("MitteProError. Sem chave privada.", 'NoSecretKey');
    }
}

class InvalidServerUri extends ExtendableError {
    constructor() {
        super(
            'MitteProError. Inválida uride do servidor, é esperado uma string.',
            'InvalidServerUri'
        );
    }
}

class NoReplyEmail extends ExtendableError {
    constructor() {
        super('Forneça um email de rementente', 'NoReplyEmail');
    }
}

class NoSearchArgs extends ExtendableError {
    constructor() {
        super('Impossível adquirir emails sem parâmetros para pesquisa', 'NoSearchArgs');
    }
}

class NoSearchArgsInstance extends ExtendableError {
    constructor() {
        super('Esperando uma instância do modelo SearchArgs', 'NoSearchArgsInstance');
    }
}

class NoParamX extends ExtendableError {
    constructor(paramName) {
        super(`Forneça o parâmetro ${paramName}`, `NoParam${_.capitalize(paramName)}`);
    }
}

class WrongTypeParamX extends ExtendableError {
    constructor(dType, paramName) {
        super(
            `Parâmetro ${paramName} tem que ser do tipo ${dType}`,
            `WrongTypeParam${_.capitalize(paramName)}`
        );
    }
}

class InvalidRecipientList extends ExtendableError {
    constructor(email) {
        super(
            `O email ${email} do parâmetro 'recipientList' é inválido`,
            'InvalidRecipientList'
        );
    }
}

class InvalidFormatRecipientList extends ExtendableError {
    constructor() {
        super(
            "O formato esperado ('Name <email>'; or '<email>') não foi encontrado",
            'InvalidFormatRecipientList'
        );
    }
}

class InvalidFrom extends ExtendableError {
    constructor() {
        super("O email do parâmetro 'From' está inválido", 'InvalidFrom');
    }
}

class InvalidFromFormat extends ExtendableError {
    constructor() {
        super(
            "O formato esperado ('Name <email>'; or '<email>') não foi encontrado",
            'InvalidFromFormat'
        );
    }
}

class ParamsShouldBeObject extends ExtendableError {
    constructor() {
        super('Parâmetros devem ser objetos', 'ParamsShouldBeObject');
    }
}

class InvalidSendAtFormat extends ExtendableError {
    constructor() {
        super("O formato esperado 'YYYY-MM-DD HH:mm:ss' não foi encontrado", 'InvalidSendAtFormat');
    }
}

class SendAtLowerThanToday extends ExtendableError {
    constructor() {
        super('O valor para data tem que ser maior do que a atual', 'SendAtLowerThanToday');
    }
}

class TimeoutError extends ExtendableError {
    constructor(timeout) {
        super(
            `O servidor não respondeu dentro tempo que você estipulou de ${timeout} segundo(s)`,
            'TimeoutError'
        );
    }
}

class AttachmentsShouldBeList extends ExtendableError {
    constructor() {
        super(
            `Anexos devem ser uma lista de objetos. 
            Exemplo: [{name: 'foo.bar', file: 'IJHJHbkhyi876'}]`,
            'AttachmentsShouldBeList'
        );
    }
}

class AttachmentShouldBeObject extends ExtendableError {
    constructor() {
        super(
            `Anexo deve ser um objeto. 
            Exemplo: {name: 'foo.bar', file: 'IJHJHbkhyi876'}`,
            'AttachmentShouldBeObject'
        );
    }
}

class AttachmentShouldHaveName extends ExtendableError {
    constructor() {
        super(
            `Anexo tem que conter um name ('nome'). 
            Exemplo: {name: 'foo.bar', file: 'IJHJHbkhyi876'}`,
            'AttachmentShouldHaveName'
        );
    }
}

class AttachmentShouldHaveFile extends ExtendableError {
    constructor() {
        super(
            `Anexo tem que conter o conteúdo do arquivo em base64. 
            Exemplo: {name: 'foo.bar', file: 'IJHJHbkhyi876'}`,
            'AttachmentShouldHaveFile'
        );
    }
}

class AttachmentFileShouldBeBase64 extends ExtendableError {
    constructor() {
        super('O arquivo do anexo tem que estar em base64.', 'AttachmentFileShouldBeBase64');
    }
}

class AttachmentSizeLimit extends ExtendableError {
    constructor(limit, name, diff) {
        super(
            `O tamanho dos anexos excedem o limite de ${limit} MB permitido. 
            O anexo '${name}' excede em ${diff} MB`,
            'AttachmentSizeLimit'
        );
    }
}

class AttachmentsSizeLimit extends ExtendableError {
    constructor(limit, diff) {
        super(
            `A soma do tamanho dos anexos excede o limite de ${limit} MB permitido. 
            O total excede em ${diff} MB`,
            'AttachmentSizeLimit'
        );
    }
}

export {
    ApiError,
    NoMail,
    NoParamX,
    NoSubject,
    NoContent,
    NoEndpoint,
    NoTemplate,
    InvalidFrom,
    NoPublicKey,
    NoSecretKey,
    NoRecipient,
    NoReplyEmail,
    NoSearchArgs,
    TimeoutError,
    WrongTypeParamX,
    NotMailInstance,
    InvalidServerUri,
    InvalidFromFormat,
    AttachmentSizeLimit,
    InvalidSendAtFormat,
    SendAtLowerThanToday,
    AttachmentsSizeLimit,
    NoSearchArgsInstance,
    NoTemplateNoFeatures,
    InvalidRecipientList,
    ParamsShouldBeObject,
    AttachmentsShouldBeList,
    AttachmentShouldBeObject,
    AttachmentShouldHaveName,
    AttachmentShouldHaveFile,
    InvalidFormatRecipientList,
    AttachmentFileShouldBeBase64,
};
