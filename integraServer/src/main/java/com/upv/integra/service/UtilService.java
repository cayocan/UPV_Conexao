package com.upv.integra.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.upv.integra.constants.Constants;
import com.upv.integra.exception.BusinessException;
import com.upv.integra.repository.DadosCadastraisRepository;
import com.upv.integra.repository.imp.PessoaRepositoryImp;
import com.upv.integra.security.InterfaceAuthenticationFacade;
import com.upv.integra.security.jwt.resources.JwtUserDetailsDTO;


@Service
public class UtilService {
	
	@Autowired
	private InterfaceAuthenticationFacade autenticationFacede;
	@Autowired DadosCadastraisRepository contactsRepository;
	@Autowired PessoaRepositoryImp personRepositoryImp;
	
	public boolean verifyEmail(String email) {
		if(email != null) {
			if(contactsRepository.findAllByEmail(email).size() > 0 ) {
				return false;
			}else {
				return true;
			}
		}else {
			return false;
		}
	}

	public boolean verifyCPF(String cpf) {
		if(cpf != null) {
			if(personRepositoryImp.findAllByCpf(cpf).size() > 0 ) {
				return false;
			}else {
				return true;
			}
		}else {
			return false;
		}
	}
	public boolean verifyAuthADM() {		
		Authentication auth = autenticationFacede.getAuthentication();
//		JwtUserDetailsDTO membro = (JwtUserDetailsDTO) auth.getDetails();		
		if(auth.getAuthorities().contains(Constants.RoleAdmin)){
			return true;
		}else {
			return false;
		}
	}
	public boolean verifyAuthASSOC() {		
		Authentication auth = autenticationFacede.getAuthentication();
//		JwtUserDetailsDTO membro = (JwtUserDetailsDTO) auth.getDetails();		
		if(auth.getAuthorities().contains(Constants.RoleAdmin)||auth.getAuthorities().contains(Constants.RoleAssoc)){
			return true;
		}else {
			return false;
		}
	}
}
