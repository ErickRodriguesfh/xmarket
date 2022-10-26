import request_API from "../services/service.js"

var quantidadeProdutos = 0;
let botaoCarrinho = document.getElementById("cart-button");
let botaoConfiguracao = document.getElementById("setting-button");
let campoQuantidade = document.getElementById("canva-quantidade-carrinho");
let botaoDeslogar = document.getElementById("deslogar");
let botaoLogar = document.getElementById("botao-logar");
let logado = localStorage.logado;
let cliente = localStorage.cliente;
let idUsuario;

if(localStorage.cliente) idUsuario = JSON.parse(localStorage.cliente).id;


console.log("nav cliente. " + idUsuario)



if (logado == "true") {
    botaoConfiguracao.style.display = "flex";
    botaoLogar.style.display = "none";
} else if (logado == "false" || logado == undefined) {
    botaoConfiguracao.style.display = "none";
    botaoLogar.style.display = "flex";
}

botaoLogar.addEventListener("click", function () {
    localStorage.redirecionamento = localStorage.ultimaPagina
    window.location.href = "login.html"
})


campoQuantidade.addEventListener("click", () => {
    window.location.href = "carrinho.html";
})

botaoCarrinho.addEventListener("click", () => {
    window.location.href = "carrinho.html";
})

botaoDeslogar.addEventListener("click", () => {
    alert("deslogando")
    localStorage.setItem("logado", false);
    window.location.href = "home-page.html";

    localStorage.removeItem("cliente")
})

botaoConfiguracao.addEventListener("click", function () {
    const modalConfiguracao = document.getElementById("area-configuracoes");
    if (modalConfiguracao.style.display == "" || modalConfiguracao.style.display == "none") {
        modalConfiguracao.style.display = "flex";
    } else {
        modalConfiguracao.style.display = "none";
    }
})

const canvaQuantidadeCarrinho = document.getElementById("canva-quantidade-carrinho");
const quantidadeCarrinho = document.getElementById("quantidade-carrinho");

async function alterarQuantidade() {

    let response;
    let dados;


    if (logado == "true") {
        response = await request_API("GET", `http://localhost:8080/carrinho/exibirCarrinho/${idUsuario}`);
        if (response.ok != true) return;
        dados = await response.json();

    } if (logado == "false") {
        const carrinhoLocal = localStorage.carrinho;
        if (carrinhoLocal)
            dados = JSON.parse(carrinhoLocal);
    }

    for(let element in dados){
        quantidadeProdutos = quantidadeProdutos + dados[element].quantidade;
        console.log(quantidadeProdutos)
    }

    localStorage.setItem("quantidade-carrinho", quantidadeProdutos);

    if (localStorage.getItem("quantidade-carrinho") != 0 && localStorage.getItem("quantidade-carrinho") != undefined) {
        canvaQuantidadeCarrinho.style.display = "flex";
        quantidadeCarrinho.innerHTML = localStorage.getItem("quantidade-carrinho");
    } else if (localStorage.getItem("quantidade-carrinho") == 0) {
        canvaQuantidadeCarrinho.style.display = "none";
    }
}
alterarQuantidade();