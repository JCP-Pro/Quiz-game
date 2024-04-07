//npm run devStart (to start server)
//inside Public folder = Static files
const express = require('express'); 

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

app.get('/', (req, res)=>{ 
    res.set('Content-Type', 'text/html'); 
    res.render("index", { text : "something else"});
}); 

const userRouter = require('./routes/users')

app.use('/users', userRouter)

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
