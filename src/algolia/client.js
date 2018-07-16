const algoliasearch = require('algoliasearch');

const algolia = {
  appId: 'OFCNCOG2CU',
  apiKey: '6fe4476ee5a1832882e326b506d14126',
  indexName: 'npm-search'
};

let client;

function getClient() {
  if (client) {
    return client;
  }

  client = algoliasearch(algolia.appId, algolia.apiKey).initIndex(
    algolia.indexName
  );

  return client;
}

module.exports = {
  getClient
};
