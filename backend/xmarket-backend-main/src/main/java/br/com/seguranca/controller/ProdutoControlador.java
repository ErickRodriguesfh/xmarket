package br.com.seguranca.controller;

import java.util.List;

import br.com.seguranca.model.Produto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.seguranca.dto.ProdutoDTO;
import br.com.seguranca.services.ProdutoServico;


@CrossOrigin("*")
@RestController
@RequestMapping("/produtos")
public class ProdutoControlador {


	@Autowired
	private ProdutoServico produtoService;

	
	@GetMapping
	public List<ProdutoDTO> buscarTodos(){

		return produtoService.listarProdutos();
	}

	@GetMapping("/categoria")
	public ResponseEntity<List<ProdutoDTO>> buscarPorCategoria(@RequestParam("categoria") String categoria){

		return ResponseEntity.ok(produtoService.buscarPorCategoria(categoria));
	}










}
