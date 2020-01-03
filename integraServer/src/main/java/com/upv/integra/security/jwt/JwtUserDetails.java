package com.upv.integra.security.jwt;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class JwtUserDetails implements UserDetails {

  private static final long serialVersionUID = 5155720064139820502L;

  private final Long funcId;
  private final Long assocId;
  private final String username;
  private final String password;
  private final Boolean ResetPassword;
  private final String nome;
  private final Collection<? extends GrantedAuthority> authorities;

  public JwtUserDetails(Long funcId, Long assocId,String username, String password, Boolean ResetPassword , String nome,List<GrantedAuthority> grantedAuthorities) {
    this.funcId = funcId;
    this.assocId = assocId;
    this.username = username;
    this.password = password;
    this.ResetPassword = ResetPassword;
    this.nome = nome;
    /*
    List<SimpleGrantedAuthority> authorities = new ArrayList<SimpleGrantedAuthority>();
    authorities.add(new SimpleGrantedAuthority(role));
 	*/
    this.authorities = grantedAuthorities;
  }
  
	@Override
	public String toString() {
		return "JwtUserDetails [FuncId=" + funcId + ", AssocId=" + assocId + ", username=" + username + ", password=" + password + ", ResetPassword="
				+ ResetPassword + ", authorities=" + authorities + "]";
	}
  
  public Long getFuncId() {
    return funcId;
  }
  
  public Long getAssocId() {
    return assocId;
  }

  @Override
  public String getUsername() {
    return username;
  }

  @JsonIgnore
  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @JsonIgnore
  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @JsonIgnore
  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @JsonIgnore
  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  public Boolean getResetPassword() {
	return ResetPassword;
}

public String getNome() {
	return nome;
}

}


