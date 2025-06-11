use rh_tech;

create table funcionarios (
    id int AUTO_INCREMENT PRIMARY key not NULL,
    nome varchar (200) not null,
    email VARCHAR(300) not NULL unique,
    senha VARCHAR (100) NOT NULL,
    cep VARCHAR (100) not null,
    endereco VARCHAR (100) not null,
    numero VARCHAR (10) not NULL,
    bairro VARCHAR (100) not NULL,
    cidade VARCHAR (100) not NULL,
    estado VARCHAR (100) not NULL
);

alter Table funcionarios
MODIFY column cep VARCHAR (8) NOT NULL;

CREATE TABLE cargos (
    id int AUTO_INCREMENT PRIMARY KEY not null,
    nome VARCHAR (300) not null,
    descricao VARCHAR (500) not NULL
);
