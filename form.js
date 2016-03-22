var defaults = require('json-schema-defaults')
var el = require('yo-yo')

var schema = require('./schema')

module.exports = function renderForm (state, actions) {
  var obj = defaults(schema)
  var keys = Object.keys(obj)

  function field (key) {
    var value = obj[key] ? obj[key] : ''

    return el`
      <div class="field">
        <label for="${key}">${key}</label>
        <input name=${key} class="field-text" type="text" value=${value}>
      </div>
    `
  }

  return el`
    <div class="form">
      <p>This site will create a fork of this repo on your account, create a branch for your submission, save your submission, then create a pull request on the source repository.</p>
      <form onsubmit=${actions.onsubmit}>
        ${keys.map(field)}
        <input type="submit" class="button" value="Save item">
      </form>
    </div>
  `
}
