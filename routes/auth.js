const express = require('express')
const router = express.Router()
const UserController = require('../controller/UserController')

router.get('/register', (req, res) => {
    res.render("users/new")
})
router.post('/register', UserController.register)

router.get('/login', (req, res) => {
    res.render("users/login")
})
router.post('/login', UserController.login)

module.exports = router