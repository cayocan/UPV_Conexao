import React,{Component,useEffect} from 'react'
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



class EditAssoc extends Component{
	constructor(props){
		super(props)
		//console.log(props);
		this.state = {
            serverResponse: []
        }
        // window.onbeforeunload = function () {
        //     props.push(`/assoc/`);
        // }
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
	// componentWillMount(){
    //     console.log(this.props)
    //     this.props.server.serverResponse<1?this.setFromServer():this.setFromPrevious();						
    // }
    // setFromPrevious=()=>{
    //     console.log('setFromPrevious');
    // }
    // setFromServer=()=>{
    //     console.log('setFromServer');
    //     IntegraServer.executeGetAssocByIdFromPath(window.location.pathname)
	// 		.then((response) => {				
	// 			this.handleSucessfulResponse(response)
	// 		}).catch((error) => this.handleError(error))
    // }

	// handleSucessfulResponse = (response) =>{
	// 	//console.log(response);
	// 	this.setState({serverResponse:response.data,update:true})
    //     console.log(this.state);
	// 	//props.nav.push(`/assoc/`);
	// }
    
	// handleError = (error) => {
	// 	console.log(error)
	// }

    render(){
		return (
			<div>
				<HeaderComponentExport/>
				<EditAssociacao nav={this.props} state={this.state}/>
			</div>
		)		
	}
}

function EditAssociacao(props){
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
        numero:'',
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
        assocId:'',
        dcId:'',
    });
    const [toggles, setToggles] = React.useState({
          certificacoes:[]
    });

    React.useEffect(() => {
        //console.log('useEffect');
        //console.log(props.nav.server);
        props.nav.server.serverResponse.length==null?setFromProps():setFromServer();
    }, []);

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
				//console.log(response.data)
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
   };

   function testFilter(item,name){
       //console.log(item);
       const valueToRemove = name;
       const filteredItems = item.filter(x => x !== valueToRemove)
       //console.log(filteredItems );
       return filteredItems;
   };

    function UpdateClicked(){
		IntegraServer.executeUpdateAssoc(values,toggles.certificacoes)
			.then((response) => {
                handleSuccessfulResponse(response)
			}).catch((error) => handleError(error));
	};

	function handleSuccessfulResponse(response) {
		console.log(response)
        setSnack({ mode:true,text:'Editado com Sucesso.',status:true });
        props.nav.push(`/assoc`);
	};

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

    function setFromProps(){
        //console.log('setFromProps');
        setValues({ ...values, 
            name: props.nav.server.serverResponse.name,
            sigla: props.nav.server.serverResponse.sigla,
            cnpj: props.nav.server.serverResponse.cnpj,
            dataFund: props.nav.server.serverResponse.dataFund,
            presidente: props.nav.server.serverResponse.presidente,
            mandatoIni: props.nav.server.serverResponse.mandatoIni,
            mandatoFim: props.nav.server.serverResponse.mandatoFim,
            outrasCertificacoes: props.nav.server.serverResponse.outrasCertificacoes,
            missao: props.nav.server.serverResponse.missao,
            cep: props.nav.server.serverResponse.contact.cep,
            cidade: props.nav.server.serverResponse.contact.cidade,
            estado: props.nav.server.serverResponse.contact.estado,
            endereco: props.nav.server.serverResponse.contact.endereco,
            numero: props.nav.server.serverResponse.contact.numero,
            complemento: props.nav.server.serverResponse.contact.complemento,
            bairro: props.nav.server.serverResponse.contact.bairro,
            telefone: props.nav.server.serverResponse.contact.telefone,
            telefone2: props.nav.server.serverResponse.contact.telefone2,
            email: props.nav.server.serverResponse.contact.email,
            email2: props.nav.server.serverResponse.contact.email2,
            site: props.nav.server.serverResponse.site,
            facebookAcount: props.nav.server.serverResponse.contact.facebookAcount,
            instagramAcount: props.nav.server.serverResponse.contact.instagramAcount,
            twitterAcount: props.nav.server.serverResponse.contact.twitterAcount,
        });
        //console.log(values);
    }

    function setFromServer(){
        //console.log('setFromServer');
        IntegraServer.executeGetAssocByIdFromPath(window.location.pathname)
			.then((response) => {				
				getSucessfulResponse(response);
			}).catch((error) => getError(error));
    }

    function getSucessfulResponse(response){
        //console.log(response.data);
        setValues({ ...values, 
            name: response.data.name!=null?response.data.name:'',
            sigla: response.data.sigla!=null?response.data.sigla:'',
            cnpj: response.data.cnpj!=null?response.data.cnpj:'',
            dataFund: response.data.dataFund!=null?response.data.dataFund:'',
            presidente: response.data.presidente!=null?response.data.presidente:'',
            mandatoIni: response.data.mandatoIni!=null?response.data.mandatoIni:'',
            mandatoFim: response.data.mandatoFim!=null?response.data.mandatoFim:'',
            outrasCertificacoes: response.data.outrasCertificacoes!=null?response.data.outrasCertificacoes:'',
            missao: response.data.missao!=null?response.data.missao:'',
            cep: response.data.contact.cep!=null?response.data.contact.cep:'',
            cidade: response.data.contact.cidade!=null?response.data.contact.cidade:'',
            estado: response.data.contact.estado!=null?response.data.contact.estado:'',
            endereco: response.data.contact.endereco!=null?response.data.contact.endereco:'',
            numero: response.data.contact.numero!=null?response.data.contact.numero:'',
            complemento: response.data.contact.complemento!=null?response.data.contact.complemento:'',
            bairro: response.data.contact.bairro!=null?response.data.contact.bairro:'',
            telefone: response.data.contact.telefone!=null?response.data.contact.telefone:'',
            telefone2: response.data.contact.telefone2!=null?response.data.contact.telefone2:'',
            email: response.data.contact.email!=null?response.data.contact.email:'',
            email2: response.data.contact.email2!=null?response.data.contact.email2:'',
            site: response.data.site!=null?response.data.site:'',
            facebookAcount: response.data.contact.facebookAcount!=null?response.data.contact.facebookAcount:'',
            instagramAcount: response.data.contact.instagramAcount!=null?response.data.contact.instagramAcount:'',
            twitterAcount: response.data.contact.twitterAcount!=null?response.data.contact.twitterAcount:'',
            assocId:response.data.id,
            dcId:response.data.contact.id
        });
        setToggles({...toggles,certificacoes:response.data.certificacoes});
	}
    
	function getError(error){
		console.log(error)
    }
    const clickVoltar=()=>{
		props.nav.push(`/assoc`);
    }
