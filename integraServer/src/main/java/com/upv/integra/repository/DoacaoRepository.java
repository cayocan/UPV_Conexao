package com.upv.integra.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.upv.integra.model.Doacao;

public interface DoacaoRepository extends JpaRepository<Doacao, Long>{
	
	List<Doacao> findAll();
	List<Doacao> findByApoiadorId(Long id);	
}
