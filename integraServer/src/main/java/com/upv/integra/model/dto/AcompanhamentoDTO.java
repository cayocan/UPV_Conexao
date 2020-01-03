package com.upv.integra.model.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.upv.integra.model.Acompanhamento;
import com.upv.integra.model.TipoAcompanhamento;
import com.upv.integra.model.acompanhamentos.Consulta;
import com.upv.integra.model.acompanhamentos.Internacao;
import com.upv.integra.model.acompanhamentos.Receita;

public class AcompanhamentoDTO {
	
	private Long id;
	private Long funcId;
	private String funcNome;
	private Long paciId;
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	private Date dt_atendimento;	
	
	private String obs;
	
	private String tipoAcomp;
	//private TipoAcompanhamento tipoAcomp;
	
	private Receita receita;
	
	private Internacao internacao;
	
	private Consulta consulta;
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	private Date lastUpdate;
	
	public AcompanhamentoDTO() {
		// TODO Auto-generated constructor stub
	}
	
	public AcompanhamentoDTO( Acompanhamento a) {
		this.id = a.getId();
		this.funcId = a.getCadastradoPor().getId();
		this.funcNome = a.getFuncNome();
		this.paciId = a.getPaciente().getId();
		this.dt_atendimento = a.getDt_atendimento();
		this.obs = a.getObs();
		this.tipoAcomp = a.getTipoAcomp().toString();
		this.receita = a.getReceita();
		this.internacao = a.getInternacao();
		this.consulta = a.getConsulta();
		this.lastUpdate = a.getLastUpdate();
	}
	
	@Override
	public String toString() {
		return "AcompanhamentoDTO [id=" + id + ", funcId=" + funcId + ", funcNome=" + funcNome + ", paciId=" + paciId
				+ ", dt_atendimento=" + dt_atendimento + ", obs=" + obs + ", tipoAcomp=" + tipoAcomp + ", receita="
				+ receita + ", internacao=" + internacao + ", consulta=" + consulta + "]";
	}

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

	public String getFuncNome() {
		return funcNome;
	}

	public void setFuncNome(String funcNome) {
		this.funcNome = funcNome;
	}

	public Long getPaciId() {
		return paciId;
	}

	public void setPaciId(Long paciId) {
		this.paciId = paciId;
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

	public String getTipoAcomp() {
		return tipoAcomp;
	}

	public void setTipoAcomp(String tipoAcomp) {
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

}
