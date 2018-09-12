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
        super('Impossible to send a simple email without content. Pass one of these arguments: ' +
            '"messageText", "messageHtml" ou "attachments"', 'NoContent');
    }
}

class NoTemplate extends ExtendableError {
    constructor() {
        super(
            'Impossible to send a template email without a html content. ' +
            'Either you pass the templateSlug or the messageHtml',
            'NoTemplate'
        );
    }
}

class NoTemplateNoFeatures extends ExtendableError {
    constructor() {
        super(
            "Impossible to use template features, without passing 'templateSlug'",
            'NoTemplateNoFeatures'
        );
    }
}

class NoMail extends ExtendableError {
    constructor() {
        super("Impossible to send an email if there's no mail", 'NoMail');
    }
}

class NotMailInstance extends ExtendableError {
    constructor() {
        super('Expecting a Mail instance', 'NotMailInstance');
    }
}

class NoEndpoint extends ExtendableError {
    constructor() {
        super('Impossible to get the payload without the endpoint', 'NoEndpoint');
    }
}

class NoSubject extends ExtendableError {
    constructor() {
        super('Impossible to send email without a subject', 'NoSubject');
    }
}

class NoRecipient extends ExtendableError {
    constructor() {
        super('Impossible to send email without any recipient', 'NoRecipient');
    }
}

class NoPublicKey extends ExtendableError {
    constructor() {
        super("MitteProError. There's no Public Key.", 'NoPublicKey');
    }
}

class NoSecretKey extends ExtendableError {
    constructor() {
        super("MitteProError. There's no Secret Key.", 'NoSecretKey');
    }
}

class InvalidServerUri extends ExtendableError {
    constructor() {
        super('MitteProError. Invalid server uri, it was expecting a string.', 'InvalidServerUri');
    }
}

class NoReplyEmail extends ExtendableError {
    constructor() {
        super('Please provide an reply email', 'NoReplyEmail');
    }
}

class NoSearchArgs extends ExtendableError {
    constructor(paramName) {
        super('Impossible to get emails without search arguments', 'NoSearchArgs');
    }
}

class NoSearchArgsInstance extends ExtendableError {
    constructor(paramName) {
        super('Expecting a SearchArgs instance', 'NoSearchArgsInstance');
    }
}

class NoParamX extends ExtendableError {
    constructor(paramName) {
        super(`Please provide the ${paramName}`, `NoParam${_.capitalize(paramName)}`);
    }
}

class WrongTypeParamX extends ExtendableError {
    constructor(dType, paramName) {
        super(
            `Parameter ${paramName} has to be of the type ${dType}`,
            `WrongTypeParam${_.capitalize(paramName)}`
        );
    }
}

class InvalidRecipientList extends ExtendableError {
    constructor(email) {
        super(
            `The e-mail ${email} of the 'recipientList' parameter is invalid`,
            'InvalidRecipientList'
        );
    }
}

class InvalidFormatRecipientList extends ExtendableError {
    constructor() {
        super(
            "Expected format ('Name <email>'; or '<email>') wasn't matched",
            'InvalidFormatRecipientList'
        );
    }
}

class InvalidFrom extends ExtendableError {
    constructor() {
        super("The e-mail of the 'From' parameter is invalid", 'InvalidFrom');
    }
}

class InvalidFromFormat extends ExtendableError {
    constructor() {
        super("Expected format ('Name <email>'; or '<email>') wasn't matched", 'InvalidFromFormat');
    }
}

class ParamsShouldBeObject extends ExtendableError {
    constructor() {
        super('Parameters should it be an object', 'ParamsShouldBeObject');
    }
}

class InvalidSendAt extends ExtendableError {
    constructor() {
        super("Expected format 'YYYY-MM-DD HH:mm:ss' wasn't matched", 'InvalidSendAt');
    }
}

class TimeoutError extends ExtendableError {
    constructor(timeout) {
        super(
            `The server did not respond within the ${timeout} second(s) you stipulated`,
            'TimeoutError'
        );
    }
}

