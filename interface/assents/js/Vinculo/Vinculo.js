window.onload = function(){
    carregarCargos();
    carregarFuncionarios(  );
};

function limparCampos(){
    document.getElementById('funcionario').value = '';
    document.getElementById('cargo').value = '';
    document.getElementById('detalhes').value='';
    document.getElementById('data_inicio').value='';
    document.getElementById('data_fim').value='';
}

fetch(`http://localhost:8080/rh/funcionarioPorCargos`, {
    method : 'GET',
    headers: {
        'Content-Type' : 'application/json'
    },
})
.then(response => response.json())
.then(data => {
    addLinha(data);
})
.catch(error =>{
    console.log(error);
});

function carregarFuncionarios(){
    return fetch (`http://localhost:8080/rh/funcionarios`)
    .then(response => {
        if(!response.ok){
            throw new Error ('Cargo não encontrado');
        }
        return response.json();
    })
    .catch(error =>{
        console.error('Erro na verificação do cargo: ', error);
        return null;
    });
}

function carregarCargos(){
    return fetch (`http://localhost:8080/rh/cargos`)
    .then(response => {
        if(!response.ok){
            throw new Error ('Cargo não encontrado');
        }
        return response.json();
    })
    .catch(error =>{
        console.error('Erro na verificação do cargo: ', error);
        return null;
    });
}

function addLinha(dadosAPI){
    const tabela  = document.getElementById('tabelaVinculos');
    dadosAPI.forEach(element => {
        const linha = document.createElement('tr');

        linha.innerHTML = `
            <td class= "px-4 py-2">${element.id}</td>
            <td class="px-4 py-2">${element.funcionario ? element.funcionario.nome : 'Não informado'}</td>
            <td class="px-4 py-2">${element.cargo ? element.cargo.nome : 'Não informado'}</td>
            <td class= "px-4 py-2">${element.detalhes}</td>
            <td class= "px-4 py-2">${element.data_inicio}</td>
            <td class= "px-4 py-2">${element.data_fim}</td>
            <td class="px-4 py-2"><button  class="bg-red-500 text-white px-2 py-1 rounded" onclick="remover(this,${element.id} )">remover</button>
            <button class ="bg-green-500 text-black px-2 py-1 rounded" onclick="editar(this, event,${element.id} )">editar</button></td>
        </tr>
        `;
        tabela.appendChild(linha);
    });
}

function cadastrar (){
    event.preventDefault();

    const funcionario = document.getElementById('funcionario').value.trim();
    const cargo = document.getElementById('cargo').value.trim();
    const detalhes = document.getElementById('detalhes').value.trim();
    const data_Registro = document.getElementById('data_inicio').value.trim();
    const data_Termino = document.getElementById('data_fim').value.trim();

    if(funcionario && cargo && detalhes && data_Registro){
        const vinculo = {
            funcionario: {id: parseInt (funcionario)},
            cargo: {id: parseInt (cargo)},
            detalhes: detalhes,
            data_inicio: data_Registro,
            data_fim : data_Termino === '' ? null : data_Termino
        };
        fetch(`http://localhost:8080/rh/funcionarioPorCargos`, {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body:  JSON.stringify(vinculo)
        })
        .then(response => {
            if(!response.ok){
                throw new Error ('Erro ao cadastrar vinculo');
            }
            return response.json();
        })
        .then(data =>{
            console.log("Dados recebidos: ", data)
            addLinha (data);

            Swal.fire({
                icon : 'success',
                title : 'Sucesso!',
                text: 'Vinculo registrado com sucesso !'
            });

            limparCampos();
        })
        .catch(error => {
            console.error('Erro no cadastro do vínculo: ' , error);
            Swal.fire({
                icon :'error',
                title: 'Error!',
                text: 'Falha ao cadastrar vínculo. Verifique os dados.'
            });
        });
    }else{
        Swal.fire({
            icon : 'error',
            title: 'Campos Obrigátorios',
            text: 'Preencha todos os campos para o cadastro'
        })
    }
}

