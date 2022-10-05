package br.com.seguranca.controller;



import br.com.seguranca.dto.CarrinhoDTO;
import br.com.seguranca.model.Carrinho;
import br.com.seguranca.services.CarrinhoServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/carrinho")
public class CarrinhoControlador {

    @Autowired
    private CarrinhoServico carrinhoServico;


    @PostMapping("/adicionar/{idProduto}/{idUsuario}/{quantidade}")
    public ResponseEntity<Carrinho> AdicionarItemAoCarrinho(@PathVariable("idProduto") Long idProduto,
                                                            @PathVariable("idUsuario") Long idUsuario,
                                                            @PathVariable("quantidade")Integer quantidade){

        carrinhoServico.adicionarCarrinho(idProduto,idUsuario,quantidade);
        return ResponseEntity.status(HttpStatus.OK).build();

    }

    @GetMapping("/exibirCarrinho/{idUsuario}")
    public ResponseEntity<List<CarrinhoDTO>> buscarCarrinho(@PathVariable("idUsuario") Long id){

       List <CarrinhoDTO>  carrinho = carrinhoServico.buscarCarrinho(id);
        return ResponseEntity.ok().body(carrinho);

    }

    @DeleteMapping("/removerItem/{idProduto}/{idCliente}/{quantidade}")
    public String removerItemCarrinho(@PathVariable("idProduto") Long idProduto, @PathVariable("idCliente") Long idCliente,
                                       @PathVariable("quantidade") Integer quantidadeProduto ){

        carrinhoServico.removerProduto(idProduto, idCliente, quantidadeProduto);
        return "Produto removido com sucesso";
    }




}
