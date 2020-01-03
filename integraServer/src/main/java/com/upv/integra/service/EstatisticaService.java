package com.upv.integra.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.upv.integra.model.Paciente;
import com.upv.integra.model.dto.EstatisticasDTO;
import com.upv.integra.repository.imp.ApoiadorRepositoryImp;
import com.upv.integra.repository.imp.AssociacaoRepositoryImp;
import com.upv.integra.repository.imp.AtendimentoRepositoryImp;
import com.upv.integra.repository.imp.PacienteRepositoryImp;

@Service
public class EstatisticaService {

	@Autowired
	AssociacaoRepositoryImp associacaoRepositoryImp;
	@Autowired
	PacienteRepositoryImp pacienteRepositoryImp;
	@Autowired
	AtendimentoRepositoryImp atendimentoRepositoryImp;
	@Autowired
	AtendimentoService atendimentoService;
	@Autowired
	ApoiadorRepositoryImp apoiadorRepositoryImp;

	private static final Logger logger = LoggerFactory.getLogger(EstatisticaService.class);

	public EstatisticasDTO getEstats() {
		EstatisticasDTO retorno = new EstatisticasDTO(getNumberOfAssocs(), getNumberOfPacientesObitos(),
				getNumberOfPacientes(), getNumberOfDiags(), getNumberOfAtendsUnique(), getNumberOfApoias());
		logger.info(retorno.toString());
		return retorno;
	}

	public Long getNumberOfAssocs() {
		return associacaoRepositoryImp.countAssocs();
	}

	public Long getNumberOfPacientes() {
		return pacienteRepositoryImp.countPaci();
	}

	public Long getNumberOfPacientesObitos() {
		return pacienteRepositoryImp.countPaciObito();
	}

	public Long getNumberOfDiags() {
		List<Paciente> la = pacienteRepositoryImp.findAll();
		List<Paciente> fl = new ArrayList<Paciente>();
		la.forEach(apoia -> {
			if (apoia.getPessoa().getSituacaoDiagnostico() == true) {
				fl.add(apoia);
			}
		});

		return new Long(fl.size());
	}

	/*
	 * public Long getNumberOfAtends() { return
	 * atendimentoRepositoryImp.countAtends(); }
	 */

	public Long getNumberOfAtendsUnique() {
		return new Long(atendimentoService.listAtendimento().size());
	}

	public Long getNumberOfApoias() {
		return apoiadorRepositoryImp.countApoias();
	}
}
