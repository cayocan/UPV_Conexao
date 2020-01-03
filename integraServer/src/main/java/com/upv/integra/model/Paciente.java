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

import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.lang.Nullable;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import io.swagger.annotations.ApiModelProperty;

@Entity
public class Paciente {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name ="PACI_CD_ID")
	private Long id;	
	
	@OneToOne
	@JoinColumn(name = "PERSON_CD_ID")
	private Pessoa pessoa;
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name ="PACI_DT_AFILI")
	private Date dataAfiliacao;

	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name ="PACI_DT_CAD")
	private Date dataCadastro;
	
	@ApiModelProperty(value = "Funcionario que cadastrou")
	@ManyToOne
	@JoinColumn(name = "FUNC_CD_ID")
	private Funcionario cadastradoPor;
	
	@Column(name ="PACI_TX_CHEGOU")
	private String comoChegou;
	
	@Column(name ="PACI_TX_CNS")
	private String cns;
	
	@Column(name ="PACI_TX_LAUDO")
	private String laudo;
	
	@Column(name ="PACI_TX_CIVIL")
	private String estadoCivil;	

	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name ="PACI_DT_OBITO")
	private Date obitoData;
	
	@Column(name ="PACI_TX_OBITO")
	private String obitoMotivo;
	
	@LastModifiedDate
	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name="PERSON_DT_LAST_UPDATE")
	private Date lastUpdate;
	

	@Column(name ="ECON_TX_MORA")
	private String moraCom;
	
	@Column(name ="ECON_BOOL_MORA")
	private Boolean moraPais;
	
	@Column(name ="ECON_NR_MORA")
	private Integer moraQts;
	
	@Column(name ="ECON_NR_RENDA")
	private Renda renda;
	
	@Column(name ="ECON_NR_ALELOS")
	private Alelos alelos;
	
	@Column(name ="ECON_TX_BENE")
	private String beneficio;
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name = "DIAG_DT_DIAG")
	private Date dt_diag;
	
	@Column(name = "DIAG_TX_CENT")
	private String centroTratamento;
	
	@Column(name = "DIAG_TX_MED")
	private String diagMedico;
	
	@Column(name = "DIAG_TX_MED_ESPEC")
	private String diagMedicoEspec;
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name = "DIAG_DT_PE")
	private Date dt_pezinho;
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name = "DIAG_DT_SUOR")
	private Date dt_suor;
	
	@Column(name = "DIAG_TX_LOCALSUOR")
	private String localSuor;
	
	@Column(name = "DIAG_TX_VALORSUOR")
	private String valorSuor;
	
	@Column(name = "PACI_TX_DESLIG")
	private String desligamento;
	
	@Column(name = "PACI_TX_OBSDESLIG")
	private String obsDesligamento;
	
	@Column(name = "PACI_BOOL_DESLIG")
	private Boolean desligado;
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name = "DIAG_DT_GEN")
	private Date dt_testGen;
	
	@Column(name = "DIAG_TX_ALELOS")
	private String tipoAlelos;
	
	@Column(name = "DIAG_TX_MUTA")
	private String mutacoes;
	
	@Column(name = "DIAG_TX_MUTA2")
	private String mutacoes2;
	
	@Column(name = "DIAG_TX_MANIFEST")
	private String manifestacoes;
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name = "TRANSPLANT_DT_TRANSPLANT")
	private Date dt_transplante;
	
	@Column(name ="TRANSPLANT_TX_ORG")
	private String orgao;
	
	@Column(name ="TRANSPLANT_TX_HOSPITAL")
	private String hospital;
	
	@Column(name = "TRANSPLANT_TX_MED")
	private String transplantMedico;
	
	@Column(name = "PACI_TX_EMERG")
	private String contatoEmerg;
	
	@Column(name = "PACI_TX_FALAR")
	private String falarCom;

	@JsonIgnore
	@Nullable
	@OneToMany(mappedBy = "paciente", fetch=FetchType.LAZY, cascade = CascadeType.ALL) 
	private Set<Acompanhamento> acomps;
	
	@JsonIgnore
	@Nullable
	@OneToMany(mappedBy = "paciente", fetch=FetchType.LAZY, cascade = CascadeType.ALL) 
	private Set<Associado> associados;

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

	public Funcionario getCadastradoPor() {
		return cadastradoPor;
	}

	public void setCadastradoPor(Funcionario cadastradoPor) {
		this.cadastradoPor = cadastradoPor;
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

	public Set<Acompanhamento> getAcomps() {
		return acomps;
	}

	public void setAcomps(Set<Acompanhamento> acomps) {
		this.acomps = acomps;
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

	public Set<Associado> getAssociados() {
		return associados;
	}

	public void setAssociados(Set<Associado> associados) {
		this.associados = associados;
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
