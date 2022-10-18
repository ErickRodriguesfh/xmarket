package br.com.seguranca.services;



import br.com.seguranca.dto.VendaDTO;
import br.com.seguranca.model.Carrinho;
import br.com.seguranca.model.Cliente;
import br.com.seguranca.model.ItemVenda;
import br.com.seguranca.model.Venda;
import br.com.seguranca.repositories.CarrinhoRepositorio;
import br.com.seguranca.repositories.ItemVendaRepository;
import br.com.seguranca.repositories.VendaRepositorio;
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


    public void criarVenda(Long idCliente, VendaDTO vendaDTO){

        Venda venda = new Venda();

        Cliente cliente = clienteServico.buscarPeloId(idCliente);

        List<Carrinho> carrinho = carrinhoRepositorio.findByUsuario(cliente);

        List<ItemVenda> itens = new ArrayList<>();


        for(Carrinho c : carrinho){

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


    }


    public int buscarQuantidadeProduto(Long id){

        return carrinhoRepositorio.buscarQuantidade(id);

    }













}
