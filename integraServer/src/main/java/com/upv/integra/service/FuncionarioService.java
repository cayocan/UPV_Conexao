package com.upv.integra.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.upv.integra.constants.Constants;
import com.upv.integra.exception.BusinessException;
import com.upv.integra.model.Acompanhamento;
import com.upv.integra.model.Apoiador;
import com.upv.integra.model.Associacao;
import com.upv.integra.model.Associado;
import com.upv.integra.model.Atendimento;
import com.upv.integra.model.Funcionario;
import com.upv.integra.model.IntegraLogin;
import com.upv.integra.model.Paciente;
import com.upv.integra.model.Pessoa;
import com.upv.integra.model.dto.AcompanhamentoDTO;
import com.upv.integra.model.dto.AssociadoDTO;
import com.upv.integra.model.dto.AtendimentoDTO;
import com.upv.integra.model.dto.FuncionarioDTO;
import com.upv.integra.model.dto.PacienteDTO;
import com.upv.integra.model.dto.PessoaDTO;
import com.upv.integra.repository.DadosCadastraisRepository;
import com.upv.integra.repository.IntegraLoginRepository;
import com.upv.integra.repository.RoleRepository;
import com.upv.integra.repository.imp.AssociacaoRepositoryImp;
import com.upv.integra.repository.imp.FuncionarioRepositoryImp;
import com.upv.integra.repository.imp.PessoaRepositoryImp;
import com.upv.integra.security.InterfaceAuthenticationFacade;
import com.upv.integra.security.jwt.resources.JwtUserDetailsDTO;

@Service
public class FuncionarioService {

	@Autowired
	private EmailServiceImpl emailService;
	@Autowired
	RoleRepository roleRepository;
	@Autowired
	IntegraLoginService integraLoginService;
	@Autowired
	IntegraLoginRepository userLoginRepository;
	@Autowired
	PessoaRepositoryImp personRepositoryImp;
	@Autowired
	FuncionarioRepositoryImp funcionarioRepositoryImp;
	@Autowired
	AssociacaoRepositoryImp associacaoRepositoryImp;
	@Autowired
	DadosCadastraisRepository contactsRepository;
	@Autowired
	public JavaMailSender mailSender;
	@Autowired
	public SimpleMailMessage template;
	@Autowired
	UtilService utilService;
	@Autowired
	private InterfaceAuthenticationFacade autenticationFacede;

	private static final Logger logger = LoggerFactory.getLogger(FuncionarioService.class);