//#region Certificados Array
    function certY(obj) {
        if (toggles.certificacoes.includes(obj.nome)) {
          return true;
        } else {
          return false;
        }
    }
    function certN(obj) {
        if (!toggles.certificacoes.includes(obj.nome)) {
          return true;
        } else {
          return false;
        }
    }
    function yFromArr(arr){
        let arrY = arr.filter(certY);
        return arrY
    }
    function nFromArr(arr){
        let arrN = arr.filter(certN);
        return arrN
    }
    
    function checkArray(obj){
        let arrX = false;
        let arrY = yFromArr(props.state.serverResponse)
        arrY.map(
            x=>{if(x.nome===(obj)){
                    arrX=true;
                    //console.log(arrX);            
                    return arrX;
                }         
            }
        )
        //console.log(arrX);
        return arrX;  
    }
//#endregion
    
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
						<Typography style={{fontFamily:'Realist',flexBasis:'95%',color:'white',}}>{'EDITANDO ASSOCIAÇÃO'}</Typography>
						<Typography style={{fontFamily:'Realist',color:'white',}}>{'ASC0'+values.assocId}</Typography>
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
							<LinhaCampo name={"Nome:"} need xs={11} onChange={handleChange('name')} value={values.name} maxLength={64}/>
							<LinhaCampo name={"Sigla:"} need xs={3} onChange={handleChange('sigla')} value={values.sigla} maxLength={8}/>
							<LinhaCampo name={"CNPJ:"} need xs={8} onChange={handleChange('cnpj')} value={values.cnpj} tipo={'cnpj'} maxLength={14}/>
							<LinhaCampo name={"Data de fundação:"} need question xs={4} onChange={handleDateChange('dataFund')} date value={values.dataFund}/>
							{/* <LinhaCampo name={"Idade da associação:"} xs={8}/> */}
							<LinhaCampo name={"Presidente:"} xs={7} onChange={handleChange('presidente')} value={values.presidente} maxLength={64}/>
							<LinhaCampo name={"Início do Mandato:"} xs={6} onChange={handleDateChange('mandatoIni')} date value={values.mandatoIni}/>
							<LinhaCampo name={"Término do Mandato:"} xs={5} onChange={handleDateChange('mandatoFim')} date value={values.mandatoFim}/>
							<LinhaCampo name={"Missão, visão e valores:"} multiline rows={10} xs={11} onChange={handleChange('missao')} value={values.missao}/>
							<LinhaCampo name={"CEP:"} need xs={4} onChange={handleCEPChange('cep')} value={values.cep} tipo={'cep'} maxLength={8}/>
							<LinhaCampo name={"Cidade:"} need xs={4} onChange={handleChange('cidade')} value={values.cidade} maxLength={32}/>
							<LinhaCampo name={"Estado:"} need xs={3} onChange={handleChange('estado')} value={values.estado} maxLength={32}/>
							<LinhaCampo name={"Endereço:"} need xs={8} onChange={handleChange('endereco')} value={values.endereco} maxLength={64}/>
                            <LinhaCampo name={"Número:"} need xs={3} onChange={handleChange('numero')} value={values.numero} tipo={'numero'} maxLength={8}/>
                            <LinhaCampo name={"Complemento:"} need xs={7} onChange={handleChange('complemento')} value={values.complemento} maxLength={64}/>
                            <LinhaCampo name={"Bairro:"} need xs={4} onChange={handleChange('bairro')} value={values.bairro} maxLength={32}/>
							<LinhaCampo name={"Telefone:"} xs={6} onChange={handleChange('telefone')} value={values.telefone} tipo={'tel'} maxLength={11}/>
							<LinhaCampo name={"Telefone alternativo:"} xs={5} onChange={handleChange('telefone2')} value={values.telefone2} tipo={'tel'} maxLength={11}/>
							<LinhaCampo name={"E-mail:"} xs={11} onChange={handleChange('email')} value={values.email} maxLength={64}/>
							{/* <LinhaCampo name={"Senha:"} xs={11}/> */}
							<LinhaCampo name={"E-mail alternativo:"} xs={11} onChange={handleChange('email2')} value={values.email2} maxLength={64}/>
							<LinhaCampo name={"Site:"} xs={11} onChange={handleChange('site')} value={values.site} maxLength={64}/>
							<LinhaCampo name={"Facebook:"} xs={11} onChange={handleChange('facebookAcount')} value={values.facebookAcount} maxLength={64}/>
							<LinhaCampo name={"Instagram:"} xs={11} onChange={handleChange('instagramAcount')} value={values.instagramAcount} maxLength={64}/>
							<LinhaCampo name={"Twitter:"} xs={11} onChange={handleChange('twitterAcount')} value={values.twitterAcount} maxLength={64}/>
						</Grid>

						<ConstantStyles.StyledTypographyBold style={{margin:'50px 80px',}}>
							Quais certificações a associação possui?
						</ConstantStyles.StyledTypographyBold>

                        {/* {yFromArr(props.state.serverResponse).map(
                            obj=><div key={obj.id}>{<ToggleCertificaoes name={obj.nome} toggleState={handleToggleChange} dafaultValue={true}/>}</div>
                        )}
                        {nFromArr(props.state.serverResponse).map(
                            obj=><div key={obj.id}>{<ToggleCertificaoes name={obj.nome} toggleState={handleToggleChange} dafaultValue={false}/>}</div>
                        )} */}

                        {props.state.serverResponse.map(obj=><div key={obj.id}>{
                            <ToggleCertificaoes name={obj.nome} toggleState={handleToggleChange} defaultValue={checkArray(obj.nome)}/>
                        }</div>)}
                        <Box style={{margin:'20px 80px'}}>
                            <LinhaCampo name={"Outros:"} xs={11} onChange={handleChange('outrasCertificacoes')} value={values.outrasCertificacoes} maxLength={128}/>
                        </Box>
                        {/* {props.state.serverResponse.map(obj=><div key={obj.id}>{
                            toggles.certificacoes.includes(obj.nome)?
                            (<ToggleCertificaoes name={obj.nome} toggleState={handleToggleChange} dafaultValue={true}/>)
                            :(<ToggleCertificaoes name={obj.nome} toggleState={handleToggleChange} dafaultValue={false}/>)
                        }</div>)} */}

						<Box style={{display:'flex',flexFlow:'row nowrap',justifyContent:'flex-end',margin:'100px 50px',}}>
							<Button className={classes.btnEdit} onClick={clickVoltar}>Cancelar</Button>
							<div style={{flexGrow: '0.02',}} />
							<ConstantStyles.GreenButton onClick={UpdateClicked}>Salvar</ConstantStyles.GreenButton>
						</Box>

                        <SnackComponent snackData={snack}/>
					</Box>
				</Box>

			</ThemeProvider>		
		</Container>
	);
}

function LinhaCampo(props){
    const[constDate, setConstDate]=React.useState({
		dateA: null,
    });        

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

    useEffect(() => {
        setConstDate({dateA:props.value});
    }, [props.value]);

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
					value={convertDate(constDate.dateA)}
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
    //console.log(props.defaultValue);
	const [state, setState] = React.useState({
		checkedA: props.defaultValue,
    });        
	const handleChange = name => event => {
        //console.log(name,event.target.checked);
        setState({checkedA: event.target.checked});
        //console.log(state.checkedA);     
        //console.log(props.name,state.checkedA);   
        props.toggleState(props.name,state.checkedA)
    };
    
    useEffect(() => {
        setState({checkedA:props.defaultValue});
    }, [props.defaultValue]);

	return(
		<Box style={{display:'flex',flexFlow:'row nowrap',margin:'10px 30px',}}>
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

export default connect(null, { push })(EditAssoc);