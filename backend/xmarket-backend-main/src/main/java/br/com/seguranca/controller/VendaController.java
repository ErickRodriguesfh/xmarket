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
import br.com.seguranca.model.Cliente;
import br.com.seguranca.model.Email;
import br.com.seguranca.model.MensagemEmail;
import br.com.seguranca.services.ClienteServico;
import br.com.seguranca.services.EmailServico;
import br.com.seguranca.services.VendaServico;


@CrossOrigin("*")
@RestController
@RequestMapping("/venda")
public class VendaController {
    @Autowired
    private VendaServico vendaServico;

    @Autowired
    private EmailServico emailServico;

    @Autowired
    private ClienteServico clienteServico;
    
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
		// Thread de envio de email
		new Thread() {
			public void run() {
				Cliente cliente = clienteServico.buscarPeloId(idCliente);
				Email email = new Email();
				email.setRemetente(cliente.getEmail());
				email.setTitulo("XMarket - Compra Finalizada!😀");
				email.setMensagem(msg.msgVenda(cliente.getNome()));
				try {
					emailServico.enviarEmail(email);
				} catch (MessagingException e) {
					e.printStackTrace();
				}
			}
		}.start();
		return ResponseEntity.status(HttpStatus.OK).build();
	}

}
