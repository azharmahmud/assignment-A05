document.getElementById("btn_sign_in").addEventListener('click',() => {

    const userName = document.getElementById("userInput");
    const userNameValue = userName.value;
    const passWord = document.getElementById("password");
    const passWordValue = passWord.value;
    
    if(userNameValue == "admin" && passWordValue == "admin123"){
        alert("sign in succed")

        return window.location.assign("home.html")
    }else{
        alert("sign in failed")
        return;
    }
});

