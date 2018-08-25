const { suggestions } = require('./suggestions');

const Query = {
  suggestions(parent, args, ctx, info) {
    return suggestions(args.dependencies, args.devDependencies, args.limit);
  }
};

module.exports = {
  Query
};
