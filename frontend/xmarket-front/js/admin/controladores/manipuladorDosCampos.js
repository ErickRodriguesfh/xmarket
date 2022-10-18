const manipuladorDosCampos = {
    cadastrarCliente() {
        return {
            nome: document.getElementById("cadastrar-cliente-nome"),
            cpf: document.getElementById("cadastrar-cliente-cpf"),
            rg: document.getElementById("cadastrar-cliente-rg"),
            email: document.getElementById("cadastrar-cliente-email"),
            telefone: document.getElementById("cadastrar-cliente-telefone"),
            senha: document.getElementById("cadastrar-cliente-senha"),
            endereco: {
                rua: document.getElementById("cadastrar-cliente-endereco-rua"),
                numero: document.getElementById("cadastrar-cliente-endereco-numero"),
                bairro: document.getElementById("cadastrar-cliente-endereco-bairro"),
                municipio: document.getElementById("cadastrar-cliente-endereco-municipio"),
                estado: document.getElementById("cadastrar-cliente-endereco-estado")
            },

            todosValores() {
                return {
                    nome: this.nome.value,
                    cpf: this.cpf.value,
                    rg: this.rg.value,
                    email: this.email.value,
                    telefone: this.telefone.value,
                    senha: this.senha.value,
                    endereco: {
                        rua: this.endereco.rua.value,
                        numero: this.endereco.numero.value,
                        bairro: this.endereco.bairro.value,
                        municipio: this.endereco.municipio.value,
                        estado: this.endereco.estado.value
                    }
                }
            }
        }
    },
    modificarCliente(){
        return {
            id: document.getElementById("modificar-cliente-id"),
            nome: document.getElementById("modificar-cliente-nome"),
            cpf: document.getElementById("modificar-cliente-cpf"),
            rg: document.getElementById("modificar-cliente-rg"),
            email: document.getElementById("modificar-cliente-email"),
            telefone: document.getElementById("modificar-cliente-telefone"),
            senha: document.getElementById("modificar-cliente-senha"),
            endereco: {
                rua: document.getElementById("modificar-cliente-endereco-rua"),
                numero: document.getElementById("modificar-cliente-endereco-numero"),
                bairro: document.getElementById("modificar-cliente-endereco-bairro"),
                municipio: document.getElementById("modificar-cliente-endereco-municipio"),
                estado: document.getElementById("modificar-cliente-endereco-estado")
            },

            todosValores() {
                return {
                    id: this.id.value,
                    nome: this.nome.value,
                    cpf: this.cpf.value,
                    rg: this.rg.value,
                    email: this.email.value,
                    telefone: this.telefone.value,
                    senha: this.senha.value,
                    endereco: {
                        rua: this.endereco.rua.value,
                        numero: this.endereco.numero.value,
                        bairro: this.endereco.bairro.value,
                        municipio: this.endereco.municipio.value,
                        estado: this.endereco.estado.value
                    }
                }
            }
        }
    },
    removerCliente(){
        return {
            id: document.getElementById("remover-cliente-id"),
            nome: document.getElementById("remover-cliente-nome"),
            cpf: document.getElementById("remover-cliente-cpf"),
            rg: document.getElementById("remover-cliente-rg"),
            email: document.getElementById("remover-cliente-email"),
            telefone: document.getElementById("remover-cliente-telefone"),
            senha: document.getElementById("remover-cliente-senha"),
            endereco: {
                rua: document.getElementById("remover-cliente-endereco-rua"),
                numero: document.getElementById("remover-cliente-endereco-numero"),
                bairro: document.getElementById("remover-cliente-endereco-bairro"),
                municipio: document.getElementById("remover-cliente-endereco-municipio"),
                estado: document.getElementById("remover-cliente-endereco-estado")
            },

            todosValores() {
                return {
                    id: this.id.value,
                    nome: this.nome.value,
                    cpf: this.cpf.value,
                    rg: this.rg.value,
                    email: this.email.value,
                    telefone: this.telefone.value,
                    senha: this.senha.value,
                    endereco: {
                        rua: this.endereco.rua.value,
                        numero: this.endereco.numero.value,
                        bairro: this.endereco.bairro.value,
                        municipio: this.endereco.municipio.value,
                        estado: this.endereco.estado.value
                    }
                }
            }
        }
    },
    
    cadastrarProduto(){
        return {
            nome: document.getElementById("nomeProduto"),
            marca: document.getElementById("marcaProduto"),
            preco: document.getElementById("precoProduto"),
            quantidade: document.getElementById("quantidadeProduto"),
            imagemUrl: document.getElementById("fotoProduto"),

            todosValores(){
                return {
                    nome: this.nome.value,
                    marca: this.marca.value,
                    preco: this.preco.value,
                    quantidade: this.quantidade.value,
                    imagemUrl: this.imagemUrl.files[0]
                }
            }
        }
        
    },

    modificarProduto() {
        return {
            id: document.getElementById("modificar-produto-id"),
            nome: document.getElementById("modificar-produto-nome"),
            marca: document.getElementById("modificar-produto-marca"),
            preco: document.getElementById("modificar-produto-preco"),
            quantidade: document.getElementById("modificar-produto-quantidade"),
            imagemUrl: document.getElementById("modificar-produto-imagem"),

            todosValores() {
                return {
                    id: this.id.value,
                    nome: this.nome.value,
                    marca: this.marca.value,
                    preco: this.preco.value,
                    quantidade: this.quantidade.value,
                    imagemUrl: this.imagemUrl.value
                }
            }
        }
    },

    removerProduto() {
        return {
            id: document.getElementById("remover-produto-id"),
            nome: document.getElementById("remover-produto-nome"),
            marca: document.getElementById("remover-produto-marca"),
            preco: document.getElementById("remover-produto-preco"),
            quantidade: document.getElementById("remover-produto-quantidade"),
            imagemUrl: document.getElementById("remover-produto-imagem"),
        }
    },

    limparCampos(objetoCampos) {
        for (let key in objetoCampos){
            if(objetoCampos[key].value != undefined){
                objetoCampos[key].value = "";
            }
        }
    }
}

export default manipuladorDosCampos