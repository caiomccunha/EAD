package rhAPI.demo.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table (name= "funcionarios")
@Getter
@Setter
@NoArgsConstructor

public class funcionariosModel {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (length = 200, nullable = false)
    private String nome;
    @Column (length = 300, nullable = false, unique = true)
    private String email;
    @Column (length = 100, nullable = false)
    private String senha;
    @Column (length = 8, nullable = false)
    private String cep;
    @Column (length = 100, nullable = false)
    private String endereco;
    @Column (length = 10, nullable = false)
    private String numero;
    @Column (length = 100, nullable = false)
    private String bairro;
    @Column (length = 100, nullable = false)
    private String cidade;
    @Column (length = 100, nullable = false )
    private String estado;
}
