package com.upv.integra.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.upv.integra.constants.Constants;
import com.upv.integra.exception.BusinessException;
import com.upv.integra.model.Associacao;
import com.upv.integra.model.Certificacao;
import com.upv.integra.model.DadosCadastrais;
import com.upv.integra.model.Funcionario;
import com.upv.integra.model.IntegraLogin;
import com.upv.integra.model.Pessoa;
import com.upv.integra.model.dto.AssociacaoDTO;
import com.upv.integra.model.dto.FuncionarioDTO;
import com.upv.integra.repository.CertificacaoRepository;
import com.upv.integra.repository.DadosCadastraisRepository;
import com.upv.integra.repository.IntegraLoginRepository;
import com.upv.integra.repository.RoleRepository;
import com.upv.integra.repository.imp.AssociacaoRepositoryImp;
import com.upv.integra.repository.imp.FuncionarioRepositoryImp;
import com.upv.integra.repository.imp.PessoaRepositoryImp;

@Service
public class AssociacaoService {
	
	@Autowired private EmailServiceImpl emailService;
	@Autowired FuncionarioRepositoryImp funcionarioRepositoryImp;
	@Autowired FuncionarioService funcionarioService;
	@Autowired CertificacaoRepository certificacaoRepository;
	@Autowired RoleRepository roleRepository;
	@Autowired AssociacaoRepositoryImp associacaoRepositoryImp;
	@Autowired IntegraLoginService integraLoginService;
	@Autowired DadosCadastraisRepository contactsRepository;
	@Autowired IntegraLoginRepository userLoginRepository;
	@Autowired PessoaRepositoryImp pessoaRepositoryImp;
	@Autowired UtilService utilService;
	
	private static final Logger logger = LoggerFactory.getLogger(AssociacaoService.class);
	
	public AssociacaoDTO saveAssociacao(AssociacaoDTO associacaoDTO) throws BusinessException {
		logger.info("Salvando Associacao");
		if(utilService.verifyAuthADM()) {
			try {
				Associacao associacao = convertDtoToAssoc(associacaoDTO);
				if(associacao.getId() == null) {	
					logger.info("Associacao id null");
					if(associacao.getDadosCadastrais() != null && associacao.getDadosCadastrais().getEmail() != null) {
						String email = associacao.getDadosCadastrais().getEmail();
						List<DadosCadastrais> retornos = contactsRepository.findAllByEmail(email);
						if(retornos.size() >=1 ) {
							logger.info("email founded: "+email);
							logger.error("Email já existe na base de dados");
							throw new BusinessException("Email já existe na base de dados", Constants.EmailIsInTheBank );
						}
					}else {
						logger.error("Campo Email vazio ou nulo");
						throw new BusinessException("Campo Email vazio ou nulo", Constants.EmailFieldEmptyOrNull );
					}
					String cnpj = associacao.getCnpj();
					List<Associacao> retornos2 = associacaoRepositoryImp.getByCnpj(cnpj);
					if(retornos2.size() >=1) {
						logger.error("Associacao com esse CPF já existe na base de dados");
						throw new BusinessException("paciente com esse CPF já existe na base de dados", Constants.EmailIsInTheBank );
					}else if(!retornos2.isEmpty()) {
						logger.error("Associacao.setDadosCadastrais");						
						//paciente.setPessoa(retornos2.get(0).getPessoa());
					}
				}else if(associacao.getId() != null && associacao.getDadosCadastrais() != null) {
					logger.info("Associacao id NOT null");
					String cnpj = associacao.getCnpj();
					List<Associacao> retornos = associacaoRepositoryImp.findAllByCnpj(cnpj);
					if(retornos.size() > 1) {
						logger.error("Associacao já existe na base de dados");
						throw new BusinessException("Associacao já existe na base de dados", Constants.EmailIsInTheBank );
					}else if(!retornos.isEmpty()) {
	//					logger.error("funcionario.setPessoa");
	//					funcionario.setPessoa(retornos.get(0));
					};				
					String email = associacao.getDadosCadastrais().getEmail();
					List<Associacao> retornos2 = associacaoRepositoryImp.getByEmail(email);
					if(retornos2.size() > 1) {
						logger.error("Email já existe na base de dados");
						throw new BusinessException("Email já existe na base de dados", Constants.EmailIsInTheBank );
					}else if(!retornos2.isEmpty()) {
						logger.error("funcionario.getPessoa().setDadosCadastrais");
	//					funcionario.getPessoa().setDadosCadastrais(retornos2.get(0));
					}
				}
	//			if(funcionario.getAssociacao()==null){
	//				logger.error("Campo Id da Associação Vazio ou Nulo");
	//				throw new BusinessException("Campo Id da Associação Vazio Vazio ou Nulo ", Constants.EmptyorNullName );
	//			}
				if(associacao.getNome()==null){
					logger.error("Campo Nome Completo Vazio ou Nulo");
					throw new BusinessException("Campo Nome Completo Vazio ou Nulo ", Constants.EmptyorNullName );
				}
				if(!associacao.getCnpj().isEmpty() && !verifyCNPJ(associacao.getCnpj()) && associacao.getId() == null) {
					logger.error("CNPJ Já cadastrado");
					throw new BusinessException("CNPJ já cadastrado", Constants.CNPJUsed);
				}
				if(associacao.getDadosCadastrais().getEmail() == null) {
					logger.error("Campo Email Vazio ou Nulo");
					throw new BusinessException("Campo Email Vazio Ou Nulo ", Constants.EmailFieldEmptyOrNull );
				}
	//			if(person.getContact() == null || person.getContact().getPhone() == null) {
	//				logger.error("Campo Telefone Vazio ou Nulo");
	//				throw new BusinessException("Campo Telefone Vazio Ou Nulo ", Constants.FieldPhoneEmptyOrNull );
	//			}
	//			if(person.getKids() != null) {
	//				logger.info("Verifica Kids");
	//				verifyKid(person);
	//			}			
				logger.info("contactsRepository save");
				contactsRepository.save(associacao.getDadosCadastrais());
	//			logger.info(associacao.toString());
				associacao = associacaoRepositoryImp.save(associacao);
	//			logger.info("associacao pos save: "+associacao.toString());
				if((associacaoDTO.getId() == null || associacaoDTO.getId() == 0) && associacao.getId() != null) {
					
					FuncionarioDTO defaultFuncDTO = createFuncionarioDTODefault(associacao);
	//				logger.info("defaultFuncDTO: "+ defaultFuncDTO.toString());
					
	//				Funcionario funcCreated = funcionarioRepositoryImp.getById(defaultFuncDTO.getFuncId());
	//				logger.info("funcCreated: "+ funcCreated.toString());
					
	//				logger.info("Criação de Login");
	//				Boolean retorno = createAssocLogin(funcCreated.getPessoa().getDadosCadastrais().getEmail(), null, funcCreated, funcCreated.getPessoa().getNome(), associacao);
	//				if(retorno.equals(false)) {
	//					logger.error("Erro ao Criar login");
	//					funcCreated.setEnable(false);
	//					funcionarioRepositoryImp.deleteFuncionario(funcCreated);
	//					pessoaRepositoryImp.deletePerson(funcCreated.getPessoa());
	//					contactsRepository.delete(funcCreated.getPessoa().getDadosCadastrais());
	//					throw new BusinessException("Erro ao criar Login", 99);
	//				}
						
				}
				AssociacaoDTO responseDTO = new AssociacaoDTO(associacao);
	//			logger.info(responseDTO.toString());		
				return responseDTO;
	
			} catch (BusinessException e) {
				throw new BusinessException(e.getMessage(), e.getCode());
			}
		}else {
			throw new BusinessException("Ação não permitida para esse usuário", Constants.NonAuthorized);
		}
	}

