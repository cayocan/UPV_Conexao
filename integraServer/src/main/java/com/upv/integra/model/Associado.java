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

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.data.annotation.LastModifiedDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.upv.integra.model.associados.Desligamento;
import com.upv.integra.model.associados.Doado;
import com.upv.integra.model.associados.Entrada;
import com.upv.integra.model.associados.Recebido;

@Entity
public class Associado {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name ="ASSOCIADO_CD_ID")
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@LazyCollection(LazyCollectionOption.FALSE)
	@JoinColumn(name = "FUNC_CD_ID")
	private Funcionario cadastradoPor;
	
	@Column(name = "ASSOCIADO_TX_FUNC")
	private String funcNome;
	
	@ManyToOne
	@JoinColumn(name = "PACI_CD_ID")
	private Paciente paciente;
	
	@Column(name ="ASSOCIADO_CD_TYPE")
	private TipoAssociado tipoAssoc;
		
	@LastModifiedDate
	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name="ASSOCIADO_DT_LAST_UPDATE")
	private Date lastUpdate;
	
	@OneToOne(fetch=FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "DOADO_CD_ID")
	private Doado doado;
	
	@OneToOne(fetch=FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "RECEB_CD_ID")
	private Recebido recebido;
	
	@OneToOne(fetch=FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "ENTRA_CD_ID")
	private Entrada entrada;
	
	@OneToOne(fetch=FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "DESLIG_CD_ID")
	private Desligamento desligamento;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Funcionario getCadastradoPor() {
		return cadastradoPor;
	}

	public void setCadastradoPor(Funcionario cadastradoPor) {
		this.cadastradoPor = cadastradoPor;
	}

	public Paciente getPaciente() {
		return paciente;
	}

	public void setPaciente(Paciente paciente) {
		this.paciente = paciente;
	}

	public TipoAssociado getTipoAssoc() {
		return tipoAssoc;
	}

	public void setTipoAssoc(TipoAssociado tipoAssoc) {
		this.tipoAssoc = tipoAssoc;
	}

	public Date getLastUpdate() {
		return lastUpdate;
	}

	public void setLastUpdate(Date lastUpdate) {
		this.lastUpdate = lastUpdate;
	}

	public Doado getDoado() {
		return doado;
	}

	public void setDoado(Doado doado) {
		this.doado = doado;
	}

	public Recebido getRecebido() {
		return recebido;
	}

	public void setRecebido(Recebido recebido) {
		this.recebido = recebido;
	}

	public Entrada getEntrada() {
		return entrada;
	}

	public void setEntrada(Entrada entrada) {
		this.entrada = entrada;
	}

	public Desligamento getDesligamento() {
		return desligamento;
	}

	public void setDesligamento(Desligamento desligamento) {
		this.desligamento = desligamento;
	}

	public String getFuncNome() {
		return funcNome;
	}

	public void setFuncNome(String funcNome) {
		this.funcNome = funcNome;
	}
	
}
