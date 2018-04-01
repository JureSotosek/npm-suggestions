export interface Dependency {
  name: string
  version: string
  type: string
}

export interface Package {
  name: string
  version: string
}

export interface FrequentPackagesPayload {
  fromDepencies: Dependency[]
  frequentPackages: FrequentPackage[]
}

export interface FrequentPackage {
  corelation: number
  type: string
  package: Package
}

export interface EvaluatedPackagesPayload {
  score: number
  type: string
  package: Package
}
