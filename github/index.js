module.exports = {
  auth: require('./auth'),
  createFork: require('./fork-create'),
  listForks: require('./fork-list'),
  createPullRequest: require('./pull-request'),
  forkAndBranch: require('./fork-and-branch'),
  latestCommit: require('./latest-commit')
}
