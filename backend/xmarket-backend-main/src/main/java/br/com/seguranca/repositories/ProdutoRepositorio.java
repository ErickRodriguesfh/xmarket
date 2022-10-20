package br.com.seguranca.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.seguranca.model.Produto;

@Repository
public interface ProdutoRepositorio extends JpaRepository<Produto, Long>{
    
    @Query(value="SELECT quantidade from tabela_produtos where id = ?1", nativeQuery = true)
    Integer buscarQuantidade(Long id);
}
