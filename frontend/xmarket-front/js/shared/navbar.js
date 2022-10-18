export default function adicionar_funcionalidades(){
    let cartButton = document.getElementById("cart-button");
    cartButton.addEventListener("click", () => {
        window.location.href = "carrinho.html";
    })
}