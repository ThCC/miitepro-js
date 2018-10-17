import _ from 'lodash';
import atob from 'atob';
import moment from 'moment';
import {
    NoParamX,
    NoSubject,
    NoRecipient,
    InvalidFrom,
    InvalidBatch,
    NoReplyEmail,
    InvalidSendAt,
    BatchSizeLimit,
    BatchLowerThan2,
    BatchIsRequired,
    WrongTypeParamX,
    InvalidFromFormat,
    AttachmentSizeLimit,
    BatchParamsNotInform,
    AttachmentsSizeLimit,
    InvalidRecipientList,
    ParamsShouldBeObject,
    NoTemplateNoFeatures,
    AttachmentsShouldBeList,
    AttachmentShouldBeObject,
    AttachmentShouldHaveName,
    AttachmentShouldHaveFile,
    InvalidTimeBetweemBatchs,
    BatchDistributionInvalid,
    RecipientPerBatchGreater,
    TimeBetweemBatchsLessThan5,
    InvalidFormatRecipientList,
    AttachmentFileShouldBeBase64,
} from './exceptions';

export default class Validators {
    constructor(params) {
        this.params = params;
        this.attachSizeLimit = {
            megabytes: 10,
            bytes: 10 * 1024 * 1024,
        };
        this.batchMinSize = 2;
        this.batchMinTime = 5;
        this.totalEmailLimit = 500;
    }

    static trackEmail(text) {
        const TRACK_EMAIL_REGEX = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
        const tracked = text.match(TRACK_EMAIL_REGEX);
        return tracked ? tracked[0] : null;
    }

    static isEmailFormatInvalid(text) {
        const email = Validators.trackEmail(text);
        return email === null;
    }

    static isEmailInvalid(text) {
        const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/gi;
        const email = Validators.trackEmail(text);
        const result = email.match(EMAIL_REGEX);
        return result === null;
    }

    validateRecipients() {
        _.forEach(this.params.recipientList, (recipient) => {
            if (Validators.isEmailFormatInvalid(recipient)) {
                throw new InvalidFormatRecipientList();
            }
            if (Validators.isEmailInvalid(recipient)) {
                throw new InvalidRecipientList(recipient);
            }
        });

        const batchs = this.attrInParams('batchs') ? this.params.batchs : null;
        const totalRecipients = this.params.recipientList.length;
        if (batchs === null
            && this.attrNotInHeaders('systemTakesOverBatchs')
            && totalRecipients > this.totalEmailLimit) {
            throw new BatchIsRequired(totalRecipients);
        }
    }

    validadeFrom() {
        if (Validators.isEmailFormatInvalid(this.params.from)) {
            throw new InvalidFromFormat();
        }
        if (Validators.isEmailInvalid(this.params.from)) {
            throw new InvalidFrom();
        }
    }

    validateSendAt() {
        if (_.has(this.params, 'sendAt') && this.params.sendAt) {
            if (!moment(this.params.sendAt, ['YYYY-MM-DD HH:mm:ss'], true).isValid()) {
                throw new InvalidSendAt();
            }
        }
    }

    validateAttachments() {
        if (!_.isArray(this.params.attachments)) throw new AttachmentsShouldBeList();
        let totalAttachmentsSize = 0;
        _.forEach(this.params.attachments, (attachment) => {
            if (!_.isObject(attachment)) throw new AttachmentShouldBeObject();
            if (!_.has(attachment, 'name')
                || !attachment.name
                || attachment.name === '') {
                throw new AttachmentShouldHaveName();
            }
            if (!_.has(attachment, 'file')
                || !attachment.file
                || attachment.file === '') {
                throw new AttachmentShouldHaveFile();
            }
            let dfile = null;
            try {
                dfile = atob(attachment.file);
            } catch (e) {
                throw new AttachmentFileShouldBeBase64();
            }
            const fileSize = dfile.length;
            if (fileSize > this.attachSizeLimit.bytes) {
                const diff = fileSize - this.attachSizeLimit.bytes;
                throw new AttachmentSizeLimit(
                    this.attachSizeLimit.megabytes, attachment.name, diff);
            }
            totalAttachmentsSize += fileSize;
        });
        if (totalAttachmentsSize > this.attachSizeLimit.bytes) {
            const diff = totalAttachmentsSize - this.attachSizeLimit.bytes;
            throw new AttachmentsSizeLimit(this.attachSizeLimit.megabytes, diff);
        }
    }

