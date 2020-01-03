package com.upv.integra.constants;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

public class Constants {	
	
	public final static GrantedAuthority RoleAdmin = new SimpleGrantedAuthority("ROLE_ADMIN");
	public final static GrantedAuthority RoleAssoc = new SimpleGrantedAuthority("ROLE_ASSOC");
	public final static GrantedAuthority RoleUser = new SimpleGrantedAuthority("ROLE_USER");
	public final static String OwnerType = "Owner";
	public final static String DependentType = "Dependent";
	public final static Integer DependentLimit = 2;
	public final static String TokenFreeWeek = "FREE-WEEK-CREATE-PERSON";
	public final static String PaymentMethodFreeWeek = "FreeWeek";
	public final static String PaymentMethodToken = "Token";
	
	public final static Integer ErrorTypeOwnerWithDepentend = 1;
	public final static Integer ErrorTypeDepedentWithoutDepentend = 2;
	public final static Integer ErrorDependenteLimit = 3;
	public final static Integer EmptyorNullName	= 4;
	public final static Integer EmailFieldEmptyOrNull = 5;
	public final static Integer EmailOutOfStandards = 6;
	public final static Integer EmailIsInTheBank = 7;
	public final static Integer CPFFieldEmptyOrNull = 10;
	public final static Integer NonStandardCpf = 11;
	public final static Integer ZipFieldEmptyOrNull = 12;
	public final static Integer CepFieldOutOfStandards = 12;
	public final static Integer FieldEmptyOrNullComplement = 13;
	public final static Integer ConfirmYourEmptyOrNullPassword = 14;
	public final static Integer FieldBirthEmptyOrNull = 15;
	public final static Integer BirthOutsideStandards = 16;
	public final static Integer FieldPhoneEmptyOrNull = 17;
	public final static Integer PhoneFieldOutOfStandards = 20;
	public final static Integer KidWithoutParent = 21;
	public final static Integer PersonNotExist = 22;
	public final static Integer EmptyPin = 23;
	public final static Integer EmailSenderError = 24;
	public final static Integer CPFUsed = 25;
	public final static Integer PinSize = 26;
	public final static Integer FuncNotFound = 27;
	public final static Integer CNPJUsed = 28;
	public final static Integer NonFunc = 29;
	public final static Integer NonAuthorized = 30;
}
