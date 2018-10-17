/**
 * Created by thiago.dsn.cir on 19/10/17.
 */
const _ = require('lodash');
const fileSystem = require('fs');
const btoa = require('btoa');
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
    timeout: 50,

    send: (mail, isTemplate) => {
        console.log(mail);
        const client = new MittePro.Client(self.key, self.secret, true, self.server, self.timeout);
        if (isTemplate) {
            return client.sendTemplate(mail);
        } else {
            return client.send(mail);
        }
    },
    searchEmails: () => {
        const client = new MittePro.Client(self.key, self.secret, false, self.server, self.timeout);
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
    createAttachments: () => {
        return new Promise((resolve) => {
            const files = [
                // 'IMG_0563.JPG',
                'localcao_asscon.pdf',
                '2_7_mb.jpg',
                '2_mb.jpg',
                // 'sdf.txt'
            ];
            const attachments = [];
            const done = _.after(files.length, () => {
                resolve(attachments);
            });
            _.each(files, (dfile) => {
                self.getFile(dfile).then((content) => {
                    attachments.push({ name: dfile, file: content });
                    done()
                });
            });
        });
    },
    simpleTextTest: (attachments) => {
        const params = {
            // sendAt: testsVariables.mail.sendAt,
            recipientList: testsVariables.mail.recipientList,
            from: testsVariables.mail.from,
            subject: testsVariables.mail.subject,
            // messageText: 'Mah oia só https://pypi.org/',
            messageHtml: testsVariables.mail.messageHtml,
            activateTracking: false,
            trackOpen: true,
            trackHtmlLink: true,
            timeBetweenBatchs: 5,
            headers: {'systemTakesOverBatchs': true}
        };
        if (attachments) params.attachments = attachments;
        const mail = new MittePro.Mail(params);
        console.log("SENDED", 'simpleTextTest', 'MittePro.Mail');
        return self.send(mail);
    },
    templateTest: (attachments) => {
        const params = {
            // sendAt: testsVariables.mail.sendAt,
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
        };
        if (attachments) params.attachments = attachments;
        const mail = new MittePro.Mail(params);
        console.log("SENDED", 'templateTest', 'MittePro.Mail');
        return self.send(mail, true);
    },
    simpleTextTestAttachs: () => {
        console.log("START", 'simpleTextTestAttachs');
        return new Promise((resolve, error) => {
            console.log("START", 'simpleTextTestAttachs', 'createAttachments');
            self.createAttachments().then((attachments) => {
                console.log('simpleTextTestAttachs', "have attachments");
                try {
                    self.simpleTextTest(attachments).then((response) => {
                        resolve(response);
                    }, (response) => {
                        error(response);
                    });
                } catch (e) {
                    console.log('error', e);
                    process.exit(134);
                }
            });
        });
    },
    templateTestAttachs: () => {
        console.log("START", 'templateTestAttachs');
        return new Promise((resolve, error) => {
            console.log("START", 'templateTestAttachs', 'createAttachments');
            self.createAttachments().then((attachments) => {
                console.log('templateTestAttachs', "have attachments");
                try {
                    self.templateTest(attachments).then((response) => {
                        resolve(response);
                    }, (response) => {
                        error(response);
                    });
                } catch (e) {
                    console.log('error', e);
                    process.exit(134);
                }
            });
        });
    },
    runActions: () => {
        const actions = [
            // 'simpleTextTestAttachs',
            // 'templateTestAttachs',
            'simpleTextTest',
            // 'templateTest',
            // 'searchEmails', 'getSpecificEmails'
        ];
        const done = _.after(actions.length, () => {
            process.exit(134);
        });
        if (!actions.length) process.exit(134);
        _.each(actions, (action) => {
            console.log('\n');
            console.log('action', action);
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
        if (!testsVariables.mail.local) {
            console.log('PUT YOUT OWN VARIABLES');
            return;
        }

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
    getFile: (fileName) => {
        const path = '/home/local/ALTERDATA/thiago.dsn.cir/test_files/';
        const fullPath = path + fileName;
        return new Promise((resolve) => {
            fileSystem.readFile(fullPath, (err, data) => {
                // console.log('');
                // console.log('file name', fileName);
                // console.log('data size', _.divide(data.length, 1024 * 1024));
                const dataB64 = btoa(data);
                // console.log();
                // console.log(data.toString());
                // console.log('dataB64 size', _.divide(data.length, 1024 * 1024));
                resolve(dataB64);
            });
        });
    }
};

self.localTest();
// self.officialTest();
