
package com.upv.integra.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Class to Controll all business Exceptions
 * @author ThiagoLeite
 *
 */

@SuppressWarnings("serial")
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BusinessException extends RuntimeException {
	
	private Integer Code;
	private String message;
	public BusinessException() {
		super();
	}
	
	/**Pass Message and Couse error
	 * 
	 * @param message
	 * @param cause
	 */
	public BusinessException(String message, Integer Code, Throwable cause) {
		super(message, cause);
		this.setCode(Code);
		this.setMessage(message);
	}
	

	/** Only Message Error
	 * 
	 * @param message
	 */
	public BusinessException(String message) {
       super(message);
   }

	public BusinessException(String message, Integer Code) {
	       super(message);
	       this.setCode(Code);
	       this.setMessage(message);
	   }

	public Integer getCode() {
		return Code;
	}

	public void setCode(Integer code) {
		Code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}	
}
