package br.com.seguranca.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tabela_usuarios")
public class Usuario {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String usuario;
    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "senha")
    private String senha;

    private String role;

    @Column(name = "cpf", length = 14,unique = true)
    private String cpf;

    private String telefone;

    private String endereco;
    @Column(name = "rg", unique = true)
    private String rg;



}
