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

class DetalhesFunc extends Component{
	constructor(props){
		super(props)
		//console.log(props);
		this.state = {
            serverResponse: []
        }
    }
    
	componentDidMount(){
		IntegraServer.executeGetFuncByIdFromPath(window.location.pathname)
			.then((response) => {				
				this.handleSucessfulResponse(response)
			}).catch((error) => this.handleError(error))				
	}

	handleSucessfulResponse = (response) =>{
		//console.log(response.data);
		this.setState({serverResponse:response.data})
		console.log(this.state);
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
		props.nav.push(`/func`);
    }
	const createApoia = () => {
		props.nav.push(`/func/create`);
	}

	const editApoia = (id) => {
		props.nav.push(`/func/edit/${id}`);
	}
    
	return(
		<Container maxWidth='lg' style={{marginBottom:'50px'}}>
			<ThemeProvider theme={ConstantStyles.MainTheme}>
				<Box style={{display:'flex', flexFlow:'row nowrap',alignItems:'flex-start',marginTop:'50px',marginBottom:'25px',}}>
					<Typography style={ConstantStyles.ListMenu.title} variant="h6" noWrap>
						<Box fontWeight="fontWeightBold">
							{ConstantMessages.MessageTexts.MenuForm.B5}
						</Box>
					</Typography>
					<ConstantStyles.AdministracaoIcon color='secondary' style={ConstantStyles.ListMenu.icon}/>
				</Box>
				<Box style={{display:'flex',flexFlow:'row nowrap',height:'60px'}}>
					<Button className={classes.btnEdit} onClick={clickVoltar}>Voltar</Button>
					<div style={{flexGrow: '0.02',}} />
					<ConstantStyles.GreenButton onClick={createApoia}>Novo Funcionário</ConstantStyles.GreenButton>
					<div style={{flexGrow: '0.02',}} />
					<ConstantStyles.GreenButton onClick={()=>editApoia(props.state.serverResponse.id)}>Editar</ConstantStyles.GreenButton>
					<div style={{flexGrow: '0.02',}} />
					{/* <Button style={{
						minWidth: '1px',
						padding:'15px',
						color:ConstantCLass.Colors.gray,
						}}>
						<PrintIcon fontSize='large' color='action'/>
					</Button> */}
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
						{<Typography style={{fontFamily:'Realist',color:'white',}}>{'FUNC0'+props.state.serverResponse.funcId}</Typography>}
					</Paper>
				<Box style={{display:'flex',flexFlow:'column wrap',alignItems:'stretch',alignContent:'center'}}>					
                    <div style={{margin:'30px'}}/>
					<Box style={{width:'90%',display:'flex',flexFlow:'column wrap',alignContent:'center',}}>                  
                        {props.state.serverResponse.id>=1?
                            <>							

                            <Box style={{display:'flex',flexFlow:'row nowrap',justifyContent:'space-between'}}>
                                {/* {props.state.serverResponse.dataAfiliacao!== null?<LinhaInfo name={"Filiação:"} data={props.state.serverResponse.dataAfiliacao}/>:<div></div>} */}                                
                                {props.state.serverResponse.assocName!== null?<LinhaInfo name={"Associação:"} data={props.state.serverResponse.assocName}/>:<div></div>}
								{props.state.serverResponse.cargo!== null?<LinhaInfo name={"Cargo:"} data={props.state.serverResponse.cargo}/>:<div></div>}
                            </Box>
							{/* <Box style={{display:'flex',flexFlow:'row nowrap',justifyContent:'space-between',marginTop:'20px'}}>
                                {props.state.serverResponse.tipoDoador!== null?<LinhaInfo name={"Tipo de Apoaidor:"} data={props.state.serverResponse.tipoDoador}/>:<div></div>}
                                {props.state.serverResponse.empresa!== null?<LinhaInfo name={"Nome da Empresa / Instituição:"} data={props.state.serverResponse.empresa}/>:<div></div>}
                            </Box> */}
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
							{/* {props.state.serverResponse.pessoa.dadosCadastrais.facebookAcount!== null?<LinhaInfo style={{marginTop:'10px'}} name={"Facebook:"} data={props.state.serverResponse.pessoa.dadosCadastrais.facebookAcount}/>:<div></div>} */}
							{/* {props.state.serverResponse.pessoa.dadosCadastrais.instagramAcount!== null?<LinhaInfo style={{marginTop:'10px'}} name={"Instagram:"} data={props.state.serverResponse.pessoa.dadosCadastrais.instagramAcount}/>:<div></div>} */}
							{/* {props.state.serverResponse.pessoa.dadosCadastrais.twitterAcount!== null?<LinhaInfo style={{marginTop:'10px'}} name={"Twitter:"} data={props.state.serverResponse.pessoa.dadosCadastrais.twitterAcount}/>:<div></div>} */}
							{/* {props.state.serverResponse.moraPais!== null||props.state.serverResponse.beneficio!== null?
							<Divider orientation="vertical" style={{marginTop:'10px',border:'1px solid',width:'60vw',color:'#b9b9b9'}}/>:<></>} */}
							<Box style={{display:'flex',flexFlow:'row nowrap',justifyContent:'space-between',marginTop:'50px'}}>
                                {/* {props.state.serverResponse.moraPais!== null?<LinhaInfo name={"Mora com os pais ou responsáveis?:"} data={props.state.serverResponse.moraPais===true?'Sim':'Não'}/>:<div></div>} */}
                                {/* {props.state.serverResponse.moraCom!== null?<LinhaInfo name={"Com quem mora?:"} data={props.state.serverResponse.moraCom}/>:<div></div>} */}
                                
                            </Box>
							<Box style={{display:'flex',flexFlow:'row nowrap',justifyContent:'space-between',marginTop:'10px'}}>
								
                            </Box>
							{/*props.state.serverResponse.beneficio!== null?<LinhaInfo style={{marginTop:'10px'}} name={"Recebe benefícios:"} data={'Sim'}/>:<LinhaInfo style={{marginTop:'10px'}} name={"Recebe benefícios:"} data={'Não'}/>}
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
							{props.state.serverResponse.valorSuor!== null?<LinhaInfo style={{marginTop:'10px'}} name={"Resultado do teste do suor:"} data={props.state.serverResponse.valorSuor}/>:<div></div>*/}
							{/*<Box style={{display:'flex',flexFlow:'row nowrap',justifyContent:'space-between',marginTop:'10px'}}>
								{props.state.serverResponse.dt_testGen!== null?<LinhaInfo name={"Tem exame genético?"} data={'Sim'}/>:<LinhaInfo name={"Tem exame genético?"} data={'Não'}/>}
                                {props.state.serverResponse.dt_testGen!== null?<LinhaInfo name={"Data da realização do teste genético:"} data={props.state.serverResponse.dt_testGen}/>:<div></div>}
								{props.state.serverResponse.alelos!== null?<LinhaInfo name={props.state.serverResponse.alelos}/>:<div></div>}
							</Box>*/}
							{/*props.state.serverResponse.mutacoes!== null?<LinhaInfo style={{marginTop:'10px'}} name={"Mutação1:"} data={props.state.serverResponse.mutacoes}/>:<div></div>}
							{props.state.serverResponse.mutacoes2!== null?<LinhaInfo style={{marginTop:'10px'}} name={"Mutação2:"} data={props.state.serverResponse.mutacoes2}/>:<div></div>}
							{props.state.serverResponse.manifestacoes!== null?<LinhaInfo style={{marginTop:'10px'}} name={"Manifestações clínicas comuns:"} data={props.state.serverResponse.manifestacoes}/>:<div></div>*/}
                            {/*<Box style={{display:'flex',flexFlow:'row nowrap',justifyContent:'flex-start',marginTop:'10px'}}>
								{props.state.serverResponse.dt_transplante!== null?<LinhaInfo name={"Já fez transplante?"} data={'Sim'}/>:<LinhaInfo name={"Já fez transplante?"} data={'Não'}/>}
                                {props.state.serverResponse.dt_transplante!== null?<LinhaInfo style={{marginLeft:'200px'}} name={"Data de transplante:"} data={props.state.serverResponse.dt_transplante}/>:<div></div>}
                            </Box>*/}
							{/*props.state.serverResponse.orgao!== null?<LinhaInfo style={{marginTop:'10px'}} name={"Órgão transplantado:"} data={props.state.serverResponse.orgao}/>:<div></div>}
							{props.state.serverResponse.transplantMedico!== null?<LinhaInfo style={{marginTop:'10px'}} name={"Nome do médico que realizou o transplante:"} data={props.state.serverResponse.transplantMedico}/>:<div></div>}
							{props.state.serverResponse.hospital!== null?<LinhaInfo style={{marginTop:'10px'}} name={"Hospital em que o transplante foi realizado:"} data={props.state.serverResponse.hospital}/>:<div></div>}
							{props.state.serverResponse.obitoData!== null||props.state.serverResponse.obitoMotivo!== null?*/}
							{/*<Divider orientation="vertical" style={{marginTop:'30px',border:'1px solid',width:'60vw',color:'#b9b9b9'}}/>:<></>*/}
							{/*props.state.serverResponse.desligamento!== null?<LinhaInfo style={{marginTop:'30px'}} name={"Motivo do desligamento:"} data={props.state.serverResponse.desligamento}/>:<div></div>*/}
							{/*props.state.serverResponse.obsDesligamento!== null?<LinhaInfo style={{marginTop:'10px'}} name={"Observações sobre o desligamento:"} data={props.state.serverResponse.obsDesligamento}/>:<div></div>*/}
							{/*props.state.serverResponse.obitoData!== null?<LinhaInfo style={{marginTop:'30px'}} name={"Data do Óbito:"} data={props.state.serverResponse.obitoData}/>:<div></div>*/}
							{/*props.state.serverResponse.obitoMotivo!== null?<LinhaInfo style={{marginTop:'10px'}} name={"Motivo do Óbito:"} data={props.state.serverResponse.obitoMotivo}/>:<div></div>*/}
							</>
                            :<></>}
                    </Box>
					<Box style={{display:'flex',marginTop:'50px',alignSelf:'flex-end'}}>
						<Box style={{display:'flex',flexFlow:'row nowrap',height:'60px'}}>
							<Button className={classes.btnEdit} onClick={clickVoltar}>Voltar</Button>
							<div style={{marginLeft:'15px'}} />
							<ConstantStyles.GreenButton onClick={createApoia}>Novo Funcionário</ConstantStyles.GreenButton>
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

export default connect(null, { push })(DetalhesFunc);