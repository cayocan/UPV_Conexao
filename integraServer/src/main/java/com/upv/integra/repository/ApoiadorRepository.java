package com.upv.integra.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Sort;
import com.upv.integra.model.Apoiador;

public interface ApoiadorRepository extends JpaRepository<Apoiador, Long>{
	
	List<Apoiador> findAll();
	long count();
	
	@Query("SELECT p FROM Apoiador p WHERE p.cadastradoPor.associacao.id=?1")
	List<Apoiador> findAllBySameAssoc(Long assocId, Sort s);
}
