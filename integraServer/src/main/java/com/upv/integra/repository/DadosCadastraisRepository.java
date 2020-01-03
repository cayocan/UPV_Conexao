package com.upv.integra.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.upv.integra.model.DadosCadastrais;

public interface DadosCadastraisRepository extends JpaRepository<DadosCadastrais, Long>{
		
	List<DadosCadastrais> findAll();

	List<DadosCadastrais> findAllByEmail(String email);
	
	DadosCadastrais findByEmail(String email);
	
	void delete(DadosCadastrais contact);
}
