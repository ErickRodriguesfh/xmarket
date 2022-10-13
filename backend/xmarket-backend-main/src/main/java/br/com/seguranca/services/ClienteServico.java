package br.com.seguranca.services;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.seguranca.dto.ClienteDTO;
import br.com.seguranca.model.Login;
import br.com.seguranca.model.Cliente;
import br.com.seguranca.repositories.ClienteRepositorio;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClienteServico {

    @Autowired
    private ClienteRepositorio usuarioRepository;
   
	private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    //Método para verificar se exitem email,cpf e rg já cadastrados no banco de dados
    public boolean validarCadastro(ClienteDTO usuarioDTO) {
        Cliente usuario = new Cliente();
        usuario = usuarioRepository.getByEmail(usuarioDTO.getEmail());
        usuario = usuarioRepository.getByCpf(usuarioDTO.getCpf());
        usuario = usuarioRepository.getByRg(usuarioDTO.getRg());
        if(usuario == null) {
            return true;
        }
        return false;

    }

    public Cliente cadastrarUsuario(ClienteDTO usuarioDTO) {
        Cliente usuario = new Cliente();/* Instancia um objeto usuario */
        String encoder = this.passwordEncoder.encode(usuarioDTO.getSenha()); /* Criptografa a senha */
        usuarioDTO.setSenha(encoder);/* Seta a senha criptografada */
        BeanUtils.copyProperties(usuarioDTO, usuario); /*Passa as propriedades de DTO para o objeto*/
        return usuarioRepository.save(usuario);//Salva o objeto com a senha criptograda
    }



    public boolean validarLogin(Login login) {
        Cliente usuario = usuarioRepository.getByEmail(login.getEmail());//Verifica se o existe usuario com o email digitado, caso nao exista ele retorna false
        if (usuario == null) { /*Caso o objeto seja nulo ou vazio retorna um false*/
            return false;
        } else {
            String senha = usuarioRepository.getByEmail(login.getEmail()).getSenha(); /* Filtra pelo email, se caso email existir pega a senha */
            boolean valid = passwordEncoder.matches(login.getSenha(), senha); /* Compara a senha digitada com a senha do banco de dados criptografada */
            return valid; /*Se as senhas coíncidem retorna true, senão, retorna false*/
        }

    }

    public Cliente buscarPeloId(Long id) {
        return usuarioRepository.findById(id).get();
    }



}
