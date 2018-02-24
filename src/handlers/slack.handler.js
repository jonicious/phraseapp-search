const axios = require('axios');
const restifyAsyncWrap = require('@gilbertco/restify-async-wrap');
const ColorHash = require('color-hash');
const colorHash = new ColorHash();

const { getResultListForString, getAccounts } = require('../api/phraseApi');

const makeTranslationLink = (accountName, projectName, keyId, localeId) => (
    `https://phraseapp.com/accounts/${accountName}/projects/${projectName.toLowerCase()}/editor?translation_key_id=${keyId}&source_locale_id=${localeId}`
);

const makeAttachment = (result, accountName) => {
    const projectName = result.projectName;
    const color = colorHash.hex(projectName);
    const directLink = makeTranslationLink(accountName, projectName, result.keyId, result.localeId);

    return {
        fallback: JSON.stringify(result),
        color,
        title: "Link to translation",
        title_link: directLink,
        fields: [
            {
                title: "Locale",
                value: result.locale,
                short: false
            },
            {
                title: "Project Name",
                value: projectName,
                short: false
            },
            {
                title: "Name",
                value: result.keyName,
                short: false
            }
        ]
    }
};

const sendMessageToSlack = (responseUrl, resultList, accountName) => {
    console.log('Will send message to Slack', resultList);

    const attachments = resultList.map(result => makeAttachment(result, accountName));

    try {
        axios.post(
            responseUrl,
            {
                attachments
            },
            {
                headers: {
                    'Content-type': 'application/json'
                }
            }
        );
    } catch(e) {
        console.error('Sending message to Slack failed with the following error', e);
    }
};

const slackHandler = server => {
    server.post('/slack', restifyAsyncWrap(async (req, res, next) => {
        console.log('Received slack message');

        res.json({ text: 'Let me look that up for you...' });

        const resultList = await getResultListForString(req.body.text);
        const accounts = await getAccounts();
        const accountName = accounts[0].name;
        await sendMessageToSlack(req.body.response_url, resultList, accountName);

        return next();
    }));
};

module.exports = slackHandler;
