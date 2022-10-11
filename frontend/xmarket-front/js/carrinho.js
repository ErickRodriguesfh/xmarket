let dados;

function card_item(path, nome, marca, preco, quantidade, id){
    let product_item = document.createElement("div");
    product_item.setAttribute("class", "products-item");
    
    let f_infos = first_infos(path, nome, marca, preco);
    let s_infos = second_infos(quantidade, id);

    product_item.appendChild(f_infos);
    product_item.appendChild(s_infos);

    document.getElementById("products-area").appendChild(product_item);
}

function first_infos(path, nome, marca, preco){
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

function second_infos(quantidade, id){
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
    input_quantidade.setAttribute("type" , "text");
    input_quantidade.setAttribute("id", `input-qtd-${id}`);

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

async function getAllElementsCart(){
    let endPoint = `http://localhost:8080/carrinho/exibirCarrinho/2`;
    let init = {    
        method: "GET",
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer', // no-referrer, *client
    }

    let response = await fetch(endPoint, init);
    dados = await response.json();

    console.log(dados);
    dados.forEach(element => {
        let nome = element["produtoDTO"]["nome"];
        let marca = element["produtoDTO"]["marca"];
        let price = element["produtoDTO"]["preco"];
        let imagePath = element["produtoDTO"]["imagemUrl"];
        let quantidade = element["quantidade"];
        let id = element["produtoDTO"]["id"];


        card_item(imagePath, nome, marca, price, quantidade, id);

        console.log(document)
        console.log(`delete-button-${id}`); //delete-button-1
        console.log("quantidade" + quantidade);
        let btnLess = document.getElementById(`less-qtd-${id}`);
        let btnMore = document.getElementById(`more-qtd-${id}`);
        let qtdProduto = document.getElementById(`input-qtd-${id}`);
        let deleteButton = document.getElementById(`delete-button-${id}`);


        btnLess.addEventListener('click', () => {
            if(parseInt(qtdProduto.value) >1){
                qtdProduto.value = parseInt(qtdProduto.value) - 1;
            }
                
        });

        btnMore.addEventListener('click', () => {
            if(parseInt(qtdProduto.value) < 20){
                qtdProduto.value = parseInt(qtdProduto.value) + 1;
            }
            

        });

        deleteButton.addEventListener('click',() => {

            let endPoint = `http://localhost:8080/carrinho/removerItem/${id}/${2}/${quantidade}`;

            let init = {    
                method: "DELETE",
                mode: 'cors', 
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                referrerPolicy: 'no-referrer',
            }
        
            fetch(endPoint, init);
        
            window.location.href="carrinho.html";
        });
    });
}
getAllElementsCart()


function finalizar_compra(){
    let listVendas = [];
    let produtosDTO = Object.assign(dados);

    produtosDTO.forEach(element => {
        listVendas.push(element["produtoDTO"])
    })

    console.log("-----------")
    console.log(listVendas);

    let endPoint = `http://localhost:8080/carrinho/fecharVenda/2`;

    let init = {
        method: "POST",
        mode: 'cors', 
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(listVendas)
    }
    fetch(endPoint, init);
}


let finalizarCompra = document.getElementById("finalizar-compra");

finalizarCompra.addEventListener('click', finalizar_compra);


let cleanCart = document.getElementById("button-clean-cart");
let returnToProduto = document.getElementById("button-return");

cleanCart.addEventListener('click', clean_cart);
returnToProduto.addEventListener('click',() => {
    window.location.href="produtos.html";
});

async function clean_cart(){
    localStorage.clear();
    window.location.href="produtos.html";

    let endPoint = `http://localhost:8080/carrinho/${2}`;
    let init = {    
        method: "DELETE",
        mode: 'cors', 
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer',
    }

    await fetch(endPoint, init);
}

async function remove_item(idProduto, quantidade){
    

}



///carrinho/removerItem/{idProduto}/{idCliente}/{quantidade}