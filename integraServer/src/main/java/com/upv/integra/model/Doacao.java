package com.upv.integra.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Doacao {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name ="DOA_CD_ID")
	private Long id;

	@Column(name ="DOA_TX_VALOR")
	private String valor;
	
	@Column(name ="DOA_TX_PERI")
	private String periodicidade;
	
	@Column(name ="DOA_TX_OBS")
	private String forma;
	
	@Column(name ="DOA_TX_FUNCNOME")
	private String funcNome;
	
	@ManyToOne
	@JoinColumn(name = "APOIA_CD_ID")
	private Apoiador apoiador;

	@Override
	public String toString() {
		return "Doacao [id=" + id + ", valor=" + valor + ", periodicidade=" + periodicidade + ", forma=" + forma
				+ ", apoiador=" + apoiador + "]";
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getValor() {
		return valor;
	}

	public void setValor(String valor) {
		this.valor = valor;
	}

	public String getPeriodicidade() {
		return periodicidade;
	}

	public void setPeriodicidade(String periodicidade) {
		this.periodicidade = periodicidade;
	}

	public String getForma() {
		return forma;
	}

	public void setForma(String forma) {
		this.forma = forma;
	}

	public Apoiador getApoiador() {
		return apoiador;
	}

	public void setApoiador(Apoiador apoiador) {
		this.apoiador = apoiador;
	}

	public String getFuncNome() {
		return funcNome;
	}

	public void setFuncNome(String funcNome) {
		this.funcNome = funcNome;
	}
}
