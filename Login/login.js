const callElement = id => { return document.querySelector(id) }
// ------------------------------------------------------------
const userEmail = callElement("#login_email")
const userPassword = callElement("#login_password")
const btnLogin = callElement("#btn_login")

const showHeaderUI = callElement("#sign_option")

// ------------------------------------------------------------


const showHeader = () => {
    let str = `
    <a class="span" href="">
                    <span class="material-symbols-outlined" style="font-size: 30px;">
                        shopping_cart
                    </span>
                </a>
                <a id="signin_option" class="span" style="display: "block""
                    href="http://127.0.0.1:5500/Login/login.html">Login</a>
                <a id="signup_option" class="span" style="display: "block""
                    href="http://127.0.0.1:5500/Register/register.html">Register</a>
    `
    showHeaderUI.innerHTML = str
}
showHeader()

const setLocalStorageUserLogin = (data) => {
    localStorage.setItem("user_token", JSON.stringify(data))
}

const login = () => {
    let loginEmail = userEmail.value
    let loginPassword = userPassword.value
    let userLogin = {
        email: loginEmail,
        password: loginPassword
    }

    if (loginEmail && loginPassword) {
        axios({
            method: 'post',
            url: "https://shop.cyberlearn.vn/api/Users/signin",
            data: userLogin
        })
            .then(response => {
                alert(response.data.message)
                setLocalStorageUserLogin(response.data.content.accessToken)
                window.location.href = `http://127.0.0.1:5500/Main/index.html`
            })
            .catch(error => {
                alert("Email hoặc mật khẩu không đúng, vui lòng kiểm tra lại")
            })
    } else {
        alert("Vui lòng không để trống")
    }
}
