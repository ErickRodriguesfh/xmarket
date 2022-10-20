package br.com.seguranca.controller;

import br.com.seguranca.services.JasperServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
public class JasperControlador {



    @Autowired
    private JasperServico service;



    @GetMapping("/xmarket/pdf/jr1")
    public void exibirRelatorio01(@RequestParam("code") String code, @RequestParam("acao") String acao,
                                  HttpServletResponse response) throws IOException { //resposta em relaçao a nossa requisição, não retornando nada

        byte[] bytes = service.exportarPDF(code);  // meu relatorio sera transformado em uma array e sera retornado para bytes

        response.setContentType(MediaType.APPLICATION_PDF_VALUE); //vai receber o tipo de midia, nesse caso o PDF
        if(acao.equals("v")) {
            //inline:fala com navegador que o pdf será aberto por ele,senão o navegador não for compativel será feito  download

            response.setHeader("Content-disposition","inline;filename=relatorio-"+code+".pdf");
        }
        else {
            //attachment: fala para o navegador que não deseja abrir o relatorio, mas quer salvar em algum diretorio
            response.setHeader("Content-disposition","attachment;filename=relatorio-"+code+".pdf");
        }
        response.getOutputStream().write(bytes);
    }












}