	public FuncionarioDTO saveFuncionario(FuncionarioDTO funcionarioDTO, String role) throws BusinessException {
		logger.info("Salvando Funcionario");
		if (utilService.verifyAuthASSOC()) {
			try {
				Funcionario funcionario = convertDtoToFunc(funcionarioDTO);
				if (funcionario.getId() == null || funcionario.getId() == 0) {
					funcionario.getPessoa().setDateRegister(new Date());
					// logger.info("setDateRegister: "+funcionario.toString());
					if (funcionario.getPessoa().getDadosCadastrais() != null
							&& funcionario.getPessoa().getDadosCadastrais().getEmail() != null) {
						String email = funcionario.getPessoa().getDadosCadastrais().getEmail();
						List<Funcionario> retornos = funcionarioRepositoryImp.getByEmail(email);
						if (retornos.size() > 1) {
							logger.error("Email já existe na base de dados");
							throw new BusinessException("Email já existe na base de dados", Constants.EmailIsInTheBank);
						}
					} else {
						logger.error("Campo Email vazio ou nulo");
						throw new BusinessException("Campo Email vazio ou nulo", Constants.EmailFieldEmptyOrNull);
					}
					if (funcionario.getPessoa() != null && funcionario.getPessoa().getCpf() != null) {
						String cpf = funcionario.getPessoa().getCpf();
						List<Funcionario> retornos2 = funcionarioRepositoryImp.getByCpf(cpf);
						if (retornos2.size() > 1) {
							logger.error("Funcionario com esse CPF já existe na base de dados");
							throw new BusinessException("paciente com esse CPF já existe na base de dados",
									Constants.EmailIsInTheBank);
						} else if (!retornos2.isEmpty()) {
							logger.error("Funcionario.getPessoa().setDadosCadastrais");
							// paciente.setPessoa(retornos2.get(0).getPessoa());
						}
					}
				} else if (funcionario.getId() != null && funcionario.getPessoa() != null
						&& funcionario.getPessoa().getDadosCadastrais() != null) {
					logger.error("IDs != null");
					String cpf = funcionario.getPessoa().getCpf();
					List<Funcionario> retornos = funcionarioRepositoryImp.getByCpf(cpf);
					if (retornos.size() > 1) {
						logger.error("Pessoa já existe na base de dados");
						throw new BusinessException("Pessoa já existe na base de dados", Constants.EmailIsInTheBank);
					} else if (!retornos.isEmpty()) {
						logger.error("funcionario.setPessoa");
						// funcionario.setPessoa(retornos.get(0));
					}
					;
					String email = funcionario.getPessoa().getDadosCadastrais().getEmail();
					List<Funcionario> retornos2 = funcionarioRepositoryImp.getByEmail(email);
					if (retornos2.size() > 1) {
						logger.error("Email já existe na base de dados");
						throw new BusinessException("Email já existe na base de dados", Constants.EmailIsInTheBank);
					} else if (!retornos2.isEmpty()) {
						logger.error("funcionario.getPessoa().setDadosCadastrais");
						// funcionario.getPessoa().setDadosCadastrais(retornos2.get(0));
					}
				}
				// if(person.getKids() != null && !person.getKids().isEmpty()) {}
				if (funcionario.getAssociacao() == null) {
					logger.error("Campo Id da Associação Vazio ou Nulo");
					throw new BusinessException("Campo Id da Associação Vazio Vazio ou Nulo ",
							Constants.EmptyorNullName);
				}
				if (funcionario.getPessoa().getNome() == null) {
					logger.error("Campo Nome Completo Vazio ou Nulo");
					throw new BusinessException("Campo Nome Completo Vazio ou Nulo ", Constants.EmptyorNullName);
				}
				if (!funcionario.getPessoa().getCpf().isEmpty() && !verifyCPF(funcionario.getPessoa().getCpf())
						&& funcionario.getPessoa().getId() == null) {
					logger.error("CPF Já cadastrado");
					throw new BusinessException("CPF já cadastrado", Constants.CPFUsed);
				}
				funcionario.getPessoa().setEnable(true);
				funcionario.setEnable(true);
				funcionario.setUsername(funcionario.getPessoa().getNome());
				// logger.info("Curr funcionario: "+funcionario.toString());

				// if(person.getContact() == null || person.getContact().getPostalCode() ==
				// null) {
				// logger.error("Campo CEP Vazio ou Nulo");
				// throw new BusinessException("Campo CEP Vazio Ou Nulo ",
				// Constants.ZipFieldEmptyOrNull );
				// }
				// if(person.getContact() == null || person.getContact().getPhone() == null) {
				// logger.error("Campo Telefone Vazio ou Nulo");
				// throw new BusinessException("Campo Telefone Vazio Ou Nulo ",
				// Constants.FieldPhoneEmptyOrNull );
				// }
				// if(person.getKids() != null) {
				// logger.info("Verifica Kids");
				// verifyKid(person);
				// }
				logger.info("contactsRepository save");
				funcionario.getPessoa()
						.setDadosCadastrais(contactsRepository.save(funcionario.getPessoa().getDadosCadastrais()));

				// logger.info("personRepositoryImp save");
				// funcionario.setPessoa(personRepositoryImp.save(funcionario.getPessoa()));

				logger.info("funcionarioRepositoryImp save");
				funcionario = funcionarioRepositoryImp.save(funcionario);
				// logger.info("saved func: "+funcionario.toString());

				if ((funcionarioDTO.getId() == null || funcionarioDTO.getId() == 0) && funcionario.getId() != null) {
					logger.info("Criação de Login");
					Boolean retorno = createFuncionarioLogin(funcionario.getPessoa().getDadosCadastrais().getEmail(),
							funcionarioDTO.getPassword(), funcionario, funcionario.getPessoa().getNome(),
							funcionario.getAssociacao(), role);
					if (retorno.equals(false)) {
						logger.error("Erro ao Criar login");
						funcionario.setEnable(false);
						funcionarioRepositoryImp.deleteFuncionario(funcionario);
						personRepositoryImp.deletePerson(funcionario.getPessoa());
						contactsRepository.delete(funcionario.getPessoa().getDadosCadastrais());
						throw new BusinessException("Erro ao criar Login", 99);
					}
					// else if(personDTO.getOrigin() != "PlayEduca"){
					// Date expiration =
					// Date.from(LocalDate.now().plusDays(7).atStartOfDay(ZoneId.of("America/Sao_Paulo")).toInstant());
					// Boolean retornoPayment = createPayment(person.getId(),
					// Constants.TokenFreeWeek, expiration, person.getContact().getEmail());
					// System.out.println("Retorno Pagamento: " + retornoPayment.toString());
					// }
					// sendMail(person);

				}
				return new FuncionarioDTO(funcionario);

			} catch (BusinessException e) {
				throw new BusinessException(e.getMessage(), e.getCode());
			}
		} else {
			throw new BusinessException("Ação não permitida para esse usuário", Constants.NonAuthorized);
		}
	}

