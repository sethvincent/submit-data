var request = require('xhr')
var moment = require('moment')

module.exports = function createBranch (options, callback) {
  var requestOptions = {
    url: 'https://api.github.com/repos/' + options.github.owner + '/' + options.github.repo + '/git/refs',
    headers: { authorization: 'token ' + options.token },
    method: 'POST',
    json: {
      ref: 'refs/heads/submit-data-' + moment().format('MMM-Do-YY-h-mm-ss'),
      sha: options.commit.sha
    }
  }

  request(requestOptions, function (err, res, body) {
    if (err) return callback(err)
    if (body.message === 'Not Found') return callback(new Error(body.message))
    callback(err, body)
  })
}
