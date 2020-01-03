package com.upv.integra.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.upv.integra.model.Funcionario;
import com.upv.integra.model.Paciente;

public interface PacienteRepository extends JpaRepository<Paciente, Long>{
	
	List<Paciente> findAll();
	List<Paciente> findAllByDesligado(Boolean bool);
	long countByDesligado(Boolean bool);
	long countByDesligamento(String text);
	
	@Query("SELECT p FROM Paciente p WHERE p.desligado=?1 and p.cadastradoPor.associacao.id=?2")
	List<Paciente> findAllByDesligadoAndSameAssoc(Boolean bool, Long assocId);
}
