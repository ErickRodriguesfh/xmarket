package br.com.seguranca.controller;

import br.com.seguranca.dto.UsuarioDTO;
import br.com.seguranca.model.Login;
import br.com.seguranca.model.Usuario;
import br.com.seguranca.services.UsuarioServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;

@RestController
public class UsuarioControlador {


    @Autowired
    private UsuarioServico usuarioService;

    @PostMapping("/cadastrar")
    public void inserirUsuario(@RequestBody UsuarioDTO usuarioDTO){

     usuarioService.salvarUsuario(usuarioDTO);

    }


   @PostMapping("/login")
    public ResponseEntity<Usuario>  login (@RequestBody Login login){




        Usuario cliente = usuarioService.validandoUsuario(login);

       System.out.println(login.getUsuario() + login.getSenha());

       System.out.println(cliente.getUsuario() + cliente.getSenha());

       if(login.getUsuario().equals(cliente.getUsuario())  && login.getSenha().equals(cliente.getSenha())){

           return ResponseEntity.status(200).build();

       }



       System.out.println("Não validado");

       return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();


    }




}
