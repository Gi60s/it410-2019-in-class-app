const accountsController = require('./controllers/accounts')
const api = require('./api')
const cookieParser = require('cookie-parser')
const express = require('express')
const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')
const path = require('path')
const session = require('express-session')

module.exports = async function (dbClient, port = 0) {
  const accounts = accountsController(dbClient)
  const app = express()

  // tell passport to use a local strategy and tell it how to validate a username and password
  passport.use(new LocalStrategy(async function (email, password, done) {
    try {
      const user = await accounts.login(email, password)
      done(null, user || false)
    } catch (err) {
      done(err)
    }
  }))

  // tell passport how to turn a user into serialized data that will be stored with the session
  passport.serializeUser(function (user, done) {
    done(null, user.email)
  })

  // tell passport how to go from the serialized data back to the user
  passport.deserializeUser(function (email, done) {
    const user = accounts.getUser(email)
    done(null, user || false)
  })

  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use(session({ secret: 'secret key', resave: false, saveUninitialized: true }))
  app.use(passport.initialize())
  app.use(passport.session())

  app.use('/api', api)

  const buildPath = path.resolve(__dirname, '../dist')
  app.use(express.static(buildPath))

  // HTML5 History Mode routing
  const indexPath = path.resolve(buildPath, 'index.html')
  app.use((req, res, next) => {
    if ((req.method === 'GET' || req.method === 'HEAD') && req.accepts('html')) {
      res.sendFile(indexPath)
    } else {
      next()
    }
  })

  return new Promise(function (resolve, reject) {
    const listener = app.listen(port, function (err) {
      if (err) {
        reject(err)
      } else {
        resolve({
          port: listener.address().port,
          stop: () => {
            listener.close()
            console.log('Server stopped')
          }
        })
      }
    })
  })
}
