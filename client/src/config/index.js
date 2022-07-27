var config = (process.env.REACT_APP_NODE_ENV_TANTEADOR === 'production' ? require('./config.prod.json') : require('./config.local.json'));
module.exports = config;
