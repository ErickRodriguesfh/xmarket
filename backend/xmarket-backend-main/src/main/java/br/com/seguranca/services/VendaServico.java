package br.com.seguranca.services;



import br.com.seguranca.dto.VendaDTO;
import br.com.seguranca.model.*;
import br.com.seguranca.repositories.CarrinhoRepositorio;
import br.com.seguranca.repositories.ItemVendaRepository;
import br.com.seguranca.repositories.VendaRepositorio;
import br.com.seguranca.validacao.ValidarEstoque;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Service
public class VendaServico {

    @Autowired
    private VendaRepositorio vendaRepositorio;

    @Autowired
    private ClienteServico clienteServico;

    @Autowired
    private ProdutoServico produtoServico;

    @Autowired
    private ItemVendaRepository itemVendaRepository;

    @Autowired
    private CarrinhoRepositorio carrinhoRepositorio;



    public void  fecharVenda (Venda venda){

        vendaRepositorio.save(venda);

    }


    public String criarVenda(Long idCliente, VendaDTO vendaDTO) {

        String mensagemErro = "";

        Venda venda = new Venda();

        Cliente cliente = clienteServico.buscarPeloId(idCliente);

        List<Carrinho> carrinho = carrinhoRepositorio.findByUsuario(idCliente);

        List<ItemVenda> itens = new ArrayList<>();

        ValidarEstoque estoqueValidado = validarEstoque(carrinho);
        boolean flag = estoqueValidado.isFlag();
        estoqueValidado.setQuantidadeDisponível(estoqueValidado.getQuantidadeDisponível());


        if(flag == true) {
            for (Carrinho c : carrinho) {

                int quantidadeNoBanco = buscarQuantidadeProduto(c.getProduto().getId());
                int novaQuantidade = quantidadeNoBanco - c.getQuantidade();
                carrinhoRepositorio.atualizarQuantidade(novaQuantidade, c.getProduto().getId());

                ItemVenda itemVenda = new ItemVenda();

                itemVenda.setProduto(c.getProduto());
                itemVenda.setVenda(venda);
                itemVenda.setPrecoUnitario(c.getProduto().getPreco());
                itemVenda.setQuantidade(c.getQuantidade());
                itens.add(itemVenda);
            }

            venda.setDataVenda(LocalDateTime.now());
            venda.setItens(itens);
            venda.setUsuario(cliente);
            venda.setValorTotal(vendaDTO.getValorTotal());
            venda.setFormaPagamento(vendaDTO.getEnumPagamento());
            vendaRepositorio.save(venda);
            carrinhoRepositorio.limparCarrinho(idCliente);
        }else{
            mensagemErro = mensagemErro + " Quantidade do produto " + estoqueValidado.getNomeProduto() + " Indisponivél " +
                    "Há somente " + estoqueValidado.getQuantidadeDisponível() + " disponíveis no estoque" ;
        }
        // System.out.println("Mensagem de erro aqui");
        //   System.out.println(mensagemErro);
        return mensagemErro;
    }


    public ValidarEstoque validarEstoque(List<Carrinho> carrinho) {

        ValidarEstoque validarEstoque = new ValidarEstoque();

        // seta a variavel pra controle
        boolean flag= true;

        // cria uma lista de produtos
        List<Produto> produtos = new ArrayList<>();

        // itera a lista de carrinho recebida pra pegar os produtos e adicionar na lista de produtos
        for (Carrinho c : carrinho) {
            //seta a quantidade dos produtos no carrinho pra a mesma quantidade no carrinho
            c.getProduto().setQuantidade(c.getQuantidade());
            //adiciona na lista de produtos
            produtos.add(c.getProduto());

        }

        //itera a lista de produtos
        for (Produto p : produtos) {

            // compara a quantidade com a quantidade no banco
            if (p.getQuantidade() > buscarQuantidadeProduto(p.getId())) {


                validarEstoque.setFlag(false);
                validarEstoque.setNomeProduto(p.getNome());
                validarEstoque.setQuantidadeDisponível(buscarQuantidadeProduto(p.getId()));

            } else {
                validarEstoque.setFlag(true) ;

            }

        }


        return validarEstoque;

    }



    public int buscarQuantidadeProduto(Long id){

        return carrinhoRepositorio.buscarQuantidade(id);

    }













}
