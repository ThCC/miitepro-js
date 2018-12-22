import _ from 'lodash';
import Validators from './validators';
import { NoEndpoint, NoContent, NoTemplate } from './exceptions';

class Mail {
    constructor(params) {
        const validators = new Validators(params);
        validators.checkMailParams();

        this.expectedKeys = [
            'tags',
            'sendAt',
            'subject',
            'from',
            'messageText',
            'messageHtml',
            'recipientList',
            'activateTracking',
            'getTextFromHtml',
            'headers',
            'context',
            'templateSlug',
            'useTplDefaultName',
            'useTplDefaultEmail',
            'useTplDefaultSubject',
            'contextPerRecipient',
            'trackOpen',
            'trackHtmlLink',
            'trackTextLink',
            'attachments',
            'batchs',
            'timeBetweenBatchs',
            'recipientsPerBatchs',
        ];
        const keys = _.keys(params);
        _.forEach(keys, (key) => {
            if (this.expectedKeys.indexOf(key) > -1) {
                this[key] = params[key];
            }
        });
    }
    getPayload(endpoint) {
        if (!endpoint) throw new NoEndpoint();
        if (endpoint === 'text') {
            if (!(_.has(this, 'messageText') && this.messageText)
                && !(_.has(this, 'messageHtml') && this.messageHtml)
                && !(_.has(this, 'attachments') && this.attachments)) {
                throw new NoContent();
            }
        } else {
            if (!(_.has(this, 'templateSlug') || _.has(this, 'messageHtml'))) {
                throw new NoTemplate();
            }
            if (!(this.templateSlug || this.messageHtml)) {
                throw new NoTemplate();
            }
        }

        const payload = {};
        _.forEach(this.expectedKeys, (key) => {
            if (_.has(this, key) && this[key]) {
                payload[_.snakeCase(key)] = this[key];
            }
        });
        if (_.has(payload, 'headers')) {
            _.forEach(_.keys(payload.headers), (key) => {
                payload.headers[_.snakeCase(key)] = payload.headers[key];
                if (_.snakeCase(key) !== key) delete payload.headers[key];
            });
        }
        payload.sended_by = 5;
        return payload;
    }
}

class SearchArgs {
    constructor(params) {
        const validators = new Validators(params);
        validators.checkSearchParams(params);

        this.expectedKeys = [
            'end',
            'start',
            'status',
            'appIds',
            'nameSender',
            'emailSender',
            'templateSlug',
            'nameReceiver',
            'emailReceiver',
        ];
        const keys = _.keys(params);
        _.forEach(keys, (key) => {
            if (this.expectedKeys.indexOf(key) > -1) {
                this[key] = params[key];
            }
        });
    }
    getPayload() {
        const payload = {};
        _.forEach(this.expectedKeys, (key) => {
            if (_.has(this, key) && this[key]) {
                payload[_.snakeCase(key)] = this[key];
            }
        });
        payload.app_ids = this.appIds.toString();
        return payload;
    }
}

export {
    Mail,
    SearchArgs,
};
