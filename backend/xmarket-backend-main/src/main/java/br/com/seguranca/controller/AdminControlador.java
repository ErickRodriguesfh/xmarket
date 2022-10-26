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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.com.seguranca.dto.ClienteDTO;
import br.com.seguranca.dto.ProdutoDTO;
import br.com.seguranca.model.Administrador;
import br.com.seguranca.model.Cliente;
import br.com.seguranca.model.LoginAdmin;
import br.com.seguranca.model.Produto;
import br.com.seguranca.services.AdminServico;
import br.com.seguranca.services.ClienteServico;
import br.com.seguranca.services.ProdutoServico;

@CrossOrigin("*")
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

	// Login
	@PostMapping
	public ResponseEntity<Administrador> login(@Valid @RequestBody LoginAdmin login) {
		boolean valid = adminServico.validarLogin(login);
		if (valid) {
			return ResponseEntity.status(200).build();
		}
		return ResponseEntity.status(401).build();
	}

	// Cadastro de Admins
	@PostMapping("/cadastrar")
	public ResponseEntity<?> cadastrar(@Valid @RequestBody Administrador administrador) {
		if (adminServico.validacaoGeral(administrador)) {
			adminServico.cadastrar(administrador);
			return ResponseEntity.status(201).build();
		}
		return ResponseEntity.status(422).body("Usuario já existe!");
	}

	// Controle de Estoque

	@GetMapping("/estoque")
	public ResponseEntity<List<ProdutoDTO>> listaDeProdutos() {
		List<ProdutoDTO> estoque = produtoServico.listarProdutos();
		if (!estoque.isEmpty()) {
			return ResponseEntity.status(200).body(estoque);
		}
		return ResponseEntity.status(204).build();
	}

	@PostMapping("/estoque/inserir")
	public ResponseEntity<ProdutoDTO> inserirProduto(@RequestBody ProdutoDTO produto) {
		if (produtoServico.inserirSomenteProduto(produto)) {
			return ResponseEntity.status(201).build();
		}
		return ResponseEntity.status(400).build();
	}

	@PostMapping("/estoque/inserir/imagem")
	public ResponseEntity<?> teste(@RequestParam("arquivoImagem") MultipartFile arquivoImagem) {
		String path = produtoServico.inserirSomenteImagem(arquivoImagem);
		return ResponseEntity.status(201).body(path);
	}

	@DeleteMapping("/estoque/deletar/{id}")
	public ResponseEntity<ProdutoDTO> excluir(@PathVariable Long id) {
		if (produtoServico.excluirProduto(id)) {
			return ResponseEntity.status(200).build();
		}
		return ResponseEntity.status(404).build();
	}

	@PutMapping("/estoque/alterar")
	public ResponseEntity<?> editarProduto(@Valid @RequestBody Produto produto) { // Não pode colocar quantidade //
																					// negativa
		boolean edicaoValida = produtoServico.editarProduto(produto);
		if (edicaoValida) {
			return ResponseEntity.status(200).build();
		}
		return ResponseEntity.status(406).body("Quantidade inválida!");
	}

	@GetMapping("/estoque/busca/{id}")
	public ResponseEntity<Produto> buscarPorId(@Valid @PathVariable Long id) {
		Produto produto = produtoServico.findById(id);
		if (produto != null) {
			return ResponseEntity.status(200).body(produto);
		}
		return ResponseEntity.status(204).build();
	}

	// Controle de Clientes

	@GetMapping("/clientes")
	public ResponseEntity<List<Cliente>> listaDeClientes() {
		List<Cliente> clientes = clienteServico.listarClientes();
		if (!clientes.isEmpty()) {
			return ResponseEntity.status(200).body(clientes);
		}
		return ResponseEntity.status(204).build();
	}

	@PutMapping("/clientes/alterar")
	public ResponseEntity<Cliente> alterarCliente(@Valid @RequestBody Cliente cliente) {
		clienteServico.alterarCliente(cliente);
		return ResponseEntity.status(200).build();
	}

	@PostMapping("/clientes/cadastrar")
	public ResponseEntity<?> cadastroCliente(@Valid @RequestBody ClienteDTO clienteDTO) {
		if (clienteServico.validacaoGeral(clienteDTO)) {
			clienteServico.cadastrarCliente(clienteDTO);
			return ResponseEntity.status(201).build();
		}
		return ResponseEntity.status(422).body("Usuario já existe!");
	}

	@GetMapping("/clientes/buscar/{id}")
	public ResponseEntity<Cliente> buscarCliente(@PathVariable Long id) {
		Cliente cliente = clienteServico.buscarPeloId(id);
		if (cliente != null) {
			return ResponseEntity.status(200).body(cliente);
		}
		return ResponseEntity.noContent().build();
	}

	@PutMapping("/clientes/deletar/{id}")
	public ResponseEntity<?> deletarCliente(@PathVariable Long id) {
		if (clienteServico.deletarCliente(id)) {
			return ResponseEntity.status(200).body("Excluído");
		}
		return ResponseEntity.noContent().build();
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