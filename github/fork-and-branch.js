var request = require('xhr')
var list = require('./fork-list')
var createFork = require('./fork-create')
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
    if (err) return callback(err)

    var fork = forks.filter(function (f) {
      return f.owner.login === options.user
    })

    if (fork && fork[0]) {
      fork = fork[0]
      createBranch({
        github: { owner: options.user, repo: options.github.repo },
        commit: options.commit,
        token: options.token
      }, function (err, res) {
        if (err) return callback(err)
        callback(null, fork, res)
      })
    } else {
      createFork(options, function (err, forkResponse) {
        if (err) return callback(err)
        fork = forkResponse
        createBranch({
          github: { owner: fork.owner.login, repo: options.github.repo },
          commit: options.commit,
          token: options.token
        }, function (err, res) {
          if (err) return callback(err)
          callback(null, fork, res)
        })
      })
    }
  }
}
