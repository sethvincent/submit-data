module.exports = {
  createFork: require('./fork-create'),
  listForks: require('./fork-list'),
  createPullRequest: require('./pull-request'),
  forkAndBranch: require('./fork-and-branch'),
  latestCommit: require('./latest-commit'),
  createCommit: require('./commit-create'),
  getBlob: require('./blob-get')
}
