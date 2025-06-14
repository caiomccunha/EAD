//Função para cadastrar informações
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
.addEventListener('focusout', pesquisarCep);

const Adicionar = async () =>{
    const funcionario ={
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value,
        cep: document.getElementById('cep').value,
        endereco: document.getElementById('endereco').value,
        numero: document.getElementById('numero').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value
    }

    try {
        const response = await fetch('http://localhost:8080/rh/funcionarios',{
            method: 'POST',
            headers:{'Content-Type' : 'application/json'},
            body: JSON.stringify(funcionario)
        });

        if(response.ok){
            alert('Funcionário cadastrado com sucesso!');
        }else{
            alert('Erro ao cadastrar usuário');
        }
    }catch (error){
        console.error('Erro na requisição: ', error)
    }
}



