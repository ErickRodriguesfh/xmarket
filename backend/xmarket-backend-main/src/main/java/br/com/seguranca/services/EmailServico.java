package br.com.seguranca.services;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import br.com.seguranca.model.Email;
import org.springframework.util.ResourceUtils;

import java.io.*;
import java.sql.Connection;
import java.util.HashMap;
import java.util.Map;

@Service
public class EmailServico {

	private static final String JASPER_DIRETORIO = "classpath:jasper/";
	private static final String JASPER_PREFIXO = "xmarket-";    //Prefixo será os nomes iniciais do relatorio
	private static final String JASPER_SUFIXO = ".jasper";  //sera a extensao do arquivo


	private Map<String, Object> params = new HashMap<>();

	public void addParams(String key,Object value) {
		this.params.put(key, value);
	}

	@Autowired
	private Connection connection;

	@Autowired
	private JavaMailSender mailSender;
	
	@Value("${support.mail}")
	private String supportMail;
	
	//Método para enviar email com comprovante da compra após a compra ser criada
	public void enviarEmailNotaFiscal(Long id_venda, String emailCliente, String nomeCliente) throws MessagingException, JRException, IOException {

		addParams("ID_VENDA", id_venda);

		byte[] bytes = null;
		File file = ResourceUtils.getFile(JASPER_DIRETORIO.concat(JASPER_PREFIXO).concat("05").
				concat(JASPER_SUFIXO));
		JasperPrint print = JasperFillManager.fillReport(file.getAbsolutePath(), params, connection); //acessando o relatorio
		bytes = JasperExportManager.exportReportToPdf(print);

		File attachmentfile = new File("Comprovante");
		OutputStream os = new FileOutputStream(attachmentfile);
		os.write(bytes);
		os.close();


		new Thread() {

			@Override
			public void run() {
				try {
					MimeMessage mail = mailSender.createMimeMessage();

					MimeMessageHelper message = new MimeMessageHelper(mail, true);

					message.setSubject("XMarket - Compra Finalizada!😀");
					message.setText("Olá " + nomeCliente + " Obrigado pela preferência seu pedido está " +
							"sendo preparado e logo será enviado, a sua nota fiscal segue em anéxo");
					message.setFrom(supportMail);
					message.setTo(emailCliente);
					message.addAttachment("NotaFiscal.pdf", attachmentfile);

					mailSender.send(mail);
				}catch (Exception e){
					e.printStackTrace();
				}
			}
		}.start();
	}


	public void enviarEmailCadastro(Email email) throws MessagingException {
		MimeMessage mail = mailSender.createMimeMessage();

		MimeMessageHelper message = new MimeMessageHelper(mail);

		message.setSubject(email.getTitulo());
		message.setText(email.getMensagem());
		message.setFrom(supportMail);

		message.setTo(email.getRemetente());

		mailSender.send(mail);
	}






	
}
