package br.com.xmarket.controlador;



import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.xmarket.dto.VendaDTO;
import br.com.xmarket.modelo.MensagemEmail;
import br.com.xmarket.servicos.VendaServico;


@CrossOrigin("*")
@RestController
@RequestMapping("/venda")
public class VendaControlador {
    @Autowired
    private VendaServico vendaServico;

    MensagemEmail msg = new MensagemEmail();


    @PostMapping("/{idCliente}")
	public ResponseEntity<?> criarVenda(@PathVariable("idCliente") Long idCliente, @RequestBody VendaDTO vendaDTO)
			throws MessagingException {

		try {
			vendaServico.criarVenda(idCliente, vendaDTO);
			return ResponseEntity.status(201).build();
		}catch (Exception e){
			return ResponseEntity.status(400).build();
		}

	}




}
