package com.upv.integra.repository.associados;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.upv.integra.model.associados.Doado;

public interface DoadoRepository extends JpaRepository<Doado, Long>{
	List<Doado> findAll();
}
