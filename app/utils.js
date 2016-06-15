'use strict'

import 'isomorphic-fetch'
import Promise from 'bluebird'
import csv from 'csv'

let csvParser = Promise.promisify(csv.parse)

function getBackend() {
  var db = process.env.DATABASE_LOCATION ||
        'https://rawgit.com/OpenBudget/procurement-dashboard-files/master/data';
  var redash = process.env.REDASH_LOCATION ||
        'http://data.obudget.org/api/queries';
  var publisherTable = process.env.PUBLISHER_TABLE ||
                  '576/results.csv?api_key=ef57eec1938130f9432fb4a62f991a058ce665a8';
  var sourceTable = process.env.SOURCE_TABLE ||
                  '519/results.csv?api_key=f78fc167dd8d6f5321fbad42ab09fe72b750df80';
  var resultTable = process.env.RESULT_TABLE ||
                  '520/results.csv?api_key=3816c4c80e0ef3eec78b50ebc31f03c4780cae05';
  var runTable = process.env.RUN_TABLE || 'runs.csv';
  var performanceTable = process.env.PERFORMANCE_TABLE ||
                  '518/results.csv?api_key=4b1ed10be04e98cf51657a086e74a634cc44c4bd';
  var instanceTable = process.env.INSTANCE_TABLE || 'instance.json'
  return {
    publishers: `${redash}/${publisherTable}`,
    sources: `${redash}/${sourceTable}`,
    results: `${redash}/${resultTable}`,
    //runs: `${db}/${runTable}`,
    performance: `${redash}/${performanceTable}`,
    instance: `${db}/${instanceTable}`
  }
}

function getJSONEndpoint(endpoint) {
  return fetch(endpoint)
    .then(response => {
      return response.text();
    })
    .then(text => {
      return JSON.parse(text);
    })
    .catch(console.trace.bind(console))
}

function getCSVEndpoint(endpoint) {
  return fetch(endpoint)
    .then(response => response.text())
    .then(text => {
      return csvParser(text, {columns: true});
    })
    .catch(console.trace.bind(console))
}

export default { getBackend, getJSONEndpoint, getCSVEndpoint }
