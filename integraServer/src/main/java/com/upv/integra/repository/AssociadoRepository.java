package com.upv.integra.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.upv.integra.model.Associado;

public interface AssociadoRepository extends JpaRepository<Associado, Long>{
	
	List<Associado> findAll();
}
