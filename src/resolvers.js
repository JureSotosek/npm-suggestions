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
      parent.page,
      'regular'
    );
  },

  devSuggestions(parent, args, ctx, info) {
    return suggestions(
      parent.dependencies,
      parent.devDependencies,
      parent.limit,
      parent.page,
      'dev'
    );
  },

  allSuggestions(parent, args, ctx, info) {
    return suggestions(
      parent.dependencies,
      parent.devDependencies,
      parent.limit,
      parent.page,
      'all'
    );
  }
};

module.exports = {
  Query,
  SuggestionsPayload
};
