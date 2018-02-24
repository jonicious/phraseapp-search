const restifyAsyncWrap = require('@gilbertco/restify-async-wrap');
const { getResultListForString } = require('../api/phraseApi');

const stringsHandler = server => {
    server.get('/', restifyAsyncWrap( async (req, res, next) => {
        const searchString = req.query.text;
        console.log('Received request to search for following string', searchString);

        const resultList = await getResultListForString(searchString);

        res.json({ resultList });

        return next();
    }));
};

module.exports = stringsHandler;
