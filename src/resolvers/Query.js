const { suggestions, search } = require('../emma');

const Query = {
  suggestions(parent, args, ctx, info) {
    return suggestions(args.dependencies, args.devDependencies, args.limit);
  },

  search(parent, args, ctx, info) {
    return search(args.query);
  }
};

module.exports = { Query };
