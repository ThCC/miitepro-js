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

class NoText extends ExtendableError {
    constructor() {
        super('Impossible to send a simple email without a text content', 'NoText');
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
    constructor() {
        super(
            "Expected format ('Name <email>'; or '<email>') wasn't matched",
            'InvalidRecipientList'
        );
    }
}

class InvalidFrom extends ExtendableError {
    constructor() {
        super("Expected format ('Name <email>'; or '<email>') wasn't matched", 'InvalidFrom');
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


export {
    ApiError,
    NoMail,
    NoText,
    NoParamX,
    NoSubject,
    NoEndpoint,
    NoTemplate,
    InvalidFrom,
    NoPublicKey,
    NoSecretKey,
    NoRecipient,
    NoReplyEmail,
    NoSearchArgs,
    InvalidSendAt,
    WrongTypeParamX,
    NotMailInstance,
    InvalidServerUri,
    NoSearchArgsInstance,
    NoTemplateNoFeatures,
    InvalidRecipientList,
    ParamsShouldBeObject,
};
