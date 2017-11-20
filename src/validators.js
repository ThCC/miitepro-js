import _ from 'lodash';
import {
    NoParamX,
    NoSubject,
    NoRecipient,
    InvalidFrom,
    NoReplyEmail,
    WrongTypeParamX,
    InvalidRecipientList,
    ParamsShouldBeObject,
    NoTemplateNoFeatures,
} from './exceptions';

export default class Validators {
    constructor(params) {
        this.params = params;
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
    }
    checkSearchParams() {
        if (!_.isObject(this.params)) throw new ParamsShouldBeObject();
        if (this.attrNotInParams('start')) throw new NoParamX('start');
        if (this.attrNotInParams('end')) throw new NoParamX('end');
        if (this.attrNotInParams('appIds')) throw new NoParamX('appIds');
        if (!_.isArray(this.params.appIds)) throw new WrongTypeParamX('Array', 'appIds');
    }
}
