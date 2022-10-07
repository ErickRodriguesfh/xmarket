package br.com.seguranca.model;

import br.com.seguranca.dto.CarrinhoDTO;
import br.com.seguranca.enums.EnumPagamento;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;


@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "tabela_venda")
public class Venda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated
    private EnumPagamento enumPagamento;

    private LocalDateTime dataVenda;

    private String nomeProduto;

    private Double valorUnitario;

    private Integer quantidadeTotal;

    private Double valorTotal;




}
