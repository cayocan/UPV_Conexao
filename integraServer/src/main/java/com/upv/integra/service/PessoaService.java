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
import org.springframework.stereotype.Service;

import com.upv.integra.constants.Constants;
import com.upv.integra.exception.BusinessException;
import com.upv.integra.model.DadosCadastrais;
import com.upv.integra.model.IntegraLogin;
import com.upv.integra.model.Pessoa;
import com.upv.integra.model.dto.PessoaDTO;
import com.upv.integra.repository.DadosCadastraisRepository;
import com.upv.integra.repository.imp.PessoaRepositoryImp;

@Service
public class PessoaService {

	@Autowired PessoaRepositoryImp personRepositoryImp;
	@Autowired DadosCadastraisRepository contactsRepository;
	@Autowired public JavaMailSender mailSender;
	@Autowired public SimpleMailMessage template;

	private static final Logger logger = LoggerFactory.getLogger(PessoaService.class);

	public PessoaDTO savePerson(PessoaDTO pessoaDTO) throws BusinessException {
		logger.info("Salvando Pessoa");
		try {
			Pessoa person = convertDtoToPerson(pessoaDTO);
			if(person.getId() == null) {
				person.setDateRegister(new Date());
				if(person.getDadosCadastrais() != null && person.getDadosCadastrais().getEmail() != null) {
					String email = person.getDadosCadastrais().getEmail();
					if(contactsRepository.findAllByEmail(email).size() > 0 ) {
						logger.error("Email já existe na base de dados");
						throw new BusinessException("Email já existe na base de dados", Constants.EmailIsInTheBank );
					}
				}else {
					logger.error("Campo Email vazio ou nulo");
					throw new BusinessException("Campo Email vazio ou nulo", Constants.EmailFieldEmptyOrNull );
				}
			}else if(person.getId() != null && person.getDadosCadastrais() != null) {
				String email = person.getDadosCadastrais().getEmail();
				List<DadosCadastrais> retornos = contactsRepository.findAllByEmail(email);
				if(retornos.size() > 1) {
					logger.error("Email já existe na base de dados");
					throw new BusinessException("Email já existe na base de dados", Constants.EmailIsInTheBank );
				}else if(!retornos.isEmpty()) {
					person.setDadosCadastrais(retornos.get(0));
				}
			}
			//if(person.getKids() != null && !person.getKids().isEmpty()) {}
			if(person.getNome()==null){
				logger.error("Campo Nome Completo Vazio ou Nulo");
				throw new BusinessException("Campo Nome Completo Vazio ou Nulo ", Constants.EmptyorNullName );
			}
			if(!person.getCpf().isEmpty() && !verifyCPF(person.getCpf()) && person.getId() == null) {
				logger.error("CPF Já cadastrado");
				throw new BusinessException("CPF já cadastrado", Constants.CPFUsed);
			}
//			if(person.getContact() == null || person.getContact().getPostalCode() == null) {
//				logger.error("Campo CEP Vazio ou Nulo");
//				throw new BusinessException("Campo CEP Vazio Ou Nulo ", Constants.ZipFieldEmptyOrNull );
//			}
//			if(person.getContact() == null || person.getContact().getPhone() == null) {
//				logger.error("Campo Telefone Vazio ou Nulo");
//				throw new BusinessException("Campo Telefone Vazio Ou Nulo ", Constants.FieldPhoneEmptyOrNull );
//			}
//			if(person.getKids() != null) {
//				logger.info("Verifica Kids");
//				verifyKid(person);
//			}
			if(person.getDadosCadastrais() != null  && person.getDadosCadastrais().getId() == null) {
				contactsRepository.save(person.getDadosCadastrais());
			}

			person = personRepositoryImp.save(person);

//			if((pessoaDTO.getId() == null || pessoaDTO.getId() == 0) && person.getId() != null) {
//				logger.info("Criação de Login");
//				if(pessoaDTO.getPassword() != null && person.getDadosCadastrais().getEmail() != null) {
//					Boolean retorno = createLogin(person.getDadosCadastrais().getEmail(), pessoaDTO.getPassword(), person.getId(), person.getNome());
//					if(retorno.equals(false)) {
//						logger.error("Erro ao Criar login");
//						person.setEnable(false);
//						personRepositoryImp.deletePerson(person);
//						contactsRepository.delete(person.getDadosCadastrais());
//						throw new BusinessException("Erro ao criar Login", 99);
//					}
////					else if(personDTO.getOrigin() != "PlayEduca"){
////						Date expiration = Date.from(LocalDate.now().plusDays(7).atStartOfDay(ZoneId.of("America/Sao_Paulo")).toInstant());
////						Boolean retornoPayment = createPayment(person.getId(), Constants.TokenFreeWeek, expiration, person.getContact().getEmail());
////						System.out.println("Retorno Pagamento: " + retornoPayment.toString());
////					}
////					sendMail(person);
//				}
//			}
			return new PessoaDTO(person);

		} catch (BusinessException e) {
			throw new BusinessException(e.getMessage(), e.getCode());
		}
	}

