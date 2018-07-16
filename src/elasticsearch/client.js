const elasticsearch = require('elasticsearch');
const config = require('../config');

let client;

async function getClient() {
  if (client) {
    return client;
  }

  if (!config.elasticsearchEndpoint || !config.user || !config.password) {
    throw 'Config not set correctly';
  }

  client = new elasticsearch.Client({
    host: config.elasticsearchEndpoint,
    httpAuth: `${config.user}:${config.password}`
  });

  return client;
}

module.exports = {
  getClient
};
