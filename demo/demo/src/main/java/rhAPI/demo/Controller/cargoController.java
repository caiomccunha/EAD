package rhAPI.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import rhAPI.demo.Model.cargosModel;
import rhAPI.demo.Repository.cargoRepository;
import rhAPI.demo.Service.cargosService;

@RestController
@CrossOrigin (origins = "*")

@RequestMapping ("rh/cargos")
public class cargoController {

    @Autowired 
    private cargosService service;

    @GetMapping
    public List <cargosModel> listarCargos(){
        return service.listarCargos();
    }

    @GetMapping ("/{id}")
    public ResponseEntity <cargosModel> buscarCargosPorID(@PathVariable Long id){
        return service.buscarCargosPorId(id).map(ResponseEntity :: ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping 
    public cargosModel adicionarCargos (@RequestBody cargosModel cargos){
        return service.adicionarCargos(cargos);
    }

    @PutMapping("/{id}")
    public ResponseEntity <cargosModel> atualizarCargos (@PathVariable Long id, @RequestBody cargosModel cargos){
        if(!service.buscarCargosPorId(id).isPresent()){
            return ResponseEntity.notFound().build();
        }
        cargos.setId(id);
        return ResponseEntity.ok(service.adicionarCargos(cargos));
    }
    @DeleteMapping ("/{id}")
    public ResponseEntity <Void> deletarCargos(@PathVariable Long id){
        if(!service.buscarCargosPorId(id).isPresent()){
            return ResponseEntity.notFound().build();
        }
        service.deletarCargos(id);
        return ResponseEntity.noContent().build();
    } 
}
