package br.com.xmarket.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.xmarket.dto.VendaDTO;
import br.com.xmarket.model.Carrinho;
import br.com.xmarket.model.Cliente;
import br.com.xmarket.model.Email;
import br.com.xmarket.model.ItemVenda;
import br.com.xmarket.model.MensagemEmail;
import br.com.xmarket.model.Venda;
import br.com.xmarket.repositories.CarrinhoRepositorio;
import br.com.xmarket.repositories.ItemVendaRepository;
import br.com.xmarket.repositories.VendaRepositorio;
import org.springframework.web.bind.annotation.ModelAttribute;

@Service
public class VendaServico {

    @Autowired
    EmailServico emailServico;

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

    public String criarVenda(Long idCliente, VendaDTO vendaDTO) {

        String mensagemErro = "";

        Venda venda = new Venda();

        Cliente cliente = clienteServico.buscarPeloId(idCliente);

        List<Carrinho> carrinho = carrinhoRepositorio.findByUsuario(idCliente);

        List<ItemVenda> itens = new ArrayList<>();

        Boolean todosItensDisponivel = true;

        for (Carrinho c : carrinho) {

            int quantidadeNoBanco = produtoServico.buscarQuantidade(c.getProduto().getId());

            if (quantidadeNoBanco >= c.getQuantidade()) {

                ItemVenda itemVenda = new ItemVenda();

                itemVenda.setProduto(c.getProduto());
                itemVenda.setVenda(venda);
                itemVenda.setPrecoUnitario(c.getProduto().getPreco());
                itemVenda.setQuantidade(c.getQuantidade());

                itens.add(itemVenda);
            } else {
                mensagemErro = mensagemErro + ", " + c.getProduto().getId();
                todosItensDisponivel = false;
            }
        }

        if(todosItensDisponivel == false){
            itens.clear();
        }

        venda.setDataVenda(LocalDateTime.now());
        venda.setItens(itens);
        venda.setUsuario(cliente);
        venda.setValorTotal(vendaDTO.getValorTotal());
        venda.setFormaPagamento(vendaDTO.getEnumPagamento());
        vendaRepositorio.save(venda);
        ///
        Email email = new Email();
        MensagemEmail msg = new MensagemEmail();
        
        email.setRemetente(venda.getUsuario().getEmail());
        
        email.setMensagem(msg.msgVenda(venda.getUsuario().getNome()));
        ///
        try {
            emailServico.enviarEmailNotaFiscal(venda.getIdVenda(),email);
        }catch (Exception e){
            e.printStackTrace();
        }

        if(itens.size() > 0){
            // Atualizar itens no estoque
            for (Carrinho c : carrinho) {
                int quantidadeNoBanco = produtoServico.buscarQuantidade(c.getProduto().getId());
                if (quantidadeNoBanco >= c.getQuantidade()) {
                    int novaQuantidade = quantidadeNoBanco - c.getQuantidade();
                    carrinhoRepositorio.atualizarQuantidade(novaQuantidade, c.getProduto().getId());
                }
            }

            carrinhoRepositorio.limparCarrinho(idCliente);
        }
        
        return mensagemErro;
    }



    public int buscarQuantidadeProduto(Long id) {

        return carrinhoRepositorio.buscarQuantidade(id);

    }


    public List<ItemVenda> buscarItemVenda(){
        return itemVendaRepository.findAll();
    }


    public Venda buscarPeloId(Long idVenda){
      return  vendaRepositorio.findById(idVenda).get();
    }



    @ModelAttribute("data_inicio")
    public List<String> getDataInicio(){
        return vendaRepositorio.findDataInicio();
    }

    @ModelAttribute("data_final")
    public List <String> getDataFinal(){
        return vendaRepositorio.findDataFinal();
    }

    public List<String> findIdVenda(){
        return vendaRepositorio.findIdVenda();
    }





}