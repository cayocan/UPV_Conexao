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
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.upv.integra.constants.Constants;
import com.upv.integra.exception.BusinessException;
import com.upv.integra.model.Acompanhamento;
import com.upv.integra.model.Associado;
import com.upv.integra.model.Funcionario;
import com.upv.integra.model.Medicamento;
import com.upv.integra.model.Paciente;
import com.upv.integra.model.Pessoa;
import com.upv.integra.model.TipoAcompanhamento;
import com.upv.integra.model.TipoAssociado;
import com.upv.integra.model.dto.AcompanhamentoDTO;
import com.upv.integra.model.dto.AssociadoDTO;
import com.upv.integra.model.dto.PacienteDTO;
import com.upv.integra.repository.ConsultaRepository;
import com.upv.integra.repository.DadosCadastraisRepository;
import com.upv.integra.repository.IntegraLoginRepository;
import com.upv.integra.repository.InternacaoRepository;
import com.upv.integra.repository.MedicamentoRepository;
import com.upv.integra.repository.ReceitaRepository;
import com.upv.integra.repository.RoleRepository;
import com.upv.integra.repository.associados.DesligamentoRepository;
import com.upv.integra.repository.associados.EntradaRepository;
import com.upv.integra.repository.associados.DoadoRepository;
import com.upv.integra.repository.associados.RecebidoRepository;
import com.upv.integra.repository.imp.AcompanhamentoRepositoryImp;
import com.upv.integra.repository.imp.AssociadoRepositoryImp;
import com.upv.integra.repository.imp.FuncionarioRepositoryImp;
import com.upv.integra.repository.imp.PacienteRepositoryImp;
import com.upv.integra.repository.imp.PessoaRepositoryImp;
import com.upv.integra.security.InterfaceAuthenticationFacade;
import com.upv.integra.security.jwt.resources.JwtUserDetailsDTO;

@Service
public class PacienteService {	

	@Autowired AssociadoRepositoryImp associadoRepositoryImp;
	@Autowired DoadoRepository doadoRepository;
	@Autowired RecebidoRepository recebidoRepository;
	@Autowired EntradaRepository entradaRepository;
	@Autowired DesligamentoRepository desligamentoRepository;
	@Autowired AcompanhamentoRepositoryImp acompanhamentoRepositoryImp;
	@Autowired PacienteRepositoryImp pacienteRepositoryImp;
	@Autowired FuncionarioRepositoryImp funcionarioRepositoryImp;
	@Autowired InternacaoRepository internacaoRepository;
	@Autowired ConsultaRepository consultaRepository;
	@Autowired ReceitaRepository receitaRepository;
	@Autowired MedicamentoRepository medicamentoRepository;
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

	private static final Logger logger = LoggerFactory.getLogger(PacienteService.class);

