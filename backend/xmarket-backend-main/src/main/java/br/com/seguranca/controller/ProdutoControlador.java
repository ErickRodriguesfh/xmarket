package br.com.seguranca.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
