package com.upv.integra.security.jwt.resources;

public class JwtUserDetailsDTO {
	
	  private Long funcId;
	  private Long assocId;
	  private String username;
	  private Boolean enabled;
	  private Boolean resetPassword;
	  private String nome;

	public JwtUserDetailsDTO(Long funcId, Long assocId,String username, Boolean enabled , Boolean resetPassword, String nome) {
	    this.funcId = funcId;
	    this.assocId = assocId;
	    this.username = username;
	    this.resetPassword = resetPassword;
	    this.setNome(nome);
	    this.enabled = enabled;
	  }

	public JwtUserDetailsDTO() {
		
	}
	
	@Override
	public String toString() {
		return "JwtUserDetailsDTO [funcId=" + funcId + ", assocId=" + assocId + ", username=" + username + ", enabled="
				+ enabled + ", resetPassword=" + resetPassword + "]";
	}
	
	public Long getFuncId() {
		return funcId;
	}

	public void setFuncId(Long funcId) {
		this.funcId = funcId;
	}

	public Long getAssocId() {
		return assocId;
	}

	public void setAssocId(Long assocId) {
		this.assocId = assocId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	public Boolean getResetPassword() {
		return resetPassword;
	}

	public void setResetPassword(Boolean resetPassword) {
		this.resetPassword = resetPassword;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
	
}
