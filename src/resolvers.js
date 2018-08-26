const { suggestions } = require('./suggestions');

const Query = {
  suggestions(parent, args, ctx, info) {
    return args;
  }
};

const SuggestionsPayload = {
  suggestions(parent, args, ctx, info) {
    return suggestions(
      parent.dependencies,
      parent.devDependencies,
      parent.limit,
      'regular'
    );
  },

  devSuggestions(parent, args, ctx, info) {
    return suggestions(
      parent.dependencies,
      parent.devDependencies,
      parent.limit,
      'dev'
    );
  },

  allSuggestions(parent, args, ctx, info) {
    return suggestions(
      parent.dependencies,
      parent.devDependencies,
      parent.limit,
      'all'
    );
  }
};

module.exports = {
  Query,
  SuggestionsPayload
};
