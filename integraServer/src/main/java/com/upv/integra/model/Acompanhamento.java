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

import org.springframework.data.annotation.LastModifiedDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.upv.integra.model.acompanhamentos.Consulta;
import com.upv.integra.model.acompanhamentos.Internacao;
import com.upv.integra.model.acompanhamentos.Receita;

@Entity
public class Acompanhamento {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name ="ACOMP_CD_ID")
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "FUNC_CD_ID")
	private Funcionario cadastradoPor;
	
	@ManyToOne
	@JoinColumn(name = "PACI_CD_ID")
	private Paciente paciente;
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name = "ACOMP_DT_ATEND")
	private Date dt_atendimento;	
	
	@Column(name = "ACOMP_TX_OBS")
	private String obs;
	
	@Column(name = "ACOMP_TX_FUNC")
	private String funcNome;
	
	@Column(name ="ACOMP_CD_TYPE")
	private TipoAcompanhamento tipoAcomp;

	@OneToOne(fetch=FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "RECEITA_CD_ID")
	private Receita receita;

	@OneToOne(fetch=FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "INTER_CD_ID")
	private Internacao internacao;
	
	@OneToOne(fetch=FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "CONSULT_CD_ID")
	private Consulta consulta;
	
	@LastModifiedDate
	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name="ACOMP_DT_LAST_UPDATE")
	private Date lastUpdate;
	
	@Override
	public String toString() {
		return "Acompanhamento [id=" + id + ", cadastradoPor=" + cadastradoPor + ", paciente=" + paciente
				+ ", dt_atendimento=" + dt_atendimento + ", obs=" + obs + ", funcNome=" + funcNome + ", tipoAcomp="
				+ tipoAcomp + ", receita=" + receita + ", internacao=" + internacao + ", consulta=" + consulta
				+ ", lastUpdate=" + lastUpdate + "]";
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

	public Date getDt_atendimento() {
		return dt_atendimento;
	}

	public void setDt_atendimento(Date dt_atendimento) {
		this.dt_atendimento = dt_atendimento;
	}

	public String getObs() {
		return obs;
	}

	public void setObs(String obs) {
		this.obs = obs;
	}

	public TipoAcompanhamento getTipoAcomp() {
		return tipoAcomp;
	}

	public void setTipoAcomp(TipoAcompanhamento tipoAcomp) {
		this.tipoAcomp = tipoAcomp;
	}

	public Receita getReceita() {
		return receita;
	}

	public void setReceita(Receita receita) {
		this.receita = receita;
	}

	public Internacao getInternacao() {
		return internacao;
	}

	public void setInternacao(Internacao internacao) {
		this.internacao = internacao;
	}

	public Consulta getConsulta() {
		return consulta;
	}

	public void setConsulta(Consulta consulta) {
		this.consulta = consulta;
	}

	public String getFuncNome() {
		return funcNome;
	}

	public void setFuncNome(String funcNome) {
		this.funcNome = funcNome;
	}	
	
}
