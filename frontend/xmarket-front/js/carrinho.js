import Produto from "./Produto.js";
import request_API from "./services/service.js";

localStorage.ultimaPagina = "carrinho.html"
let idUsuario;
let dados;

if(localStorage.cliente) idUsuario = JSON.parse(localStorage.cliente).id;


let finalizarCompra = document.getElementById("finalizar-compra");
let cleanCart = document.getElementById("button-clean-cart");
let returnToProduto = document.getElementById("button-return");

//
let totalProdutos = document.getElementById("total-somado");
//
const quantidadeCarrinho = document.getElementById("quantidade-carrinho");


const servidorImagens = "http://127.0.0.1:5500/"
let logado = localStorage.logado;

if (logado == "false" || logado == "" || logado == undefined) {

    popular_carrinho_deslogado();
} else if (logado == "true") {

    popular_carrinho_logado();
}


finalizarCompra.addEventListener('click', comprar_agora);

returnToProduto.addEventListener('click', () => {
    window.location.href = "produtos.html";
});

function card_item(produto, quantidade) {
    let id = produto.id;
    let nome = produto.nome;
    let path = produto.imagemUrl;
    let marca = produto.marca;
    let preco = produto.preco;

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
function popular_carrinho_deslogado() {
    if (localStorage.carrinho == undefined || localStorage.carrinho == "") return;
    let carrinhoLocal = JSON.parse(localStorage.carrinho);

    if (carrinhoLocal != undefined && carrinhoLocal != "") {
        console.log(carrinhoLocal);
        for (let id in carrinhoLocal) {
            const item = carrinhoLocal[id];

            let produto = new Produto(item.produto);
            produto.imagemUrl = servidorImagens + produto.imagemUrl;
            console.log("🚀 ~ file: carrinho.js ~ line 175 ~ produto.imagemUrl", produto.imagemUrl)
        
            card_item(produto, item.quantidade);
            lista_produtos_calculo(produto, item.quantidade);

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

                    let precoProduto = document.getElementById(`preco-produto-${produto.id}`); //quantidade-produto
                    let quantidadeProduto = document.getElementById(`quantidade-produto-${produto.id}`);
                  
                    precoProduto.innerHTML = (produto.preco * inputQuantidade.value).toFixed(2);
                    quantidadeProduto.innerHTML = inputQuantidade.value;
               
                    quantidadeCarrinho.innerHTML = Number(quantidadeCarrinho.innerHTML) - 1;
                    localStorage.setItem("quantidade-carrinho", quantidadeCarrinho.innerHTML);

                    carrinhoLocal[`${id}`] = {
                        "produto": produto.salvarCarrinho(),
                        "quantidade": carrinhoLocal[`${id}`].quantidade - 1
                    };
                    localStorage.carrinho = JSON.stringify(carrinhoLocal);
                    calcular_soma()
                }
            });

            btnMore.addEventListener('click', () => {
                if (parseInt(qtdProduto.value) < 20) {
                    qtdProduto.value = parseInt(qtdProduto.value) + 1;

                    let precoProduto = document.getElementById(`preco-produto-${produto.id}`);
                    let quantidadeProduto = document.getElementById(`quantidade-produto-${produto.id}`);

                    precoProduto.innerHTML = (produto.preco * inputQuantidade.value).toFixed(2);
                    quantidadeProduto.innerHTML = inputQuantidade.value;

                    quantidadeCarrinho.innerHTML = Number(quantidadeCarrinho.innerHTML) + 1;
                    localStorage.setItem("quantidade-carrinho", quantidadeCarrinho.innerHTML);

                    carrinhoLocal[`${id}`] = {
                        "produto": produto.salvarCarrinho(),
                        "quantidade": carrinhoLocal[`${id}`].quantidade + 1
                    };
                    localStorage.carrinho = JSON.stringify(carrinhoLocal);

                    calcular_soma();
                    //window.location.href = "carrinho.html";
                }
            });

            deleteButton.addEventListener('click', () => {
                delete carrinhoLocal[`${produto.id}`];
                console.log(carrinhoLocal);
                localStorage.carrinho = JSON.stringify(carrinhoLocal);
                window.location.href = "carrinho.html";
            });
        }
        // calcular soma apos preencher os produtos
        cleanCart.addEventListener('click', function(){
            delete localStorage.carrinho;
            window.location.href = "produtos.html";
        })
        calcular_soma();
    }

}
async function popular_carrinho_logado() {
    const respose = await request_API("GET", `http://localhost:8080/carrinho/exibirCarrinho/${idUsuario}`);
    if(respose.ok != true) return
    dados = await respose.json();
    dados.forEach(item => {
        let produto = new Produto(item.produtoDTO);
        let id = produto.id;


        produto.imagemUrl = servidorImagens + produto.imagemUrl;

        // Criação dinamicamente do produto no carrinho
        card_item(produto, item.quantidade);
        lista_produtos_calculo(produto, item.quantidade); //idProduto, nomeProduto, marca, quantidade, preco

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

                precoProduto.innerHTML = (produto.preco * inputQuantidade.value).toFixed(2);
                quantidadeProduto.innerHTML = inputQuantidade.value;
                let endPoint = `http://localhost:8080/carrinho/alterar/DIMINUIR/${idUsuario}/${id}`;
                request_API("PUT", endPoint);

                quantidadeCarrinho.innerHTML = Number(quantidadeCarrinho.innerHTML) - 1;
                localStorage.setItem("quantidade-carrinho", quantidadeCarrinho.innerHTML);
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

                let endPoint = `http://localhost:8080/carrinho/alterar/AUMENTAR/${idUsuario}/${id}`;
                request_API("PUT", endPoint);

                quantidadeCarrinho.innerHTML = Number(quantidadeCarrinho.innerHTML) + 1;
                localStorage.setItem("quantidade-carrinho", quantidadeCarrinho.innerHTML);
                calcular_soma()
                //window.location.href = "carrinho.html";
            }
        });

        deleteButton.addEventListener('click', () => {
            let endPoint = `http://localhost:8080/carrinho/removerItem/${id}/${idUsuario}/${item.quantidade}`;
            request_API("DELETE", endPoint)

            window.location.href = "carrinho.html";
        });
    });
    cleanCart.addEventListener('click', clean_cart);
    calcular_soma();

}

