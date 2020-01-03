package com.upv.integra.security;

import org.springframework.beans.factory.annotation.Value;


// To use this class outside. You have to 
	// 1. Define it as a bean, either by adding @Component or use @Bean to instantiate an object from it
	// 2. Use the @Autowire to ask spring to auto create it for you, and inject all the values.

// So, If you tried to create an instance manually (i.e. new JwtConfig()). This won't inject all the values. 
	// Because you didn't ask Spring to do so (it's done by you manually!).
// Also, if, at any time, you tried to instantiate an object that's not defined as a bean
	// Don't expect Spring will autowire the fields inside that class object.
	
public class JwtConfig {

	// Spring doesn't inject/autowire to "static" fields. 
	// Link: https://stackoverflow.com/a/6897406
	@Value("${jwt.get.token.uri}")
    private String Uri;

    @Value("${jwt.http.request.header}")
    private String header;
    
    @Value("${security.jwt.prefix:Bearer }")
    private String prefix;

    @Value("${jwt.token.expiration.in.seconds}")
    private int expiration;
    
    @Value("${jwt.signing.key.secret}")
    private String secret;

	@Override
	public String toString() {
		return "JwtConfig [Uri=" + Uri + ", header=" + header + ", prefix=" + prefix + ", expiration=" + expiration
				+ ", secret=" + secret + "]";
	}

	public String getUri() {
		return Uri;
	}

	public void setUri(String uri) {
		Uri = uri;
	}

	public String getHeader() {
		return header;
	}

	public void setHeader(String header) {
		this.header = header;
	}

	public String getPrefix() {
		return prefix;
	}

	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}

	public int getExpiration() {
		return expiration;
	}

	public void setExpiration(int expiration) {
		this.expiration = expiration;
	}

	public String getSecret() {
		return secret;
	}

	public void setSecret(String secret) {
		this.secret = secret;
	}
    

    
}
