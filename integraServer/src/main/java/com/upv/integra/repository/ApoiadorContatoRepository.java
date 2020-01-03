package com.upv.integra.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.upv.integra.model.ApoiadorContato;

public interface ApoiadorContatoRepository extends JpaRepository<ApoiadorContato, Long>{
	
	List<ApoiadorContato> findAll();
	List<ApoiadorContato> findByApoiadorId(Long id);	
}
