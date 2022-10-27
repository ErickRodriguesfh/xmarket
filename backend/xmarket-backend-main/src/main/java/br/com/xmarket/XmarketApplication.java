package br.com.xmarket;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class XmarketApplication {

	public static void main(String[] args) {
		SpringApplication.run(XmarketApplication.class, args);
	}

}
