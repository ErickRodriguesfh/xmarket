function card_item(path, nome, marca, preco){
    let product_item = document.createElement("div");
    product_item.setAttribute("class", "products-item");
    
    let f_infos = first_infos(path, nome, marca, preco);
    let s_infos = second_infos();

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

    container_nomes.appendChild(_nome);
    container_nomes.appendChild(_marca);

    description_item.appendChild(container_nomes);
    description_item.appendChild(container_nomes);
    description_item.appendChild(_preco);

    first_infos.appendChild(image_item);
    first_infos.appendChild(description_item);

    return first_infos;
}

function second_infos(){
    let second_infos = document.createElement("div");
    second_infos.setAttribute("class", "second-infos");

    let btn_less = document.createElement("div");
    let btn_more = document.createElement("div");
    let form_quantidade = document.createElement("div");
    let input_quantidade = document.createElement("input");

    btn_less.appendChild(document.createTextNode("-"));
    btn_more.appendChild(document.createTextNode("+"));

    btn_less.setAttribute("class", "control-count");
    btn_more.setAttribute("class", "control-count");
    input_quantidade.setAttribute("class", "control-count");
    input_quantidade.setAttribute("type" , "number")
    input_quantidade.setAttribute("id", "typeNumber")

    form_quantidade.setAttribute("class", "form-outline");
    form_quantidade.style.height = "30px";

    form_quantidade.appendChild(input_quantidade);

    second_infos.appendChild(btn_less);
    second_infos.appendChild(form_quantidade);
    second_infos.appendChild(btn_more);

    return second_infos;
}


let obj = JSON.parse(localStorage.getItem(`cart`));
obj.forEach(element => {
    let nome = element["nome"];
    let marca = element["marca"];
    let price = element["preco"];
    let imagePath = element["imagemUrl"];

    card_item(imagePath, nome, marca, price);
   console.log(element) 
});

//card_item('12', "gabrie", "asdas");