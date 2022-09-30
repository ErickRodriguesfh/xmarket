package br.com.seguranca.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import br.com.seguranca.model.Produto;
import br.com.seguranca.services.ProdutoServico;

@RestController
@RequestMapping("/produtos")
public class ProdutoControlador {


	@Autowired
	private ProdutoServico produtoService;

	
	@GetMapping
	public List<Produto> buscarTodos(){
		return produtoService.listarProdutos();
	}
	
	@PostMapping
	public Produto inserirProduto (@RequestBody Produto produto) {
		return produtoService.inserirProduto(produto);
		
	}









}
