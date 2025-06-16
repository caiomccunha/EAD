
        //API GET
    fetch('http://localhost:8080/rh/cargos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
      addlinha(data);
    })
    .catch(error => {
      console.log(error);
    });
    

  //Adicionar Linha na Tabela
  function addlinha(dadosAPI){
      const tabela = document.getElementById('tabelaCorpo');
      dadosAPI.forEach(element => {   
        const linha = document.createElement('tr');
        //Adicionando HTML
        linha.innerHTML = `
          <tr>
          <td class="px-4 py-2">${element.id}</td>
              <td class="px-4 py-2">${element.nome}</td>
              <td class="px-4 py-2">${element.descricao}</td>
              <td class="px-4 py-2"><button  class="bg-red-500 text-white px-2 py-1 rounded" onclick="remover(this,${element.id} )">remover</button>
              <button class ="bg-green-500 text-black px-2 py-1 rounded" onclick="editar(this, event,${element.id} )">editar</button></td>
          </tr>
        `;
        
        tabela.appendChild(linha);
      });
    }

    //Cadastrar Novas pessoas do formulario
    function cadastrar(){
      event.preventDefault();
      const nome = document.getElementById('nome').value;
      const descricao = document.getElementById('descricao').value;
      if(nome && descricao){
        //Adicionando Linha com nosso Cadastro
        this.addlinha([{"nome":nome.trim(), "descricao":descricao.trim()}]);
        
        //Limpando os campos
        document.getElementById('nome').value = "";
        document.getElementById('descricao').value = "";

        //API POST  
        fetch('http://localhost:8080/rh/cargos', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"nome":nome, "descricao":descricao})
        })
        .then(response => response.json())
        .then(data => {
          console.log("Resposta da API:", data);
        })
        .catch(error => {
          console.error("Erro ao enviar dados:", error);
        });
    ''

          Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'Cadastro feito com sucesso'
          });
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Falta dados para cadastar'
        });
      }
    }

    //Remover Alguma Linha da tabela
    function remover(dadosbotao,id){
      event.preventDefault();
  
      Swal.fire({
        icon: 'question',
        title: 'Você tem certeza?',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
      }).then((result) => {
      if (result.isConfirmed){
      const nome = dadosbotao.parentElement.parentElement;
      nome.remove();
      fetch(`http://localhost:8080/rh/cargos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
      response.text()
      console.log(response);
    })
    .then(data => {
    console.log(id);
    console.log('Resource deleted successfully:', id);
    })
    .catch(error => {
      console.log(error);
    });
          Swal.fire('Confirmado!', '', 'success');
        } else {
          Swal.fire('Cancelado', '', 'info');
        }
      });
    }
 
 
    function editar(dadosbotao, event, id) {
  event.preventDefault();

  const linha = dadosbotao.parentElement.parentElement;
 // const id = linha.children[0].textContent.trim();
  const nomeAtual = linha.children[1].textContent.trim();
  const descricaoAtual = linha.children[2].textContent.trim();

  Swal.fire({
    title: 'Editar Cargos',
    html:
      `<input id="swal-nome" class="swal2-input" placeholder="Nome" value="${nomeAtual}">
       <input id="swal-descricao" class="swal2-input" placeholder="Descricao" value="${descricaoAtual}">`,
    showCancelButton: true,
    confirmButtonText: 'Salvar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      
      const nomeNovo = document.getElementById('swal-nome').value.trim();
      const descricaoNova = document.getElementById('swal-descricao').value.trim();

      if (nomeNovo && descricaoNova) {
        const dados = { nome: nomeNovo, descricao: descricaoNova };

        fetch(`http://localhost:8080/rh/cargos/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dados)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error("Erro na requisição: " + response.status);
          }
          return response.json();
        })
        .then(data => {
          // Atualiza a linha na tabela
          linha.children[1].textContent = nomeNovo;
          linha.children[2].textContent = descricaoNova;

          Swal.fire({
            icon: 'success',
            title: 'Atualizado!',
            text: 'Os dados foram atualizados com sucesso.'
          });
        })
        .catch(error => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Falha ao atualizar.'
          });
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Todos os campos devem ser preenchidos.'
        });
      }
    }
  });
}

