function parseElasticsearchResponse(response) {
  const suggestedDependencies = response.aggregations.includesDeps.mostCommonDependencies.buckets.map(
    suggestion => suggestion.key
  );

  return suggestedDependencies;
}

module.exports = {
  parseElasticsearchResponse
};
