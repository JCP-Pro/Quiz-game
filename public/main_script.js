var objList = []
var answers = []
var question = ""
var correctAnswers = []
var playerId = 1
const loginSection = document.querySelector(".login_section")
const logoutOption = document.querySelector(".drop_down_container")
const loginLink = document.querySelector(".login_link")
const logoutLink = document.querySelector(".log_out")
const formView = document.querySelector(".form_container")
const lobbyView = document.querySelector(".lobby_container")
const cAInp = document.querySelector(".c_a_inp")
const listContainer = document.querySelector(".a_container")
const qInp = document.querySelector(".q_inp")
const aInp = document.querySelector(".a_inp")
const btnAdd = document.querySelector(".add")
const btnCreate = document.querySelector(".create")
const btnReset = document.querySelector(".reset")
const qAContainer = document.querySelector(".q_a_container")
const sideContainer = document.querySelector(".side_container")
const gameTracker = document.querySelector(".total_q")
const score = document.querySelector(".points")
const endMessage = document.querySelector(".end_message")
const endDialog = document.querySelector(".end_dialog")
const closeDialog = document.querySelector(".close")
var clickCount = 0
var currentQCount = 1
var playerPoints = 0
var idCount = 0
var totalQCount = 0
var qFinished = 0
gameTracker.innerHTML = `Questions: ${totalQCount}`
score.innerHTML = `Score: ${playerPoints}`

if(loginLink.textContent !== "undefined" && loginLink.textContent !== "Log in") {
    loginSection.addEventListener("mouseenter", () => {
        displayLogout()
    })
    loginSection.addEventListener("mouseleave", () => {
        displayLogout()

    })
    
} else console.log("no user logged in")

function displayLogout() {
    logoutOption.classList.toggle("hide")
    loginLink.classList.toggle("white_text")
    logoutLink.classList.toggle("white_text")
}

//lobby
const lobby = document.querySelector(".lobby") //use to append the list of player
const you = document.querySelector(".log_link").textContent
if (you !== "undefined" && you !== "Log in") {
    createLobby(you)
}

function createLobby (player) {
    let ol = document.createElement("ol")
    ol.classList.add("player_list")
    lobby.append(ol)
    addPlayerToLobbyList(ol, player)
}

function addPlayerToLobbyList(listOfPlayers, player) {
    let li = document.createElement("li")
    li.classList.add("li")
    li.classList.add("player")
    li.id = playerId
    li.innerText = player
    listOfPlayers.append(li)

    playerId++
}

btnAdd.addEventListener('click', getInpValue)
qInp.addEventListener('keyup', (e) => {
    if(e.code === "Enter") getInpValue()
})
aInp.addEventListener('keyup', (e) => {
    if(e.code === "Enter") getInpValue()
})
cAInp.addEventListener('keyup', (e) => {
    if(e.code === "Enter") getInpValue()
})

closeDialog.addEventListener('click', () => endDialog.close())
btnCreate.addEventListener('click', displayQA)
btnReset.addEventListener('click', resetGame)
var id_flag = 0

function hide(el) {
    return el.classList.add("hide")
}

function show(el) {
    el.classList.remove("hide")
}

function showOpacity(el) {
    el.classList.toggle("show_opacity")
}

function resetGame() {
    show(formView)
    show(lobbyView)
    show(sideContainer)
    playerPoints = 0
    id_flag = 0
    idCount = 0
    qFinished = 0
    totalQCount = 0
    currentQCount = 1
    clickCount = 0
    gameTracker.innerHTML = `Questions: ${totalQCount}`
    score.innerHTML = `Score: ${playerPoints}`
    let answers = document.querySelectorAll(".divider")
    let answerContainerArr = [...answers]
    objList = []
    for (let i in answerContainerArr) {
        qAContainer.removeChild(answerContainerArr[i])
    }
    let sideDiv = document.querySelectorAll(".side_div")
    let sideDivArr = [...sideDiv]
    for(let i in sideDivArr) {
        sideContainer.removeChild(sideDivArr[i])
    }
    endDialog.close()
}

