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

class ListMenuAssoc extends Component{
	constructor(props){
		super(props)
		console.log(props);
		this.state = {
            serverResponse: [],
			loading: true
        }
	}

	componentDidMount(){	
		IntegraServer.executeGetAssoc()
			.then((response) => {				
				this.handleSucessfulResponse(response)
			}).catch((error) => this.handleError(error))				
	}

	handleSucessfulResponse = (response) =>{
		//console.log(response);
		this.setState({loading:false})
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
	const classes = ConstantStyles.useStyles();

	const backToMenu=()=>{
		props.nav.push(`/home/`);
	}
	
	const createAssoc = () => {
		props.nav.push(`/assoc/create`);
	}

	return(
		<Container maxWidth='lg'>
				<Box style={{display:'flex', flexFlow:'row nowrap',alignItems:'flex-start',marginTop:'50px',marginBottom:'25px',}}>
					<Typography style={ConstantStyles.ListMenu.title} variant="h6" noWrap>
						<Box fontWeight="fontWeightBold">
							{ConstantMessages.MessageTexts.MenuForm.B1}
						</Box>
					</Typography>
					<ConstantStyles.AssociacoesIcon color='secondary' style={ConstantStyles.ListMenu.icon}/>
				</Box>
				{/* <Button className={classes.btnEdit} onClick={backToMenu}>Voltar para o menu</Button> */}
				<ConstantStyles.GreenButton onClick={backToMenu} >Voltar</ConstantStyles.GreenButton>
				{IntegraServer.getCurrentUserDecoded().authorities[0]==='ROLE_ADMIN'?
				<ConstantStyles.GreenButton onClick={createAssoc} style={{marginLeft:'20px'}}>Nova Associação</ConstantStyles.GreenButton>
				:<></>}
								

				<Box style={{marginTop:'50px',}}>
					{
						//console.log(props),
						//props passados da tela anterior
						//props.nav.server.serverResponse
						props.state.serverResponse					
						.map(obj=>
							<div key={obj.id}>
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

	const clickAssoc = (id) => {
		props.nav.push(`/assoc/${id}`);
	}
	const editAssoc = (id) => {
		//executeGetAssocById(id);
		props.nav.push(`/assoc/edit/${id}`);
	}

	return(
		<ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')} style={{boxShadow:'none',marginBottom:'10px'}}>
						<ConstantStyles.StyledPanelSummary>
						<Typography style={{fontFamily:'Realist',flexBasis:'95%',color:'white',}}>{
							props.obj.name+' – '+props.obj.sigla
						}</Typography>
						{<Typography style={{fontFamily:'Realist',color:'white',}}>{'ASC0'+props.obj.id}</Typography>}
						</ConstantStyles.StyledPanelSummary>
						<ConstantStyles.StyledPanelDetails>
							<Box style={{width:'90%',}}>
								{props.obj.contact.endereco!== null?
								<LinhaInfo name={"Endereço:"} data={
										/*"Rua da Glória 366, sala 401 – Glória – Rio de Janeiro/RJ – CEP: 20241-180"*/
										props.obj.contact.endereco+' '+
										props.obj.contact.numero+', '+
										props.obj.contact.complemento+' – '+
										props.obj.contact.bairro+' – '+
										props.obj.contact.cidade+'/'+
										props.obj.contact.estado+' – CEP: '+
										props.obj.contact.cep
									}/>:<div></div>
								}
								{props.obj.site!== null?<LinhaInfo name={"Site:"} data={props.obj.site}/>:<div></div>}
								{props.obj.contact.email!== null?<LinhaInfo name={"E-mail:"} data={props.obj.contact.email}/>:<div></div>}
								{props.obj.contact.telefone!== null?<LinhaInfo name={"Telefones:"} data={props.obj.contact.telefone+' / '+props.obj.contact.telefone2}/>:<div></div>}
								{props.obj.presidente!== null?<LinhaInfo name={"Presidente:"} data={props.obj.presidente}/>:<div></div>}

							</Box>
							<Box style={{display:'flex',flexFlow:'row nowrap',alignItems:'flex-end',}}>
								<ConstantStyles.GreenButton style={{margin:'10px',padding:'5px 10px',}} onClick={()=>clickAssoc(props.obj.id)}>Visualizar</ConstantStyles.GreenButton>
								{IntegraServer.getCurrentUserDecoded().authorities[0]==='ROLE_ADMIN'||IntegraServer.getCurrentUserDecoded().authorities[0]==='ROLE_ASSOC'&&IntegraServer.getCurrentUserDecoded().user.assocId===props.obj.id?
								<Button className={classes.btnEdit} onClick={()=>editAssoc(props.obj.id)}>Editar</Button>
								:<></>}
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

export default connect(null, { push })(ListMenuAssoc);