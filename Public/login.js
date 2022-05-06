
const form = document.querySelector('form')
const baseURL = `http://localhost:4004`

const accountsCallback = ({ data: accounts}) => checkAccounts(accounts)
const errCallback = err => console.log(err.response.data)
const getAllAccounts = () => axios.get(baseURL).then(accountsCallback).catch(errCallback)
const createAccount = body => axios.post(baseURL, body).then(accountsCallback).catch(errCallback)


function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const loginButton = document.querySelector("#myButton")
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    // console.log(accountsCallback)
        loginButton.addEventListener("click", e => {
        
        // setFormMessage(loginForm, "error", "Invalid username/password combination");
        getAllAccounts()
        
    });

    createAccountForm.addEventListener("submit", e => {
        let emailaddress = document.querySelector('#emailaddress')
        let username = document.querySelector('#username')
        let password = document.querySelector('#password')

        let bodyObj = {
            emailaddress: emailaddress.value,
            username: username.value,
            password: password.value,
        }
        
        createAccount(bodyObj)
        
        emailaddress.value = ''
        username.value = ''
        password.value = ''
        setFormMessage(loginForm, "error", "Invalid username/password combination");
    });

    

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Username must be at least 10 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});

function checkAccounts(arr) {
    const loginForm = document.querySelector("#login")
    let usernameBox = document.querySelector('#loginUsername')
    let passwordBox = document.querySelector('#loginPassword')
    let arrLength = arr.length
    console.log(arr[0])
    console.log(arrLength)
    console.log(usernameBox.value)
    for (let i = 0; i < arrLength; i++){
        if (arr[i].username == usernameBox.value && arr[i].password == passwordBox.value) {
           document.location.href = './Home.html' 
           return
        }
    }
    setFormMessage(loginForm, "error", "Invalid username/password combination");   
}



