    let todosFuncionarios = [];

    window.onload = () => {
    carregarFuncionarios().then(() => {
        carregarCargos().then(() => {
        buscarVinculos();

        document.getElementById('btnBuscar').addEventListener('click', buscarVinculos);

        });
    });
    };

  function carregarFuncionarios() {
  return fetch('http://localhost:8080/rh/funcionarios')
    .then(res => res.json())
    .then(data => {
      todosFuncionarios = data;
      const select = document.getElementById('filtroFuncionario');

      const optionTodos = document.createElement('option');
      optionTodos.value = '';
      optionTodos.textContent = 'Todos';
      select.appendChild(optionTodos);

      data.forEach(f => {
        const option = document.createElement('option');
        option.value = f.id;
        option.textContent = f.nome;
        select.appendChild(option);
      });
    });
}


    function carregarCargos() {
  return fetch('http://localhost:8080/rh/cargos')
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById('filtroCargo');

      const optionTodos = document.createElement('option');
      optionTodos.value = '';
      optionTodos.textContent = 'Todos';
      select.appendChild(optionTodos);

      data.forEach(c => {
        const option = document.createElement('option');
        option.value = c.id;
        option.textContent = c.nome;
        select.appendChild(option);
      });
    });
}


   function buscarVinculos() {
  const funcionarioId = document.getElementById('filtroFuncionario').value;
  const cargoId = document.getElementById('filtroCargo').value;
  const wrapper = document.getElementById('tabelaRelatorioWrapper');

  if (!funcionarioId && !cargoId) {
    alert('Selecione pelo menos um filtro para exibir os vínculos.');
    wrapper.classList.add('hidden');
    return;
  }

  let url = 'http://localhost:8080/rh/funcionarioPorCargos';
  const filtros = [];

  if (funcionarioId) filtros.push(`funcionarioId=${funcionarioId}`);
  if (cargoId) filtros.push(`cargoId=${cargoId}`);
  if (filtros.length > 0) url += '?' + filtros.join('&');

  fetch(url)
    .then(res => res.json())
    .then(vinculos => {
      const tbody = document.getElementById('tabelaRelatorioWrapper');
      tbody.innerHTML = '';

      if (vinculos.length === 0) {
        const linha = document.createElement('tr');
        linha.innerHTML = `<td colspan="5" class="px-4 py-2 text-center border">Nenhum vínculo encontrado.</td>`;
        tbody.appendChild(linha);
      } else {
        vinculos.forEach(v => {
          const linha = document.createElement('tr');
          linha.innerHTML = `
            <td class="px-4 py-2 border">${v.funcionario?.nome || '---'}</td>
            <td class="px-4 py-2 border">${v.cargo?.nome || '---'}</td>
            <td class="px-4 py-2 border">${v.data_inicio}</td>
            <td class="px-4 py-2 border">${v.data_fim || '—'}</td>
            <td class="px-4 py-2 border">${v.detalhes}</td>
          `;
          tbody.appendChild(linha);
        });
      }

      wrapper.classList.remove('hidden'); // Mostra a tabela
    });
}


