//TODO: Make the Q & A List the container for the game creation. Add permission to delete / edit / add to an existing question. Show only the question and make the answers a dropdown. Permission to delete should be right click.

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
// const listContainer = document.querySelector(".a_container")
const qInp = document.querySelector(".q_inp")
const aInp = document.querySelector(".a_inp")
const btnAdd = document.querySelector(".add")
const btnCreate = document.querySelector(".create")
const btnStart = document.querySelector(".start")
const btnReset = document.querySelector(".reset")
const qAContainer = document.querySelector(".q_a_container")
const sideContainer = document.querySelector(".side_container")
const gameTracker = document.querySelector(".total_q")
const score = document.querySelector(".points")
const endMessage = document.querySelector(".end_message")
const endDialog = document.querySelector(".end_dialog")
const closeDialog = document.querySelector(".close")
const playerImg = document.querySelector(".player_img")
var questionPresent = false
var answerDeleted = false
var answerEdited = false
var menuOpen = false
var clickCount = 0
var currentQCount = 1
var playerPoints = 0
var idCount = 0
var totalQCount = 0
var qFinished = 0
var objAnswerNum = 1
var answerQty = 1
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
    loginSection.classList.toggle("vh100")
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
    li.classList.add("li", "li_player")
    li.id = playerId

    let p = document.createElement("p")
    p.classList.add("margin", "player")
    p.innerText = player

    let img = document.createElement("img")
    img.src = playerImg.src
    img.classList.add("player_img")
    
    let flexDiv = document.createElement("div")
    flexDiv.classList.add("flex")

    let roleIcon = document.createElement("img")
    roleIcon.classList.add("role_icon", "icon")
    listOfPlayers.append(li)
    li.append(flexDiv)
    flexDiv.append(img, p)
    if(playerId == 1) {
        roleIcon.src = "/res/media/crown.png"
    } else {
        roleIcon.src = "/res/media/player_lobby.png"
    }
    flexDiv.append(roleIcon)
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
btnStart.addEventListener('click', displayQA)
btnReset.addEventListener('click', resetGame)
btnCreate.addEventListener('click', addToObjectList)
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

function addQuestionSideTrack(question) {
    if(window.innerWidth > 700) {
        let div = document.createElement("div")
        div.classList.add("side_div") // this is for hiding the "show answer" btn when clicking "create"
        div.setAttribute("id", `side_${idCount}`)
        div.innerHTML = 
        `<button class="show_answers" id=${idCount}>Show answers</button>
        <ol class="s_t_ol_${idCount} s_t_ol">
            <b>${question}</b>
            </ol>
            `
            
        sideContainer.append(div)
    }
}

function addAnswerSideTrack(answer) {
    if(window.innerWidth > 700) {
        let answerList = document.querySelector(`.s_t_ol_${idCount}`)
        let sideDiv = document.querySelector(`#side_${idCount}`)
        let li = document.createElement("li")
        li.classList.add("li_a")
        li.setAttribute("id", idCount)
        li.innerText = answer
       
        //after 4 answers, close the question and increment the id for the next question.
        objAnswerNum++
        answerList.append(li)

        //set a divide between lists
       /*  let sideDiv = document.querySelectorAll(".side_div")
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
        } */

        //show correct answers
        let btnShowAnswers = document.querySelectorAll(".show_answers")
        let btnArr = [...btnShowAnswers]
        for(let y in btnArr) {
            btnArr[y].addEventListener('click', showAnswer)
        }
        
        //context menu for answers
        let contextMenuDiv = document.createElement("div")
        contextMenuDiv.classList.add("menuDiv", "hide")
        contextMenuDiv.setAttribute("id", `menu_${idCount}`)
        let contextMenu = `
        <ul class="menuOptions">
          <li class="menu_li" id="${idCount}">Edit</li>
          <li class="menu_li" id="${idCount}">Delete</li>
        </ul>
        `  
        contextMenuDiv.innerHTML = contextMenu
        answerList.append(contextMenuDiv)

        //modify answers with rick click
        li.addEventListener("contextmenu", (e) => {
            e.preventDefault()
            displayContextMenu(contextMenuDiv)
        })

        let menuLi = document.querySelectorAll(".menu_li")
        let arrMenuLi = [...menuLi]
        for (let i in arrMenuLi) {
            arrMenuLi[i].addEventListener("click", () => {
                //this loops all the way through. The flag to stop the function is answerDeleted
                triggerMenuOption(arrMenuLi[i], li)
            })
        }
        /* element.forEach(
            (el) => {
                el.addEventListener("click", (e) => {
                // e.preventDefault()
                console.log("menu not showing")
            })
            }
        ) */
        // if (objAnswerNum == 5) idCount++
    }
}

//TODO: Add, Edit, Remove options. Open a dialog where the players modifies and when closes, updates the data.

function displayContextMenu(menu) {
    /* if (menuOpen) menuOpen = false
    else menuOpen = true */
    answerDeleted = false
    answerEdited = false
    closeOpenedMenu()
    menu.classList.toggle("hide")
    menu.classList.toggle("is_open")
}

function closeOpenedMenu() {
    //When another menu is open, close it and open the current one you are selecting.
    let contextMenuDiv = document.querySelectorAll(".menuDiv")
    contextMenuDiv.forEach((el) => {
        if (el.classList.contains("is_open")) {
            menuOpen = true
            el.classList.toggle("hide")
            el.classList.toggle("is_open")
            console.log("closed the opened menu")
        } else {
            menuOpen = false
        }
    })
}

function triggerMenuOption(el, answer) {
    if(el.textContent.includes("Edit")) {
        editOption(el, answer)
    } else {
        deleteOption(el, answer)
    }
}

