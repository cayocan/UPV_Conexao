package com.upv.integra.model.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.upv.integra.model.Atendimento;
import com.upv.integra.model.Pessoa;

public class AtendimentoDTO {
	
	private Long funcId;
	private Long atendId;
	private Pessoa pessoa;
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	private Date dataAtendimento;
	
	private String funcNome;
	private String comoChegou;
	private String tipo;
	private String obs;
	private String local;
	private String demanda;
	private Boolean atualizar;
	
	public AtendimentoDTO() {
		// TODO Auto-generated constructor stub
	}

	public AtendimentoDTO(Atendimento f) {
		this.atendId = f.getId();
		this.pessoa = f.getPessoa();
		this.comoChegou = f.getComoChegou();
		this.tipo = f.getTipo();
		this.obs = f.getObs();
		this.local = f.getLocal();
		this.demanda = f.getDemanda();
		this.dataAtendimento = f.getDataAtendimento();
		this.funcId = f.getCadastradoPor().getId();
		this.funcNome = f.getFuncNome();
	}

	@Override
	public String toString() {
		return "AtendimentoDTO [atualizar="+ atualizar+", funcId=" + funcId + ", funcNome="+ funcNome +", atendId=" + atendId + ", pessoa=" + pessoa + ", dataAtendimento="
				+ dataAtendimento + ", comoChegou=" + comoChegou + ", tipo=" + tipo + ", obs=" + obs + ", local="
				+ local + ", demanda=" + demanda + "]";
	}

	public Long getFuncId() {
		return funcId;
	}

	public void setFuncId(Long funcId) {
		this.funcId = funcId;
	}

	public Long getAtendId() {
		return atendId;
	}

	public void setAtendId(Long atendId) {
		this.atendId = atendId;
	}

	public Pessoa getPessoa() {
		return pessoa;
	}

	public void setPessoa(Pessoa pessoa) {
		this.pessoa = pessoa;
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

	public String getFuncNome() {
		return funcNome;
	}

	public void setFuncNome(String funcNome) {
		this.funcNome = funcNome;
	}

	public Boolean getAtualizar() {
		return atualizar;
	}

	public void setAtualizar(Boolean atualizar) {
		this.atualizar = atualizar;
	}	
}
