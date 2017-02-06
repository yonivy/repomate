const supertest = require('supertest')
const should = require('should')

let request = supertest('http://localhost:8080')

const BASE_URI = '/repos/yonivy/repomate/files'

describe('Files', () => {
  describe('#exists', () => {
    it('should find a file that exists given its full path', (done) => {
      request.get(`${BASE_URI}/exists/README.md`)
        .expect(200, done)
    })

    it('should not find a file that exists given a non full path', (done) => {
      request.get(`${BASE_URI}/exists/inside-level-1.md`)
        .expect(404, done)
    })

    it('should not find a file that does not exist', (done) => {
      request.get(`${BASE_URI}/exists/non-existing`)
        .expect(404, done)
    })
  })

  describe('#findByName', () => {
    it('should return a list of all file paths with a given file name', (done) => {
      request.get(`${BASE_URI}/name/multiple-occurence.md`)
        .expect(200, console.log, done)
    })

    it('should return an ampty list when no path was found')
  })

  describe('#findByExtension', () => {
    it('should return a list of all file paths with a given file extension')
    it('should return an ampty list when no path was found')
  })  
})