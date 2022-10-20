//import login_service from './login_service.js'

//let dados = await login_service();


let endPoint = "http://localhost:8080/cadastrar";

let btnProceguir = document.getElementById("submit");

const newCadastro =  async () =>{

    let field_nome = document.getElementById("inputNome");
    let field_email = document.getElementById("inputEmail");
    let field_cpf = document.getElementById("inputCpf");
    let field_rg = document.getElementById("inputRg");
    let field_senha = document.getElementById("inputPassword");
    let field_telefone = document.getElementById("inputTelefone");
    let field_endereco = document.getElementById("inputEndereco");

    console.log(field_nome.value)
    console.log(field_email.value)
    console.log(field_cpf.value)
    console.log(field_rg.value)
    console.log(field_senha.value)
    console.log(field_telefone.value)

    let usuario = {
        "nome" : field_nome.value,
        "email": field_email.value,
        "cpf": field_cpf.value,
        "rg": field_rg.value,
        "senha": field_senha.value,
        "telefone": field_telefone.value,
        "endereco": field_endereco.value
    }

    let usuario2 = {
        "nome": "lucas",
        "senha": "12345678",
        "email": "lucas@gmail.com",
        "cpf": "84768427405",
        "rg": "355683192",
        "telefone": "31998544856",
        "endereco": "rua teste 123"
    }
    console.log(usuario)
    let init = {
        method: "POST",
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },

        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(usuario)
    }

    let response = await fetch(endPoint, init);
    
    if(response.status == 200 || response.status == 201){
        alert("Usuario cadastrado com sucesso");
        window.location.href = "login.html";
    }

}

btnProceguir.addEventListener('click', newCadastro)
