const { getSuggestions } = require('./elasticsearch');
const { search: algoliaSearch, getPackages } = require('./algolia');
const { parseElasticsearchResponse, parseAlgoliaResponse } = require('./libs');

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

  console.log(bucketSize);

  const algoliaResponse = await getPackages([
    ...suggestedDependencies
      .filter(dependency => !dependencies.includes(dependency))
      .slice(0, limit),
    ...suggestedDevDependencies
      .filter(devDependency => !devDependencies.includes(devDependency))
      .slice(0, limit)
  ]);

  const packages = parseAlgoliaResponse(algoliaResponse);

  const suggestedPackages = packages.filter(package =>
    suggestedDependencies.includes(package.name)
  );
  const suggestedDevPackages = packages.filter(package =>
    suggestedDevDependencies.includes(package.name)
  );

  return {
    dependencies: suggestedPackages,
    devDependencies: suggestedDevPackages
  };
}

async function search(query) {
  const response = await algoliaSearch(query);

  const packages = response.hits.map(package => {
    return {
      ...package,
      owner: package.owner.name
    };
  });

  return packages;
}

module.exports = { suggestions, search };
