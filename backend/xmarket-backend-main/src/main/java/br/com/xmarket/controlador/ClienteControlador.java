package br.com.xmarket.controlador;

import java.util.HashMap;
import java.util.Map;

import javax.mail.MessagingException;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import br.com.xmarket.dto.ClienteDTO;
import br.com.xmarket.modelo.Cliente;
import br.com.xmarket.modelo.Email;
import br.com.xmarket.modelo.Login;
import br.com.xmarket.modelo.MensagemEmail;
import br.com.xmarket.servicos.ClienteServico;
import br.com.xmarket.servicos.EmailServico;

@CrossOrigin("*")
@RestController
@RequestMapping("/cliente")
public class ClienteControlador {

	@Autowired
	private ClienteServico clienteServico;

	@Autowired
	private EmailServico emailServico;
	
	MensagemEmail msg = new MensagemEmail();

	// END POINT para cadastrar cliente
	@PostMapping
	public ResponseEntity<?> cadastrarCliente(@Valid @RequestBody ClienteDTO clienteDTO) throws MessagingException {
		if (clienteServico.validacaoGeral(clienteDTO)) {
			new Thread() {
				public void run() {
					Email email = new Email();
					email.setRemetente(clienteDTO.getEmail());
					email.setTitulo("XMarket - Seja bem vindo!");
					email.setMensagem(msg.msgCadastro(clienteDTO.getNome()));
					try {
						emailServico.enviarEmailCadastro(email);
					} catch (MessagingException e) {
						e.printStackTrace();
					}
				}
			}.start();
			clienteServico.cadastrarCliente(clienteDTO);
			return ResponseEntity.status(201).build();
		}
		return ResponseEntity.status(422).body("Usuario já existe!");
	}

	// END POINT para realizar login de cliente
	@PostMapping("/logar")
	public ResponseEntity<?> logar(@Valid @RequestBody Login login) {
		boolean valid = clienteServico.validarLogin(login);
		if (valid) {
			Cliente cliente = clienteServico.buscarCliente(login);

			return ResponseEntity.status(200).body(cliente);
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
