package com.upv.integra.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.upv.integra.model.Associacao;

public interface AssociacaoRepository extends JpaRepository<Associacao, Long>{

	List<Associacao> findAllByEnable(Boolean enable);
	long count();
	Optional<Associacao> findById(Long id);
	Associacao findByNome(String nome);
	
	List<Associacao> findByCnpjAndEnable(String cnpj, boolean b);
}
