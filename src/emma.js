const { getSuggestions } = require('./elasticsearch');
const { search: algoliaSearch, getPackages } = require('./algolia');

async function suggestions(dependencies) {
  const elasticsearchResponse = await getSuggestions(dependencies);

  const suggestions = elasticsearchResponse.aggregations.includesDeps.mostCommon.buckets.map(
    suggestion => {
      return suggestion.key;
    }
  );

  const algoliaResponse = await getPackages(
    suggestions.slice(dependencies.length)
  );

  const packages = algoliaResponse.results.map(package => {
    return {
      name: package.name,
      humanDownloadsLast30Days: package.humanDownloadsLast30Days,
      version: package.version,
      description: package.description,
      owner: package.owner.name
    };
  });

  return packages;
}

async function search(query) {
  const response = await algoliaSearch(query);

  const packages = response.hits.map(package => {
    return {
      name: package.name,
      humanDownloadsLast30Days: package.humanDownloadsLast30Days,
      version: package.version,
      description: package.description,
      owner: package.owner.name
    };
  });

  return packages;
}

module.exports = { suggestions, search };
