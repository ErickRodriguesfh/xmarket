package br.com.seguranca.services;



import br.com.seguranca.model.ItemVenda;
import br.com.seguranca.model.Venda;
import br.com.seguranca.repositories.ItemVendaRepository;
import br.com.seguranca.repositories.VendaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;


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

    public void  fecharVenda (Venda venda){

        vendaRepositorio.save(venda);

    }


    public void criarVenda(Venda venda, Long idCliente){


    venda.setCliente(clienteServico.buscarPeloId(idCliente));
    venda.setDataVenda(LocalDateTime.now());
    vendaRepositorio.save(venda);



    itemVendaRepository.saveAll(venda.getItens());


    }
















}
