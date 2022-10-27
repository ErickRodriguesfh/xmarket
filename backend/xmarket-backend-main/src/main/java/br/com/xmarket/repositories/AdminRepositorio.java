package br.com.xmarket.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.xmarket.model.Administrador;


@Repository
public interface AdminRepositorio extends JpaRepository<Administrador, Long>{

	Administrador getByCodigo(String codigo);
	Administrador getByCpf(String cpf);
	Administrador getByRg(String rg);
	Administrador getByEmail(String email);
}
