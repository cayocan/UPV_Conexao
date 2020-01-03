package com.upv.integra.model.dto;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.upv.integra.model.DadosCadastrais;
import com.upv.integra.model.Pessoa;


public class PessoaDTO {
	
	private Long id;
	private DadosCadastrais contact;
	private String name;
	private String CPF;
	private String pin;
	private String password;
	
	@JsonFormat(pattern="dd/MM/yyyy HH:mm:ss",  timezone="GMT-3")
	private Date lastUpdate;
	
	public PessoaDTO() {
		// TODO Auto-generated constructor stub
	}

	public PessoaDTO(Pessoa p) {
		this.id = p.getId();
		this.contact = p.getDadosCadastrais();
		this.CPF = p.getCpf();
		this.name = p.getNome();
		this.lastUpdate = p.getLastUpdate();
//		if(p.getOrigin() != null) {
//			this.origin = p.getOrigin().getDescription();
//		}
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public DadosCadastrais getContact() {
		return contact;
	}

	public void setContact(DadosCadastrais contact) {
		this.contact = contact;
	}

	public String getCPF() {
		return CPF;
	}

	public void setCPF(String cPF) {
		CPF = cPF;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPin() {
		return pin;
	}

	public void setPin(String pin) {
		this.pin = pin;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Date getLastUpdate() {
		return lastUpdate;
	}

	public void setLastUpdate(Date lastUpdate) {
		this.lastUpdate = lastUpdate;
	}	
	
}
