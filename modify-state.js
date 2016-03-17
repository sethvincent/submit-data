var extend = require('xtend')

var modifiers = {
  'loading:complete': function (action, state) {
    return extend(state, { loading: false })
  },
  'user:login': function (action, state) {
    return extend(state, {
      user: {
        profile: action.profile,
        token: action.token
      }
    })
  },
  'user:logout': function (action, state) {
    return extend(state, { user: null })
  },
  'form:submit': function (action, state) {
    var item = action.fields
    var data = state.data
    data.push(item)
    return extend(state, {
      item: item,
      data: data
    })
  },
  'error': function (action, state) {
    return extend(state, { error: action.error })
  }
}

module.exports = function modifier (action, state) {
  console.log('-------------------------------------')
  console.log('action:', action.type, action)
  var newState = modifiers[action.type](action, state)
  console.log('.....................................')
  console.log('new state:', newState)
  //console.log('-------------------------------------')
  return newState
}
