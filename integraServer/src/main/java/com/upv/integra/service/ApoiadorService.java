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
import com.upv.integra.model.Apoiador;
import com.upv.integra.model.ApoiadorContato;
import com.upv.integra.model.Doacao;
import com.upv.integra.model.Funcionario;
import com.upv.integra.model.Pessoa;
import com.upv.integra.model.dto.ApoiadorContatoDTO;
import com.upv.integra.model.dto.AtendimentoDTO;
import com.upv.integra.model.dto.DoacaoDTO;
import com.upv.integra.repository.DadosCadastraisRepository;
import com.upv.integra.repository.IntegraLoginRepository;
import com.upv.integra.repository.RoleRepository;
import com.upv.integra.repository.imp.ApoiadorContatoRepositoryImp;
import com.upv.integra.repository.imp.ApoiadorRepositoryImp;
import com.upv.integra.repository.imp.DoacaoRepositoryImp;
import com.upv.integra.repository.imp.FuncionarioRepositoryImp;
import com.upv.integra.repository.imp.PessoaRepositoryImp;
import com.upv.integra.security.InterfaceAuthenticationFacade;
import com.upv.integra.security.jwt.resources.JwtUserDetailsDTO;

@Service
public class ApoiadorService {	

	@Autowired DoacaoRepositoryImp doacaoRepositoryImp;
	@Autowired ApoiadorContatoRepositoryImp apoiadorContatoRepositoryImp;
	@Autowired ApoiadorRepositoryImp apoiadorRepositoryImp;
	@Autowired FuncionarioRepositoryImp funcionarioRepositoryImp;
	@Autowired RoleRepository roleRepository;
	@Autowired UtilService utilService;
	@Autowired IntegraLoginService integraLoginService;
	@Autowired IntegraLoginRepository userLoginRepository;
	@Autowired PessoaRepositoryImp personRepositoryImp;
	@Autowired DadosCadastraisRepository contactsRepository;
	@Autowired public JavaMailSender mailSender;
	@Autowired public SimpleMailMessage template;
	@Autowired
	private InterfaceAuthenticationFacade autenticationFacede;
	
	private static final Logger logger = LoggerFactory.getLogger(AtendimentoService.class);

	public Apoiador saveApoiador(Apoiador apoiador) throws BusinessException {
		try {
			if(apoiador.getId() == null) {
				apoiador.getPessoa().setDateRegister(new Date());
				apoiador.setDataCadastrado(new Date());
				if(apoiador.getPessoa().getDadosCadastrais() != null && apoiador.getPessoa().getDadosCadastrais().getEmail() != null) {
					logger.info("IDs == null");
					String email = apoiador.getPessoa().getDadosCadastrais().getEmail();
					List<Apoiador> retornos2 = apoiadorRepositoryImp.getByEmail(email);
					if(retornos2.size() > 1) {
						logger.error("Apoiador com esse Email já existe na base de dados");
						throw new BusinessException("Apoiador com esse Email já existe na base de dados", Constants.EmailIsInTheBank );
					}else if(!retornos2.isEmpty()) {
						logger.error("apoiador.getPessoa().setDadosCadastrais");
						
						apoiador.setPessoa(retornos2.get(0).getPessoa());
					}
//					List<DadosCadastrais> retornos2 = contactsRepository.findAllByEmail(email);
//					if(retornos2.size() > 1) {
//						logger.error("Email já existe na base de dados");
//						throw new BusinessException("Email já existe na base de dados", Constants.EmailIsInTheBank );
//					}else if(!retornos2.isEmpty()) {
//						logger.error("apoiador.getPessoa().setDadosCadastrais");
//						
//						apoiador.getPessoa().setDadosCadastrais(retornos2.get(0));
//					}
				}else {
					logger.error("Campo Email vazio ou nulo");
					throw new BusinessException("Campo Email vazio ou nulo", Constants.EmailFieldEmptyOrNull );
				}
			}else if(apoiador.getId() != null && apoiador.getPessoa() != null && apoiador.getPessoa().getDadosCadastrais() != null) {
				logger.info("IDs != null");
				String cpf = apoiador.getPessoa().getCpf();
				List<Pessoa> retornos = personRepositoryImp.findAllByCpf(cpf);
				if(retornos.size() > 1) {
					logger.error("Pessoa já existe na base de dados");
					throw new BusinessException("Pessoa já existe na base de dados", Constants.EmailIsInTheBank );
				}else if(!retornos.isEmpty()) {
					logger.error("atendimento.setPessoa");
					//apoiador.setPessoa(retornos.get(0));
				};
			}
			apoiador.getPessoa().setDateRegister(new Date());
			apoiador.setDataCadastrado(new Date());
			if(apoiador.getPessoa().getNome()==null){
				logger.error("Campo Nome Completo Vazio ou Nulo");
				throw new BusinessException("Campo Nome Completo Vazio ou Nulo ", Constants.EmptyorNullName );
			}
//			if(!apoiador.getPessoa().getCpf().isEmpty() && 
//					!utilService.verifyCPF(apoiador.getPessoa().getCpf()) && 
//					apoiador.getPessoa().getId() == null) {
//				logger.error("CPF Já cadastrado");
//				throw new BusinessException("CPF já cadastrado", Constants.CPFUsed);
//			}
			Funcionario funcionario = funcionarioRepositoryImp.getById(apoiador.getFuncId());
			if(funcionario!=null) {
				apoiador.setCadastradoPor(funcionario);				
			}else {
				logger.error("Funcionario Nulo");
				throw new BusinessException("Funcionario Nulo ", Constants.NonFunc );
			}
			logger.info("contactsRepository save");
			contactsRepository.save(apoiador.getPessoa().getDadosCadastrais());
			logger.info("personRepositoryImp save");
			personRepositoryImp.save(apoiador.getPessoa());			
			logger.info("apoiadorRepositoryImp save");
//			logger.info(apoiador.toString());
			apoiador = apoiadorRepositoryImp.save(apoiador);
/*			
			logger.info("getAtendimentosADDED");
			if(!funcionario.getAtendimentos().contains(atendimento)) {
				funcionario.getAtendimentos().add(atendimento);
			}
*/
			logger.info("ApoiadorCreated");
			return apoiador;
			
		} catch (BusinessException e) {
			throw new BusinessException(e.getMessage(), e.getCode());
		}
	}
	