	public List<AssociacaoDTO> listAll(){		
//		if(utilService.verifyAuthASSOC()) {
			List<Associacao> la = associacaoRepositoryImp.findAll();
			List<AssociacaoDTO> associacaoDTOList = new ArrayList<AssociacaoDTO>();
			la.forEach(assoc -> {
				associacaoDTOList.add(new AssociacaoDTO(assoc));
			});
			return associacaoDTOList;
//		}else {
//			throw new BusinessException("Ação não permitida para esse usuário", Constants.NonAuthorized);
//		}
	}	

//	public Set<KidProfile> listChildren(Long parentId){
//		Optional<Pessoa> p = personRepositoryImp.findOneById(parentId);
//		if(p.isPresent()) {
//			return p.get().getKids();
//		}
//		return null;
//	}

	public AssociacaoDTO updateAssociacao(AssociacaoDTO associacaoDTO) {
		if(utilService.verifyAuthASSOC()) {
			AssociacaoDTO func = findAssociacao(associacaoDTO.getId());
			if(func!=null) {
				logger.info("updateAssociacaoDTO");
				return saveAssociacao(associacaoDTO);
			}else {
				throw new BusinessException("Associacao não encontrado", Constants.FuncNotFound);
			}
		}else {
			throw new BusinessException("Ação não permitida para esse usuário", Constants.NonAuthorized);
		}
	}

	public String deleteAssociacao(Long assocId) {
		if(utilService.verifyAuthADM()) {
			Associacao assoc = associacaoRepositoryImp.findOneById(assocId).get();
			if(assoc != null) {			
				logger.info(assoc.toString());
				logger.info("deleteAssociacao");
				associacaoRepositoryImp.deleteAssociacao(assoc);
				
				IntegraLogin login = userLoginRepository.findByUsername(assoc.getDadosCadastrais().getEmail());
				if(login!=null) {
					logger.info("userLoginRepository");
					userLoginRepository.delete(login);
					logger.info("deleteFuncionario");
					funcionarioRepositoryImp.deleteFuncionario(login.getFucionario());
				}			
				
				//personRepositoryImp.deletePerson(funcionario.getPessoa());
				
				DadosCadastrais dc = contactsRepository.findByEmail(assoc.getDadosCadastrais().getEmail());
				if(dc!=null) {
					logger.info("contactsRepository");
					contactsRepository.delete(dc);
				}
				return "Excluído com Sucesso";
			}else {
				return "Erro ao Excluir Associacao";
			}
		}else {
			throw new BusinessException("Ação não permitida para esse usuário", Constants.NonAuthorized);
		}
	}
	
