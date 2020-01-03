package com.upv.integra.security;

import java.io.IOException;
import java.sql.Date;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.upv.integra.security.jwt.JwtUserDetails;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;


public class JwtUsernameAndPasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter   {

	private AuthenticationManager authManager;
	private static final Logger logger = LoggerFactory.getLogger(JwtUsernameAndPasswordAuthenticationFilter.class);

	private final JwtConfig jwtConfig;

	public JwtUsernameAndPasswordAuthenticationFilter(AuthenticationManager authManager, JwtConfig jwtConfig) {
		this.authManager = authManager;
		this.jwtConfig = jwtConfig;
		this.setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher(jwtConfig.getUri(), "POST"));
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {

		try {
			JwtUserDetails creds = new ObjectMapper().readValue(request.getInputStream(), JwtUserDetails.class);
			logger.info("Tentativa de Login:"
					+ "\nIP Addr={}"
					+ "\nOrganizcao={}"
					+ "\nUsername={}",
					request.getRemoteAddr(), creds.getAssocId(), creds.getUsername());
			
			if(creds.getAssocId()==null) {
				throw new RuntimeException("Precisa colocar a Associação no Login");
				
			}
//			request.setAttribute("ORGANIZACAO", creds.getAssocId());
//			TenantLocalStorage.setTenantName(creds.getOrganizacao());

			UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
					creds.getUsername(), creds.getPassword()
					,Collections.emptyList());

			return authManager.authenticate(authToken);

		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	// Upon successful authentication, generate a token.
	// The 'auth' passed to successfulAuthentication() is the current authenticated user.
	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication auth) throws IOException, ServletException {

//		String org = (String) request.getAttribute("ORGANIZACAO");

		Long now = System.currentTimeMillis();
		Map<String, Object> claim = new HashMap<>();
		JwtUserDetails membro = (JwtUserDetails)auth.getPrincipal();
		claim.put("membro", membro);
		String token = Jwts.builder()
				.setSubject(auth.getName())	
				.claim("authorities", auth.getAuthorities().stream()
						.map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
				.setIssuedAt(new Date(now))
				.setExpiration(new Date(now + jwtConfig.getExpiration() * 1000))  // in milliseconds
				.addClaims(claim)
				.signWith(SignatureAlgorithm.HS512, jwtConfig.getSecret())
				.compact();


		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json");
		response.addHeader(jwtConfig.getHeader(), jwtConfig.getPrefix() + token);
		ObjectMapper objectMapper = new ObjectMapper();
		response.getWriter().append(objectMapper.writeValueAsString(membro));

	}
}