	public ApoiadorContatoDTO saveApoiadorContato(ApoiadorContatoDTO apoiadorContatoDTO) throws BusinessException {
		try {
			ApoiadorContato apoiadorContato = convertDtoTocontact(apoiadorContatoDTO);
			if(apoiadorContato.getTema()==null){
				logger.error("Tema Vazio ou Nulo");
				throw new BusinessException("Campo Nome Completo Vazio ou Nulo ", Constants.EmptyorNullName );
			}
			if(apoiadorContato.getDataContato()==null){
				logger.error("DataContato Vazio ou Nulo");
				throw new BusinessException("Campo Nome Completo Vazio ou Nulo ", Constants.EmptyorNullName );
			}
			Apoiador busca = apoiadorRepositoryImp.getById(apoiadorContatoDTO.getApoiaId());
			if(busca!=null) {
				apoiadorContato.setApoiador(busca);				
			}else {
				logger.error("Apoiador Nulo");
				throw new BusinessException("Apoiador Nulo ", Constants.NonFunc );
			}		
			logger.info("apoiadorRepositoryImp save");
			apoiadorContato = apoiadorContatoRepositoryImp.save(apoiadorContato);

			logger.info("ApoiadorContatoDTO");
			return new ApoiadorContatoDTO(apoiadorContato);
			
		} catch (BusinessException e) {
			throw new BusinessException(e.getMessage(), e.getCode());
		}
	}
	
	public DoacaoDTO saveDoacao(DoacaoDTO doacaoDTO) throws BusinessException {
		try {
			Doacao doacao = convertDtoToDoacao(doacaoDTO);
			if(doacao.getForma()==null){
				logger.error("Forma Vazio ou Nulo");
				throw new BusinessException("Campo Nome Completo Vazio ou Nulo ", Constants.EmptyorNullName );
			}
			if(doacao.getPeriodicidade()==null){
				logger.error("Periodicidade Vazio ou Nulo");
				throw new BusinessException("Campo Nome Completo Vazio ou Nulo ", Constants.EmptyorNullName );
			}
			if(doacao.getValor()==null){
				logger.error("Valor Vazio ou Nulo");
				throw new BusinessException("Campo Nome Completo Vazio ou Nulo ", Constants.EmptyorNullName );
			}
			Apoiador busca = apoiadorRepositoryImp.getById(doacaoDTO.getApoiaId());
			if(busca!=null) {
				doacao.setApoiador(busca);				
			}else {
				logger.error("Apoiador Nulo");
				throw new BusinessException("Apoiador Nulo ", Constants.NonFunc );
			}		
			logger.info("doacaoRepositoryImp save");
			doacao = doacaoRepositoryImp.save(doacao);

			logger.info("DoacaoDTO");
			return new DoacaoDTO(doacao);
			
		} catch (BusinessException e) {
			throw new BusinessException(e.getMessage(), e.getCode());
		}
	}

