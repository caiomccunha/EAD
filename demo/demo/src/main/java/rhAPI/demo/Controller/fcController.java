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

import rhAPI.demo.Model.fCModel;
import rhAPI.demo.Service.cargosService;
import rhAPI.demo.Service.fCService;
import rhAPI.demo.Service.funcionariosService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping ("/rh/funcionarioPorCargos")

public class fcController {

    @Autowired
    private fCService service;


    @GetMapping 
    public List <fCModel> listar(){
        return service.listar();
    }

    @GetMapping ("/{id}")
    public ResponseEntity <fCModel> buscarPorId(@PathVariable Long id){
        return service.buscarPorId(id).map(ResponseEntity :: ok).orElse(ResponseEntity.notFound().build());
    }

     @GetMapping ("/filtrar/funcionario/{funcionario_id}")
    public ResponseEntity <List <fCModel>> filtrar(
       @PathVariable Long funcionario_id){
            List <fCModel> result;

            if(funcionario_id != null){
                result = service.listarPorFuncionario(funcionario_id);
            }else {
                result = service.listar();
            }

            return result.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(result);
        }
       @GetMapping ("/filtrar/cargo/{cargo_id}")
    public ResponseEntity <List <fCModel>> filtro(
       @PathVariable Long cargo_id){
            List <fCModel> result;

            if(cargo_id != null){
                result = service.listarPorFuncionario(cargo_id);
            }else {
                result = service.listar();
            }

            return result.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(result);
        }

    @PostMapping
    public fCModel adicionar (@RequestBody fCModel fc){
        return service.adicionar(fc);
    }

    @PutMapping("/{id}")
    public ResponseEntity <fCModel> atualizar(@PathVariable Long id, @RequestBody fCModel fc){
        if(!service.buscarPorId(id).isPresent()){
            return ResponseEntity.notFound().build();
        }
        fc.setId(id);
        return ResponseEntity.ok(service.adicionar(fc));
    }

    @DeleteMapping("/{id}")
        public ResponseEntity <fCModel> deletar (@PathVariable Long id){
            if(!service.buscarPorId(id).isPresent()){
                return ResponseEntity.notFound().build();
            }
            service.deletar(id);
            return ResponseEntity.noContent().build();
        }

}
