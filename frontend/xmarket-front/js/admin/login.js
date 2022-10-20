//localStorage.clear()

//localStorage.setItem("logado", "true")

const email = document.getElementById("inputEmail");
const senha = document.getElementById("inputPassword");

const baotaoEntrar = document.getElementById("submit");

baotaoEntrar.addEventListener("click", function(){
    const dadosLogin = {
        email: "sleepado",
        senha: "123456"
    }
    console.log( email.value)
    if(dadosLogin.email == email.value){
        if(dadosLogin.senha == senha.value){
            localStorage.setItem("logado", "true")
            window.location.href="home-page.html";
        }else{
            alert("Senha invalida!!")
        }
    }else{
        alert("Login não encontrado!!")
    }
})