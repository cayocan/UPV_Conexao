package com.upv.integra.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.upv.integra.model.Acompanhamento;

public interface AcompanhamentoRepository extends JpaRepository<Acompanhamento, Long>{
	
	List<Acompanhamento> findAll();
}
