import { Client } from 'elasticsearch'

const client = new Client({
  host: process.env.ELASTICSEARCH_HOST,
  log: 'trace'
})

export const es = {}