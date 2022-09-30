package br.com.seguranca.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.seguranca.model.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long>{

}
