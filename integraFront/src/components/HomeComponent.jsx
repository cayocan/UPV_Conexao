import React,{Component} from 'react'
import * as ConstantStyles from '../constants/ConstantStyles'
import * as ConstantCLass from '../constants/ConstantCLass'
import * as ConstantMessages from '../constants/ConstantMessages'
import IntegraServer from './IntegraServer.js'
import HeaderComponentExport from './utility/HeaderComponent'

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';

import { ThemeProvider } from '@material-ui/styles';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';

import Paper from '@material-ui/core/Paper';

import PrintIcon from '@material-ui/icons/Print';
import HelpIcon from '@material-ui/icons/Help';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';

import { push } from 'connected-react-router'
import { connect } from 'react-redux';

class HomeComponent extends Component{
	constructor(props){
		super(props)
		
		console.log(props);
	}
	

    render(){
		return (
			<div>
				<HeaderComponentExport/>
				<FormComponent nav={this.props}/>
			</div>
		)		
	}
}

function FormComponent(props){
	const classes = ConstantStyles.useStyles();

	const getClickAssoc = () => {	
		IntegraServer.executeGetAssoc()
			.then((response) => {				
				handleSucessfulResponse(response)
			}).catch((error) => handleError(error))
	}

	function handleSucessfulResponse(response){
		//console.log(response);
		//console.log(props);
		//Mandando reposta para a proxima tela por props
		//props.nav.server.serverResponse = response.data;
		props.nav.push(`/assoc/`);
	}

	function handleError(error){
		console.log(error)
	}
	function clickAssoc(){
		props.nav.push(`/assoc/`);
	}
	function clickAtend(){
		props.nav.push(`/atend/`);
	}
	function clickPaci(){
		props.nav.push(`/paci/`);
	}
	function clickApoia(){
		props.nav.push(`/apoia/`);
	}
	function clickConfig(){
		props.nav.push(`/func`);
	}
	function clickDados(){
		props.nav.push(`/dados/`);
	}

	return(
		<Container maxWidth='lg'>
			<ThemeProvider theme={ConstantStyles.MainTheme}>
			<Box>
				<Typography style={ConstantStyles.MenuForm.title} variant="h3" noWrap>
					<Box fontWeight="fontWeightBold">
						{ConstantMessages.MessageTexts.MenuForm.Panel}
					</Box>
				</Typography>
			</Box>
			<Box style={ConstantStyles.MenuForm.Boxes}>
				<ConstantStyles.StyledButtonMenu onClick={clickAssoc}>
					<Typography style={ConstantStyles.MenuForm.MenuTexts} variant="h6" noWrap>
						<Box fontWeight="fontWeightBold">
							{ConstantMessages.MessageTexts.MenuForm.B1}
						</Box>
					</Typography>
					<ConstantStyles.AssociacoesIcon color='secondary' style={ConstantStyles.MenuForm.ButtonIcons}/>
				</ConstantStyles.StyledButtonMenu>
				<ConstantStyles.StyledButtonMenu onClick={clickPaci}>
					<Typography style={ConstantStyles.MenuForm.MenuTexts} variant="h6" noWrap>
						<Box fontWeight="fontWeightBold">
							{ConstantMessages.MessageTexts.MenuForm.B2}
						</Box>
					</Typography>
					<ConstantStyles.PacientesIcon  color='secondary' strokeWidth={'0.1'} style={ConstantStyles.MenuForm.ButtonIcons}/>
				</ConstantStyles.StyledButtonMenu>
			</Box>
			<Box style={ConstantStyles.MenuForm.Boxes}>
				{IntegraServer.getCurrentUserDecoded().authorities[0]!=='ROLE_USER'?
				<>
					<ConstantStyles.StyledButtonMenu onClick={clickApoia}>
						<Typography style={ConstantStyles.MenuForm.MenuTexts} variant="h6" noWrap>
							<Box fontWeight="fontWeightBold">
								{ConstantMessages.MessageTexts.MenuForm.B4}
							</Box>
						</Typography>
						<ConstantStyles.ApoiadoresIcon color='secondary' style={ConstantStyles.MenuForm.ButtonIcons}/>
					</ConstantStyles.StyledButtonMenu>
					
					<ConstantStyles.StyledButtonMenu onClick={clickConfig}>
						<Typography style={ConstantStyles.MenuForm.MenuTexts} variant="h6" noWrap>
							<Box fontWeight="fontWeightBold">
								{ConstantMessages.MessageTexts.MenuForm.B5}
							</Box>
						</Typography>
						<ConstantStyles.AdministracaoIcon color='secondary' style={ConstantStyles.MenuForm.ButtonIcons}/>
					</ConstantStyles.StyledButtonMenu>
				</>:
					<ConstantStyles.StyledButtonMenu style={{marginRight:'48.5%'}} onClick={clickApoia}>
						<Typography style={ConstantStyles.MenuForm.MenuTexts} variant="h6" noWrap>
							<Box fontWeight="fontWeightBold">
								{ConstantMessages.MessageTexts.MenuForm.B4}
							</Box>
						</Typography>
						<ConstantStyles.ApoiadoresIcon color='secondary' style={ConstantStyles.MenuForm.ButtonIcons}/>
					</ConstantStyles.StyledButtonMenu>
				}
			</Box>
			<Box style={ConstantStyles.MenuForm.Boxes}>
				{IntegraServer.getCurrentUserDecoded().authorities[0]==='ROLE_ADMIN'?
				<>
				<ConstantStyles.StyledButtonMenu onClick={clickAtend}>
					<Typography style={ConstantStyles.MenuForm.MenuTexts} variant="h6" noWrap>
						<Box fontWeight="fontWeightBold">
							{ConstantMessages.MessageTexts.MenuForm.B3}
						</Box>
					</Typography>
					<ConstantStyles.AtendimentosIcon  color='secondary' style={ConstantStyles.MenuForm.ButtonIcons}/>
				</ConstantStyles.StyledButtonMenu>				
				<ConstantStyles.StyledButtonMenu onClick={clickDados}>
					<Typography style={ConstantStyles.MenuForm.MenuTexts} variant="h6" noWrap>
						<Box fontWeight="fontWeightBold">
							{ConstantMessages.MessageTexts.MenuForm.B6}
						</Box>
					</Typography>
					<ConstantStyles.EstatisticaIcon color='secondary' style={ConstantStyles.MenuForm.ButtonIcons}/>
				</ConstantStyles.StyledButtonMenu>
				</>
				:<></>}
			</Box>
			</ThemeProvider>
		</Container>
	);
}

