import { getPackageBucketCount, getFrequentPackages } from './elasticsearch'
import {
  Dependency,
  FrequentPackagesPayload,
  EvaluatedPackagesPayload,
} from './utils'

const packageBucketCountThreshold = 1000
const dependenciesLengthWeight = 2

const seperateDependencies = (dependencies: Dependency[][]): Dependency[][] => {
  return dependencies
}

const groupDependencies = (dependencies: Dependency[]): Dependency[][] => {
  let dependencyGroups = [dependencies]
  let packageBucketCount = getPackageBucketCount(dependencyGroups)

  while (packageBucketCount < packageBucketCountThreshold) {
    dependencyGroups = seperateDependencies(dependencyGroups)
    packageBucketCount = getPackageBucketCount(dependencyGroups)
  }

  return dependencyGroups
}

const evaluateFrequentPackages = (
  frequentPackages: FrequentPackagesPayload[],
): EvaluatedPackagesPayload[] => {
  let evaluatedPackages: EvaluatedPackagesPayload[]

  frequentPackages.forEach(packagesFromDependecies => {
    packagesFromDependecies.frequentPackages.forEach(frequentPackage => {
      let score =
        (dependenciesLengthWeight ^
          packagesFromDependecies.fromDepencies.length) *
        frequentPackage.corelation

      evaluatedPackages.push({
        score,
        type: frequentPackage.type,
        package: frequentPackage.package,
      })
    })
  })

  return evaluatedPackages
}

export const getSuggestions = (
  dependencies: Dependency[],
): EvaluatedPackagesPayload[] => {
  const dependencyGroups = groupDependencies(dependencies)

  const frequentPackages = getFrequentPackages(dependencyGroups)

  const evaluatedPackages = evaluateFrequentPackages(frequentPackages)

  return evaluatedPackages
}
