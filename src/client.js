import _ from 'lodash';
import Api from './api';
import { NoMail, NotMailInstance, NoSearchArgs, NoSearchArgsInstance, NoParamX } from './exceptions';

function checkMail(mail) {
    if (!mail) throw new NoMail();
    if (!_.isObject(mail)) throw new NoMail();
    if (!(mail.constructor.name === 'Mail')) throw new NotMailInstance();
}

export class Client extends Api {
    send(mail) {
        checkMail(mail);
        const endpoint = 'text';
        return this.sendRequest(mail.getPayload(endpoint), endpoint);
    }
    sendTemplate(mail) {
        checkMail(mail);
        const endpoint = 'template';
        return this.sendRequest(mail.getPayload(endpoint), endpoint);
    }
    searchEmails(searchArgs) {
        if (!searchArgs) throw new NoSearchArgs();
        if (!(searchArgs.constructor.name === 'SearchArgs')) throw new NoSearchArgsInstance();

        return this.sendRequest(searchArgs.getPayload(), 'search', 'GET');
    }
    getSpecificEmails(uuids) {
        if (!uuids) throw new NoParamX('uuids');
        let specifics = uuids;
        if (!_.isArray(specifics)) specifics = [specifics];
        specifics = JSON.stringify(specifics);
        return this.sendRequest({ uuids: specifics }, 'specifics', 'GET');
    }
}
