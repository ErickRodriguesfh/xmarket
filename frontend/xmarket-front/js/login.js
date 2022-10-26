import request_API from "./services/service.js"

let idUsuario;
async function getCredentials() {
    let endPoint = "http://localhost:8080/login";

    let usuario = {
        "email": document.getElementById("email").value,
        "senha": document.getElementById("senha").value
    }

    let response = await request_API("POST", endPoint, usuario)

    if (response.status == 200 || response.status == 201) {
        const cliente = await response.json();
        const redirecionamento = localStorage.redirecionamento;
        idUsuario = cliente.id;

        localStorage.setItem("logado", true);
        localStorage.setItem("cliente", JSON.stringify(cliente));


        await adicionar_no_carrinho(cliente.id);
        window.location.href = redirecionar(redirecionamento);
        //window.location.href="home-page.html";
        //window.open("home-page.html")
    }
}

function redirecionar(pagina) {
    switch (pagina) {
        case "finalizar-compra.html":
            return pagina;
        default:
            if(localStorage.ultimaPagina){
                return localStorage.ultimaPagina
            }
            return "home-page.html";
    }
}



async function adicionar_no_carrinho(idUsuario) {
    if (localStorage.carrinho) {
        let carrinhoLocal = JSON.parse(localStorage.carrinho);
    
        for (let id in carrinhoLocal) {
            const item = carrinhoLocal[id]
            const produto = item.produto;
            const quantidade = item.quantidade;

            const endPoint = `http://localhost:8080/carrinho/adicionar/${produto.id}/${idUsuario}/${quantidade}`;
            let response = await request_API("POST", endPoint);
        }

        localStorage.removeItem("carrinho");

    } else {

    }

}
//localStorage.setItem("logado", false);
let login = document.getElementById("login");
let cadastrar = document.getElementById("cadastrar");


login.addEventListener('click', getCredentials);


cadastrar.addEventListener('click', function(){
    alert("cadastro")
    window.location.href = "cadastro.html";
})