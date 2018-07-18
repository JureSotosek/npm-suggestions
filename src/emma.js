const { getSuggestions } = require('./elasticsearch');
const { search: algoliaSearch, getPackages } = require('./algolia');

async function suggestions(dependencies, devDependencies) {
  const elasticsearchResponse = await getSuggestions(
    dependencies,
    devDependencies
  );

  const suggestedDependencies = elasticsearchResponse.aggregations.includesDeps.mostCommonDependencies.buckets.map(
    suggestion => {
      return suggestion.key;
    }
  );

  const suggestedDevDependencies = elasticsearchResponse.aggregations.includesDeps.mostCommonDevDependencies.buckets.map(
    suggestion => {
      return suggestion.key;
    }
  );

  const algoliaResponse = await getPackages([
    ...suggestedDependencies.slice(dependencies ? dependencies.length : 0),
    ...suggestedDevDependencies.slice(
      devDependencies ? devDependencies.length : 0
    )
  ]);

  const packages = algoliaResponse.results
    .filter(package => suggestedDependencies.includes(package.name))
    .map(package => {
      return {
        name: package.name,
        humanDownloadsLast30Days: package.humanDownloadsLast30Days,
        version: package.version,
        description: package.description,
        owner: package.owner.name
      };
    });

  const devPackages = algoliaResponse.results
    .filter(package => suggestedDevDependencies.includes(package.name))
    .map(package => {
      return {
        name: package.name,
        humanDownloadsLast30Days: package.humanDownloadsLast30Days,
        version: package.version,
        description: package.description,
        owner: package.owner.name
      };
    });

  return { dependencies: packages, devDependencies: devPackages };
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
