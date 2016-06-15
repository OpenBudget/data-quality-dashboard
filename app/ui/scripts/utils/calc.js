'use strict'

import _ from 'lodash'

function publisherCount(publishers) {
  return _.uniq(publishers, 'id').length
}

function sourceCount(results) {
  return _.uniq(results, 'source_id').length
}

function recentPeriodResults(results) {
  let today = new Date()
  let periodTimestamp
  let three_months_ago = today-135*24*3600*1000;

  let recentPeriodOnly = _.filter(results, function(obj) {
    if (obj.period_id) {
      let period = obj.period_id.split('/')
      if (period.length === 1) {
        periodTimestamp = Date.parse(period[0])
      } else if (period.length === 2) {
        periodTimestamp = Date.parse(period[1])
      }
    }
    if (periodTimestamp !== undefined && periodTimestamp > three_months_ago) {
      return obj
    }
})

  return recentPeriodOnly
}

function timelyPercent(results) {
  let valid = _.filter(results, function(obj) {
    if (obj.score > 0) {
      return obj
    }
  })
  return Math.round((valid.length / results.length) * 100)
}

function validPercent(results) {
  let validPercent = 0
  let valid = _.filter(results, function(obj) {
    let score = obj.score ? obj.score : 0
    if (score > 0) {
      return obj
    }
  })
  if (results.length > 0) {
    validPercent = Math.round((valid.length / results.length) * 100)
  }
  return validPercent
}

function totalScore(results, numberOfPublishers, numberOfTimeUnits) {
  let scores = {}
  let score = 0;
  _.forEach(results, function(obj) {
   scores[obj.publisher_id] = parseInt(obj.score_to_date);
  })
  if (_.keys(scores).length > 0) {
    score = Math.round(
      _.reduce(_.values(scores), function(sum, n) {return sum + n}) / _.keys(scores).length);
  }
  return score
}

function publisherScore(publisher, results) {
  let scores = []
  let countCorrect = 0
  let publisherScore = 0
  // get all scores for this publisher from results
  _.forEach(results, function(obj) {
    if (obj.publisher_id === publisher) {
      if (!publisherScore && obj.score_to_date) {
        publisherScore = parseInt(obj.score_to_date);
      }
      let score = obj.score ? parseInt(obj.score) : 0
      if (score > 0) {
        countCorrect += 1
      }
    }
  })
  return {'score': publisherScore, 'amountCorrect': countCorrect}
}

// return last publication date for a give publisher
function lastFile(publisher, results) {
  let publication = _.max(results, function(obj) {
    if (obj.publisher_id === publisher) {
      // we're after the timestamp of the publisher
      return new Date(_.last(obj.period_id.split('/')))
    }
  })

  let lastFile = {period: 0, score: 0}
  if (publication) {
    if (publication.period_id) {
      lastFile.period = new Date(
        _.last(publication.period_id.split('/')))
    }
    if (publication.score) {
      lastFile.score = parseInt(publication.score)
    }
  }
  return lastFile
}

// return the latest score for a source and its timestamp from results
function sourceScore(source, results) {
  let scores = []
  let sourceScore = {score: 0, timestamp: 0}
  // get all scores and timestamps for this source from results
  _.forEach(results, function(obj) {
    if (obj.source_id === source) {
      let score = obj.score ? obj.score : 0
      let timestamp = Date.parse(obj.timestamp)
      scores.push({score: parseInt(score), timestamp: timestamp})
    }
  })
  // set the source score to: the latest score
  if (scores.length > 0) {
    let latestScore = _.max(scores, function(elt) {
      return elt.timestamp
    })
    sourceScore = latestScore
  }
  return sourceScore
}

export default {
  publisherCount,
  sourceCount,
  recentPeriodResults,
  timelyPercent,
  validPercent,
  totalScore,
  publisherScore,
  sourceScore,
  lastFile
}
