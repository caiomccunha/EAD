package rhAPI.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rhAPI.demo.Model.cargosModel;
import rhAPI.demo.Repository.cargoRepository;

@Service
public class cargosService {
    @Autowired
    private cargoRepository repository;

    public List<cargosModel> listarCargos(){
        return repository.findAll();
    }

    public Optional <cargosModel> buscarCargosPorId(Long id){
        return repository.findById(id);
    }

    public cargosModel adicionarCargos (cargosModel cargos){
        return repository.save(cargos);
    }

    public void deletarCargos(Long id){
        repository.deleteById(id);
    }

}
