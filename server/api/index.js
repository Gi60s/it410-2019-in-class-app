const accounts = require('./accounts')
const bodyParser = require('express').json
const contacts = require('./contacts')
const Router = require('express').Router
const profiles = require('./profiles')

// this is the top level API router that includes other API routers
const router = new Router()
module.exports = router

// use the json body parser on all routes
router.use(bodyParser())

// add nested routes
router.use('/account', accounts)
router.use('/contacts', contacts)
router.use('/profile', profiles)
