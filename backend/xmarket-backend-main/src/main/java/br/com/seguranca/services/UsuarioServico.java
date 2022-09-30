package br.com.seguranca.services;

import br.com.seguranca.dto.UsuarioDTO;
import br.com.seguranca.model.Login;
import br.com.seguranca.model.Usuario;
import br.com.seguranca.repositories.UsuarioRepositorio;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

@Service
public class UsuarioServico {

    @Autowired
    private UsuarioRepositorio usuarioRepository;






    public Usuario salvarUsuario(UsuarioDTO usuarioDTO){

        Usuario usuario = new Usuario();

        BeanUtils.copyProperties(usuarioDTO, usuario);

        return   usuarioRepository.save(usuario);


    }

    public Usuario validandoUsuario(Login login){
        Usuario newObj = new Usuario();

        newObj =  usuarioRepository.findByUsuario(login.getUsuario());

        return newObj;
    }


}
