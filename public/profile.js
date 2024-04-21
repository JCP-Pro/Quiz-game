const loginSection = document.querySelector(".login_section")
const logoutOption = document.querySelector(".drop_down_container")
const loginLink = document.querySelector(".login_link")
const logoutLink = document.querySelector(".log_out")
const profileImg = document.querySelector(".profile_pic")
const dialogImg = document.querySelector(".change_picture")
const closeWindow = document.querySelector(".close")
const srcInput = document.querySelector(".img_src_input")
const fileInput = document.querySelector(".file_upload")
const changeImgBtn = document.querySelector(".change_img_btn")
const imgSessionStorage = sessionStorage.getItem("img_src")
//example: https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.0S9chyA10h0dXgSxjmBzagHaGW%26pid%3DApi&f=1&ipt=7813397238dc48bc789caa6237753330fc6463954531f5f7bea8665c7ff02612&ipo=images

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

profileImg.addEventListener('click', openDialog)
closeWindow.addEventListener('click', () => {
    dialogImg.close()
})
changeImgBtn.addEventListener("click", changeProfilePic)

if(imgSessionStorage !== null || imgSessionStorage !== "undefined" || imgSessionStorage !== "") {
    //FIXME: Insert into database the following src. Only keep one src data to save space.
    profileImg.src = imgSessionStorage
    console.log(`session storage fetching data: ${imgSessionStorage}`)
}

function openDialog() {
    dialogImg.showModal()
    srcInput.value = ""
    fileInput.value = ""
}

function changeProfilePic() {
    if(srcInput.value !== "") {
        profileImg.src = srcInput.value
        // saveToSessionStorage(profileImg.src)11111
        dialogImg.close()
    } else if (fileInput.value !== "") {
        profileImg.src = fileInput.value
        // saveToSessionStorage(profileImg.src)
        dialogImg.close()
    } else {
        alert("No changes")
        dialogImg.close()
    }
}

function saveToSessionStorage(data) {
    sessionStorage.setItem("img_src", data)
}