import _ from 'lodash';
import { atob } from 'b2a';
import moment from 'moment';
import {
    NoParamX,
    NoSubject,
    NoRecipient,
    InvalidFrom,
    NoReplyEmail,
    InvalidSendAt,
    WrongTypeParamX,
    AttachmentSizeLimit,
    AttachmentsSizeLimit,
    InvalidRecipientList,
    ParamsShouldBeObject,
    NoTemplateNoFeatures,
    AttachmentsShouldBeList,
    AttachmentShouldBeObject,
    AttachmentShouldHaveName,
    AttachmentShouldHaveFile,
    AttachmentFileShouldBeBase64,
} from './exceptions';

export default class Validators {
    constructor(params) {
        this.params = params;
        this.attachmentSize = 10;  // MB
    }
    static trackEmail(text) {
        const TRACK_EMAIL_REGEX = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
        const tracked = text.match(TRACK_EMAIL_REGEX);
        return tracked ? tracked[0] : null;
    }
    static isEmailInvalid(text) {
        const EMAIL_REGEX = /(^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$)/gi;
        const email = Validators.trackEmail(text);
        if (!email) return true;
        const result = email.match(EMAIL_REGEX);
        return result === null;
    }
    validateRecipients() {
        _.forEach(this.params.recipientList, (recipient) => {
            if (Validators.isEmailInvalid(recipient)) {
                throw new InvalidRecipientList();
            }
        });
    }
    validadeFrom() {
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
            const fileSize = _.divide(dfile.length, (1024 * 1024));
            if (fileSize > this.attachmentSize) {
                const diff = fileSize - this.attachmentSize;
                throw new AttachmentSizeLimit(this.attachmentSize, attachment.name, diff);
            }
            totalAttachmentsSize += fileSize;
        });
        if (totalAttachmentsSize > this.attachmentSize) {
            const diff = totalAttachmentsSize - this.attachmentSize;
            throw new AttachmentsSizeLimit(this.attachmentSize, diff);
        }
    }
    attrNotInParams(attr) {
        return !_.has(this.params, attr) || !this.params[attr];
    }
    attrInParams(attr) {
        return _.has(this.params, attr) && this.params[attr];
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
