package br.com.seguranca.services;


import br.com.seguranca.model.Venda;
import br.com.seguranca.repositories.VendaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class VendaServico {

    @Autowired
    private VendaRepositorio vendaRepositorio;


    public void  fecharVenda (Venda venda){

        vendaRepositorio.save(venda);

    }









}
