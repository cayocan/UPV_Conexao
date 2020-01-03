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
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.springframework.lang.Nullable;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
//@Where(clause="ASSOC_BOOL_ENABLE = 't'")
public class Associacao {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name ="ASSOC_CD_ID")
	private Long id;
	
	@Column(name = "ASSOC_TX_NOME")
	private String nome;
	
	@Column(name = "ASSOC_TX_SIGLA")
	private String sigla;
	
	@Column(name = "ASSOC_TX_CNPJ")
	private String cnpj;
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name = "ASSOC_DT_FUND")
	private Date dt_Fundacao;
	
	@JsonIgnore
	@OneToOne(mappedBy = "associacao", fetch=FetchType.LAZY, optional=false, cascade = CascadeType.ALL) 
	private IntegraLogin integraLogin;
	
	@Column(name = "ASSOC_TX_MISSAO")
	private String missao;
	
	@Column(name = "ASSOC_TX_SITE")
	private String site;
	
	@ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
	@JoinColumn(name = "DC_CD_ID")
	private DadosCadastrais dadosCadastrais;
	
	@Nullable
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name="ASSOC_CD_CERTS", joinColumns=
		{@JoinColumn(name="ASSOC_CD_ID")}, inverseJoinColumns=
		  {@JoinColumn(name="CERT_CD_ID")})
	private Set<Certificacao> certificacoes;
	
	@Column(name ="ASSOC_TX_OTHERCERTS")
	private String outrasCertificacoes;
	
	@JsonIgnore
	@Nullable
	@OneToMany(mappedBy = "associacao", fetch=FetchType.LAZY,cascade = CascadeType.ALL) 
	private Set<Funcionario> funcionarios;
	
	@Column(name ="ASSOC_TX_PRESID")
	private String presidente;
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name ="ASSOC_DT_PRESIDINI")
	private Date mandatoInicio;
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name ="ASSOC_DT_PRESIDFIM")
	private Date mandatoFim;
	
	@Column(name = "ASSOC_BOOL_ENABLE")
	private Boolean enable;

	@JsonFormat(pattern="dd/MM/yyyy HH:mm:ss",  timezone="GMT-3")
	private Date lastUpdate;

	
	@Override
	public String toString() {
		return "Associacao [id=" + id + ", dadosCadastrais=" + dadosCadastrais + "]";
	}

	public String getPresidente() {
		return presidente;
	}

	public void setPresidente(String presidente) {
		this.presidente = presidente;
	}

	public Date getMandatoInicio() {
		return mandatoInicio;
	}

	public void setMandatoInicio(Date mandatoInicio) {
		this.mandatoInicio = mandatoInicio;
	}

	public Date getMandatoFim() {
		return mandatoFim;
	}

	public void setMandatoFim(Date mandatoFim) {
		this.mandatoFim = mandatoFim;
	}

	public Date getLastUpdate() {
		return lastUpdate;
	}

	public void setLastUpdate(Date lastUpdate) {
		this.lastUpdate = lastUpdate;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getSigla() {
		return sigla;
	}

	public void setSigla(String sigla) {
		this.sigla = sigla;
	}

	public String getCnpj() {
		return cnpj;
	}

	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}

	public Date getDt_Fundacao() {
		return dt_Fundacao;
	}

	public void setDt_Fundacao(Date dt_Fundacao) {
		this.dt_Fundacao = dt_Fundacao;
	}

	public String getMissao() {
		return missao;
	}

	public void setMissao(String missao) {
		this.missao = missao;
	}

	public String getSite() {
		return site;
	}

	public void setSite(String site) {
		this.site = site;
	}

	public DadosCadastrais getDadosCadastrais() {
		return dadosCadastrais;
	}

	public void setDadosCadastrais(DadosCadastrais dadosCadastrais) {
		this.dadosCadastrais = dadosCadastrais;
	}

	public Set<Certificacao> getCertificacoes() {
		return certificacoes;
	}

	public void setCertificacoes(Set<Certificacao> certificacoes) {
		this.certificacoes = certificacoes;
	}

	public Set<Funcionario> getFuncionarios() {
		return funcionarios;
	}

	public void setFuncionarios(Set<Funcionario> funcionarios) {
		this.funcionarios = funcionarios;
	}

	public Boolean getEnable() {
		return enable;
	}

	public void setEnable(Boolean enable) {
		this.enable = enable;
	}

	public IntegraLogin getIntegraLogin() {
		return integraLogin;
	}

	public void setIntegraLogin(IntegraLogin integraLogin) {
		this.integraLogin = integraLogin;
	}

	public String getOutrasCertificacoes() {
		return outrasCertificacoes;
	}

	public void setOutrasCertificacoes(String outrasCertificacoes) {
		this.outrasCertificacoes = outrasCertificacoes;
	}
	
}
