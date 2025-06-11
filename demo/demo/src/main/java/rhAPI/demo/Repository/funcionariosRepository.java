package rhAPI.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import rhAPI.demo.Model.funcionariosModel;

@Repository
public interface funcionariosRepository extends JpaRepository <funcionariosModel, Long> {
}
