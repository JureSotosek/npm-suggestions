const { getSuggestions } = require('./elasticsearch');
const { getPackages } = require('./algolia');
const { parseElasticsearchResponse } = require('./libs');

async function suggestions(dependencies = [], devDependencies = [], limit = 5) {
  const elasticsearchResponse = await getSuggestions(
    dependencies,
    devDependencies
  );

  const {
    suggestedDependencies,
    suggestedDevDependencies,
    suggestedAllDependencies
  } = parseElasticsearchResponse(elasticsearchResponse);

  const filteredSuggestedDependencies = suggestedDependencies
    .filter(dependency => !dependencies.includes(dependency))
    .slice(0, limit);

  const filteredSuggestedDevDependencies = suggestedDevDependencies
    .filter(devDependency => !devDependencies.includes(devDependency))
    .slice(0, limit);

  const filteredSuggestedAllDependencies = suggestedAllDependencies
    .filter(
      dependency =>
        !devDependencies.includes(dependency) &&
        !dependencies.includes(dependency)
    )
    .slice(0, limit);

  const IDsToFetch = [
    //Set used to remove duplicates
    ...new Set([
      ...filteredSuggestedDependencies,
      ...filteredSuggestedDevDependencies,
      ...filteredSuggestedAllDependencies
    ])
  ];

  const algoliaResponse = await getPackages(IDsToFetch);

  const suggestedPackages = algoliaResponse.results.filter(
    pkg => pkg && filteredSuggestedDependencies.includes(pkg.name)
  );
  const suggestedDevPackages = algoliaResponse.results.filter(
    pkg => pkg && filteredSuggestedDevDependencies.includes(pkg.name)
  );
  const suggestedAllPackages = algoliaResponse.results.filter(
    pkg => pkg && filteredSuggestedAllDependencies.includes(pkg.name)
  );

  return {
    dependencies: suggestedPackages,
    devDependencies: suggestedDevPackages,
    allDependencies: suggestedAllPackages
  };
}

module.exports = { suggestions };
