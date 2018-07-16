const { getSuggestions } = require('./elasticsearch');

async function suggestions(dependencies) {
  const response = await getSuggestions(dependencies);

  const suggestions = response.aggregations.includesDeps.mostCommon.buckets.map(
    suggestion => {
      return {
        package: { name: suggestion.key },
        score: suggestion.doc_count
      };
    }
  );

  return suggestions;
}

module.exports = { suggestions };
