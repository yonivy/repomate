const rp = require('request-promise')

const BASE_URI = 'https://api.github.com'
const DEFAULT_OPTIONS = {
  headers: {
    'User-Agent': 'yonivy'
  },
  json: true
}

exports.getTree = function getTree(owner, repo) {
  return getDafaultBranch(owner, repo)
    .then(branch => {
      return rp(Object.assign({}, {
          uri: `${BASE_URI}/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`
        }, DEFAULT_OPTIONS)
      )
    })
    .then(result => {
      if(!result.truncated) {
        // github managed give us the entire tree
        return result.tree
      }
      else {
        // not all the tree is here some we need to fetch each subtree manually

        let url = `${BASE_URI}/repos/${owner}/${repo}/git/trees/${branch}`

        let it = getTreeDeep(url)
        let res = it.next()

        let tree = []
        while(!res.done) {
          tree.push(res.value)
          res = res.next()
        }

        return tree
      }
    })
}

exports.getContents = function getContents(owner, repo, filepath) {
  return rp(Object.assign({}, {
      uri: `${BASE_URI}/repos/${owner}/${repo}/contents/${filepath}`
    }, DEFAULT_OPTIONS)
  )
}

function getDafaultBranch(owner, repo) {
  return rp(Object.assign({}, {
      uri: `${BASE_URI}/repos/${owner}/${repo}`
    }, DEFAULT_OPTIONS)
  )
  .then(result => result.default_branch)
}

function *getTreeDeep(url) {
  rp(Object.assign({}, { uri: url }, DEFAULT_OPTIONS))
    .then(result => result.tree)
    .map(inspectNode)
}

function *inspectNode(node) {
  if(node.type === 'blob') {
    yield node
  }
  else if(node.type === 'tree') {
    yield *getTreeDeep(node.url)
  }
}