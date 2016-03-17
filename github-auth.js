var createElement = require('bel').createElement
var hyperx = require('hyperx')
var hx = hyperx(createElement)

module.exports = function virtualGithubAuth (config, actions) {
  var url = 'https://github.com/login/oauth/authorize'
    + '?client_id=' + config.client_id
    + '&scope=' + config.scope
    + '&redirect_uri=' + config.redirect_uri

  function login (state) {
    return hx`<a href="${url}" class="profile-login button">Sign in with GitHub</a>`
  }

  function profile (state) {
    return hx`
      <div class="profile">
        <a href="${state.user.profile.html_url}" target="_blank" class="button">
          <img src="${state.user.profile.avatar_url}" class="profile-avatar">
          <span class="profile-name">${state.user.profile.name}</span>
        </a>
        <a href="#" class="profile-logout button" onclick=${actions.onLogOut}>
          Sign out
        </a>
      </div>
    `
  }

  function childElement (state) {
    if (state.user) return profile(state)
    else return login(state)
  }

  return {
    render: function virtualGithubAuth_render (state) {
      var className = 'github-auth'
      if (state.user) className += ' active'
      return hx`<div class="${className}">${childElement(state)}</div>`
    }
  }
}
