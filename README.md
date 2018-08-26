# 🎯npm-suggestions

A GraphQL API that suggests new packages for you to download based on the dependencies you already have installed.

It is accesible at https://npm-suggestions.now.sh/.

## Overview

It leverages [Algolia's](https://www.algolia.com/) [npm-search](https://github.com/algolia/npm-search) and a [npm-to-elasticsearch](https://github.com/JureSotosek/npm-to-elasticsearch) copy of npm-registry.

The inner workings of the suggestions api and logic will be described in a future blog post.

## Used in

- [Buildastack](https://github.com/JureSotosek/buildastack) - 🥞A tool for building an npm stack.
- [Emma](https://github.com/maticzav/emma-cli) - 📦 Terminal assistant to find and install node packages.

## Development

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
