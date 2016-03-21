var createAuth = require('github-static-auth')
var createStore = require('store-emitter')
var serialize = require('form-serialize')
var cookie = require('cookie-cutter')
var morphdom = require('morphdom')
var extend = require('xtend')
var el = require('yo-yo')

var formUI = require('./form')
var createAuthUI = require('./github-auth')

var config = require('./config')
var data = require('./data.json')
var modify = require('./modify-state')

var token = cookie.get(config.site.slug)

var auth = createAuth({
  githubSecretKeeper: config.proxy,
  githubClientId: config.client_id
})

var authUI = createAuthUI(config, {
  onLogOut: function (e) {
    e.preventDefault()
    cookie.set(config.site.slug, '', { expires: new Date(0) })
    store({ type: 'user:logout' })
  }
})

if (token) {
  auth.getProfile(token, function (err, profile) {
    if (err) return store({ type: 'error', error: err })
    store({ type: 'user:login', profile: profile, token: token })
  })
} else if (auth.getCode()) {
  auth.login(function (err, profile, token) {
    if (err) return store({ type: 'error', error: err })
    store({ type: 'user:login', profile: profile, token: token })
    cookie.set(config.site.slug, token)
    window.location = window.location.origin
  })
}

var store = createStore(modify, {
  site: config.site,
  data: data,
  loading: true,
  requesting: false,
  flash: null,
  modal: null,
  user: null,
  item: {},
  origin: null,
  fork: null
})

store.on('*', function (action, state) {
  morphdom(document.getElementById('app'), render(state))
})

function render (state) {
  return layout(state)
}

document.body.appendChild(render(store.initialState()))
store({ type: 'loading:complete' })

function form (state) {
  var opts = extend(state, {
    onsubmit: function (e) {
      e.preventDefault()
      var fields = serialize(e.target, { hash: true, empty: true })
      store({ type: 'form:submit', fields: fields })
    }
  })

  return el`
    <div class="form">
      <h1>Submit a new item</h1>
      ${formUI(opts)}
    </div>
  `
}

function content (state) {
  var elements = state.user
    ? form(state)
    : el`<h1>Wait. Who are you?</h1>`

  return el`
    <main class="site-content" role="main">
      <div class="container">
        ${elements}
      </div<
    </main>
  `
}

function header (state) {
  return el`
    <header class="app-header">
      <div class="container">
        <h1 class="app-title">${state.site.title}</h1>
        ${authUI.render(state)}
      </div>
    </header>
  `
}

function layout (state) {
  return el`
    <div id="app">
      ${header(state)}
      ${content(state)}
    </div>
  `
}
