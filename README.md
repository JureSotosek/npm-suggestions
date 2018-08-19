# 🎯emma-suggestions

A GraphQL API that suggests new packages for you to download based on the ones you already have installed.

## Overview

It leverages Algolia's [npm-search](https://github.com/algolia/npm-search) and an Elasticsearch's [emma-replicator](https://github.com/JureSotosek/emma-replicator) copy of npm-registry

It was primeraly made to be used with [emma-cli](https://github.com/Maticzav/emma-cli), a CLI tool that helps you with setting up your projects, but it can also be accessed at https://emma-suggestions.herokuapp.com/.

## Start

```sh
yarn start
```

## Env variables

See [config.js](./config.js):

### Required:

- `elasticsearch_endpoint`: elasticsearch instance url
- `user`: elasticsearch instance username
- `password`: elasticsearch instance password

### Other:

- `indexName` - default: `npm-registry` name of the elasticsearch index
- `docType` - default: `_doc` Default doc type.

## License

MIT © [Jure Sotošek](https://github.com/juresotosek)

<p align="center"><a href="https://www.algolia.com"><img src="media/algolia.svg" width="400" /></a></p>
