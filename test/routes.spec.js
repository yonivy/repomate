const supertest = require('supertest')
const should = require('should')

let request = supertest('http://localhost:8080')

const BASE_URI = '/repos/yonivy/repomate/files'

describe('Files', function() {
  describe('#exists', function() {
    it('should find a file that exists given its full path', function(done) {
      makeRequest('README.md', true, done)
    })

    it('should not find a file that exists given a non full path', function(done) {
      makeRequest('inside-level-1.md', false, done)
    })

    it('should not find a file that does not exist', function(done) {
      makeRequest('non-existing', false, done)
    })

    function makeRequest(filepath, expected, done) {
      request.get(`${BASE_URI}/exists/${filepath}`)
        .expect(200)
        .end((err, res) => {
          res.body.exists.should.equal(expected)
          done()
        })
    }
  })

  describe('#findByName', function() {
    it('should return a list of all file paths with a given file name', function(done) {
      makeRequest('multiple-occurrences.md', 3, done)
    })

    it('should return an ampty list when no path was found', function(done) {
      makeRequest('non-existing', 0, done)
    })

    function makeRequest(filename, size, done) {
      request.get(`${BASE_URI}/name/${filename}`)
        .expect(200)
        .end((err, res) => {
          res.body.paths.should.be.instanceof(Array).and.have.lengthOf(size)
          done()
        })
    }
  })

  describe('#findByExtension', function() {
    it('should return a list of all file paths with a given file extension', function(done) {
      makeRequest('yaml', 3, done)
    })

    it('should return an ampty list when no path was found', function(done) {
      makeRequest('cpp', 0, done)
    })

    function makeRequest(ext, size, done) {
      request.get(`${BASE_URI}/ext/${ext}`)
        .expect(200)
        .end((err, res) => {
          res.body.paths.should.be.instanceof(Array).and.have.lengthOf(size)
          done()
        })
    }
  })  
})