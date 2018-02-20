const fs = require('fs');
const _ = require('lodash');
const defaults = require('./default');

let config;
let envConfigFile = `./${process.env.NODE_ENV || 'development'}`;

if(fs.existsSync(envConfigFile)) {
  const envConfig = require(envConfigFile);
  config = _.merge({}, defaults, envConfig);
}

module.exports = config || defaults;
