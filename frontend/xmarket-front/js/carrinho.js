import request_API from "./services/service.js";


let idUsuario;
let dados;

idUsuario = "2";
popular_carrinho();

let finalizarCompra = document.getElementById("finalizar-compra");
let cleanCart = document.getElementById("button-clean-cart");
let returnToProduto = document.getElementById("button-return");


finalizarCompra.addEventListener('click', finalizar_compra);
cleanCart.addEventListener('click', clean_cart);

returnToProduto.addEventListener('click', () => {
    window.location.href = "produtos.html";
});

function card_item(path, nome, marca, preco, quantidade, id) {
    let product_item = document.createElement("div");
    product_item.setAttribute("class", "products-item");

    let f_infos = first_infos(path, nome, marca, preco);
    let s_infos = second_infos(quantidade, id);

    product_item.appendChild(f_infos);
    product_item.appendChild(s_infos);

    document.getElementById("products-area").appendChild(product_item);
}

function first_infos(path, nome, marca, preco) {
    let first_infos = document.createElement("div");
    first_infos.setAttribute("class", "first-infos");

    let image_item = document.createElement("div");
    image_item.setAttribute("class", "image-item");

    let image = document.createElement("img");
    image.src = path;

    image_item.appendChild(image);

    let description_item = document.createElement("div");

    let container_nomes = document.createElement("div");
    let second_description = document.createElement("div");

    let _nome = document.createElement("h4");

    let _marca = document.createElement("h6");
    let _preco = document.createElement("h4");

    description_item.setAttribute("class", "description-item");
    container_nomes.setAttribute("class", "container-description");



    let conteudo_nome = document.createTextNode(nome);
    let conteudo_marca = document.createTextNode(marca);
    let conteudo_preco = document.createTextNode("R$" + preco);


    _nome.appendChild(conteudo_nome);
    _marca.appendChild(conteudo_marca);
    _preco.appendChild(conteudo_preco);

    second_description.appendChild(_marca);
    second_description.appendChild(_preco);
    second_description.setAttribute("class", "second-description");
    container_nomes.appendChild(_nome);
    container_nomes.appendChild(second_description);

    description_item.appendChild(container_nomes);
    description_item.appendChild(container_nomes);
    //description_item.appendChild(_preco);

    first_infos.appendChild(image_item);
    first_infos.appendChild(description_item);

    return first_infos;
}

function second_infos(quantidade, id) {
    let second_infos = document.createElement("div");
    second_infos.setAttribute("class", "second-infos");

    let btn_less = document.createElement("div");
    let btn_more = document.createElement("div");
    let form_quantidade = document.createElement("div");
    let input_quantidade = document.createElement("input");
    let control_quantidade = document.createElement("div");
    let delete_button = document.createElement("div");
    let trash_icon = document.createElement("i");
    let text_remover = document.createElement("p");

    control_quantidade.setAttribute("class", "area-control");
    delete_button.setAttribute("class", "delete-button");
    trash_icon.setAttribute("class", "fa-regular fa-trash-can"); //<i class="fa-regular fa-trash-can"></i>

    btn_less.appendChild(document.createTextNode("-"));
    btn_more.appendChild(document.createTextNode("+"));
    btn_less.setAttribute("id", `less-qtd-${id}`);
    btn_more.setAttribute("id", `more-qtd-${id}`);
    delete_button.setAttribute("id", `delete-button-${id}`);

    btn_less.setAttribute("class", "control-count");
    btn_more.setAttribute("class", "control-count");

    input_quantidade.setAttribute("class", "control-count");
    input_quantidade.setAttribute("type", "text");
    input_quantidade.setAttribute("id", `input-qtd-${id}`); //disabled="disabled"
    input_quantidade.setAttribute("disabled", 'disabled');

    input_quantidade.value = quantidade;

    form_quantidade.setAttribute("class", "form-outline"); //document.createTextNode("Remover")
    form_quantidade.style.height = "30px";

    form_quantidade.appendChild(input_quantidade);

    control_quantidade.appendChild(btn_less);
    control_quantidade.appendChild(form_quantidade);
    control_quantidade.appendChild(btn_more);

    text_remover.appendChild(document.createTextNode("Remover"))

    delete_button.appendChild(trash_icon);
    delete_button.appendChild(text_remover);

    second_infos.appendChild(control_quantidade);
    second_infos.appendChild(delete_button);


    return second_infos;
}

