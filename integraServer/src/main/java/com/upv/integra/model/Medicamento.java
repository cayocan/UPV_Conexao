package com.upv.integra.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Medicamento {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name ="MEDICAMENTO_CD_ID")
	private Long id;
	
	@Column(name ="MEDICAMENTO_TX_NOME")
	private String nome;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
}
