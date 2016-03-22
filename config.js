var config = {
  development: {
    client_id: '3399f4b75617c8ca5876',
    redirect_uri: 'http://127.0.0.1:9966',
    proxy: 'http://127.0.0.1:5000',
    scope: 'repo',
    github: {
      owner: 'editdata',
      repo: 'submit-data',
      branch: 'gh-pages'
    },
    site: {
      title: 'Submit Data',
      description: 'Submit a row to a csv/json file in a GitHub repo',
      slug: 'submit-data-dev-site',
      data: 'data.json'
    }
  },
  production: {
    client_id: 'e726b293f8f60b2e7170',
    redirect_uri: 'http://submitdata.surge.sh',
    proxy: 'https://submit-data-demo.herokuapp.com',
    scope: 'repo',
    github: {
      owner: 'editdata',
      repo: 'submit-data',
      branch: 'gh-pages'
    },
    site: {
      title: 'Submit Data',
      description: 'Submit a row to a csv/json file in a GitHub repo',
      slug: 'submit-data-demo-site',
      data: 'data.json'
    }
  }
}

var env = process.env.NODE_ENV || 'development'
module.exports = config[env]
