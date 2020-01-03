import React,{Component} from 'react'
import * as ConstantStyles from '../../constants/ConstantStyles'
import * as ConstantCLass from '../../constants/ConstantCLass'
import * as ConstantMessages from '../../constants/ConstantMessages'
import IntegraServer from '../IntegraServer.js'
import HeaderComponentExport from '../utility/HeaderComponent'
import * as Util from '../utility/Util'

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';

import { ThemeProvider } from '@material-ui/styles';

import Paper from '@material-ui/core/Paper';
import PrintIcon from '@material-ui/icons/Print';

import { push } from 'connected-react-router'
import { connect } from 'react-redux';

import ReactExport from "react-data-export";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class DetalhesPaciente extends Component{
	constructor(props){
		super(props)
		//console.log(props);
		this.state = {
            serverResponse: []
        }
    }
    
	componentDidMount(){
		IntegraServer.executeGetPaciByIdFromPath(window.location.pathname)
			.then((response) => {				
				this.handleSucessfulResponse(response)
			}).catch((error) => this.handleError(error))				
	}

	handleSucessfulResponse = (response) =>{
		//console.log(response.data);
		this.setState({serverResponse:response.data})
		//console.log(this.state);
		//props.nav.push(`/assoc/`);
	}

	handleError = (error) => {
		console.log(error)
	}

    render(){
		return (
			<div>
				<HeaderComponentExport/>
				<DetalhesAssoc nav={this.props} state={this.state}/>
			</div>
		)		
	}
}

