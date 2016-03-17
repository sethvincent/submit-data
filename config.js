var config = {
  development: {
    client_id: '3399f4b75617c8ca5876',
    redirect_uri: 'http://127.0.0.1:9966',
    proxy: 'http://127.0.0.1:5000',
    scope: 'repo',
    site: {
      title: 'Submit Data',
      description: 'Submit a row to a csv/json file in a GitHub repo',
      slug: 'submit-data'
    }
  },
  production: {}
}

var env = process.env.NODE_ENV || 'development'
module.exports = config[env]
