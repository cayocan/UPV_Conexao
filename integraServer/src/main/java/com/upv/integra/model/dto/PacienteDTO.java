package com.upv.integra.model.dto;

import java.util.Date;

import javax.persistence.Column;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.upv.integra.model.Alelos;
import com.upv.integra.model.Paciente;
import com.upv.integra.model.Pessoa;
import com.upv.integra.model.Renda;


public class PacienteDTO {
	
	private Long id;	
	private Pessoa pessoa;
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	private Date dataAfiliacao;

	@JsonFormat(pattern = "dd/MM/yyyy")
	private Date dataCadastro;
	
	private Long funcId;
	private String funcNome;
	private String comoChegou;
	private String cns;
	private String laudo;
	private String estadoCivil;

	@JsonFormat(pattern = "dd/MM/yyyy")
	private Date obitoData;
	
	private String obitoMotivo;
	private Date lastUpdate;
	private String moraCom;
	private Boolean moraPais;
	private Integer moraQts;
	private Renda renda;
	private Alelos alelos;
	private String beneficio;
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	private Date dt_diag;
	
	private String centroTratamento;
	private String diagMedico;
	private String diagMedicoEspec;
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	private Date dt_pezinho;
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	private Date dt_suor;
	
	private String localSuor;
	private String valorSuor;
	private String obsDesligamento;
	private String desligamento;
	private Boolean desligado;	

	@JsonFormat(pattern = "dd/MM/yyyy")
	private Date dt_testGen;
	
	private String tipoAlelos;
	private String mutacoes;
	private String mutacoes2;
	private String manifestacoes;
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	private Date dt_transplante;
	
	private String orgao;
	private String hospital;
	private String transplantMedico;
	private String contatoEmerg;
	private String falarCom;	

	public PacienteDTO() {
		// TODO Auto-generated constructor stub
	}
	