	public List<Apoiador> listApoiadores(){
		List<Apoiador> la =  apoiadorRepositoryImp.findAll();
		return la;
	}
	public List<Apoiador> listApoiadoresBySameAssoc(){
		Authentication auth = autenticationFacede.getAuthentication();
		JwtUserDetailsDTO membro = (JwtUserDetailsDTO) auth.getDetails();
		
		List<Apoiador> la =  apoiadorRepositoryImp.findAllBySameAssoc(membro.getAssocId());
		return la;
	}	

//	public Set<KidProfile> listChildren(Long parentId){
//		Optional<Pessoa> p = personRepositoryImp.findOneById(parentId);
//		if(p.isPresent()) {
//			return p.get().getKids();
//		}
//		return null;
//	}

	public Apoiador updateApoiador(Apoiador apoiador) {			
		Apoiador atend = findApoiador(apoiador.getId());
		if(atend!=null) {
			logger.info("updateApoiador");
			return saveApoiador(apoiador);
		}else {
			throw new BusinessException("Apoiador não encontrado", Constants.FuncNotFound);
		}
	}
	
	public ApoiadorContatoDTO updateContato(ApoiadorContatoDTO dto) {			
		Optional<ApoiadorContato> obj = apoiadorContatoRepositoryImp.findOneById(dto.getId());
		if(obj!=null) {
			logger.info("updateContato");
			return saveApoiadorContato(dto);
		}else {
			throw new BusinessException("Apoiador não encontrado", Constants.FuncNotFound);
		}
	}
	
	public DoacaoDTO updateDoacao(DoacaoDTO dto) {			
		Optional<Doacao> obj = doacaoRepositoryImp.findOneById(dto.getId());
		if(obj!=null) {
			logger.info("updateDoacao");
			return saveDoacao(dto);
		}else {
			throw new BusinessException("Apoiador não encontrado", Constants.FuncNotFound);
		}
	}

	public String deleteApoiador(Long id) {
		Apoiador apoiador = apoiadorRepositoryImp.getById(id);
		if(apoiador != null) {			
			apoiadorRepositoryImp.delete(apoiador);
			
			Pessoa person = personRepositoryImp.getById(apoiador.getPessoa().getId());
			if(person!=null) {
				personRepositoryImp.deletePerson(person);
			}			

			return "Excluído com Sucesso";
		}else {
			return "Erro ao Excluir Funcionario";
		}
	}
	
	public String deleteDoacao(Long id) {
		Doacao obj = doacaoRepositoryImp.getById(id);
		if(obj != null) {
			doacaoRepositoryImp.delete(obj);
			return "Excluído com Sucesso";
		}else {
			return "Erro ao Excluir Funcionario";
		}
	}
	
	public String deleteContato(Long id) {
		ApoiadorContato obj = apoiadorContatoRepositoryImp.getById(id);
		if(obj != null) {
			apoiadorContatoRepositoryImp.delete(obj);
			return "Excluído com Sucesso";
		}else {
			return "Erro ao Excluir Funcionario";
		}
	}

	public Apoiador findApoiador(Long id) {		
		Optional<Apoiador> p = apoiadorRepositoryImp.findOneById(id);
		if(p.isPresent()) {
			return p.get();
		}
		return null;
	}
	
	public List<ApoiadorContatoDTO> findContatos(Long id) {
		List<ApoiadorContato> lp =  apoiadorContatoRepositoryImp.findByApoiadorId(id);
		List<ApoiadorContatoDTO> DtoList = new ArrayList<ApoiadorContatoDTO>();
		lp.forEach(obj -> {
			DtoList.add(new ApoiadorContatoDTO(obj));
		});
		return DtoList;
	}
	
	public List<DoacaoDTO> findDoacoes(Long id) {
		List<Doacao> lp =  doacaoRepositoryImp.findByApoiadorId(id);
		List<DoacaoDTO> DtoList = new ArrayList<DoacaoDTO>();
		lp.forEach(obj -> {
			DtoList.add(new DoacaoDTO(obj));
		});
		return DtoList;
	}	
	
	public ApoiadorContato convertDtoTocontact(ApoiadorContatoDTO dto) {
		logger.info("Converte DTO em Contato");
		ApoiadorContato retorno = new ApoiadorContato();
		retorno.setId(dto.getId());
		retorno.setDataContato(dto.getDataContato());
		retorno.setObs(dto.getObs());
		retorno.setTema(dto.getTema());
		retorno.setFuncNome(dto.getFuncNome());
		if(retorno.getId() == null || retorno.getId() == 0) {
			retorno.setId(null);
		}
		return retorno;
	}
	
	public Doacao convertDtoToDoacao(DoacaoDTO dto) {
		logger.info("Converte DTO em Doacao");
		Doacao retorno = new Doacao();
		retorno.setId(dto.getId());
		retorno.setForma(dto.getForma());
		retorno.setPeriodicidade(dto.getPeriodicidade());
		retorno.setValor(dto.getValor());
		retorno.setFuncNome(dto.getFuncNome());
		if(retorno.getId() == null || retorno.getId() == 0) {
			retorno.setId(null);
		}
		return retorno;
	}
}
