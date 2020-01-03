package com.upv.integra.model.acompanhamentos;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class Internacao {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name ="INTER_CD_ID")
	private Long id;

	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name = "INTER_DT_INTER")
	private Date dt_Internacao;
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name = "INTER_DT_ALTA")
	private Date dt_Alta;
	
	@Column(name ="INTER_TX_HOSPITAL")
	private String hospital;

	@Column(name = "INTER_TX_MED")
	private String interMedico;
	
	@Column(name = "INTER_TX_MED_ESPEC")
	private String interMedicoEspec;
	
	@Column(name ="INTER_TX_OBS")
	private String obs;
	
	@Column(name ="INTER_TX_INTERMED")
	private String intercorrenciaMedica;

	@Override
	public String toString() {
		return "Internacao [id=" + id + ", dt_Internacao=" + dt_Internacao + ", dt_Alta=" + dt_Alta + ", hospital="
				+ hospital + ", interMedico=" + interMedico + ", interMedicoEspec=" + interMedicoEspec + ", obs=" + obs
				+ ", intercorrenciaMedica=" + intercorrenciaMedica + "]";
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getDt_Internacao() {
		return dt_Internacao;
	}

	public void setDt_Internacao(Date dt_Internacao) {
		this.dt_Internacao = dt_Internacao;
	}

	public Date getDt_Alta() {
		return dt_Alta;
	}

	public void setDt_Alta(Date dt_Altao) {
		this.dt_Alta = dt_Altao;
	}

	public String getHospital() {
		return hospital;
	}

	public void setHospital(String hospital) {
		this.hospital = hospital;
	}

	public String getObs() {
		return obs;
	}

	public void setObs(String obs) {
		this.obs = obs;
	}

	public String getIntercorrenciaMedica() {
		return intercorrenciaMedica;
	}

	public void setIntercorrenciaMedica(String intercorrenciaMedica) {
		this.intercorrenciaMedica = intercorrenciaMedica;
	}
	
	public String getInterMedico() {
		return interMedico;
	}

	public void setInterMedico(String interMedico) {
		this.interMedico = interMedico;
	}

	public String getInterMedicoEspec() {
		return interMedicoEspec;
	}

	public void setInterMedicoEspec(String interMedicoEspec) {
		this.interMedicoEspec = interMedicoEspec;
	}
	
}
