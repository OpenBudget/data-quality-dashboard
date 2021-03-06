'use strict'

import Promise from 'bluebird'
import path from 'path'
import fs from 'fs'

Promise.promisifyAll(fs)

function makePage(filename, title) {
  return function(req, res) {
    var filepath = path.join(req.app.get('config').get('contentDir'), filename)
    fs.readFileAsync(filepath, 'utf8')
      .then(function(content) {
        return res.render('page', {
          content: content,
          title: title
        })
      })
      .catch(console.trace.bind(console))
  }
}

function dashboard(req, res) {
  return res.render('dashboard', {embed: false})
}

function embed(req, res) {
  return res.render('dashboard', {embed: true})
}

function api(req, res) {
  var db = req.app.get('cache').get('db')
  return res.json(db)
}

export default {
  about: makePage('about.md', 'About'),
  faq: makePage('faq.md', 'FAQ'),
  pricing: makePage('pricing.md', 'Pricing'),
  dashboard,
  embed,
  api
}
