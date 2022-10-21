package br.com.seguranca.controller;

import java.util.HashMap;
import java.util.Map;

import javax.mail.MessagingException;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.seguranca.dto.ClienteDTO;
import br.com.seguranca.model.Email;
import br.com.seguranca.model.Login;
import br.com.seguranca.model.MensagemEmail;
import br.com.seguranca.services.ClienteServico;
import br.com.seguranca.services.EmailServico;

@CrossOrigin("*")
@RestController
public class ClienteControlador {

	@Autowired
	private ClienteServico usuarioService;
	
	
	@Autowired
	private EmailServico emailServico;
	
	MensagemEmail msg = new MensagemEmail();

	// END POINT para cadastrar cliente
	@PostMapping("/cadastrar")
	public ResponseEntity<?> cadastroCliente(@Valid @RequestBody ClienteDTO clienteDTO) throws MessagingException {
		if (usuarioService.validacaoGeral(clienteDTO)) {
			new Thread() {
				public void run() {
					Email email = new Email();
					email.setRemetente(clienteDTO.getEmail());
					email.setTitulo("XMarket - Seja bem vindo!");
					email.setMensagem(msg.msgCadastro(clienteDTO.getNome()));
					try {
						emailServico.enviarEmail(email);
					} catch (MessagingException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
			}.start();
			usuarioService.cadastrarCliente(clienteDTO);
			return ResponseEntity.status(201).build();
		}
		return ResponseEntity.status(422).body("Usuario já existe!");
	}

	// END POINT para realizar login de cliente
	@PostMapping("/login") 
	public ResponseEntity<?> login(@Valid @RequestBody Login login) { 
		boolean valid = usuarioService.validarLogin(login); 
		if (valid) { 
			return ResponseEntity.status(200).build();
		}
		return ResponseEntity.status(401).build(); 
	}



	// Mapeia as Exceções (400)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public Map<String, String> handleValidationException(MethodArgumentNotValidException e) {
		Map<String, String> errors = new HashMap<>();

		e.getBindingResult().getAllErrors().forEach((error) -> {
			String fieldName = ((FieldError) error).getField();
			String errorMessage = error.getDefaultMessage();

			errors.put(fieldName, errorMessage);
		});

		return errors;
	}

}
