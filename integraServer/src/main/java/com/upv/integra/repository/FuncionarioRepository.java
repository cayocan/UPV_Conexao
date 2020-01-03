package com.upv.integra.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.upv.integra.model.Apoiador;
import com.upv.integra.model.Funcionario;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long>{
	
//	List findByEmail(String email);
//	List<Funcionario> findAll();
//	Funcionario findByUsername(String username);
	List<Funcionario> findAllByEnable(boolean Enable);
	
	//"SELECT f FROM Funcionario f JOIN FETCH f.associacao WHERE f.id=?1"
	@Query("SELECT f FROM Funcionario f WHERE f.associacao.id=?1")
	List<Funcionario> findAllBySameAssoc(Long assocId);
	
	@Query("SELECT p FROM Funcionario p JOIN FETCH p.apoiadores WHERE p.id=?1")
	Funcionario findAllApoiadoresByFuncionarioId(Long funcId);
	@Query("SELECT p FROM Funcionario p JOIN FETCH p.pacientes WHERE p.id=?1")
	Funcionario findAllPacientesByFuncionarioId(Long funcId);
	@Query("SELECT p FROM Funcionario p JOIN FETCH p.atendimentos WHERE p.id=?1")
	Funcionario findAllAtendimentosByFuncionarioId(Long funcId);
	@Query("SELECT p FROM Funcionario p JOIN FETCH p.acomp WHERE p.id=?1")
	Funcionario findAllAcompanhamentosByFuncionarioId(Long funcId);
	@Query("SELECT p FROM Funcionario p JOIN FETCH p.associados WHERE p.id=?1")
	Funcionario findAllAssociadosByFuncionarioId(Long funcId);
	
//	@Query("SELECT p FROM Atendimento p JOIN FETCH p.cadastradoPor WHERE p.id = (:id)")	
//	@Modifying
//	@Query("delete from Funcionario f where f.id = ?1")
//	void delete(Long funcId);
}
