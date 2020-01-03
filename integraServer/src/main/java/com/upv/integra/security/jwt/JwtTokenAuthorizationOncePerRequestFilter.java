package com.upv.integra.security.jwt;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.upv.integra.security.JwtConfig;
import com.upv.integra.security.jwt.resources.JwtUserDetailsDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;


public class JwtTokenAuthorizationOncePerRequestFilter extends OncePerRequestFilter {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

//    @Autowired
//    private UserDetailsService jwtInMemoryUserDetailsService;
//    
//    @Autowired
//    private JwtTokenUtil jwtTokenUtil;
    
    @Value("${jwt.http.request.header}")
    private String tokenHeader;
    
    private final JwtConfig jwtConfig;
    
    
    public JwtTokenAuthorizationOncePerRequestFilter(JwtConfig jwtConfig) {
		this.jwtConfig = jwtConfig;
	}
    

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
//    	logger.info("Authentication Request For '{}'", request.getRequestURL());

		/* 1. Pega o header que contem o Token */
        final String requestTokenHeader = request.getHeader(jwtConfig.getHeader());
        // 2. Valida o Header  e verifica se exite
        if(requestTokenHeader == null || !requestTokenHeader.startsWith(jwtConfig.getPrefix())) {
			chain.doFilter(request, response);  		// Se não existir segue para o proximo filtro
			return;
		}
        
    	// If there is no token provided and hence the user won't be authenticated. 
 		// It's Ok. Maybe the user accessing a public path or asking for a token.
 		
 		// All secured paths that needs a token are already defined and secured in config class.
 		// And If user tried to access without access token, then he won't be authenticated and an exception will be thrown.
 		
 		// 3. Get the token
        
        String jwtToken = requestTokenHeader.replace(jwtConfig.getPrefix(), "");

        try { // exceptions might be thrown in creating the claims if for example the token is expired
        	
        	// 4. Validate the token
			Claims claims = Jwts.parser()
					.setSigningKey(jwtConfig.getSecret())
					.parseClaimsJws(jwtToken)
					.getBody();
        	
			String username = claims.getSubject();
            if(username != null) {
            	@SuppressWarnings("unchecked")
            	List<String> authorities = (List<String>) claims.get("authorities");
            	String temp = new ObjectMapper().writeValueAsString(claims.get("user"));
            	JwtUserDetailsDTO membro = new ObjectMapper().readValue(temp, JwtUserDetailsDTO.class);	
					
				// 5. Create auth object
				// UsernamePasswordAuthenticationToken: A built-in object, used by spring to represent the current authenticated / being authenticated user.
				// It needs a list of authorities, which has type of GrantedAuthority interface, where SimpleGrantedAuthority is an implementation of that interface
				 UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
								 username, null, authorities.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList()));
				 auth.setDetails(membro);
				 // 6. Authenticate the user
				 // Now, user is authenticated
				 SecurityContextHolder.getContext().setAuthentication(auth);
			}
			
		} catch (Exception e) {
			logger.info("Exception: "+e.toString());
			// In case of failure. Make sure it's clear; so guarantee user won't be authenticated
			SecurityContextHolder.clearContext();
		}
        // go to the next filter in the filter chain    
        chain.doFilter(request, response);
    }
//        logger.debug("Authentication Request For '{}'", request.getRequestURL());
//
//        final String requestTokenHeader = request.getHeader(this.tokenHeader);
//
//        String username = null;
//        String jwtToken = null;
//        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
//            jwtToken = requestTokenHeader.substring(7);
//            try {
//                username = jwtTokenUtil.getUsernameFromToken(jwtToken);
//            } catch (IllegalArgumentException e) {
//                logger.error("JWT_TOKEN_UNABLE_TO_GET_USERNAME", e);
//            } catch (ExpiredJwtException e) {
//                logger.warn("JWT_TOKEN_EXPIRED", e);
//            }
//        } else {
//            logger.warn("JWT_TOKEN_DOES_NOT_START_WITH_BEARER_STRING");
//        }
//
//        logger.debug("JWT_TOKEN_USERNAME_VALUE '{}'", username);
//        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//
//            UserDetails userDetails = this.jwtInMemoryUserDetailsService.loadUserByUsername(username);
//
//            if (jwtTokenUtil.validateToken(jwtToken, userDetails)) {
//                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
//                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
//            }
//        }
//
//        chain.doFilter(request, response);
//    }
}


