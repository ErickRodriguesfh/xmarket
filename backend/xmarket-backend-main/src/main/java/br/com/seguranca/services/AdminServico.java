package br.com.seguranca.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.seguranca.model.Administrador;
import br.com.seguranca.model.LoginAdmin;
import br.com.seguranca.repositories.AdminRepositorio;
import br.com.seguranca.repositories.ClienteRepositorio;

@Service
public class AdminServico {
	
	@Autowired
	private AdminRepositorio adminRepositorio;
	
	@Autowired
	private ClienteRepositorio clienteRepositorio;
	
	private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	
	public Administrador cadastrar(Administrador administrador) {	
	     String encoder = this.passwordEncoder.encode(administrador.getSenha()); /* Criptografa a senha */
	     administrador.setSenha(encoder);/* Seta a senha criptografada */
	     return adminRepositorio.save(administrador);
	}
	
	public boolean validarLogin(LoginAdmin login) {
		Administrador administrador = adminRepositorio.getByCodigo(login.getCodigo());
		if(administrador == null) {
			 return false;
		}
			String senha = adminRepositorio.getByCodigo(login.getCodigo()).getSenha(); /* Filtra pelo email, se caso email existir pega a senha */
		    boolean valid = passwordEncoder.matches(login.getSenha(), senha); /* Compara a senha digitada com a senha do banco de dados criptografada */
		    return valid;
	}
	
}
