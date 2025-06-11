package rhAPI.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rhAPI.demo.Model.fCModel;
import rhAPI.demo.Repository.fCRepository;

@Service
public class fCService {
    @Autowired fCRepository repository;

    public List <fCModel> listar(){
        return repository.findAll();
    }

    public Optional <fCModel> buscarPorId(Long id){
        return repository.findById(id);
    }

    public List <fCModel> listarPorFuncionario(Long funcionarioId){
       return repository.findByFuncionario_id(funcionarioId);
    }

    public List <fCModel> listarPorCargo(Long cargoId){
        return repository.findByCargo_id(cargoId);
    }
    public fCModel adicionar (fCModel fc){
        return repository.save(fc);
    }

    public void deletar (Long id){
        repository.deleteById(id);
    }
}
