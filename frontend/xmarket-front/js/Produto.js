export default class Produto {

    constructor(produto) {
        if (typeof produto == "object") {
            this._id = produto["id"];
            this._nome = produto["nome"];
            this._marca = produto["marca"];
            this._preco = produto["preco"];
            this._quantidade = produto["quantidade"];
            this._imageUrl = produto["imagemUrl"];
        }
    }

    _criarDadoTabela(informacao) {
        const dado = document.createElement("td");
        dado.appendChild(document.createTextNode(informacao));

        return dado;
    }

    listarParaTabela() {
        const row = document.createElement("tr");

        row.appendChild(this._criarDadoTabela(this._id));
        row.appendChild(this._criarDadoTabela(this._nome));
        row.appendChild(this._criarDadoTabela(this._marca));
        row.appendChild(this._criarDadoTabela(this._preco));
        row.appendChild(this._criarDadoTabela(this._quantidade));

        return row;
    }

    cadastrar(){
        const body = { 
            "imagemUrl": this._imageUrl,
            "marca": this._marca,
            "nome": this._nome,
            "preco": this._preco,
            "quantidade": this._quantidade,
        }
        return body;
    }
    
    modificar(){
        const body = { 
            "id": this._id,
            "imagemUrl": this._imageUrl,
            "marca": this._marca,
            "nome": this._nome,
            "preco": this._preco,
            "quantidade": this._quantidade,
        }
        return body;
    }


    set id(id) {
        this._id = id;
    }
    set nome(nome) {
        this._nome = nome;
    }
    set marca(marca) {
        this._marca = marca;
    }
    set preco(preco) {
        this._preco = preco;
    }
    set quantidade(quantidade) {
        this._quantidade = quantidade;
    }
    set imageUrl(imageUrl) {
        this._imageUrl = imageUrl;
    }

    get id() {
        return this._id;
    }
    get nome() {
        return this._nome;
    }
    get marca() {
        return this._marca;
    }
    get preco() {
        return this._preco;
    }
    get quantidade() {
        return this._quantidade;
    }
    get imageUrl() {
        return this._imageUrl;
    }
}