	public List<FuncionarioDTO> listFuncionarios() {
		if (utilService.verifyAuthASSOC()) {
			Authentication auth = autenticationFacede.getAuthentication();
			logger.info("auth: " + auth.toString());
			JwtUserDetailsDTO membro = (JwtUserDetailsDTO) auth.getDetails();
			logger.info("Serviço listFuncionarios chamado para: \n Membro: {} ", membro);

			List<Funcionario> lf = funcionarioRepositoryImp.findAll();
			List<FuncionarioDTO> funcionarioDtoList = new ArrayList<FuncionarioDTO>();
			lf.forEach(func -> {
				funcionarioDtoList.add(new FuncionarioDTO(func));
			});
			// logger.info(funcionarioDtoList.toString());
			return funcionarioDtoList;
		} else {
			throw new BusinessException("Ação não permitida para esse usuário", Constants.NonAuthorized);
		}
	}

	public List<FuncionarioDTO> findAllBySameAssoc() {
		if (utilService.verifyAuthASSOC()) {
			Authentication auth = autenticationFacede.getAuthentication();
			JwtUserDetailsDTO membro = (JwtUserDetailsDTO) auth.getDetails();

			List<Funcionario> lf = funcionarioRepositoryImp.findAllBySameAssoc(membro.getAssocId());
			List<FuncionarioDTO> funcionarioDtoList = new ArrayList<FuncionarioDTO>();
			lf.forEach(func -> {
				funcionarioDtoList.add(new FuncionarioDTO(func));
			});
//		logger.info(funcionarioDtoList.toString());
			return funcionarioDtoList;
		} else {
			throw new BusinessException("Ação não permitida para esse usuário", Constants.NonAuthorized);
		}
	}

//	public Set<KidProfile> listChildren(Long parentId){
//		Optional<Pessoa> p = personRepositoryImp.findOneById(parentId);
//		if(p.isPresent()) {
//			return p.get().getKids();
//		}
//		return null;
//	}

	public FuncionarioDTO updateFuncionario(FuncionarioDTO funcionarioDTO) {
		if (utilService.verifyAuthASSOC()) {
			FuncionarioDTO func = findFuncionario(funcionarioDTO.getId());
			if (func != null) {
				logger.info("updateFuncionarioDTO");
				IntegraLogin login = userLoginRepository.findByUsername(func.getPessoa().getDadosCadastrais().getEmail());
				String role = login.getRole().getName();
				return saveFuncionario(funcionarioDTO, role);
			} else {
				throw new BusinessException("Funcionario não encontrado", Constants.FuncNotFound);
			}
		} else {
			throw new BusinessException("Ação não permitida para esse usuário", Constants.NonAuthorized);
		}
	}

