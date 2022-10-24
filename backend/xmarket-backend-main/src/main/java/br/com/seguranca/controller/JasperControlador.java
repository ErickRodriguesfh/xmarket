package br.com.seguranca.controller;

import br.com.seguranca.excel.ExportarExcelProdutos;
import br.com.seguranca.excel.ExportarExcelVendas;
import br.com.seguranca.model.ItemVenda;
import br.com.seguranca.model.Produto;
import br.com.seguranca.model.Venda;
import br.com.seguranca.repositories.VendaRepositorio;
import br.com.seguranca.services.JasperServico;
import br.com.seguranca.services.ProdutoServico;
import br.com.seguranca.services.VendaServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Date;
import java.util.List;

@CrossOrigin("*")
@RestController
public class JasperControlador {



    @Autowired
    private JasperServico service;

    @Autowired
    private VendaServico vendaServico;


    @Autowired
    private VendaRepositorio vendaRepositorio;

    @Autowired
    private ProdutoServico produtoServico;

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

   // yyyy/MM/dd
    // dd/MM/yyyy

    @GetMapping("/xmarket/pdf/jr2/{code}")
    public void exibirRelatorio02(@PathVariable("code") String code,     //pathvariable recebe o parametro a partir da url
                                  @RequestParam(name="data_inicio",required =false) Date data_inicio,    //coloco required false, porque não é obrigatório para fazer busca no 09
                                  @RequestParam(name="data_final",required =false) Date data_final,
                                  HttpServletResponse response) throws IOException { //resposta em relaçao a nossa requisição, não retornando nada
        


        service.addParams("DATA_INICIO", data_inicio);  //como é string deve mandar essa condição para a string não chegar vazio
        service.addParams("DATA_FIM", data_final);
        byte[] bytes = service.exportarPDF(code);  // meu relatorio sera transformado em uma array e sera retornado para bytes
        response.setHeader("Content-disposition","inline;filename=relatorio-"+code+".pdf");
        response.setContentType(MediaType.APPLICATION_PDF_VALUE); //vai receber o tipo de midia, nesse caso o PDF
        response.getOutputStream().write(bytes);
    }


    //MEtodos responsaveis por preencher a lista
    @ModelAttribute("data_inicio")
    public List<String> getDataInicio(){
        return vendaRepositorio.findDataInicio();
    }

    @ModelAttribute("data_final")
    public List <String> getDataFinal(){
        return vendaRepositorio.findDataFinal();
    }


    @GetMapping("/exportar-excel-produtos")
    public void exportarParaExcelProdutos(HttpServletResponse response) throws IOException{

        List<Produto> produtos = produtoServico.buscarTodos();


        ExportarExcelProdutos exportarExcelProdutos = new ExportarExcelProdutos();
        exportarExcelProdutos.exportar(produtos, response);

    }

    @GetMapping("/exportar-excel-vendas")
    public void exportarParaExcelVendas(HttpServletResponse response) throws  IOException{

      List<ItemVenda> itensVendas =  vendaServico.buscarItemVenda();
      List<Venda> vendas = vendaRepositorio.findAll();

      ExportarExcelVendas exportarVendas = new ExportarExcelVendas();
      exportarVendas.exportar(itensVendas,  response);

    }







}
