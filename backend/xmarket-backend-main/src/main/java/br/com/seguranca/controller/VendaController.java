package br.com.seguranca.controller;


import br.com.seguranca.services.VendaServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/venda")
public class VendaController {


    @Autowired
    private VendaServico vendaServico;



















}