	public PacienteDTO savePaciente(PacienteDTO pacienteDTO) throws BusinessException {
		try {
			Paciente paciente = convertDtoToPaciente(pacienteDTO);
			if(paciente.getId() == null) {
				logger.info("getId == null");
				paciente.getPessoa().setDateRegister(new Date());
				paciente.setDataCadastro(new Date());
				if(paciente.getPessoa() != null && paciente.getPessoa().getCpf() != null) {
					logger.info("getCpf != null");
					String cpf = paciente.getPessoa().getCpf();
					List<Paciente> retornos2 = pacienteRepositoryImp.getByCpf(cpf);
					if(retornos2.size() > 1) {
						logger.error("paciente com esse CPF já existe na base de dados");
						throw new BusinessException("paciente com esse CPF já existe na base de dados", Constants.EmailIsInTheBank );
					}else if(!retornos2.isEmpty()) {
						logger.error("paciente.getPessoa().setDadosCadastrais");						
						//paciente.setPessoa(retornos2.get(0).getPessoa());
					}
				}else {
					logger.error("Campo Email vazio ou nulo");
					throw new BusinessException("Campo Email vazio ou nulo", Constants.EmailFieldEmptyOrNull );
				}
				if(paciente.getPessoa().getDadosCadastrais() != null && paciente.getPessoa().getDadosCadastrais().getEmail() != null) {
					logger.info("getDadosCadastrais != null");
					String email = paciente.getPessoa().getDadosCadastrais().getEmail();
					List<Paciente> retornos2 = pacienteRepositoryImp.getByEmail(email);
					if(retornos2.size() > 1) {
						logger.error("Apoiador com esse Email já existe na base de dados");
						throw new BusinessException("Apoiador com esse Email já existe na base de dados", Constants.EmailIsInTheBank );
					}else if(!retornos2.isEmpty()) {
						logger.error("paciente.getPessoa().setDadosCadastrais");						
						//paciente.setPessoa(retornos2.get(0).getPessoa());
					}
				}else {
					logger.error("Campo Email vazio ou nulo");
					throw new BusinessException("Campo Email vazio ou nulo", Constants.EmailFieldEmptyOrNull );
				}
			}else if(paciente.getId() != null && paciente.getPessoa() != null && paciente.getPessoa().getDadosCadastrais() != null) {
				logger.info("IDs != null");
			}
			if(paciente.getPessoa().getNome()==null){
				logger.error("Campo Nome Completo Vazio ou Nulo");
				throw new BusinessException("Campo Nome Completo Vazio ou Nulo ", Constants.EmptyorNullName );
			}
//			if(!paciente.getPessoa().getCpf().isEmpty() && 
//					!utilService.verifyCPF(apoiador.getPessoa().getCpf()) && 
//					paciente.getPessoa().getId() == null) {
//				logger.error("CPF Já cadastrado");
//				throw new BusinessException("CPF já cadastrado", Constants.CPFUsed);
//			}
			Funcionario funcionario = funcionarioRepositoryImp.getById(pacienteDTO.getFuncId());
			if(funcionario!=null) {
				paciente.setCadastradoPor(funcionario);				
			}else {
				logger.error("Funcionario Nulo");
				throw new BusinessException("Funcionario Nulo ", Constants.NonFunc );
			}
			logger.info("contactsRepository save");
			paciente.getPessoa().setDadosCadastrais(contactsRepository.save(paciente.getPessoa().getDadosCadastrais()));	
			logger.info("personRepositoryImp save");
			paciente.setPessoa(personRepositoryImp.save(paciente.getPessoa()));
							
			logger.info("pacienteRepositoryImp save");
//			logger.info(apoiador.toString());
			paciente = pacienteRepositoryImp.save(paciente);
/*			
			logger.info("getAtendimentosADDED");
			if(!funcionario.getAtendimentos().contains(atendimento)) {
				funcionario.getAtendimentos().add(atendimento);
			}
*/
			logger.info("PacienteCreated");
			PacienteDTO retorno = new PacienteDTO(paciente);
			retorno.setFuncId(paciente.getCadastradoPor().getId());
			retorno.setFuncNome(paciente.getCadastradoPor().getPessoa().getNome());
			return retorno;
			
		} catch (BusinessException e) {
			throw new BusinessException(e.getMessage(), e.getCode());
		}
	}
	
