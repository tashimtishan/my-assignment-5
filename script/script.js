document.getElementById("button-id").addEventListener("click",function(){
    const username=document.getElementById("name-input").value;
    const password=document.getElementById("password-input").value;

    if(username==="admin" && password==="admin123"){
        alert("login successful")
        window.location.assign("/my-assignment-5/home.html");
    }else{
        alert("invalid information");
        return
    }
})