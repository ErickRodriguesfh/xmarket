import request_API from "./services/service.js";

let idUsuario;

idUsuario = "1";
popular_produtos(); //cart-button

//adicionar_funcionalidades();

function cardItem() {
    let element = document.createElement("div");

    element.setAttribute("class", "card-item");

    return element;
}
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
function product_element(nameProduct, brand, price, path, id) {
    let card_item = cardItem();
    let image_item = imageItem(path);
    let title_item = titleItem(`${nameProduct} - ${brand} `);
    let description_item = descriptionItem(price);
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
    dados = await response.json()

    console.log(dados)

    dados.forEach((element, id) => {
        if(element.quantidade > 0){
            console.log(element)
            let nome = element["nome"];
            let marca = element["marca"];
            let price = element["preco"];
            let imagePath = "http://127.0.0.1:5500/" + element["imagemUrl"];
           
            product_element(nome, marca, price, imagePath, id)
    
            let btnEvent = document.getElementById(`submit-${id}`);
            btnEvent.addEventListener('click', () => {
                adicionar_produto_carrinho(element["id"], idUsuario, 1)
    
            });
        }
    });
}

async function adicionar_produto_carrinho(id_produto, id_usuario, quantidade) {
    let endPoint = `http://localhost:8080/carrinho/adicionar/${id_produto}/${id_usuario}/${quantidade}`;

    await request_API("POST", endPoint);
}