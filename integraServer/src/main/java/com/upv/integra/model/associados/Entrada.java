package com.upv.integra.model.associados;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class Entrada {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name ="ENTRA_CD_ID")
	private Long id;

	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name = "ENTRA_DT_ENTRA")
	private Date dt_entrada;
	
	@Column(name ="ENTRA_TX_TIPO")
	private String tipo;
	
	@Column(name ="ENTRA_TX_QUANT")
	private String quant;
	
	@Column(name ="ENTRA_TX_OBS")
	private String obs;

	@Override
	public String toString() {
		return "Entrada [id=" + id + ", dt_entrada=" + dt_entrada + ", tipo=" + tipo + ", quant=" + quant + ", obs="
				+ obs + "]";
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getDt_entrada() {
		return dt_entrada;
	}

	public void setDt_entrada(Date dt_entrada) {
		this.dt_entrada = dt_entrada;
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