function sideTrack(obj) {
    if(window.innerWidth > 700) {
        //Create side list of your current creation to track
        let div = document.createElement("div")
        div.classList.add("side_div") // this is for hiding the "show answer" btn when clicking "create"
        div.setAttribute("id", idCount)
        div.innerHTML = 
        `<button class="show_answers" id=${idCount}>Show answers</button>
        <ol class="s_t_ol">
            <b>${obj.question}</b>
            <li class="li_a" id=${idCount}>${obj.answer_1}</li>
            <li class="li_a" id=${idCount}>${obj.answer_2}</li>
            <li class="li_a" id=${idCount}>${obj.answer_3}</li>
            <li class="li_a" id=${idCount}>${obj.answer_4}</li>
        </ol>
        <hr class="list_divider">`
        idCount++
        sideContainer.append(div)

        //set a divide between lists
        let sideDiv = document.querySelectorAll(".side_div")
        let divider = document.createElement("hr")
        for(let z in sideDiv) {
            let lastChildCount = sideDiv.length - 1
            if(sideDiv[z].id == lastChildCount) {
                console.log(`True, therefore last child: ${sideDiv[z].innerHTML}`)
                let lastChild = sideContainer.lastChild
                lastChild.innerHTML = sideContainer.lastChild.innerHTML.replace(' <hr class="list_divider">', '')        
                break
            } else {
                sideDiv[z].append(divider)
            }
        }

        let btnShowAnswers = document.querySelectorAll(".show_answers")
        let btnArr = [...btnShowAnswers]
        for(let y in btnArr) {
            btnArr[y].addEventListener('click', showAnswer)
        }
    }
}
function showAnswer() { //shows the correct answer with an * in the list before creation.
    let listAnswers = document.querySelectorAll(".li_a")
    for(let x in listAnswers) { //this = button click. the button click id will hold the id of which obj to look for the correct answer. Each block of 4 answers holds a unique id which is the same id of the obj created. matching obj id and answer id will show the correct answer.
        if( listAnswers[x].id == this.id && objList[this.id].correct.includes(listAnswers[x].textContent) == true) {
            listAnswers[x].innerText = listAnswers[x].textContent + " " + "*"
            listAnswers[x].classList.add("green")
            setTimeout(setGreen, 2000)

            function setGreen() {
                listAnswers[x].classList.remove("green")
            }
            // break
        }
        // break
    }
}

function addToObjectList() {
    if(answers.length == 4){
        const q_a_obj = {
            id:"",
            question: "",
            answer_1: "",
            answer_2: "",
            answer_3: "",
            answer_4: "",
            correct: [],
        }
        q_a_obj.id = id_flag.toString()
        q_a_obj.question = question
        q_a_obj.answer_1 = answers[0]
        q_a_obj.answer_2 = answers[1]
        q_a_obj.answer_3 = answers[2]
        q_a_obj.answer_4 = answers[3]
        q_a_obj.correct = correctAnswers
        objList.push(q_a_obj)
        correctAnswers = []
        answers = []
        id_flag++
        totalQCount++
        gameTracker.innerHTML = `Questions: ${totalQCount}`
        sideTrack(q_a_obj)
        console.log(objList)
    } else {
        alert("Please add all the questions and their respective answers!")
    }
}


function getInpValue() {
    if(cAInp.value != cAInp.defaultValue) {
        correctAnswers.push(cAInp.value)
        cAInp.value = cAInp.defaultValue
    }
    if(qInp.value !== qInp.defaultValue && aInp.value !== aInp.defaultValue && answers.length <= 2) {
    question = qInp.value
    answers.push(aInp.value)
    aInp.value = ""
    } else if(answers.length == 3 && correctAnswers.length != 0) {
        // alert("You have 4 answers already. Make a new Q&A")
        question = qInp.value
        answers.push(aInp.value)
        qInp.value = ""
        aInp.value = ""
        cAInp.value = ""
        addToObjectList()
    } else {
        alert("Please fill in Question and Answer and at least 1 correct answer.")
    }
}

function removeTrackList(list) { //list is the side track list of answers <ol>
    let btnShowAnswers = document.querySelectorAll(".show_answers")
    let btnArr = [...btnShowAnswers]
    let sideDiv = document.querySelectorAll(".side_div")
    let sideDivArr = [...sideDiv]
    let hrDivider = document.querySelectorAll("hr")
    for(let i in list) {
        sideDivArr[i].removeChild(btnArr[i])
        list[i].setAttribute("hidden", "")
        if(sideDiv[i].lastChild.innerHTML !== undefined){
            sideDivArr[i].removeChild(hrDivider[i])
        }
    }
}

