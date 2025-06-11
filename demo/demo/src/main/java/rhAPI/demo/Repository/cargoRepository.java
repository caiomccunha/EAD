package rhAPI.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import rhAPI.demo.Model.cargosModel;

@Repository
public interface cargoRepository extends JpaRepository <cargosModel, Long>{
}
