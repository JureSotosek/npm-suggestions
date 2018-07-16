const { suggestions } = require('../emma');

const Query = {
  async search(parent, args, ctx, info) {
    return await suggestions(args.dependencies);
  }
};

module.exports = { Query };
