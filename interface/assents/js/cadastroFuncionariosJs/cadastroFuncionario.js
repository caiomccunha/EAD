'use strict'

// Limpa os campos de endereço
const limparFormulario = () => {
    document.getElementById('endereco').value = '';
    document.getElementById('numero').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

const carregarFuncionarios = async () => {
    try {
        const response = await fetch('http://localhost:8080/rh/funcionarios');
        const dados = await response.json();
        addLinha(dados);
    } catch (error) {
        console.error('Erro ao carregar funcionários:', error);
    }
}


// Preenche os campos com dados do CEP
const preencherCadastroCep = (endereco) => {
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}

// Validação
const eNumero = (numero) => /^[0-9]+$/.test(numero);
const cepValido = (cep) => cep.length === 8 && eNumero(cep);

// Pesquisa CEP
const pesquisarCep = async () => {
    const cep = document.getElementById('cep').value.replace('-', '').trim();
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    if (cepValido(cep)) {
        try {
            const response = await fetch(url);
            const endereco = await response.json();

            if (endereco.erro) {
                document.getElementById('endereco').value = 'CEP não encontrado';
                limparFormulario();
            } else {
                preencherCadastroCep(endereco);
            }
        } catch (error) {
            console.error('Erro ao buscar CEP:', error);
        }
    } else {
        document.getElementById('endereco').value = 'CEP inválido';
        limparFormulario();
    }
}

// Listener no campo de CEP
document.getElementById('cep').addEventListener('focusout', pesquisarCep);

fetch (`http://localhost:8080/rh/funcionarios`,{
    method: 'GET',
headers:{
    'Content-Type' : 'application/json'
}
})
.then(response => response.json())
.then(data => {
    addLinha(data);
})
.catch (error => {
    console.log(error);
})
;

function addLinha(dadosAPI) {
    const tabela = document.getElementById('tabelaFuncionarios');
    tabela.innerHTML = '';

    dadosAPI.forEach((element) => {
        const linha = document.createElement('tr');
        linha.classList.add('border-b');

        linha.innerHTML = `
    <td class="px-4 py-2">${element.id}</td>
    <td class="px-4 py-2">${element.nome}</td>
    <td class="px-4 py-2">${element.email}</td>
    <td class="px-4 py-2">${element.senha}</td>
    <td class="px-4 py-2">${element.cep}</td>
    <td class="px-4 py-2">${element.endereco}</td>
    <td class="px-4 py-2">${element.numero}</td>
    <td class="px-4 py-2">${element.bairro}</td>
    <td class="px-4 py-2">${element.cidade}</td>
    <td class="px-4 py-2">${element.estado}</td>
    <td class="px-4 py-2 space-x-2">
        <button class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" onclick="remover(${element.id})">Remover</button>
        <button class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600" onclick="editar(${element.id})">Editar</button>
    </td>
`;


        tabela.appendChild(linha);
    });
}

// Envio dos dados para API
const Adicionar = async () => {
    event.preventDefault(); // 🚩 impede que o formulário recarregue a página

    const funcionario = {
        nome: document.getElementById('nome').value.trim(),
        email:document.getElementById('email').value.trim(),
        senha: document.getElementById('senha').value.trim(),
        cep: document.getElementById('cep').value.trim(),
        endereco: document.getElementById('endereco').value.trim(),
        numero: document.getElementById('numero').value.trim(),
        bairro: document.getElementById('bairro').value.trim(),
        cidade: document.getElementById('cidade').value.trim(),
        estado: document.getElementById('estado').value.trim(),
    }

    try {
        const response = await fetch(`http://localhost:8080/rh/funcionarios`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(funcionario)
        });

        if (response.ok) {
            alert('Funcionário cadastrado com sucesso!');
        } else {
            alert('Erro ao cadastrar funcionário.');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro na requisição!');
    }
};


const remover = async (id) => {
    const confirmacao = confirm("Tem certeza que deseja remover este funcionário do sistema?");
    if (!confirmacao) return;

    try {
        const response = await fetch(`http://localhost:8080/rh/funcionarios/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Funcionário removido com sucesso!');
            carregarFuncionarios(); // Atualiza a tabela após remoção
        } else {
            alert('Erro ao remover funcionário.');
        }

    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro na requisição!');
    }
};

const editar = async (id) => {
    try {
        // Primeiro busca os dados atuais do funcionário
        const response = await fetch(`http://localhost:8080/rh/funcionarios/${id}`);
        if (!response.ok) {
            alert('Funcionário não encontrado.');
            return;
        }
        const funcionario = await response.json();

        // Coleta novos dados via prompt (simples)
        const novoNome = prompt('Editar Nome:', funcionario.nome) || funcionario.nome;
        const novoEmail = prompt('Editar Email:', funcionario.email) || funcionario.email;
        const novaSenha = prompt('Editar Senha:', funcionario.senha) || funcionario.senha;
        const novoCep = prompt('Editar CEP:', funcionario.cep) || funcionario.cep;
        const novoEndereco = prompt('Editar Endereço:', funcionario.endereco) || funcionario.endereco;
        const novoNumero = prompt('Editar Número:', funcionario.numero) || funcionario.numero;
        const novoBairro = prompt('Editar Bairro:', funcionario.bairro) || funcionario.bairro;
        const novaCidade = prompt('Editar Cidade:', funcionario.cidade) || funcionario.cidade;
        const novoEstado = prompt('Editar Estado:', funcionario.estado) || funcionario.estado;

        const dadosAtualizados = {
            nome: novoNome.trim(),
            email: novoEmail.trim(),
            senha: novaSenha.trim(),
            cep: novoCep.trim(),
            endereco: novoEndereco.trim(),
            numero: novoNumero.trim(),
            bairro: novoBairro.trim(),
            cidade: novaCidade.trim(),
            estado: novoEstado.trim()
        };

        // Faz o PUT (atualização)
        const updateResponse = await fetch(`http://localhost:8080/rh/funcionarios/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosAtualizados)
        });

        if (updateResponse.ok) {
            alert('Funcionário atualizado com sucesso!');
            carregarFuncionarios(); // Atualiza a tabela
        } else {
            alert('Erro ao atualizar funcionário.');
        }

    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro na requisição!');
    }
}