function ListMenuAssoc(){

	return(
		<Container maxWidth='lg'>
			<ThemeProvider theme={ConstantStyles.MainTheme}>
				<Box style={{display:'flex', flexFlow:'row nowrap',alignItems:'flex-start',marginTop:'50px',marginBottom:'25px',}}>
					<Typography style={ConstantStyles.ListMenu.title} variant="h6" noWrap>
						<Box fontWeight="fontWeightBold">
							{ConstantMessages.MessageTexts.MenuForm.B1}
						</Box>
					</Typography>
					<ConstantStyles.AssociacoesIcon color='secondary' style={ConstantStyles.ListMenu.icon}/>
				</Box>
				<ConstantStyles.GreenButton>Nova Associação</ConstantStyles.GreenButton>

				<Box style={{marginTop:'50px',}}>
					<ExpansionPanelList/>
					<ExpansionPanelList/>
					<ExpansionPanelList/>
					<ExpansionPanelList/>
				</Box>

			</ThemeProvider>		
		</Container>
	);
}

function DetalhesAssociacao(){
	const classes = ConstantStyles.useStyles();

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
					<Button className={classes.btnEdit}>Voltar</Button>
					<div style={{flexGrow: '0.02',}} />
					<ConstantStyles.GreenButton>{ConstantMessages.MessageTexts.AssociacoesText.new}</ConstantStyles.GreenButton>
					<div style={{flexGrow: '0.02',}} />
					<ConstantStyles.GreenButton disabled>Editar</ConstantStyles.GreenButton>
					<div style={{flexGrow: '0.02',}} />
					<Button style={{
						minWidth: '1px',
						padding:'15px',
						color:ConstantCLass.Colors.gray,
						}}>
						<PrintIcon fontSize='large' color='action'/>
					</Button>
				</Box>

				<Box style={{marginTop:'50px',display:'flex',flexFlow:'column wrap',}}>
					<Paper style={{
						background:[ConstantCLass.Colors.panelSummary],
						borderRadius: 10,
						display:'flex',
						flexFlow:'row nowrap',
						padding:'7px',
						}}>
						<Typography style={{fontFamily:'Realist',flexBasis:'95%',color:'white',}}>Associação Carioca de Assistência à Mucoviscidose – ACAM-RJ</Typography>
						<Typography style={{fontFamily:'Realist',color:'white',}}>ASC00032</Typography>
					</Paper>
					<img src={ConstantCLass.Img.LogoIntegra} style={ConstantStyles.DetalhesAssociacao.logo} alt="logo"/>

					<Box style={{width:'90%',}}>

						<LinhaInfo name={"CPF:"} data={"4568.4621.584/0001-98"}/>
						<LinhaInfo name={"Data de fundação:"} data={"16/05/2000 - 19 anos"}/>
						<div style={{margin:'30px'}}/>
						<LinhaInfo name={"Presidente:"} data={"Cristiano Silveira"}/>
						<LinhaInfo name={"Início do Mandato:"} data={"01/01/20191"}/>
						<LinhaInfo name={"Término do Mandato:"} data={"31/12/2022"}/>						
						<LinhaInfo name={"Missão, visão e valores:"} data={"Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque vestibulum libero non sapien commodo elementum. Ut a metus eleifend, molestie ex eu, feugiat nibh. In sed sem ultrices, pulvinar massa sed, malesuada lectus. Morbi vel suscipit velit, ut accumsan massa. Nunc sit amet consequat nibh. Proin in leo felis. Sed orci odio, dictum ut eros eu, auctor laoreet nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque vestibulum libero non sapien commodo elementum. Ut a metus eleifend, molestie ex eu, feugiat nibh. In sed sem ultrices, pulvinar massa sed, malesuada lectus. Morbi vel suscipit velit, ut accumsan massa. Nunc sit amet consequat nibh. Proin in leo felis. Sed orci odio, dictum ut eros eu, auctor laoreet nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque vestibulum libero non sapien commodo elementum. Ut a metus eleifend, molestie ex eu, feugiat nibh. In sed sem ultrices, pulvinar massa sed, malesuada lectus. Morbi vel suscipit velit, ut accumsan massa. Nunc sit amet consequat nibh. Proin in leo felis. Sed orci odio, dictum ut eros eu, auctor laoreet nisl."}/>
						<div style={{margin:'30px'}}/>
						<LinhaInfo name={"Endereço:"} data={"Rua da Glória 366, sala 401 – Glória – Rio de Janeiro/RJ – CEP: 20241-180"}/>
						<LinhaInfo name={"E-mail:"} data={"acamrj@acamrj.org.br"}/>
						<LinhaInfo name={"Telefones:"} data={"(21) 3970-6612 / (21) 3970-6744"}/>
						<LinhaInfo name={"Site:"} data={"www.acamrj.org.br"}/>
						<div style={{margin:'30px'}}/>
						<ListInfo name={"Certificações:"} data={["Utilidade Pública Municipal","Utilidade Pública Estadual","Utilidade Pública Federal","Registro no Conselho Nacional de Assistência Social (CNAS)","Registro no Conselho de Entidades Brasileiras de Assistência Social (CEBAS)"]}/>

					</Box>
				</Box>

			</ThemeProvider>		
		</Container>
	);
}

