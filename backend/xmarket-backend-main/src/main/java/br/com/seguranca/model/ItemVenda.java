package br.com.seguranca.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "item_venda")
public class ItemVenda  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private Integer quantidade;

    private Double preco;

    @ManyToOne
    @JoinColumn(name = "id_produto")
    private Produto produtos;

    @ManyToOne
    @JoinColumn(name = "id_venda")
    private Venda venda;




































}
