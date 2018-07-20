const { getClient } = require('./client');
const config = require('../config');

function queryBuilder(dependencies, devDependencies) {
  const dependenciesQuery = dependencies
    ? dependencies.map(dependency => {
        return {
          term: {
            expandedDependencies: dependency
          }
        };
      })
    : [];

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
              field: 'dependencies'
            }
          },
          mostCommonDevDependencies: {
            terms: {
              field: 'devDependencies'
            }
          }
        }
      }
    }
  };
}

async function getSuggestions(dependencies, devDependencies) {
  const client = await getClient();

  return client.search({
    index: config.indexName,
    body: queryBuilder(dependencies, devDependencies)
  });
}

module.exports = { getSuggestions };
