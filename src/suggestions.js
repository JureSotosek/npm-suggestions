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
    .filter(dependency => !dependencies.includes(dependency))
    .slice(0, limit);

  const IDsToFetch = filteredSuggestedDependencies;

  const algoliaResponse = await getPackages(IDsToFetch);

  return algoliaResponse.results;
}

module.exports = { suggestions };
