import React,{Component} from 'react'
import * as ConstantStyles from '../../constants/ConstantStyles'
import * as ConstantCLass from '../../constants/ConstantCLass'
import * as ConstantMessages from '../../constants/ConstantMessages'
import IntegraServer from '../IntegraServer.js'
import HeaderComponentExport from '../utility/HeaderComponent'
import SnackComponent from '../utility/SnackComponent'
import TextMaskCustom from '../utility/TextMaskCustom'

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/styles';

import Paper from '@material-ui/core/Paper';
import HelpIcon from '@material-ui/icons/Help';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import { ptBR } from 'date-fns/locale'
import { push } from 'connected-react-router'
import { connect } from 'react-redux';

class CreateAssoc extends Component{
	constructor(props){
		super(props)
		//console.log(props);
		this.state = {
            serverResponse: []
        }
    }
    
	componentDidMount(){
		IntegraServer.executeGetCerficados(window.location.pathname)
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
				<CadastroAssociacao nav={this.props} state={this.state}/>
			</div>
		)		
	}
}

function CadastroAssociacao(props){
    const classes = ConstantStyles.useStyles();
    const [snack, setSnack] = React.useState({
        mode:false,
        text:'',
        status:false
    });
    const [values, setValues] = React.useState({
        name: '',
        sigla: '',
        cnpj: '',
        dataFund: null,
        presidente: '',
        mandatoIni: null,
		mandatoFim: null,
		outrasCertificacoes:'',
        missao: '',
        cep: '',
        cidade: '',
        estado: '',
		endereco: '',
		numero: '',
        complemento: '',
        bairro: '',
        telefone: '',
        telefone2: '',
        email: '',
        email2: '',
        site: '',
        facebookAcount: '',
        instagramAcount: '',
        twitterAcount: '',
      });
      const [toggles, setToggles] = React.useState({
          certificacoes:[]
      });
    const handleChange = name => event => {
		setValues({ ...values, [name]: event.target.value });
		//console.log(values);
	};
	const handleCEPChange = name => event => {
		setValues({ ...values, [name]: event.target.value });
		let str = event.target.value;
		if(str.length===9){
			IntegraServer.getCepData(str)
			.then((response) => {
				setSnack({ mode:true,text:'CEP Válido',status:false });
				if (response.data.erro) {
					handleCepError();
				}else{
					setValues({ ...values, bairro: response.data.bairro, cep: str, cidade: response.data.localidade,
						endereco: response.data.logradouro, estado: response.data.uf });
				}
			}).catch((error) => console.log(error));					
		}		
		//console.log(values);
	};
	const formatCNPJ = name => event => {
		setValues({ ...values, [name]: event.target.value });
		let str = event.target.value;
		if(str.length===11){
			let f = str.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
			console.log(f);
			setValues({ ...values, [name]: f });
		}		
		console.log(values);
	};
	function handleCepError(){
		setSnack({ mode:false,text:'CEP Inválido',status:true });
	}
	const handleDateChange = name => date => {
		if(date!=null){
		setValues({...values, [name]:getDateFormat(date.toJSON())});
		}		
	};
    const handleToggleChange = (name,event) =>{
        setToggles({...toggles,certificacoes:checkBool(toggles.certificacoes,event,name) });
        //console.log(toggles);
	};
	function getDateFormat(date){
		if(date!=null){
			let partsT = date.split("T");
			let n = partsT[0].split("-");
			let f = n[2]+'/'+n[1]+'/'+n[0]
			return f;
		}else
			return null
	};
    function checkBool(item,check,name){
        //console.log(item,check,name);
        check==false?
        item.push(name):
        //item.filter(x=>x!==name);
        item=testFilter(item,name);
        //console.log(item,check,name);
        return item;
   }
   function testFilter(item,name){
       //console.log(item);
       const valueToRemove = name;
       const filteredItems = item.filter(x => x !== valueToRemove)
       //console.log(filteredItems );
       return filteredItems;
   }

    function CreateClicked(){
		IntegraServer.executeCreateAssoc(values,toggles.certificacoes)
			.then((response) => {
				handleSuccessfulResponse(response)
			}).catch((error) => handleError(error))
	}

	function handleSuccessfulResponse(response) {
		console.log('Sucess');
		console.log(response)
        setSnack({ mode:true,text:'Criado com Sucesso.',status:true });
        props.nav.push(`/assoc`);
	}

	function handleError(error) {
		console.log(error.response)
        let errorMessage = '';

        if (error.response.data) {
            errorMessage += error.response.data
        }

        if (error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message
        }
        console.log(errorMessage)
        
        setSnack({ mode:false,text:errorMessage,status:true });
    }
    const clickVoltar=()=>{
		props.nav.push(`/assoc`);
    }

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
						<Typography style={{fontFamily:'Realist',color:'white',}}>{'ASC0'}</Typography>
					</Paper>
				<Box style={{display:'flex',flexFlow:'column wrap',alignContent:'center',}}>					

					<Box style={{width:'90%',}}>

						<Box style={{display:'flex',flexFlow:'row nowrap',alignItems:'baseline',margin:'20px',marginBottom:'50px',}}>
							{/* <ConstantStyles.StyledTypographyBold>
								Logotipo:
							</ConstantStyles.StyledTypographyBold>
							<ConstantStyles.GreenButton style={{margin:'10px',padding:'5px 10px',}}>Enviar Imagem</ConstantStyles.GreenButton> */}
						</Box>

						<Grid container spacing={5} style={{width:'90%',justifyContent:'flex-end',}}>
							<LinhaCampo name={"Nome:"} need xs={11} onChange={handleChange('name')} maxLength={64}/>
							<LinhaCampo name={"Sigla:"} need xs={3} onChange={handleChange('sigla')} maxLength={8}/>
							<LinhaCampo name={"CNPJ:"} need xs={8} onChange={handleChange('cnpj')} value={values.cnpj} tipo={'cnpj'} maxLength={17}/>
							<LinhaCampo name={"Data de fundação:"} need xs={4} onChange={handleDateChange('dataFund')} date value={values.dataFund}/>
							{/* <LinhaCampo name={"Idade da associação:"} xs={8}/> */}
							<LinhaCampo name={"Presidente:"} xs={8} onChange={handleChange('presidente')} maxLength={64}/>
							<LinhaCampo name={"Início do Mandato:"} xs={6} onChange={handleDateChange('mandatoIni')} date value={values.mandatoIni}/>
							<LinhaCampo name={"Término do Mandato:"} xs={6} onChange={handleDateChange('mandatoFim')} date value={values.mandatoFim}/>
							<LinhaCampo name={"Missão, visão e valores:"} multiline rows={10} xs={12} onChange={handleChange('missao')}/>
							<LinhaCampo name={"CEP:"} need xs={4} onChange={handleCEPChange('cep')} tipo={'cep'} value={values.cep} maxLength={8}/>
							<LinhaCampo name={"Cidade:"} need xs={4} onChange={handleChange('cidade')} value={values.cidade} maxLength={32}/>
							<LinhaCampo name={"Estado:"} need xs={3} onChange={handleChange('estado')} value={values.estado} maxLength={32}/>
							<LinhaCampo name={"Endereço:"} need xs={8} onChange={handleChange('endereco')} value={values.endereco} maxLength={64}/>
							<LinhaCampo name={"Número:"} need xs={3} onChange={handleChange('numero')} tipo={'numero'} maxLength={8}/>
                            <LinhaCampo name={"Complemento:"} need xs={8} onChange={handleChange('complemento')} maxLength={64}/>
                            <LinhaCampo name={"Bairro:"} need xs={4} onChange={handleChange('bairro')} value={values.bairro} maxLength={32}/>
							<LinhaCampo name={"Telefone:"} xs={5} onChange={handleChange('telefone')} tipo={'tel'} maxLength={11}/>
							<LinhaCampo name={"Telefone alternativo:"} xs={6} onChange={handleChange('telefone2')} tipo={'tel'} maxLength={11}/>
							<LinhaCampo name={"E-mail:"} xs={11} onChange={handleChange('email')} maxLength={64}/>
							{/* <LinhaCampo name={"Senha:"} xs={11}/> */}
							<LinhaCampo name={"E-mail alternativo:"} xs={11} onChange={handleChange('email2')} maxLength={64}/>
							<LinhaCampo name={"Site:"} xs={11} onChange={handleChange('site')} maxLength={64}/>
							<LinhaCampo name={"Facebook:"} xs={11} onChange={handleChange('facebookAcount')} maxLength={64}/>
							<LinhaCampo name={"Instagram:"} xs={11} onChange={handleChange('instagramAcount')} maxLength={64}/>
							<LinhaCampo name={"Twitter:"} xs={11} onChange={handleChange('twitterAcount')} maxLength={64}/>
						</Grid>

						<ConstantStyles.StyledTypographyBold style={{margin:'50px 10px',}}>
							Quais certificações a associação possui?
						</ConstantStyles.StyledTypographyBold>

                        {props.state.serverResponse.map(
                            obj=><div key={obj.id}><ToggleCertificaoes name={obj.nome} toggleState={handleToggleChange}/></div>
                        )}
						<Box style={{margin:'20px 10px'}}>
                            <LinhaCampo name={"Outras Certificações:"} xs={11} onChange={handleChange('outrasCertificacoes')} value={values.outrasCertificacoes} maxLength={128}/>
                        </Box>
						{/* <ToggleCertificaoes name={"Utilidade Pública Municipal"} toggleState={handleToggleChange}/>
						<ToggleCertificaoes name={"Utilidade Pública Estadual"} toggleState={handleToggleChange}/>
						<ToggleCertificaoes name={"Utilidade Pública Federal"} toggleState={handleToggleChange}/>
						<ToggleCertificaoes name={"Registro no Conselho da Criança e do Adolescente (CMDCA)"} toggleState={handleToggleChange}/>
						<ToggleCertificaoes name={"Registro no Conselho de Assistência (CMAS)"} toggleState={handleToggleChange}/>
						<ToggleCertificaoes name={"Registro no Conselho de Saúde (CMS)"} toggleState={handleToggleChange}/>
						<ToggleCertificaoes name={"Registro no Conselho Nacional de Assistência Social (CNAS)"} toggleState={handleToggleChange}/>
						<ToggleCertificaoes name={"Registro no Conselho de Entidades Brasileiras de Assistência Social (CEBAS)"} toggleState={handleToggleChange}/> */}

						<Box style={{display:'flex',flexFlow:'row nowrap',justifyContent:'flex-end',margin:'100px 50px',}}>
							<Button className={classes.btnEdit} onClick={clickVoltar}>Cancelar</Button>
							<div style={{flexGrow: '0.02',}} />
							<ConstantStyles.GreenButton onClick={CreateClicked}>Salvar</ConstantStyles.GreenButton>
						</Box>

                        <SnackComponent snackData={snack}/>
					</Box>
				</Box>

			</ThemeProvider>		
		</Container>
	);
}

