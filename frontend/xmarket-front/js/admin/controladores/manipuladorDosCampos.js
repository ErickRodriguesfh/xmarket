const manipuladorDosCampos = {
    cadastrarCliente() {
        return {
            nome: document.getElementById("cadastrar-cliente-nome"),
            cpf: document.getElementById("cadastrar-cliente-cpf"),
            rg: document.getElementById("cadastrar-cliente-rg"),
            email: document.getElementById("cadastrar-cliente-email"),
            telefone: document.getElementById("cadastrar-cliente-telefone"),
            senha: document.getElementById("cadastrar-cliente-senha"),
            confirmarSenha: document.getElementById("cadastrar-cliente-confirmarSenha"),
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
            endereco: {
                rua: document.getElementById("modificar-cliente-endereco-rua"),
                numero: document.getElementById("modificar-cliente-endereco-numero"),
                bairro: document.getElementById("modificar-cliente-endereco-bairro"),
                municipio: document.getElementById("modificar-cliente-endereco-municipio"),
                estado: document.getElementById("modificar-cliente-endereco-estado")
            },
            preencherCampos(cliente){
                const enderecoSeparado = cliente.enderecoSeparado();

                this.nome.value = cliente.nome;
                this.cpf.value = cliente.cpf;
                this.rg.value = cliente.rg;
                this.email.value = cliente.email;
                this.telefone.value = cliente.telefone
                this.endereco.rua.value = enderecoSeparado.rua;
                this.endereco.numero.value = enderecoSeparado.numero;
                this.endereco.bairro.value = enderecoSeparado.bairro;
                this.endereco.municipio.value = enderecoSeparado.municipio;
                this.endereco.estado.value = enderecoSeparado.estado;
         
            },
            todosValores() {
                return {
                    id: this.id.value,
                    nome: this.nome.value,
                    cpf: this.cpf.value,
                    rg: this.rg.value,
                    email: this.email.value,
                    telefone: this.telefone.value,
                    //senha: this.senha.value,
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
            endereco: {
                rua: document.getElementById("remover-cliente-endereco-rua"),
                numero: document.getElementById("remover-cliente-endereco-numero"),
                bairro: document.getElementById("remover-cliente-endereco-bairro"),
                municipio: document.getElementById("remover-cliente-endereco-municipio"),
                estado: document.getElementById("remover-cliente-endereco-estado")
            },
            preencherCampos(cliente){
                const enderecoSeparado = cliente.enderecoSeparado();

                this.nome.value = cliente.nome;
                this.cpf.value = cliente.cpf;
                this.rg.value = cliente.rg;
                this.email.value = cliente.email;
                this.telefone.value = cliente.telefone
                this.endereco.rua.value = enderecoSeparado.rua;
                this.endereco.numero.value = enderecoSeparado.numero;
                this.endereco.bairro.value = enderecoSeparado.bairro;
                this.endereco.municipio.value = enderecoSeparado.municipio;
                this.endereco.estado.value = enderecoSeparado.estado;
         
            },
            todosValores() {
                return {
                    id: this.id.value,
                    nome: this.nome.value,
                    cpf: this.cpf.value,
                    rg: this.rg.value,
                    email: this.email.value,
                    telefone: this.telefone.value,
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
            imagemUrl: document.getElementById("imagem-cadastrar-produto"),

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
                    imagemUrl: this.imagemUrl
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
            console.log(objetoCampos[key].length)
            if(key == "endereco"){
                for (let parteEndereco in objetoCampos[key]){
                    objetoCampos[key][parteEndereco].value = "";
                }
            }
            if(objetoCampos[key].value != undefined){
                objetoCampos[key].value = "";
            }
            
            //console.log("objetoCampos[key")
        }
    }
}

export default manipuladorDosCampos