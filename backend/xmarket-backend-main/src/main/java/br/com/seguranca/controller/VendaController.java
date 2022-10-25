package br.com.seguranca.controller;



import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.seguranca.dto.VendaDTO;
import br.com.seguranca.model.MensagemEmail;
import br.com.seguranca.services.VendaServico;


@CrossOrigin("*")
@RestController
@RequestMapping("/venda")
public class VendaController {
    @Autowired
    private VendaServico vendaServico;

    MensagemEmail msg = new MensagemEmail();
    
    @PostMapping("/{idCliente}")
	public ResponseEntity<String> criarVenda(@PathVariable("idCliente") Long idCliente, @RequestBody VendaDTO vendaDTO)
			throws MessagingException {
		String mensagemErro = vendaServico.criarVenda(idCliente, vendaDTO);
		if (mensagemErro != "") {
			System.out.println("----------------MENSAGEM ERRO----------------");
			System.out.println(mensagemErro);
			return ResponseEntity.ok(mensagemErro);
		}

		return ResponseEntity.status(HttpStatus.OK).build();
	}




}
