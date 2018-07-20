function parseElasticsearchResponse(response) {
  const bucketSize = response.aggregations.includesDeps.doc_count;

  const suggestedDependencies = response.aggregations.includesDeps.mostCommonDependencies.buckets.map(
    suggestion => suggestion.key
  );

  const suggestedDevDependencies = response.aggregations.includesDeps.mostCommonDevDependencies.buckets.map(
    suggestion => suggestion.key
  );

  return {
    suggestedDependencies,
    suggestedDevDependencies,
    bucketSize
  };
}

function parseAlgoliaResponse(response) {
  const packages = response.results.map(package => {
    return {
      ...package,
      owner: package.owner.name
    };
  });

  return packages;
}

module.exports = {
  parseElasticsearchResponse,
  parseAlgoliaResponse
};
