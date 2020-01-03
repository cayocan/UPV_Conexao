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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.lang.Nullable;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Pessoa {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	@Column(name = "PERSON_CD_ID")
	private Long id;

	@Column(name = "PERSON_TX_NOME")
	private String nome;

	@Column(name = "PERSON_TX_CPF")
	private String cpf;

	@Column(name = "PERSON_TX_RG")
	private String rg;

	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name = "PERSON_DT_NASC")
	private Date dataNascimento;

	@Column(name = "PERSON_CD_SEX")
	private Sexo sexo;

	@Column(name = "PERSON_TX_MAE")
	private String nomeMae;

	@Column(name = "PERSON_TX_PAI")
	private String nomePai;

	@Column(name = "PERSON_TX_PROF")
	private String profissao;

	@Column(name = "PERSON_BOOL_DIAG")
	private Boolean situacaoDiagnostico;

	@ManyToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "DC_CD_ID")
	private DadosCadastrais dadosCadastrais;

	@CreatedDate
	@JsonFormat(pattern = "dd/MM/yyyy", timezone = "GMT-3")
	@Column(name = "PERSON_DT_REGISTER")
	private Date dateRegister;

	@LastModifiedDate
	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name = "PERSON_DT_LAST_UPDATE")
	private Date lastUpdate;

	public Date getDateRegister() {
		return dateRegister;
	}

	public void setDateRegister(Date dateRegister) {
		this.dateRegister = dateRegister;
	}

	public Date getLastUpdate() {
		return lastUpdate;
	}

	public void setLastUpdate(Date lastUpdate) {
		this.lastUpdate = lastUpdate;
	}

	@Column(name = "PERSON_BOOL_ENABLE")
	private Boolean enable;

//	@Nullable
//	@OneToOne(mappedBy = "pessoa", fetch=FetchType.LAZY, optional=false) 
//	private Funcionario funcionario;
//	
//	@JsonIgnore
//	@Nullable
//	@OneToOne(mappedBy = "pessoa", fetch=FetchType.LAZY, optional=false) 
//	private Medico medico;
//	
//	@JsonIgnore
//	@Nullable
//	@OneToOne(mappedBy = "pessoa", fetch=FetchType.LAZY, optional=false) 
//	private Apoiador apoiador;
//	
//	@JsonIgnore
//	@Nullable
//	@OneToOne(mappedBy = "cadastradoPor", fetch=FetchType.LAZY) 
//	private Atendimento atendimento;

	@Override
	public String toString() {
		return "Pessoa [id=" + id + ", nome=" + nome + ", cpf=" + cpf + ", rg=" + rg + ", dataNascimento="
				+ dataNascimento + ", sexo=" + sexo + ", nomeMae=" + nomeMae + ", nomePai=" + nomePai + ", profissao="
				+ profissao + ", situacaoDiagnostico=" + situacaoDiagnostico + ", dadosCadastrais=" + dadosCadastrais
				+ ", dateRegister=" + dateRegister + ", lastUpdate=" + lastUpdate + ", enable=" + enable + "]";
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

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getRg() {
		return rg;
	}

	public void setRg(String rg) {
		this.rg = rg;
	}

	public Date getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(Date dataNascimento) {
		this.dataNascimento = dataNascimento;
	}

	public Sexo getSexo() {
		return sexo;
	}

	public void setSexo(Sexo sexo) {
		this.sexo = sexo;
	}

	public String getNomeMae() {
		return nomeMae;
	}

	public void setNomeMae(String nomeMae) {
		this.nomeMae = nomeMae;
	}

	public String getNomePai() {
		return nomePai;
	}

	public void setNomePai(String nomePai) {
		this.nomePai = nomePai;
	}

	public String getProfissao() {
		return profissao;
	}

	public void setProfissao(String profissao) {
		this.profissao = profissao;
	}

	public Boolean getSituacaoDiagnostico() {
		return situacaoDiagnostico;
	}

	public void setSituacaoDiagnostico(Boolean situacaoDiagnostico) {
		this.situacaoDiagnostico = situacaoDiagnostico;
	}

	public DadosCadastrais getDadosCadastrais() {
		return dadosCadastrais;
	}

	public void setDadosCadastrais(DadosCadastrais dadosCadastrais) {
		this.dadosCadastrais = dadosCadastrais;
	}

	public Boolean getEnable() {
		return enable;
	}

	public void setEnable(Boolean enable) {
		this.enable = enable;
	}

//	public Funcionario getFuncionario() {
//		return funcionario;
//	}
//
//	public void setFuncionario(Funcionario funcionario) {
//		this.funcionario = funcionario;
//	}
//
//	public Medico getMedico() {
//		return medico;
//	}
//
//	public void setMedico(Medico medico) {
//		this.medico = medico;
//	}
//
//	public Apoiador getApoiador() {
//		return apoiador;
//	}
//
//	public void setApoiador(Apoiador apoiador) {
//		this.apoiador = apoiador;
//	}
//
//	public Atendimento getAtendimentos() {
//		return atendimento;
//	}
//
//	public void setAtendimentos(Atendimento atendimento) {
//		this.atendimento = atendimento;
//	}

}
