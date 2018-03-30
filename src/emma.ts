import {es} from './elasticsearch'

interface Dependency {
  name: string
  version: string
  type: String
}
interface Package {
  name: string
}

async function groupPairs(
  dependencies: Dependency[],
): Promise<Dependency[][]> {
  return []
}

async function groupDependencies(
  dependencies: Dependency[][],
): Promise<Dependency[][]> {
  return []
}

export async function getSuggestions(
  dependencies: Dependency[],
): Promise<Package[]> {
  let dependencyGroups = await groupPairs(dependencies)
  dependencyGroups = await groupDependencies(dependencyGroups)

  return []
}
