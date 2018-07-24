const { getClient } = require('./client');
const config = require('../config');

function queryBuilder(dependencies, devDependencies, limit) {
  const dependenciesQuery = dependencies
    ? dependencies.map(dependency => {
        return {
          term: {
            expandedDependencies: dependency
          }
        };
      })
    : [];

  const size = limit + dependencies.length;

  const devDependenciesQuery = devDependencies
    ? devDependencies.map(devDependency => {
        return {
          term: {
            devExpandedDependencies: devDependency
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

  return client.search({
    index: config.indexName,
    body: queryBuilder(dependencies, devDependencies, limit)
  });
}

module.exports = { getSuggestions };
