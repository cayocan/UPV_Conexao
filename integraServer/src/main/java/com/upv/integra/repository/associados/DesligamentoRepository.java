package com.upv.integra.repository.associados;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.upv.integra.model.associados.Desligamento;

public interface DesligamentoRepository extends JpaRepository<Desligamento, Long>{
	List<Desligamento> findAll();
}