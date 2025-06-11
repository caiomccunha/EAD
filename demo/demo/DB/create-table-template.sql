use rh_tech;

create table funcionario_por_cargo(
    id bigint AUTO_INCREMENT PRIMARY KEY not NULL,
    funcionario_id BIGINT,
    cargo_id BIGINT,
    detalhes varchar (400) not NULL,
    data_inicio date not NULL,
    data_fim date,

    Foreign Key (funcionario_id) REFERENCES funcionarios(id),
    Foreign Key (cargo_id) REFERENCES cargos(id)
);

