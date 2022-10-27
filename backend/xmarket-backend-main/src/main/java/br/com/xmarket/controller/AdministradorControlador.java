package br.com.xmarket.controller;

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

import br.com.xmarket.dto.ClienteDTO;
import br.com.xmarket.dto.ProdutoDTO;
import br.com.xmarket.model.Administrador;
import br.com.xmarket.model.Cliente;
import br.com.xmarket.model.LoginAdmin;
import br.com.xmarket.model.Produto;
import br.com.xmarket.services.AdminServico;
import br.com.xmarket.services.ClienteServico;
import br.com.xmarket.services.ProdutoServico;

@CrossOrigin("*")
@RestController
@RequestMapping("/administrador")
public class AdministradorControlador {

	@SuppressWarnings("unused")
	private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	@Autowired
	private AdminServico adminServico;
	@Autowired
	private ProdutoServico produtoServico;
	@Autowired
	private ClienteServico clienteServico;

	// Login do administrador
	@PostMapping
	public ResponseEntity<Administrador> logar(@Valid @RequestBody LoginAdmin login) {
		boolean valid = adminServico.validarLogin(login);
		if (valid) {
			return ResponseEntity.status(200).build();
		}
		return ResponseEntity.status(401).build();
	}

	// Cadastrar usuario administrador
	@PostMapping("/cadastrar")
	public ResponseEntity<?> cadastrarAdministrador(@Valid @RequestBody Administrador administrador) {
		if (adminServico.validacaoGeral(administrador)) {
			adminServico.cadastrar(administrador);
			return ResponseEntity.status(201).build();
		}
		return ResponseEntity.status(422).body("Usuario já existe!");
	}


	// Listar todos os produtos do banco de dados
	@GetMapping("/estoque")
	public ResponseEntity<List<ProdutoDTO>> listarProdutos() {
		List<ProdutoDTO> estoque = produtoServico.listarProdutos();
		if (!estoque.isEmpty()) {
			return ResponseEntity.status(200).body(estoque);
		}
		return ResponseEntity.status(204).build();
	}

	// cadastrar um produto no sistema
	@PostMapping("/estoque/cadastrar")
	public ResponseEntity<ProdutoDTO> cadastrarProduto(@RequestBody ProdutoDTO produto) {
		if (produtoServico.inserirSomenteProduto(produto)) {
			return ResponseEntity.status(201).build();
		}
		return ResponseEntity.status(400).build();
	}

	//Inserir uma imagem para anéxa-la ao produto
	@PostMapping("/estoque/cadastrar-imagem")
	public ResponseEntity<?> cadastrarImagem(@RequestParam("arquivoImagem") MultipartFile arquivoImagem) {


		String path = produtoServico.inserirSomenteImagem(arquivoImagem);

		if(!path.isBlank()){
			return ResponseEntity.status(201).body(path);
		}

		return ResponseEntity.status(400).build();

	}

	@PutMapping("/estoque/deletar/{id}")
	public ResponseEntity<String> zerarQuantidade(@PathVariable Long id) {
		if (produtoServico.excluirProduto(id)) {
			return ResponseEntity.status(204).body("Estoque do produto zerado");
		}
		return ResponseEntity.status(404).build();
	}

	@PutMapping("/estoque/editar")
	public ResponseEntity<?> editarProduto(@Valid @RequestBody Produto produto) { // Não pode colocar quantidade //
																					// negativa
		boolean edicaoValida = produtoServico.editarProduto(produto);
		if (edicaoValida) {
			return ResponseEntity.status(200).build();
		}
		return ResponseEntity.status(406).body("Quantidade inválida!");
	}

	@GetMapping("/estoque/buscar/{id}")
	public ResponseEntity<Produto> buscarPorId(@Valid @PathVariable Long id) {
		Produto produto = produtoServico.findById(id);
		if (produto != null) {
			return ResponseEntity.status(200).body(produto);
		}
		return ResponseEntity.status(404).build();
	}

	// Controle de Clientes

	@GetMapping("/clientes")
	public ResponseEntity<List<Cliente>> listarClientes() {
		List<Cliente> clientes = clienteServico.listarClientes();
		if (!clientes.isEmpty()) {
			return ResponseEntity.status(200).body(clientes);
		}
		return ResponseEntity.status(204).build();
	}

	@PutMapping("/clientes/editar")
	public ResponseEntity<Cliente> editarCliente(@Valid @RequestBody Cliente cliente) {

	boolean valido = clienteServico.alterarCliente(cliente);
		if(valido){
			return ResponseEntity.status(200).build();
		}
		return ResponseEntity.status(404).build();
	}


	@PostMapping("/clientes/cadastrar")
	public ResponseEntity<?> cadastrarCliente(@Valid @RequestBody ClienteDTO clienteDTO) {
		if (clienteServico.validacaoGeral(clienteDTO)) {
			clienteServico.cadastrarCliente(clienteDTO);
			return ResponseEntity.status(201).build();
		}
		return ResponseEntity.status(200).body("Usuario já existe!");
	}

	@GetMapping("/clientes/buscar/{id}")
	public ResponseEntity<Cliente> buscarClientePorId(@PathVariable Long id) {
		Cliente cliente = clienteServico.buscarPeloId(id);
		if (cliente != null) {
			return ResponseEntity.status(200).body(cliente);
		}
		return ResponseEntity.status(404).build();
	}

	@PutMapping("/clientes/deletar/{id}")
	public ResponseEntity<?> deletarCliente(@PathVariable Long id) {
		if (clienteServico.deletarCliente(id)) {
			return ResponseEntity.status(200).body("Excluído");
		}
		return ResponseEntity.status(204).build();
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