	public PacienteDTO( Paciente a) {
		this.id = a.getId();
		this.pessoa = a.getPessoa();
		this.dataAfiliacao = a.getDataAfiliacao();
		this.dataCadastro = a.getDataCadastro();
		this.funcId = a.getCadastradoPor().getId();
		this.funcNome = a.getCadastradoPor().getPessoa().getNome();
		this.comoChegou = a.getComoChegou();
		this.cns = a.getCns();
		this.obitoData = a.getObitoData();
		this.obitoMotivo = a.getObitoMotivo();
		this.setLastUpdate(a.getLastUpdate());
		this.setMoraCom(a.getMoraCom());
		this.setMoraPais(a.getMoraPais());
		this.setMoraQts(a.getMoraQts());
		this.setRenda(a.getRenda());
		this.setBeneficio(a.getBeneficio());
		this.setDt_diag(a.getDt_diag());
		this.setCentroTratamento(a.getCentroTratamento());
		this.setDiagMedico(a.getDiagMedico());
		this.setDiagMedicoEspec(a.getDiagMedicoEspec());
		this.setDt_pezinho(a.getDt_pezinho());
		this.setDt_suor(a.getDt_suor());
		this.setLocalSuor(a.getLocalSuor());
		this.setValorSuor(a.getValorSuor());
		this.setDesligamento(a.getDesligamento());
		this.setDt_testGen(a.getDt_testGen());
		this.setTipoAlelos(a.getTipoAlelos());
		this.setMutacoes(a.getMutacoes());
		this.setManifestacoes(a.getManifestacoes());
		this.setDt_transplante(a.getDt_transplante());
		this.setOrgao(a.getOrgao());
		this.setHospital(a.getHospital());
		this.setTransplantMedico(a.getTransplantMedico());
		this.setContatoEmerg(a.getContatoEmerg());
		this.setFalarCom(a.getFalarCom());
		this.setLaudo(a.getLaudo());
		this.setEstadoCivil(a.getEstadoCivil());
		this.setAlelos(a.getAlelos());
		this.setMutacoes2(a.getMutacoes2());
		this.setDesligado(a.getDesligado());
		this.setObsDesligamento(a.getObsDesligamento());
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Pessoa getPessoa() {
		return pessoa;
	}

	public void setPessoa(Pessoa pessoa) {
		this.pessoa = pessoa;
	}

	public Date getDataAfiliacao() {
		return dataAfiliacao;
	}

	public void setDataAfiliacao(Date dataAfiliacao) {
		this.dataAfiliacao = dataAfiliacao;
	}

	public Date getDataCadastro() {
		return dataCadastro;
	}

	public void setDataCadastro(Date dataCadastro) {
		this.dataCadastro = dataCadastro;
	}

	public Long getFuncId() {
		return funcId;
	}

	public void setFuncId(Long funcId) {
		this.funcId = funcId;
	}

	public String getComoChegou() {
		return comoChegou;
	}

	public void setComoChegou(String comoChegou) {
		this.comoChegou = comoChegou;
	}

	public String getCns() {
		return cns;
	}

	public void setCns(String cns) {
		this.cns = cns;
	}

	public Date getObitoData() {
		return obitoData;
	}

	public void setObitoData(Date obitoData) {
		this.obitoData = obitoData;
	}

	public String getObitoMotivo() {
		return obitoMotivo;
	}

	public void setObitoMotivo(String obitoMotivo) {
		this.obitoMotivo = obitoMotivo;
	}

	public String getFuncNome() {
		return funcNome;
	}

	public void setFuncNome(String funcNome) {
		this.funcNome = funcNome;
	}

	public Date getLastUpdate() {
		return lastUpdate;
	}

	public void setLastUpdate(Date lastUpdate) {
		this.lastUpdate = lastUpdate;
	}

	public String getMoraCom() {
		return moraCom;
	}

	public void setMoraCom(String moraCom) {
		this.moraCom = moraCom;
	}

	public Boolean getMoraPais() {
		return moraPais;
	}

	public void setMoraPais(Boolean moraPais) {
		this.moraPais = moraPais;
	}

	public Integer getMoraQts() {
		return moraQts;
	}

	public void setMoraQts(Integer moraQts) {
		this.moraQts = moraQts;
	}

	public Renda getRenda() {
		return renda;
	}

	public void setRenda(Renda renda) {
		this.renda = renda;
	}

	public String getBeneficio() {
		return beneficio;
	}

	public void setBeneficio(String beneficio) {
		this.beneficio = beneficio;
	}

	public Date getDt_diag() {
		return dt_diag;
	}

	public void setDt_diag(Date dt_diag) {
		this.dt_diag = dt_diag;
	}

	public String getCentroTratamento() {
		return centroTratamento;
	}

	public void setCentroTratamento(String centroTratamento) {
		this.centroTratamento = centroTratamento;
	}

	public String getDiagMedico() {
		return diagMedico;
	}

	public void setDiagMedico(String diagMedico) {
		this.diagMedico = diagMedico;
	}

	public String getDiagMedicoEspec() {
		return diagMedicoEspec;
	}

	public void setDiagMedicoEspec(String diagMedicoEspec) {
		this.diagMedicoEspec = diagMedicoEspec;
	}

	public Date getDt_pezinho() {
		return dt_pezinho;
	}

	public void setDt_pezinho(Date dt_pezinho) {
		this.dt_pezinho = dt_pezinho;
	}

	public Date getDt_suor() {
		return dt_suor;
	}

	public void setDt_suor(Date dt_suor) {
		this.dt_suor = dt_suor;
	}

	public String getLocalSuor() {
		return localSuor;
	}

	public void setLocalSuor(String localSuor) {
		this.localSuor = localSuor;
	}

	public String getValorSuor() {
		return valorSuor;
	}

	public void setValorSuor(String valorSuor) {
		this.valorSuor = valorSuor;
	}

	public String getDesligamento() {
		return desligamento;
	}

	public void setDesligamento(String desligamento) {
		this.desligamento = desligamento;
	}

	public Date getDt_testGen() {
		return dt_testGen;
	}

	public void setDt_testGen(Date dt_testGen) {
		this.dt_testGen = dt_testGen;
	}

	public String getTipoAlelos() {
		return tipoAlelos;
	}

	public void setTipoAlelos(String tipoAlelos) {
		this.tipoAlelos = tipoAlelos;
	}

	public String getMutacoes() {
		return mutacoes;
	}

	public void setMutacoes(String mutacoes) {
		this.mutacoes = mutacoes;
	}

	public String getManifestacoes() {
		return manifestacoes;
	}

	public void setManifestacoes(String manifestacoes) {
		this.manifestacoes = manifestacoes;
	}

	public Date getDt_transplante() {
		return dt_transplante;
	}

	public void setDt_transplante(Date dt_transplante) {
		this.dt_transplante = dt_transplante;
	}

	public String getOrgao() {
		return orgao;
	}

	public void setOrgao(String orgao) {
		this.orgao = orgao;
	}

	public String getHospital() {
		return hospital;
	}

	public void setHospital(String hospital) {
		this.hospital = hospital;
	}

	public String getTransplantMedico() {
		return transplantMedico;
	}

	public void setTransplantMedico(String transplantMedico) {
		this.transplantMedico = transplantMedico;
	}
	
	public String getContatoEmerg() {
		return contatoEmerg;
	}

	public void setContatoEmerg(String contatoEmerg) {
		this.contatoEmerg = contatoEmerg;
	}

	public String getFalarCom() {
		return falarCom;
	}

	public void setFalarCom(String falarCom) {
		this.falarCom = falarCom;
	}

	public String getLaudo() {
		return laudo;
	}

	public void setLaudo(String laudo) {
		this.laudo = laudo;
	}

	public String getEstadoCivil() {
		return estadoCivil;
	}

	public void setEstadoCivil(String estadoCivil) {
		this.estadoCivil = estadoCivil;
	}

	public Alelos getAlelos() {
		return alelos;
	}

	public void setAlelos(Alelos alelos) {
		this.alelos = alelos;
	}

	public String getMutacoes2() {
		return mutacoes2;
	}

	public void setMutacoes2(String mutacoes2) {
		this.mutacoes2 = mutacoes2;
	}
	
	public Boolean getDesligado() {
		return desligado;
	}

	public void setDesligado(Boolean desligado) {
		this.desligado = desligado;
	}

	public String getObsDesligamento() {
		return obsDesligamento;
	}

	public void setObsDesligamento(String obsDesligamento) {
		this.obsDesligamento = obsDesligamento;
	}
	
}
