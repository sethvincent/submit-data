var request = require('xhr')

module.exports = function fork (options) {
  var requestOptions = {
    url: 'https://api.github.com/repos/' + options.owner + '/' + options.repo + '/contents/' + options.path,
    headers: { authorization: 'token ' + options.token },
    json: true
  }

  request(requestOptions, function (err, res, body) {
    if (err) return callback(err)
    if (body.message === 'Not Found') return callback(new Error(body.message))
    var content = window.atob(body.content)


    function end (err, data, properties) {
      var save = {
        type: type,
        branch: options.branch,
        owner: options.owner,
        repo: options.repo,
        location: body,
        source: 'github'
      }
      callback(err, data, properties, save)
    }
  })
}
