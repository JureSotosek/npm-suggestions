const { getClient } = require('./client');

const attributesToRetrieve = [
  'name',
  'version',
  'description',
  'owner',
  'humanDownloadsLast30Days'
];

function search(query) {
  return getClient().search({
    query,
    attributesToRetrieve,
    offset: 0,
    length: 5
  });
}

function getPackages(names) {
  return getClient().getObjects(names, attributesToRetrieve);
}

module.exports = { search, getPackages };
