package br.com.xmarket.services;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import br.com.xmarket.dto.ProdutoDTO;
import br.com.xmarket.model.Produto;
import br.com.xmarket.repositories.ProdutoRepositorio;

@Service
public class ProdutoServico {

	@Autowired
	private ProdutoRepositorio produtoRepository;

	public List<ProdutoDTO> listarProdutos() {
		List<Produto> produtos = new ArrayList<>();
		List<ProdutoDTO> produtoDTOS = new ArrayList<>();
		produtos = produtoRepository.findAll();
		for (Produto p : produtos) {
			produtoDTOS.add(p.toProdutoDTO());
		}
		return produtoDTOS;
	}

	public boolean inserirSomenteProduto(ProdutoDTO produtoDTO) {
		Produto produto = new Produto();
		BeanUtils.copyProperties(produtoDTO, produto);
		if (quantidadeValida(produto)) {
			produtoRepository.save(produto);
			return true;
		}
		return false;
	}

	public String inserirSomenteImagem(MultipartFile arquivoImagem) {
		Path path = Paths.get("");
		try {
			// "C:\\Users\\00787701\\Desktop\\github\\xmarket-1\\frontend\\xmarket-front\\assets\\produtos"
			String diretorioImagens = "..\\..\\imagens-produtos\\"; // frontend/xmarket-front/assets/produtos/ //
																	// ..\\..\\frontend\\xmarket-front\\assets\\produtos\\
			byte[] bytes = arquivoImagem.getBytes();
			path = Paths.get(diretorioImagens + arquivoImagem.getOriginalFilename());
			Files.write(path, bytes);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return (path.toString());
	}

	public boolean excluirProduto(Long id) {
		Produto produto = findById(id);
		if (produto != null) {
			produtoRepository.deleteById(id);
			return true;
		}
		return false;
	}

	public boolean editarProduto(Produto produto) {
		if (quantidadeValida(produto)) {
			produtoRepository.save(produto);
			return true;
		}
		return false;
	}

	public Produto findById(Long id) {
		Produto produto = new Produto();
		produto = produtoRepository.findById(id).orElse(null);
		return produto;
	}

	// Validações//////////////////////////////////////////////////////
	public boolean quantidadeValida(Produto produto) {
		if (produto.getQuantidade() < 0) {
			return false;
		}
		return true;
	}

	public Integer buscarQuantidade(Long id) {
		return produtoRepository.buscarQuantidade(id);

	}

	public List<Produto> buscarTodos(){
		return produtoRepository.findAll();
	}


	public List<ProdutoDTO> buscarPorCategoria(String categoria){
		List<Produto> produtos = new ArrayList<>();
		List<ProdutoDTO> produtoDTOS = new ArrayList<>();
		produtos = produtoRepository.buscarPorCategoria(categoria);
		for (Produto p : produtos) {
			produtoDTOS.add(p.toProdutoDTO());
		}
		return produtoDTOS;
	}

}


