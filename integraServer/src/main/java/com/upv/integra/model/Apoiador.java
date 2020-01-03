package com.upv.integra.model;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.springframework.lang.Nullable;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Apoiador {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name ="APOIA_CD_ID")
	private Long id;	
	
	@OneToOne
	@JoinColumn(name = "PERSON_CD_ID")
	private Pessoa pessoa;
	
	@Column(name ="APOIA_TX_TIPO")
	private String tipoDoador;
	
	@Column(name ="APOIA_CD_FUNCID")
	private Long funcId;
	
	@Column(name ="APOIA_TX_FUNCNOME")
	private String funcNome;
	
	@Column(name ="APOIA_TX_EMPRESA")
	private String empresa;
	
	@JsonIgnore
	@OneToOne
	@JoinColumn(name = "FUNC_CD_ID")
	private Funcionario cadastradoPor;
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name ="APOIA_DT_CAD")
	private Date dataCadastrado;
	
	@JsonIgnore
	@Nullable
	@OneToMany(mappedBy = "apoiador", fetch=FetchType.LAZY,cascade = CascadeType.ALL) 
	private Set<ApoiadorContato> apoiadorContatos;
	
	@JsonIgnore
	@Nullable
	@OneToMany(mappedBy = "apoiador", fetch=FetchType.LAZY,cascade = CascadeType.ALL) 
	private Set<Doacao> doacoes;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getFuncId() {
		return funcId;
	}

	public void setFuncId(Long funcId) {
		this.funcId = funcId;
	}

	public Pessoa getPessoa() {
		return pessoa;
	}

	public void setPessoa(Pessoa pessoa) {
		this.pessoa = pessoa;
	}

	public String getTipoDoador() {
		return tipoDoador;
	}

	public void setTipoDoador(String tipoDoador) {
		this.tipoDoador = tipoDoador;
	}

	public Funcionario getCadastradoPor() {
		return cadastradoPor;
	}

	public void setCadastradoPor(Funcionario cadastradoPor) {
		this.cadastradoPor = cadastradoPor;
	}

	public Date getDataCadastrado() {
		return dataCadastrado;
	}

	public void setDataCadastrado(Date dataCadastrado) {
		this.dataCadastrado = dataCadastrado;
	}

	public Set<ApoiadorContato> getApoiadorContatos() {
		return apoiadorContatos;
	}

	public void setApoiadorContatos(Set<ApoiadorContato> apoiadorContatos) {
		this.apoiadorContatos = apoiadorContatos;
	}

	public Set<Doacao> getDoacoes() {
		return doacoes;
	}

	public void setDoacoes(Set<Doacao> doacoes) {
		this.doacoes = doacoes;
	}

	public String getFuncNome() {
		return funcNome;
	}

	public void setFuncNome(String funcNome) {
		this.funcNome = funcNome;
	}

	public String getEmpresa() {
		return empresa;
	}

	public void setEmpresa(String empresa) {
		this.empresa = empresa;
	}
}
