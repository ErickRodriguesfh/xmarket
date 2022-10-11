package br.com.seguranca.services;

import br.com.seguranca.dto.CarrinhoDTO;
import br.com.seguranca.dto.ProdutoDTO;
import br.com.seguranca.dto.RetornoUsuarioDTO;
import br.com.seguranca.enums.EnumPagamento;
import br.com.seguranca.model.Carrinho;
import br.com.seguranca.model.Produto;
import br.com.seguranca.model.Usuario;
import br.com.seguranca.model.Venda;
import br.com.seguranca.repositories.CarrinhoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Service
public class CarrinhoServico {

    @Autowired
    private CarrinhoRepositorio carrinhoRepositorio;

    @Autowired
    private ProdutoServico produtoServico;

    @Autowired
    private UsuarioServico usuarioServico;

	@Autowired
	private VendaServico vendaServico;

    public Carrinho adicionarCarrinho(Long idProduto, Long idUsuario, Integer quantidade) {

		Produto produto = produtoServico.findById(idProduto);
		Usuario usuario = usuarioServico.buscarPeloId(idUsuario);
		Carrinho carrinho = carrinhoRepositorio.findByUsuarioAndProduto(usuario, produto);
		Integer quantidadeAtualizada = quantidade;

		if (carrinho != null) {
			quantidadeAtualizada = carrinho.getQuantidade() + quantidade;
			carrinho.setQuantidade(quantidadeAtualizada);
			carrinho.setProduto(produto);
			carrinho.setUsuario(usuario);
			carrinho.setValorTotal(carrinho.getQuantidade() * carrinho.getProduto().getPreco());
			carrinhoRepositorio.save(carrinho);
		} else {
			carrinho = new Carrinho();
			carrinho.setUsuario(usuario);
			carrinho.setProduto(produto);
			carrinho.setQuantidade(quantidadeAtualizada);
			carrinho.setValorTotal(carrinho.getQuantidade() * carrinho.getProduto().getPreco());
			carrinhoRepositorio.save(carrinho);
		}

		return carrinho;
	}

	public List<CarrinhoDTO> buscarCarrinho(Long id) {
		Usuario usuario = usuarioServico.buscarPeloId(id);
		List<CarrinhoDTO> carrinhos = new ArrayList<>();
		RetornoUsuarioDTO usuarioDTO = new RetornoUsuarioDTO();
		ProdutoDTO produtoDTO = new ProdutoDTO();

		List<Carrinho> carrinho = carrinhoRepositorio.findByUsuario(usuario);
		
		for (Carrinho c : carrinho) {
			usuarioDTO = c.toRetornoUsuarioDTO();
			produtoDTO = c.toProdutoDTO();
			carrinhos.add(new CarrinhoDTO(produtoDTO, usuarioDTO, c.getQuantidade(), c.getValorTotal()));
		}

		return carrinhos;

	}

	public boolean removerProduto(Long idProduto, Long idUsuario, Integer quantidadeProduto) {
		carrinhoRepositorio.deletarProduto(idProduto, idUsuario);
		return true;
	}

	//Função para fechar venda
	public void fecharVenda(List<ProdutoDTO> produtos, Long idUsuario){
		Double valorTotal = 123.232;
		String identificadorVenda= "teste2";
		Usuario usuario = usuarioServico.buscarPeloId(idUsuario);


		for (ProdutoDTO p : produtos){

			int quantidadeNoBanco = buscarQuantidadeProduto(p.getId());

			System.out.println("Quantidade no banco" + quantidadeNoBanco);

			if(p.getQuantidade() <= quantidadeNoBanco){
				Integer novaQuantidade = quantidadeNoBanco - p.getQuantidade();
				carrinhoRepositorio.atualizarQuantidade(novaQuantidade, p.getId());
				carrinhoRepositorio.limparCarrinho(idUsuario);
				Venda venda = new Venda(null, identificadorVenda, p.toProduto(), usuario, LocalDateTime.now()
						, valorTotal,
						EnumPagamento.PIX);
				vendaServico.fecharVenda(venda);
			}else{
				System.out.println("Produto insuficiente no estoque");

			}

		}

	}

	public void aumentarItemCarrinho(Integer valorDigitado, Long idProduto, Long idUsuario){

		carrinhoRepositorio.incrementarUmItemCarrinho(valorDigitado, idProduto, idUsuario);

   }

   public void diminuirItemCarrinho(Integer valorDigitado, Long idProduto, Long idUsuario){

	   carrinhoRepositorio.diminuirUmItemCarrinho(valorDigitado, idProduto, idUsuario);

   }


	public int buscarQuantidadeProduto(Long id){

		return carrinhoRepositorio.buscarQuantidade(id);

	}


}
