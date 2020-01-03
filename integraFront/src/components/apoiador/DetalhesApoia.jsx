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

class DetalhesApoia extends Component{
	constructor(props){
		super(props)
		console.log(props);
		this.state = {
            serverResponse: []
        }
    }
    
	componentDidMount(){
		IntegraServer.executeGetApoiaByIdFromPath(window.location.pathname)
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
		props.nav.push(`/apoia`);
    }
	const createApoia = () => {
		props.nav.push(`/apoia/create`);
	}

	const editApoia = (id) => {
		props.nav.push(`/apoia/edit/${id}`);
	}

	const clickContatos=()=>{
		props.nav.push(`/apoia/${props.state.serverResponse.id}/contatos`);
	}
	const clickDoacao=()=>{
		props.nav.push(`/apoia/${props.state.serverResponse.id}/doacoes`);
	}
	function multiDataSet(){
		let dados = [
			{
				columns: ["Id","Nome do Apoiador","Tipo de Apoaidor", "Nome da Empresa / Instituição","Email","Telefone","Telefone alternativo","Data de Cadastro no Integra FC",
					"Responsável pelo Cadastro","CPF","Data de Nascimento","Idade","Profissão","CEP","Cidade","Estado","Endereço"],
				data: [
					[
						props.state.serverResponse.id, props.state.serverResponse.pessoa.nome, props.state.serverResponse.tipoDoador, props.state.serverResponse.empresa,
						props.state.serverResponse.pessoa.dadosCadastrais.email, props.state.serverResponse.pessoa.dadosCadastrais.telefone, props.state.serverResponse.pessoa.dadosCadastrais.telefone2, 
						props.state.serverResponse.dataCadastrado, props.state.serverResponse.funcNome, props.state.serverResponse.pessoa.cpf, props.state.serverResponse.pessoa.dataNascimento,
						Util.calculate_age(props.state.serverResponse.pessoa.dataNascimento), props.state.serverResponse.pessoa.profissao, props.state.serverResponse.pessoa.dadosCadastrais.cep,
						props.state.serverResponse.pessoa.dadosCadastrais.cidade, props.state.serverResponse.pessoa.dadosCadastrais.estado, props.state.serverResponse.pessoa.dadosCadastrais.endereco+' '+
						props.state.serverResponse.pessoa.dadosCadastrais.numero+', '+props.state.serverResponse.pessoa.dadosCadastrais.complemento+' – '+props.state.serverResponse.pessoa.dadosCadastrais.bairro
					],
				]
			}
		];
		//console.log(dados)
		return dados;
	}
	const Rdata1=[
		{
			columns: ["Id","Valor","Periodicidade", "Forma","Registrado por","ID do Apoiador"],
			data:[]
		}
	];
	const Rdata2=[
		{
			columns: ["Id","Data do Contato","Tema","Observações","Registrado por","ID do Apoiador"],
			data:[]
		}
	];
	function multiDataSet2(){
		IntegraServer.executeGetDoacaoByOnlyId(props.state.serverResponse.id)
			.then((response) => {		
				response.data.map(item => (
					Rdata1[0].data.push([item.id, item.valor, item.periodicidade, item.forma, item.funcNome, item.apoiaId])
				));
			}).catch((error) => handleError(error))		
	}
	function multiDataSet3(){
		IntegraServer.executeGetContatoByOnlyId(props.state.serverResponse.id)
			.then((response) => {			
				response.data.map(item => (
					Rdata2[0].data.push([item.id, item.dataContato, item.tema, item.obs, item.funcNome, item.apoiaId])
				));
			}).catch((error) => handleError(error))		
	}
	function handleError(error){
		console.log(error);
	}
	function checkDoacoes(){
		multiDataSet2();
		return <ExcelSheet dataSet={Rdata1} name={"Doações de "+props.state.serverResponse.id}/>
	}
	function checkContatos(){
		multiDataSet3();
		return <ExcelSheet dataSet={Rdata2} name={"Contatos de "+props.state.serverResponse.id}/>
	}