function LinhaCampo(props){

	function convertDate(date){
		if(date===null){
			return null;
		} 
        let spl = date.split('/');
        let m = parseInt(spl[1],10)  
        let n = new Date(spl[2],m-1,spl[0]);
        return n;
	}
	
	function checkNumberLength(len,ele){
		let fieldLength = ele.length;
		if(fieldLength <= len){
			return ele;
		}
		else{
			let str = ele;
			ele = str.substring(0, len);
			return ele;
		}
	}
	function is_numeric_char(c) { return /\d/.test(c); }
	function is_numeric(str){
		let t = /^\d+$/.test(str)
		console.log(t);
		return t;
	}

	return(
		<Grid item xs={props.xs}>
			<Box style={{display:'flex',flexFlow:'row nowrap',alignItems:'baseline',}}>
				<ConstantStyles.StyledTypographyBold>
					{props.need?'*'+props.name:props.name}
				</ConstantStyles.StyledTypographyBold>
				{props.date?
					<MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
					<KeyboardDatePicker
					variant="inline"
					format="dd/MM/yyyy"
					id="date-picker-inline"
					value={convertDate(props.value)}
					onChange={props.onChange}
					/>
				</MuiPickersUtilsProvider>:
				props.tipo?
                <ConstantStyles.TextFieldCampo value={props.value} multiline={props.multiline} rows={props.rows} style={{flex:'2'}} 
                    onChange={props.onChange} inputComponent={TextMaskCustom} id={props.tipo}
                    //onInput = {(e) => props.type==='number'?e.target.value = checkNumberLength(props.maxLength,e.target.value):(e)} 
                />:
                <ConstantStyles.TextFieldCampo value={props.value} multiline={props.multiline} rows={props.rows} style={{flex:'2'}} 
                    onChange={props.onChange} inputProps={{maxLength:props.maxLength}}
                    //onInput = {(e) => props.type==='number'?e.target.value = checkNumberLength(props.maxLength,e.target.value):(e)} 
                />
				}				
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
        //console.log(name,event);
        setState({ ...state, [name]: event.target.checked });
        //console.log(state.checkedA);        
        props.toggleState(props.name,state.checkedA)
	};

	return(
		<Box style={{display:'flex',flexFlow:'row nowrap',margin:'10px 5px',}}>
			<Checkbox
				checked={state.checkedA}
				onChange={
                    handleChange('checkedA')
                }
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

export default connect(null, { push })(CreateAssoc);