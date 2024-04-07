const next = document.querySelector(".next_btn")
const forgotPassNav = document.querySelector(".change_pass")
const signupNav = document.querySelector(".signup_nav")
const changeUserView = document.querySelector(".user_verification_view")
const changePassView = document.querySelector(".change_pass_view")
const userChange = document.querySelector(".change_user_input")
const errorSection = document.querySelector(".error_section")
const emptyFieldError = document.querySelector(".empty_field_error")
const invalidUserError = document.querySelector(".invalid_user")
var emptyInput = false
var invalid = false
let valid = false
let enterKey = false

//when pressing enter first navigate to the next screen, then let the default "enter" work (sending form info)
window.addEventListener("keydown", keyPressed)

function navigate(from, to) {
    from.classList.toggle("hide")
    to.classList.toggle("hide")
}

//nav to previous
function navigateUp() {
    //Use this.id to identify at what point of navigation we are. use this to modify what to be seen
    let navigateId = parseInt(this.id)
    if (navigateId == 1) {
        navigate(changePassView, changeUserView)
        enterKey = false
        window.addEventListener("keydown", keyPressed)

    }
    else {
        console.log("navigation error")
    }
}


const navToPreviousNode = document.querySelectorAll(".return_action")
const navToPreviousArray = [...navToPreviousNode]
navToPreviousArray[1].addEventListener('click', navigateUp)


//from user verification to password restart
next.addEventListener("click", navigateToChangePassword)

function navigateToChangePassword() {
    errorInput(userChange.value)
    if (valid) navigate(changeUserView, changePassView)
}

//input error handler temp
function errorInput(value) {
    switch(value) {
        case "" : {
            errorSection.classList.remove("hide")
            emptyFieldError.classList.remove("hide")
            emptyInput = true
            break
        }
        
        case "invalid": {
            errorSection.classList.remove("hide")
            invalidUserError.classList.remove("hide")
            invalid = true
            break
        }

        default: {
            if (invalid || emptyInput) {
                errorSection.classList.add("hide")
                emptyFieldError.classList.add("hide")
                invalidUserError.classList.add("hide")
            }
            valid = true
        }
    }
}



function keyPressed(e) {
    if (enterKey) {
        window.removeEventListener("keydown", keyPressed)
    } else {
        if (e.key == 'Enter') {
            next.click()
            if(valid) enterKey = true
        }
    }
}