    validateBatchsArgs() {
        if (this.attrNotInParams('batchs') && this.attrNotInParams('timeBetweenBatchs')
            && this.attrNotInParams('recipientsPerBatchs')) return true;

        if (this.attrNotInParams('timeBetweenBatchs')) throw new InvalidTimeBetweemBatchs();
        if (!_.isNumber(this.params.timeBetweenBatchs)) throw new InvalidTimeBetweemBatchs();
        if (this.params.timeBetweenBatchs < this.batchMinTime) {
            throw new TimeBetweemBatchsLessThan5();
        }
        const tempTime = _.floor(this.params.timeBetweenBatchs);
        const timeBetweenBatchs = this.batchMinTime * _.floor(tempTime / this.batchMinTime);
        if (timeBetweenBatchs < this.batchMinTime) throw new InvalidTimeBetweemBatchs();
        this.params.timeBetweenBatchs = timeBetweenBatchs;

        if (this.attrInHeaders('systemTakesOverBatchs')) return true;

        if (this.attrNotInParams('batchs') && this.attrNotInParams('recipientsPerBatchs')) {
            throw new BatchParamsNotInform();
        }

        const totalRecipients = this.params.recipientList.length;
        if (this.attrInParams('recipientsPerBatchs')) {
            if (!_.isNumber(this.params.recipientsPerBatchs)) {
                throw new InvalidBatch();
            }
            if (this.params.recipientsPerBatchs < this.batchMinSize) {
                throw new BatchLowerThan2();
            }
            const recipientsPerBatchs = _.floor(this.params.recipientsPerBatchs);
            if (recipientsPerBatchs < this.batchMinSize) {
                throw new InvalidBatch();
            }
            this.params.recipientsPerBatchs = recipientsPerBatchs;

            if (recipientsPerBatchs > totalRecipients) {
                throw new RecipientPerBatchGreater();
            }
        } else if (this.attrInParams('batchs')) {
            if (!_.isNumber(this.params.batchs)) {
                throw new InvalidBatch();
            }
            if (this.params.batchs < this.batchMinSize) {
                throw new BatchLowerThan2();
            }
            const batchs = _.floor(this.params.batchs);
            if (batchs < this.batchMinSize) {
                throw new InvalidBatch();
            }
            this.params.batchs = batchs;
            const batchsSize = _.floor(totalRecipients / this.params.batchs);

            if (batchsSize > this.totalEmailLimit) {
                throw new BatchSizeLimit(this.totalEmailLimit);
            }

            const remaining = totalRecipients % batchs;
            const lastBatchPlusOne = this.attrInHeaders('lastBatchPlusOne');

            if (remaining && lastBatchPlusOne) return true;

            if ((batchsSize * batchs) !== totalRecipients) {
                throw new BatchDistributionInvalid();
            }
        } else {
            throw new BatchParamsNotInform();
        }
        return true;
    }

    attrNotInParams(attr) {
        return !_.has(this.params, attr) || !this.params[attr];
    }

    attrInParams(attr) {
        return _.has(this.params, attr) && this.params[attr];
    }

    attrNotInHeaders(attr) {
        if (this.attrNotInParams('headers')) return true;
        return !_.has(this.params.headers, attr) || !this.params.headers[attr];
    }

    attrInHeaders(attr) {
        if (this.attrNotInParams('headers')) return false;
        return _.has(this.params.headers, attr) && this.params.headers[attr];
    }

    checkMailParams() {
        if (!_.isObject(this.params)) throw new ParamsShouldBeObject();
        if (this.attrNotInParams('from')
            && this.attrNotInParams('useTplDefaultEmail')) {
            throw new NoReplyEmail();
        }
        if (this.attrInParams('from')) this.validadeFrom();
        if (this.attrNotInParams('recipientList')) throw new NoRecipient();
        if (!_.isArray(this.params.recipientList)) throw new NoRecipient();
        if (!this.params.recipientList.length) throw new NoRecipient();
        this.validateBatchsArgs();
        this.validateRecipients();
        this.validateSendAt();

        if (this.attrNotInParams('subject')
            && this.attrNotInParams('useTplDefaultSubject')) {
            throw new NoSubject();
        }
        if ((this.attrInParams('useTplDefaultSubject')
            || this.attrInParams('useTplDefaultName')
            || this.attrInParams('useTplDefaultEmail'))
            && this.attrNotInParams('templateSlug')) {
            throw new NoTemplateNoFeatures();
        }
        if (this.attrInParams('attachments')) this.validateAttachments();
    }

    checkSearchParams() {
        if (!_.isObject(this.params)) throw new ParamsShouldBeObject();
        if (this.attrNotInParams('start')) throw new NoParamX('start');
        if (this.attrNotInParams('end')) throw new NoParamX('end');
        if (this.attrNotInParams('appIds')) throw new NoParamX('appIds');
        if (!_.isArray(this.params.appIds)) throw new WrongTypeParamX('Array', 'appIds');
    }
}
