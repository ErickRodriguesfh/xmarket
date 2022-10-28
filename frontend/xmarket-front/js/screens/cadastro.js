import mensagemValidacao from "../services/mensagemValidacao.js";
import request_API from "../services/request_API.js";
import cep_API from "../services/cep_API.js";

// Objeto para controlar o DOM dos input
const dadosCadastrais = {
    nome: document.getElementById("cadastrar-cliente-nome"),
    cpf: document.getElementById("cadastrar-cliente-cpf"),
    rg: document.getElementById("cadastrar-cliente-rg"),
    cep: document.getElementById("cadastrar-cliente-endereco-cep"),
    rua: document.getElementById("cadastrar-cliente-endereco-rua"),
    numero: document.getElementById("cadastrar-cliente-endereco-numero"),
    bairro: document.getElementById("cadastrar-cliente-endereco-bairro"),
    municipio: document.getElementById("cadastrar-cliente-endereco-municipio"),
    estado: document.getElementById("cadastrar-cliente-endereco-estado"),
    email: document.getElementById("cadastrar-cliente-email"),
    telefone: document.getElementById("cadastrar-cliente-telefone"),
    senha: document.getElementById("cadastrar-cliente-senha"),
    confirmarSenha: document.getElementById("cadastrar-cliente-confirmarSenha"),

    cadastrar() {
        return {
            nome: this.nome.value,
            email: this.email.value,
            cpf: this.cpf.value.replace(".", "").replace(".", "").replace("-", ""),
            rg: this.rg.value,
            senha: this.senha.value,
            telefone: this.telefone.value.replace("(", "").replace(")", "").replace("-", ""),
            endereco: `${this.rua.value}, ${this.numero.value}, ${this.bairro.value}, ${this.municipio.value}, ${this.estado.value}`,
        }
    }
}

// Area de funcionalidade dos botoes

const botaoPesquisarCep = document.getElementById("botao-pesquisar-cep");
const botaoProsseguir = document.getElementById("botao-cadastrar-cliente");
const botaoVoltar = document.getElementById("botao-retornar");

const botaoVoltarConfirmacaoEmail = document.getElementById("botao-voltar");
const enviarCodigo = document.getElementById("botao-conferir-confirmacao");
const botaoReenviar = document.getElementById("botao-reenviar");


var codigoCorreto;

botaoPesquisarCep.addEventListener("click", async function () {
    const cep = dadosCadastrais.cep.value.replace(".", "").replace("-", "");
    const enderecoCEP = await cep_API(cep);


    if (enderecoCEP == null) {
        mensagemValidacao("Cep inválido ou inpacaz de encontrar endereço", "Por favor digite novamente!.", "erro", true);
        return;
    }

    dadosCadastrais.rua.value = enderecoCEP.logradouro;
    dadosCadastrais.municipio.value = enderecoCEP.localidade;
    dadosCadastrais.estado.value = enderecoCEP.uf;
})

function telaCadastro(opcao) {
    let confirmacaoEmail = document.getElementById("confirmacao-email");
    let cadastro = document.getElementById("form-cadastro");

    if (opcao == "cadastro") {
        cadastro.style.display = "block";
        confirmacaoEmail.style.display = "none";

        document.body.style.height = "100%";
    }
    if (opcao == "confirmacao-email") {
        cadastro.style.display = "none";
        confirmacaoEmail.style.display = "inline";

        document.body.style.height = "100vh";
    }
}
function controladorCampos() {
    let todosCampos = document.querySelectorAll(".otp");

    for (var i = 0; i < 5; i++) {
        todosCampos[i].addEventListener("keyup", function (evt) {
            for (var i = 0; i < 5; i++) {
                if (todosCampos[i].value == "") {
                    todosCampos[i].focus();
                    break;
                }
            }
        })
    }
}
controladorCampos();

enviarCodigo.addEventListener("click", function () {
    let codigoDigitado = "";
    let todosCampos = document.querySelectorAll(".otp");
    for (var i = 0; i < 5; i++) {
        if (todosCampos[i].value != "") {
            codigoDigitado = codigoDigitado + todosCampos[i].value;
        } else {
            return null;
        }
    }

    if (codigoDigitado != codigoCorreto) {
        mensagemValidacao("Codigo incorreto!", "Por favor digite novamente!", "erro", true);
        limparOTP();
        return
    }

    mensagemValidacao("Email Confirmado!", "Desejo uma otima experiência!", "sucesso", true);
    limparOTP();
    cadastrarCliente();

})

function limparOTP() {
    let todosCampos = document.querySelectorAll(".otp");
    for (var i = 0; i < 5; i++) {
        console.log(todosCampos[i].value)
        todosCampos[i].value = "";
    }
}

