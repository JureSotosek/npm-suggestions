const { getClient } = require('./client');
const config = require('../config');

function queryBuilder(dependencies, devDependencies, limit) {
  const dependenciesQuery = dependencies
    ? dependencies.map(dependency => {
        return {
          term: {
            dependencies: dependency
          }
        };
      })
    : [];

  const size = limit + dependencies.length;

  const devDependenciesQuery = devDependencies
    ? devDependencies.map(devDependency => {
        return {
          term: {
            devDependencies: devDependency
          }
        };
      })
    : [];

  return {
    size: 0,
    aggs: {
      includesDeps: {
        filter: {
          bool: {
            must: [...dependenciesQuery, ...devDependenciesQuery]
          }
        },
        aggs: {
          mostCommonDependencies: {
            terms: {
              field: 'dependencies',
              size
            }
          },
          mostCommonDevDependencies: {
            terms: {
              field: 'devDependencies',
              size
            }
          }
        }
      }
    }
  };
}

async function getSuggestions(dependencies, devDependencies, limit) {
  const client = await getClient();

  const res = client.search({
    index: config.indexName,
    body: queryBuilder(dependencies, devDependencies, limit)
  });

  return res;
}

async function indexNewDoc(doc) {
  const client = await getClient();

  const res = await client
    .index({
      index: config.indexName,
      type: config.docType,
      body: doc
    })
    .then(() => true)
    .catch(() => false);

  return res;
}

module.exports = { getSuggestions, indexNewDoc };
