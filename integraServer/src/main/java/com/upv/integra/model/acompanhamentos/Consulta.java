package com.upv.integra.model.acompanhamentos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Consulta {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name ="CONSULT_CD_ID")
	private Long id;
		
	@Column(name = "CONSULT_TX_MED")
	private String consultaMedico;
	
	@Column(name = "CONSULT_TX_MED_ESPEC")
	private String consultaMedicoEspec;

	@Override
	public String toString() {
		return "Consulta [id=" + id + ", consultaMedico=" + consultaMedico + ", consultaMedicoEspec="
				+ consultaMedicoEspec + "]";
	}

	public String getConsultaMedico() {
		return consultaMedico;
	}

	public void setConsultaMedico(String consultaMedico) {
		this.consultaMedico = consultaMedico;
	}

	public String getConsultaMedicoEspec() {
		return consultaMedicoEspec;
	}

	public void setConsultaMedicoEspec(String consultaMedicoEspec) {
		this.consultaMedicoEspec = consultaMedicoEspec;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
}
