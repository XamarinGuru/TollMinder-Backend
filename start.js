const app = require('./Application');
const conf = require('./conf');

app.listen(conf.port, () => console.log(`REST API listen on ${conf.port} port`));