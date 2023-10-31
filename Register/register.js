const callElement = id => { return document.querySelector(id) }
// ------------------------------------------------------------
const userName = callElement("#register_name")
const userEmail = callElement("#register_email")
const userPhone = callElement("#register_phone")
const userPassword = callElement("#register_password")
const userRePassword = callElement("#register_re_password")
const userCheckBox = callElement("#register_checkbox")

const btnLogin = callElement("#btn_register")
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

const register = () => {
    let regName = userName.value
    let regEmail = userEmail.value
    let regPhone = userPhone.value
    let regPassword = userPassword.value
    let regRePassword = userRePassword.value
    let regCheckBox = userCheckBox.checked

    if (regName && regEmail && regPhone && regPassword && regRePassword && regCheckBox) {
        if (regPassword === regRePassword) {
            let registerUser = {
                email: regEmail,
                password: regPassword,
                name: regName,
                gender: true,
                phone: regPhone
            }
            axios({
                method: 'post',
                url: "https://shop.cyberlearn.vn/api/Users/signup",
                data: registerUser
            })
                .then(response => {
                    console.log("check response :", response)
                    alert(response.data.message)
                    window.location.href = `http://127.0.0.1:5500/Login/login.html`
                })
                .catch(error => {
                    alert(error.response.data.message)
                })
        } else {
            alert("Mật khẩu không chính xác, vui lòng kiểm tra lại")
        }
    } else {
        alert("Vui lòng kiểm tra lại các thông tin")
    }

}
