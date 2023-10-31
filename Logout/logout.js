const logout = () => {
    let userToken = localStorage.getItem("user_token")
    if (userToken) {
        console.log("check userToken : ", userToken)
        localStorage.removeItem("user_item")
        alert("Bạn đã đăng xuất thành công")
        window.location.href = "http://127.0.0.1:5500/Main/index.html"
    }
}
