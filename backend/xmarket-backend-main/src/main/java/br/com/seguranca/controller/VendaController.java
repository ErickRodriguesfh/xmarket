package br.com.seguranca.controller;



import br.com.seguranca.dto.VendaDTO;
import br.com.seguranca.model.Venda;
import br.com.seguranca.services.VendaServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin("*")
@RestController
@RequestMapping("/venda")
public class VendaController {
    @Autowired
    private VendaServico vendaServico;


    @PostMapping("/{idCliente}")
    public ResponseEntity<String> criarVenda (@PathVariable("idCliente") Long idCliente, @RequestBody VendaDTO vendaDTO){

        String mensagemErro =   vendaServico.criarVenda(idCliente, vendaDTO);



        if(mensagemErro != ""){
            System.out.println("----------------MENSAGEM ERRO----------------");
            System.out.println(mensagemErro);
            return ResponseEntity.ok(mensagemErro);
        }
        return ResponseEntity.status(HttpStatus.OK).build();

    }

}
