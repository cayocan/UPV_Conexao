package com.upv.integra.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.upv.integra.model.IntegraLogin;

public interface IntegraLoginRepository extends JpaRepository<IntegraLogin, Long>{
	
//	List findByEmail(String email);
	List<IntegraLogin> findAll();

	IntegraLogin findByUsername(String username);

}
