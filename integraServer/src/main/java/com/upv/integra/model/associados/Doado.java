package com.upv.integra.model.associados;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class Doado {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name ="DOADO_CD_ID")
	private Long id;
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name = "DOADO_DT_DOACAO")
	private Date dt_doacao;
	
	@Column(name ="DOADO_TX_VALOR")
	private String valor;
	
	@Column(name ="DOADO_TX_METODO")
	private String metodo;
	
	@Column(name ="DOADO_TX_OBS")
	private String obs;

	@Override
	public String toString() {
		return "Doado [id=" + id + ", dt_doacao=" + dt_doacao + ", valor=" + valor + ", metodo=" + metodo + ", obs="
				+ obs + "]";
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getDt_doacao() {
		return dt_doacao;
	}

	public void setDt_doacao(Date dt_doacao) {
		this.dt_doacao = dt_doacao;
	}

	public String getValor() {
		return valor;
	}

	public void setValor(String valor) {
		this.valor = valor;
	}

	public String getMetodo() {
		return metodo;
	}

	public void setMetodo(String metodo) {
		this.metodo = metodo;
	}

	public String getObs() {
		return obs;
	}

	public void setObs(String obs) {
		this.obs = obs;
	}
	
	
}
