var createAuth = require('github-static-auth')
var createStore = require('store-emitter')
var serialize = require('form-serialize')
var cookie = require('cookie-cutter')
var extend = require('xtend')
var el = require('yo-yo')

var config = require('./config')
var data = require('./data.json')
var modify = require('./modify-state')
var github = require('./github')

var formUI = require('./form')
var createAuthUI = require('./elements/auth')

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
    window.location = config.redirect_uri
  })
}

var store = createStore(modify, {
  site: config.site,
  github: config.github,
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
  el.update(document.getElementById('app'), render(state))
})

function render (state) {
  return layout(state)
}

document.body.appendChild(render(store.initialState()))
store({ type: 'loading:complete' })

function form (state) {
  function onsubmit (e) {
    e.preventDefault()
    var fields = serialize(e.target, { hash: true, empty: true })
    store({ type: 'form:submit', fields: fields })
    var opts = { github: state.github, token: state.user.token, user: state.user.profile.login }
    github.forkAndBranch(opts, getBranch)

    function getBranch (err, fork, branch) {
      if (err) return store({ type: 'error', error: err })

      var opts = {
        github: { owner: fork.owner.login, repo: state.github.repo },
        token: state.user.token,
        ref: branch.ref,
        path: state.site.data
      }

      github.getBlob(opts, writeBlob)

      function writeBlob (err, res, file) {
        if (err) return store({ type: 'error', error: err })
        file.push(fields)

        var opts = {
          github: { owner: fork.owner.login, repo: state.github.repo },
          token: state.user.token,
          ref: branch.ref,
          path: state.site.data,
          content: JSON.stringify(file),
          sha: res.sha,
          branch: branch.ref.split('/')[2],
          message: 'Updated ' + state.site.data
        }

        github.updateBlob(opts, pullRequest)
      }

      function pullRequest (err, res) {

        if (err) return store({ type: 'error', error: err })
        var opts = {
          github: state.github,
          user: state.user.profile.login,
          token: state.user.token,
          title: 'Add new item to ' + state.site.data,
          head: branch.ref,
          base: state.github.branch
        }

        github.createPullRequest(opts, function (err, res) {
          console.log('createPullRequest results:', err, res)
        })
      }
    }
  }

  return el`
    <div class="form">
      <h1>Submit a new item</h1>
      ${formUI(state, { onsubmit: onsubmit })}
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
