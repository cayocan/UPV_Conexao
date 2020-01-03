package com.upv.integra.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.upv.integra.model.acompanhamentos.Consulta;

public interface ConsultaRepository extends JpaRepository<Consulta, Long>{
	List<Consulta> findAll();
}