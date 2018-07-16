const { getClient } = require('./client');

function search(query) {
  return getClient().search({
    query,
    attributesToRetrieve: [
      'name',
      'version',
      'description',
      'owner',
      'humanDownloadsLast30Days'
    ],
    offset: 0,
    length: 5
  });
}

function getPackages(names) {
  return getClient().getObjects(names, [
    'name',
    'version',
    'description',
    'owner',
    'humanDownloadsLast30Days'
  ]);
}

module.exports = { search, getPackages };
