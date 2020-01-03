package com.upv.integra.model.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.upv.integra.model.Associado;
import com.upv.integra.model.TipoAssociado;
import com.upv.integra.model.associados.Desligamento;
import com.upv.integra.model.associados.Doado;
import com.upv.integra.model.associados.Entrada;
import com.upv.integra.model.associados.Recebido;

public class AssociadoDTO {
	
	private Long id;
	private Long funcId;
	private String funcNome;
	private Long paciId;
	private TipoAssociado tipoAssoc;
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	private Date lastUpdate;

	private Doado doado;

	private Recebido recebido;

	private Entrada entrada;

	private Desligamento desligamento;
	
	public AssociadoDTO() {
		// TODO Auto-generated constructor stub
	}
	
	public AssociadoDTO( Associado a) {
		this.id = a.getId();
		this.funcId = a.getCadastradoPor().getId();
		this.funcNome = a.getFuncNome();
		this.paciId = a.getPaciente().getId();
		this.doado = a.getDoado();
		this.recebido = a.getRecebido();
		this.entrada = a.getEntrada();
		this.desligamento = a.getDesligamento();
		this.tipoAssoc = a.getTipoAssoc();
		this.lastUpdate = a.getLastUpdate();
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
	
}
