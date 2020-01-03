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
import com.upv.integra.model.Atendimento;
import com.upv.integra.model.Funcionario;
import com.upv.integra.model.Paciente;
import com.upv.integra.model.Pessoa;
import com.upv.integra.model.dto.AtendimentoDTO;
import com.upv.integra.model.dto.PacienteDTO;
import com.upv.integra.repository.DadosCadastraisRepository;
import com.upv.integra.repository.IntegraLoginRepository;
import com.upv.integra.repository.RoleRepository;
import com.upv.integra.repository.imp.AtendimentoRepositoryImp;
import com.upv.integra.repository.imp.FuncionarioRepositoryImp;
import com.upv.integra.repository.imp.PessoaRepositoryImp;

@Service
public class AtendimentoService {	

	@Autowired FuncionarioRepositoryImp funcionarioRepositoryImp;
	@Autowired RoleRepository roleRepository;
	@Autowired IntegraLoginService integraLoginService;
	@Autowired IntegraLoginRepository userLoginRepository;
	@Autowired PessoaRepositoryImp personRepositoryImp;
	@Autowired AtendimentoRepositoryImp atendimentoRepository;
	@Autowired DadosCadastraisRepository contactsRepository;
	@Autowired public JavaMailSender mailSender;
	@Autowired public SimpleMailMessage template;
	@Autowired
	UtilService utilService;

	private static final Logger logger = LoggerFactory.getLogger(AtendimentoService.class);

	public AtendimentoDTO saveAtendimento(AtendimentoDTO atendimentoDTO) throws BusinessException {
		logger.info("Salvando Atendimento");
		if (utilService.verifyAuthADM()) {
			try {
				Atendimento atendimento = convertDtoToAtend(atendimentoDTO);
				if(atendimento.getId() == null) {
					atendimento.getPessoa().setDateRegister(new Date());				
	//				if(atendimento.getPessoa().getDadosCadastrais() != null && atendimento.getPessoa().getDadosCadastrais().getEmail() != null) {
	//					String email = atendimento.getPessoa().getDadosCadastrais().getEmail();
	//					List<Atendimento> retornos2 = atendimentoRepository.getByEmail(email);
	//					logger.info(retornos2.toString());
	//					if(retornos2.size() > 1) {
	//						logger.error("Atendimento com esse Email já existe na base de dados");
	//						throw new BusinessException("Atendimento com esse Email já existe na base de dados", Constants.EmailIsInTheBank );
	//					}else if(!retornos2.isEmpty()) {
	//						logger.error("apoiador.getPessoa().setDadosCadastrais");
	//						
	//						atendimento.setPessoa(retornos2.get(0).getPessoa());
	//					}
	//				}else {
	//					logger.error("Campo Email vazio ou nulo");
	//					throw new BusinessException("Campo Email vazio ou nulo", Constants.EmailFieldEmptyOrNull );
	//				}
				}else if(atendimento.getId() != null && atendimento.getPessoa() != null && atendimento.getPessoa().getDadosCadastrais() != null) {
					logger.info("IDs != null");				
					if(atendimento.getPessoa().getCpf()!=null) {
						String cpf = atendimento.getPessoa().getCpf();
						List<Pessoa> retornos = personRepositoryImp.findAllByCpf(cpf);
						if(retornos.size() > 1) {
							logger.error("Pessoa já existe na base de dados");
							throw new BusinessException("Pessoa já existe na base de dados", Constants.EmailIsInTheBank );
						}else if(!retornos.isEmpty()) {
							logger.error("atendimento.setPessoa by Cpf");
							atendimento.setPessoa(retornos.get(0));
						};
					}else {
						Pessoa person = personRepositoryImp.getById(atendimento.getPessoa().getId());
						if(person!=null) {
							logger.error("atendimento.setPessoa By Id");
							atendimento.setPessoa(person);
						}else {
							logger.error("Set Pessoa By Id error");
							throw new BusinessException("Set Pessoa By Id error", Constants.EmailIsInTheBank );
						}
					}
					if(atendimentoDTO.getAtualizar()==true) {
						atendimento.setPessoa(atendimentoDTO.getPessoa());
					}
				}
				if(atendimento.getPessoa().getNome()==null){
					logger.error("Campo Nome Completo Vazio ou Nulo");
					throw new BusinessException("Campo Nome Completo Vazio ou Nulo ", Constants.EmptyorNullName );
				}
				if(!atendimento.getPessoa().getCpf().isEmpty() && !verifyCPF(atendimento.getPessoa().getCpf()) && atendimento.getPessoa().getId() == null) {
					logger.error("CPF Já cadastrado");
					throw new BusinessException("CPF já cadastrado", Constants.CPFUsed);
				}/*
				Funcionario funcionario = funcionarioRepositoryImp.getById(atendimentoDTO.getFuncId());
				if(funcionario!=null) {
					atendimento.setCadastradoPor(funcionario);				
				}else {
					logger.error("Funcionario Nulo");
					throw new BusinessException("Funcionario Nulo ", Constants.NonFunc );
				}	*/		
				
				logger.info("contactsRepository save");			
				contactsRepository.save(atendimento.getPessoa().getDadosCadastrais());
				
	//			logger.info("personRepositoryImp save");			
				personRepositoryImp.save(atendimento.getPessoa());
	//			
				logger.info("atendimentoRepository save");
				atendimento = atendimentoRepository.save(atendimento);
	/*			
				logger.info("getAtendimentosADDED");
				if(!funcionario.getAtendimentos().contains(atendimento)) {
					funcionario.getAtendimentos().add(atendimento);
				}
	*/
				logger.info("AtendimentoDTO");
				return new AtendimentoDTO(atendimento);
				
			} catch (BusinessException e) {
				throw new BusinessException(e.getMessage(), e.getCode());
			}
		} else {
			throw new BusinessException("Ação não permitida para esse usuário", Constants.NonAuthorized);
		}
	}

