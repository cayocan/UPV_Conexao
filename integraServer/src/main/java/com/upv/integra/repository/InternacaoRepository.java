package com.upv.integra.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.upv.integra.model.acompanhamentos.Internacao;

public interface InternacaoRepository extends JpaRepository<Internacao, Long>{
	List<Internacao> findAll();
}