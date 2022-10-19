import Cliente from "../Cliente.js";
import Produto from "../Produto.js";

import manipuladorDasFuncionalidades from "./controladores/manipuladorDasFuncionalidades.js";
import manipuladorDosCampos from "./controladores/manipuladorDosCampos.js";

import request_API from "../services/service.js";
import request_API_imagem from "../services/service_imagem.js";

// opção selecionada por padrão é a home
localStorage.setItem("option", "home");
manipuladorDasFuncionalidades();

// Painel onde as informações entrarão
let panel = document.getElementById("panel");

// Formularios de Cliente
var cadastroCliente = document.querySelector(".cadastrar-cliente");
var modificarCliente = document.querySelector(".modificar-cliente");
var removerCliente = document.querySelector(".remover-cliente");

// Formularios de Produto
var cadastroProduto = document.querySelector(".cadastrar-produto");
var modificarProduto = document.querySelector(".modificar-produto");
var removerProduto = document.querySelector(".remover-produto");

var listar = document.querySelector(".listar");

const camposModificarProduto = manipuladorDosCampos.modificarProduto();

let closeBtn = document.getElementById("close");
function fecharTudo() {
    panel.style.display = "none";

    cadastroCliente.style.display = "none";
    modificarCliente.style.display = "none";
    removerCliente.style.display = "none";


    cadastroProduto.style.display = "none";
    modificarProduto.style.display = "none";
    removerProduto.style.display = "none";

    listar.style.display = "none";
    listContent.innerHTML = null;
    headerTable.innerHTML = null;

    manipuladorDosCampos.limparCampos(camposModificarCliente);
    manipuladorDosCampos.limparCampos(camposRemoverCliente);
    unblockInputs(false, camposModificarProduto);
}
closeBtn.addEventListener("click", fecharTudo);
//

function monstrarPainel(opcaoCliente, opcaoProduto) {

    panel.style.display = "inline";
    if (localStorage.getItem("option") == "clientes") {
        opcaoCliente.style.display = "inline";
    }
    if (localStorage.getItem("option") == "produtos") {
        opcaoProduto.style.display = "inline";
    }
}

document.getElementById("opcao-cadastrar").addEventListener("click", function () {

    monstrarPainel(cadastroCliente, cadastroProduto);
});

document.getElementById("opcao-modificar").addEventListener("click", function () {

    monstrarPainel(modificarCliente, modificarProduto);
});

document.getElementById("opcao-listar").addEventListener("click", async function () {
    let opcao = localStorage.getItem("option");
    let response;

    panel.style.display = "inline";
    listar.style.display = "inline";

    if (opcao == "clientes") {

        let endPoint = "http://localhost:8080/admin/clientes";
        response = await request_API("GET", endPoint);

        if (response.status == 200 || response.status == 201) {
            const dados = await response.json();
            listarClientes(dados);
        } else {
            mostrarMensagem("Erro ao listar Clientes!");
        }

    }
    if (opcao == "produtos") {

        let endPoint = "http://localhost:8080/admin/estoque";
        response = await request_API("GET", endPoint);

        if (response.status == 200 || response.status == 201) {
            const dados = await response.json();
            listarProdutos(dados);
        } else {
            mostrarMensagem("Erro ao listar Produtos!");
        }
    }

});
document.getElementById("opcao-remover").addEventListener("click", function () {
    monstrarPainel(removerCliente, removerProduto);
});


let listContent = document.getElementById("list-content");
let headerTable = document.getElementById("header-table");

function listarProdutos(dados) {

    let th1 = document.createElement("th");
    let th2 = document.createElement("th");
    let th3 = document.createElement("th");
    let th4 = document.createElement("th");
    let th5 = document.createElement("th");


    th1.appendChild(document.createTextNode("Id"))
    th2.appendChild(document.createTextNode("Nome"))
    th3.appendChild(document.createTextNode("Marca"))
    th4.appendChild(document.createTextNode("Preço"))
    th5.appendChild(document.createTextNode("Quantidade"))

    headerTable.appendChild(th1);
    headerTable.appendChild(th2);
    headerTable.appendChild(th3);
    headerTable.appendChild(th4);
    headerTable.appendChild(th5);

    dados.forEach((element) => {
        let produto = new Produto(element);

        let row = produto.listarParaTabela();
        listContent.appendChild(row);

    });
}

