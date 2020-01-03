import React,{Component} from 'react'
import * as ConstantStyles from '../../constants/ConstantStyles'
import * as ConstantCLass from '../../constants/ConstantCLass'
import * as ConstantMessages from '../../constants/ConstantMessages'
import IntegraServer from '../IntegraServer.js'
import HeaderComponentExport from '../utility/HeaderComponent'

import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';

import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Container from '@material-ui/core/Container';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import BarChartOutlinedIcon from '@material-ui/icons/BarChartOutlined';
import { ThemeProvider } from '@material-ui/styles';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

import Paper from '@material-ui/core/Paper';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import PrintIcon from '@material-ui/icons/Print';
import HelpIcon from '@material-ui/icons/Help';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';

import { push } from 'connected-react-router'
import { connect } from 'react-redux';

import ReactExport from "react-data-export";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class DetalhesAssociacao extends Component{
	constructor(props){
		super(props)
		console.log(props);
		this.state = {
            serverResponse: []
        }
    }
    
	componentDidMount(){
		IntegraServer.executeGetAssocByIdFromPath(window.location.pathname)
			.then((response) => {				
				this.handleSucessfulResponse(response)
			}).catch((error) => this.handleError(error))				
	}

	handleSucessfulResponse = (response) =>{
		//console.log(response);
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
		props.nav.push(`/assoc`);
    }
	const createAssoc = () => {
		props.nav.push(`/assoc/create`);
	}

	const editAssoc = (id) => {
		props.nav.push(`/assoc/edit/${id}`);
	}
	
    const calculate_age = (dob1) => {
        var today = new Date();
        var birthDate = new Date(dob1);  // create a date object directly from `dob1` argument
        var age_now = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
        {
            age_now--;
        }
        console.log(today,dob1,birthDate,age_now);
        return age_now;
	}
	function multiDataSet(){
		let dados = [
			{
				columns: ["Id","Nome da Associação","Sigla", "CNPJ","Email","Email Alternativo","Data de fundação","Presidente","Início do Mandato","Término do Mandato","Missão, visão e valores",
					"Telefone","Telefone Alternativo","CEP","Cidade","Estado","Endereço","Site","Facebook","Instagram","Twitter","Certificações"],
				data: [
					[
						props.state.serverResponse.id, props.state.serverResponse.name, props.state.serverResponse.sigla, props.state.serverResponse.cnpj,
						props.state.serverResponse.contact.email, props.state.serverResponse.contact.email2, props.state.serverResponse.dataFund, props.state.serverResponse.presidente,
						props.state.serverResponse.mandatoIni, props.state.serverResponse.mandatoFim, props.state.serverResponse.missao, props.state.serverResponse.contact.telefone, 
						props.state.serverResponse.contact.telefone2, props.state.serverResponse.contact.cep, props.state.serverResponse.contact.cidade, 
						props.state.serverResponse.contact.estado, props.state.serverResponse.contact.endereco+' '+props.state.serverResponse.contact.numero+', '+
						props.state.serverResponse.contact.complemento+' – '+props.state.serverResponse.contact.bairro, props.state.serverResponse.site, 
						props.state.serverResponse.contact.facebookAcount, props.state.serverResponse.contact.instagramAcount,props.state.serverResponse.contact.twitterAcount,
						listCerts()
					],
				]
			}
		];
		return dados;
	}
    function listCerts(){
		let retorno = props.state.serverResponse.certificacoes.join();
		if(props.state.serverResponse.outrasCertificacoes){
			retorno += ','+props.state.serverResponse.outrasCertificacoes
		}
		return retorno;
	}

	return(
		<Container maxWidth='lg' style={{marginBottom:'50px'}}>
			<ThemeProvider theme={ConstantStyles.MainTheme}>
				<Box style={{display:'flex', flexFlow:'row nowrap',alignItems:'flex-start',marginTop:'50px',marginBottom:'25px',}}>
					<Typography style={ConstantStyles.ListMenu.title} variant="h6" noWrap>
						<Box fontWeight="fontWeightBold">
							{ConstantMessages.MessageTexts.MenuForm.B1}
						</Box>
					</Typography>
					<ConstantStyles.AssociacoesIcon color='secondary' style={ConstantStyles.ListMenu.icon}/>
				</Box>
				<Box style={{display:'flex',flexFlow:'row nowrap',height:'60px'}}>
					<Button className={classes.btnEdit} onClick={clickVoltar}>Voltar</Button>					
					{IntegraServer.getCurrentUserDecoded().authorities[0]==='ROLE_ADMIN'?
						<ConstantStyles.GreenButton style={{marginLeft:'10px'}} onClick={createAssoc}>{ConstantMessages.MessageTexts.AssociacoesText.new}</ConstantStyles.GreenButton>
					:<></>}
					{IntegraServer.getCurrentUserDecoded().authorities[0]==='ROLE_ASSOC'&&IntegraServer.getCurrentUserDecoded().user.assocId===props.state.serverResponse.id?
						<ConstantStyles.GreenButton style={{marginLeft:'10px'}} onClick={()=>editAssoc(props.state.serverResponse.id)}>Editar</ConstantStyles.GreenButton>
					:<></>}
					
					{props.state.serverResponse.id>=1?
					<ExcelFile filename={'Associação '+props.state.serverResponse.id} element={
						<Button style={{
						minWidth: '1px',
						padding:'15px',
						color:ConstantCLass.Colors.gray,
						}}>
							<PrintIcon fontSize='large' color='action'/>
						</Button>}>
							<ExcelSheet dataSet={multiDataSet()} name={'Associação '+props.state.serverResponse.id}/>
					</ExcelFile>:
					<></>}

				</Box>

				<Box style={{marginTop:'50px',display:'flex',flexFlow:'column wrap',}}>
					<Paper style={{
						background:[ConstantCLass.Colors.panelSummary],
						borderRadius: 10,
						display:'flex',
						flexFlow:'row nowrap',
						padding:'7px',
						}}>
						<Typography style={{fontFamily:'Realist',flexBasis:'95%',color:'white',}}>{props.state.serverResponse.name+' – '+props.state.serverResponse.sigla}</Typography>
						{<Typography style={{fontFamily:'Realist',color:'white',}}>{'ASC0'+props.state.serverResponse.id}</Typography>}
					</Paper>
					<img src={ConstantCLass.Img.LogoIntegra} style={ConstantStyles.DetalhesAssociacao.logo} alt="logo"/>

					<Box style={{width:'90%',}}>                  
                        {props.state.serverResponse.id>=1?
                            <>
                            {props.state.serverResponse.cnpj!== null?<LinhaInfo name={"CNPJ:"} data={props.state.serverResponse.cnpj}/>:<div></div>}
                            {props.state.serverResponse.dataFund!== null?<LinhaInfo name={"Data de fundação:"} data={props.state.serverResponse.dataFund
                            // +' – '+
                            // calculate_age(props.state.serverResponse.dataFund)
                            // +' anos'
                            }/>:<div></div>}
                            <div style={{margin:'30px'}}/>
                            {props.state.serverResponse.presidente!== null?<LinhaInfo name={"Presidente:"} data={props.state.serverResponse.presidente}/>:<div></div>}
                            {props.state.serverResponse.mandatoIni!== null?<LinhaInfo name={"Início do Mandato:"} data={props.state.serverResponse.mandatoIni}/>:<div></div>}
                            {props.state.serverResponse.mandatoFim!== null?<LinhaInfo name={"Término do Mandato:"} data={props.state.serverResponse.mandatoFim}/>:<div></div>}					
                            {props.state.serverResponse.missao!== null?<LinhaInfo name={"Missão, visão e valores:"} data={props.state.serverResponse.missao}/>:<div></div>}
                            <div style={{margin:'30px'}}/>
							{props.state.serverResponse.contact.endereco!== null?<LinhaInfo name={"Endereço:"} data={props.state.serverResponse.contact.endereco+' '+
											props.state.serverResponse.contact.numero+', '+
                                            props.state.serverResponse.contact.complemento+' – '+
                                            props.state.serverResponse.contact.bairro+' – '+
                                            props.state.serverResponse.contact.cidade+'/'+
                                            props.state.serverResponse.contact.estado+' – CEP: '+
                                            props.state.serverResponse.contact.cep}/>:<div></div>}
                            {props.state.serverResponse.contact.email!== null?<LinhaInfo name={"E-mail:"} data={props.state.serverResponse.contact.email}/>:<div></div>}
                            {props.state.serverResponse.contact.telefone!== null?<LinhaInfo name={"Telefones:"} data={props.state.serverResponse.contact.telefone+' / '+props.state.serverResponse.contact.telefone2}/>:<div></div>}
                            {props.state.serverResponse.site!== null?<LinhaInfo name={"Site:"} data={props.state.serverResponse.site}/>:<div></div>}
                            <div style={{margin:'30px'}}/>
                            {props.state.serverResponse.certificacoes.length>=1?<ListInfo name={"Certificações:"} data={
                                props.state.serverResponse.certificacoes.map(
                                    obj=>obj
                                )}/>:<div></div>}
							{props.state.serverResponse.outrasCertificacoes!== null?<LinhaInfo name={"Outras Certificações:"} data={props.state.serverResponse.outrasCertificacoes}/>:<div></div>}
                            </>
                            :<></>}
                    </Box>
				</Box>

			</ThemeProvider>		
		</Container>
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

export default connect(null, { push })(DetalhesAssociacao);