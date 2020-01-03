package com.upv.integra.model.dto;

public class IntegraLoginDTO {
	
	private String username;
	private String password;
	private Long personId;
	private String name;
	
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
	public Long getPersonId() {
		return personId;
	}
	public void setPersonId(Long personId) {
		this.personId = personId;
	}
	
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	@Override
	public String toString() {
		return "Person id: " + this.getPersonId() + ", Username: " + this.getUsername() + ", password: "+ this.getPassword();
	}
}