async function popular_carrinho() {
    dados = await request_API("GET", `http://localhost:8080/carrinho/exibirCarrinho/2`);

    dados.forEach(element => {
        let nome = element["produtoDTO"]["nome"];
        let marca = element["produtoDTO"]["marca"];
        let preco = element["produtoDTO"]["preco"];
        let imagePath = element["produtoDTO"]["imagemUrl"];
        let quantidade = element["quantidade"];
        let id = element["produtoDTO"]["id"];

        // Criação dinamicamente do produto no carrinho
        card_item(imagePath, nome, marca, preco, quantidade, id);
        lista_produtos_calculo(id, nome, marca, quantidade, preco); //idProduto, nomeProduto, marca, quantidade, preco

        // Input da quantidade do produto
        let qtdProduto = document.getElementById(`input-qtd-${id}`);

        // Botoes de controle do produto
        let btnLess = document.getElementById(`less-qtd-${id}`);
        let btnMore = document.getElementById(`more-qtd-${id}`);
        let deleteButton = document.getElementById(`delete-button-${id}`);
        let inputQuantidade = document.getElementById(`input-qtd-${id}`);
    
        // Adicionando funções aos botões
        btnLess.addEventListener('click', () => {
            if (parseInt(qtdProduto.value) > 1) {
                qtdProduto.value = parseInt(qtdProduto.value) - 1;

                let precoProduto = document.getElementById(`preco-produto-${id}`); //quantidade-produto
                let quantidadeProduto = document.getElementById(`quantidade-produto-${id}`);

                precoProduto.innerHTML = (preco * inputQuantidade.value).toFixed(2);
                quantidadeProduto.innerHTML = inputQuantidade.value;
                let endPoint = `http://localhost:8080/carrinho/alterar/DIMINUIR/${idUsuario}/${id}/${1}`;
                request_API("PUT", endPoint);

                calcular_soma()
            }
        });

        btnMore.addEventListener('click', () => {
            if (parseInt(qtdProduto.value) < 20) {
                qtdProduto.value = parseInt(qtdProduto.value) + 1;

                let precoProduto = document.getElementById(`preco-produto-${id}`);
                let quantidadeProduto = document.getElementById(`quantidade-produto-${id}`);

                precoProduto.innerHTML = (preco * inputQuantidade.value).toFixed(2);
                quantidadeProduto.innerHTML = inputQuantidade.value;

                let endPoint = `http://localhost:8080/carrinho/alterar/AUMENTAR/${idUsuario}/${id}/${1}`;
                request_API("PUT", endPoint);

                calcular_soma()
                //window.location.href = "carrinho.html";
            }
        });

        deleteButton.addEventListener('click', () => {
            let endPoint = `http://localhost:8080/carrinho/removerItem/${id}/${idUsuario}/${quantidade}`;
            request_API("DELETE", endPoint)

            window.location.href = "carrinho.html";
        });
    });

    calcular_soma();
    
}

function finalizar_compra() {
    let listVendas = [];
    let produtosDTO = Object.assign(dados);

    produtosDTO.forEach(element => {
        let qtdProduto = document.getElementById(`input-qtd-${element["produtoDTO"]["id"]}`).value;
        element["produtoDTO"]["quantidade"] = qtdProduto;

        listVendas.push(element["produtoDTO"]);
    });

    let endPoint = `http://localhost:8080/carrinho/fecharVenda/2`;

    request_API("POST", endPoint, listVendas);
}

async function clean_cart() {
    let endPoint = `http://localhost:8080/carrinho/${idUsuario}`;
    request_API("DELETE", endPoint);

    window.location.href = "produto.html";
}

function lista_produtos_calculo(idProduto, nomeProduto, marca, quantidade, preco) {
    let valorProduto = document.createElement("div");
    valorProduto.setAttribute("class", "valor-produto");
    valorProduto.setAttribute("id", `valor-produto-${idProduto}`);

    let previewProduto = document.createElement("div");
    let second = document.createElement("div");
second
    previewProduto.setAttribute("class", "preview-produto");

    let _produto = document.createElement("p");
    let _multiplicacao = document.createElement("p");
    let _quantidade = document.createElement("p");
    _quantidade.setAttribute("id", `quantidade-produto-${idProduto}`);
    second.style.width = "40px"
    second.style.display = "flex";
    
    _produto.appendChild(document.createTextNode(`${nomeProduto} - ${marca}`));
    _multiplicacao.appendChild(document.createTextNode(`x ${'\u00A0' + '\u00A0' + '\u00A0' + '\u00A0'}`));
    _quantidade.appendChild(document.createTextNode(`${quantidade}`));

    second.appendChild(_multiplicacao);
    second.appendChild(_quantidade);

    previewProduto.appendChild(_produto);
    previewProduto.appendChild(second);
    // previewProduto.appendChild(_multiplicacao);    
    // previewProduto.appendChild(_quantidade);

    let somaProduto = document.createElement("div");
    somaProduto.setAttribute("class", "soma-produto");

    let _real = document.createElement("p");
    let _preco = document.createElement("p");
    _preco.setAttribute("id", `preco-produto-${idProduto}`);

    _real.appendChild(document.createTextNode("R$"));
    _preco.appendChild(document.createTextNode((preco * quantidade).toFixed(2)));

    somaProduto.appendChild(_real);
    somaProduto.appendChild(_preco);

    valorProduto.appendChild(previewProduto);
    valorProduto.appendChild(somaProduto);


    let pagamentoDeProdutos = document.getElementById("payment-products");
    pagamentoDeProdutos.appendChild(valorProduto);


}

function calcular_soma(){
    let totalProdutosCarrinho = 0;
    let maninContainer = document.getElementById("payment-products");
    let totalProdutos = document.getElementById("total-somado");

    maninContainer.childNodes.forEach((element) => {
        if(element.lastChild !== null){
            totalProdutosCarrinho = totalProdutosCarrinho + parseFloat(element.lastChild.lastChild.innerHTML);
        }
    });
    totalProdutos.innerHTML = 0;

    totalProdutos.innerHTML = (totalProdutosCarrinho).toFixed(2);

    //produtos-somados
}