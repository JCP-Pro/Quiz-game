const User = require('../model/model_user')
// const bcrypt = require('bcrypt')

const UserController = {
    async register(req, res) {
        try {
            const { username, email, password, confirmPass } = req.body
            let fieldsToSee = {
                _id: 0,
                username: 1,
            }
            let usernameQuery = await User.findOne({}, fieldsToSee)
            let usernameDb = usernameQuery.username
            // const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = new User({
                username,
                email,
                password
            })
            if (password == confirmPass && usernameDb !== username) {
                await newUser.save()
                // res.status(201).json({ message: 'User registered successfully' })
                res.status(201).redirect(`/users/${username}`)
                // console.log(`User saved!! User: ${username}, email: ${email}`)
            } else {
                // console.log("Didn't save the user")
                // let status = res.status(400)
                // res.status(400).json( {message: "Username taken"})
                res.status(400).render("users/new", {status: 400})
                /* .set('Content-Type', 'text/html')
                .set(`<h1>Failed to register. ${status}</h1>`) */
            }
            /* if(res.status == 201) {
                res.redirect("/views/index")
            } */
        } catch (error) {
            let status = res.status(400)
            res.status(400)
            .set('Content-Type', 'text/html')
            .set(`<h1>Failed to register. ${status}</h1>`)
        }
    },

    async login(req, res) {
        try {
            const { username, password } = req.body
            let userDb = await User.findOne({ username })
            let usernameDb = userDb.username
            let userPass = userDb.password
            // const isPasswordValid = await bcrypt.compare(password, user.password)
            // let query = { $text: { $search : "new"} }
            /* let fieldsToSee = {
                _id: 0,
                password: 1,
            } */
            const isPasswordValid = await (password == userPass)
            if(isPasswordValid) {
                console.log(userDb)
                // res.status(200).json({ message: 'Authentcation successful' })
                res.status(200).redirect(`/users/${username}`)
            } else if(!usernameDb || !isPasswordValid) {
                /* console.log(`This is the username: ${usernameDb} \n This is the password: ${userPass}`) */
                // res.status(401).json({ message: 'Authentication user failed' })
                res.status(401).render("users/login", {status: 401})
            }
        } catch (error) {
            // res.status(500).json({ message: `Internal server error ${error}`})
            res.status(500).render("status_error", { status: 500 })
        }
    }
}

module.exports = UserController