/* function addOption(el) {
} */

function editOption(el, answer) {
    // console.log(`this is the edit id: ${el.id}`)
    //TODO: Edit the text, update answer lists, also if it is the correct answer use a checkbox for the player to flag it. Open a dialog where there is a <p> with the current answer. an input field for the new answer and a checkbox for the correct answer flag.
    if(!answerEdited) {
        console.log("pending")
    }
}

function deleteOption(el, answer) {
    //flag to preven the loop to deleting all
    if(!answerDeleted) {
        if(objList.length != 0) {
            if(objList[el.id].correct.includes(answer.textContent)) {
                //remove the correct answer from the obj
                removeAnswerFromArray(answer, objList[el.id].correct)
                removeAnswerFromArray(answer, correctAnswers)
                removeAnswerFromArray(answer, answers)
                //remove answer from list
                answer.remove()
                // answer.innerText = ""
                answerDeleted = true
            }   
        } else {
            //before object creation.
            removeAnswerFromArray(answer, correctAnswers)
            removeAnswerFromArray(answer, answers)
            answer.remove()
            // answer.innerText = ""
            answerDeleted = true
            
        }
    }
}

function removeAnswerFromArray(answer, array) {
    if(array.includes(answer.textContent)) {
        let index = array.indexOf(answer.textContent)
        if(index > -1) array.splice(index, 1)
    } else console.log("nothing to remove from array")
}

function showAnswer() { //shows the correct answer with an * in the list before creation.
    let listAnswers = document.querySelectorAll(".li_a")
    for(let x in listAnswers) { //this = button click. the button click id will hold the id of which obj to look for the correct answer. Each block of 4 answers holds a unique id which is the same id of the obj created. matching obj id and answer id will show the correct answer.
        if( listAnswers[x].id == this.id && objList[this.id].correct.includes(listAnswers[x].textContent) == true) {
            // listAnswers[x].innerText = listAnswers[x].textContent + " " + "*"
            listAnswers[x].classList.toggle("green")
            setTimeout(removeGreen, 2000)

            function removeGreen() {
                listAnswers[x].classList.toggle("green")
            }
            // break
        }
        // break
    }
}

function addToObjectList() {
    if(answers.length > 1){
        if(correctAnswers.length > 0) {

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
        //fixing the undefined when displaying
        switch(answers.length) {
            case 1:  {
                q_a_obj.answer_1 = answers[0]
                break
            };
            case 2: {
                q_a_obj.answer_1 = answers[0]
                q_a_obj.answer_2 = answers[1]
                answerQty = 2
                break
            };
            case 3: {
                q_a_obj.answer_1 = answers[0]
                q_a_obj.answer_2 = answers[1]
                q_a_obj.answer_3 = answers[2]
                answerQty = 3
                break
            };
            case 4: {
                q_a_obj.answer_1 = answers[0]
                q_a_obj.answer_2 = answers[1]
                q_a_obj.answer_3 = answers[2]
                q_a_obj.answer_4 = answers[3]
                answerQty = 4
                break
            };
            default: console.log("no answers")
        }
        q_a_obj.correct = correctAnswers
        objList.push(q_a_obj)
        correctAnswers = []
        answers = []
        id_flag++
        totalQCount++
        gameTracker.innerHTML = `Questions: ${totalQCount}`
        //reset question flag
        questionPresent = false
        //reset input fields
        qInp.removeAttribute("disabled")
        qInp.value = ""
        aInp.value = ""
        cAInp.value = ""
        //adding answer to the side tracker
        objAnswerNum = 1
        idCount++
        console.log(objList)
        } else {
        alert("Please add at least one correct answer")
        }
    } else {
        alert("Please add at least 2 answers and 1 correct answer")
    }
}


function getInpValue() {
    if(cAInp.value != cAInp.defaultValue) {
        correctAnswers.push(cAInp.value)
        cAInp.value = cAInp.defaultValue
    }
    if(qInp.value !== qInp.defaultValue && aInp.value !== aInp.defaultValue && answers.length <= 2) {
        if(!questionPresent) {
            question = qInp.value
            addQuestionSideTrack(question)
            qInp.setAttribute("disabled", "")
            questionPresent = true
        } 
    answers.push(aInp.value)
    addAnswerSideTrack(aInp.value)
    aInp.value = ""
    } else if(answers.length == 3 && correctAnswers.length != 0) {
        // alert("You have 4 answers already. Make a new Q&A")
        addAnswerSideTrack(aInp.value)
        answers.push(aInp.value)
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
    if(objList.length > 0) {
        //Clear all menu
        hide(formView)
        hide(lobbyView)
        hide(sideContainer)
        let trackList = document.querySelectorAll(".s_t_ol")
        let trackListArr = [...trackList]
        removeTrackList(trackListArr)

        for (let i=0;i<objList.length;i++) {
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
                <p class="answer_count hide">${answerQty}</p>
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
            if(answerArr[i].textContent == "") {
                answerArr[i].remove()
            }

            //Fixing the UI for displaying less than 3 answers
            let answerContainers = document.querySelectorAll(".a_container")
            let answerContainerArr = [...answerContainers]
            for (let i in answerContainerArr) {
                let pAnswerCount = document.querySelectorAll(".answer_count")
                let pAnswerCountArr = [...pAnswerCount]
                if(pAnswerCountArr[i].textContent <= 2) {
                    answerContainerArr[i].classList.add("one_row")
                }
            }
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
    } else {
        alert("Create at least 1 Question and with 2 answers and at least 1 correct answer.")
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

//for the menu option to toggle if use clicks somewhere else
window.addEventListener("click", hideContextMenu)

function hideContextMenu() {
    closeOpenedMenu()
}