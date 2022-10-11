package br.com.seguranca.repositories;

import br.com.seguranca.model.Carrinho;
import br.com.seguranca.model.Produto;
import br.com.seguranca.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

@Repository
public interface CarrinhoRepositorio extends JpaRepository<Carrinho, Long> {


    //buscar carrinho pelo usuario e produto
    public Carrinho findByUsuarioAndProduto(Usuario usuario, Produto produto);


    //buscar o carrinho do usuario pelo id do mesmo
    public List<Carrinho> findByUsuario(Usuario usuario);


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





}
