package com.upv.integra.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class ApoiadorContato {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name ="APOIACONTACT_CD_ID")
	private Long id;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "APOIA_CD_ID")
	private Apoiador apoiador;
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name ="APOIACONTACT_DT_CONTAT")
	private Date dataContato;
	
	@Column(name ="APOIACONTACT_TX_TEMA")
	private String tema;
	
	@Column(name ="APOIACONTACT_TX_FUNCNOME")
	private String funcNome;
	
	@Column(name ="APOIACONTACT_TX_OBS")
	private String obs;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Apoiador getApoiador() {
		return apoiador;
	}

	public void setApoiador(Apoiador apoiador) {
		this.apoiador = apoiador;
	}

	public Date getDataContato() {
		return dataContato;
	}

	public void setDataContato(Date dataContato) {
		this.dataContato = dataContato;
	}

	public String getTema() {
		return tema;
	}

	public void setTema(String tema) {
		this.tema = tema;
	}

	public String getObs() {
		return obs;
	}

	public void setObs(String obs) {
		this.obs = obs;
	}

	public String getFuncNome() {
		return funcNome;
	}

	public void setFuncNome(String funcNome) {
		this.funcNome = funcNome;
	}
}
