package br.com.seguranca.model;




import br.com.seguranca.enums.EnumPagamento;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
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
    private Long id;

    @Enumerated(EnumType.STRING)
    private EnumPagamento enumPagamento;

    @ManyToOne
    private Cliente cliente;

    private LocalDateTime dataVenda;

    @OneToMany(mappedBy = "venda")
    private Set<ItemVenda> itens = new HashSet<>();



}
