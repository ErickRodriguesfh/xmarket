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

    cadastroProduto.style.display = "none";
    modificarProduto.style.display = "none";
    removerProduto.style.display = "none";

    listar.style.display = "none";
    listContent.innerHTML = null;
    headerTable.innerHTML = null;

    console.log(camposModificarProduto)
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




let botaoCadastrarCliente = document.getElementById("botao-cadastrar-cliente");
botaoCadastrarCliente.addEventListener("click", async function () {
    const camposCadastrarCliente = manipuladorDosCampos.cadastrarCliente().todosValores();
    let cliente = new Cliente(camposCadastrarCliente);
    let endereco = "";

    // Concatenar o endereco em uma string
    for (let key in camposCadastrarCliente.endereco) {
        endereco = endereco + camposCadastrarCliente.endereco[key] + ", ";
    }

    cliente.endereco = endereco;


    const endPoint = "http://localhost:8080/admin/clientes/cadastrar";
    const response = await request_API("POST", endPoint, cliente.cadastrar());

    if (response.status == 200 || response.status == 201) {
        mostrarMensagem("Cliente Cadastrado com Sucesso");
    }

})

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


let idProduto = camposModificarProduto.id;
idProduto.addEventListener("keydown", async function (evt) {
    if (evt.key == "Enter" && Number(idProduto.value)) {
        var endPoint = `http://localhost:8080/admin/estoque/busca/${idProduto.value}`;
        var response = await request_API("GET", endPoint);

        if (response.status == 200 || response.status == 201) {
            const dados = await response.json();

            var produto = new Produto(dados);

            camposModificarProduto.nome.value = produto.nome;
            camposModificarProduto.marca.value = produto.marca;
            camposModificarProduto.preco.value = produto.preco;
            camposModificarProduto.quantidade.value = produto.quantidade;

            console.log(produto)
            const img = document.createElement("img");
            img.src = "http://127.0.0.1:5500/" + produto.imageUrl;
            img.style.width = "100%";
            img.style.height = "100%";

            //console.log("../../../../imagens-produtos/" + produto.imageUrl)
            let preview = document.getElementById("imagem-preview");

            preview.appendChild(img);
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
const camposModificarCliente = manipuladorDosCampos.modificarCliente();

let idCliente = camposModificarCliente.id;
idCliente.addEventListener("keydown", async function (evt) {
    if (evt.key == "Enter" && Number(idCliente.value)) {
        var endPoint = `http://localhost:8080/admin/estoque/busca/${idCliente.value}`; // trocar end point
        var response = await request_API("GET", endPoint);

        if (response.status == 200 || response.status == 201) {
            const dados = await response.json();

            var cliente = new Cliente(dados);

            camposModificarCliente.nome = cliente.nome;
            camposModificarCliente.cpf = cliente.cpf;
            camposModificarCliente.rg = cliente.rg;
            camposModificarCliente.email = cliente.email;
            camposModificarCliente.telefone = cliente.telefone;

            var enderecoSeparado = cliente.enderecoSeparado();

            camposModificarCliente.endereco.rua = enderecoSeparado.rua;
            camposModificarCliente.endereco.numero = enderecoSeparado.numero;
            camposModificarCliente.endereco.bairro = enderecoSeparado.bairro;
            camposModificarCliente.endereco.municipio = enderecoSeparado.municipio;
            camposModificarCliente.endereco.estado = enderecoSeparado.estado;
        } else {
            mostrarMensagem("Erro: Cliente inexistente");
        }

    }
})

//-----------------------------------------------------------------------


//-------------------------Area de botoes submit --------------------------
let botaoCadastrarProduto = document.getElementById("botao-cadastrar-produto");
botaoCadastrarProduto.addEventListener("click", async function () {
    console.log("TESTE")
    const camposCadastroProduto = manipuladorDosCampos.cadastrarProduto().todosValores();

    const produto = new Produto(camposCadastroProduto);
    const formData = new FormData();

    produto.imageUrl = camposCadastroProduto.imagemUrl.name;

    formData.append("arquivoImagem", manipuladorDosCampos.cadastrarProduto().todosValores().imagemUrl);
    console.log(manipuladorDosCampos.cadastrarProduto().todosValores().imagemUrl);

    const endPoint = "http://localhost:8080/admin/estoque/inserir/imagem";
    let response = await request_API_imagem(endPoint, formData);

    console.log("in btn")
    console.log(response)
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
    const produto = new Produto(camposModificarProduto.todosValores());
    const endPoint = "http://localhost:8080/admin/estoque/alterar";
    const response = await request_API("PUT", endPoint, produto.modificar());

    if (response.status == 201 || response.status == 201) {
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
                console.log("removendo readonly")
                formulario[key].removeAttribute('readonly');
            } else {
                console.log("setando readonly")
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


