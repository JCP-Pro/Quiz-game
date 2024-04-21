const express = require("express")
const router = express.Router()

/* router.get('/', (req, res) => {
    res.send('User List')
}) */

/* router.get('/login', (req, res) => {
    res.render("users/login")
}) */

router.get('/forgot_password', (req,res) => {
    res.render("users/forgot_password")
})

router.get('/guest', (req,res) => {
    let guestId = Math.floor(Math.random() * 100000)
    let guest = `Guest#${guestId}`
    res.render("users/guest", { guestUser: guest })
})


/* router.get('/new', (req, res) => {
    res.render("users/new")
}) */

/* router.post('/', (req, res) => {
    //express doesn't allow you to access the body so you need a middleware, statement on server.js
    const isValid = true
    if(isValid) {
        users.push({newName: req.body.newName})
        res.redirect(`/users/${users.length}`)
    } else {
        console.log("Error")
        res.render('users/new', {newName: req.body.newName}, console.log(users))
    }
    req.body.newName
}) */

//dynamic parameter for users, static routes should go above dynamics.
router.get('/:id', (req, res) => {
    res.render("index.ejs", { username : `${req.params.id}`})

})

router.get('/:id/profile', (req, res) => {
    res.render("users/profile", { username : `${req.params.id}`})
})

module.exports = router