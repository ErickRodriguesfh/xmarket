package br.com.xmarket.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.xmarket.model.Produto;

import java.util.List;

@Repository
public interface ProdutoRepositorio extends JpaRepository<Produto, Long>{
    
    @Query(value="SELECT quantidade from tabela_produtos where id = ?1", nativeQuery = true)
    Integer buscarQuantidade(Long id);



    @Query(value = "SELECT * FROM tabela_produtos WHERE categoria = ?1", nativeQuery = true)
    List<Produto> buscarPorCategoria(String categoria);

}
