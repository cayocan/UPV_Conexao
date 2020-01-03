package com.upv.integra.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.lang.Nullable;

import com.fasterxml.jackson.annotation.JsonIgnore;

import io.swagger.annotations.ApiModelProperty;

@Entity
public class Funcionario {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name ="FUNC_CD_ID")
	private Long id;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "PERSON_CD_ID")
	private Pessoa pessoa;
	
	@Column(name ="FUNC_TX_USERNAME")
	private String username;
	
	@Column(name ="FUNC_TX_CARGO")
	private String cargo;
	
	@JsonIgnore
	@OneToOne(mappedBy = "fucionario", fetch=FetchType.LAZY, optional=false, cascade = CascadeType.ALL) 
	private IntegraLogin integraLogin;

	@JsonIgnore
	@Nullable
	@OneToMany(mappedBy = "cadastradoPor", fetch=FetchType.LAZY) 
	private Set<Apoiador> apoiadores;
	
	@JsonIgnore
	@Nullable
	@ApiModelProperty(value = "Lista de pacientes que cadastrou")
	@OneToMany(mappedBy = "cadastradoPor", fetch=FetchType.LAZY) 
	private Set<Paciente> pacientes;	

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "ASSOC_CD_ID")
	private Associacao associacao;
	
	@JsonIgnore
	@Nullable
	@OneToMany(mappedBy = "cadastradoPor", fetch=FetchType.LAZY)
	@Fetch(value = FetchMode.SELECT)
	private Set<Atendimento> atendimentos;
	
	@JsonIgnore
	@Nullable
	@OneToMany(mappedBy = "cadastradoPor", fetch=FetchType.LAZY) 
	private Set<Acompanhamento> acomp;
	
	@JsonIgnore
	@Nullable
	@OneToMany(mappedBy = "cadastradoPor", fetch=FetchType.LAZY) 
	private Set<Associado> associados;
	
	@Column(name = "FUNC_BOOL_ENABLE")
	private Boolean enable;

	@Override
	public String toString() {
		return "Funcionario [id=" + id + 
//				", pessoaId=" + pessoa.getId() + ", dcId=" + pessoa.getDadosCadastrais().getId() + 
				", username=" + username + ", cargo=" + cargo+ 
//				", integraLoginId=" + integraLogin.getId() + ", associacaoId=" + associacao.getId() + 
				", enable=" + enable + "]";
	}

	public Set<Paciente> getPacientes() {
		return pacientes;
	}

	public void setPacientes(Set<Paciente> pacientes) {
		this.pacientes = pacientes;
	}

	public Boolean getEnable() {
		return enable;
	}

	public void setEnable(Boolean enable) {
		this.enable = enable;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Pessoa getPessoa() {
		return pessoa;
	}

	public void setPessoa(Pessoa pessoa) {
		this.pessoa = pessoa;
	}

	public Set<Apoiador> getApoiadores() {
		return apoiadores;
	}

	public void setApoiadores(Set<Apoiador> apoiadores) {
		this.apoiadores = apoiadores;
	}

	public Associacao getAssociacao() {
		return associacao;
	}

	public void setAssociacao(Associacao associacao) {
		this.associacao = associacao;
	}

	public Set<Atendimento> getAtendimentos() {
		return atendimentos;
	}

	public void setAtendimentos(Set<Atendimento> atendimentos) {
		this.atendimentos = atendimentos;
	}

	public Set<Acompanhamento> getAcomp() {
		return acomp;
	}

	public void setAcomp(Set<Acompanhamento> acomp) {
		this.acomp = acomp;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getCargo() {
		return cargo;
	}

	public void setCargo(String cargo) {
		this.cargo = cargo;
	}

	public IntegraLogin getIntegraLogin() {
		return integraLogin;
	}

	public void setIntegraLogin(IntegraLogin integraLogin) {
		this.integraLogin = integraLogin;
	}

	public Set<Associado> getAssociados() {
		return associados;
	}

	public void setAssociados(Set<Associado> associados) {
		this.associados = associados;
	}
}
