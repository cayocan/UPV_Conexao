package com.upv.integra.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.upv.integra.model.acompanhamentos.Receita;

public interface ReceitaRepository extends JpaRepository<Receita, Long>{
	List<Receita> findAll();
}