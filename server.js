//npm run devStart (to start server)
//inside Public folder = Static files
const express = require('express');
const User = require('./model/model_user')


const app = express(); 
const PORT = 3000; 
//to use javascript inside html
app.set('view engine', 'ejs')
//middleware to log out res.body information
app.use(express.urlencoded({ extended: true }))
//use json information
app.use(express.json())

//to use static file
// app.use(express.static("public"))
app.use(express.static(__dirname + '/public'));

app.post('/', (req, res)=>{ 
    res.set('Content-Type', 'text/html'); 
    res.render("index", { username : `${req.body.username}`});
}); 

const userRouter = require('./routes/users')
const authRouter = require('./routes/auth')

app.use('/users', userRouter)
app.use('/auth', authRouter)

//middleware takes req, res and next
/* function logger(req, res, next) {
    console.log(req.originialUrl)
    next()
} */

app.listen(PORT, (error) =>{ 
	if(!error) 
		console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
	else
		console.log("Error occurred, server can't start", error); 
	} 
); 


//connecting to MongoDB instance
const mongoose = require('mongoose'); 
const UserController = require('./controller/UserController');


mongoose.connect('mongodb+srv://jcp:R73ePcAfZJ9dPVQx@questiongamecluster.vve3ahk.mongodb.net/', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
.then(() => {
	console.log("Connected to the database")
})
.catch(err => {
	console.error("Error connecting to the database: ", err)
})

/* const findingUser = User.findOne({username: "cloud"})
console.log(findingUser) */