	public String deleteFuncionario(Long funcId) {
		if (utilService.verifyAuthASSOC()) {
			Funcionario func = funcionarioRepositoryImp.findOneById(funcId).get();
			if (func != null) {
				func.setEnable(false);
				func.getPessoa().setEnable(false);
				func = funcionarioRepositoryImp.save(func);
				logger.info("deleteFuncionario: " + func.toString());
	//			IntegraLogin login = userLoginRepository.findByUsername(func.getPessoa().getDadosCadastrais().getEmail());
	//			if(login!=null) {
	//				logger.info(login.toString());
	//				userLoginRepository.delete(login);
	//			}
	//			logger.info(func.toString());
	//			if(funcionarioRepositoryImp.deleteFuncionario(func)) {
	//				return "Excluído com Sucesso";
	//			}else {
	//				return "Erro ao Excluir Funcionario";
	//			}
	
	//			Pessoa person = personRepositoryImp.getById(func.getPessoa().getId());
	//			if(person!=null) {
	//				personRepositoryImp.deletePerson(person);
	//			}			
				return "Excluído com Sucesso";
			} else {
				return "Erro ao Excluir Funcionario";
			}
	//		person.getKids().forEach(kid -> {
	//			kid.setEnable(false);
	//			kidProfileRepositoryImp.save(kid);
	//		});		
	//		Funcionario p = funcionarioRepositoryImp.save(func);
		} else {
			throw new BusinessException("Ação não permitida para esse usuário", Constants.NonAuthorized);
		}
	}

	public Funcionario convertDtoToFunc(FuncionarioDTO dto) {
		logger.info("Converte Funcionario DTO em Funcionario");
//		logger.info("FuncionarioDTO passado: "+dto.toString());
		Funcionario retorno = new Funcionario();
		retorno.setId(dto.getId());
		retorno.setPessoa(dto.getPessoa());
		retorno.setCargo(dto.getCargo());
		retorno.getPessoa().setDadosCadastrais(dto.getPessoa().getDadosCadastrais());
		if (retorno.getId() == null || retorno.getId() == 0) {
			retorno.setId(null);
			// retorno.setKidsNumber(Constants.DependentLimit);
			// retorno.setEmailBoasVindas(true);
		} else {
//			Funcionario busca = funcionarioRepositoryImp.getById(dto.getId());
//			boolean boas = busca.isEmailBoasVindas();
//			retorno.setEmailBoasVindas(boas);
//			retorno.setKidsNumber(busca.getKidsNumber());
		}
		if (retorno.getAssociacao() == null) {
			Associacao busca = associacaoRepositoryImp.getById(dto.getAssocId());
			if (busca != null) {
				retorno.setAssociacao(busca);
			} else {
				logger.error("Associacao nula ou invalida");
			}
		}
//		if(retorno.getKids() != null && retorno.getKids().size() > 0) {
//			retorno.getKids().forEach((kids) ->{
//				kids.setParent(retorno); 
//				kids.setEnable(true);
//			});
//		}
		retorno.getPessoa().setLastUpdate(new Date());

//		retorno.setPin(dto.getPin());
//		if(dto.getOrigin() != null) {
//			Origin origin = originRepository.findOneByDescription(dto.getOrigin());
//			if(origin == null) {
//				origin = new Origin();
//				origin.setDescription(dto.getOrigin());
//				origin = originRepository.save(origin);
//			}
//			retorno.setOrigin(origin);
//		}
//		logger.info(retorno.toString());
		return retorno;
	}

	public FuncionarioDTO findFuncionario(Long id) {
		if (utilService.verifyAuthASSOC()) {
			Optional<Funcionario> p = funcionarioRepositoryImp.findOneById(id);
			if (p.isPresent()) {
				return new FuncionarioDTO(p.get());
			}
			return null;
		} else {
			throw new BusinessException("Ação não permitida para esse usuário", Constants.NonAuthorized);
		}
	}

	public List<Apoiador> findApoiadoresCadastrados(Long funcId) {
		Funcionario retorno = funcionarioRepositoryImp.findAllApoiadoresByFuncionarioId(funcId);		
		if (retorno.getApoiadores().size()>0) {
//			logger.info("Test Retorno: "+retorno.getApoiadores());
			List<Apoiador> apoiadorList = new ArrayList<Apoiador>();
			retorno.getApoiadores().forEach(apoia -> {
				apoiadorList.add(apoia);
			});
			return apoiadorList;			
		}
		logger.info("Funcionario não encontrado");
		return null;
	}
	
