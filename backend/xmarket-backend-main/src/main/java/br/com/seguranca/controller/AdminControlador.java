package br.com.seguranca.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.seguranca.dto.ProdutoDTO;
import br.com.seguranca.model.Administrador;
import br.com.seguranca.model.LoginAdmin;
import br.com.seguranca.model.Produto;
import br.com.seguranca.services.AdminServico;
import br.com.seguranca.services.ProdutoServico;

@RestController
@RequestMapping("/admin")
public class AdminControlador {
	
	@Autowired
	private AdminServico adminServico;
	
	
	@Autowired
	private ProdutoServico produtoServico;
	
	
	//Login
	@PostMapping
	 public ResponseEntity<Administrador> login(@RequestBody LoginAdmin login){
		 boolean valid = adminServico.validarLogin(login);
			if (valid) {
				return ResponseEntity.status(200).build();
			}
			return ResponseEntity.status(401).build(); 	
	 }
	 
	 
	 //Cadastro de Admins
	@PostMapping("/cadastrar")
	 public ResponseEntity<Administrador> cadastrar(@RequestBody Administrador administrador){
		adminServico.cadastrar(administrador);
		return ResponseEntity.status(201).build();
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
	
	
	@PutMapping("/estoque/editar")
	public ResponseEntity editarProduto(@RequestBody Produto produto){ //Não pode colocar quantidade negativa
		boolean edicaoValida = produtoServico.editarProduto(produto);
		if(edicaoValida) {
			return ResponseEntity.status(200).build();
		}
		return ResponseEntity.status(406).body("Quantidade inválida!");
	}
	
	
	@GetMapping("/estoque/busca/{id}")
	public ResponseEntity<Produto> buscarPorId(Long id){
		return ResponseEntity.status(200).body(produtoServico.findById(id));
	}
	
	
	
	//Controle de Clientes


	
}
