package com.upv.integra.model.associados;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class Desligamento {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name ="DESLIG_CD_ID")
	private Long id;

	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name = "DESLIG_DT_DESLIG")
	private Date dt_deslig;
	
	@Column(name ="DESLIG_TX_MOTIVO")
	private String motivo;

	@Override
	public String toString() {
		return "Desligamento [id=" + id + ", dt_deslig=" + dt_deslig + ", motivo=" + motivo + "]";
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getDt_deslig() {
		return dt_deslig;
	}

	public void setDt_deslig(Date dt_deslig) {
		this.dt_deslig = dt_deslig;
	}

	public String getMotivo() {
		return motivo;
	}

	public void setMotivo(String motivo) {
		this.motivo = motivo;
	}
	
}