	public List<PacienteDTO> findPacientesCadastrados(Long funcId) {
		Funcionario retorno = funcionarioRepositoryImp.findAllPacientesByFuncionarioId(funcId);
		if (retorno.getPacientes().size()>0) {
//			logger.info("Test Retorno: "+retorno.getPacientes());
			List<PacienteDTO> apoiadorList = new ArrayList<PacienteDTO>();
			retorno.getPacientes().forEach(item -> {
				apoiadorList.add(new PacienteDTO(item));
			});
			return apoiadorList;			
		}
		logger.info("Funcionario não encontrado");
		return null;
	}
	
	public List<AtendimentoDTO> findAtendimentosCadastrados(Long funcId) {
		Funcionario retorno = funcionarioRepositoryImp.findAllAtendimentosByFuncionarioId(funcId);
		if (retorno.getAtendimentos().size()>0) {
//			logger.info("Test Retorno: "+retorno.getAtendimentos());
			List<AtendimentoDTO> apoiadorList = new ArrayList<AtendimentoDTO>();
			retorno.getAtendimentos().forEach(item -> {
				apoiadorList.add(new AtendimentoDTO(item));
			});
			return apoiadorList;			
		}
		logger.info("Funcionario não encontrado");
		return null;
	}
	
	public List<AcompanhamentoDTO> findAcompanhamentosCadastrados(Long funcId) {
		Funcionario retorno = funcionarioRepositoryImp.findAllAcompanhamentosByFuncionarioId(funcId);
		if (retorno.getAcomp().size()>0) {
//			logger.info("Test Retorno: "+retorno.getAcomp());
			List<AcompanhamentoDTO> apoiadorList = new ArrayList<AcompanhamentoDTO>();
			retorno.getAcomp().forEach(item -> {
				apoiadorList.add(new AcompanhamentoDTO(item));
			});
			return apoiadorList;			
		}
		logger.info("Funcionario não encontrado");
		return null;
	}
	
	public List<AssociadoDTO> findAssociadosCadastrados(Long funcId) {
		Funcionario retorno = funcionarioRepositoryImp.findAllAssociadosByFuncionarioId(funcId);
		if (retorno.getAssociados().size()>0) {
//			logger.info("Test Retorno: "+retorno.getAssociados());
			List<AssociadoDTO> apoiadorList = new ArrayList<AssociadoDTO>();
			retorno.getAssociados().forEach(item -> {
				apoiadorList.add(new AssociadoDTO(item));
			});
			return apoiadorList;			
		}
		logger.info("Funcionario não encontrado");
		return null;
	}

	public List<PessoaDTO> listPerson() {
		List<Pessoa> lp = personRepositoryImp.findAll();
		List<PessoaDTO> pessoaDtoList = new ArrayList<PessoaDTO>();
		lp.forEach(person -> {
			pessoaDtoList.add(new PessoaDTO(person));
		});
		return pessoaDtoList;
	}

	public boolean verifyEmail(String email) {
		if (email != null) {
			if (contactsRepository.findAllByEmail(email).size() > 0) {
				return false;
			} else {
				return true;
			}
		} else {
			return false;
		}
	}

	public boolean verifyCPF(String cpf) {
		if (cpf != null) {
			if (personRepositoryImp.findAllByCpf(cpf).size() > 0) {
				return false;
			} else {
				return true;
			}
		} else {
			return false;
		}
	}

