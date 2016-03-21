var request = require('xhr')

module.exports = function pullRequest (options, callback) {
  var requestOptions = {
    // todo: url: 'https://api.github.com/repos/' + options.owner + '/' + options.repo + '/contents/' + options.path,
    headers: { authorization: 'token ' + options.token },
    json: true
  }

  request(requestOptions, function (err, res, body) {
    if (err) return callback(err)
    if (body.message === 'Not Found') return callback(new Error(body.message))
    // var content = window.atob(body.content)

    callback(err, body)
  })
}
