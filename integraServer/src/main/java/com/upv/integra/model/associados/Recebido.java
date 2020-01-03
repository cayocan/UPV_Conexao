package com.upv.integra.model.associados;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class Recebido {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name ="RECEB_CD_ID")
	private Long id;

	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name = "RECEB_DT_INTER")
	private Date dt_recebido;
	
	@Column(name ="RECEB_TX_TIPO")
	private String tipo;
	
	@Column(name ="RECEB_TX_QUANT")
	private String quant;
	
	@Column(name ="RECEB_TX_OBS")
	private String obs;

	@Override
	public String toString() {
		return "Recebido [id=" + id + ", dt_recebido=" + dt_recebido + ", tipo=" + tipo + ", quant=" + quant + ", obs="
				+ obs + "]";
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getDt_recebido() {
		return dt_recebido;
	}

	public void setDt_recebido(Date dt_recebido) {
		this.dt_recebido = dt_recebido;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public String getQuant() {
		return quant;
	}

	public void setQuant(String quant) {
		this.quant = quant;
	}

	public String getObs() {
		return obs;
	}

	public void setObs(String obs) {
		this.obs = obs;
	}	
	
}
