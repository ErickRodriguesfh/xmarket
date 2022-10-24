package br.com.seguranca.repositories;

import br.com.seguranca.model.Venda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface VendaRepositorio extends JpaRepository<Venda, Long> {

    @Modifying
    @Transactional
    @Query(value ="select v.data_venda from tabela_venda v", nativeQuery = true)
    List<String> findDataInicio();

    @Modifying
    @Transactional
    @Query(value ="select v.data_venda from tabela_venda v", nativeQuery = true)
    List<String> findDataFinal();





}
