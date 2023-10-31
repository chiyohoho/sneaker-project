const callElement = id => { return document.querySelector(id) }
// ------------------------------------------------------------
const productList = callElement("#rp_product_list")
const signOption = callElement("#sign_option")
const showProductDetail = callElement("#product_detail")
let token = localStorage.getItem("user_token")
// ------------------------------------------------------------

const showHeader = () => {
    let str = `
    <a class="span" href="">
                    <span class="material-symbols-outlined" style="font-size: 30px;">
                        shopping_cart
                    </span>
                </a>
                <a id="signin_option" style="display: ${token ? " block" : "none"}" class="span">Hello Wibu!</a>
                <a id="signin_option" class="span" style="display: ${token ? " none" : "block"}"
                    href="http://127.0.0.1:5501/sign-option/signin.html">Signin</a>
                <a id="signup_option" class="span" style="display: ${token ? " none" : "block"}"
                    href="http://127.0.0.1:5501/sign-option/signup.html">Signup</a>
                <a id="signout_option" style="display: ${token ? " block" : "none"}" class="span"
                    onclick="signOut()">Signout</a>
    `
    signOption.innerHTML = str
}
showHeader()
// ------------------------------------------------------------
const getLocalStorage = () => {
    if (localStorage.getItem("item_id")) {
        const id = JSON.parse(localStorage.getItem("item_id"))

        axios({
            method: 'get',
            url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`,
        })
            .then(response => {
                let data = response.data.content
                productDetail(data)
            })
    }
}
getLocalStorage()
// ------------------------------------------------------------

const productDetail = (data) => {
    let str = `
    <div class="main_product_left">
                <img src="${data.image}"
                    alt="">
            </div>

            <div class="main_product_right">
                <div class="product_info">
                    <h1>${data.name}</h1>
                    <span>${data.description}</span>
                </div>

                <div class="product_size">
                    <h1>Available Sizes</h1>
                    <ul id="product_sizes" class="size_ul" style="list-style: none;">
                        <li style="border: 1px solid black; background: wheat;">38</li>
                    </ul>
                </div>

                <div class="product_cart">
                    <h1 style="color: red; font-size: 30px; margin-bottom: 10px;">US $${data.price}</h1>
                    <div class="product_cart_quantity">
                        <span class="material-symbols-outlined cart_border">remove</span>
                        <span class="cart_quantity">1</span>
                        <span class="material-symbols-outlined cart_border">add</span>
                    </div>
                    <span class="cart_btn">Add to cart</span>
                </div>
            </div>
    `
    showProductDetail.innerHTML = str

    const showProductSize = callElement("#product_sizes")
    let strSize = ``
    let dataSize = data.size
    dataSize.map(item => {
        strSize += `<li style="border: 1px solid black; background: wheat;">${item}</li>`
    })
    showProductSize.innerHTML = strSize
}
// ------------------------------------------------------------
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