function displayQA() {
    //Clear all menu
    hide(formView)
    hide(lobbyView)
    hide(sideContainer)
    let trackList = document.querySelectorAll(".s_t_ol")
    let trackListArr = [...trackList]
    removeTrackList(trackListArr)

    for (let i=0;i<objList.length;i++) {
        //TODO: display one question at a time instead of a list.

        let div = document.createElement("div")
        div.classList.add("divider") //to select all for reset
        div.classList.add("transition")
        div.id = i
        // <b><a href="#top_page" class="a_top_page">Back to top</a></b>
        div.innerHTML = ` 
        <h4 class="q">${objList[i].question}</h4>
        <p class="c_answ">Correct answers: ${objList[i].correct.length}</p>
        <div class="a_container" id="${i}">
            <p class="a" id=${i}>${objList[i].answer_1}</p>
            <p class="a" id=${i}>${objList[i].answer_2}</p>
            <p class="a" id=${i}>${objList[i].answer_3}</p>
            <p class="a" id=${i}>${objList[i].answer_4}</p>
        </div>`

        qAContainer.append(div)

        let divId = parseInt(div.id)

        if(divId !== 0) {
            div.classList.add("hide")
        }
    }

    let answ = document.querySelectorAll(".a")
    let answerArr = [...answ]

    for (let i in answerArr) {
        answerArr[i].addEventListener('click', checkAnswer)
    }
    function checkAnswer() {
        for (let i in objList) {
            if(this.id.toString() == objList[i].id){
                if(this.classList.contains("correct") == true) this.classList.remove("wrong")
                else if(objList[i].correct.includes(this.textContent) == true) {
                    // console.log(`Correct!`)
                    playerPoints += 10
                    score.innerHTML = `Score: ${playerPoints}`
                    this.classList.add("correct")
                    clickCount++
                    break
                }
                else if(this.classList.contains("correct") || this.classList.contains("wrong")) break //If it has been clicked, don't count the click or point.
                 else {
                    // console.log("wrong")
                    this.classList.add("wrong")
                    objList[i].verified = "true"
                    clickCount++
                    break
                }
            }
        }

        function removeClick(el, obj) {
            // console.log(`Initial click count: ${clickCount}`)
            let objCount = obj.correct.length
            // console.log(`objCount: ${objCount}`)
            let aCont = document.querySelectorAll(".a_container")
            for (let i in aCont) {
                if(aCont[i].id == el.id && clickCount == objCount ) {
                    clickCount = 0
                    qFinished++
                    let childs = aCont[i].children //considered object to push
                    let childArr = [...childs]
                    for(i in childArr) {
                        childArr[i].removeEventListener('click', checkAnswer)
                        revealAnswers(childArr[i])
                    } 
                    //let the player see the answers and then go to next
                    sleep(2000).then(() => {
                        nextQuestion()
                    })
                    break
                } 
            }
            // console.log(`after click ++ : ${clickCount}`)
            endGame()
        }
        removeClick(this, objList[this.id])

        function nextQuestion() {
            let qDiv = document.querySelectorAll(".divider")
            let qDivArr = [...qDiv]
            for (let i in qDivArr) {
                let divId = parseInt(qDivArr[i].id)

                if (divId == currentQCount) {
                    //hide previous question
                    i -= 1
                    transitionAnimationOut(qDivArr[i])
                    sleep(1000).then(() => {
                        hide(qDivArr[i])
                        clearAnimation(qDivArr[i])    
                        i += 1
                        transitionAnimationIn(qDivArr[i])
                        show(qDivArr[i])
                    })                    
                    //show question
                    sleep(500).then(() => {
                        showOpacity(qDivArr[i])
                    })
                    
                    sleep(1500).then(() => {
                        clearAnimation(qDivArr[i])
                    })
                    currentQCount++
                    break
                }
            }

        }

        function transitionAnimationOut(el) {
            el.classList.toggle("transition_animation_out")
        }

        function transitionAnimationIn(el) {
            el.classList.toggle("transition_animation_out")
            el.classList.toggle("transition_animation_in")
        }

        function clearAnimation(el) {
            el.classList.remove("transition_animation_in")
            el.classList.remove("transition_animation_out")
        }

        function revealAnswers(el) {
            for (let i in objList) {
                if(objList[i].correct.includes(el.textContent) == true && objList[i].id == el.id) {
                    // console.log(`The correct answer to reveal ${el.textContent}`)
                    el.classList.add("correct")
                    break
                } else if (objList[i].id == el.id) {
                    // console.log(`The incorrect answer to reveal ${el.textContent}`)
                    el.classList.add("wrong")
                    break
                } else console.log("continue")
            }
        }

        function endGame() {
            if(qFinished == totalQCount) {
                endDialog.showModal()
                endMessage.innerHTML = `You have scored: ${playerPoints}`
            }
        }
    }
    let anchorlinks = document.querySelectorAll('a[href^="#"]')
 
    for (let item of anchorlinks) { // relitere 
        item.addEventListener('click', (e)=> {
            let hashval = item.getAttribute('href')
            let target = document.querySelector(hashval)
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
            history.pushState(null, null, hashval)
            e.preventDefault()
        })
    }
}

//sleep
function sleep (ms) {
    return new Promise (resolve => setTimeout(resolve, ms))
}

//smooth scrolling
let anchorlinks = document.querySelectorAll('a[href^="#"]')
 
for (let item of anchorlinks) { // relitere 
    item.addEventListener('click', (e)=> {
        let hashval = item.getAttribute('href')
        let target = document.querySelector(hashval)
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
        history.pushState(null, null, hashval)
        e.preventDefault()
    })
}