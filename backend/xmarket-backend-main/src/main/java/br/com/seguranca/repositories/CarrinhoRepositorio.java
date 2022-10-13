package br.com.seguranca.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import br.com.seguranca.model.Carrinho;
import br.com.seguranca.model.Cliente;
import br.com.seguranca.model.Produto;

@Repository
public interface CarrinhoRepositorio extends JpaRepository<Carrinho, Long> {


    //buscar carrinho pelo usuario e produto
    public Carrinho findByUsuarioAndProduto(Cliente usuario, Produto produto);


    //buscar o carrinho do usuario pelo id do mesmo
    public List<Carrinho> findByUsuario(Cliente usuario);


    @Query(value = "SELECT * FROM tabela_carrinho WHERE id_usuario = ?1", nativeQuery = true)
    public List<Carrinho> buscarPeloId(Long idUsuario);


    // deletar produto pelo id do cliente e id do produto
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM tabela_carrinho WHERE id_produto =?1 AND id_usuario = ?2", nativeQuery = true)
    public void deletarProduto(Long idProduto , Long idUsuario);


    //Método para incrementar um item no carrinho


    @Query(value = "SELECT quantidade from tabela_produtos WHERE id= ?1", nativeQuery = true)
    public int buscarQuantidade(Long id);

    @Modifying
    @Transactional
    @Query(value = "UPDATE tabela_produtos SET quantidade = ?1 WHERE id = ?2", nativeQuery = true)
    public Integer atualizarQuantidade(Integer quantidade, Long idProduto);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM tabela_carrinho WHERE id_usuario = ?1", nativeQuery = true)
    public void limparCarrinho(Long idUsuario);


    // Método para incrementar um item no carrinho
    @Modifying
    @Transactional
    @Query(value = "UPDATE tabela_carrinho SET valor_digitado = ?1, quantidade=(quantidade+valor_digitado) WHERE id_produto=?2 AND id_usuario=?3", nativeQuery = true)
    public void incrementarUmItemCarrinho(Integer valorDigitado, Long idProduto, Long idUsuario);

    // Método para diminuir um item no carrinho
    @Modifying
    @Transactional
    @Query(value = "UPDATE tabela_carrinho SET valor_digitado = ?1, quantidade=(quantidade-valor_digitado) WHERE id_produto=?2 AND id_usuario=?3", nativeQuery = true)
    public void diminuirUmItemCarrinho(Integer valorDigitado, Long idProduto, Long idUsuario);


}
