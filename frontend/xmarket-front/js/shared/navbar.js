let botaoCarrinho = document.getElementById("cart-button");
let botaoConfiguracao = document.getElementById("setting-button");

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