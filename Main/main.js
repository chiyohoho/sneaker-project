const callElement = id => { return document.querySelector(id) }
// ------------------------------------------------------------
const productList = callElement("#rp_product_list")
const signOption = callElement("#sign_option")
let token = localStorage.getItem("user_token")


const showProductList = () => {
    axios({
        method: 'get',
        url: 'https://shop.cyberlearn.vn/api/Product',
    })
        .then((response) => {
            let data = response.data.content
            let str = ``
            data.map(item => {
                str += `
                <li class="rp_product_item" style="background: #gray">
                    <div class="item_img" style="margin-bottom: 10px">
                        <img src="${item.image}"
                            alt="">
                    </div>
                    <div class="item_info" style="margin-bottom: 10px;">
                        <h2 style="margin-bottom: 10px;">${item.name}</h2>
                        <h4>${item.shortDescription}</h4>
                    </div>
                    <div class="item_price">
                        <h2 onclick="redirectDetail(${item.id})" class="price_left">Buy Now</h2>
                        <h2 class="price_right">${item.price}$</h2>
                    </div>
                </li>
                `
            })
            productList.innerHTML = str
        })
}
showProductList()

const showSignOption = () => {
    let str = `
    <a class="span" href="">
                    <span class="material-symbols-outlined" style="font-size: 30px;">
                        shopping_cart
                    </span>
                </a>
                <a id="signin_option" style="display: ${token ? " block" : "none"}" class="span">Hello Wibu!</a>
                <a id="signin_option" class="span" style="display: ${token ? " none" : "block"}"
                    href="http://127.0.0.1:5500/Login/login.html">Login</a>
                <a id="signup_option" class="span" style="display: ${token ? " none" : "block"}"
                    href="http://127.0.0.1:5500/Register/register.html">Register</a>
                <a id="signout_option" style="display: ${token ? " block" : "none"}" class="span"
                    onclick="logout()">Signout</a>
    `
    signOption.innerHTML = str
}
showSignOption()

const logout = () => {
    if (token) {
        localStorage.removeItem("user_token")
        alert("Bạn đã đăng xuất thành công")
        window.location.href = "http://127.0.0.1:5500/Main/index.html"
    }
}

const redirectDetail = (id) => {
    localStorage.setItem("item_id", JSON.stringify(id))
    window.location.href = `http://127.0.0.1:5500/Detail/detail.html`
}
