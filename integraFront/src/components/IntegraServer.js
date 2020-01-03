import axios from 'axios'
import jwtDecode  from 'jwt-decode'
import { API_URL } from '../constants/ConstantCLass'

export const USER_SESSION_ATTRIBUTE_TOKEN = 'authenticatedUser'
const instanceAxios = axios.create();

class IntegraServer{    

    executeJwtAuthenticationService(username, password) {
        return axios.post(`${API_URL}/auth`, {
            username,
            password
        })
    }
//#region Associação

    executeGetAssoc() {
        this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
        return axios.get(`${API_URL}/assoc`)
    }
    executeGetAssocByIdFromPath(path) {
        let id = path.split("/").pop();
        this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
        return axios.get(`${API_URL}/assoc/${id}`)
    }
    executeGetAssocById(id) {
        this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
        return axios.get(`${API_URL}/assoc/${id}`)
    }
    executeCreateAssoc(values,certificacoes) {
        console.log(values);
        let postBody={
            //"id":values.assocId,
            "certificacoes": certificacoes,
            "cnpj": values.cnpj,
            "contact": {
            //"id":values.dcId,
              "bairro": values.bairro,
              "cep": values.cep,
              "cidade": values.cidade,
              "complemento": values.complemento,
              "email": values.email,
              "email2":values.email2,
              "endereco": values.endereco,
              "numero": values.numero,
              "estado": values.estado,
              "facebookAcount": values.facebookAcount,
              "instagramAcount": values.instagramAcount,
              "telefone": values.telefone,
              "telefone2": values.telefone2,
              "twitterAcount": values.twitterAcount
            },
            "dataFund": values.dataFund,
            "mandatoFim": values.mandatoFim,
            "mandatoIni": values.mandatoIni,
            "missao": values.missao,
            "name": values.name,
            // "password": "string",
            "presidente": values.presidente,
            "sigla": values.sigla,
            "site": values.site,
            "outrasCertificacoes":values.outrasCertificacoes
          }
        this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
        console.log(postBody);
        return axios.post(`${API_URL}/assoc`, postBody)
    }

    executeUpdateAssoc(values,certificacoes) {
        console.log(values);
        let postBody={
            "id":values.assocId,
            "certificacoes": certificacoes,
            "cnpj": values.cnpj,
            "contact": {
                "id":values.dcId,
              "bairro": values.bairro,
              "cep": values.cep,
              "cidade": values.cidade,
              "complemento": values.complemento,
              "email": values.email,
              "email2":values.email2,
              "endereco": values.endereco,
              "numero": values.numero,
              "estado": values.estado,
              "facebookAcount": values.facebookAcount,
              "instagramAcount": values.instagramAcount,
              "telefone": values.telefone,
              "telefone2": values.telefone2,
              "twitterAcount": values.twitterAcount
            },
            "dataFund": values.dataFund,
            "mandatoFim": values.mandatoFim,
            "mandatoIni": values.mandatoIni,
            "missao": values.missao,
            "name": values.name,
            // "password": "string",
            "presidente": values.presidente,
            "sigla": values.sigla,
            "site": values.site,
            "outrasCertificacoes":values.outrasCertificacoes
          }
        this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
        console.log(postBody);
        return axios.put(`${API_URL}/assoc`, postBody)
    }

