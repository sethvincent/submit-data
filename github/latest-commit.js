var request = require('xhr')

module.exports = function fork (options, callback) {
  var requestOptions = {
    url: 'https://api.github.com/repos/' + options.github.owner + '/' + options.github.repo + '/commits',
    headers: { authorization: 'token ' + options.token },
    data: { sha: options.github.branch },
    json: true
  }

  request(requestOptions, function (err, res, body) {
    if (err) return callback(err)
    if (body.message === 'Not Found') return callback(new Error(body.message))
    callback(err, body[0])
  })
}
