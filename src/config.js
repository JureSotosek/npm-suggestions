const { config } = require('dotenv');
config();

const defaultConfig = {
  elasticsearchEndpoint:
    'https://randomnumbersandletters.us-east-1.aws.found.io:9243/',
  user: 'elastic',
  password: '',
  indexName: 'npm-registry'
};

module.exports = Object.entries(defaultConfig).reduce(
  (res, [key, defaultValue]) => ({
    ...res,
    [key]:
      key in process.env
        ? JSON.parse(
            typeof defaultValue === 'string'
              ? `"${process.env[key]}"`
              : process.env[key]
          )
        : defaultValue
  }),
  {}
);
