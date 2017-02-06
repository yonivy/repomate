const rp = require('request-promise')

const BASE_URI = 'https://api.github.com'

exports.getTree = function getTree(owner, repo) {
  return rp({
    uri: `${BASE_URI}/repos/${owner}/${repo}/git/trees/master?recursive=1`,
    headers: {
      'User-Agent': 'yonivy'
    },
    json: true
  })
}

exports.getContents = function getContents(owner, repo, filepath) {
  return rp({
    uri: `${BASE_URI}/repos/${owner}/${repo}/contents/${filepath}`,
    headers: {
      'User-Agent': 'yonivy'
    },
    json: true
  })
}