const guest = document.querySelector(".guest")
// const dropDown = document.querySelector(".drop_down_container") 
if (guest.textContent !== "undefined" || guest.textContent !== "") {
    loginSection.addEventListener("mouseenter", () => {
        displayDropdown()
    })
    loginSection.addEventListener("mouseleave", () => {
        displayDropdown()

    })
} 

function displayDropdown() {
    logoutOption.classList.toggle("hide")
    loginLink.classList.toggle("white_text")
    guest.classList.toggle("white_text")
}

if (you == "Log in") {
    createLobby(guest.textContent)
}