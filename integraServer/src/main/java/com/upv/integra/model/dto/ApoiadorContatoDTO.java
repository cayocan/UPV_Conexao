package com.upv.integra.model.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.upv.integra.model.ApoiadorContato;

public class ApoiadorContatoDTO {
	
	private Long id;
	private Long apoiaId;
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	
	private Date dataContato;
	private String tema;
	private String funcNome;
	private String obs;
	public ApoiadorContatoDTO() {
		// TODO Auto-generated constructor stub
	}
	
	public ApoiadorContatoDTO( ApoiadorContato a) {
		this.id = a.getId();
		this.apoiaId = a.getApoiador().getId();
		this.dataContato = a.getDataContato();
		this.tema = a.getTema();
		this.obs = a.getObs();
		this.funcNome = a.getFuncNome();
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getApoiaId() {
		return apoiaId;
	}
	public void setApoiaId(Long apoiaID) {
		this.apoiaId = apoiaID;
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