async function cadastrarCliente() {
    let endPoint = "http://localhost:8080/cliente";
    let cliente = dadosCadastrais.cadastrar();
    let response = await request_API("POST", endPoint, cliente);

    console.log(cliente)
    console.log(response)

    if (response.status == 201) {
        const confirmar = document.getElementById("confirmar-operacao");
        confirmar.addEventListener("click", function () {
            window.location.href = "login.html";
        })
    }

    // Verificar se os dados que foram mandados estao de acordo!! 
    // 

    if (response.status == 422) {
        mensagemValidacao("Usuario ja cadastrado no sistema!", "Por favor digite outras credenciais", "erro", true);
    }

    if (response.status == 500) {
        mensagemValidacao("Estamos com instabilidade no sistema!", "Por favor tente novamente mais tarde.", "erro", true);
    }
}

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

botaoProsseguir.addEventListener('click', async function () {
    let endPoint;
    let cliente;
    let response;

    if (dadosCadastrais.senha.value != dadosCadastrais.confirmarSenha.value) {
        dadosCadastrais.confirmarSenha.classList.add("class", "erro");
        dadosCadastrais.confirmarSenha.focus();

        mensagemValidacao("Senhas não coincidem!", "Por favor digite novamente.", "erro", true)

        return;
    }


    telaCadastro("confirmacao-email");

    await mandarCodigoEmail();

    // setTimeout(async function () {
    //     await sleep(1000)
    //     contador.innerHTML = Number(contador.innerHTML) - 1;
    // }, 30000)

    // for(var i = 0; i < timer;){
    //     contador.innerHTML = Number(contador.innerHTML) - 1;
    //     setTimeout(function(){
    //         i++;
    //     }, 1000)
    // }



    //Removendo classse se houver.
    dadosCadastrais.confirmarSenha.classList.remove("erro");


    //
    await tempoParaExpirarCodigo(30);

});

async function mandarCodigoEmail() {
    let endPoint = `http://localhost:8080/cliente/confirmacao-email/${dadosCadastrais.email.value}`;
    let response = await request_API("POST", endPoint);

    codigoCorreto = await response.text();
    for (var i = 0; i < codigoCorreto.length; i++) {
        codigoCorreto = codigoCorreto.replace(" ", "");
    }
}

async function tempoParaExpirarCodigo(tempo) {
    //Controlador do timer
    let timer = tempo;

    let contador = document.getElementById("contador");
    contador.innerHTML = timer;

    for (var i = 0; i < timer; i++) {
        

        contador.innerHTML = Number(contador.innerHTML) - 1;
        await sleep(1000);
    }

    console.log(contador.innerHTML == 0)
    if (contador.innerHTML == 0) {
        botaoReenviar.classList.remove("disable");
        codigoCorreto = "";
        botaoReenviar.addEventListener("click", controleContador);

    }
}
async function controleContador() {

    await mandarCodigoEmail();

    botaoReenviar.classList.add("disable");
    tempoParaExpirarCodigo(30);

    
    botaoReenviar.removeEventListener("click", controleContador);
}

botaoVoltarConfirmacaoEmail.addEventListener("click", function () {
    telaCadastro("cadastro");
})

botaoVoltar.addEventListener("click", function () {
    window.location.href = "login.html"
})


//Funções para adicionar mascara nos inputs

dadosCadastrais.cpf.addEventListener('keyup', function (event) { //pega o evento de precionar uma tecla

    if (event.keyCode != 46 && event.keyCode != 8) {//verifica se a tecla precionada nao e um backspace e delete
        var posicao = dadosCadastrais.cpf.value.length; //aqui pega o tamanho do input

        switch (posicao) {
            case 3:
            case 7:
                dadosCadastrais.cpf.value = dadosCadastrais.cpf.value + ".";
                break;
            case 11:
                dadosCadastrais.cpf.value = dadosCadastrais.cpf.value + "-";
        }
    }
});

dadosCadastrais.telefone.addEventListener('keydown', function (event) { //pega o evento de precionar uma tecla

    if (event.keyCode != 46 && event.keyCode != 8) {//verifica se a tecla precionada nao e um backspace e delete
        var posicao = dadosCadastrais.telefone.value.length; //aqui pega o tamanho do input

        switch (posicao) {
            case 0:
                dadosCadastrais.telefone.value = "(";
                break;
            case 3:
                dadosCadastrais.telefone.value = dadosCadastrais.telefone.value + ")";
                break;
            case 9:
                dadosCadastrais.telefone.value = dadosCadastrais.telefone.value + "-";

        }
    }
});

dadosCadastrais.cep.addEventListener('keydown', function (event) { //pega o evento de precionar uma tecla

    if (event.keyCode != 46 && event.keyCode != 8) {//verifica se a tecla precionada nao e um backspace e delete
        var posicao = dadosCadastrais.cep.value.length; //aqui pega o tamanho do input

        switch (posicao) {
            case 2:
                dadosCadastrais.cep.value = dadosCadastrais.cep.value + ".";
                break;
            case 6:
                dadosCadastrais.cep.value = dadosCadastrais.cep.value + "-";
                break;
        }
    }
});