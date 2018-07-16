const { getClient } = require('./client');
const config = require('../config');

function queryBuilder(dependencies) {
  const dependenciesQuery = dependencies.map(dependency => {
    return {
      term: {
        dependencies: dependency.name
      }
    };
  });

  return {
    size: 0,
    aggs: {
      includesDeps: {
        filter: {
          bool: {
            must: dependenciesQuery
          }
        },
        aggs: {
          mostCommon: {
            terms: {
              field: 'dependencies'
            }
          }
        }
      }
    }
  };
}

async function getSuggestions(dependencies) {
  const client = await getClient();

  return await client.search({
    index: config.indexName,
    body: queryBuilder(dependencies)
  });
}

module.exports = { getSuggestions };
