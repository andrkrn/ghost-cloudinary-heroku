// Ghost Configuration for Heroku

var path = require('path'),
    config,
    fileStorage,
    storage;

if (!!process.env.CLOUDINARY_CLOUD_NAME) {
  fileStorage = true
  storage = {
    active: 'ghost-cloudinary-store',
    'ghost-cloudinary-store': {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key:    process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    }
  }
} else {
  fileStorage = false
  storage = {}
}

config = {

  // Production (Heroku)
  production: {
    url: process.env.HEROKU_URL,
    mail: {
      transport: 'SMTP',
      host: 'smtp.mandrillapp.com',
      options: {
        service: 'Mandrill',
        auth: {
          user: process.env.MANDRILL_USERNAME,
          pass: process.env.MANDRILL_APIKEY
        }
      }
    },
    fileStorage: fileStorage,
    storage: storage,
    database: {
      client: 'postgres',
      connection: process.env.DATABASE_URL,
      debug: false
    },
    server: {
      host: '0.0.0.0',
      port: process.env.PORT
    },
    paths: {
      contentPath: path.join(__dirname, '/content/')
    }
  },

  // Development
  development: {
    url: 'http://localhost:2368',
    fileStorage: true,
    storage: {
      active: 'ghost-cloudinary-store',
      'ghost-cloudinary-store': {
          cloud_name: 'andrikurnia',
          api_key:    '246562873848793',
          api_secret: 'mZjbn7HB23nO_Gv3AseLvJwdTbE'
      }
    },
    database: {
      client: 'sqlite3',
      connection: {
        filename: path.join(__dirname, '/content/data/ghost-dev.db')
      },
      debug: false
    },
    server: {
      host: '127.0.0.1',
      port: '2368'
    },
    paths: {
      contentPath: path.join(__dirname, '/content/')
    }
  }

};

// Export config
module.exports = config;