function finalizar_compra() {
    // let listVendas = [];
    // let produtosDTO = Object.assign(dados);

    // produtosDTO.forEach(element => {
    //     let qtdProduto = document.getElementById(`input-qtd-${element["produtoDTO"]["id"]}`).value;
    //     element["produtoDTO"]["quantidade"] = qtdProduto;

    //     listVendas.push(element["produtoDTO"]);
    // });

    const venda = {
        "enumPagamento": "PIX",
        "valorTotal": totalProdutos.innerHTML
    }
    console.log(venda)

    let endPoint = `http://localhost:8080/venda/${idUsuario}`;

    let response = async function () {
        const response = await request_API("POST", endPoint, venda);
        const result = await response.text()

        console.log(result)
    }
    response()
}
function comprar_agora(){
    if(logado == "true"){
        window.location.href = "finalizar-compra.html";
        localStorage.totalVenda = totalProdutos.innerHTML;
    }else if(logado == "false"){
        window.location.href = "login.html";
        localStorage.redirecionamento = "finalizar-compra.html";
    }
}

async function clean_cart() {
    let endPoint = `http://localhost:8080/carrinho/remover/${idUsuario}`;
    let response = await request_API("DELETE", endPoint);
    if(response.ok == true)
        window.location.href = "produtos.html";
}

function lista_produtos_calculo(produto, quantidade) {
    let valorProduto = document.createElement("div");
    valorProduto.setAttribute("class", "valor-produto");
    valorProduto.setAttribute("id", `valor-produto-${produto.id}`);

    let previewProduto = document.createElement("div");
    let second = document.createElement("div");

    previewProduto.setAttribute("class", "preview-produto");

    let _produto = document.createElement("p");
    let _multiplicacao = document.createElement("p");
    let _quantidade = document.createElement("p");
    _quantidade.setAttribute("id", `quantidade-produto-${produto.id}`);
    second.style.width = "40px"
    second.style.display = "flex";

    _produto.appendChild(document.createTextNode(`${produto.nome} - ${produto.marca}`));
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
    _preco.setAttribute("id", `preco-produto-${produto.id}`);

    _real.appendChild(document.createTextNode("R$"));
    _preco.appendChild(document.createTextNode((produto.preco * quantidade).toFixed(2)));

    somaProduto.appendChild(_real);
    somaProduto.appendChild(_preco);

    valorProduto.appendChild(previewProduto);
    valorProduto.appendChild(somaProduto);


    let pagamentoDeProdutos = document.getElementById("payment-products");
    pagamentoDeProdutos.appendChild(valorProduto);


}

function calcular_soma() {
    let totalProdutosCarrinho = 0;
    let maninContainer = document.getElementById("payment-products");

    maninContainer.childNodes.forEach((element) => {
        console.log(element)
        if (element.lastChild !== null) {
            console.log(element[0])
            totalProdutosCarrinho = totalProdutosCarrinho + parseFloat(element.lastChild.lastChild.innerHTML);
        }
    });

    totalProdutos.innerHTML = 0;

    totalProdutos.innerHTML = (totalProdutosCarrinho).toFixed(2);

    //produtos-somados
}