function DetalhesAssoc(props){
    const classes = ConstantStyles.useStyles();

    const clickVoltar=()=>{
		props.nav.push(`/paci`);
    }
	const createPaci = () => {
		props.nav.push(`/paci/create`);
	}

	const editPaci = (id) => {
		props.nav.push(`/paci/edit/${id}`);
	}

	const clickAcompanhamentos=()=>{
		props.nav.push(`/paci/${props.state.serverResponse.id}/acomp`);
    }
    const clickAssociados=()=>{
		props.nav.push(`/paci/${props.state.serverResponse.id}/associado`);
    }
	
	function multiDataSet(){
		let dados = [
			{
				columns: ["Id","Nome do Paciente","CPF", "RG","Email", "Email Alternativo", "Telefone", "Telefone Alternativo","Contato de Emergência","Fala Com","Data de Nascimento", 
					"Idade","Número do CNS","Sexo","Estado Civil","Nome da Mãe","Nome do Pai","Profissão","CEP","Cidade",
					"Estado","Endereço","Facebook","Instragram","Twitter","Data de Filiação","Data de Cadastro no Integra FC","Responsável pelo Cadastro","Como Chegou",
					"Situação do Diagnóstico","Laudo","Mora com Pais ou responsáveis","Com quem mora","Renda Familiar","Mora com quantos","Renda per capita","Benefícios que recebe",
					"Data do Diagnóstico","Centro de tratamento atual","Médico Responsável","Especialidade","Teste do pezinho","Teste do suor","Local do teste do suor",
					"Resultado do teste do suor","Data da realização do teste genético", "Tipo de Alelo","Mutação1","Mutação2","Manifestações clínicas comuns","Data de transplante", 
					"Orgão transplantado",	"Nome do médico que realizou o transplante","Hospital em que o transplante foi realizado","Desligado","Motivo do Desligamento",
					"Observações sobre o desligamento","Data do óbito","Motivo do óbito"],
				data: [
					[
						props.state.serverResponse.id, props.state.serverResponse.pessoa.nome, props.state.serverResponse.pessoa.cpf, props.state.serverResponse.pessoa.rg, 
						props.state.serverResponse.pessoa.dadosCadastrais.email,props.state.serverResponse.pessoa.dadosCadastrais.email2,
						props.state.serverResponse.pessoa.dadosCadastrais.telefone,props.state.serverResponse.pessoa.dadosCadastrais.telefone2, props.state.serverResponse.contatoEmerg, 
						props.state.serverResponse.falarCom, props.state.serverResponse.pessoa.dataNascimento, Util.calculate_age(props.state.serverResponse.pessoa.dataNascimento),
						props.state.serverResponse.cns,props.state.serverResponse.sexo,props.state.serverResponse.estadoCivil,props.state.serverResponse.nomeMae,
						props.state.serverResponse.nomePai,	props.state.serverResponse.pessoa.profissao, props.state.serverResponse.pessoa.dadosCadastrais.cep,	
						props.state.serverResponse.pessoa.dadosCadastrais.cidade, props.state.serverResponse.pessoa.dadosCadastrais.estado, 
						props.state.serverResponse.pessoa.dadosCadastrais.endereco+' '+props.state.serverResponse.pessoa.dadosCadastrais.numero+', '+
						props.state.serverResponse.pessoa.dadosCadastrais.complemento+' – '+props.state.serverResponse.pessoa.dadosCadastrais.bairro, 
						props.state.serverResponse.pessoa.dadosCadastrais.facebookAcount, props.state.serverResponse.pessoa.dadosCadastrais.instagramAcount,
						props.state.serverResponse.pessoa.dadosCadastrais.twitterAcount, props.state.serverResponse.dataAfiliacao, props.state.serverResponse.dataCadastro,
						props.state.serverResponse.funcNome, props.state.serverResponse.comoChegou,	props.state.serverResponse.pessoa.situacaoDiagnostico,props.state.serverResponse.laudo,
						props.state.serverResponse.moraPais,props.state.serverResponse.moraCom,	convertRenda(props.state.serverResponse.renda),props.state.serverResponse.moraQts,
						Util.calculate_renda(props.state.serverResponse.renda,props.state.serverResponse.moraQts),props.state.serverResponse.beneficio,props.state.serverResponse.dt_diag,
						props.state.serverResponse.centroTratamento,props.state.serverResponse.diagMedico,props.state.serverResponse.diagMedicoEspec,props.state.serverResponse.dt_pezinho,
						props.state.serverResponse.dt_suor,props.state.serverResponse.localSuor,props.state.serverResponse.valorSuor,props.state.serverResponse.dt_testGen,
						props.state.serverResponse.alelos, props.state.serverResponse.mutacoes,props.state.serverResponse.mutacoes2, props.state.serverResponse.manifestacoes,
						props.state.serverResponse.dt_transplante, props.state.serverResponse.orgao,props.state.serverResponse.transplantMedico,props.state.serverResponse.hospital,
						props.state.serverResponse.desligado,props.state.serverResponse.desligamento,props.state.serverResponse.obsDesligamento, props.state.serverResponse.obitoData,
						props.state.serverResponse.obitoMotivo
					],
				]
			}
		];
		//console.log(dados)
		return dados;
	}
	function convertRenda(renda){
        let setValue;
        if (renda==='Renda1') {
            setValue='até 1000,00';
        }else if (renda==='Renda2') {
            setValue='Entre 1000,01 e 3000,00';
        }else if (renda==='Renda3') {
            setValue='Entre 3000,01 e 5000,00';
        }else if (renda==='Renda4') {
            setValue='entre 5000,01 e 8000,00';
        }else if (renda==='Renda5') {
            setValue='Acima de 8000,01';
        }else{
            setValue=''
        }
        return setValue
    }
	const Rdata1=[
		{
			columns: [],
			data:[ [{value: "Farmácia",	style: {font: {sz: "14", bold: true, underline: true}, fill: {patternType: "solid", fgColor: {rgb: "FFCCEEFF"}}}}], ]
		},{
			///Farmacia 1
			columns: ["Id","Anotações do Atendimento","Data de atendimento","Registrado por","ID do Paciente"],
			data:[]
		},{
			ySteps: 1,
			columns: [],
			data:[[{value: "Fisioterapia",	style: {font: {sz: "14", bold: true, underline: true}, fill: {patternType: "solid", fgColor: {rgb: "FFCCEEFF"}}}}]]
		},{
			///Fisioterapia 3
			columns: ["Id","Anotações do Atendimento","Data de atendimento","Registrado por","ID do Paciente"],
			data:[]
		},{
			ySteps: 1,
			columns: [],
			data:[[{value: "Assistência Social",	style: {font: {sz: "14", bold: true, underline: true}, fill: {patternType: "solid", fgColor: {rgb: "FFCCEEFF"}}}}]]
		},{
			///Assistencia Social 5
			columns: ["Id","Anotações do Atendimento","Data de atendimento","Registrado por","ID do Paciente"],
			data:[]
		},{
			ySteps: 1,
			columns: [],
			data:[[{value: "Psciologia",	style: {font: {sz: "14", bold: true, underline: true}, fill: {patternType: "solid", fgColor: {rgb: "FFCCEEFF"}}}}]]
		},{
			///Psciologia 7
			columns: ["Id","Anotações do Atendimento","Data de atendimento","Registrado por","ID do Paciente"],
			data:[]
		},{
			ySteps: 1,
			columns: [],
			data:[[{value: "Receita",	style: {font: {sz: "14", bold: true, underline: true}, fill: {patternType: "solid", fgColor: {rgb: "FFCCEEFF"}}}}]]
		},{
			///Receita 9
			columns: ["Id","Nebulizador","Marca/Modelo","Data da última troca","Anotações do Atendimento","Medicamentos","Data de atendimento","Registrado por","ID do Paciente"],
			data:[]
		},{
			ySteps: 1,
			columns: [],
			data:[[{value: "Nutrição",	style: {font: {sz: "14", bold: true, underline: true}, fill: {patternType: "solid", fgColor: {rgb: "FFCCEEFF"}}}}]]
		},{
			///Nutrição 11
			columns: ["Id","Anotações do Atendimento","Data de atendimento","Registrado por","ID do Paciente"],
			data:[]
		},{
			ySteps: 1,
			columns: [],
			data:[[{value: "Internação",	style: {font: {sz: "14", bold: true, underline: true}, fill: {patternType: "solid", fgColor: {rgb: "FFCCEEFF"}}}}]]
		},{
			///Internação 13
			columns: ["Id","Data de internamento","Data de alta","Hospital","Médico Responsável","Especialidade","Intecorrência Médica","Anotações do Internamento","Data de atendimento","Registrado por","ID do Paciente"],
			data:[]
		},{
			ySteps: 1,
			columns: [],
			data:[[{value: "Consulta",	style: {font: {sz: "14", bold: true, underline: true}, fill: {patternType: "solid", fgColor: {rgb: "FFCCEEFF"}}}}]]
		},{
			///Consulta 15
			columns: ["Id","Médico Responsável","Especialidade","Anotações do Atendimento","Data de atendimento","Registrado por","ID do Paciente"],
			data:[]
		}
	];
	const Rdata2=[
		{
			columns: [],
			data:[ [{value: "Contribuição",	style: {font: {sz: "14", bold: true, underline: true}, fill: {patternType: "solid", fgColor: {rgb: "FFCCEEFF"}}}}], ]
		},{
			///Contribuição 1
			columns: ["Id","Data da doação","valor","Método","Observações","Registrado por","ID do Paciente"],
			data:[]
		},{
			ySteps: 1,
			columns: [],
			data:[[{value: "Doações realizadas para o paciente", style: {font: {sz: "14", bold: true, underline: true}, fill: {patternType: "solid", fgColor: {rgb: "FFCCEEFF"}}}}]]
		},{
			///oações realizadas para o paciente 3
			columns: ["Id","Data da doação","Tipo de doação","Quantidade","Observações","Registrado por","ID do Paciente"],
			data:[]
		},{
			ySteps: 1,
			columns: [],
			data:[[{value: "Entrada de Doações",	style: {font: {sz: "14", bold: true, underline: true}, fill: {patternType: "solid", fgColor: {rgb: "FFCCEEFF"}}}}]]
		},{
			///Entrada de Doações 5
			columns: ["Id","Data da doação","O que foi doado","Quantidade","Observações","Registrado por","ID do Paciente"],
			data:[]
		},{
			ySteps: 1,
			columns: [],
			data:[[{value: "Desligamento",	style: {font: {sz: "14", bold: true, underline: true}, fill: {patternType: "solid", fgColor: {rgb: "FFCCEEFF"}}}}]]
		},{
			///Desligamento 7
			columns: ["Id","Data do Desligamento","Motivo do Desligamento","Registrado por","ID do Paciente"],
			data:[]
		}
	];
	function multiDataSet2(){
		IntegraServer.executeGetAllAcompByPaciId(props.state.serverResponse.id)
			.then((response) => {
				response.data.map(item => (
					saveAcomp(item)
				));
			}).catch((error) => handleError(error))		
	}
	function saveAcomp(item){
		//console.log(Rdata1)
		//console.log(item)
		if(item.tipoAcomp==="Farmácia"){
			Rdata1[1].data.push([item.id, item.obs, item.dt_atendimento, item.funcNome, item.paciId])
		}else if(item.tipoAcomp==="Fisioterapia"){
			Rdata1[3].data.push([item.id, item.obs, item.dt_atendimento, item.funcNome, item.paciId])
		}else if(item.tipoAcomp==="AssistênciaSocial"){
			Rdata1[5].data.push([item.id, item.obs, item.dt_atendimento, item.funcNome, item.paciId])
		}else if(item.tipoAcomp==="Psicologia"){
			Rdata1[7].data.push([item.id, item.obs, item.dt_atendimento, item.funcNome, item.paciId])
		}else if(item.tipoAcomp==="Receita"){
			//"Id","Nebulizador","Marca/Modelo","Data da última troca","Anotações do Atendimento","Medicamentos","Data de atendimento","Registrado por","ID do Paciente"
			Rdata1[9].data.push([item.id, item.receita.nebulizador?"Nebulizador próprio":"Programa de doação", item.receita.modelo, item.receita.dt_ultTroca, item.obs, 
				listMeds(item.receita.medicamentos), item.dt_atendimento, item.funcNome, item.paciId])
		}else if(item.tipoAcomp==="Nutrição"){
			Rdata1[11].data.push([item.id, item.obs, item.dt_atendimento, item.funcNome, item.paciId])
		}else if(item.tipoAcomp==="Internação"){			
			//"Id","Data de internamento","Data de alta","Hospital","Médico Responsável","Especialidade","Intecorrência Médica","Anotações do Internamento","Data de atendimento","Registrado por","ID do Paciente"
			Rdata1[13].data.push([item.id, item.internacao.dt_Internacao, item.internacao.dt_Alta, item.internacao.hospital, item.internacao.interMedico, 
				item.internacao.interMedicoEspec, item.internacao.intercorrenciaMedica, item.internacao.obs, item.dt_atendimento, item.funcNome, item.paciId])			
		}else if(item.tipoAcomp==="Consulta"){
			//"Id","Médico Responsável","Especialidade","Anotações do Atendimento","Data de atendimento","Registrado por","ID do Paciente"
			Rdata1[15].data.push([item.id, item.consulta.consultaMedico, item.consulta.consultaMedicoEspec, item.obs, item.dt_atendimento, item.funcNome, item.paciId])
		}else{
			console.log("tipoAcomp não mapeado")
		}
	}
	function listMeds(arr){
		let retorno ='';
		arr.map(med=>(
			retorno += med.nome+', '
		));
		return retorno;
	}
	function multiDataSet3(){
		IntegraServer.executeGetAllAssocByPaciId(props.state.serverResponse.id)
			.then((response) => {		
				response.data.map(item => (
					saveAssoc(item)
				));
			}).catch((error) => handleError(error))		
	}
	function saveAssoc(item){
		//console.log(Rdata1)
		//console.log(item)
		if(item.tipoAssoc==="Doado"){
			//"Id","Data da doação","valor","Método","Observações","Registrado por","ID do Paciente"
			Rdata2[1].data.push([item.id, item.doado.dt_doacao, item.doado.valor, item.doado.metodo, item.doado.obs, item.funcNome, item.paciId])
		}else if(item.tipoAssoc==="Recebido"){
			//"Id","Data da doação","Tipo de doação","Quantidade","Observações","Registrado por","ID do Paciente"
			Rdata2[3].data.push([item.id, item.recebido.dt_recebido, item.recebido.tipo, item.recebido.quant, item.recebido.obs, item.funcNome, item.paciId])
		}else if(item.tipoAssoc==="Entrada"){
			//"Id","Data da doação","O que foi doado","Quantidade","Observações","Registrado por","ID do Paciente"
			Rdata2[5].data.push([item.id, item.entrada.dt_entrada, item.entrada.tipo, item.entrada.quant, item.entrada.obs, item.funcNome, item.paciId])
		}else if(item.tipoAssoc==="Desligamento"){
			//"Id","Data do Desligamento","Motivo do Desligamento","Registrado por","ID do Paciente"
			Rdata2[7].data.push([item.id, item.desligamento.dt_deslig, item.desligamento.motivo, item.funcNome, item.paciId])
		}else{
			console.log("tipoAssoc não mapeado")
		}
	}
	const multiDataSetSTYLES = [
		{
			columns: [
				{title: "Headings", width: {wpx: 80}},//pixels width 
				{title: "Text Style", width: {wch: 40}},//char width 
				{title: "Colors", width: {wpx: 90}},
			],
			data: [
				[
					{value: "H1", style: {font: {sz: "24", bold: true}}},
					{value: "Bold", style: {font: {bold: true}}},
					{value: "Red", style: {fill: {patternType: "solid", fgColor: {rgb: "FFFF0000"}}}},
				],
				[
					{value: "H2", style: {font: {sz: "18", bold: true}}},
					{value: "underline", style: {font: {underline: true}}},
					{value: "Blue", style: {fill: {patternType: "solid", fgColor: {rgb: "FF0000FF"}}}},
				],
				[
					{value: "H3", style: {font: {sz: "14", bold: true}}},
					{value: "italic", style: {font: {italic: true}}},
					{value: "Green", style: {fill: {patternType: "solid", fgColor: {rgb: "FF00FF00"}}}},
				],
				[
					{value: "H4", style: {font: {sz: "12", bold: true}}},
					{value: "strike", style: {font: {strike: true}}},
					{value: "Orange", style: {fill: {patternType: "solid", fgColor: {rgb: "FFF86B00"}}}},
				],
				[
					{value: "H5", style: {font: {sz: "10.5", bold: true}}},
					{value: "outline", style: {font: {outline: true}}},
					{value: "Yellow", style: {fill: {patternType: "solid", fgColor: {rgb: "FFFFFF00"}}}},
				],
				[
					{value: "H6", style: {font: {sz: "7.5", bold: true}}},
					{value: "shadow", style: {font: {shadow: true}}},
					{value: "Light Blue", style: {fill: {patternType: "solid", fgColor: {rgb: "FFCCEEFF"}}}}
				]
			]
		}
	];
	function handleError(error){
		console.log(error);
	}
	function checkAcomps(){
		multiDataSet2();
		return <ExcelSheet dataSet={Rdata1} name={"Acompanhamentos de "+props.state.serverResponse.id}/>
	}
	function checkAssociados(){
		multiDataSet3();
		return <ExcelSheet dataSet={Rdata2} name={"Associados de "+props.state.serverResponse.id}/>
	}
    
	return(
		<Container maxWidth='lg' style={{marginBottom:'50px'}}>
			<ThemeProvider theme={ConstantStyles.MainTheme}>
				<Box style={{display:'flex', flexFlow:'row nowrap',alignItems:'flex-start',marginTop:'50px',marginBottom:'25px',}}>
					<Typography style={ConstantStyles.ListMenu.title} variant="h6" noWrap>
						<Box fontWeight="fontWeightBold">
							{ConstantMessages.MessageTexts.MenuForm.B2}
						</Box>
					</Typography>
					<ConstantStyles.PacientesIcon color='secondary' style={ConstantStyles.ListMenu.icon}/>
				</Box>
				<Box style={{display:'flex',flexFlow:'row nowrap',height:'60px'}}>
					<Button className={classes.btnEdit} onClick={clickVoltar}>Voltar</Button>
					<div style={{flexGrow: '0.02',}} />
					<ConstantStyles.GreenButton onClick={createPaci}>Novo Paciente</ConstantStyles.GreenButton>
					<div style={{flexGrow: '0.02',}} />
					<ConstantStyles.GreenButton onClick={()=>editPaci(props.state.serverResponse.id)}>Editar</ConstantStyles.GreenButton>
					<div style={{flexGrow: '0.02',}} />
					
					{props.state.serverResponse.id>=1?
					<ExcelFile filename={'Paciente '+props.state.serverResponse.id} element={
						<Button style={{
						minWidth: '1px',
						padding:'15px',
						color:ConstantCLass.Colors.gray,
						}}>
							<PrintIcon fontSize='large' color='action'/>
						</Button>}>
							<ExcelSheet dataSet={multiDataSet()} name={'Paciente '+props.state.serverResponse.id}/>
							{checkAcomps()}
							{checkAssociados()}
					</ExcelFile>:
					<></>}

				</Box>

				<Paper style={{
						background:[ConstantCLass.Colors.panelSummary],
						borderRadius: 10,
						display:'flex',
						flexFlow:'row nowrap',
						padding:'7px',
						marginTop:'50px',
						}}>
						<Typography style={{fontFamily:'Realist',flexBasis:'95%',color:'white',}}>{props.state.serverResponse.pessoa!=null?props.state.serverResponse.pessoa.nome:''}</Typography>
						{<Typography style={{fontFamily:'Realist',color:'white',}}>{'PACI0'+props.state.serverResponse.id}</Typography>}
					</Paper>
				<Box style={{display:'flex',flexFlow:'column wrap',alignItems:'stretch',alignContent:'center'}}>					
                    <div style={{margin:'30px'}}/>
					<Box style={{width:'90%',display:'flex',flexFlow:'column wrap',alignContent:'center',}}>                  
                        {props.state.serverResponse.id>=1?
                            <>
							<Box style={{display:'flex',flexFlow:'row nowrap',justifyContent:'center',marginBottom:'80px'}}>
								<ButtonGroup variant="outlined" color="primary" size="large">
									<Button variant="contained">Geral</Button>
									<Button onClick={clickAcompanhamentos}>Acompanhamentos</Button>
									<Button onClick={clickAssociados}>Associados</Button>
								</ButtonGroup>
							</Box>

                            <Box style={{display:'flex',flexFlow:'row nowrap',justifyContent:'space-between'}}>
                                {props.state.serverResponse.dataAfiliacao!== null?<LinhaInfo name={"Filiação:"} data={props.state.serverResponse.dataAfiliacao}/>:<div></div>}
                                {props.state.serverResponse.dataCadastro!== null?<LinhaInfo name={"Cadastro no Integra FC:"} data={props.state.serverResponse.dataCadastro}/>:<div></div>}
                                {props.state.serverResponse.funcNome!== null?<LinhaInfo name={"Responsável pelo Cadastro:"} data={props.state.serverResponse.funcNome}/>:<div></div>}
                            </Box>
							{props.state.serverResponse.comoChegou!== null||props.state.serverResponse.dt_diag!== null||props.state.serverResponse.laudo!== null?
							<Divider orientation="vertical" style={{marginTop:'10px',border:'1px solid',width:'60vw',color:'#b9b9b9'}}/>:<></>}							
							<div style={{margin:'15px'}}/>
							<Box style={{display:'flex',flexFlow:'row nowrap',justifyContent:'flex-start'}}>
								{props.state.serverResponse.comoChegou!== null?<LinhaInfo name={"Como chegou até a associação:"} data={props.state.serverResponse.comoChegou}/>:<div></div>}
                                {props.state.serverResponse.pessoa.situacaoDiagnostico!== null?props.state.serverResponse.pessoa.situacaoDiagnostico?
								<LinhaInfo style={{marginLeft:'200px'}} name={"Situação atual do diagnóstico:"} data={'Confirmado'}/>:
								<LinhaInfo name={"Situação atual do diagnóstico:"} data={'Em investigação'}/>:<></>}
                            </Box>
							<div style={{margin:'10px'}}/>
							{props.state.serverResponse.laudo!== null?<LinhaInfo name={"Laudo:"} data={props.state.serverResponse.laudo}/>:<div></div>}
							<Divider orientation="vertical" style={{marginTop:'50px',border:'1px solid',width:'60vw',color:'#b9b9b9'}}/>
							<Box style={{display:'flex',flexFlow:'row nowrap',justifyContent:'space-between',marginTop:'50px'}}>
                                {props.state.serverResponse.pessoa.cpf!== null?<LinhaInfo name={"CPF:"} data={props.state.serverResponse.pessoa.cpf}/>:<div></div>}
                                {props.state.serverResponse.pessoa.rg!== null?<LinhaInfo name={"RG:"} data={props.state.serverResponse.pessoa.rg}/>:<div></div>}
                                {props.state.serverResponse.pessoa.dataNascimento!== null?<LinhaInfo name={"Data de Nascimento:"} data={props.state.serverResponse.pessoa.dataNascimento}/>:<div></div>}
								{props.state.serverResponse.pessoa.dataNascimento!== null?<LinhaInfo name={"Idade:"} data={Util.calculate_age(props.state.serverResponse.pessoa.dataNascimento)}/>:<div></div>}
                            </Box>
							<Box style={{display:'flex',flexFlow:'row nowrap',justifyContent:'space-between',marginTop:'10px'}}>
                                {props.state.serverResponse.cns!== null?<LinhaInfo name={"Número do CNS:"} data={props.state.serverResponse.cns}/>:<div></div>}
                                {props.state.serverResponse.pessoa.sexo!== null?<LinhaInfo name={"Sexo:"} data={props.state.serverResponse.pessoa.sexo==='M'?'Masculino':'Feminino'}/>:<div></div>}
                                {props.state.serverResponse.estadoCivil!== null?<LinhaInfo name={"Estado Civil:"} data={props.state.serverResponse.estadoCivil}/>:<div></div>}
                            </Box>
							{props.state.serverResponse.pessoa.nomeMae!== null?<LinhaInfo style={{marginTop:'10px'}} name={"Nome da Mãe:"} data={props.state.serverResponse.pessoa.nomeMae}/>:<div></div>}
							{props.state.serverResponse.pessoa.nomePai!== null?<LinhaInfo style={{marginTop:'10px'}} name={"Nome do Pai:"} data={props.state.serverResponse.pessoa.nomePai}/>:<div></div>}
							<Box style={{display:'flex',flexFlow:'row nowrap',justifyContent:'space-between',marginTop:'10px'}}>
                                {props.state.serverResponse.pessoa.dadosCadastrais.cep!== null?<LinhaInfo name={"CEP:"} data={props.state.serverResponse.pessoa.dadosCadastrais.cep}/>:<div></div>}
                                {props.state.serverResponse.pessoa.dadosCadastrais.cidade!== null?<LinhaInfo name={"Cidade:"} data={props.state.serverResponse.pessoa.dadosCadastrais.cidade}/>:<div></div>}
                                {props.state.serverResponse.pessoa.dadosCadastrais.estado!== null?<LinhaInfo name={"Estado:"} data={props.state.serverResponse.pessoa.dadosCadastrais.estado}/>:<div></div>}
                            </Box>
							{props.state.serverResponse.pessoa.dadosCadastrais.endereco!== null?<LinhaInfo style={{marginTop:'10px'}} name={"Endereço:"} data={props.state.serverResponse.pessoa.dadosCadastrais.endereco+' '+
							props.state.serverResponse.pessoa.dadosCadastrais.numero+', '+
							props.state.serverResponse.pessoa.dadosCadastrais.complemento+' – '+
							props.state.serverResponse.pessoa.dadosCadastrais.bairro
							}/>:<div></div>}
							<Box style={{display:'flex',flexFlow:'row nowrap',justifyContent:'flex-start',marginTop:'10px'}}>
								{props.state.serverResponse.pessoa.dadosCadastrais.telefone!== null?<LinhaInfo name={"Telefone:"} data={props.state.serverResponse.pessoa.dadosCadastrais.telefone}/>:<div></div>}
								{props.state.serverResponse.pessoa.dadosCadastrais.telefone2!== null?<LinhaInfo style={{marginLeft:'200px'}} name={"Telefone alternativo:"} data={props.state.serverResponse.pessoa.dadosCadastrais.telefone2}/>:<div></div>}
							</Box>
							<Box style={{display:'flex',flexFlow:'row nowrap',justifyContent:'flex-start',marginTop:'10px'}}>
								{props.state.serverResponse.contatoEmerg!== null?<LinhaInfo name={"Contato de Emergência:"} data={props.state.serverResponse.contatoEmerg}/>:<div></div>}
                                {props.state.serverResponse.falarCom!== null?<LinhaInfo style={{marginLeft:'200px'}} name={"Falar Com:"} data={props.state.serverResponse.falarCom}/>:<div></div>}
                            </Box>
							<Box style={{display:'flex',flexFlow:'row nowrap',justifyContent:'flex-start',marginTop:'10px'}}>
								{props.state.serverResponse.pessoa.dadosCadastrais.email!== null?<LinhaInfo name={"Email:"} data={props.state.serverResponse.pessoa.dadosCadastrais.email}/>:<div></div>}
                                {props.state.serverResponse.pessoa.dadosCadastrais.email2!== null?<LinhaInfo style={{marginLeft:'200px'}} name={"Email alternativo:"} data={props.state.serverResponse.pessoa.dadosCadastrais.email2}/>:<div></div>}
                            </Box>
							{props.state.serverResponse.pessoa.dadosCadastrais.facebookAcount!== null?<LinhaInfo style={{marginTop:'10px'}} name={"Facebook:"} data={props.state.serverResponse.pessoa.dadosCadastrais.facebookAcount}/>:<div></div>}
							{props.state.serverResponse.pessoa.dadosCadastrais.instagramAcount!== null?<LinhaInfo style={{marginTop:'10px'}} name={"Instagram:"} data={props.state.serverResponse.pessoa.dadosCadastrais.instagramAcount}/>:<div></div>}
							{props.state.serverResponse.pessoa.dadosCadastrais.twitterAcount!== null?<LinhaInfo style={{marginTop:'10px'}} name={"Twitter:"} data={props.state.serverResponse.pessoa.dadosCadastrais.twitterAcount}/>:<div></div>}
							{props.state.serverResponse.moraPais!== null||props.state.serverResponse.beneficio!== null?
							<Divider orientation="vertical" style={{marginTop:'10px',border:'1px solid',width:'60vw',color:'#b9b9b9'}}/>:<></>}
							<Box style={{display:'flex',flexFlow:'row nowrap',justifyContent:'space-between',marginTop:'50px'}}>
                                {props.state.serverResponse.moraPais!== null?<LinhaInfo name={"Mora com os pais ou responsáveis?:"} data={props.state.serverResponse.moraPais===true?'Sim':'Não'}/>:<div></div>}
                                {props.state.serverResponse.moraCom!== null?<LinhaInfo name={"Com quem mora?:"} data={props.state.serverResponse.moraCom}/>:<div></div>}
                                {props.state.serverResponse.pessoa.profissao!== null?<LinhaInfo name={"Profissão:"} data={props.state.serverResponse.pessoa.profissao}/>:<div></div>}
                            </Box>
							<Box style={{display:'flex',flexFlow:'row nowrap',justifyContent:'space-between',marginTop:'10px'}}>
								{props.state.serverResponse.renda!== null?<LinhaInfo name={"Renda Familair:"} data={props.state.serverResponse.renda==='Renda5'?'Acima de R$ 8000,01':
									props.state.serverResponse.renda==='Renda4'?'Entre R$ 5000,01 e R$ 8000,00':props.state.serverResponse.renda==='Renda3'?'Entre R$ 3000,01 e R$ 5000,00':
									props.state.serverResponse.renda==='Renda2'?'Entre R$ 1000,01 e R$ 3000,00':'Até R$ 1000,00'
								}/>:<div></div>}
                                {props.state.serverResponse.moraQts!== null?<LinhaInfo name={"Renda per capita:"} data={Util.calculate_renda(props.state.serverResponse.renda,props.state.serverResponse.moraQts)}/>:<div></div>}
                            </Box>
							{props.state.serverResponse.beneficio!== null?<LinhaInfo style={{marginTop:'10px'}} name={"Recebe benefícios:"} data={'Sim'}/>:<LinhaInfo style={{marginTop:'10px'}} name={"Recebe benefícios:"} data={'Não'}/>}
							{props.state.serverResponse.beneficio!== null?<LinhaInfo style={{marginTop:'10px'}} name={"Quais?"} data={props.state.serverResponse.beneficio}/>:<div></div>}
							{props.state.serverResponse.dt_diag!== null||props.state.serverResponse.centroTratamento!== null?
							<Divider orientation="vertical" style={{marginTop:'30px',border:'1px solid',width:'60vw',color:'#b9b9b9'}}/>:<></>}
							{props.state.serverResponse.dt_diag!== null?<LinhaInfo style={{marginTop:'30px'}} name={"Data do diagnóstico:"} data={props.state.serverResponse.dt_diag}/>:<div></div>}
							{props.state.serverResponse.centroTratamento!== null?<LinhaInfo style={{marginTop:'10px'}} name={"Centro de tratamento atual:"} data={props.state.serverResponse.centroTratamento}/>:<div></div>}
							{props.state.serverResponse.diagMedico!== null?<LinhaInfo style={{marginTop:'10px'}} name={"Médico Responsável:"} data={props.state.serverResponse.diagMedico}/>:<div></div>}
							{props.state.serverResponse.diagMedicoEspec!== null?<LinhaInfo style={{marginTop:'10px'}} name={"Especialidade:"} data={props.state.serverResponse.diagMedicoEspec}/>:<div></div>}
							{props.state.serverResponse.dt_pezinho!== null?<LinhaInfo style={{marginTop:'10px'}} name={"Teste do pezinho:"} data={props.state.serverResponse.dt_pezinho}/>:<div></div>}
							{props.state.serverResponse.dt_suor!== null?<LinhaInfo style={{marginTop:'10px'}} name={"Teste do suor:"} data={props.state.serverResponse.dt_suor}/>:<div></div>}
							{props.state.serverResponse.localSuor!== null?<LinhaInfo style={{marginTop:'10px'}} name={"Local do teste do suor:"} data={props.state.serverResponse.localSuor}/>:<div></div>}
							{props.state.serverResponse.valorSuor!== null?<LinhaInfo style={{marginTop:'10px'}} name={"Resultado do teste do suor:"} data={props.state.serverResponse.valorSuor}/>:<div></div>}
							<Box style={{display:'flex',flexFlow:'row nowrap',justifyContent:'space-between',marginTop:'10px'}}>
								{props.state.serverResponse.dt_testGen!== null?<LinhaInfo name={"Tem exame genético?"} data={'Sim'}/>:<LinhaInfo name={"Tem exame genético?"} data={'Não'}/>}
                                {props.state.serverResponse.dt_testGen!== null?<LinhaInfo name={"Data da realização do teste genético:"} data={props.state.serverResponse.dt_testGen}/>:<div></div>}
								{props.state.serverResponse.alelos!== null?<LinhaInfo name={props.state.serverResponse.alelos}/>:<div></div>}
							</Box>
							{props.state.serverResponse.mutacoes!== null?<LinhaInfo style={{marginTop:'10px'}} name={"Mutação1:"} data={props.state.serverResponse.mutacoes}/>:<div></div>}
							{props.state.serverResponse.mutacoes2!== null?<LinhaInfo style={{marginTop:'10px'}} name={"Mutação2:"} data={props.state.serverResponse.mutacoes2}/>:<div></div>}
							{props.state.serverResponse.manifestacoes!== null?<LinhaInfo style={{marginTop:'10px'}} name={"Manifestações clínicas comuns:"} data={props.state.serverResponse.manifestacoes}/>:<div></div>}
                            <Box style={{display:'flex',flexFlow:'row nowrap',justifyContent:'flex-start',marginTop:'10px'}}>
								{props.state.serverResponse.dt_transplante!== null?<LinhaInfo name={"Já fez transplante?"} data={'Sim'}/>:<LinhaInfo name={"Já fez transplante?"} data={'Não'}/>}
                                {props.state.serverResponse.dt_transplante!== null?<LinhaInfo style={{marginLeft:'200px'}} name={"Data de transplante:"} data={props.state.serverResponse.dt_transplante}/>:<div></div>}
                            </Box>
							{props.state.serverResponse.orgao!== null?<LinhaInfo style={{marginTop:'10px'}} name={"Órgão transplantado:"} data={props.state.serverResponse.orgao}/>:<div></div>}
							{props.state.serverResponse.transplantMedico!== null?<LinhaInfo style={{marginTop:'10px'}} name={"Nome do médico que realizou o transplante:"} data={props.state.serverResponse.transplantMedico}/>:<div></div>}
							{props.state.serverResponse.hospital!== null?<LinhaInfo style={{marginTop:'10px'}} name={"Hospital em que o transplante foi realizado:"} data={props.state.serverResponse.hospital}/>:<div></div>}
							{props.state.serverResponse.desligado?
							<Divider orientation="vertical" style={{marginTop:'30px',border:'1px solid',width:'60vw',color:'#b9b9b9'}}/>:<></>}
							{props.state.serverResponse.desligamento!== null?<LinhaInfo style={{marginTop:'30px'}} name={"Motivo do desligamento:"} data={props.state.serverResponse.desligamento}/>:<div></div>}
							{props.state.serverResponse.obsDesligamento!== null?<LinhaInfo style={{marginTop:'10px'}} name={"Observações sobre o desligamento:"} data={props.state.serverResponse.obsDesligamento}/>:<div></div>}
							{props.state.serverResponse.obitoData!== null?<LinhaInfo style={{marginTop:'30px'}} name={"Data do Óbito:"} data={props.state.serverResponse.obitoData}/>:<div></div>}
							{props.state.serverResponse.obitoMotivo!== "______"?<LinhaInfo style={{marginTop:'10px'}} name={"Motivo do Óbito:"} data={props.state.serverResponse.obitoMotivo}/>:<div></div>}
							</>
                            :<></>}
                    </Box>
					<Box style={{display:'flex',marginTop:'50px',alignSelf:'flex-end'}}>
						<Box style={{display:'flex',flexFlow:'row nowrap',height:'60px'}}>
							<Button className={classes.btnEdit} onClick={clickVoltar}>Voltar</Button>
							<div style={{marginLeft:'15px'}} />
							<ConstantStyles.GreenButton onClick={createPaci}>Novo Paciente</ConstantStyles.GreenButton>
							<div style={{marginLeft:'15px'}} />
							<ConstantStyles.GreenButton onClick={()=>editPaci(props.state.serverResponse.id)}>Editar</ConstantStyles.GreenButton>
							<div style={{marginLeft:'15px'}} />
							<Button style={{
								minWidth: '1px',
								padding:'15px',
								color:ConstantCLass.Colors.gray,
								}}>
								<PrintIcon fontSize='large' color='action'/>
							</Button>
						</Box>
					</Box>
				</Box>

			</ThemeProvider>		
		</Container>
	);
}



