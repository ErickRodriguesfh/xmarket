package br.com.seguranca.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.seguranca.dto.ClienteDTO;
import br.com.seguranca.dto.ProdutoDTO;
import br.com.seguranca.model.Administrador;
import br.com.seguranca.model.Cliente;
import br.com.seguranca.model.LoginAdmin;
import br.com.seguranca.model.Produto;
import br.com.seguranca.services.AdminServico;
import br.com.seguranca.services.ClienteServico;
import br.com.seguranca.services.ProdutoServico;

@RestController
@RequestMapping("/admin")
public class AdminControlador {

	@SuppressWarnings("unused")
	private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	
	@Autowired
	private AdminServico adminServico;
	@Autowired
	private ProdutoServico produtoServico;
	@Autowired
	private ClienteServico clienteServico;
	
	
	//Login
	@PostMapping
	 public ResponseEntity<Administrador> login(@Valid @RequestBody LoginAdmin login){
		 boolean valid = adminServico.validarLogin(login);
			if (valid) {
				return ResponseEntity.status(200).build();
			}
			return ResponseEntity.status(401).build(); 	
	 }
	 
	 
	 //Cadastro de Admins
	@PostMapping("/cadastrar")
	 public ResponseEntity<?> cadastrar(@Valid @RequestBody Administrador administrador){
		if (adminServico.validacaoGeral(administrador)) {
			adminServico.cadastrar(administrador);
			return ResponseEntity.status(201).build();
		}
		return ResponseEntity.status(422).body("Usuario já existe!");
	}
	
	
	
	//Controle de Estoque
	
	@GetMapping("/estoque")
	public ResponseEntity<List<ProdutoDTO>> listaDeProdutos(){
		return ResponseEntity.status(200).body(produtoServico.listarProdutos());
	}
	@PostMapping("/estoque/inserir")
	public ResponseEntity<ProdutoDTO> inserirProduto (@RequestBody ProdutoDTO produtoDTO) { //Validar Inserção de produtos iguais!!!!!!!
		produtoServico.inserirProduto(produtoDTO);
		return ResponseEntity.status(201).body(produtoDTO);
	}
	
	@DeleteMapping("/estoque/excluir")
	public ResponseEntity<ProdutoDTO> excluir(@RequestBody Long id){
		produtoServico.excluirProduto(id);
		return ResponseEntity.status(200).build();
	}
	
	
	@PutMapping("/estoque/alterar")
	public ResponseEntity<?> editarProduto(@Valid @RequestBody Produto produto){ //Não pode colocar quantidade negativa
		boolean edicaoValida = produtoServico.editarProduto(produto);
		if(edicaoValida) {
			return ResponseEntity.status(200).build();
		}
		return ResponseEntity.status(406).body("Quantidade inválida!");
	}
	
	
	@GetMapping("/estoque/busca/{id}")
	public ResponseEntity<Produto> buscarPorId(@Valid @RequestBody Long id, String lodas){
		return ResponseEntity.status(200).body(produtoServico.findById(id));
	}
	
	
	
	//Controle de Clientes

	@GetMapping("/clientes")
	public ResponseEntity<List<Cliente>> listaDeClientes(){
		return ResponseEntity.status(200).body(clienteServico.listarClientes());
	}
	
	
	@PutMapping("/clientes/alterar")
	public ResponseEntity<Cliente> alterarCliente(@Valid @RequestBody Cliente cliente){
			clienteServico.alterarCliente(cliente);
			return ResponseEntity.status(200).build();
	}
	
	@PostMapping("/clientes/cadastrar")
	public ResponseEntity cadastroCliente(@Valid @RequestBody ClienteDTO clienteDTO) {
		if (clienteServico.validacaoGeral(clienteDTO)) {
			clienteServico.cadastrarCliente(clienteDTO);
			return ResponseEntity.status(201).build();
		}
		return ResponseEntity.status(422).body("Usuario já existe!");
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