	public List<AtendimentoDTO> listAtendimento(){
		if (utilService.verifyAuthADM()) {
			List<Atendimento> la =  atendimentoRepository.findAll();
			List<AtendimentoDTO> dtoList = new ArrayList<AtendimentoDTO>();
			la.forEach(obj -> {
				if(containsPessoaId(dtoList,obj.getPessoa().getId())) {
					//logger.info("containsPessoaId");
				}else {
					//logger.info("Não containsPessoaId");
					dtoList.add(new AtendimentoDTO(obj));
				}			
			});
			return dtoList;
		} else {
			throw new BusinessException("Ação não permitida para esse usuário", Constants.NonAuthorized);
		}
	}
	public boolean containsPessoaId(final List<AtendimentoDTO> list, final Long pessoaId){
	    return list.stream().filter(o -> o.getPessoa().getId().equals(pessoaId)).findFirst().isPresent();
	}
	
	public List<AtendimentoDTO> listAtendimentoByPersonId(Long id){
		if (utilService.verifyAuthADM()) {
			List<Atendimento> la =  atendimentoRepository.findAll();
			List<AtendimentoDTO> dtoList = new ArrayList<AtendimentoDTO>();
			la.forEach(obj -> {
				if(obj.getPessoa().getId().equals(id)) {
					dtoList.add(new AtendimentoDTO(obj));
				}
			});
			return dtoList;
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

	public AtendimentoDTO updateAtendimento(AtendimentoDTO atendimentoDTO) {
		if (utilService.verifyAuthADM()) {
			AtendimentoDTO atend = findAtendimento(atendimentoDTO.getAtendId());
			if(atend!=null) {
				logger.info("updateFuncionarioDTO");
				return saveAtendimento(atendimentoDTO);
			}else {
				throw new BusinessException("atendimento não encontrado", Constants.FuncNotFound);
			}
		} else {
			throw new BusinessException("Ação não permitida para esse usuário", Constants.NonAuthorized);
		}
	}

	public String deleteAtendimento(Long AtendId) {
		if (utilService.verifyAuthADM()) {
			Atendimento atendimento = atendimentoRepository.getByIdAndFetchFuncEagerly(AtendId);
			if(atendimento != null) {			
	//			func.setEnable(false);
				Funcionario funcionario = atendimento.getCadastradoPor();
				funcionario.getAtendimentos().remove(atendimento);
				
				atendimentoRepository.delete(atendimento);
	/*
				Pessoa person = personRepositoryImp.getById(atendimento.getPessoa().getId());
				if(person!=null) {
					personRepositoryImp.deletePerson(person);
				}
	*/
				return "Excluído com Sucesso";
			}else {
				return "Erro ao Excluir Funcionario";
			}
		} else {
			throw new BusinessException("Ação não permitida para esse usuário", Constants.NonAuthorized);
		}
	}

	public AtendimentoDTO findAtendimento(Long id) {
		if (utilService.verifyAuthADM()) {
			Optional<Atendimento> p = atendimentoRepository.findOneById(id);
			if(p.isPresent()) {
				AtendimentoDTO retorno = new AtendimentoDTO(p.get());
				retorno.setFuncId(p.get().getCadastradoPor().getId());
				return retorno;
			}
			return null;
		} else {
			throw new BusinessException("Ação não permitida para esse usuário", Constants.NonAuthorized);
		}
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
	
	public Atendimento convertDtoToAtend(AtendimentoDTO dto) {
		logger.info("Converte Atendimento DTO em Atendimento");
		Atendimento retorno = new Atendimento();
		retorno.setId(dto.getAtendId());
		retorno.setPessoa(dto.getPessoa());
		retorno.getPessoa().setDadosCadastrais(dto.getPessoa().getDadosCadastrais());
		if(retorno.getId() == null || retorno.getId() == 0) {
			retorno.setId(null);
		}
		if(retorno.getCadastradoPor() == null) {
			Funcionario busca = funcionarioRepositoryImp.getById(dto.getFuncId());
			if(busca!=null) {
				retorno.setCadastradoPor(busca);
			}else {
				logger.error("Funcionario nula ou invalida");
			}
		}
		retorno.setFuncNome(dto.getFuncNome());
		retorno.getPessoa().setLastUpdate(new Date());
		retorno.setComoChegou(dto.getComoChegou());
		retorno.setDataAtendimento(dto.getDataAtendimento());
		retorno.setDemanda(dto.getDemanda());
		retorno.setLocal(dto.getLocal());
		retorno.setObs(dto.getObs());
		retorno.setTipo(dto.getTipo());
		return retorno;
	}
}
