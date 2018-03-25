import { Client } from 'elasticsearch'

const client = new Client({
  host: process.env.ELASTICSEARCH_HOST,
  log: 'trace'
})

interface Dependency {
  name: String
  version: String
  type: String
  count?: Number
}

interface MostFrequentPayload {
  bucketSize: Number
  dependencies: Dependency[]
}

export const mostFrequent = (dependencies: Dependency[]): MostFrequentPayload => {
  return {
    bucketSize: 2000,
    dependencies: [{
      name: "react",
      version: "16",
      type: "dependency",
      count: 1500
    },{
      name: "react-native",
      version: "16",
      type: "dependency",
      count: 700
    },{
      name: "styled-components",
      version: "16",
      type: "dependency",
      count: 300
    }]
  }
}

interface DependencyCoeficientPayload {
  bucketSize: Number
  dependencyCoeficient: Number
}

export const dependencyCoeficient = (dependencies: Dependency[], dependentOn: Dependency[]): DependencyCoeficientPayload => {
  return {
    bucketSize: 300,
    dependencyCoeficient: 0.90
  }
}
