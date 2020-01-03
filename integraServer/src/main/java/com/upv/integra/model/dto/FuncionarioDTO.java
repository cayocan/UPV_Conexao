package com.upv.integra.model.dto;

import com.upv.integra.model.Funcionario;
import com.upv.integra.model.Pessoa;

public class FuncionarioDTO {	

	private Long funcId;
	private String assocName;
	private Long assocId;
	private String cargo;
	private Pessoa pessoa;
	private String password;
	
	public FuncionarioDTO() {
		// TODO Auto-generated constructor stub
	}

	public FuncionarioDTO(Funcionario f) {
		this.funcId = f.getId();
		this.pessoa = f.getPessoa();
		this.assocId = f.getAssociacao().getId();
		this.assocName = f.getAssociacao().getNome()+" - "+f.getAssociacao().getSigla();
		this.cargo = f.getCargo();
//		if(p.getOrigin() != null) {
//			this.origin = p.getOrigin().getDescription();
//		}
	}

	@Override
	public String toString() {
		return "FuncionarioDTO [funcId=" + funcId + ", assocName=" + assocName + ", assocId=" + assocId + ", cargo="
				+ cargo + ", pessoa=" + pessoa + ", password=" + password + "]";
	}

	public Long getFuncId() {
		return funcId;
	}

	public void setFuncId(Long funcId) {
		this.funcId = funcId;
	}

	public String getAssocName() {
		return assocName;
	}

	public void setAssocName(String assocName) {
		this.assocName = assocName;
	}

	public String getCargo() {
		return cargo;
	}

	public void setCargo(String cargo) {
		this.cargo = cargo;
	}

	public Long getId() {
		return funcId;
	}

	public void setId(Long id) {
		this.funcId = id;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Pessoa getPessoa() {
		return pessoa;
	}

	public void setPessoa(Pessoa pessoa) {
		this.pessoa = pessoa;
	}

	public Long getAssocId() {
		return assocId;
	}

	public void setAssocId(Long assocId) {
		this.assocId = assocId;
	}
}
