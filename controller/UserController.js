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
            
                let userDb = await User.findOne({ username }).exec()
                if(userDb !== null) {
                let usernameDb = userDb.username
                let userPass = userDb.password
                if(usernameDb && userPass !== null) {
                    const isPasswordValid = await (password == userPass)
                    const isUsernameValid = await (username == usernameDb)
                    if(isPasswordValid && isUsernameValid) {
                        console.log(userDb)
                        res.status(200).redirect(`/users/${username}`)
                    } else if(!isPasswordValid || !isUsernameValid) {
                        res.status(401).render("users/login", {status: 401})
                    }
    
                }
            } else {
                res.status(401).render("users/login", {status: 401})
            } 
        } catch (error) {
            // res.status(500).json({ message: `Internal server error ${error}`})
            console.log(`UserController, login catch: ${error}`)
            res.status(500).render("status_error", { status: 500 })
        }
    },

    async fetchUserData(req, res) {
        try {
            let user = req.params.id
            let userDb = await User.findOne({ username: user }).exec()
            if (userDb !== null) {
                console.log(`GET: ${userDb}`)
                res.render("users/profile", { username : user, img: userDb.img, userStatus: userDb.profileStatus})
            } else {
                console.log("Empty img src")
            }
        } catch (err) {
            res.status(404).json({message: "Something went wrong" + err})
        }
    },

    async saveUserData(req, res) {
        try {
            let user = req.params.id
            let body = req.body
            let imgSrc = body.imgSrc
            let profileStatus = body.profileStatus
            let userDb = await User.findOne({ username: user }).exec()
            if(userDb !== null && imgSrc !== ""){ 
                userDb.img = imgSrc
                userDb.profileStatus = profileStatus
                await userDb.save()
                console.log(`POST: ${userDb}`)
                res.render("users/profile", { username : user, img: userDb.img, userStatus: userDb.profileStatus})
            }
            else console.log(`imgSrc: ${imgSrc} and userDb ${userDb}`)
            // let userImg = userDb.img
        }
        catch (err) {
            res.status(401).json({message: "Something went wrong" + err})
        }
    }
}

module.exports = UserController