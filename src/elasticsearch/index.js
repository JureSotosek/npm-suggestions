const { getClient } = require('./client');
const config = require('../config');

function queryBuilder(dependencies, devDependencies) {
  const dependenciesQuery = dependencies
    ? dependencies.map(dependency => {
        return {
          term: {
            dependencies: dependency
          }
        };
      })
    : [];

  const devDependenciesQuery = devDependencies
    ? devDependencies.map(devDependency => {
        return {
          term: {
            devDependencies: devDependency
          }
        };
      })
    : [];

  const query = {
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
              field: 'dependencies'
            }
          },
          mostCommonDevDependencies: {
            terms: {
              field: 'devDependencies'
            }
          },
          mostCommonAllDependencies: {
            terms: {
              field: 'allDependencies'
            }
          }
        }
      }
    }
  };

  return query;
}

async function getSuggestions(dependencies, devDependencies) {
  const client = await getClient();

  const res = client.search({
    index: config.indexName,
    body: queryBuilder(dependencies, devDependencies)
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