	public Associacao convertDtoToAssoc(AssociacaoDTO dto) {
		logger.info("Converte Associacao DTO em Associacao");
//		logger.info(dto.toString());
		Associacao retorno = new Associacao();
		retorno.setId(dto.getId());
		retorno.setDadosCadastrais(dto.getContact());
		if(retorno.getId() == null || retorno.getId() == 0) {
			retorno.setId(null);
			//retorno.setKidsNumber(Constants.DependentLimit);
			//retorno.setEmailBoasVindas(true);
		}
		if(dto.getCertificacoes()!=null){
			try {
				Set<Certificacao> certList = new HashSet<Certificacao>();
				dto.getCertificacoes().forEach(cert -> {
					Certificacao certificacao =  certificacaoRepository.findByNome(cert);
					if(certificacao != null) {
						certList.add(certificacao);
					}else {
						Certificacao newCert = new Certificacao();
						newCert.setNome(cert);
						certificacaoRepository.save(newCert);
						certList.add(certificacaoRepository.findByNome(newCert.getNome()));
					}					
				});
				retorno.setCertificacoes(certList);
			}catch (BusinessException e) {
				logger.error("Erro nas certificacoes");
				throw new BusinessException(e.getMessage(), e.getCode());
			}
		}
		retorno.setOutrasCertificacoes(dto.getOutrasCertificacoes());
		retorno.setCnpj(dto.getCnpj());
		retorno.setDt_Fundacao(dto.getDataFund());
		retorno.setMandatoInicio(dto.getMandatoIni());
		retorno.setMandatoFim(dto.getMandatoFim());
		retorno.setMissao(dto.getMissao());
		retorno.setNome(dto.getName());
		retorno.setPresidente(dto.getPresidente());
		retorno.setSigla(dto.getSigla());
		retorno.setSite(dto.getSite());
//		retorno.setCertificacoes(dto.getCertificaoes());
		retorno.setLastUpdate(new Date());
		retorno.setEnable(true);
//		logger.info("RETORNO: "+retorno.toString());
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

	public AssociacaoDTO findAssociacao(Long id) {
		Optional<Associacao> p = associacaoRepositoryImp.findOneById(id);
		if(p.isPresent()) {
			AssociacaoDTO retorno = new AssociacaoDTO(p.get());			
			Set<String> certList = new HashSet<String>();
			p.get().getCertificacoes().forEach(cert -> {
				certList.add(cert.getNome());									
			});
			retorno.setCertificacoes(certList);
			return retorno;
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

	public boolean verifyCNPJ(String cnpj) {
		if(cnpj != null) {
			if(associacaoRepositoryImp.findAllByCnpj(cnpj).size() > 0 ) {
				return false;
			}else {
				return true;
			}
		}else {
			return false;
		}
	}
	
	public Boolean createAssocLogin(String username, String password, Funcionario func, String name, Associacao assoc) {
		logger.info("createFuncionarioLogin");
//		logger.info("Funcionario passed: "+func.toString());
		IntegraLogin user = new IntegraLogin();
		if(password==null) {
			password = integraLoginService.generateRandomPassword();
			//emailService.sendMail(user, password);				
			user.setResetPassword(true);
		}else {
			user.setResetPassword(false);
		}
		user.setFucionario(func);
		user.setPassword(integraLoginService.passwordEncoder().encode(password));
//		user.setPassword(userDTO.getPassword());
		user.setUsername(username);
		user.setName(name);
		user.setAssociacao(assoc);
		try {
			user.setRole(roleRepository.findByName("ASSOC"));
//			logger.info("TRY USER: "+user.toString());
			user = userLoginRepository.save(user);
			emailService.sendMail(user, password);
		}catch (Exception e) {
			System.out.println(e.getMessage());
			return false;
		}		
		return true;
	}
	
	public FuncionarioDTO createFuncionarioDTODefault(Associacao assoc) {
		FuncionarioDTO dto = new FuncionarioDTO();
		Pessoa person = new Pessoa();
		person.setNome(assoc.getNome());
		person.setCpf(assoc.getCnpj());
		person.setEnable(true);
		person.setDateRegister(new Date());
		person.setLastUpdate(new Date());
		person.setProfissao("Associação");
		person.setDadosCadastrais(assoc.getDadosCadastrais());
		dto.setPessoa(person);
		dto.setCargo("Associação");
		dto.setAssocId(assoc.getId());
		dto.setAssocName(assoc.getNome()+" - "+assoc.getSigla());
		try {
//			logger.info("funcDTO: "+dto.toString());
			dto = funcionarioService.saveFuncionario(dto,"ASSOC");
			return dto;
		}catch (Exception e) {
			System.out.println(e.getMessage());
			throw new BusinessException(e.getMessage());
		}
	}
	
	public List<Certificacao> listAllCertificados(){		
		List<Certificacao> la = certificacaoRepository.findAllByOrderByIdAsc();
		return la;
	}
}