    executeGetCerficados() {
        this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
        return axios.get(`${API_URL}/assoc/cert`)
    }
//#endregion

//#region Apoiador

//pegando apoiador
executeGetApoiaByIdFromPath(path) {
    let id = path.split("/").pop();
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    return axios.get(`${API_URL}/apoia/${id}`)
}

executeGetApoiaCont(path) {
    let id = path.split("/").pop();
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    return axios.get(`${API_URL}/apoia/${id}/contatos`)
}

//pegando contato pela aba de contato
executeGetAllContByApoiaIdFromPath(path) {
    let id = path.split("/").slice(-2)[0];
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    return axios.get(`${API_URL}/apoia/${id}/contatos`)
}
//#endregion

//#region Contato

executeGetContatoById(path) {
    let id = path.split("/").slice(-2)[0];
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    return axios.get(`${API_URL}/apoia/${id}/contatos`)
}
executeGetContatoByOnlyId(id) {
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    return axios.get(`${API_URL}/apoia/${id}/contatos`)
}
executeCreateApoiaContato(values,props) {
    //console.log(props);
    let postBody={                 
        "dataContato": values.dataContato,
        "tema": values.tema,
        "obs": values.obs,
        "id": props.dados?props.dados.id:null,
        "apoiaId": props.apoiaId?props.apoiaId:props.dados.apoiaId,
        "funcNome": values.funcNome,
    }
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    //console.log(postBody);
    return axios.post(`${API_URL}/apoia/contato`, postBody)
}

//#endregion

//#region Doacao

executeGetDoacaoById(path) {
    let id = path.split("/").slice(-2)[0];
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    return axios.get(`${API_URL}/apoia/${id}/doacoes`)
}
executeGetDoacaoByOnlyId(id) {
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    return axios.get(`${API_URL}/apoia/${id}/doacoes`)
}
executeCreateApoiaDoacao(values,props) {
    //console.log(values);
    let postBody={        
            "apoiaId": props.apoiaId?props.apoiaId:props.dados.apoiaId,
            "id": props.dados?props.dados.id:null,            
            "valor": values.valor,            
            "forma": values.forma,
            "periodicidade": values.periodicidade,
            "funcNome":values.funcNome
      }
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    //console.log(postBody);
    return axios.post(`${API_URL}/apoia/doacao`, postBody)
}

//#endregion

//#region Paciente

executeGetPaci() {
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    return axios.get(`${API_URL}/paci`)
}
executeGetPaciSameAssoc() {
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    return axios.get(`${API_URL}/paci/list`)
}
executeGetPaciInactives() {
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    return axios.get(`${API_URL}/paci/inativos`)
}
executeGetPaciInactivesSameAssoc() {
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    return axios.get(`${API_URL}/paci/inativos/list`)
}
executeGetPaciByIdFromPath(path) {
    let id = path.split("/").pop();
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    return axios.get(`${API_URL}/paci/${id}`)
}
executeCreatePaciAcompPadrao(values,props) {
    //console.log(values);
    let postBody={
        "id":props.dados?props.dados.id:null,
        "paciId": props.paciId,
        "funcId": this.getCurrentUserDecoded().user.funcId,
        "dt_atendimento": values.dt_atendimento,          
        "funcNome": values.funcNome,
         "obs": values.obs,                    
         "tipoAcomp": props.parentState,
        //   "internacao": {
        //     "dt_Alta": "2019-12-11T21:27:05.687Z",
        //     "dt_Internacao": "2019-12-11T21:27:05.687Z",
        //     "hospital": "string",
        //     "id": 0,
        //     "interMedico": "string",
        //     "interMedicoEspec": "string",
        //     "intercorrenciaMedica": "string",
        //     "obs": "string"
        //   },          
        //   "receita": {
        //     "dt_ultTroca": "2019-12-11T21:27:05.687Z",
        //     "id": 0,
        //     "medicamentos": [
        //       {
        //         "id": 0,
        //         "nome": "string"
        //       }
        //     ],
        //     "modelo": "string",
        //     "nebulizador": true,
        //     "periodicidades": "string"
        //   },
        //   "consulta": {
        //     "consultaMedico": "string",
        //     "consultaMedicoEspec": "string",
        //   }
      }
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    //console.log(postBody);
    return axios.post(`${API_URL}/paci/acomp`, postBody)
}
executeCreatePaciAcompConsulta(values,props) {
    //console.log(values);
    let postBody={
        "id":props.dados?props.dados.id:null,
        "paciId": props.paciId,
        "funcId": this.getCurrentUserDecoded().user.funcId,
        "dt_atendimento": values.dt_atendimento,          
        "funcNome": values.funcNome,
        "obs": values.obs,                    
        "tipoAcomp": props.parentState,
        "consulta": {
        "id":props.dados?props.dados.consulta.id:null,
        "consultaMedico": values.consultaMedico,
        "consultaMedicoEspec": values.consultaMedicoEspec,
        }
      }
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    //console.log(postBody);
    return axios.post(`${API_URL}/paci/acomp`, postBody)
}
executeCreatePaciAcompInter(values,props) {
    //console.log(values);
    let postBody={
        "id":props.dados?props.dados.id:null,
        "paciId": props.paciId,
        "funcId": this.getCurrentUserDecoded().user.funcId,
        "dt_atendimento": values.dt_Internacao,          
        "funcNome": values.funcNome,
        "obs": values.obs,                    
        "tipoAcomp": props.parentState,
        "internacao": {
            "id":props.dados?props.dados.internacao.id:null,
            "dt_Alta": values.dt_Alta,
            "dt_Internacao": values.dt_Internacao,
            "hospital": values.hospital,
            "interMedico": values.interMedico,
            "interMedicoEspec": values.interMedicoEspec,
            "intercorrenciaMedica": values.intercorrenciaMedica,
            "obs": values.obs
        }
      }
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    //console.log(postBody);
    return axios.post(`${API_URL}/paci/acomp`, postBody)
}
executeCreatePaciAcompReceita(values,props,med) {
    //console.log(med);
    let postBody={
        "id":props.dados?props.dados.id:null,
        "paciId": props.paciId,
        "funcId": this.getCurrentUserDecoded().user.funcId,
        "dt_atendimento": values.dt_atendimento,          
        "funcNome": values.funcNome,
         "obs": values.obs,                    
         "tipoAcomp": props.parentState,             
          "receita": {
            "medicamentos": med,
            "id":props.dados?props.dados.receita.id:null,
            "dt_ultTroca": values.dt_ultTroca,
            "modelo": values.modelo,
            "nebulizador": values.nebulizador,
            "periodicidades": values.periodicidades
        }
      }
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    //console.log(postBody);
    return axios.post(`${API_URL}/paci/acomp`, postBody)
}

////////////////////////////////////
executeGetAllAcompByPaciId(id) {
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    return axios.get(`${API_URL}/paci/${id}/acomp`)
}
executeGetAllAcompByPaciIdFromPath(path) {
    let id = path.split("/").slice(-2)[0];
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    return axios.get(`${API_URL}/paci/${id}/acomp`)
}
executeGetAcompByPaciIdAndType(id,type) {
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    return axios.get(`${API_URL}/paci/${id}/acomp/${type}`)
}
////////////////////////////////////
executeGetAllAssocByPaciId(id) {
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    return axios.get(`${API_URL}/paci/${id}/associado`)
}
executeGetAllAssocByPaciIdFromPath(path) {
    let id = path.split("/").slice(-2)[0];
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    return axios.get(`${API_URL}/paci/${id}/associado`)
}
executeGetAssocByPaciIdAndType(id,type) {
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    return axios.get(`${API_URL}/paci/${id}/associado/${type}`)
}
/////////////////////////////////////
executeCreatePaciAssocDoado(values,props) {
    //console.log(values);
    let postBody={
            // "desligamento": {
            //   "dt_deslig": "2019-12-17T01:06:24.980Z",
            //   "id": 0,
            //   "motivo": "string"
            // },
                "doado": {
                "dt_doacao": values.dt_doacao,
                "id": props.dados?props.dados.doado.id:null,
                "metodo": values.metodo,
                "obs": values.obs,
                "valor": values.valor
                },
            // "entrada": {
            //   "dt_entrada": "2019-12-17T01:06:24.980Z",
            //   "id": 0,
            //   "obs": "string",
            //   "quant": "string",
            //   "tipo": "string"
            // },
            "funcId": this.getCurrentUserDecoded().user.funcId,
            "funcNome": values.funcNome,
            "id": props.dados?props.dados.id:null,
            "paciId": props.paciId,
            // "recebido": {
            //   "dt_recebido": "2019-12-17T01:06:24.980Z",
            //   "id": 0,
            //   "obs": "string",
            //   "quant": "string",
            //   "tipo": "string"
            // },
            "tipoAssoc": "Doado"
      }
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    //console.log(postBody);
    return axios.post(`${API_URL}/paci/associado`, postBody)
}

executeCreatePaciAssocRecebido(values,props) {
    //console.log(values);
    let postBody={
            // "desligamento": {
            //   "dt_deslig": "2019-12-17T01:06:24.980Z",
            //   "id": 0,
            //   "motivo": "string"
            // },
                // "doado": {
                // "dt_doacao": values.dt_doacao,
                // "id": props.dados?props.dados.doado.id:null,
                // "metodo": values.metodo,
                // "obs": values.obs,
                // "valor": values.valor
                // },
            // "entrada": {
            //   "dt_entrada": "2019-12-17T01:06:24.980Z",
            //   "id": 0,
            //   "obs": "string",
            //   "quant": "string",
            //   "tipo": "string"
            // },
            "funcId": this.getCurrentUserDecoded().user.funcId,
            "funcNome": values.funcNome,
            "id": props.dados?props.dados.id:null,
            "paciId": props.paciId,
            "recebido": {
              "dt_recebido": values.dt_recebido,
              "id": props.dados?props.dados.recebido.id:null,
              "obs": values.obs,
              "quant": values.quant,
              "tipo": values.tipo,
            },
            "tipoAssoc": "Recebido"
      }
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    //console.log(postBody);
    return axios.post(`${API_URL}/paci/associado`, postBody)
}

executeCreatePaciAssocEntrada(values,props) {
    //console.log(values);
    let postBody={
            // "desligamento": {
            //   "dt_deslig": "2019-12-17T01:06:24.980Z",
            //   "id": 0,
            //   "motivo": "string"
            // },
            // "doado": {
            // "dt_doacao": values.dt_doacao,
            // "id": props.dados?props.dados.doado.id:null,
            // "metodo": values.metodo,
            // "obs": values.obs,
            // "valor": values.valor
            // },
            "entrada": {
              "dt_entrada": values.dt_entrada,
              "id": props.dados?props.dados.entrada.id:null,
              "obs": values.obs,
              "quant": values.quant,
              "tipo": values.tipo
            },
            "funcId": this.getCurrentUserDecoded().user.funcId,
            "funcNome": values.funcNome,
            "id": props.dados?props.dados.id:null,
            "paciId": props.paciId,
            // "recebido": {
            //   "dt_recebido": values.dt_doacao,
            //   "id": props.dados?props.dados.recebido.id:null,
            //   "obs": values.obs,
            //   "quant": values.quant,
            //   "tipo": values.tipo,
            // },
            "tipoAssoc": "Entrada"
      }
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    //console.log(postBody);
    return axios.post(`${API_URL}/paci/associado`, postBody)
}

executeCreatePaciAssocDesligamento(values,props) {
    //console.log(values);
    let postBody={
            "desligamento": {
              "dt_deslig": values.dt_deslig,
              "id": props.dados?props.dados.desligamento.id:null,
              "motivo": values.motivo
            },
            // "doado": {
            // "dt_doacao": values.dt_doacao,
            // "id": props.dados?props.dados.doado.id:null,
            // "metodo": values.metodo,
            // "obs": values.obs,
            // "valor": values.valor
            // },
            // "entrada": {
            //   "dt_entrada": values.dt_entrada,
            //   "id": props.dados?props.dados.entrada.id:null,
            //   "obs": values.obs,
            //   "quant": values.quant,
            //   "tipo": values.tipo
            // },
            "funcId": this.getCurrentUserDecoded().user.funcId,
            "funcNome": values.funcNome,
            "id": props.dados?props.dados.id:null,
            "paciId": props.paciId,
            // "recebido": {
            //   "dt_recebido": values.dt_doacao,
            //   "id": props.dados?props.dados.recebido.id:null,
            //   "obs": values.obs,
            //   "quant": values.quant,
            //   "tipo": values.tipo,
            // },
            "tipoAssoc": "Desligamento"
      }
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    //console.log(postBody);
    return axios.post(`${API_URL}/paci/associado`, postBody)
}
/////////////////////////////////////
executeGetPaciById(id) {
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    return axios.get(`${API_URL}/paci/${id}`)
}
executeCreatePaci(values) {
    console.log(values);
    let postBody={
        'alelos': values.alelos,
        'beneficio': values.beneficio,
        'centroTratamento': values.centroTratamento,
        'cns': values.cns,
        'comoChegou': values.comoChegou,
        'contatoEmerg': values.contatoEmerg,
        'dataAfiliacao': values.dataAfiliacao,
        'dataCadastro': values.dataCadastro,
        'desligamento': values.desligamento,
        'obsDesligamento':values.obsDesligamento,
        'desligado': values.desligado,
        'diagMedico': values.diagMedico,
        'diagMedicoEspec': values.diagMedicoEspec,
        'dt_diag': values.dt_diag,
        'dt_pezinho': values.dt_pezinho,
        'dt_suor': values.dt_suor,
        'dt_testGen': values.dt_testGen,
        'dt_transplante': values.dt_transplante,
        'estadoCivil': values.estadoCivil,
        'falarCom': values.falarCom,        
        'funcId': this.getCurrentUserDecoded().user.funcId,
        'funcNome': values.funcNome,
        'hospital': values.hospital,
        //'id': values.paciId,
        'laudo': values.laudo,
        'localSuor': values.localSuor,
        'manifestacoes': values.manifestacoes,
        'moraCom': values.moraCom,
        'moraPais': values.moraPais,
        'moraQts': values.moraQts,
        'mutacoes': values.mutacoes,
        'mutacoes2': values.mutacoes2,
        'obitoData': values.obitoData,
        'obitoMotivo': values.obitoMotivo,
        'orgao': values.orgao,
        'renda': values.renda,
        'tipoAlelos': values.tipoAlelos,
        'transplantMedico': values.transplantMedico,
        'valorSuor': values.valorSuor,
        'pessoa':{
            'cpf': values.cpf,         
            'dataNascimento': values.dataNascimento,
            'dateRegister': values.dataCadastro,
            'enable': true,
            //'id': values.pessoaId,
            'nome': values.nome,
            'nomeMae': values.nomeMae,
            'nomePai': values.nomePai,
            'profissao': values.profissao,
            'rg': values.rg,
            'sexo': values.sexo,
            'situacaoDiagnostico': values.situacaoDiagnostico,
            'dadosCadastrais':{
                'bairro': values.bairro,
                'cep': values.cep,
                'cidade': values.cidade,
                'complemento': values.complemento,
                'email': values.email,
                'email2': values.email2,
                'endereco': values.endereco,
                'estado': values.estado,
                'facebookAcount': values.facebookAcount,
                //'id': values.dcId,
                'instagramAcount': values.instagramAcount,
                'numero': values.numero,
                'telefone': values.telefone,
                'telefone2': values.telefone2,
                'twitterAcount': values.twitterAcount,
            },
        },
      }
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    console.log(postBody);
    return axios.post(`${API_URL}/paci`, postBody)
}

executeUpdatePaci(values) {
    console.log(values);
    let postBody={
        'alelos': values.alelos,
        'beneficio': values.beneficio,
        'centroTratamento': values.centroTratamento,
        'cns': values.cns,
        'comoChegou': values.comoChegou,
        'contatoEmerg': values.contatoEmerg,
        'dataAfiliacao': values.dataAfiliacao,
        'dataCadastro': values.dataCadastro,
        'desligado': values.desligado,
        'desligamento': values.desligamento,
        'obsDesligamento':values.obsDesligamento,
        'diagMedico': values.diagMedico,
        'diagMedicoEspec': values.diagMedicoEspec,
        'dt_diag': values.dt_diag,
        'dt_pezinho': values.dt_pezinho,
        'dt_suor': values.dt_suor,
        'dt_testGen': values.dt_testGen,
        'dt_transplante': values.dt_transplante,
        'estadoCivil': values.estadoCivil,
        'falarCom': values.falarCom,        
        'funcId': this.getCurrentUserDecoded().user.funcId,
        'funcNome': values.funcNome,
        'hospital': values.hospital,
        'id': values.paciId,
        'laudo': values.laudo,
        'localSuor': values.localSuor,
        'manifestacoes': values.manifestacoes,
        'moraCom': values.moraCom,
        'moraPais': values.moraPais,
        'moraQts': values.moraQts,
        'mutacoes': values.mutacoes,
        'mutacoes2': values.mutacoes2,
        'obitoData': values.obitoData,
        'obitoMotivo': values.obitoMotivo,
        'orgao': values.orgao,
        'renda': values.renda,
        'tipoAlelos': values.tipoAlelos,
        'transplantMedico': values.transplantMedico,
        'valorSuor': values.valorSuor,
        'pessoa':{
            'cpf': values.cpf,         
            'dataNascimento': values.dataNascimento,
            'dateRegister': values.dataCadastro,
            'enable': true,
            'id': values.pessoaId,
            'nome': values.nome,
            'nomeMae': values.nomeMae,
            'nomePai': values.nomePai,
            'profissao': values.profissao,
            'rg': values.rg,
            'sexo': values.sexo,
            'situacaoDiagnostico': values.situacaoDiagnostico,
            'dadosCadastrais':{
                'bairro': values.bairro,
                'cep': values.cep,
                'cidade': values.cidade,
                'complemento': values.complemento,
                'email': values.email,
                'email2': values.email2,
                'endereco': values.endereco,
                'estado': values.estado,
                'facebookAcount': values.facebookAcount,
                'id': values.dcId,
                'instagramAcount': values.instagramAcount,
                'numero': values.numero,
                'telefone': values.telefone,
                'telefone2': values.telefone2,
                'twitterAcount': values.twitterAcount,
            },
        },
      }
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    console.log(postBody);
    return axios.put(`${API_URL}/paci`, postBody)
}

//#endregion

//#region Atendimento

executeGetAtendsByPersonFromPatch(path) {
    let id = path.split("/").pop();
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    return axios.get(`${API_URL}/atend/Pessoa/${id}`)
}
executeGetAtendsByPerson(id) {
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    return axios.get(`${API_URL}/atend/Pessoa/${id}`)
}
executeGetAtendUnique() {
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    return axios.get(`${API_URL}/atend`)
}
executeGetAtendByIdFromPath(path) {
    let id = path.split("/").pop();
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    return axios.get(`${API_URL}/atend/${id}`)
}
executeGetAtendById(id) {
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    return axios.get(`${API_URL}/atend/${id}`)
}
executeCreateAtend(values,props) {
    //console.log(values);
    //console.log(props);
    let postBody={
        "atendId": props.dados?props.dados.atendId:null,
        "funcId": this.getCurrentUserDecoded().user.funcId,
        "funcNome": values.funcNome,
        "comoChegou":  props.stateComo?props.stateComo:'Google',
        "dataAtendimento":  values.dataAtendimento,
        "demanda":  values.demanda,
        "tipo":  values.tipo,        
        "local":  values.local,
        "obs":  values.obs,
        "atualizar":props.dados?true:false,
        "pessoa": props.pessoaState?props.pessoaState:{
            "id": props.dados?props.dados.pessoa.id:null,
            "cpf": values.cpf,          
            "dataNascimento": values.dataNascimento,
            "dateRegister": values.dateRegister,
            "nome": values.nome,
            "nomeMae": values.nomeMae,
            "nomePai": values.nomePai,
            "profissao": values.profissao,
            "rg": values.rg,
            "sexo": values.sexo,
            "situacaoDiagnostico": values.situacaoDiagnostico,
            "dadosCadastrais": {
                "id": props.dados?props.dados.pessoa.dadosCadastrais.id:null,
                "bairro": values.bairro,
                "cep": values.cep,
                "cidade": values.cidade,
                "complemento": values.complemento,
                "email": values.email,
                "email2": values.email2,
                "endereco": values.endereco,
                "estado": values.estado,
                "facebookAcount": values.facebookAcount,            
                "instagramAcount": values.instagramAcount,
                "numero": values.numero,
                "telefone": values.telefone,
                "telefone2": values.telefone2,
                "twitterAcount": values.twitterAcount
            }
        }        
      }
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    console.log(postBody);
    return axios.post(`${API_URL}/atend`, postBody)
}

//#endregion

//#region Apoiador

executeGetApoia() {
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    return axios.get(`${API_URL}/apoia`)
}
executeGetApoiaSameAssoc() {
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    return axios.get(`${API_URL}/apoia/list`)
}
executeGetApoiaByIdFromPath(path) {
    let id = path.split("/").pop();
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    return axios.get(`${API_URL}/apoia/${id}`)
}
executeGetApoiaById(id) {
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    return axios.get(`${API_URL}/apoia/${id}`)
}
executeCreateApoia(values,props) {
    //console.log(values);
    //console.log(props);
    let postBody={
        "id": props.dados?props.dados.id:null,
        "funcId": this.getCurrentUserDecoded().user.funcId,
        "funcNome": values.funcNome,
        "tipoDoador":  values.tipoDoador,  
        "empresa":  values.empresa,
        "pessoa": props.pessoaState?props.pessoaState:{
            "id": props.dados?props.dados.pessoa.id:null,
            "cpf": values.cpf,          
            "dataNascimento": values.dataNascimento,
            "dateRegister": values.dateRegister,
            "nome": values.nome,
            "nomeMae": values.nomeMae,
            "nomePai": values.nomePai,
            "profissao": values.profissao,
            "rg": values.rg,
            "sexo": values.sexo,
            "situacaoDiagnostico": values.situacaoDiagnostico,
            "dadosCadastrais": {
                "id": props.dados?props.dados.pessoa.dadosCadastrais.id:null,
                "bairro": values.bairro,
                "cep": values.cep,
                "cidade": values.cidade,
                "complemento": values.complemento,
                "email": values.email,
                "email2": values.email2,
                "endereco": values.endereco,
                "estado": values.estado,
                "facebookAcount": values.facebookAcount,            
                "instagramAcount": values.instagramAcount,
                "numero": values.numero,
                "telefone": values.telefone,
                "telefone2": values.telefone2,
                "twitterAcount": values.twitterAcount
            }
        }        
      }
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    console.log(postBody);
    return axios.post(`${API_URL}/apoia`, postBody)
}

//#endregion

//#region Funcionario

executeGetFunc() {
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    return axios.get(`${API_URL}/func`)
}
executeGetFuncSameAssoc() {
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    return axios.get(`${API_URL}/func/list`)
}
executeGetFuncByIdFromPath(path) {
    let id = path.split("/").pop();
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    return axios.get(`${API_URL}/func/${id}`)
}
executeGetFuncById(id) {
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    return axios.get(`${API_URL}/func/${id}`)
}
executeCreateFunc(values,props) {
    //console.log(values);
    //console.log(props);
    let postBody={
        "funcId": props.dados?props.dados.funcId:null,
        "assocId": this.getCurrentUserDecoded().user.assocId,
        "cargo":  values.cargo,
      
        "pessoa": props.pessoaState?props.pessoaState:{
            "id": props.dados?props.dados.pessoa.id:null,
            "cpf": values.cpf,          
            "dataNascimento": values.dataNascimento,
            "dateRegister": values.dateRegister,
            "nome": values.nome,
            "nomeMae": values.nomeMae,
            "nomePai": values.nomePai,
            "profissao": values.profissao,
            "rg": values.rg,
            "sexo": values.sexo,
            "situacaoDiagnostico": values.situacaoDiagnostico,
            "dadosCadastrais": {
                "id": props.dados?props.dados.pessoa.dadosCadastrais.id:null,
                "bairro": values.bairro,
                "cep": values.cep,
                "cidade": values.cidade,
                "complemento": values.complemento,
                "email": values.email,
                "email2": values.email2,
                "endereco": values.endereco,
                "estado": values.estado,
                "facebookAcount": values.facebookAcount,            
                "instagramAcount": values.instagramAcount,
                "numero": values.numero,
                "telefone": values.telefone,
                "telefone2": values.telefone2,
                "twitterAcount": values.twitterAcount
            }
        }        
      }
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    console.log(postBody);
    return axios.post(`${API_URL}/func`, postBody)
}

executeUpdateFunc(values,certificacoes) {
    console.log(values);
    let postBody={
        "id":values.assocId,
        "certificacoes": certificacoes,
        "cnpj": values.cnpj,
        "contact": {
            "id":values.dcId,
          "bairro": values.bairro,
          "cep": values.cep,
          "cidade": values.cidade,
          "complemento": values.complemento,
          "email": values.email,
          "email2":values.email2,
          "endereco": values.endereco,
          "numero": values.numero,
          "estado": values.estado,
          "facebookAcount": values.facebookAcount,
          "instagramAcount": values.instagramAcount,
          "telefone": values.telefone,
          "telefone2": values.telefone2,
          "twitterAcount": values.twitterAcount
        },
        "dataFund": values.dataFund,
        "mandatoFim": values.mandatoFim,
        "mandatoIni": values.mandatoIni,
        "missao": values.missao,
        "name": values.name,
        // "password": "string",
        "presidente": values.presidente,
        "sigla": values.sigla,
        "site": values.site
      }
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    console.log(postBody);
    return axios.put(`${API_URL}/func`, postBody)
}

//#endregion

//#region Estatisticas
executeGetStats() {
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    return axios.get(`${API_URL}/stat`)
}

//#endregion

//#region CEP

