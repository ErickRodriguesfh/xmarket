package br.com.seguranca.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.seguranca.model.Administrador;


@Repository
public interface AdminRepositorio extends JpaRepository<Administrador, Long>{

	Administrador getByCodigo(String codigo);
	
}