function remover(dadosBotao, id){
    event.preventDefault();

    Swal.fire({
        icon:'question',
        title :'Você tem certeza ?',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
    }).then((result) =>{
        if(result.isConfirmed){
            const vinculo = dadosBotao.parentElement.parentElement;
            vinculo.remove();
            fetch(`http://localhost:8080/rh/funcionarioPorCargos/${id}`, {
                method: 'DELETE',
                headers:{
                    'Content-Type' : 'application/json'
                },
            })
            .then(response => {
                response.text();
                console.log(response);
            })
            .then(data => {
                console.log(id);
                console.log('Deletado com sucesso: ', id);
            })
            .catch(error =>{
                console.log(error);
            });
            Swal.fire('Confirmado', '', 'success');
        }else{
            Swal.fire('Cancelado', '', 'info')
        }
    })
}

function editar(dadosBotao, event, id) {
    event.preventDefault();

    const linha = dadosBotao.parentElement.parentElement;
    const funcionarioAtual = linha.children[1].textContent.trim();
    const cargoAtual = linha.children[2].textContent.trim();
    const detalhesAtuais = linha.children[3].textContent.trim();
    const dataAtual = linha.children[4].textContent.trim();
    const dataTerminoAtual = linha.children[5].textContent.trim();

    Promise.all([
        fetch(`http://localhost:8080/rh/cargos`).then(res => res.json()),
        fetch(`http://localhost:8080/rh/funcionarios`).then(res => res.json())
    ])
    .then(([cargos, funcionarios]) => {
        const cargosOptions = cargos.map(c =>
            `<option value="${c.id}" ${c.nome === cargoAtual ? 'selected' : ''}>${c.nome}</option>`
        ).join('');

        const funcionarioOptions = funcionarios.map(f =>
            `<option value="${f.id}" ${f.nome === funcionarioAtual ? 'selected' : ''}>${f.nome}</option>`
        ).join('');

        Swal.fire({
            title: 'Editar',
            html:
                `<select id="swal-funcionario" class="swal2-select">${funcionarioOptions}</select>
                 <select id="swal-cargo" class="swal2-select">${cargosOptions}</select>
                 <input id="swal-detalhes" class="swal2-input" placeholder="Detalhes" value="${detalhesAtuais}">
                 <input id="swal-dataCadastro" class="swal2-input" placeholder="Data de Cadastro" value="${dataAtual}">
                 <input id="swal-dataTermino" class="swal2-input" placeholder="Data de Término" value="${dataTerminoAtual || ''}">`,
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        }).then(result => {
            if (result.isConfirmed) {
                const funcionarioNovo = document.getElementById('swal-funcionario').value.trim();
                const cargoNovo = document.getElementById('swal-cargo').value.trim();
                const detalhesNovo = document.getElementById('swal-detalhes').value.trim();
                const cadastroNovo = document.getElementById('swal-dataCadastro').value.trim();
                const desligamentoNovo = document.getElementById('swal-dataTermino').value.trim();

                if (funcionarioNovo && cargoNovo && detalhesNovo && cadastroNovo) {
                    const vinculo = {
                        funcionario: { id: parseInt(funcionarioNovo) },
                        cargo: { id: parseInt(cargoNovo) },
                        detalhes: detalhesNovo,
                        data_inicio: cadastroNovo,
                        data_fim: desligamentoNovo === '' ? null : desligamentoNovo

                    };
                    console.log("Enviando para PUT:", JSON.stringify(vinculo, null, 2));

                    fetch(`http://localhost:8080/rh/funcionarioPorCargos/${id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(vinculo)
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("Erro na requisição: " + response.status);
                        }
                        return response.json();
                    })
                    .then(data => {
                        linha.children[1].textContent = funcionarios.find(f => f.id === parseInt(funcionarioNovo))?.nome || funcionarioAtual;
                        linha.children[2].textContent = cargos.find(c => c.id === parseInt(cargoNovo))?.nome || cargoAtual;
                        linha.children[3].textContent = detalhesNovo;
                        linha.children[4].textContent = cadastroNovo;
                        linha.children[5].textContent = desligamentoNovo || '';

                        Swal.fire({
                            icon: 'success',
                            title: 'Atualizado!',
                            text: 'Vínculo atualizado com sucesso.'
                        });
                    })
                    .catch(error => {
                        console.error('Erro ao atualizar vínculo:', error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Erro!',
                            text: 'Falha ao atualizar o vínculo.'
                        });
                    });

                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Campos Obrigatórios',
                        text: 'Preencha todos os campos obrigatórios.'
                    });
                }
            }
        });
    })
    .catch(error => {
        console.error("Erro ao carregar dados para edição:", error);
        Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Falha ao carregar dados para edição.'
        });
    });
}
