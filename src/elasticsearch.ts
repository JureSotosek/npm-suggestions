import { Client } from 'elasticsearch'
import { Dependency, FrequentPackagesPayload } from './utils'

const client = new Client({
  host: process.env.ELASTICSEARCH_HOST,
  log: 'trace',
})

export const getPackageBucketCount = (
  dependencyGroups: Dependency[][],
): Number => {
  return 100
}

export const getFrequentPackages = (
  dependencies: Dependency[][],
): FrequentPackagesPayload[] => {
  return [
    {
      fromDepencies: dependencies[0],
      frequentPackages: [
        {
          corelation: 0.8,
          type: 'dependency',
          package: { name: 'react', version: '16' },
        },
        {
          corelation: 0.4,
          type: 'dependency',
          package: { name: 'reactNative', version: '16' },
        },
        {
          corelation: 0.1,
          type: 'dependency',
          package: { name: 'styledComponents', version: '16' },
        },
        {
          corelation: 0.09,
          type: 'dependency',
          package: { name: 'dotenv', version: '16' },
        },
      ],
    },
  ]
}