function listarClientes(dados) {
    let th1 = document.createElement("th");
    let th2 = document.createElement("th");
    let th3 = document.createElement("th");
    let th4 = document.createElement("th");
    let th5 = document.createElement("th");
    let th6 = document.createElement("th");
    let th7 = document.createElement("th");

    th1.style.width = "2%";
    th2.style.width = "10%";
    th3.style.width = "10%";
    th4.style.width = "10%";
    th5.style.width = "10%";
    th6.style.width = "10%";

    th1.appendChild(document.createTextNode("Id"));
    th2.appendChild(document.createTextNode("Nome"));
    th3.appendChild(document.createTextNode("Email"));
    th4.appendChild(document.createTextNode("Cpf"));
    th5.appendChild(document.createTextNode("Rg"));
    th6.appendChild(document.createTextNode("Telefone"));
    th7.appendChild(document.createTextNode("Endereço"));

    headerTable.appendChild(th1);
    headerTable.appendChild(th2);
    headerTable.appendChild(th3);
    headerTable.appendChild(th4);
    headerTable.appendChild(th5);
    headerTable.appendChild(th6);
    headerTable.appendChild(th7);

    dados.forEach((element) => {
        let cliente = new Cliente(element);
        let row = cliente.listarParaTabela();
        listContent.appendChild(row);

    });
}

/*
let canvaMensagemValidacao = document.querySelector(".canva-mensagem");

let mensagemValidacao = document.querySelector(".mensagem");

let fecharCanva = document.getElementById("fechar-mensagem");
fecharCanva.addEventListener("click", function () {
    canvaMensagemValidacao.style.display = "none";

    fecharTudo();

    //limpar mensagem
    let mensagem = document.getElementById("mensagem-validacao");
    mensagemValidacao.removeChild(mensagem);

})
*/



let canvaMensagemValidacao = document.querySelector(".canva-mensagem");
let mensagemValidacao = document.querySelector(".mensagem");

function mostrarMensagem(dialog) {
    let mensagem = document.createElement("h4");

    mensagem.setAttribute("id", "mensagem-validacao");
    mensagem.appendChild(document.createTextNode(dialog));

    mensagemValidacao.appendChild(mensagem);

    canvaMensagemValidacao.style.display = "inline";
}

//-----------------------ID - modificar -----------------------

let idModificarProduto = camposModificarProduto.id;
idModificarProduto.addEventListener("keydown", async function (evt) {
    if (evt.key == "Enter" && Number(idModificarProduto.value)) {
        var endPoint = `http://localhost:8080/admin/estoque/busca/${idModificarProduto.value}`;
        var response = await request_API("GET", endPoint);

        if (response.status == 200 || response.status == 201) {
            const dados = await response.json();
            console.log("🚀 ~ file: homePage.js ~ line 232 ~ dados", dados)

            var produto = new Produto(dados);

            camposModificarProduto.nome.value = produto.nome;
            camposModificarProduto.marca.value = produto.marca;
            camposModificarProduto.preco.value = produto.preco;
            camposModificarProduto.quantidade.value = produto.quantidade;
            //camposModificarProduto.imagemUrl.name = produto.imageUrl;
 
            let preview = document.getElementById("imagem-modificar-produto-preview");
            preview.src = `http://127.0.0.1:5500/${produto.imageUrl}`;
            preview.name = `${produto.imageUrl}`;

            //console.log(camposModificarProduto.imagemUrl.files)
            console.log("🚀 ~ file: homePage.js ~ line 253 ~ preview.files[0]", preview)
            //Fazer mecanismo para receber imagem para definir

            //console.log(camposModificarProduto.image.files[0].name);
            //console.log(produto.imageUrl)
            //camposModificarProduto.image.value= produto.imageUrl;

            unblockInputs(true, camposModificarProduto);
        } else {
            mostrarMensagem("Erro: produto nao encontrado")
        }
    }
})

let idRemoverProduto = manipuladorDosCampos.removerProduto().id;
idRemoverProduto.addEventListener("keydown", async function (evt) {
    if (evt.key == "Enter" && Number(idRemoverProduto.value)) {

        var endPoint = `http://localhost:8080/admin/estoque/busca/${idRemoverProduto.value}`;

        var response = await request_API("GET", endPoint);

        if (response.status == 200 || response.status == 201) {
            const dados = await response.json();

            var produto = new Produto(dados);

            manipuladorDosCampos.removerProduto().nome.value = produto.nome;
            manipuladorDosCampos.removerProduto().marca.value = produto.marca;
            manipuladorDosCampos.removerProduto().preco.value = produto.preco;
            manipuladorDosCampos.removerProduto().quantidade.value = produto.quantidade;

            //Fazer mecanismo para receber imagem para definir

            //console.log(camposModificarProduto.image.files[0].name);
            //console.log(produto.imageUrl)
            //camposModificarProduto.image.value= produto.imageUrl;

            unblockInputs(true, camposModificarProduto);
        } else {
            mostrarMensagem("Erro: Produto não encontrado");
        }



    }
})
/*
imagem-cadastrar-preview
imagem-modificar-preview
*/
// input de cadastrar imagem
const cadastrarImagem = document.getElementById("imagem-cadastrar-produto")
var imagemUpada = "";
cadastrarImagem.addEventListener("change", function(){
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        imagemUpada = reader.result;
        document.getElementById("imagem-cadastrar-produto-preview").src = imagemUpada;

    })
    reader.readAsDataURL(this.files[0]);
})

