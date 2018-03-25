import {mostFrequent, dependencyCoeficient} from './elasticsearch'

export interface Dependency {
  name: String
  version: String
  type: String
}

export interface Package {
  name: String
}

export async function getSuggestions(
  dependencies: Dependency[],
): Promise<Package[]> {
  return null
}
