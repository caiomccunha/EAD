package rhAPI.demo.Model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;

import java.time.LocalDate;

import jakarta.persistence.*;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "funcionario_por_cargo")
@Getter
@Setter
@NoArgsConstructor
public class fCModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 400, nullable = false)
    private String detalhes;

    @ManyToOne
    @JoinColumn(name = "funcionario_id", nullable = false)
    private funcionariosModel funcionario;

    @ManyToOne
    @JoinColumn(name = "cargo_id", nullable = false)
    private cargosModel cargo;

    @Column(name = "data_inicio", nullable = false)
    private LocalDate data_inicio;

    @Column(name = "data_fim")
    private LocalDate data_fim;
}
