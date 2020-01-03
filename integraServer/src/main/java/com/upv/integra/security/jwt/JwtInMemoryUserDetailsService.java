package com.upv.integra.security.jwt;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.upv.integra.model.IntegraLogin;
import com.upv.integra.repository.IntegraLoginRepository;
import com.upv.integra.security.jwt.resources.JwtAuthenticationRestController;

@Service
public class JwtInMemoryUserDetailsService implements UserDetailsService {
	
	private static final Logger logger = LoggerFactory.getLogger(JwtInMemoryUserDetailsService.class);

	//@Autowired private BCryptPasswordEncoder encoder;
	@Autowired private IntegraLoginRepository userLoginRepository;
	
  static List<JwtUserDetails> inMemoryUserList = new ArrayList<>();
/*
  static {
    inMemoryUserList.add(new JwtUserDetails(1L, "upv",
        "$2a$10$3zHzb.Npv1hfZbLEU5qsdOju/tk2je6W6PnNnY.c1ujWPcZh4PL6e", "ROLE_USER_2"));
  }
*/
  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// hard coding the users. All passwords must be encoded.
//		final List<UserLogin> users = Arrays.asList(
//			new UserLogin(1, "omar", encoder.encode("12345"), "USER"),
//			new UserLogin(2, "admin", encoder.encode("12345"), "ADMIN")
//		);
		String usernameCase = username.substring(0, 1).toLowerCase() + username.substring(1, username.length()); 
		IntegraLogin appUser = userLoginRepository.findByUsername(username);
		IntegraLogin appUserCaseSensitive = userLoginRepository.findByUsername(usernameCase);		
		if(appUser != null || appUserCaseSensitive != null) {
			if(appUser != null && appUser.getUsername().equals(username)) {
				// The "User" class is provided by Spring and represents a model class for user to be returned by UserDetailsService
				// And used by auth manager to verify and check user authentication.
				List<GrantedAuthority> grantedAuthorities = AuthorityUtils
		                	.commaSeparatedStringToAuthorityList("ROLE_" + appUser.getRole().getName());

				JwtUserDetails retorno = new JwtUserDetails(appUser.getFucionario().getId(), appUser.getAssociacao().getId() , appUser.getUsername(), appUser.getPassword(), appUser.getResetPassword(), appUser.getFucionario().getPessoa().getNome(),grantedAuthorities);
				return retorno;
			}else if(appUserCaseSensitive != null && appUserCaseSensitive.getUsername().equals(usernameCase)) {
				List<GrantedAuthority> grantedAuthorities = AuthorityUtils
		                	.commaSeparatedStringToAuthorityList("ROLE_" + appUserCaseSensitive.getRole().getName());
				
				JwtUserDetails retorno = new JwtUserDetails(appUserCaseSensitive.getFucionario().getId(), appUserCaseSensitive.getAssociacao().getId(),	appUserCaseSensitive.getUsername(), appUserCaseSensitive.getPassword(), appUserCaseSensitive.getResetPassword(), appUserCaseSensitive.getFucionario().getPessoa().getNome(),grantedAuthorities);
				return retorno;
			}
			
		}
		
		// If user not found. Throw this exception.
		throw new UsernameNotFoundException("Username: " + username + " not found");
	  
	  /*
	  Optional<JwtUserDetails> findFirst = inMemoryUserList.stream()
        .filter(user -> user.getUsername().equals(username)).findFirst();

    if (!findFirst.isPresent()) {
      throw new UsernameNotFoundException(String.format("USER_NOT_FOUND '%s'.", username));
    }

    return findFirst.get();
    */
  }
}


