/**
 * Created by thiago.dsn.cir on 19/10/17.
 */
const _ = require('lodash');
const MittePro = require('mittepro-js');
let testsVariables = null;
try {
    testsVariables = require('./testsVariables');
    testsVariables = new testsVariables();
} catch (error) {
    testsVariables = {
        mail: {
            local: null,
            official: {
                key: '<your-app-key>',
                secret: '<your-app-secret>'
            },
            recipientList: [
                'Foo Bar <foo@bar.com>',
                'Bar Foo <BAR@FOO.COM>',
            ],
            sendAt: '2018-02-05 12:42:20',
            from: 'Someone <some@one.com>',
            subject: 'Pratical test of the client-js',
            messageText: 'Pratical test of the client-js',
            messageHtml: '<strong>Pratical test</strong> of the <em>client-js</em>',
            templateSlug: 'foo-bar-01',
            context: {foobar: true},
            contextPerRecipient: {
                'foo@bar.com': {foo: true},
                'bar@foo.com': {bar: true},
            },
            useTplDefaultSubject: false,
            useTplDefaultEmail: true,
            useTplDefaultName: true,
            activateTracking: true,
        },
        search: {
            appIds: ['9999'],
            end: '2016-01-01',
            start: '2016-01-01',
            nameSender: 'Someone',
            emailSender: 'some@one.com',
            nameReceiver: 'Someone Else',
            emailReceiver: 'someone@else.com',
            status: '2, 3, 7',
            templateSlug: 'foo-bar-01',
            uuids: ['21da05e09a214bf']
        }
    };
}


const self = {
    key: null,
    secret: null,
    server: null,
    timeout: 1,

    send: (mail, isTemplate) => {
        const client = new MittePro.Client(self.key, self.secret, true, self.server, self.timeout);
        if (isTemplate) {
            return client.sendTemplate(mail);
        } else {
            return client.send(mail);
        }
    },
    searchEmails: () => {
        const client = new MittePro.Client(self.key, self.secret, true, self.server, self.timeout);
        const searchArgs = new MittePro.SearchArgs({
            appIds: testsVariables.search.appIds,
            end: testsVariables.search.end,
            start: testsVariables.search.start,
            // name_sender: testsVariables.search.name_sender,
            // email_sender: testsVariables.search.email_sender,
            // name_receiver: testsVariables.search.name_receiver,
            // email_receiver: testsVariables.search.email_receiver,
            // status: testsVariables.search.status,
            // template_slug: testsVariables.search.template_slug,
        });
        return client.searchEmails(searchArgs);
    },
    getSpecificEmails: () => {
        const client = new MittePro.Client(self.key, self.secret, true, self.server);
        return client.getSpecificEmails(testsVariables.search.uuids);
    },
    simpleTextTest: () => {
        const mail = new MittePro.Mail({
            sendAt: testsVariables.mail.sendAt,
            recipientList: testsVariables.mail.recipientList,
            from: testsVariables.mail.from,
            subject: testsVariables.mail.subject,
            messageText: testsVariables.mail.messageText,
            activateTracking: testsVariables.mail.activateTracking,
        });
        console.log(mail);
        return self.send(mail);
    },
    templateTest: () => {
        const mail = new MittePro.Mail({
            sendAt: testsVariables.mail.sendAt,
            recipientList: testsVariables.mail.recipientList,
            subject: testsVariables.mail.subject,
            // messageText: testsVariables.mail.messageText,
            // messageHtml: testsVariables.mail.messageHtml,
            // from: testsVariables.mail.from,
            templateSlug: testsVariables.mail.templateSlug,
            context: testsVariables.mail.context,
            contextPerRecipient: testsVariables.mail.contextPerRecipient,
            useTplDefaultSubject: testsVariables.mail.useTplDefaultSubject,
            useTplDefaultEmail: testsVariables.mail.useTplDefaultEmail,
            useTplDefaultName: testsVariables.mail.useTplDefaultName,
            activateTracking: testsVariables.mail.activateTracking,
        });
        return self.send(mail, true);
    },
    runActions: () => {
        var actions = [
            'simpleTextTest', 'templateTest',
            // 'searchEmails', 'getSpecificEmails'
        ];
        var done = _.after(actions.length, function() {
            process.exit(134);
        });
        if (!actions.length) process.exit(134);
        _.each(actions, (action) => {
            self[action]().then((success) => {
                console.log('\n');
                console.log('success', success);
                done();
            }, (error) => {
                console.log('\n');
                console.log('error', error);
                done();
            });
        });
    },
    localTest: (key, secret, server) => {
        if (!testsVariables.mail.local) console.log('PUT YOUT OWN VARIABLES');

        self.key = (!_.isUndefined(key) && key) ? key : testsVariables.mail.local.key;
        self.secret = (!_.isUndefined(secret) && secret) ? secret : testsVariables.mail.local.secret;
        self.server = (!_.isUndefined(server) && server) ? server : testsVariables.mail.local.server;

        self.runActions();
    },
    officialTest: () => {
        if (!testsVariables.mail.local) console.log('PUT YOUT OWN VARIABLES');

        self.key = testsVariables.mail.official.key;
        self.secret = testsVariables.mail.official.server;
        self.server = null;

        self.runActions();
    },
};

self.localTest();
// self.officialTest();
