import { es } from './elasticsearch'

export interface Dependency {
  name: string
}
export interface Package {
  name: string
}

export async function findPackages(
  query: string,
  packages: Package[],
): Promise<Dependency[]> {
  return []
}
