package com.upv.integra.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.upv.integra.model.Atendimento;

public interface AtendimentoRepository extends JpaRepository<Atendimento, Long>{
	
	List<Atendimento> findAll();
	long count();
	@Query("SELECT p FROM Atendimento p JOIN FETCH p.cadastradoPor WHERE p.id = (:id)")
    public Atendimento findByIdAndFetchFuncEagerly(@Param("id") Long id);
}
