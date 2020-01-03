package com.upv.integra.repository.associados;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.upv.integra.model.associados.Recebido;

public interface RecebidoRepository extends JpaRepository<Recebido, Long>{
	List<Recebido> findAll();
}
