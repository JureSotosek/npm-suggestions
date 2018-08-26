const { getClient } = require('./client');
const config = require('../config');

function queryBuilder(dependencies, devDependencies, type) {
  const mostCommonField =
    type === 'regular' ? 'dependencies' : type + 'Dependencies';

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
              field: mostCommonField
            }
          }
        }
      }
    }
  };

  return query;
}

async function getSuggestions(dependencies, devDependencies, type) {
  const client = await getClient();

  const res = client.search({
    index: config.indexName,
    body: queryBuilder(dependencies, devDependencies, type)
  });

  return res;
}

module.exports = { getSuggestions };
