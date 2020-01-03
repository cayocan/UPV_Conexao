package com.upv.integra.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.upv.integra.model.Pessoa;

public interface PessoaRepository extends JpaRepository<Pessoa, Long>{
	
//	List findByEmail(String email);
	List<Pessoa> findAllByEnable(boolean Enable);

	List<Pessoa> findByCpfAndEnable(String cpf, boolean b);

//	List<Pessoa> findAllByEmailBoasVindasAndEnable(boolean b, boolean c);
	
}
