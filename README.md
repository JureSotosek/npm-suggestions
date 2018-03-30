# Emma Suggestions

Get package suggestions for your current project.

## TODO

* [ ] Add schema definitions (Package, Dependency)

## URLs

### Development

* `elasticsearch`: "localhost:9200"
* `yoga`: "localhost:4000"

## Blueprint

### Package fields that are suggested

* name
* version
* description

### Internal Data Types

#### Dependency

> Core element of the database.

* name
* version (exact)
* description
* package
  * name
  * version (semver)

#### Package

> Used for obtaining detailed information about the suggested packages.

* private
* name
* version
* description
* homepage
* author
  * name
  * email
  * url
* readme
* repository
  * type
  * url
* dependencies
  * name
  * version
* devDependencies
  * name
  * version
* peerDependencies
  * name
  * version
* license

#### Version

> Used for internal logging of database updates.

* last_sequence
* timestamp

### Algorithm



## Development Setup

### Elastic Search

```bash
brew install elasticsearch
brew services start elasticsearch
```