const modificarImagem = document.getElementById("modificar-produto-imagem")
var imagemUpada = "";
modificarImagem.addEventListener("change", function(){
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        imagemUpada = reader.result;
        document.getElementById("imagem-modificar-produto-preview").src = imagemUpada;
        document.getElementById("imagem-modificar-produto-preview").name = this.files[0].name;

        console.log('----------------')
        console.log(this.files[0].name)
    })
    reader.readAsDataURL(this.files[0]);
})

const camposModificarCliente = manipuladorDosCampos.modificarCliente();

let idModificarCliente = camposModificarCliente.id;
idModificarCliente.addEventListener("keydown", async function (evt) {
    if (evt.key == "Enter" && Number(idModificarCliente.value)) {
        preencherInformacoesCliente(idModificarCliente, camposModificarCliente);
    }
})

const camposRemoverCliente = manipuladorDosCampos.removerCliente();
let idRemoverCliente = camposRemoverCliente.id;
idRemoverCliente.addEventListener("keydown", async function (evt) {
    if (evt.key == "Enter" && Number(idRemoverCliente.value)) {
        preencherInformacoesCliente(idRemoverCliente, camposRemoverCliente);
    }
})


async function preencherInformacoesCliente(idCliente, campos){
    var endPoint = `http://localhost:8080/admin/clientes/buscar/${idCliente.value}`; // trocar end point
    var response = await request_API("GET", endPoint);

    if (response.status == 200 || response.status == 201) {
        const dados = await response.json();   
        var cliente = new Cliente(dados);

        campos.preencherCampos(cliente);
    } else {
        mostrarMensagem("Erro: Cliente inexistente");
    }

}
//-----------------------------------------------------------------------

//-------------------------Area de botoes submit --------------------------

// -------------------------CLIENTES----------------------

let botaoCadastrarCliente = document.getElementById("botao-cadastrar-cliente");
botaoCadastrarCliente.addEventListener("click", async function () {
    const valoresCamposCadastrarCliente = manipuladorDosCampos.cadastrarCliente().todosValores();
    let cliente = new Cliente(valoresCamposCadastrarCliente);

    console.log("🚀 ~ file: homePage.js ~ line 332 ~ cliente.cadastrar()", cliente.cadastrar())

    const endPoint = "http://localhost:8080/admin/clientes/cadastrar";
    const response = await request_API("POST", endPoint, cliente.cadastrar());
    
    console.log(response)
    if (response.status == 200 || response.status == 201) {
        mostrarMensagem("Cliente Cadastrado com Sucesso");
        fecharTudo();
    }else{
        mostrarMensagem("Erro: sistema incapaz de finalizar cadastro!");
    }

})

let botaoModificarCliente = document.getElementById("botao-modificar-cliente");
botaoModificarCliente.addEventListener("click", async function () {
    const cliente = new Cliente(camposModificarCliente.todosValores());
    const endPoint = "http://localhost:8080/admin/clientes/alterar";
    const response = await request_API("PUT", endPoint, cliente.modificar());

    if (response.status == 200 || response.status == 201) {
        mostrarMensagem(`Cliente ${cliente.id} \nmodificado com sucesso!`);
        fecharTudo();
    } else {
        mostrarMensagem("Erro: Incapaz de modificar cliente!");
    }


    manipuladorDosCampos.limparCampos(camposModificarCliente);
})

let botaoRemoverCliente = document.getElementById("botao-remover-cliente");
botaoRemoverCliente.addEventListener("click", async function () {
    const idCliente = camposRemoverCliente.todosValores().id;
    console.log("🚀 ~ file: homePage.js ~ line 373 ~ idCliente", idCliente)

    const endPoint = `http://localhost:8080/admin/clientes/deletar/${idCliente}`;
    const response = await request_API("DELETE", endPoint);

    if (response.status == 200 || response.status == 201) {
        mostrarMensagem(`Cliente ${idCliente} \nremovido do sistema!`);
        fecharTudo();
    } else {
        mostrarMensagem("Erro: Incapaz de Remover cliente!");
    }

    manipuladorDosCampos.limparCampos(camposRemoverCliente);
})










