package com.upv.integra.model.dto;

import java.util.Date;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.upv.integra.model.Associacao;
import com.upv.integra.model.DadosCadastrais;

public class AssociacaoDTO {
	
	private Long id;
	private DadosCadastrais contact;
	private Set<String> certificacoes;
	private String name;
	private String sigla;
	private String cnpj;
	
	@JsonFormat(pattern="dd/MM/yyyy")
	private Date dataFund;
	
	private String password;
	private String missao;
	private String site;
	private String presidente;
	private String outrasCertificacoes;
	
	@JsonFormat(pattern="dd/MM/yyyy")
	private Date mandatoIni;
	@JsonFormat(pattern="dd/MM/yyyy")
	private Date mandatoFim;
	
	@JsonFormat(pattern="dd/MM/yyyy HH:mm:ss",  timezone="GMT-3")
	private Date lastUpdate;
	
	public AssociacaoDTO() {
		// TODO Auto-generated constructor stub
	}

	public AssociacaoDTO(Associacao p) {
		this.id = p.getId();
		this.contact = p.getDadosCadastrais();
		this.cnpj = p.getCnpj();
		this.name = p.getNome();
		this.sigla = p.getSigla();
		this.dataFund = p.getDt_Fundacao();
		this.missao = p.getMissao();
		this.site = p.getSite();
		this.presidente = p.getPresidente();
		this.mandatoIni = p.getMandatoInicio();
		this.mandatoFim = p.getMandatoFim();		
		this.lastUpdate = p.getLastUpdate();
		this.outrasCertificacoes = p.getOutrasCertificacoes();
//		if(p.getOrigin() != null) {
//			this.origin = p.getOrigin().getDescription();
//		}
	}	

	@Override
	public String toString() {
		return "AssociacaoDTO [id=" + id + ", contact=" + contact + ", certificacoes=" + certificacoes + ", name="
				+ name + ", sigla=" + sigla + ", cnpj=" + cnpj + ", dataFund=" + dataFund + ", password=" + password
				+ ", missao=" + missao + ", site=" + site + ", presidente=" + presidente + ", outrasCertificacoes="
				+ outrasCertificacoes + ", mandatoIni=" + mandatoIni + ", mandatoFim=" + mandatoFim + ", lastUpdate="
				+ lastUpdate + ", getId()=" + getId() + ", getContact()=" + getContact() + ", getName()=" + getName()
				+ ", getSigla()=" + getSigla() + ", getCnpj()=" + getCnpj() + ", getDataFund()=" + getDataFund()
				+ ", getPassword()=" + getPassword() + ", getMissao()=" + getMissao() + ", getSite()=" + getSite()
				+ ", getPresidente()=" + getPresidente() + ", getMandatoIni()=" + getMandatoIni() + ", getMandatoFim()="
				+ getMandatoFim() + ", getLastUpdate()=" + getLastUpdate() + ", getCertificacoes()="
				+ getCertificacoes() + ", getClass()=" + getClass() + ", hashCode()=" + hashCode() + ", toString()="
				+ super.toString() + "]";
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public DadosCadastrais getContact() {
		return contact;
	}

	public void setContact(DadosCadastrais contact) {
		this.contact = contact;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSigla() {
		return sigla;
	}

	public void setSigla(String sigla) {
		this.sigla = sigla;
	}

	public String getCnpj() {
		return cnpj;
	}

	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}

	public Date getDataFund() {
		return dataFund;
	}

	public void setDataFund(Date dataFund) {
		this.dataFund = dataFund;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getMissao() {
		return missao;
	}

	public void setMissao(String missao) {
		this.missao = missao;
	}

	public String getSite() {
		return site;
	}

	public void setSite(String site) {
		this.site = site;
	}

	public String getPresidente() {
		return presidente;
	}

	public void setPresidente(String presidente) {
		this.presidente = presidente;
	}

	public Date getMandatoIni() {
		return mandatoIni;
	}

	public void setMandatoIni(Date mandatoIni) {
		this.mandatoIni = mandatoIni;
	}

	public Date getMandatoFim() {
		return mandatoFim;
	}

	public void setMandatoFim(Date mandatoFim) {
		this.mandatoFim = mandatoFim;
	}

	public Date getLastUpdate() {
		return lastUpdate;
	}

	public void setLastUpdate(Date lastUpdate) {
		this.lastUpdate = lastUpdate;
	}

	public Set<String> getCertificacoes() {
		return certificacoes;
	}

	public void setCertificacoes(Set<String> certificacoes) {
		this.certificacoes = certificacoes;
	}

	public String getOutrasCertificacoes() {
		return outrasCertificacoes;
	}

	public void setOutrasCertificacoes(String outrasCertificacoes) {
		this.outrasCertificacoes = outrasCertificacoes;
	}	

}
