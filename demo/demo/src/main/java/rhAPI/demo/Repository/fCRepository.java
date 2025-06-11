package rhAPI.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import rhAPI.demo.Model.fCModel;

@Repository
public interface fCRepository extends JpaRepository<fCModel, Long> {
List <fCModel> findByFuncionario_id(Long funcionarioId);
List <fCModel> findByCargo_id(Long cargoId);
}
