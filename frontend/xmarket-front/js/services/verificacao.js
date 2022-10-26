var isValidate = localStorage.getItem("logado");
console.log("Puxando")
if(isValidate == "false"){
    window.location.href="login.html";
   // alert("teste")
}

setTimeout(sair, 86400000)//86400

function sair(){
    localStorage.setItem("logado", "false")
    window.location.href="login.html";
}
