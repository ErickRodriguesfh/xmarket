package br.com.seguranca.model;


import br.com.seguranca.dto.ProdutoDTO;
import br.com.seguranca.enums.EnumPagamento;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tabela_venda")
public class Venda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @GeneratedValue(strategy = GenerationType.AUTO)
    private String identificadorVenda;

    @ManyToOne
    @JoinColumn(name = "id_produto")
    private Produto produto;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Cliente usuario ;

    @JsonFormat
    private LocalDateTime dataVenda;

    private Double valorTotal;

    @Enumerated(EnumType.STRING)
    private EnumPagamento formaPagamento;



}
