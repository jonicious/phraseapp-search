const restify = require('restify');
const { name, version } = require('../package.json');
require('now-logs')(name);

const server = restify.createServer({
    name,
    version
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

require('./handlers/strings.handler')(server);
require('./handlers/slack.handler')(server);

server.listen(8080, () => {
    console.log('%s listening at %s', server.name, server.url);
});
