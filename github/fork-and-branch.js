var request = require('xhr')
var list = require('./fork-list')
var createBranch = require('./branch-create')
var getCommit = require('./latest-commit')

/**
* Creates a fork on the user's account if needed.
* Creates a branch if fork already exists, or after the fork was created.
*/
module.exports = function forkAndBranch (options, callback) {
  getCommit(options, function (err, commit) {
    options.commit = commit
    list(options, findFork)
  })

  function findFork (err, forks) {
    console.log('forks', err, forks)
    if (err) return callback(err)
    // if found, create a branch on that fork
    createBranch(options, callback)
  }
}