function CadastroAssociacao(){
	const classes = ConstantStyles.useStyles();

	return(
		<Container maxWidth='lg' style={{marginBottom:'20px'}}>
			<ThemeProvider theme={ConstantStyles.MainTheme}>
				<Box style={{display:'flex', flexFlow:'row nowrap',alignItems:'flex-start',marginTop:'50px',marginBottom:'25px',}}>
					<Typography style={ConstantStyles.ListMenu.title} variant="h6" noWrap>
						<Box fontWeight="fontWeightBold">
							{ConstantMessages.MessageTexts.MenuForm.B1}
						</Box>
					</Typography>
					<ConstantStyles.AssociacoesIcon color='secondary' style={ConstantStyles.ListMenu.icon}/>
				</Box>

				<Paper style={{
						background:[ConstantCLass.Colors.panelSummary],
						borderRadius: 10,
						display:'flex',
						flexFlow:'row nowrap',
						padding:'7px',
						marginBottom:'20px',
						marginTop:'50px',
						}}>
						<Typography style={{fontFamily:'Realist',flexBasis:'95%',color:'white',}}>{ConstantMessages.MessageTexts.AssociacoesText.cadastro}</Typography>
						<Typography style={{fontFamily:'Realist',color:'white',}}>ASC00032</Typography>
					</Paper>
				<Box style={{display:'flex',flexFlow:'column wrap',alignContent:'center',}}>					

					<Box style={{width:'90%',}}>

						<Box style={{display:'flex',flexFlow:'row nowrap',alignItems:'baseline',margin:'20px',marginBottom:'50px',}}>
							<ConstantStyles.StyledTypographyBold>
								Logotipo:
							</ConstantStyles.StyledTypographyBold>
							<ConstantStyles.GreenButton style={{margin:'10px',padding:'5px 10px',}}>Enviar Imagem</ConstantStyles.GreenButton>
						</Box>

						<Grid container spacing={5} style={{width:'90%',justifyContent:'flex-end',}}>
							<LinhaCampo name={"Nome:"} need question xs={11}/>
							<LinhaCampo name={"Sigla:"} need question xs={3}/>
							<LinhaCampo name={"CNPJ:"} need question xs={8}/>
							<LinhaCampo name={"Data de fundação:"} need question xs={4}/>
							<LinhaCampo name={"Idade da associação:"} xs={8}/>
							<LinhaCampo name={"Presidente:"} xs={11}/>
							<LinhaCampo name={"Início do Mandato:"} xs={6}/>
							<LinhaCampo name={"Término do Mandato:"} xs={6}/>
							<LinhaCampo name={"Missão, visão e valores:"} multiline rows={10} xs={12}/>
							<LinhaCampo name={"CEP:"} need xs={4}/>
							<LinhaCampo name={"Cidade:"} need xs={4}/>
							<LinhaCampo name={"Estado:"} need xs={3}/>
							<LinhaCampo name={"Endereço:"} need xs={11}/>
							<LinhaCampo name={"Telefone:"} xs={6}/>
							<LinhaCampo name={"Telefone 2:"} xs={6}/>
							<LinhaCampo name={"E-mail:"} xs={11}/>
							<LinhaCampo name={"Senha:"} xs={11}/>
							<LinhaCampo name={"E-mail alternativo:"} xs={11}/>
							<LinhaCampo name={"Site:"} xs={11}/>
							<LinhaCampo name={"Facebook:"} xs={11}/>
							<LinhaCampo name={"Instagram:"} xs={11}/>
							<LinhaCampo name={"Twitter:"} xs={11}/>
						</Grid>

						<ConstantStyles.StyledTypographyBold style={{margin:'50px 10px',}}>
							Quais certificações a associação possui?
						</ConstantStyles.StyledTypographyBold>

						<ToggleCertificaoes name={"Utilidade Pública Municipal"}/>
						<ToggleCertificaoes name={"Utilidade Pública Estadual"}/>
						<ToggleCertificaoes name={"Utilidade Pública Federal"}/>
						<ToggleCertificaoes name={"Registro no Conselho da Criança e do Adolescente ( CMDCA)"}/>
						<ToggleCertificaoes name={"Registro no Conselho de Assistência (CMAS)"}/>
						<ToggleCertificaoes name={"Registro no Conselho de Saúde (CMS)"}/>
						<ToggleCertificaoes name={"Registro no Conselho Nacional de Assistência Social (CNAS)"}/>
						<ToggleCertificaoes name={"Registro no Conselho de Entidades Brasileiras de Assistência Social (CEBAS)"}/>

						<Box style={{display:'flex',flexFlow:'row nowrap',justifyContent:'flex-end',margin:'100px 50px',}}>
							<Button className={classes.btnEdit}>Cancelar</Button>
							<div style={{flexGrow: '0.02',}} />
							<ConstantStyles.GreenButton>Salvar</ConstantStyles.GreenButton>
						</Box>

					</Box>
				</Box>

			</ThemeProvider>		
		</Container>
	);
}

