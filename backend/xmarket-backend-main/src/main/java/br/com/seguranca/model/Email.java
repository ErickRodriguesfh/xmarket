package br.com.seguranca.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class Email {
	private String mensagem;
	private String remetente;
	private String titulo;
}