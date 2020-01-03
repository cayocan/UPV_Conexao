package com.upv.integra.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.upv.integra.model.Medicamento;

public interface MedicamentoRepository extends JpaRepository<Medicamento, Long>{
	List<Medicamento> findAll();
	Medicamento findByNome(String nome);
}