	public Boolean createFuncionarioLogin(String username, String password, Funcionario func, String name,
			Associacao assoc, String role) {
		logger.info("createFuncionarioLogin");
//		logger.info("Funcionario passed: "+func.toString());
		IntegraLogin user = new IntegraLogin();
		if (password == null) {
			password = integraLoginService.generateRandomPassword();
			// emailService.sendMail(user, password);
			user.setResetPassword(true);
		} else {
			user.setResetPassword(false);
		}
		user.setFucionario(func);
		user.setPassword(integraLoginService.passwordEncoder().encode(password));
//		user.setPassword(userDTO.getPassword());
		user.setUsername(username);
		user.setName(name);
		user.setAssociacao(assoc);
		try {
			user.setRole(roleRepository.findByName(role));
//			logger.info("TRY USER: "+user.toString());
			user = userLoginRepository.save(user);
			emailService.sendMail(user, password);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return false;
		}
		return true;
	}
//	private boolean createLogin(String username, String password, Long idPerson, String name) {
//		IntegraLogin login = new IntegraLogin();
//		login.setId(idPerson);
//		login.setPassword(password);
//		login.setUsername(username);
//		login.setName(name);
//		/*
//		try {
//			Application application = eurekaClient.getApplication(authServiveId);
//			InstanceInfo instanceInfo = application.getInstances().get(0);
//			System.out.println(instanceInfo.getAppName());
//			//			String url = "http://" + instanceInfo.getIPAddr() + ":" + instanceInfo.getPort() + "/";
//			String url = "http://localhost:" + instanceInfo.getPort() + "/";
//			System.out.println("URL" + url);
//			Boolean retorno = restTemplate.postForObject(url, login, Boolean.class);
//			System.out.println("RESPONSE " + retorno.toString());
//		}catch (Exception e) {
//			System.out.println(e.getMessage());
//			return false;
//		}
//		*/
//		return true;
//	}

//	public boolean updatePin(PersonDTO person) {
//		try {
//			Person update = personRepositoryImp.getById(person.getId());
//			update.setPin(person.getPin());
//			update = personRepositoryImp.save(update);
//			return true;
//		}catch (Exception e) {
//			logger.error("Erro ao Atualizar o Pin do Person id: {}", person.getId());
//			logger.error(e.getMessage());
//			System.out.println(e.getMessage());
//			return false;
//		}
//	}
//
//	public Map<String, String> savePersonPartner(PersonPartnerDTO personDTO) {
//		logger.info("Serviço criação parceiros");
//		PersonDTO person = new PersonDTO();
//		person.setContact(personDTO.getContact());
//		person.setCPF(personDTO.getCPF());
//		person.setKids(personDTO.getKids());
//		person.setName(personDTO.getName());
//		person.setPassword(personDTO.getPassword());
//		person.setPin(personDTO.getPin());
//		person.setOrigin("PlayEduca");
//		logger.info("Save person");
//		person = savePerson(person);
//		logger.info("CreatePayment");
//		Boolean bool = createPayment(person.getId(), personDTO.getToken(), personDTO.getExpiration(), personDTO.getContact().getEmail());
//		Map<String,String> retorno = new HashMap<String,String>();
//		retorno.put("cadastrado", bool.toString());
//		retorno.put("idPerson", person.getId().toString());
//		retorno.put("email",  person.getContact().getEmail());
//		return retorno;		
//	}
//	
//	private Boolean createPayment(Long idPerson, String code, Date expiration, String email) {
//		PaymentDTO payment = new PaymentDTO();
//		payment.setPersonId(idPerson);
//		payment.setCode(code);
//		payment.setExpiration(expiration);
//		if(code != Constants.TokenFreeWeek) {
//			payment.setPaymentMethod(Constants.PaymentMethodToken);
//		}else {
//			payment.setPaymentMethod(Constants.PaymentMethodFreeWeek);
//		}
//		payment.setEmail(email);
//
//		try {
//			Application application = eurekaClient.getApplication(paymentServiceId);
//			InstanceInfo instanceInfo = application.getInstances().get(0);
//			System.out.println(instanceInfo.getAppName());
//			String url = null;
//			if(payment.getPaymentMethod().equals(Constants.PaymentMethodToken)) {
//				url = "http://localhost:" + instanceInfo.getPort() + "/createPaymentEduca";
//			}else {
//				url = "http://localhost:" + instanceInfo.getPort() + "/";
//			}
//			System.out.println("URL" + url);
//			System.out.println(payment.getCode());
//			Boolean retorno = restTemplate.postForObject(url, payment, Boolean.class);
//			System.out.println("RESPONSE " + retorno.toString());
//		}catch (Exception e) {
//			System.out.println(e.getMessage());
//			return false;
//		}
//		return true;
//	}

}
