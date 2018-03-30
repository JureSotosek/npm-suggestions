import * as fs from 'fs'
import * as path from 'path'
import chalk from 'chalk'
import { Client } from 'elasticsearch'

const client = new Client({
   host: process.env.ELASTICSEARCH_HOST
})

// Helpers

const log = console.log

const readdir = path =>
   new Promise((resolve, reject) =>
      fs.readdir(path, (err, files) => {
         if (err) {
            return reject(err)
         }
         return resolve(files)
      }),
   )

const readfile = path =>
   new Promise((resolve, reject) =>
      fs.readFile(path, (err, file) => {
         if (err) {
            return reject(err)
         }
         return resolve(file)
      }),
   )

const getIndexName = mapping => mapping.replace('.json', '')
const getMappingsPath = (dir, file) => path.resolve(__dirname, dir, file)

// Seed

async function initIndex(index) {
   const mappings = require(index.mappingsPath)

   return client.indices.create({
      index: index.name,
      body: {
         mappings
      }
   })
}

async function getClusterHealth() {
   return client.info()
}

async function seed(mappingsDir) {
   const mappingsDirPath = path.resolve(__dirname, mappingsDir)
   const mappings = await readdir(mappingsDirPath)

   const indexes = mappings.map(file => ({
      name: getIndexName(file),
      mappingsPath: getMappingsPath(mappingsDir, file)
   }))

   log(`
      ${chalk.blue(`FOUND MAPPINGS:`)}

      ${indexes.map(
      index => `${chalk.green(index.name)} (${index.mappingsPath})
      `).join('')}
   `)

   try {

      // Create Index
      await Promise.all(indexes.map(initIndex))

      // Get Cluster health
      const health = await getClusterHealth()
      console.log(health)
   } catch (err) {
      console.log(err)
   }
}

// ---------------------------------------------------------------------------

seed('../mappings')
