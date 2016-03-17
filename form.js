var createElement = require('bel').createElement
var defaults = require('json-schema-defaults')
var schema = require('./schema')
var hyperx = require('hyperx')
var hx = hyperx(createElement)

module.exports = function renderForm (state) {
  var obj = defaults(schema)
  var keys = Object.keys(obj)

  function field (key) {
    var value = obj[key] ? obj[key] : ''

    return hx`
      <div class="field">
        <label for="${key}">${key}</label><br>
        <input name=${key} class="field-text" type="text" value=${value}>
      </div>
    `
  }

  return hx`
    <div class="form">
      <form onsubmit=${state.onsubmit}>
        ${keys.map(field)}
        <input type="submit" class="button" value="Send item">
      </form>
    </div>
  `
}