class AttachmentsShouldBeList extends ExtendableError {
    constructor() {
        super(
            `Attachments should be a List of objects. 
            Like: [{name: 'foo.bar', file: 'IJHJHbkhyi876'}]`,
            'AttachmentsShouldBeList'
        );
    }
}

class AttachmentShouldBeObject extends ExtendableError {
    constructor() {
        super(
            `Attachment should be an object. 
            Like: {name: 'foo.bar', file: 'IJHJHbkhyi876'}`,
            'AttachmentShouldBeObject'
        );
    }
}

class AttachmentShouldHaveName extends ExtendableError {
    constructor() {
        super(
            `Attachment should have an name. 
            Like: {name: 'foo.bar', file: 'IJHJHbkhyi876'}`,
            'AttachmentShouldHaveName'
        );
    }
}

class AttachmentShouldHaveFile extends ExtendableError {
    constructor() {
        super(
            `Attachment should have the contents of the file in base64. 
            Like: {name: 'foo.bar', file: 'IJHJHbkhyi876'}`,
            'AttachmentShouldHaveFile'
        );
    }
}

class AttachmentFileShouldBeBase64 extends ExtendableError {
    constructor() {
        super('Attachment file should be in base64.', 'AttachmentFileShouldBeBase64');
    }
}

class AttachmentSizeLimit extends ExtendableError {
    constructor(limit, name, diff) {
        super(
            `The size of one of the attachments exceeds the of ${limit} MB allowed. 
            The attachment '${name}' exceeds in ${diff} MB`,
            'AttachmentSizeLimit'
        );
    }
}

class AttachmentsSizeLimit extends ExtendableError {
    constructor(limit, diff) {
        super(
            `The sum of the size of the attachments exceeds the ${limit} MB allowed. 
            The total exceeds in ${diff} MB`,
            'AttachmentSizeLimit'
        );
    }
}

class BatchIsRequired extends ExtendableError {
    constructor(contacts) {
        super(`Can not send more than ${contacts} contacts without providing 
        batch parameter with minimum value of 2`, 'BatchIsRequired');
    }
}

class InvalidBatch extends ExtendableError {
    constructor() {
        super('Parameter not supplied or value is invalid', 'InvalidBatch');
    }
}

class InvalidTimeBetweemBatchs extends ExtendableError {
    constructor() {
        super('Parameter not supplied or value is invalid', 'InvalidTimeBetweemBatchs');
    }
}

class BatchLowerThan2 extends ExtendableError {
    constructor() {
        super('The parameter is less than 2', 'BatchLowerThan2');
    }
}

class TimeBetweemBatchsLessThan5 extends ExtendableError {
    constructor() {
        super('The parameter is less than 5', 'TimeBetweemBatchsLessThan5');
    }
}

class BatchSizeLimit extends ExtendableError {
    constructor(limit) {
        super(`Batch size exceeds the limit of ${limit} emails`, 'BatchSizeLimit');
    }
}

class BatchDistributionInvalid extends ExtendableError {
    constructor() {
        super(
            `The distribution between batches is invalid, probably the number 
            of recipients is not multiple of batches`,
            'BatchDistributionInvalid'
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
    InvalidBatch,
    InvalidSendAt,
    BatchSizeLimit,
    BatchIsRequired,
    BatchLowerThan2,
    WrongTypeParamX,
    NotMailInstance,
    InvalidServerUri,
    InvalidFromFormat,
    AttachmentSizeLimit,
    AttachmentsSizeLimit,
    NoSearchArgsInstance,
    NoTemplateNoFeatures,
    InvalidRecipientList,
    ParamsShouldBeObject,
    AttachmentsShouldBeList,
    AttachmentShouldBeObject,
    AttachmentShouldHaveName,
    AttachmentShouldHaveFile,
    InvalidTimeBetweemBatchs,
    BatchDistributionInvalid,
    TimeBetweemBatchsLessThan5,
    InvalidFormatRecipientList,
    AttachmentFileShouldBeBase64,
};
