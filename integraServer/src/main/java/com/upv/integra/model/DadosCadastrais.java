package com.upv.integra.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class DadosCadastrais {	
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name ="DC_CD_ID")
	private Long id;
	
	@Column(name = "DC_TX_CEP")
	private String cep;
	
	@Column(name = "DC_TX_END")
	private String endereco;
	
	@Column(name = "DC_TX_NUM")
	private String numero;	

	@Column(name = "DC_TX_BAIRRO")
	private String bairro;	

	@Column(name = "DC_TX_COMPL")
	private String complemento;	

	@Column(name = "DC_TX_CIDADE")
	private String cidade;
	
	@Column(name = "DC_TX_ESTADO")
	private String estado;
	
	@Column(name = "DC_TX_FONE")
	private String telefone;
	
	@Column(name = "DC_TX_FONE2")
	private String telefone2;
	
	@Column(name = "DC_TX_EMAIL")
	private String email;
	
	@Column(name = "DC_TX_EMAIL2")
	private String email2;
	
	@Column(name = "DC_TX_FACE")
	private String facebookAcount;
	
	@Column(name = "DC_TX_INSTA")
	private String instagramAcount;
	
	@Column(name = "DC_TX_TWITTER")
	private String twitterAcount;
	
	@Override
	public String toString() {
		return "DadosCadastrais [id=" + id + ", cep=" + cep + ", endereco=" + endereco + ", numero=" + numero
				+ ", bairro=" + bairro + ", complemento=" + complemento + ", cidade=" + cidade + ", estado=" + estado
				+ ", telefone=" + telefone + ", telefone2=" + telefone2 + ", email=" + email + ", email2=" + email2
				+ ", facebookAcount=" + facebookAcount + ", instagramAcount=" + instagramAcount + ", twitterAcount="
				+ twitterAcount + "]";
	}

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}
	
	public String getBairro() {
		return bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
	}
	
	public String getComplemento() {
		return complemento;
	}

	public void setComplemento(String complemento) {
		this.complemento = complemento;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

	public String getEndereco() {
		return endereco;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public String getTelefone2() {
		return telefone2;
	}

	public void setTelefone2(String telefone2) {
		this.telefone2 = telefone2;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getEmail2() {
		return email2;
	}

	public void setEmail2(String email2) {
		this.email2 = email2;
	}

	public String getFacebookAcount() {
		return facebookAcount;
	}

	public void setFacebookAcount(String facebookAcount) {
		this.facebookAcount = facebookAcount;
	}

	public String getInstagramAcount() {
		return instagramAcount;
	}

	public void setInstagramAcount(String instagramAcount) {
		this.instagramAcount = instagramAcount;
	}

	public String getTwitterAcount() {
		return twitterAcount;
	}

	public void setTwitterAcount(String twitterAcount) {
		this.twitterAcount = twitterAcount;
	}	
	
}
