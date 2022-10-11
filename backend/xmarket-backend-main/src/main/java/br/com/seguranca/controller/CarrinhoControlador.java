package br.com.seguranca.controller;



import java.util.List;

import br.com.seguranca.dto.ProdutoDTO;
import br.com.seguranca.model.Produto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.seguranca.dto.CarrinhoDTO;
import br.com.seguranca.model.Carrinho;
import br.com.seguranca.services.CarrinhoServico;

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
        return ResponseEntity.status(201).build();
    }

    @GetMapping("/exibirCarrinho/{idUsuario}")
    public ResponseEntity<List<CarrinhoDTO>> buscarCarrinho(@PathVariable("idUsuario") Long id){
       List <CarrinhoDTO>  carrinho = carrinhoServico.buscarCarrinho(id);
       if(!carrinho.isEmpty()) {
    	   return ResponseEntity.status(200).body(carrinho);
       }else {
    	   return ResponseEntity.status(204).build();
       }

    }

    
    
    //Diogo Implementou no Banco!!!! ///
    @DeleteMapping("/removerItem/{idProduto}/{idCliente}/{quantidade}")
    public ResponseEntity<CarrinhoDTO> removerItemCarrinho(@PathVariable("idProduto") Long idProduto, @PathVariable("idCliente") Long idCliente,
                                       @PathVariable("quantidade") Integer quantidadeProduto ){
    	if(carrinhoServico.removerProduto(idProduto, idCliente, quantidadeProduto)) {
    		return ResponseEntity.status(200).build();
    	}else {
    		return ResponseEntity.status(400).build();
    	}
    }

    @DeleteMapping("/{idCliente}")
    public void esvaziarCarrinho(@PathVariable("idCliente") Long idCliente){
        carrinhoServico.removerCarrinho(idCliente);
    }

    @PostMapping("/fecharVenda/{idUsuario}")
    public void fecharVenda(@RequestBody List<ProdutoDTO> produtos, @PathVariable("idUsuario") Long idUsuario){
        carrinhoServico.fecharVenda(produtos, idUsuario);
    }


    @PutMapping("/alterar/{ordem}/{id-usuario}/{id-produto}/{nova-quantidade}") // ("/alterar/{ordem}/{id-usuario}/{id-produto}/{nova-quantidade}")
    public ResponseEntity alterarQuantidadeProduto(@PathVariable("ordem") String ordem, @PathVariable("id-usuario") Long idUsuario, @PathVariable("id-produto") Long idProduto , @PathVariable("nova-quantidade") Integer novaQuantidade){

        int quantidade = carrinhoServico.buscarQuantidadeProduto(idProduto);

        if(ordem.equals("AUMENTAR")){
            carrinhoServico.aumentarItemCarrinho(novaQuantidade, idProduto, idUsuario);
        }
        if(ordem.equals("DIMINUIR")){
            carrinhoServico.diminuirItemCarrinho(novaQuantidade, idProduto, idUsuario);
        }

        return ResponseEntity.status(HttpStatus.OK).build();

    }


}
