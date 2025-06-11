/*Função para cadastrar informações
'use strict'
const limparFormulario = (endereco) => {
    document.getElementById('endereco').value = '';
    document.getElementById('numero').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

const preencherCadastroCep = (endereco) => {
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('numero').value = endereco.complemento;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.estado;
}

const eNumero = (numero) => /^[0-9]+$/.test(numero);
const cepValido = (cep) => cep.length == 8 && eNumero (cep);

const pesquisarCep = async () => {
    limparFormulario();
    const cep = document.getElementById('cep').value;
    const url = `http://viacep.com.br/ws/${cep}/json/`
    if(cepValido(cep)){
    const dados = await fetch(url);
    const endereco = await dados.json();
    if(endereco.hasOwnProperty('erro')){
         document.getElementById('endereco').value = 'CEP não encontrado'
    }else{
        preencherCadastroCep(endereco);
    }
    //fetch(url).then(Response => Response.json()).then(console.log);
    //console.log(cep)
}else{
    document.getElementById('endereco').value = 'CEP invalido'
}
}


document.getElementById('cep')
.addEventListener('focusout', pesquisarCep);*/

const Adicionar = async () =>{
    event.preventDefault();
    const cargos ={
        nome: document.getElementById('nome').value,
        descricao:document.getElementById('descricao').value
    }
    console.log(cargos)

    try {
        const response = await fetch('http://localhost:8080/rh/cargos',{
            method: 'POST',
            headers:{'Content-Type' : 'application/json'},
            body: JSON.stringify(cargos)
        });

        if(response.ok){
            alert('Cargo cadastrado com sucesso!');
        }else{
            alert('Erro ao cadastrar cargo');
        }
    }catch (error){
        console.error('Erro na requisição: ', error)
    }
}