	public List<PessoaDTO> listPerson(){
		List<Pessoa> lp =  personRepositoryImp.findAll();
		List<PessoaDTO> pessoaDtoList = new ArrayList<PessoaDTO>();
		lp.forEach(person -> {
			pessoaDtoList.add(new PessoaDTO(person));
		});
		return pessoaDtoList;
	}

//	public Set<KidProfile> listChildren(Long parentId){
//		Optional<Pessoa> p = personRepositoryImp.findOneById(parentId);
//		if(p.isPresent()) {
//			return p.get().getKids();
//		}
//		return null;
//	}

	public PessoaDTO updatePerson(PessoaDTO pessoaDTO) {
		return savePerson(pessoaDTO);
	}

	public String deletePerson(Long personId) {
		Pessoa person = personRepositoryImp.findOneById(personId).get();
		person.setEnable(false);
//		person.getKids().forEach(kid -> {
//			kid.setEnable(false);
//			kidProfileRepositoryImp.save(kid);
//		});
		Pessoa p = personRepositoryImp.save(person); 
		if(p != null)
			return "Excluído com Sucesso";
		return "Erro ao Excluir Pessoa";
	}
	
	public Pessoa convertDtoToPerson(PessoaDTO dto) {
		logger.info("Converte Pessoa DTO em Pessoa");
		Pessoa retorno = new Pessoa();
		retorno.setId(dto.getId());
		retorno.setDadosCadastrais(dto.getContact());
		retorno.setNome(dto.getName());
		retorno.setCpf(dto.getCPF());
		if(retorno.getId() == null || retorno.getId() == 0) {
			retorno.setId(null);
			//retorno.setKidsNumber(Constants.DependentLimit);
			//retorno.setEmailBoasVindas(true);
		}else {
			Pessoa busca = personRepositoryImp.getById(dto.getId());
//			boolean boas = busca.isEmailBoasVindas();
//			retorno.setEmailBoasVindas(boas);
//			retorno.setKidsNumber(busca.getKidsNumber());
		}
//		if(retorno.getKids() != null && retorno.getKids().size() > 0) {
//			retorno.getKids().forEach((kids) ->{
//				kids.setParent(retorno); 
//				kids.setEnable(true);
//			});
//		}
		retorno.setLastUpdate(new Date());

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
		return retorno;
	}
	/*
	public void verifyKid(Person person) {
		try {
			person.getKids().forEach(kid -> {
				if(kid.getBirthDate() == null) {
					throw new BusinessException("Campo Data de Nascimento Vazio Ou Nulo ", Constants.FieldBirthEmptyOrNull );
				}
				if(kid.getName() == null) {
					throw new BusinessException("Campo Nome Completo Vazio ou Nulo ", Constants.EmptyorNullName );
				}
			});
		}catch (BusinessException e) {
			throw new BusinessException(e.getMessage(), e.getCode());
		}
	}
	*/

	public PessoaDTO findPerson(Long id) {
		Optional<Pessoa> p = personRepositoryImp.findOneById(id);
		if(p.isPresent()) {
			return new PessoaDTO(p.get());
		}
		return null;
	}


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

	private boolean createLogin(String username, String password, Long idPerson, String name) {
		IntegraLogin login = new IntegraLogin();
		login.setId(idPerson);
		login.setPassword(password);
		login.setUsername(username);
		login.setName(name);
		/*
		try {
			Application application = eurekaClient.getApplication(authServiveId);
			InstanceInfo instanceInfo = application.getInstances().get(0);
			System.out.println(instanceInfo.getAppName());
			//			String url = "http://" + instanceInfo.getIPAddr() + ":" + instanceInfo.getPort() + "/";
			String url = "http://localhost:" + instanceInfo.getPort() + "/";
			System.out.println("URL" + url);
			Boolean retorno = restTemplate.postForObject(url, login, Boolean.class);
			System.out.println("RESPONSE " + retorno.toString());
		}catch (Exception e) {
			System.out.println(e.getMessage());
			return false;
		}
		*/
		return true;
	}

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
