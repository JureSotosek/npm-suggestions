function parseElasticsearchResponse(response) {
  const bucketSize = response.aggregations.includesDeps.doc_count;

  const suggestedDependencies = response.aggregations.includesDeps.mostCommonDependencies.buckets.map(
    suggestion => suggestion.key
  );

  const suggestedDevDependencies = response.aggregations.includesDeps.mostCommonDevDependencies.buckets.map(
    suggestion => suggestion.key
  );

  const suggestedAllDependencies = response.aggregations.includesDeps.mostCommonAllDependencies.buckets.map(
    suggestion => suggestion.key
  );

  return {
    suggestedDependencies,
    suggestedDevDependencies,
    suggestedAllDependencies,
    bucketSize
  };
}

module.exports = {
  parseElasticsearchResponse
};
