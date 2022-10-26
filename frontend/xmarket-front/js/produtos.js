import request_API from "./services/service.js";
import Produto from "./Produto.js";
import mensagemValidacao from "./services/mensagemValidacao.js"


localStorage.ultimaPagina = "produtos.html";

let idUsuario;

if(localStorage.cliente) idUsuario = JSON.parse(localStorage.cliente).id;

console.log("id" + idUsuario)
popular_produtos(); //cart-button

const logado = localStorage.logado;

const quantidadeCarrinho = document.getElementById("quantidade-carrinho");
const canvaQuantidadeCarrinho = document.getElementById("canva-quantidade-carrinho");
//adicionar_funcionalidades();


function imageItem(path) {
    let image_item = document.createElement("div");
    let image = document.createElement("img");

    image.src = path;
    image_item.appendChild(image);
    image_item.setAttribute("class", "image-item");

    return image_item;
}
function titleItem(nomeProduto) {
    let title_item = document.createElement("div");
    let title_item_h2 = document.createElement("h4");
    let conteudo = document.createTextNode(nomeProduto);

    title_item_h2.appendChild(conteudo);
    title_item.appendChild(title_item_h2);
    title_item.setAttribute("class", "title-item");

    return title_item
}
function descriptionItem(price) {
    let description_item = document.createElement("div");
    let description_item_price = document.createElement("h3");
    let conteudo = document.createTextNode("R$" + price);

    description_item_price.appendChild(conteudo);
    description_item.appendChild(description_item_price);
    description_item.setAttribute("class", "description-item");

    return description_item;
}
function buttonItem(id) {
    let button_item = document.createElement("div");
    let button_item_title = document.createElement("h3");
    let conteudo = document.createTextNode("Adicionar");

    button_item_title.appendChild(conteudo);
    button_item.appendChild(button_item_title);
    button_item.setAttribute("class", "button-item");

    button_item.setAttribute("id", `submit-${id}`);

    return button_item;
}
function product_element(produto, id) {
    let card_item = cardItem();
    let image_item = imageItem(path);
    let title_item = titleItem(`${produto.nome} - ${produto.marca} `);
    let description_item = descriptionItem(produto.preco);
    let button_item = buttonItem(id);

    card_item.appendChild(image_item);
    card_item.appendChild(title_item);
    card_item.appendChild(description_item);
    card_item.appendChild(button_item);

    document.getElementById("product-container").appendChild(card_item);
}

async function popular_produtos() {
    let dados;
    let endPoint = "http://localhost:8080/produtos";

    let areaProdutos = document.getElementById("product-container");
    areaProdutos.innerHTML = "";

    let response = await request_API("GET", endPoint);
    console.log(response)
    dados = await response.json()

    console.log(dados)

    dados.forEach((element) => {
        if (element.quantidade > 0) {

            let produto = new Produto(element);
            let id = produto.id;

            produto.criarCardProduto(id);

            //product_element(produto, id)

            let btnEvent = document.getElementById(`submit-${id}`);
            btnEvent.addEventListener('click', () => {
                if (logado == "true") {
                    console.log("logado " + idUsuario)
                    adicionar_produto_carrinho(element["id"], idUsuario, 1)

                } else if (logado == "false" || logado == "" || logado == undefined) {
                    let carrinhoLocal = localStorage.getItem("carrinho");


                    if (carrinhoLocal == undefined || carrinhoLocal == "") {
                        let carrinho = {};
                        carrinho[`${id}`] = {
                            "produto": produto.salvarCarrinho(),
                            "quantidade": 1
                        };
                        console.log("Criando carrinho")
                        localStorage.setItem("carrinho", JSON.stringify(carrinho))
                        canvaQuantidadeCarrinho.style.display = "flex";
                        quantidadeCarrinho.innerHTML = Number(quantidadeCarrinho.innerHTML) + 1;
     
                        mensagemValidacao("Produto adicionado no carrinho", "Confira no seu carrinho.", "sucesso", false)

                    } else {

                        if (carrinhoLocal != "") {
                            var carrinho = JSON.parse(carrinhoLocal);                            
                     
                            if (carrinho[`${id}`]) {                                
                                carrinho[`${id}`] = {
                                    "produto": produto.salvarCarrinho(),
                                    "quantidade": carrinho[`${id}`].quantidade + 1
                                };
                                
                            }else{
                                carrinho[`${id}`] = {
                                    "produto": produto.salvarCarrinho(),
                                    "quantidade": 1
                                };
                            }
                            
                            localStorage.setItem("carrinho", JSON.stringify(carrinho))
                            
                            canvaQuantidadeCarrinho.style.display = "flex";
                            quantidadeCarrinho.innerHTML = Number(quantidadeCarrinho.innerHTML) + 1;
     
                            mensagemValidacao("Produto adicionado no carrinho", "Confira no seu carrinho.", "sucesso", false)
                
                        }
                    }
                }


            });
        }
    });
}

async function adicionar_produto_carrinho(id_produto, id_usuario, quantidade) {
    let endPoint = `http://localhost:8080/carrinho/adicionar/${id_produto}/${id_usuario}/${quantidade}`;

    await request_API("POST", endPoint);

    quantidadeCarrinho.innerHTML = Number(quantidadeCarrinho.innerHTML) + 1;

    mensagemValidacao("Produto adicionado no carrinho", "Confira no seu carrinho.", "sucesso", false)

}
