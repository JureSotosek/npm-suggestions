const { config } = require('dotenv');
config();

module.exports = {
  elasticsearchEndpoint: process.env.ELASTICSEARCH_ENDPOINT,
  user: process.env.ELASTICSEARCH_USER,
  password: process.env.ELASTICSEARCH_PASSWORD,
  indexName: 'npm-registry'
};
