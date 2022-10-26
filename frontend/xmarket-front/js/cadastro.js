import mensagemValidacao from "./services/mensagemValidacao.js";
import request_API from "./services/service.js";
import Cliente from "./Cliente.js"

const btnProceguir = document.getElementById("botao-cadastrar-cliente");
const btnVoltar = document.getElementById("botao-retornar");


const newCadastro =  async () =>{
    const nome = document.getElementById("cadastrar-cliente-nome");
    const cpf = document.getElementById("cadastrar-cliente-cpf");
    const rg = document.getElementById("cadastrar-cliente-rg");
    const rua = document.getElementById("cadastrar-cliente-endereco-rua");
    const numero = document.getElementById("cadastrar-cliente-endereco-numero");
    const bairro = document.getElementById("cadastrar-cliente-endereco-bairro");
    const municipio = document.getElementById("cadastrar-cliente-endereco-municipio");
    const estado = document.getElementById("cadastrar-cliente-endereco-estado");
    const email = document.getElementById("cadastrar-cliente-email");
    const telefone = document.getElementById("cadastrar-cliente-telefone");
    let senha = document.getElementById("cadastrar-cliente-senha");
    let confirmarSenha = document.getElementById("cadastrar-cliente-confirmarSenha");

    if(senha.value == confirmarSenha.value){
        const endPoint = "http://localhost:8080/cadastrar"
        const dados = {
            "nome" : nome.value,
            "email": email.value,
            "cpf": cpf.value,
            "rg": rg.value,
            "senha": senha.value,
            "telefone": telefone.value,
            "endereco": `${rua.value}, ${numero.value}, ${bairro.value}, ${municipio.value}, ${estado.value}`,
        }
        console.log(dados)
        const response = await request_API("POST", endPoint, dados);
        console.log(response)
        if(response.ok == true){
            window.location.href = "login.html";
        }
        if(response.status == 422){
            document.body.appendChild(mensagemValidacao("Usuario ja cadastrado no sistema!", "Por favor digite outras credenciais", true)) ;
        }


        confirmarSenha.classList.remove("erro")
    }else{
        confirmarSenha.classList.add("class", "erro")
        confirmarSenha.focus();
        document.body.appendChild(mensagemValidacao("Senhas imcopativeis", "Por favor digite senhas iguais", true)) ;
        //alert("senhas nao compativeis")
    }
}

btnProceguir.addEventListener('click', newCadastro)
btnVoltar.addEventListener("click", function(){
    window.location.href = "login.html"
})