// ---------------------------PRODUTOS----------------------------------
let botaoCadastrarProduto = document.getElementById("botao-cadastrar-produto");
botaoCadastrarProduto.addEventListener("click", async function () {
    const camposCadastroProduto = manipuladorDosCampos.cadastrarProduto().todosValores();

    const produto = new Produto(camposCadastroProduto);
    const formData = new FormData();


    produto.imageUrl = camposCadastroProduto.imagemUrl.name;
    formData.append("arquivoImagem", manipuladorDosCampos.cadastrarProduto().todosValores().imagemUrl);

    
    const endPoint = "http://localhost:8080/admin/estoque/inserir/imagem";
    let response = await request_API_imagem(endPoint, formData);


    if (response.status == 201) {
        const endPoint = "http://localhost:8080/admin/estoque/inserir";
        let response = await request_API("POST", endPoint, produto.cadastrar());

        if (response.status == 200 || response.status == 201) {
            mostrarMensagem("Produto cadastrado com sucesso!");
            fecharTudo();
        }else{
            mostrarMensagem("Erro: Sistema incapaz cadastrar produto!");
        }
    }else{
        mostrarMensagem("Erro: Imagem incapaz de ser enviada!");
    }
    console.log("Cadastrado")
    manipuladorDosCampos.limparCampos(manipuladorDosCampos.cadastrarProduto());
});

let botaoModificarProduto = document.getElementById("botao-modificar-produto");
botaoModificarProduto.addEventListener("click", async function () {
    let campos = camposModificarProduto.todosValores();
    campos.imagemUrl = document.getElementById("imagem-modificar-produto-preview").name;
    console.log("🚀 ~ file: homePage.js ~ line 461 ~ document.getElementById('imagem-modificar-produto-preview').name", document.getElementById("imagem-modificar-produto-preview").name)
    console.log("🚀 ~ file: homePage.js ~ line 461 ~ campos.imagemUrl", campos.imagemUrl)
    
    const produto = new Produto(campos);
    console.log("🚀 ~ file: homePage.js ~ line 438 ~ camposModificarProduto.todosValores()", camposModificarProduto.todosValores())
    const endPoint = "http://localhost:8080/admin/estoque/alterar";
    const response = await request_API("PUT", endPoint, produto.modificar());
    console.log("🚀 ~ file: homePage.js ~ line 461 ~ produto.modificar()", produto.modificar())

    console.log(response)
    if (response.status == 200 || response.status == 201) {
        mostrarMensagem(`Produto ${produto.id} \nmodificado com sucesso!`);
        fecharTudo();
    } else {
        mostrarMensagem("Erro: Incapaz de modificar produto!");
    }


    manipuladorDosCampos.limparCampos(camposModificarProduto);
})

let botaoRemoverProduto = document.getElementById("botao-remover-produto");
botaoRemoverProduto.addEventListener("click", async function () {
    const idProduto = manipuladorDosCampos.removerProduto().id.value;

    const endPoint = `http://localhost:8080/admin/estoque/excluir/${idProduto}`;
    const response = await request_API("DELETE", endPoint);

    if (response.status == 200 || response.status == 201) {
        mostrarMensagem("Produto Removido com sucesso!");
        fecharTudo();
    } else {
        mostrarMensagem("Erro: Produto inexistente!");
    }

    manipuladorDosCampos.limparCampos(manipuladorDosCampos.removerProduto());
});






function unblockInputs(confirm, formulario) {
    for (let key in formulario) {
        if (typeof formulario[key] == "object") {
            if (confirm) {
                
                formulario[key].removeAttribute('readonly');
            } else {
                if (formulario[key].id != "modificar-produto-id") {
                    formulario[key].setAttribute('readonly', true);
                }

            }
        }
    }
}


    // if (confirm) {
    //     for(let key in camposModificarProduto){
    //         if(typeof camposModificarProduto[key] == Object){
    //             camposModificarProduto[key].removeAttribute('readonly');
    //         }
    //     }
    //     // camposModificarProduto.nome.removeAttribute('readonly');
    //     // camposModificarProduto.marca.removeAttribute('readonly');
    //     // camposModificarProduto.preco.removeAttribute('readonly');
    //     // camposModificarProduto.quantidade.removeAttribute('readonly');
    //     // camposModificarProduto.imagemUrl.removeAttribute('readonly');
    // } else {
    //     for(let key in formulario){
    //         if(typeof formulario[key] == Object){
    //             formulario[key].setAttribute('readonly', true);
    //         }
    //     }

        // camposModificarProduto.nome.setAttribute('readonly', true);
        // camposModificarProduto.marca.setAttribute('readonly', true);
        // camposModificarProduto.preco.setAttribute('readonly', true);
        // camposModificarProduto.quantidade.setAttribute('readonly', true);
        // camposModificarProduto.imagemUrl.setAttribute('readonly', true);


