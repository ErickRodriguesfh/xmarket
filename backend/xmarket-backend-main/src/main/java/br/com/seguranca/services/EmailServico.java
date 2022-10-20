package br.com.seguranca.services;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import br.com.seguranca.model.Email;

@Service
public class EmailServico {

	
	@Autowired
	private JavaMailSender mailSender;
	
	@Value("${support.mail}")
	private String supportMail;
	
	
	public void enviarEmail(Email email) throws MessagingException {
		MimeMessage mail = mailSender.createMimeMessage();
		
		MimeMessageHelper message = new MimeMessageHelper(mail);
		
		message.setSubject(email.getTitulo());
		message.setText(email.getMensagem());
		message.setFrom(supportMail);
		
		message.setTo(email.getRemetente());
		
		mailSender.send(mail);
	}
	
}
