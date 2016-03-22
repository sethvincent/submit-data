var request = require('xhr')

module.exports = function pullRequest (options, callback) {
  var requestOptions = {
    url: 'https://api.github.com/repos/' + options.github.owner + '/' + options.github.repo + '/pulls',
    headers: { authorization: 'token ' + options.token },
    method: 'POST',
    json: {
      title: options.title,
      head: options.user + ':' + options.head,
      base: options.base
      // TODO: body message, maybe something like: body: 'Pull request created by Submit Data'
    }
  }

  request(requestOptions, function (err, res, body) {
    if (err) return callback(err)
    if (body.message === 'Not Found') return callback(new Error(body.message))
    callback(err, body)
  })
}