	public AcompanhamentoDTO saveAcompanhamento(AcompanhamentoDTO acompanhamentoDTO) throws BusinessException {
		try {
			Acompanhamento acompanhamento = convertDtoToAcomp(acompanhamentoDTO);
			if(acompanhamento.getDt_atendimento()==null){
				logger.error("Dt_atendimento Vazio ou Nulo");
				throw new BusinessException("Dt_atendimento Vazio ou Nulo ", Constants.EmptyorNullName );
			}
			if(acompanhamento.getTipoAcomp()==null){
				logger.error("TipoAcomp Vazio ou Nulo");
				throw new BusinessException("TipoAcomp Vazio ou Nulo ", Constants.EmptyorNullName );
			}
			Funcionario busca = funcionarioRepositoryImp.getById(acompanhamentoDTO.getFuncId());
			if(busca!=null) {
				acompanhamento.setCadastradoPor(busca);				
			}else {
				logger.error("Funcionario Nulo");
				throw new BusinessException("Funcionario Nulo ", Constants.NonFunc );
			}
			Paciente busca2 = pacienteRepositoryImp.getById(acompanhamentoDTO.getPaciId());
			if(busca2!=null) {
				acompanhamento.setPaciente(busca2);				
			}else {
				logger.error("Paciente Nulo");
				throw new BusinessException("Paciente Nulo ", Constants.NonFunc );
			}
			if(acompanhamento.getReceita()!=null) {
				if(acompanhamentoDTO.getReceita().getMedicamentos()!=null){
					try {
						Set<Medicamento> medList = new HashSet<Medicamento>();
						acompanhamentoDTO.getReceita().getMedicamentos().forEach(med -> {
							Medicamento medicamento =  medicamentoRepository.findByNome(med.getNome());
							if(medicamento != null) {
								logger.info("medicamento != null");
								medList.add(medicamento);
							}else {
								Medicamento newMed = new Medicamento();
								newMed.setNome(med.getNome());
								logger.info("medicamentoRepository");
								medicamentoRepository.save(newMed);
								medList.add(medicamentoRepository.findByNome(newMed.getNome()));
							}					
						});
						acompanhamento.getReceita().setMedicamentos(medList);
					}catch (BusinessException e) {
						logger.error("Erro nos medicamentos");
						throw new BusinessException(e.getMessage(), e.getCode());
					}
				}
				//acompanhamento.setReceita(receitaRepository.save(acompanhamento.getReceita()));
			}
			if(acompanhamento.getConsulta()!=null) {
				if(acompanhamento.getConsulta().getConsultaMedico()==null){
					logger.error("Medico da Consulta Nulo");
					throw new BusinessException("Medico da Consulta Nulo", Constants.NonFunc );
				}
				if(acompanhamento.getConsulta().getConsultaMedicoEspec()==null){
					logger.error("Especialidade do Medico da Consulta Nulo");
					throw new BusinessException("Especialidade do Medico da Consulta Nulo", Constants.NonFunc );
				}
				//acompanhamento.setConsulta(consultaRepository.save(acompanhamento.getConsulta()));
			}
			if(acompanhamento.getInternacao()!=null) {
/*				
				if(acompanhamento.getConsulta().getConsultaMedico()==null){
					logger.error("Medico da Consulta Nulo");
					throw new BusinessException("Medico da Consulta Nulo", Constants.NonFunc );
				}
				if(acompanhamento.getConsulta().getConsultaMedicoEspec()==null){
					logger.error("Especialidade do Medico da Consulta Nulo");
					throw new BusinessException("Especialidade do Medico da Consulta Nulo", Constants.NonFunc );
				}
*/				
				//acompanhamento.setInternacao(internacaoRepository.save(acompanhamento.getInternacao()));
			}
			
			
			logger.info("acompanhamentoRepositoryImp save");
			logger.info(acompanhamento.toString());
			acompanhamento = acompanhamentoRepositoryImp.save(acompanhamento);			

			
			logger.info("AcompanhamentoDTO");
			AcompanhamentoDTO newComp = new AcompanhamentoDTO(acompanhamento);
			logger.info(newComp.toString());
			return newComp;
			
		} catch (BusinessException e) {
			throw new BusinessException(e.getMessage(), e.getCode());
		}
	}
	
	public AssociadoDTO saveAssociado(AssociadoDTO associadoDTO) throws BusinessException {
		try {
			Associado associado = convertDtoToAssociado(associadoDTO);
			if(associado.getTipoAssoc()==null){
				logger.error("TipoAssociado Vazio ou Nulo");
				throw new BusinessException("TipoAssociado Vazio ou Nulo ", Constants.EmptyorNullName );
			}
			Funcionario busca = funcionarioRepositoryImp.getById(associadoDTO.getFuncId());
			if(busca!=null) {
				associado.setCadastradoPor(busca);				
			}else {
				logger.error("Funcionario Nulo");
				throw new BusinessException("Funcionario Nulo ", Constants.NonFunc );
			}
			Paciente busca2 = pacienteRepositoryImp.getById(associadoDTO.getPaciId());
			if(busca2!=null) {
				associado.setPaciente(busca2);				
			}else {
				logger.error("Paciente Nulo");
				throw new BusinessException("Paciente Nulo ", Constants.NonFunc );
			}
			if(associado.getDoado()!=null) {
				if(associado.getDoado().getDt_doacao()==null){
					logger.error("Data Nulo");
					throw new BusinessException("DataN Nulo", Constants.NonFunc );
				}
				if(associado.getDoado().getMetodo()==null){
					logger.error("Metodo Nulo");
					throw new BusinessException("EMetodo Nulo", Constants.NonFunc );
				}
				if(associado.getDoado().getValor()==null){
					logger.error("Valor Nulo");
					throw new BusinessException("Valor Nulo", Constants.NonFunc );
				}
				//associado.setDoado(doadoRepository.save(associado.getDoado()));
			}
			if(associado.getRecebido()!=null) {
				if(associado.getRecebido().getDt_recebido()==null){
					logger.error("Dt_recebido Nulo");
					throw new BusinessException("Dt_recebido Nulo", Constants.NonFunc );
				}
				if(associado.getRecebido().getQuant()==null){
					logger.error("Quantidade Nulo");
					throw new BusinessException("EQuantidade Nulo", Constants.NonFunc );
				}
				if(associado.getRecebido().getTipo()==null){
					logger.error("Tipo Nulo");
					throw new BusinessException("Tipo Nulo", Constants.NonFunc );
				}
				//associado.setRecebido(recebidoRepository.save(associado.getRecebido()));
			}
			if(associado.getEntrada()!=null) {
				if(associado.getEntrada().getDt_entrada()==null){
					logger.error("Dt_entrada Nulo");
					throw new BusinessException("Dt_entrada Nulo", Constants.NonFunc );
				}
				if(associado.getEntrada().getQuant()==null){
					logger.error("Quantidade Nulo");
					throw new BusinessException("EQuantidade Nulo", Constants.NonFunc );
				}
				if(associado.getEntrada().getTipo()==null){
					logger.error("Tipo Nulo");
					throw new BusinessException("Tipo Nulo", Constants.NonFunc );
				}
				//associado.setEntrada(entradaRepository.save(associado.getEntrada()));
			}
			if(associado.getDesligamento()!=null) {
				if(associado.getDesligamento().getDt_deslig()==null){
					logger.error("Dt_deslig Nulo");
					throw new BusinessException("Dt_deslig Nulo", Constants.NonFunc );
				}
				if(associado.getDesligamento().getMotivo()==null){
					logger.error("Motivo Nulo");
					throw new BusinessException("Motivo Nulo", Constants.NonFunc );
				}
				//associado.setDesligamento(desligamentoRepository.save(associado.getDesligamento()));
			}
			logger.info("acompanhamentoRepositoryImp save");
			logger.info(associado.toString());
			associado = associadoRepositoryImp.save(associado);			

			
			logger.info("AcompanhamentoDTO");
			AssociadoDTO newAssociado = new AssociadoDTO(associado);
			logger.info(newAssociado.toString());
			return newAssociado;
			
		} catch (BusinessException e) {
			throw new BusinessException(e.getMessage(), e.getCode());
		}
	}

