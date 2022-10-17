package br.com.seguranca.services;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.seguranca.dto.ProdutoDTO;
import br.com.seguranca.model.Produto;
import br.com.seguranca.repositories.ProdutoRepositorio;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ProdutoServico {

	@Autowired
	private ProdutoRepositorio produtoRepository;



	public Produto inserirProduto(ProdutoDTO produtoDTO, MultipartFile arquivoImagem) {
		Produto produto = new Produto();
		BeanUtils.copyProperties(produtoDTO, produto);


		try {
			String diretorioImagens = "C:\\imagens";
			byte[] bytes = arquivoImagem.getBytes();
		Path path = Paths.get(diretorioImagens + arquivoImagem.getOriginalFilename());
			Files.write(path, bytes);

		}catch (Exception e){
			e.printStackTrace();
		}




		return produtoRepository.save(produto);
	}
	
	
	public List<ProdutoDTO> listarProdutos (){
		List <Produto> produtos = new ArrayList<>();
		List<ProdutoDTO> produtoDTOS = new ArrayList<>();
		produtos = produtoRepository.findAll();
		for(Produto p : produtos){
			produtoDTOS.add(p.toProdutoDTO());
		}
		return produtoDTOS;
	}
	
	public boolean excluirProduto(Long id) {
		produtoRepository.deleteById(id);
		return true;
	}
	
	
	public boolean editarProduto(Produto produto) {
		if(quantidadeValida(produto)) {
			Produto produtoEditado = produtoRepository.save(produto);
			return true;
		}
		return false;
	}
	
	public Produto findById(Long id){
		Produto produto = new Produto();
		produto = produtoRepository.findById(id).get();
		return produto;
	}
	
	
	
	//Validações
	
	public boolean quantidadeValida(Produto produto) {
		if(produto.getQuantidade() < 0) {
			return false;
		}
		return true;
	}
	
}
