package com.upv.integra.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.upv.integra.model.Certificacao;

public interface CertificacaoRepository extends JpaRepository<Certificacao, Long>{
	List<Certificacao> findAllByOrderByIdAsc();
	Certificacao findByNome(String nome);
}