function LinhaInfo(props){

	return(
		<Box {...props.style} style={{display:'flex',flexFlow:'row nowrap'}}>
			<ConstantStyles.StyledTypographyBold noWrap>
				{props.name}
			</ConstantStyles.StyledTypographyBold>
			<div style={{flexGrow: '0.05',}} />
			<ConstantStyles.StyledTypography style={{flexBasis:'80%',}}>
				{props.data}
			</ConstantStyles.StyledTypography>
		</Box>
	);
}

function ListInfo(props){

	return(
		<Box style={{display:'flex',flexFlow:'column nowrap',}}>
			<ConstantStyles.StyledTypographyBold noWrap>
				{props.name}
			</ConstantStyles.StyledTypographyBold>
			<List subheader={<li />}>
			{props.data.map(sectionId => (
				<Box key={`section-${sectionId}`}>
					<ConstantStyles.StyledTypography>{sectionId}</ConstantStyles.StyledTypography>
				</Box>
			))}
			</List>
		</Box>
	);
}

function getParsedDate(date){
    date = String(date).split(' ');
    var days = String(date[0]).split('-');
    var hours = String(date[1]).split(':');
    return [parseInt(days[0]), parseInt(days[1])-1, parseInt(days[2]), parseInt(hours[0]), parseInt(hours[1]), parseInt(hours[2])];    
    // var date = new Date(...getParsedDate('2016-01-04 10:34:23'));
    // console.log(date);
}

export default connect(null, { push })(DetalhesPaciente);