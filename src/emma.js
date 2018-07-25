const { getSuggestions, indexNewDoc } = require('./elasticsearch');
const { search: algoliaSearch, getPackages } = require('./algolia');
const { parseElasticsearchResponse } = require('./libs');

async function suggestions(dependencies = [], devDependencies = [], limit = 5) {
  const elasticsearchResponse = await getSuggestions(
    dependencies,
    devDependencies,
    limit
  );

  const {
    suggestedDependencies,
    suggestedDevDependencies
  } = parseElasticsearchResponse(elasticsearchResponse);

  const filteredSuggestedDependencies = suggestedDependencies.filter(
    dependency => !dependencies.includes(dependency)
  );

  const filteredSuggestedDevDependencies = suggestedDevDependencies.filter(
    devDependency => !devDependencies.includes(devDependency)
  );

  const IDsToFetch = [
    //Set used to remove duplicates
    ...new Set([
      ...filteredSuggestedDependencies,
      ...filteredSuggestedDevDependencies
    ])
  ];

  const algoliaResponse = await getPackages(IDsToFetch);

  const suggestedPackages = algoliaResponse.results.filter(package =>
    filteredSuggestedDependencies.includes(package.name)
  );
  const suggestedDevPackages = algoliaResponse.results.filter(package =>
    filteredSuggestedDevDependencies.includes(package.name)
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

async function indexDependencies(dependencies, devDependencies) {
  const doc = {
    source: 'emma',
    dependencies: dependencies
      ? dependencies.map(dependency => dependency.name)
      : [],
    dependenciesWithVersions: dependencies,
    devDependencies: devDependencies
      ? devDependencies.map(devDependency => devDependency.name)
      : [],
    devDependenciesWithVersions: devDependencies
  };

  const res = await indexNewDoc(doc);

  return res;
}

module.exports = { suggestions, search, indexDependencies };
