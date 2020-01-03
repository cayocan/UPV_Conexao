package com.upv.integra.security.jwt;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.upv.integra.security.JwtConfig;
import com.upv.integra.security.JwtUsernameAndPasswordAuthenticationFilter;
import com.upv.integra.security.jwt.resources.JwtAuthenticationRestController;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class JWTWebSecurityConfig extends WebSecurityConfigurerAdapter {

	private static final Logger logger = LoggerFactory.getLogger(JWTWebSecurityConfig.class);
	
    @Autowired
    private JwtUnAuthorizedResponseAuthenticationEntryPoint jwtUnAuthorizedResponseAuthenticationEntryPoint;

	@Autowired private BCryptPasswordEncoder encoder;
//    @Autowired
//    private UserDetailsService jwtInMemoryUserDetailsService;

    @Autowired
	private UserDetailsService userDetailsService;

    @Value("${jwt.get.token.uri}")
    private String authenticationPath;

//    @Autowired
//    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
//        auth
//            .userDetailsService(jwtInMemoryUserDetailsService)
//            .passwordEncoder(passwordEncoderBean());
//    }
    
    @Autowired
	private JwtConfig jwtConfig;

    @Bean
    public PasswordEncoder passwordEncoderBean() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
            .csrf().disable()
            .exceptionHandling().authenticationEntryPoint(jwtUnAuthorizedResponseAuthenticationEntryPoint).and()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
            .addFilter(new JwtUsernameAndPasswordAuthenticationFilter(authenticationManager(), jwtConfig))
    		.addFilterAfter(new JwtTokenAuthorizationOncePerRequestFilter(jwtConfig), JwtUsernameAndPasswordAuthenticationFilter.class)
            .authorizeRequests()
            	.antMatchers(HttpMethod.POST, jwtConfig.getUri()).permitAll()
		 		.antMatchers(HttpMethod.GET,"/swagger-ui.html").permitAll()
		 		.antMatchers(HttpMethod.GET,"/v2/api-docs").permitAll()
		 		.antMatchers(HttpMethod.GET,"/swagger-resources").permitAll()
		 		.antMatchers(HttpMethod.GET,"/swagger-resources/**").permitAll()
		 		.antMatchers(HttpMethod.GET,"/webjars/springfox-swagger-ui").permitAll()
		 		.antMatchers(HttpMethod.GET,"/webjars/springfox-swagger-ui/*").permitAll()
		 		.antMatchers(HttpMethod.POST,"/user/resetPassword").permitAll()
		 		.antMatchers(HttpMethod.OPTIONS, "**").permitAll()
//		 		.anyRequest().permitAll(); // TODO Remover quando colocar o token de sessão
			   .anyRequest().authenticated();	            
        
        httpSecurity
            .headers()
            .frameOptions().sameOrigin()  //H2 Console Needs this setting
            .cacheControl(); //disable caching
    }

    @Override
    public void configure(WebSecurity webSecurity) throws Exception {
        webSecurity
            .ignoring()
            .antMatchers(
                HttpMethod.POST,
                authenticationPath
            )
            .antMatchers(HttpMethod.OPTIONS, "/**")
            .and()
            .ignoring()
            .antMatchers(
                HttpMethod.GET,
                "/" //Other Stuff You want to Ignore
            )
            .and()
            .ignoring()
            .antMatchers("/h2-console/**/**");//Should not be in Production!
    }
    
    @Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(encoder);
	}
    
    @Bean
	public JwtConfig jwtConfig() {
		return new JwtConfig();
	}
}

