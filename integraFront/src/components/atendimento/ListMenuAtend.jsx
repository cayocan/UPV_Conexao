import React,{Component} from 'react'
import * as ConstantStyles from '../../constants/ConstantStyles'
import * as ConstantMessages from '../../constants/ConstantMessages'
import IntegraServer from '../IntegraServer.js'
import HeaderComponentExport from '../utility/HeaderComponent'

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/styles';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';

import { push } from 'connected-react-router'
import { connect } from 'react-redux';
import SnackComponent from '../utility/SnackComponent'
import LinearProgress from '@material-ui/core/LinearProgress';

class ListMenuAtend extends Component{
	constructor(props){
		super(props)
		//console.log(props);
		this.state = {
			serverResponse: [],
			loading: true
        }
	}

	componentDidMount(){	
		IntegraServer.executeGetAtendUnique()
			.then((response) => {				
				this.handleSucessfulResponse(response)
			}).catch((error) => this.handleError(error))				
	}

	handleSucessfulResponse = (response) =>{
		//console.log(response);
		this.setState({loading:false})
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
				<HeaderComponentExport nav={this.props}/>
				<ThemeProvider theme={ConstantStyles.MainTheme}>
					{this.state.loading?<LinearProgress color='secondary'/>:<></>}
					<ListMenu nav={this.props} state={this.state}/>
				</ThemeProvider>
			</div>
		)		
	}
}

function ListMenu(props){	
	const backToMenu=()=>{
		props.nav.push(`/home/`);
	}
	const createAtend = () => {
		props.nav.push(`/atend/create`);
	}

	return(
		<Container maxWidth='lg'>
				<Box style={{display:'flex', flexFlow:'row nowrap',alignItems:'flex-start',marginTop:'50px',marginBottom:'25px',}}>
					<Typography style={ConstantStyles.ListMenu.title} variant="h6" noWrap>
						<Box fontWeight="fontWeightBold">
							{ConstantMessages.MessageTexts.MenuForm.B3}
						</Box>
					</Typography>
					<ConstantStyles.AtendimentosIcon color='secondary' style={ConstantStyles.ListMenu.icon}/>
				</Box>
				<ConstantStyles.GreenButton onClick={backToMenu} >Voltar</ConstantStyles.GreenButton>	
				<ConstantStyles.GreenButton onClick={createAtend} style={{marginLeft:'20px'}}>Novo Atendimento</ConstantStyles.GreenButton>

				<Box style={{marginTop:'50px',}}>
					{
						//console.log(props.state.serverResponse),
						//props passados da tela anterior
						//props.nav.server.serverResponse
						props.state.serverResponse					
						.map(obj=>
							<div key={obj.atendId}>
								<ExpansionPanelList obj={obj} nav={props.nav}/>
							</div>
						)
					}					
				</Box>		
		</Container>
	);
}

function ExpansionPanelList(props){
	const classes = ConstantStyles.useStyles();
	const [expanded, setExpanded] = React.useState(false);
	const [snack, setSnack] = React.useState({
        mode:false,
        text:'',
        status:false
    });
	const handleChange = panel => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	function executeGetAssocById(id){
		IntegraServer.executeGetAssocById(id)
			.then((response) => {				
				handleSucessfulResponse(response,id)
			}).catch((error) => handleError(error))				
	}

	function handleSucessfulResponse(response,id){
		//console.log(response);		
		//Mandando reposta para a proxima tela por props
		props.nav.server.serverResponse = response.data;
		//console.log(props.nav.server.serverResponse);
		props.nav.push(`/assoc/edit/${id}`);
	}

	function handleError(error){
		console.log(error)
		setSnack({ mode:false,text:'Erro de conexão com o servidor.',status:true });
	}

	const clickAtend = (id) => {
		props.nav.push(`/atend/${id}`);
	}
	const editAtend = (id) => {
		//executeGetAssocById(id);
		props.nav.push(`/atend/edit/${id}`);
	}

	return(
		<ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')} style={{boxShadow:'none',marginBottom:'10px'}}>
						<ConstantStyles.StyledPanelSummary>
						<Typography style={{fontFamily:'Realist',flexBasis:'95%',color:'white',}}>{
							props.obj.pessoa.nome
						}</Typography>
						{<Typography style={{fontFamily:'Realist',color:'white',}}>{'ATEND0'+props.obj.atendId}</Typography>}
						</ConstantStyles.StyledPanelSummary>
						<ConstantStyles.StyledPanelDetails>
							<Box style={{width:'90%',}}>
								{props.obj.pessoa.dadosCadastrais.endereco!== null?
								<LinhaInfo name={"Endereço:"} data={
										/*"Rua da Glória 366, sala 401 – Glória – Rio de Janeiro/RJ – CEP: 20241-180"*/
										props.obj.pessoa.dadosCadastrais.endereco+' '+
										props.obj.pessoa.dadosCadastrais.numero+', '+
										props.obj.pessoa.dadosCadastrais.complemento+' – '+
										props.obj.pessoa.dadosCadastrais.bairro+' – '+
										props.obj.pessoa.dadosCadastrais.cidade+'/'+
										props.obj.pessoa.dadosCadastrais.estado+' – CEP: '+
										props.obj.pessoa.dadosCadastrais.cep
									}/>:<div></div>
								}
								{props.obj.pessoa.dadosCadastrais.email!== null?<LinhaInfo name={"E-mail:"} data={props.obj.pessoa.dadosCadastrais.email}/>:<div></div>}
								{props.obj.pessoa.dadosCadastrais.telefone!== null?<LinhaInfo name={"Telefones:"} data={props.obj.pessoa.dadosCadastrais.telefone+' / '+props.obj.pessoa.dadosCadastrais.telefone2}/>:<div></div>}

							</Box>
							<Box style={{display:'flex',flexFlow:'row nowrap',alignItems:'flex-end',}}>
								<ConstantStyles.GreenButton style={{margin:'10px',padding:'5px 10px',}} onClick={()=>clickAtend(props.obj.pessoa.id)}>Visualizar</ConstantStyles.GreenButton>
								<Button className={classes.btnEdit} onClick={()=>editAtend(props.obj.atendId)}>Editar</Button>
							</Box>
						</ConstantStyles.StyledPanelDetails>
					</ExpansionPanel>
	);
}

function LinhaInfo(props){

	return(
		<Box style={{display:'flex',flexFlow:'row nowrap',}}>
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

export default connect(null, { push })(ListMenuAtend);