function ExpansionPanelList(){
	const classes = ConstantStyles.useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleChange = panel => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};
	
	return(
		<ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')} style={{boxShadow:'none',marginBottom:'10px'}}>
						<ConstantStyles.StyledPanelSummary>
						<Typography style={{fontFamily:'Realist',flexBasis:'95%',color:'white',}}>Associação Carioca de Assistência à Mucoviscidose – ACAM-RJ</Typography>
						<Typography style={{fontFamily:'Realist',color:'white',}}>ASC00032</Typography>
						</ConstantStyles.StyledPanelSummary>
						<ConstantStyles.StyledPanelDetails>
							<Box style={{width:'90%',}}>

								<LinhaInfo name={"Endereço:"} data={"Rua da Glória 366, sala 401 – Glória – Rio de Janeiro/RJ – CEP: 20241-180"}/>
								<LinhaInfo name={"Site:"} data={"www.acamrj.org.br"}/>
								<LinhaInfo name={"E-mail:"} data={"acamrj@acamrj.org.br"}/>
								<LinhaInfo name={"Telefones:"} data={"(21) 3970-6612 / (21) 3970-6744"}/>
								<LinhaInfo name={"Presidente:"} data={"Cristiano Silveira"}/>

							</Box>
							<Box style={{display:'flex',flexFlow:'row nowrap',alignItems:'flex-end',}}>
								<ConstantStyles.GreenButton style={{margin:'10px',padding:'5px 10px',}}>Visualizar</ConstantStyles.GreenButton>
								<Button className={classes.btnEdit}>Editar</Button>
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

function LinhaCampo(props){


	return(
		<Grid item xs={props.xs}>
			<Box style={{display:'flex',flexFlow:'row nowrap',alignItems:'baseline',}}>
				<ConstantStyles.StyledTypographyBold>
					{props.need?'*'+props.name:props.name}
				</ConstantStyles.StyledTypographyBold>
				<ConstantStyles.TextFieldCampo multiline={props.multiline} rows={props.rows} style={{flex:'2'}}/>
				{props.question?
				<Button style={{
					minWidth: '1px',
					color:ConstantCLass.Colors.gray,
					padding:'1px',
					}}>
					<HelpIcon fontSize='small' style={{color:ConstantCLass.Colors.gray}}/>
				</Button>
				:<div style={{margin:'11px',}}></div>}			
			</Box>
		</Grid>
	);
}

function ToggleCertificaoes(props){
	const [state, setState] = React.useState({
		checkedA: false,
	  });
	
	const handleChange = name => event => {
	setState({ ...state, [name]: event.target.checked });
	};

	return(
		<Box style={{display:'flex',flexFlow:'row nowrap',margin:'10px 5px',}}>
			<Checkbox
				checked={state.checkedA}
				onChange={handleChange('checkedA')}
				value="checkedA"
				color="primary"
				style={{padding:'0px',margin:'0px 10px 0px 50px',}}
			/>
			<ConstantStyles.StyledTypographyBold noWrap>
				{props.name}
			</ConstantStyles.StyledTypographyBold>			
		</Box>
	);
}

export default connect(null, { push })(HomeComponent);