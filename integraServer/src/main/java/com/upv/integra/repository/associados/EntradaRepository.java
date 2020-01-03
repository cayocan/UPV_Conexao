package com.upv.integra.repository.associados;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.upv.integra.model.associados.Entrada;

public interface EntradaRepository extends JpaRepository<Entrada, Long>{
	List<Entrada> findAll();
}
