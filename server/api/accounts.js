const Accounts = require('../controllers/accounts')
const isAuthenticated = require('../middlewares/authenticated')
const passport = require('passport')
const Router = require('express').Router

module.exports = function (dbClient) {
  const accounts = Accounts(dbClient)
  const router = new Router()

  router.put('/login', (req, res) => {
    passport.authenticate('local-login', function(error, user, info) {
      if (error) {
        return res.status(500).json(error)
      } else if (!user) {
        return res.status(401).json(info.message)
      } else {
        res.json({
          user,
          contacts: [] // TODO: get user's contacts
        })
      }
    })(req, res, next)
  })

  router.post('/change-password', isAuthenticated, async (req, res) => {
    const { newPassword, oldPassword } = req.body
    const user = req.user
    const changed = await accounts.changePassword(user.email, oldPassword, newPassword)
    if (changed) {
      res.sendStatus(200)
    } else {
      res.status(400).send('Incorrect email or password')
    }
  })

  router.post('/register', async (req, res) => {
    const { email, password } = req.body
    const created = await accounts.create(email, password)
    if (created) {
      res.sendStatus(200)
    } else {
      res.sendStatus(400)
    }
  })

  return router
}
