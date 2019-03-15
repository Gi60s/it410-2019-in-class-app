const Accounts = require('../database/accounts')
const isAuthenticated = require('../middlewares/authenticated')
const Router = require('express').Router

module.exports = function (dbClient) {
  const accounts = Accounts(dbClient)
  const router = new Router()

  router.post('/change-password', isAuthenticated, (req, res) => {
    const { newPassword, oldPassword } = req.body

  })

  router.post('/register', (req, res) => {
    const { email, password } = req.body

  })

  return router
}
