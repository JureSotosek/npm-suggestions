const { suggestions, search } = require('../emma');

const Query = {
  async suggest(parent, args, ctx, info) {
    return suggestions(args.dependencies);
  },

  async search(parent, args, ctx, info) {
    return search(args.query);
  }
};

module.exports = { Query };
