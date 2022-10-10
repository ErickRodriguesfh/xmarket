package br.com.seguranca.controller;

import br.com.seguranca.dto.CarrinhoDTO;
import br.com.seguranca.enums.EnumPagamento;
import br.com.seguranca.model.Venda;
import br.com.seguranca.services.VendaServico;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/venda")
public class VendaController {


    @Autowired
    private VendaServico vendaServico;



















}