	public List<PacienteDTO> listPacientes(Boolean bool){
		List<Paciente> la =  pacienteRepositoryImp.findAllByDesligado(bool);
		List<PacienteDTO> dtoList = new ArrayList<PacienteDTO>();
		la.forEach(obj -> {
			dtoList.add(new PacienteDTO(obj));
		});
		return dtoList;
	}
	
	public List<AcompanhamentoDTO> listAllAcompanhamentos(){
		List<Acompanhamento> la =  acompanhamentoRepositoryImp.findAll();
		List<AcompanhamentoDTO> dtoList = new ArrayList<AcompanhamentoDTO>();
		la.forEach(obj -> {
			dtoList.add(new AcompanhamentoDTO(obj));
		});
		return dtoList;
	}
	
	public List<AssociadoDTO> listAllAssociados(){
		List<Associado> la =  associadoRepositoryImp.findAll();
		List<AssociadoDTO> dtoList = new ArrayList<AssociadoDTO>();
		la.forEach(obj -> {
			dtoList.add(new AssociadoDTO(obj));
		});
		return dtoList;
	}
	
	public List<PacienteDTO> listPacientesBySameAssoc(Boolean bool){
		Authentication auth = autenticationFacede.getAuthentication();
		JwtUserDetailsDTO membro = (JwtUserDetailsDTO) auth.getDetails();
		
		List<Paciente> la =  pacienteRepositoryImp.findAllByDesligadoAndSameAssoc(bool, membro.getAssocId());
		List<PacienteDTO> dtoList = new ArrayList<PacienteDTO>();
		la.forEach(obj -> {
			dtoList.add(new PacienteDTO(obj));
		});
		return dtoList;
	}

	public PacienteDTO updatePaciente(PacienteDTO dto) {
		Optional<Paciente> obj = pacienteRepositoryImp.findOneById(dto.getId());
		if(obj!=null) {
			logger.info("updatePaciente");
			return savePaciente(dto);
		}else {
			throw new BusinessException("Paciente não encontrado", Constants.FuncNotFound);
		}
	}
	
	public AcompanhamentoDTO updateAcompanhamento(AcompanhamentoDTO dto) {			
		Optional<Acompanhamento> obj = acompanhamentoRepositoryImp.findOneById(dto.getId());
		if(obj!=null) {
			logger.info("updateAcompanhamento");
			return saveAcompanhamento(dto);
		}else {
			throw new BusinessException("Acompanhamento não encontrado", Constants.FuncNotFound);
		}
	}
	
