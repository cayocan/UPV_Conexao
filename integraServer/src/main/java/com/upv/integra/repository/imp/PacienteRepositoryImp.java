package com.upv.integra.repository.imp;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.upv.integra.model.Funcionario;
import com.upv.integra.model.Paciente;
import com.upv.integra.repository.PacienteRepository;

@Repository
public class PacienteRepositoryImp{

	@Autowired PacienteRepository pacienteRepository;
	
	public List<Paciente> findAll(){
		return pacienteRepository.findAll();
	}
	public List<Paciente> findAllByDesligado(Boolean bool){
		return pacienteRepository.findAllByDesligado(bool);
	}
	public List<Paciente> findAllByDesligadoAndSameAssoc(Boolean bool, Long assocId){
		List<Paciente> retorno = pacienteRepository.findAllByDesligadoAndSameAssoc(bool, assocId);
//		logger.info("RETORNO: "+retorno.toString());
		return retorno;
	}
	public Paciente save(Paciente atendimento) {
		return pacienteRepository.save(atendimento);
	}
	public Optional<Paciente> findOneById(Long id) {
		return pacienteRepository.findById(id);
	}
	public Paciente getById(Long Id) {
		return pacienteRepository.findById(Id).get();
	}
	public List<Paciente> getByEmail(String email) {
		List<Paciente> la = findAll();
		List<Paciente> fl = new ArrayList<Paciente>();
		la.forEach(apoia -> {
			if(apoia.getPessoa().getDadosCadastrais().getEmail().equals(email)) {
				fl.add(apoia);
			}
		});
		return fl;		
	}
	public List<Paciente> getByCpf(String cpf) {
		List<Paciente> la = findAll();
		List<Paciente> fl = new ArrayList<Paciente>();
		la.forEach(apoia -> {
			if(apoia.getPessoa().getCpf() == cpf) {
				fl.add(apoia);
			}
		});
		return fl;		
	}
	public void delete(Paciente obj) {
		pacienteRepository.delete(obj);
	}
	public List<Paciente> saveAll(List<Paciente> obj) {
		return pacienteRepository.saveAll(obj);		
	}	
	public Long countPaci() {
		return pacienteRepository.countByDesligado(false);
	}
	public Long countPaciObito() {
		return pacienteRepository.countByDesligamento("Óbito");
	}
	
}

