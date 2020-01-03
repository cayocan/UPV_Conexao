package com.upv.integra.model;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.data.annotation.Transient;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Transactional
public class Atendimento {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name ="ATEND_CD_ID")
	private Long id;	
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name ="ATEND_DT_CONTAT")
	private Date dataAtendimento;

	@Column(name ="ATEND_TX_CHEGOU")
	private String comoChegou;
	
	@Column(name ="ATEND_TX_TIPO")
	private String tipo;
	
	@Column(name ="ATEND_TX_OBS")
	private String obs;
	
	@Column(name ="ATEND_TX_LOCAL")
	private String local;
	
	@Column(name ="ATEND_TX_FUNCNOME")
	private String funcNome;
	
	@Column(name ="ATEND_TX_DEM")
	private String demanda;
	
	@OneToOne
	@JoinColumn(name = "PERSON_CD_ID")
	private Pessoa pessoa;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@LazyCollection(LazyCollectionOption.FALSE)
	@JoinColumn(name = "FUNC_CD_ID")
	private Funcionario cadastradoPor;
	
//	@Transient
//    public Long funcid() {
//        return getCadastradoPor().getId();
//    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getDataAtendimento() {
		return dataAtendimento;
	}

	public void setDataAtendimento(Date dataAtendimento) {
		this.dataAtendimento = dataAtendimento;
	}

	public String getComoChegou() {
		return comoChegou;
	}

	public void setComoChegou(String comoChegou) {
		this.comoChegou = comoChegou;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public String getObs() {
		return obs;
	}

	public void setObs(String obs) {
		this.obs = obs;
	}

	public String getLocal() {
		return local;
	}

	public void setLocal(String local) {
		this.local = local;
	}

	public String getDemanda() {
		return demanda;
	}

	public void setDemanda(String demanda) {
		this.demanda = demanda;
	}

	public Pessoa getPessoa() {
		return pessoa;
	}

	public void setPessoa(Pessoa pessoa) {
		this.pessoa = pessoa;
	}

	public Funcionario getCadastradoPor() {
		return cadastradoPor;
	}

	public void setCadastradoPor(Funcionario cadastradoPor) {
		this.cadastradoPor = cadastradoPor;
	}

	public String getFuncNome() {
		return funcNome;
	}

	public void setFuncNome(String funcNome) {
		this.funcNome = funcNome;
	}
	
}