	return(
		<Container maxWidth='lg' style={{marginBottom:'50px'}}>
			<ThemeProvider theme={ConstantStyles.MainTheme}>
				<Box style={{display:'flex', flexFlow:'row nowrap',alignItems:'flex-start',marginTop:'50px',marginBottom:'25px',}}>
					<Typography style={ConstantStyles.ListMenu.title} variant="h6" noWrap>
						<Box fontWeight="fontWeightBold">
							{ConstantMessages.MessageTexts.MenuForm.B4}
						</Box>
					</Typography>
					<ConstantStyles.ApoiadoresIcon color='secondary' style={ConstantStyles.ListMenu.icon}/>
				</Box>
				<Box style={{display:'flex',flexFlow:'row nowrap',height:'60px'}}>
					<Button className={classes.btnEdit} onClick={clickVoltar}>Voltar</Button>
					<div style={{flexGrow: '0.02',}} />
					<ConstantStyles.GreenButton onClick={createApoia}>Novo Apoiador</ConstantStyles.GreenButton>
					<div style={{flexGrow: '0.02',}} />
					<ConstantStyles.GreenButton onClick={()=>editApoia(props.state.serverResponse.id)}>Editar</ConstantStyles.GreenButton>
					<div style={{flexGrow: '0.02',}} />
					
					{props.state.serverResponse.id>=1?
					<ExcelFile filename={'Apoiador '+props.state.serverResponse.id} element={
						<Button style={{
						minWidth: '1px',
						padding:'15px',
						color:ConstantCLass.Colors.gray,
						}}>
							<PrintIcon fontSize='large' color='action'/>
						</Button>}>
							<ExcelSheet dataSet={multiDataSet()} name={'Apoiador '+props.state.serverResponse.id}/>
							{checkDoacoes()}
							{checkContatos()}
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
						{<Typography style={{fontFamily:'Realist',color:'white',}}>{'APO0'+props.state.serverResponse.id}</Typography>}
					</Paper>
				<Box style={{display:'flex',flexFlow:'column wrap',alignItems:'stretch',alignContent:'center'}}>					
                    <div style={{margin:'30px'}}/>
					<Box style={{width:'90%',display:'flex',flexFlow:'column wrap',alignContent:'center',}}>                  
                        {props.state.serverResponse.id>=1?
                            <>
							<Box style={{display:'flex',flexFlow:'row nowrap',justifyContent:'center',marginBottom:'80px'}}>
								<ButtonGroup variant="outlined" color="primary" size="large">
									<Button variant="contained">Geral</Button>
									<Button onClick={clickDoacao}>Doações</Button>
									<Button onClick={clickContatos}>Contatos</Button>
								</ButtonGroup>
							</Box>

                            <Box style={{display:'flex',flexFlow:'row nowrap',justifyContent:'space-between'}}>
                                {/* {props.state.serverResponse.dataAfiliacao!== null?<LinhaInfo name={"Filiação:"} data={props.state.serverResponse.dataAfiliacao}/>:<div></div>} */}
                                {props.state.serverResponse.dataCadastrado!== null?<LinhaInfo name={"Cadastro no Integra FC:"} data={props.state.serverResponse.dataCadastrado}/>:<div></div>}
                                {props.state.serverResponse.funcNome!== null?<LinhaInfo name={"Responsável pelo Cadastro:"} data={props.state.serverResponse.funcNome}/>:<div></div>}
                            </Box>
							<Box style={{display:'flex',flexFlow:'row nowrap',justifyContent:'space-between',marginTop:'20px'}}>
                                {props.state.serverResponse.tipoDoador!== null?<LinhaInfo name={"Tipo de Apoaidor:"} data={props.state.serverResponse.tipoDoador}/>:<div></div>}
                                {props.state.serverResponse.empresa!== null?<LinhaInfo name={"Nome da Empresa / Instituição:"} data={props.state.serverResponse.empresa}/>:<div></div>}
                            </Box>
							{/* {props.state.serverResponse.comoChegou!== null||props.state.serverResponse.dt_diag!== null||props.state.serverResponse.laudo!== null? */}
							{/* <Divider orientation="vertical" style={{marginTop:'10px',border:'1px solid',width:'60vw',color:'#b9b9b9'}}/>:<></>}							 */}
							{/* <div style={{margin:'15px'}}/> */}
							{/* <Box style={{display:'flex',flexFlow:'row nowrap',justifyContent:'flex-start'}}>
								{props.state.serverResponse.comoChegou!== null?<LinhaInfo name={"Como chegou até a associação:"} data={props.state.serverResponse.comoChegou}/>:<div></div>}
                                {props.state.serverResponse.pessoa.situacaoDiagnostico!== null?props.state.serverResponse.pessoa.situacaoDiagnostico?
								<LinhaInfo style={{marginLeft:'200px'}} name={"Situação atual do diagnóstico:"} data={'Confirmado'}/>:
								<LinhaInfo name={"Situação atual do diagnóstico:"} data={'Em investigação'}/>:<></>}
                            </Box> */}
							{/* <div style={{margin:'10px'}}/> */}
							{/* {props.state.serverResponse.laudo!== null?<LinhaInfo name={"Laudo:"} data={props.state.serverResponse.laudo}/>:<div></div>} */}
							<Divider orientation="vertical" style={{marginTop:'30px',border:'1px solid',width:'60vw',color:'#b9b9b9'}}/>
							<Box style={{display:'flex',flexFlow:'row nowrap',justifyContent:'space-between',marginTop:'30px'}}>
								{props.state.serverResponse.pessoa.nome!== null?<LinhaInfo name={"Nome do Apoiador:"} data={props.state.serverResponse.pessoa.nome}/>:<div></div>}
                                {props.state.serverResponse.pessoa.cpf!== null?<LinhaInfo name={"CPF:"} data={props.state.serverResponse.pessoa.cpf}/>:<div></div>}
                                {/* {props.state.serverResponse.pessoa.rg!== null?<LinhaInfo name={"RG:"} data={props.state.serverResponse.pessoa.rg}/>:<div></div>} */}
                                {props.state.serverResponse.pessoa.dataNascimento!== null?<LinhaInfo name={"Data de Nascimento:"} data={props.state.serverResponse.pessoa.dataNascimento}/>:<div></div>}
								{props.state.serverResponse.pessoa.dataNascimento!== null?<LinhaInfo name={"Idade:"} data={Util.calculate_age(props.state.serverResponse.pessoa.dataNascimento)}/>:<div></div>}
                            </Box>
							<Box style={{display:'flex',flexFlow:'row nowrap',justifyContent:'space-between',marginTop:'10px'}}>
                                {/* {props.state.serverResponse.cns!== null?<LinhaInfo name={"Número do CNS:"} data={props.state.serverResponse.cns}/>:<div></div>} */}
                                {/* {props.state.serverResponse.pessoa.sexo!== null?<LinhaInfo name={"Sexo:"} data={props.state.serverResponse.pessoa.sexo==='M'?'Masculino':'Feminino'}/>:<div></div>} */}
                                {/* {props.state.serverResponse.estadoCivil!== null?<LinhaInfo name={"Estado Civil:"} data={props.state.serverResponse.estadoCivil}/>:<div></div>} */}
                            </Box>
							{/* {props.state.serverResponse.pessoa.nomeMae!== null?<LinhaInfo style={{marginTop:'10px'}} name={"Nome da Mãe:"} data={props.state.serverResponse.pessoa.nomeMae}/>:<div></div>} */}
							{/* {props.state.serverResponse.pessoa.nomePai!== null?<LinhaInfo style={{marginTop:'10px'}} name={"Nome do Pai:"} data={props.state.serverResponse.pessoa.nomePai}/>:<div></div>} */}
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
								{/* {props.state.serverResponse.contatoEmerg!== null?<LinhaInfo name={"Contato de Emergência:"} data={props.state.serverResponse.contatoEmerg}/>:<div></div>} */}
                                {/* {props.state.serverResponse.falarCom!== null?<LinhaInfo style={{marginLeft:'200px'}} name={"Falar Com:"} data={props.state.serverResponse.falarCom}/>:<div></div>} */}
                            </Box>
							<Box style={{display:'flex',flexFlow:'row nowrap',justifyContent:'flex-start',marginTop:'10px'}}>
								{props.state.serverResponse.pessoa.dadosCadastrais.email!== null?<LinhaInfo name={"Email:"} data={props.state.serverResponse.pessoa.dadosCadastrais.email}/>:<div></div>}
                                {props.state.serverResponse.pessoa.profissao!== null?<LinhaInfo style={{marginLeft:'200px'}} name={"Profissão:"} data={props.state.serverResponse.pessoa.profissao}/>:<div></div>}
								{/* {props.state.serverResponse.pessoa.dadosCadastrais.email2!== null?<LinhaInfo style={{marginLeft:'200px'}} name={"Email alternativo:"} data={props.state.serverResponse.pessoa.dadosCadastrais.email2}/>:<div></div>} */}
                            </Box>
							</>
                            :<></>}
                    </Box>
					<Box style={{display:'flex',marginTop:'50px',alignSelf:'flex-end'}}>
						<Box style={{display:'flex',flexFlow:'row nowrap',height:'60px'}}>
							<Button className={classes.btnEdit} onClick={clickVoltar}>Voltar</Button>
							<div style={{marginLeft:'15px'}} />
							<ConstantStyles.GreenButton onClick={createApoia}>Novo Apoiador</ConstantStyles.GreenButton>
							<div style={{marginLeft:'15px'}} />
							<ConstantStyles.GreenButton onClick={()=>editApoia(props.state.serverResponse.id)}>Editar</ConstantStyles.GreenButton>
							<div style={{marginLeft:'15px'}} />
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

export default connect(null, { push })(DetalhesApoia);