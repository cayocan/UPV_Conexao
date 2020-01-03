
package com.upv.integra.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import org.springframework.lang.Nullable;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class IntegraLogin {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	@Column(name ="USER_CD_ID")
	private Long id;
	
	@Column(name ="USER_TX_USERNAME")
	private String username;
	
	@Column(name ="USER_TX_PASSWORD")
	private String password;
	
	@OneToOne
	@JoinColumn(name ="ROLE_CD_ID")
	private Role role;	
	
	@Nullable
	@OneToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name ="FUNC_CD_ID")
	private Funcionario fucionario;	
	
	@Nullable
	@OneToOne
	@JoinColumn(name ="ASSOC_CD_ID")
	private Associacao associacao;

	@Column(name="PERSON_TX_NOME")
	private String name;
	
	@Column(name="USER_BOOL_RESET_PASSWORD")
	private Boolean resetPassword;
	
	@Override
	public String toString() {
		return "IntegraLogin [id=" + id + ", username=" + username + ", password=" + password + ", role=" + role
				+ ", fucionario=" + fucionario + ", associacao=" + associacao + ", name=" + name + ", resetPassword="
				+ resetPassword + "]";
	}

	public Funcionario getFucionario() {
		return fucionario;
	}

	public void setFucionario(Funcionario fucionario) {
		this.fucionario = fucionario;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Boolean getResetPassword() {
		return resetPassword;
	}

	public void setResetPassword(Boolean resetPassword) {
		this.resetPassword = resetPassword;
	}
	
	public Associacao getAssociacao() {
		return associacao;
	}

	public void setAssociacao(Associacao associacao) {
		this.associacao = associacao;
	}
	
}
