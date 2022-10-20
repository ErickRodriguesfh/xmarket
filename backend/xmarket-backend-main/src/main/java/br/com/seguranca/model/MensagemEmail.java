package br.com.seguranca.model;

public class MensagemEmail {
	 
	public String msgCadastro(String nome) {
		
	String msgCadastro = String.format("Olá %s,%n"
			+ "Obrigado por se cadastrar, estamos muito felizes com sua presença! %n"
			+ "Boas compras!%n"
			+ "%n%n%n%n%n%n%n"
			+ "XMarket",nome);
	
	return msgCadastro;
	
	}
	public String msgVenda(String nome) {
	
	String msgVenda = String.format("Olá %s,%n"
			+ "Obrigado por confiar em nós, sua compra foi finalizada com sucesso! %n"
			+ "%n%n%n%n%n%n%n"
			+ "XMarket",nome);
	
	return msgVenda;
	
	}
}
