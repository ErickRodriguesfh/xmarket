import request_API from "../services/service.js"

var quantidadeProdutos = 0;

let botaoCarrinho = document.getElementById("cart-button");
let botaoConfiguracao = document.getElementById("setting-button");
let campoQuantidade = document.getElementById("canva-quantidade-carrinho");

campoQuantidade.addEventListener("click", ()=>{
    window.location.href = "carrinho.html";
})

botaoCarrinho.addEventListener("click", () => {
    window.location.href = "carrinho.html";
})

botaoConfiguracao.addEventListener("click", function(){
    const modalConfiguracao = document.getElementById("area-configuracoes");
    if(modalConfiguracao.style.display == "" || modalConfiguracao.style.display == "none"){
        modalConfiguracao.style.display = "flex";
    }else{
        modalConfiguracao.style.display = "none";
    }
})

const canvaQuantidadeCarrinho = document.getElementById("canva-quantidade-carrinho");
const quantidadeCarrinho = document.getElementById("quantidade-carrinho");

console.log("TESTESTE")

let alterarQuantidade = async ()=>{
    const response = await request_API("GET", `http://localhost:8080/carrinho/exibirCarrinho/${1}`);
    let dados = await response.json();
    dados.forEach(element => {
        quantidadeProdutos = quantidadeProdutos + element.quantidade;
        console.log(quantidadeProdutos)
    })
    localStorage.setItem("quantidade-carrinho", quantidadeProdutos);

    if(localStorage.getItem("quantidade-carrinho") != 0 && localStorage.getItem("quantidade-carrinho") != undefined){
        canvaQuantidadeCarrinho.style.display = "flex";
        quantidadeCarrinho.innerHTML = localStorage.getItem("quantidade-carrinho");
    }else if(localStorage.getItem("quantidade-carrinho") == 0){
        canvaQuantidadeCarrinho.style.display = "none";
    }
    
}
alterarQuantidade();