package br.com.seguranca.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.seguranca.model.Produto;
import br.com.seguranca.repositories.ProdutoRepository;

@Service
public class ProdutoService {

	@Autowired
	private ProdutoRepository produtoRepository;



	public Produto inserirProduto(Produto produto) {
		return produtoRepository.save(produto);
	}
	
	
	public List<Produto> listarProdutos (){
		List <Produto> produtos = new ArrayList<>();
		produtos = produtoRepository.findAll();
		return produtos;
	}

	public Produto findById(Long id){
		Produto produto = new Produto();
		produto = produtoRepository.findById(id).get();
		return produto;
	}




}
