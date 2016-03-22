var request = require('xhr')

module.exports = function getBlob (options, callback) {
  var requestOptions = {
    url: 'https://api.github.com/repos/'  + options.github.owner + '/' + options.github.repo + '/contents/' + options.file,
    headers: { authorization: 'token ' + options.token },
    json: true
  }

  request(requestOptions, function (err, res, body) {
    if (err) return callback(err)
    if (body.message === 'Not Found') return callback(new Error(body.message))
    var content = window.atob(body.content)
    callback(err, content)
  })
}
