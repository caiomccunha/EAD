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

import rhAPI.demo.Model.funcionariosModel;
import rhAPI.demo.Service.funcionariosService;

@RestController
@CrossOrigin (origins = "*")
@RequestMapping ("rh/funcionarios")
public class funcionarioController {

    @Autowired
    private funcionariosService service;

    @GetMapping
    public List <funcionariosModel> listarFuncionarios (){
        return service.listarFuncionarios();
    }

    @GetMapping("/{id}")
    public ResponseEntity <funcionariosModel> buscarFuncionarioPorID(@PathVariable Long id){
        return service.buscarFuncionarioPorID(id).map(ResponseEntity :: ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public funcionariosModel adicionarFuncionarios(@RequestBody funcionariosModel funcionario){
        return service.adicionarFuncionario(funcionario);
    }

    @PutMapping("/{id}")
    public ResponseEntity <funcionariosModel> atualizarFuncionario (@PathVariable long id, @RequestBody funcionariosModel funcionarios){
        if(!service.buscarFuncionarioPorID(id).isPresent()){
            return ResponseEntity.notFound().build();
        }
        funcionarios.setId(id);
        return ResponseEntity.ok(service.adicionarFuncionario(funcionarios));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity <Void> deletarFuncionario(@PathVariable Long id){
        if(!service.buscarFuncionarioPorID(id).isPresent()){
            return ResponseEntity.notFound().build();
        }
        service.deletarFuncionario(id);
        return ResponseEntity.noContent().build();
    }
}