 getCepData(cep){    
    return instanceAxios.get(`https://viacep.com.br/ws/${cep}/json`)
 }
 //#endregion   

//#region password
executeChangePassword(values) {
    //console.log('username on token: '+this.getCurrentUserDecoded().user.username);
    let postBody={
        "username": this.getCurrentUserDecoded().user.username,
        "password":values.novaSenha
      }
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    //console.log(postBody);
    return axios.post(`${API_URL}/user/changePassword`, postBody)
}

executeResetPassword(values) {
    let postBody={
        "username":values.email
      }
    this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN));
    //console.log(postBody);
    return axios.post(`${API_URL}/user/resetPassword`, postBody)
}
//#endregion

//#region AuthToken
    setupAxiosInterceptors() {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = this.getLoggedInUserToken()
                }
                return config
            }
        )
    }
    AuthHeader() {
        let config = null
        if (this.isUserLoggedIn()) {
            config = {headers: {'Authorization': this.getLoggedInUserToken()}}
        }        
        return config;
        // axios.interceptors.request.use(
        //     (config) => {
        //         if (this.isUserLoggedIn()) {
        //             config.headers.authorization = this.getLoggedInUserToken()
        //         }
        //         return config
        //     }
        // )
    }

    registerSuccessfulLoginForJwt(token) {     
        this.DecriptToken(token)   
        sessionStorage.setItem(USER_SESSION_ATTRIBUTE_TOKEN, this.createJWTToken(token))
        this.setupAxiosInterceptors(sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN))
    }

    getCurrentUserDecoded(){
        if (this.isUserLoggedIn()) {
            return this.DecriptToken(this.getLoggedInUserToken());            
        }
    }

    DecriptToken(token){
        return jwtDecode(token);
    }

    createJWTToken(token) {
        return 'Bearer ' + token
    }

    logout() {
        sessionStorage.removeItem(USER_SESSION_ATTRIBUTE_TOKEN);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN)
        if (user === null) return false
        return true
    }

    getLoggedInUserToken() {
        let user = sessionStorage.getItem(USER_SESSION_ATTRIBUTE_TOKEN)
        if (user === null) return ''
        return user
    }
//#endregion
}

export default new IntegraServer()