package rhAPI.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rhAPI.demo.Model.funcionariosModel;
import rhAPI.demo.Repository.funcionariosRepository;

@Service
public class funcionariosService {
    @Autowired
    private funcionariosRepository repository;

    public List <funcionariosModel> listarFuncionarios(){
        return repository.findAll();
    } 

    public Optional <funcionariosModel> buscarFuncionarioPorID(Long id){
        return repository.findById(id);
    }

    public funcionariosModel adicionarFuncionario(funcionariosModel funcionario){
        return repository.save(funcionario);
    }
    public void deletarFuncionario(Long id){
        repository.deleteById(id);
    }
    
}
