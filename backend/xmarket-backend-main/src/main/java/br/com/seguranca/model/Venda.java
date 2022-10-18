package br.com.seguranca.model;




import br.com.seguranca.enums.EnumPagamento;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "tabela_venda")
public class Venda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idVenda;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Cliente usuario ;

    @JsonFormat
    private LocalDateTime dataVenda;

    private Double valorTotal;



    @Enumerated(EnumType.STRING)
    private EnumPagamento formaPagamento;


    @OneToMany(mappedBy = "venda", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ItemVenda> itens = new ArrayList<ItemVenda>();



}
