package com.upv.integra.model.dto;

import com.upv.integra.model.ApoiadorContato;
import com.upv.integra.model.Doacao;

public class DoacaoDTO {
	
	private Long id;
	private String valor;
	private String periodicidade;
	private String forma;
	private String funcNome;
	private Long apoiaId;
	
	public DoacaoDTO() {
		// TODO Auto-generated constructor stub
	}
	
	public DoacaoDTO( Doacao a) {
		this.id = a.getId();
		this.apoiaId = a.getApoiador().getId();
		this.periodicidade = a.getPeriodicidade();
		this.forma = a.getForma();
		this.valor = a.getValor();
		this.funcNome = a.getFuncNome();
	}
	
	@Override
	public String toString() {
		return "DoacaoDTO [id=" + id + ", valor=" + valor + ", periodicidade=" + periodicidade + ", forma=" + forma
				+ ", apoiaId=" + apoiaId + "]";
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
	public Long getApoiaId() {
		return apoiaId;
	}
	public void setApoiaId(Long apoiaId) {
		this.apoiaId = apoiaId;
	}

	public String getFuncNome() {
		return funcNome;
	}

	public void setFuncNome(String funcNome) {
		this.funcNome = funcNome;
	}

}
