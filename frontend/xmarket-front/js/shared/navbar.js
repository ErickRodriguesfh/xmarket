import request_API from "../services/request_API.js"

let botaoCarrinho = document.getElementById("cart-button");
let botaoConfiguracao = document.getElementById("setting-button");
let campoQuantidade = document.getElementById("canva-quantidade-carrinho");
let botaoDeslogar = document.getElementById("deslogar");
let botaoLogar = document.getElementById("botao-logar");

let logado = localStorage.logado;
let quantidadeProdutos = 0;
let idUsuario;

if (localStorage.cliente) idUsuario = JSON.parse(localStorage.cliente).id;

/*
if (logado == "true") {
    botaoConfiguracao.style.display = "flex";
    botaoLogar.style.display = "none";

} else if (logado == "false" || logado == undefined) {
    botaoConfiguracao.style.display = "none";
    botaoLogar.style.display = "flex";

}
*/

botaoLogar.addEventListener("click", function () {
    localStorage.redirecionamento = localStorage.ultimaPagina
    window.location.href = "login.html"
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



campoQuantidade.addEventListener("click", () => {
    window.location.href = "carrinho.html";
})

botaoCarrinho.addEventListener("click", () => {
    window.location.href = "carrinho.html";
})


alterarQuantidade();
async function alterarQuantidade() {
    let canvaQuantidadeCarrinho = document.getElementById("canva-quantidade-carrinho");
    let quantidadeCarrinho = document.getElementById("quantidade-carrinho");

    let response;
    let dados;

    if (logado == "true") {
        botaoConfiguracao.style.display = "flex";
        botaoLogar.style.display = "none";


        response = await request_API("GET", `https://localhost/carrinho/${idUsuario}`);

        if (response.status == 200)
            dados = await response.json();

    }

    if (logado == "false") {
        botaoConfiguracao.style.display = "none";
        botaoLogar.style.display = "flex";


        if (localStorage.carrinho)
            dados = JSON.parse(carrinhoLocal);

    }

    for (let element in dados) {
        quantidadeProdutos = quantidadeProdutos + dados[element].quantidade;
    }

    localStorage.setItem("quantidade-carrinho", quantidadeProdutos);

    

    if (localStorage.getItem("quantidade-carrinho") != 0 && localStorage.getItem("quantidade-carrinho") != undefined) {
        canvaQuantidadeCarrinho.style.display = "flex";
        quantidadeCarrinho.innerHTML = localStorage.getItem("quantidade-carrinho");
    } else if (localStorage.getItem("quantidade-carrinho") == 0) {
        canvaQuantidadeCarrinho.style.display = "none";
    }
}
