const path = require('path')
const _ = require('lodash')
const github = require('./github')


module.exports = function routes(app) { 
  /**
   * @api {get} /repos/:owner/:repo/files/exists/:filepath 
   * @apiName exists
   * @apiGroup Files
   * @apiDescription
   * 
   * @apiParam {String} owner    The owner of the repo (GitHub user name)
   * @apiParam {String} repo     The repository name
   * @apiParam {String} filepath Full file path to search for
   *
   * @apiSuccess {Boolean}
   */
  app.get('/repos/:owner/:repo/files/exists/:filepath', (req, res) => {
    github.getContents(req.params.owner, req.params.repo, req.params.filepath)
      .then(result => {
        let exists = _.isPlainObject(result) && result.type === 'file'
        let status = exists ? 200 : 404

        res.status(status).json(exists)
      })
      .catch(err => {
        res.status(err.statusCode || 500).json(err.message)
        console.error(err.message)
      })
  })

  /**
   * @api {get} /repos/:owner/:repo/files/name/:name
   * @apiName FindByName
   * @apiGroup Files
   * @apiDescription Find all files with a given name in a repository
   * 
   * @apiParam {String} owner    The owner of the repo (GitHub user name)
   * @apiParam {String} repo     The repository name
   * @apiParam {String} name     The file name to search for
   *
   * @apiSuccess {Array} A list of all the found file paths
   */
  app.get('/repos/:owner/:repo/files/name/:name', (req, res) => {
    findFilesByName(req.params.owner, req.params.repo, req.params.name)
      .then(paths => {
        res.status(200).json(paths)
      })
      .catch(err => {
        res.status(err.status || 500).json(err)
      })
  })

  /**
   * @api {get} /repos/:owner/:repo/files/ext/:ext
   * @apiName FindByExtension
   * @apiGroup Files
   * @apiDescription Find all files with a given extension in a repository
   * 
   * @apiParam {String} owner    The owner of the repo (GitHub user name)
   * @apiParam {String} repo     The repository name
   * @apiParam {String} ext      The file extension to search for
   *
   * @apiSuccess {Array} A list of all the found file paths
   */
  app.param('ext', (req, res, next, ext) => {
    req.ext = '.' + ext
    next()
  })

  app.get('/repos/:owner/:repo/files/ext/:ext', (req, res) => {
   findFilesByExtension(req.params.owner, req.params.repo, req.params.ext)
      .then(paths => {
        res.status(200).json(paths)
      })
      .catch(err => {
        res.status(err.status || 500).json(err)
      })
  })
}


function findFilesByName(owner, repo, name) {
  github.getTree(owner, repo)
    .then(tree => {
      return findFiles(tree, name, path.basename)
    })
}

function findFilesByExtension(owner, repo, ext) {
  github.getTree(owner, repo)
    .then(tree => {
      return findFiles(tree, ext, path.extname)
    })
}

function findFiles(tree, identifier, comparator) {
  return tree.reduce((paths, node) => {
    let possibleMatch = comparator(node.path)
    
    if(node.type === 'blob' && identifier === possibleMatch) {
      paths.push(node.path)
    }

    return paths
  }, [])
}