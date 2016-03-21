var defaults = require('json-schema-defaults')
var el = require('yo-yo')

var schema = require('./schema')

module.exports = function renderForm (state) {
  var obj = defaults(schema)
  var keys = Object.keys(obj)

  function field (key) {
    var value = obj[key] ? obj[key] : ''

    return el`
      <div class="field">
        <label for="${key}">${key}</label><br>
        <input name=${key} class="field-text" type="text" value=${value}>
      </div>
    `
  }

  return el`
    <div class="form">
      <form onsubmit=${state.onsubmit}>
        ${keys.map(field)}
        <input type="submit" class="button" value="Save item">
      </form>
    </div>
  `
}
