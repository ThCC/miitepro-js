# mittepro-js
Client service, to send simple text emails or, using a template created at MittePro, send more complex emails.

In order to use this library, you must create an account in MittePro.

** **It is not currently possible to create an account in MittePro, but will soon be** **

How to install:

    npm install mittepro-js

Follow the examples below to send simple emails or emails with templates:

**Simple Emails:**

    'use strict';

    var MittePro = require('mittepro-js');

    var textMail = new MittePro.Mail({
        recipientList: ['Foo Bar <foo.bar@mail.com>', 'Fulano Aquino <fulano@mail.com>', '<ciclano@mail.com>'],
        messageText: 'Simple text message.',
        from: 'Beutrano <beutrano@mail.com>',
        subject: 'Just a test - Sended From Client'
    });
    var client = new MittePro.Client('<your_account_public_key>', '<your_account_secret_key>');
    client.send(textMail).then(function (result) {
        console.log(result);
    }, function (error) {
        console.log(error);
    });

**Template Emails:**

    'use strict';

    var MittePro = require('mittepro-js');

    var templateMail = new MittePro.Mail({
        recipientList: ['Foo Bar <foo.bar@mail.com>', 'Fulano Aquino <fulano@mail.com>', '<ciclano@mail.com>'],
        from: 'Beutrano <beutrano@mail.com>',
        templateSlug: 'test-101',
        context: {'foobar': true},
        contextPerRecipient: {
            'foo.bar@gmail.com': {'foo': true},
            'fulano.arquino@gmail.com.br': {'bar': true}
        },
        useTplDefaultSubject: true,
        useTplDefaultEmail: false,
        useTplDefaultName: false

    });
    var client = new MittePro.Client('<your_account_public_key>', '<your_account_secret_key>');
    client.sendTemplate(templateMail).then(function (result) {
        console.log(result);
    }, function (error) {
        console.log(error);
    });

**Mail Parameters:**

Parameter | Type | Required | Description
------------ | ------------ |------------- | -------------
recipientList | List | Yes | List of all the recipients. The expected format is 'Name `<email>`' or '`<email>`'.
subject | String | Yes* | The subject of the email. *In case your sending an email with template and pass `useTplDefaultSubject` as `true` then you don't need to pass the `subject`.
messageText | String | Yes* | The `message` of the email on text format. *Only Required if your gonna send a simple text email.
messageHtml | String | No | The `message` of the email on html format. *If pass this then you don't need to pass the `templateSlug`.
tags | Dict/List | No | The `tags` must be an dictionary containing keys and simple values or an list with strings.
from | String | No* | The email of the sender. The expected format is 'Name `<email>`' or '`<email>`'. *In case your sending an email with template and pass `use_template_email` as `true` then you don't need to pass this parameter.
templateSlug | String | No | The `templateSlug` is the slug of the template. *Just pass this if your gonna send a email with template.
useTplDefaultName | Bool | No* | If set to `true` it use the default value set to the sender's name.
useTplDefaultEmail | Bool | No* | If set to `true` it use the default value set to the sender's email.
useTplDefaultSubject | Bool | No* | If set to `true` it use the default value set to the subject.
getTextFromHtml | Bool | No* | If set to `true` mittepro will extract from your html template an text version. This will only happen if your template doesn't already have an text version.
activateTracking | Bool | No* | If set to `true` mittepro will track if your email will be open and how many times. Also it will track any links clicked inside the email.
context | Dict | No | Global variables use in the Template. The format is expressed in the example (above).
contextPerRecipient | Dict | No | Variables set for each recipient. The format is expressed in the example (above).

**Client Parameters:**

Parameter | Type | Required | Description
------------ | ------------ |------------- | -------------
key | String | Yes | Your account's public key in the MittePro.
secret | String | Yes | Your account's private key in the MittePro.
