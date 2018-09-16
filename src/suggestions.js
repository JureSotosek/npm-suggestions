const { getSuggestions } = require('./elasticsearch');
const { getPackages } = require('./algolia');
const { parseElasticsearchResponse } = require('./libs');

async function suggestions(
  dependencies = [],
  devDependencies = [],
  limit = 5,
  type
) {
  const elasticsearchResponse = await getSuggestions(
    dependencies,
    devDependencies,
    type
  );

  const suggestedDependencies = parseElasticsearchResponse(
    elasticsearchResponse
  );

  const filteredSuggestedDependencies = suggestedDependencies
    .filter(
      dependency =>
        !dependencies.includes(dependency) &&
        !devDependencies.includes(dependency)
    )
    .slice(0, limit);

  const algoliaResponse = await getPackages(filteredSuggestedDependencies);

  const removedNullValues = algoliaResponse.results.filter(pkg => pkg);

  return removedNullValues;
}

module.exports = { suggestions };