	public AssociadoDTO updateAssociado(AssociadoDTO dto) {			
		Optional<Associado> obj = associadoRepositoryImp.findOneById(dto.getId());
		if(obj!=null) {
			logger.info("updateAssociado");
			return saveAssociado(dto);
		}else {
			throw new BusinessException("Associado não encontrado", Constants.FuncNotFound);
		}
	}

	public String deletePaciente(Long id) {
		Paciente obj = pacienteRepositoryImp.getById(id);
		if(obj != null) {			
			pacienteRepositoryImp.delete(obj);
			
			Pessoa person = personRepositoryImp.getById(obj.getPessoa().getId());
			if(person!=null) {
				personRepositoryImp.deletePerson(person);
			}			

			return "Excluído com Sucesso";
		}else {
			return "Erro ao Excluir Funcionario";
		}
	}
	
	public String deleteAcompanhamento(Long id) {
		logger.info("deleteAcompanhamento: "+id.toString());
		Acompanhamento obj = acompanhamentoRepositoryImp.getById(id);
		if(obj != null) {
			acompanhamentoRepositoryImp.delete(obj);
			return "Excluído com Sucesso";
		}else {
			return "Erro ao Excluir Funcionario";
		}
	}
	
	public String deleteAssociado(Long id) {
		Associado obj = associadoRepositoryImp.getById(id);
		if(obj != null) {
			associadoRepositoryImp.delete(obj);
			return "Excluído com Sucesso";
		}else {
			return "Erro ao Excluir Funcionario";
		}
	}

	public PacienteDTO findPaciente(Long id) {		
		Optional<Paciente> p = pacienteRepositoryImp.findOneById(id);
		if(p.isPresent()) {
			PacienteDTO retorno = new PacienteDTO(p.get());
			retorno.setFuncId(p.get().getCadastradoPor().getId());
			retorno.setFuncNome(p.get().getCadastradoPor().getPessoa().getNome());
			return retorno;
		}
		return null;
	}
	
	public List<AcompanhamentoDTO> findAcompanhamentos(Long id) {
		List<Acompanhamento> lp =  acompanhamentoRepositoryImp.findAllByPacienteId(id);
		List<AcompanhamentoDTO> dtoList = new ArrayList<AcompanhamentoDTO>();
		lp.forEach(obj -> {
			dtoList.add(new AcompanhamentoDTO(obj));
		});
		return dtoList;
	}
	public List<AcompanhamentoDTO> findAcompanhamentosByType(Long id,String name) {
		TipoAcompanhamento tipo = TipoAcompanhamentoContainsString(name);		
		if(tipo!=null) {
			List<Acompanhamento> lp =  acompanhamentoRepositoryImp.findByPacienteIdAndType(id, tipo);
			List<AcompanhamentoDTO> dtoList = new ArrayList<AcompanhamentoDTO>();
			lp.forEach(obj -> {
				dtoList.add(new AcompanhamentoDTO(obj));
			});
			return dtoList;
		}else {
			logger.error("TipoAcompanhamento não encontrado");
			throw new BusinessException("TipoAcompanhamento não encontrado", Constants.PersonNotExist );
		}		
	}
	
	public TipoAcompanhamento TipoAcompanhamentoContainsString(String test) {

	    for (TipoAcompanhamento c : TipoAcompanhamento.values()) {
	        if (c.name().equals(test)) {
	            return c;
	        }
	    }
	    return null;
	}
	
	public List<AssociadoDTO> findAssociados(Long id) {
		List<Associado> lp =  associadoRepositoryImp.findAllByPacienteId(id);
		List<AssociadoDTO> dtoList = new ArrayList<AssociadoDTO>();
		lp.forEach(obj -> {
			dtoList.add(new AssociadoDTO(obj));
		});
		return dtoList;
	}
	public List<AssociadoDTO> findAssociadosByType(Long id,String name) {
		TipoAssociado tipo = TipoAssociadoContainsString(name);		
		if(tipo!=null) {
			List<Associado> lp =  associadoRepositoryImp.findByPacienteIdAndType(id, tipo);
			List<AssociadoDTO> dtoList = new ArrayList<AssociadoDTO>();
			lp.forEach(obj -> {
				dtoList.add(new AssociadoDTO(obj));
			});
			return dtoList;
		}else {
			logger.error("TipoAssociado não encontrado");
			throw new BusinessException("TipoAssociado não encontrado", Constants.PersonNotExist );
		}		
	}
	
