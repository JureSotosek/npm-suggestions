const { indexDependencies } = require('../emma');

const Mutation = {
  indexDependencies(parent, args, ctx, info) {
    return indexDependencies(args.dependencies, args.devDependencies);
  }
};

module.exports = { Mutation };
