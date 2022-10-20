import reques_API from "./services/service.js"

async function getCredentials(){
    let endPoint = "http://localhost:8080/login";

    let usuario = {
        "email": document.getElementById("inputEmail").value,
        "senha": document.getElementById("inputPassword").value
    }

    let response = await reques_API("POST", endPoint, usuario)

    console.log(response);
    
    if(response.status == 200 || response.status == 201){
        localStorage.setItem("logado", true);
        window.location.href="home-page.html";
        //window.open("home-page.html")
    }
}
localStorage.setItem("logado", false);
let btnEvent = document.getElementById("submit");


btnEvent.addEventListener('click', getCredentials);