	public TipoAssociado TipoAssociadoContainsString(String test) {

	    for (TipoAssociado c : TipoAssociado.values()) {
	        if (c.name().equals(test)) {
	            return c;
	        }
	    }
	    return null;
	}
	
	public Paciente convertDtoToPaciente(PacienteDTO dto) {
		logger.info("Converte Paciente DTO em Paciente");
		Paciente retorno = new Paciente();
		retorno.setId(dto.getId());
		retorno.setPessoa(dto.getPessoa());
		retorno.setDataAfiliacao(dto.getDataAfiliacao());
		retorno.setDataCadastro(dto.getDataCadastro());
		retorno.setComoChegou(dto.getComoChegou());
		retorno.setCns(dto.getCns());
		retorno.setObitoData(dto.getObitoData());
		retorno.setObitoMotivo(dto.getObitoMotivo());
		retorno.setLastUpdate(new Date());
		retorno.setMoraCom(dto.getMoraCom());
		retorno.setMoraPais(dto.getMoraPais());
		retorno.setMoraQts(dto.getMoraQts());
		retorno.setRenda(dto.getRenda());
		retorno.setBeneficio(dto.getBeneficio());
		retorno.setDt_diag(dto.getDt_diag());
		retorno.setCentroTratamento(dto.getCentroTratamento());
		retorno.setDiagMedico(dto.getDiagMedico());
		retorno.setDiagMedicoEspec(dto.getDiagMedicoEspec());
		retorno.setDt_pezinho(dto.getDt_pezinho());
		retorno.setDt_suor(dto.getDt_suor());
		retorno.setLocalSuor(dto.getLocalSuor());
		retorno.setValorSuor(dto.getValorSuor());
		retorno.setDesligamento(dto.getDesligamento());
		retorno.setDt_testGen(dto.getDt_testGen());
		retorno.setTipoAlelos(dto.getTipoAlelos());
		retorno.setMutacoes(dto.getMutacoes());
		retorno.setManifestacoes(dto.getManifestacoes());
		retorno.setDt_transplante(dto.getDt_transplante());
		retorno.setOrgao(dto.getOrgao());
		retorno.setHospital(dto.getHospital());
		retorno.setTransplantMedico(dto.getTransplantMedico());
		retorno.setContatoEmerg(dto.getContatoEmerg());
		retorno.setFalarCom(dto.getFalarCom());
		retorno.setLaudo(dto.getLaudo());
		retorno.setEstadoCivil(dto.getEstadoCivil());
		retorno.setAlelos(dto.getAlelos());
		retorno.setMutacoes2(dto.getMutacoes2());
		retorno.setDesligado(dto.getDesligado());
		retorno.setObsDesligamento(dto.getObsDesligamento());
		
		if(retorno.getId() == null || retorno.getId() == 0) {
			retorno.setId(null);
		}
		return retorno;
	}
	
	public Acompanhamento convertDtoToAcomp(AcompanhamentoDTO dto) {
		logger.info("Converte DTO em Acompanhamento");
		Acompanhamento retorno = new Acompanhamento();
		retorno.setId(dto.getId());
		TipoAcompanhamento tipo = TipoAcompanhamentoContainsString(dto.getTipoAcomp());
		retorno.setFuncNome(dto.getFuncNome());
		retorno.setTipoAcomp(tipo);
		retorno.setDt_atendimento(dto.getDt_atendimento());
		retorno.setObs(dto.getObs());
		retorno.setReceita(dto.getReceita());
		retorno.setInternacao(dto.getInternacao());
		retorno.setConsulta(dto.getConsulta());
		if(retorno.getId() == null || retorno.getId() == 0) {
			retorno.setId(null);
		}
		retorno.setLastUpdate(new Date());
		return retorno;
	}
	
	public Associado convertDtoToAssociado(AssociadoDTO dto) {
		logger.info("Converte DTO em Associado");
		Associado retorno = new Associado();
		retorno.setId(dto.getId());
		retorno.setFuncNome(dto.getFuncNome());
		retorno.setTipoAssoc(dto.getTipoAssoc());
		retorno.setDoado(dto.getDoado());
		retorno.setRecebido(dto.getRecebido());
		retorno.setEntrada(dto.getEntrada());
		retorno.setDesligamento(dto.getDesligamento());
		if(retorno.getId() == null || retorno.getId() == 0) {
			retorno.setId(null);
		}
		retorno.setLastUpdate(new Date());
		return retorno;
	}
}
