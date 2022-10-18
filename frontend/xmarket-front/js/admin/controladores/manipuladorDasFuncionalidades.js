export default function adicionandoEventos() {
    let hamburger = document.querySelector(".hamburger");
    let setting = document.querySelector(".settings-logo");

    const optionsSideBar = Array.from(document.getElementsByClassName('disable'));

    let closeBtn = document.getElementById("close");

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


    // Tela de mensagem de validação
    let canvaMensagemValidacao = document.querySelector(".canva-mensagem");
    let mensagemValidacao = document.querySelector(".mensagem");
    let fecharCanva = document.getElementById("fechar-mensagem");

    // Content list
    let listContent = document.getElementById("list-content");
    let headerTable = document.getElementById("header-table");
    hamburger.addEventListener("click", function () {

        document.querySelector("body").classList.toggle("active");
    });

    setting.addEventListener("click", function () {
        let content = document.querySelector(".settings-content");

        if (content.style.display === "none" || content.style.display === "") {
            content.style.display = "inline-grid";

        } else {
            content.style.display = "none";

        }
    });
    //closeBtn.addEventListener("click", fecharTudo);


    fecharCanva.addEventListener("click", function () {
        canvaMensagemValidacao.style.display = "none";

        //fecharTudo();

        //limpar mensagem
        let mensagem = document.getElementById("mensagem-validacao");
        mensagemValidacao.removeChild(mensagem);

    })

    optionsSideBar.forEach(option => {
        option.addEventListener("click", function () {
            // Defino a opção da opção em localStorage
            localStorage.setItem("option", option.id);

            // Busca a opção ativa e desativa ela
            let active = document.querySelector(".active");
            active.classList.remove("active");
            active.classList.add('disable');

            // Ativa a opção selecionada
            option.classList.remove('disable');
            option.classList.add('active');


            // Define titulo da tela selecionada
            let title = document.getElementById("title");
            title.innerHTML = localStorage.getItem("option");

            // Mostrar as funcionalidades;
            visualizarFuncionalidades();
        })
    });


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

        //unblockInputs(false);
    }
    function visualizarFuncionalidades() {
        let element = document.getElementById("main-content");
        if (localStorage.getItem("option") == "home" || localStorage.getItem("option") == "relatorios") {
            element.style.display = "none";
        } else {
            element.style.display = "flex";
        }
    }
    
    // function unblockInputs(confirm) {
    //     if (confirm) {
    //         camposModificarProduto.nome.removeAttribute('readonly');
    //         camposModificarProduto.marca.removeAttribute('readonly');
    //         camposModificarProduto.preco.removeAttribute('readonly');
    //         camposModificarProduto.quantidade.removeAttribute('readonly');
    //         camposModificarProduto.imagemUrl.removeAttribute('readonly');
    //     } else {
    //         camposModificarProduto.nome.setAttribute('readonly', true);
    //         camposModificarProduto.marca.setAttribute('readonly', true);
    //         camposModificarProduto.preco.setAttribute('readonly', true);
    //         camposModificarProduto.quantidade.setAttribute('readonly', true);
    //         camposModificarProduto.imagemUrl.setAttribute('readonly', true);
    //     }
    // }
}