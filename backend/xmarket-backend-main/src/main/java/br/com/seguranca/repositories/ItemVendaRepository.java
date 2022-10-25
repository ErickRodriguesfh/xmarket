package br.com.seguranca.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.seguranca.model.ItemVenda;

@Repository
public interface ItemVendaRepository extends JpaRepository<ItemVenda, Long> {

}




