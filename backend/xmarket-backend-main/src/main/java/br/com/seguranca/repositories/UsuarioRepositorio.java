package br.com.seguranca.repositories;

import br.com.seguranca.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepositorio extends JpaRepository <Usuario, Long> {


    Usuario findByUsuario(String usuario);

}
