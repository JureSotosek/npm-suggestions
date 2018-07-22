const { getSuggestions } = require('./elasticsearch');
const { search: algoliaSearch, getPackages } = require('./algolia');
const { parseElasticsearchResponse } = require('./libs');

async function suggestions(dependencies = [], devDependencies = [], limit = 5) {
  const elasticsearchResponse = await getSuggestions(
    dependencies,
    devDependencies
  );

  const {
    suggestedDependencies,
    suggestedDevDependencies,
    bucketSize
  } = parseElasticsearchResponse(elasticsearchResponse);

  const shortenedSuggestedDependencies = suggestedDependencies
    .filter(dependency => !dependencies.includes(dependency))
    .slice(0, limit);

  const shortenedSuggestedDevDependencies = suggestedDevDependencies
    .filter(devDependency => !devDependencies.includes(devDependency))
    .slice(0, limit);

  const algoliaResponse = await getPackages([
    ...shortenedSuggestedDependencies,
    ...shortenedSuggestedDevDependencies
  ]);

  const packages = algoliaResponse.results;

  const suggestedPackages = packages.filter(package =>
    shortenedSuggestedDependencies.includes(package.name)
  );
  const suggestedDevPackages = packages.filter(package =>
    shortenedSuggestedDevDependencies.includes(package.name)
  );

  return {
    dependencies: suggestedPackages,
    devDependencies: suggestedDevPackages
  };
}

async function search(query) {
  const response = await algoliaSearch(query);

  return response.hits;
}

module.exports = { suggestions, search };
