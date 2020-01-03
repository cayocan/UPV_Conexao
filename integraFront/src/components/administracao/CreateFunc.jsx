import React,{Component,useEffect} from 'react'
import * as ConstantStyles from '../../constants/ConstantStyles'
import * as ConstantCLass from '../../constants/ConstantCLass'
import * as ConstantMessages from '../../constants/ConstantMessages'
import IntegraServer from '../IntegraServer.js'
import HeaderComponentExport from '../utility/HeaderComponent'
import SnackComponent from '../utility/SnackComponent'
import TextMaskCustom from '../utility/TextMaskCustom'
import * as Util from '../utility/Util'

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class CreateFunc extends Component{
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
		// IntegraServer.executeGetCerficados(window.location.pathname)
		// 	.then((response) => {				
		// 		this.handleSucessfulResponse(response)
		// 	}).catch((error) => this.handleError(error))				
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
				<EditPaciComponent nav={this.props} state={this.state}/>
			</div>
		)		
	}
}

function EditPaciComponent(props){
    const classes = ConstantStyles.useStyles();
    const [snack, setSnack] = React.useState({
        mode:false,
        text:'',
        status:false
    });
    const[boolBene,setBoolBene]=React.useState(true);
    const[boolGen,setBoolGen]=React.useState(true);
    const[boolTrans,setBoolTrans]=React.useState(true);
    const [values, setValues] = React.useState({
        dataAfiliacao: null,
        dataCadastro: null,
        funcNome:'',
        laudo: '',
        comoChegou: '',
        nome:'',
        outros:'',
        cpf: '',
        rg: '',
        dataNascimento: null,
        cns: '',
        sexo: '______',
        tipo: '______',
        estadoCivil: '______',
        nomeMae: '',
        nomePai: '',
        situacaoDiagnostico:false,
        cep:'',
        cidade: '',
        estado: '',
        cargo: '',
        endereco: '',
        numero: '',
        complemento: '',
        bairro: '',
        telefone: '',
        telefone2: '',
        contatoEmerg: '',
        falarCom: '',
        email:'',
        email2:'',        
        facebookAcount: '',
        instagramAcount: '',
        twitterAcount: '',
        profissao:'',
        tipoDoador:'______',

        pessoaId:'',
        funcId:'',
        dcId:'',
    });
    const [sendDados, setSendDados] = React.useState({        
        dados:{
            funcId:'',
            pessoa:{
                id:'',
                dadosCadastrais:{
                    id:''
                }
            },
        }
    });

    React.useEffect(() => {
        //console.log(props);
        if(props.nav.try){
            props.nav.server.serverResponse.length===null?setFromProps():setFromServer();
        }
        // checkBoolBene();
        // checkBoolGen();
        // checkBoolTrans();
    }, []);

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
        //console.log(values);
    };
    const handleValueChange = (name,valor) => {
        setValues({ ...values, [name]: valor });
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
        //console.log(date)
		if(date!=null){
            setValues({...values, [name]:getDateFormat(date.toJSON())});
        }
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
    function testFilter(item,name){
        //console.log(item);
        const valueToRemove = name;
        const filteredItems = item.filter(x => x !== valueToRemove)
        //console.log(filteredItems );
        return filteredItems;
    };

    function UpdateClicked(){
        // props.nav.try?
		IntegraServer.executeCreateFunc(values,sendDados)
			.then((response) => {
                handleSuccessfulResponse(response)
            }).catch((error) => handleError(error))
        // :IntegraServer.executeCreatePaci(values)
        // .then((response) => {
        //     handleSuccessfulResponse(response)
        // }).catch((error) => handleError(error))
    };
    
    function checkFields(){
        console.log(values)
        // if(values.alelos==='______'){
        //     values.alelos=null
        // }
        if(values.sexo==='______'){
            values.sexo=null
        }
        if(values.cargo===''){
            setSnack({ mode:false,text:'Campo (Cargo do funcionário) vazio.',status:true });
            return            
        }
        // if(values.funcNome===''){
        //     setSnack({ mode:false,text:'Campo (Responsável pelo Cadastro) vazio.',status:true });
        //     return 
        // }
        if(values.nome===''){
            setSnack({ mode:false,text:'Campo (Nome) vazio.',status:true });
            return
        }
        if(values.cpf===''){
            setSnack({ mode:false,text:'Campo (CPF) vazio.',status:true });
            return
        }
        if(values.dataNascimento===''){
            setSnack({ mode:false,text:'Campo (Data de nascimento) vazio.',status:true });
            return
        }      
        // if(values.nomeMae===''){
        //     setSnack({ mode:false,text:'Campo (Nome da mãe) vazio.',status:true });
        //     return
        // }
        if(values.telefone===''){
            setSnack({ mode:false,text:'Campo (Telefone) vazio.',status:true });
            return
        }        
        UpdateClicked();     
    }

	function handleSuccessfulResponse(response) {
		console.log(response)
        setSnack({ mode:true,text:'Editado com Sucesso.',status:true });
        props.nav.push(`/func`);
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
            dataAfiliacao: props.nav.server.serverResponse.dataAfiliacao,
            dataCadastro: props.nav.server.serverResponse.dataCadastro,
            funcNome: props.nav.server.serverResponse.funcNome,
            laudo: props.nav.server.serverResponse.laudo,
            comoChegou: props.nav.server.serverResponse.comoChegou,
            nome: props.nav.server.serverResponse.pessoa.nome,
            cpf: props.nav.server.serverResponse.pessoa.cpf,
            rg: props.nav.server.serverResponse.pessoa.rg,
            dataNascimento: props.nav.server.serverResponse.pessoa.dataNascimento,
            cns: props.nav.server.serverResponse.cns,
            sexo: props.nav.server.serverResponse.pessoa.sexo,
            estadoCivil: props.nav.server.serverResponse.estadoCivil,
            nomeMae: props.nav.server.serverResponse.pessoa.nomeMae,
            nomePai: props.nav.server.serverResponse.pessoa.nomePai,
            situacaoDiagnostico: props.nav.server.serverResponse.pessoa.situacaoDiagnostico,
            cep:props.nav.server.serverResponse.pessoa.dadosCadastrais.cep,
            cidade:props.nav.server.serverResponse.pessoa.dadosCadastrais.cidade,
            estado: props.nav.server.serverResponse.pessoa.dadosCadastrais.estado,
            endereco: props.nav.server.serverResponse.pessoa.dadosCadastrais.endereco,
            numero: props.nav.server.serverResponse.pessoa.dadosCadastrais.numero,
            complemento: props.nav.server.serverResponse.pessoa.dadosCadastrais.complemento,
            bairro: props.nav.server.serverResponse.pessoa.dadosCadastrais.bairro,
            telefone: props.nav.server.serverResponse.pessoa.dadosCadastrais.telefone,
            telefone2: props.nav.server.serverResponse.pessoa.dadosCadastrais.telefone2,
            contatoEmerg: props.nav.server.serverResponse.contatoEmerg,
            falarCom: props.nav.server.serverResponse.falarCom,
            email: props.nav.server.serverResponse.pessoa.dadosCadastrais.email,
            email2:props.nav.server.serverResponse.pessoa.dadosCadastrais.email2,
            facebookAcount: props.nav.server.serverResponse.pessoa.dadosCadastrais.facebookAcount,
            instagramAcount: props.nav.server.serverResponse.pessoa.dadosCadastrais.instagramAcount,
            twitterAcount: props.nav.server.serverResponse.pessoa.dadosCadastrais.twitterAcount,
            profissao: props.nav.server.serverResponse.pessoa.profissao,
            tipoDoador: props.nav.server.serverResponse.tipoDoador,
            cargo: props.nav.server.serverResponse.cargo,

            pessoaId:props.nav.server.serverResponse.pessoa.id,
            funcId:props.nav.server.serverResponse.funcId,
            dcId:props.nav.server.serverResponse.pessoa.dadosCadastrais.id,                    
        });
        setSendDados({...sendDados,dados:{
            funcId: props.nav.server.serverResponse.funcId,
            pessoa:{
                id: props.nav.server.serverResponse.pessoa.id,
                dadosCadastrais:{
                    id: props.nav.server.serverResponse.pessoa.dadosCadastrais.id
                }
            },
        }});
        //console.log(values);
    }

    function setFromServer(){
        //console.log('setFromServer');
        IntegraServer.executeGetFuncByIdFromPath(window.location.pathname)
			.then((response) => {				
				getSucessfulResponse(response);
			}).catch((error) => getError(error));
    }

    function testNull(data,i){
        if(data!=null){
            return data;
        }else{
            if(i){
                return i;
            }else{                
                return '';
            }            
        }
    }

    function getSucessfulResponse(response){
        console.log(response.data);
        setValues({ ...values, 
            dataAfiliacao: testNull(response.data.dataAfiliacao,values.dataAfiliacao),
            dataCadastro: testNull(response.data.dataCadastro,values.dataCadastro),
            funcNome: testNull(response.data.funcNome,values.funcNome),
            laudo: testNull(response.data.laudo,values.laudo),
            comoChegou: testNull(response.data.comoChegou,values.comoChegou),
            nome: testNull(response.data.pessoa.nome,values.nome),
            cpf: testNull(response.data.pessoa.cpf,values.cpf),
            rg: testNull(response.data.pessoa.rg,values.rg),
            dataNascimento: testNull(response.data.pessoa.dataNascimento,values.dataNascimento),
            cns: testNull(response.data.cns,values.cns),
            sexo: testNull(response.data.pessoa.sexo,values.sexo),
            estadoCivil: testNull(response.data.estadoCivil,values.estadoCivil),
            nomeMae: testNull(response.data.pessoa.nomeMae,values.nomeMae),
            nomePai: testNull(response.data.pessoa.nomePai,values.nomePai),
            situacaoDiagnostico: testNull(response.data.pessoa.situacaoDiagnostico,values.situacaoDiagnostico),
            cep: testNull(response.data.pessoa.dadosCadastrais.cep,values.cep),
            cidade: testNull(response.data.pessoa.dadosCadastrais.cidade,values.cidade),
            estado: testNull(response.data.pessoa.dadosCadastrais.estado,values.estado),
            endereco: testNull(response.data.pessoa.dadosCadastrais.endereco,values.endereco),
            numero: testNull(response.data.pessoa.dadosCadastrais.numero,values.numero),
            complemento: testNull(response.data.pessoa.dadosCadastrais.complemento,values.complemento),
            bairro: testNull(response.data.pessoa.dadosCadastrais.bairro,values.bairro),
            telefone: testNull(response.data.pessoa.dadosCadastrais.telefone,values.telefone),
            telefone2: testNull(response.data.pessoa.dadosCadastrais.telefone2,values.telefone2),
            contatoEmerg: testNull(response.data.contatoEmerg,values.contatoEmerg),
            falarCom: testNull(response.data.falarCom,values.falarCom),
            email: testNull(response.data.pessoa.dadosCadastrais.email,values.email),
            email2: testNull(response.data.pessoa.dadosCadastrais.email2,values.email2),
            facebookAcount: testNull(response.data.pessoa.dadosCadastrais.facebookAcount,values.facebookAcount),
            instagramAcount: testNull(response.data.pessoa.dadosCadastrais.instagramAcount,values.instagramAcount),
            twitterAcount: testNull(response.data.pessoa.dadosCadastrais.twitterAcount,values.twitterAcount),
            profissao: testNull(response.data.pessoa.profissao,values.profissao),
            tipoDoador: testNull(response.data.tipoDoador,values.tipoDoador),
            cargo: testNull(response.data.cargo,values.cargo),
            
            pessoaId: response.data.pessoa.id,
            funcId: response.data.funcId,
            dcId: response.data.pessoa.dadosCadastrais.id,   

            // twitterAcount: response.data.contact.twitterAcounttestNull(response.data.contact.twitterAcount:'',
            // assocId: response.data.id,
            // dcId: response.data.contact.id
        });
        setSendDados({...sendDados,dados:{
            funcId: testNull(response.data.funcId,''),
            pessoa:{
                id: testNull(response.data.pessoa.id,''),
                dadosCadastrais:{
                    id: testNull(response.data.pessoa.dadosCadastrais.id,'')
                }
            },
        }});
	}
    
	function getError(error){
		console.log(error)
    }
    const clickVoltar=()=>{
		props.nav.push(`/func`);
    }
    
	return(
		<Container maxWidth='lg' style={{marginBottom:'20px'}}>
			<ThemeProvider theme={ConstantStyles.MainTheme}>
				<Box style={{display:'flex', flexFlow:'row nowrap',alignItems:'flex-start',marginTop:'50px',marginBottom:'25px',}}>
					<Typography style={ConstantStyles.ListMenu.title} variant="h6" noWrap>
						<Box fontWeight="fontWeightBold">
							{ConstantMessages.MessageTexts.MenuForm.B5}
						</Box>
					</Typography>
					<ConstantStyles.AdministracaoIcon color='secondary' style={ConstantStyles.ListMenu.icon}/>
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
						<Typography style={{fontFamily:'Realist',flexBasis:'95%',color:'white',}}>{props.nav.try?'EDITANDO FUNCIONARIO':'CRIANDO FUNCIONARIO'}</Typography>
						<Typography style={{fontFamily:'Realist',color:'white',}}>{'FUNC0'+values.funcId}</Typography>
					</Paper>
				<Box style={{display:'flex',flexFlow:'column wrap',alignContent:'center',}}>					

					<Box style={{width:'90%',}}>

						<Box style={{display:'flex',flexFlow:'row nowrap',alignItems:'baseline',margin:'20px',marginBottom:'20px',}}>
							{/* <ConstantStyles.StyledTypographyBold>
								Logotipo:
							</ConstantStyles.StyledTypographyBold>
							<ConstantStyles.GreenButton style={{margin:'10px',padding:'5px 10px',}}>Enviar Imagem</ConstantStyles.GreenButton> */}
						</Box>

						<Grid container spacing={5} style={{width:'90%',justifyContent:'flex-end',}}>																					
                            <div style={{marginBottom:'10px'}}/>
                            <LinhaCampo name={"Nome do Funcionário:"} need xs={11} onChange={handleChange('nome')} value={values.nome} maxLength={64}/>
                            <LinhaCampo name={"Cargo do funcionário:"} xs={11} onChange={handleChange('cargo')} value={values.cargo} maxLength={32}/>                         
                            <LinhaCampo name={"CPF:"} need xs={11} onChange={handleChange('cpf')} value={values.cpf} tipo={'cpf'} maxLength={11} maxWidth={10}/>
                            <LinhaCampo name={"Data de nascimento:"} xs={11} onChange={handleDateChange('dataNascimento')} date value={values.dataNascimento} maxLength={10}/>                                                                                                               
                            <LinhaCampo name={"CEP:"} xs={3} onChange={handleCEPChange('cep')} value={values.cep} tipo={'cep'} maxLength={8}/>
                            <LinhaCampo name={"Cidade:"} xs={5} onChange={handleChange('cidade')} value={values.cidade} maxLength={32}/>
                            <LinhaCampo name={"Estado:"} xs={3} onChange={handleChange('estado')} value={values.estado} maxLength={32}/>
                            <LinhaCampo name={"Endereço:"} xs={8} onChange={handleChange('endereco')} value={values.endereco} maxLength={64}/>
                            <LinhaCampo name={"Número:"} xs={3} onChange={handleChange('numero')} value={values.numero} tipo={'numero'} maxLength={8}/>                            
                            <LinhaCampo name={"Complemento:"} xs={7} onChange={handleChange('complemento')} value={values.complemento} maxLength={64}/>
                            <LinhaCampo name={"Bairro:"} xs={4} onChange={handleChange('bairro')} value={values.bairro} maxLength={64}/>                        
                            <LinhaCampo name={"Telefone:"} need xs={5} onChange={handleChange('telefone')} value={values.telefone} tipo={'tel'} maxLength={11}/>
                            <LinhaCampo name={"Telefone alternativo:"} xs={6} onChange={handleChange('telefone2')} value={values.telefone2} tipo={'tel'} maxLength={11}/>                            
                            <LinhaCampo name={"E-mail:"} xs={11} onChange={handleChange('email')} value={values.email} maxLength={64}/>
                            <LinhaCampo name={"Profissão:"} xs={11} onChange={handleChange('profissao')} value={values.profissao} maxLength={64}/>                            
                        </Grid>

						<Box style={{display:'flex',flexFlow:'row nowrap',justifyContent:'flex-end',margin:'100px 50px',}}>
							<Button className={classes.btnEdit} onClick={clickVoltar}>Cancelar</Button>
							<div style={{flexGrow: '0.02',}} />
							<ConstantStyles.GreenButton onClick={checkFields}>Salvar</ConstantStyles.GreenButton>
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
         dateA: null
    });        

    function convertDate(date){
        //console.log(date);
        if(date===null){
			return null;
		}       
        let spl = date.split('/');
        let m = parseInt(spl[1],10)  
        let n = new Date(spl[2],m-1,spl[0]);
        return n;
        //return date;
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
                        style={{
                            width:'40%',
                            marginLeft:'5px'
                        }}
					/>
                </MuiPickersUtilsProvider>:
                props.tipo?
                <ConstantStyles.TextFieldCampo value={props.value} multiline={props.multiline} rows={props.rows} style={{flex:'2',marginLeft:'5px'}} 
                    onChange={props.onChange} inputComponent={TextMaskCustom} id={props.tipo}
                    //onInput = {(e) => props.type==='number'?e.target.value = checkNumberLength(props.maxLength,e.target.value):(e)} 
                />:
                <ConstantStyles.TextFieldCampo value={props.value} multiline={props.multiline} rows={props.rows} style={{flex:'2',marginLeft:'5px'}} 
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

function LinhaBoolCampo(props){
    const [state, setState] = React.useState({
        checkedA: false,
        checkedB: false,
        mounted:true
    });
    const handleChange = name => event => {
        //console.log(name,event.target.checked);
        setState({...state,[name]: event.target.checked});
        console.log(state);
        if(event.target.checked){            
            props.boolChange(props.defaultName,props.defaultString)
            setState({...state,checkedA:true, checkedB: false})
        }else{
            props.boolChange(props.defaultName,'')
        }
    };
    const OtherChange = name => event => {
        //console.log(name,event.target.checked);
        setState({...state,[name]: event.target.checked});
        console.log(state);
        if(event.target.checked){
            setState({...state,checkedA:false, checkedB: true})
            props.boolChange(props.defaultName,'')
        }
    };
    useEffect(() => {
        if (props.value && state.mounted) {
            setState({...state,checkedB: true, mounted:false})
        }        
    }, [props.value]);

	return(
		<Grid item xs={props.xs}>
			<Box style={{display:'flex',flexFlow:'row nowrap',alignItems:'center',}}>
				<ConstantStyles.StyledTypographyBold>
					{props.need?'*'+props.name:props.name}
				</ConstantStyles.StyledTypographyBold>
                <Checkbox
                    checked={state.checkedA}
                    onChange={
                        handleChange('checkedA')
                    }
                    value="checkedA"
                    color="primary"
                    style={{padding:'0px',margin:'0px 10px 0px 20px',}}
                />
                <ConstantStyles.StyledTypographyBold>
					{props.defaultString}
				</ConstantStyles.StyledTypographyBold>
                
                <Checkbox
                    checked={state.checkedB}
                    onChange={
                        OtherChange('checkedB')
                    }
                    value="checkedB"
                    color="primary"
                    style={{padding:'0px',margin:'0px 10px 0px 20px',}}
                />
                <ConstantStyles.StyledTypographyBold>
					{'Outros:'}
				</ConstantStyles.StyledTypographyBold>
                {/* {props.value!=null?setState({...state,checkedB:true}):setState({...state,checkedB:false})} */}
                {state.checkedB?
                <ConstantStyles.TextFieldCampo value={props.value} multiline={props.multiline} rows={props.rows} style={{flex:'2'}} 
                onChange={props.onChange} inputProps={{maxLength:props.maxLength}}
                 />:<></>
                }		
			</Box>
		</Grid>
	);
}

function LinhaSwitch(props){
    const [state, setState] = React.useState({
		checkedA: props.value,
    });
    const handleChange = event => {
        setState({checkedA: event.target.checked});
        if(props.boolChange)
            props.boolChange(props.defaultName,event.target.checked);
    };        
    useEffect(() => {
        setState({checkedA:props.value});
    }, [props.value]);

	return(
		<Grid item xs={props.xs}>
			<Box style={{display:'flex',flexFlow:'row nowrap',alignItems:'center',}}>
				<ConstantStyles.StyledTypographyBold>
					{props.need?'*'+props.name:props.name}
				</ConstantStyles.StyledTypographyBold>
                <ConstantStyles.FCSwitch
                    checked={state.checkedA}
                    onChange={handleChange}
                /> 
                {state.checkedA?<ConstantStyles.StyledTypographyBold style={{marginLeft:'10px'}}>{props.v}</ConstantStyles.StyledTypographyBold>:
                <ConstantStyles.StyledTypographyBold style={{marginLeft:'10px'}}>{props.f}</ConstantStyles.StyledTypographyBold>}                			
			</Box>
		</Grid>
	);
}

function LinhaMenu(props){
    const [anchorEl, setAnchorEl] = React.useState(null);
    const[state, setState]=React.useState({
		valueA: props.value,
    });
    useEffect(() => {
        setState({valueA:props.value});
    }, [props.value]);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

    function handleSelection(value){                    
        setState({valueA:value});
        props.onChange(props.defaultName,value);        
        handleClose();
    };

	return(
		<Grid item xs={props.xs}>
			<Box style={{display:'flex',flexFlow:'row nowrap',alignItems:'baseline',}}>
				<ConstantStyles.StyledTypographyBold>
					{props.need?'*'+props.name:props.name}
				</ConstantStyles.StyledTypographyBold>
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {props.arr.map(e=>
                        <div key={e}>
                            <MenuItem onClick={()=>handleSelection(e)}>{e}</MenuItem>
                        </div>
                    )}
                </Menu>
                <Button style={{border: '1px solid',borderColor: '#b9b9b9',marginLeft:'10px'}} onClick={handleClick}>
                <ConstantStyles.StyledTypography style={{textTransform:'none',}}> 
                    {state.valueA}
                </ConstantStyles.StyledTypography>
                </Button>
			</Box>
		</Grid>
	);
}

function LinhaMenuSexo(props){
    const [anchorEl, setAnchorEl] = React.useState(null);
    const[state, setState]=React.useState({
		valueA: props.value,
    });

    function convertFull(){
        let setValue;
        if (props.value==='M') {
            setValue='Masculino';
        }else if (props.value==='F') {
            setValue='Feminino';
        }else{
            setValue='______'
        }
        return setValue
    }
    function convertAbrev(value){
        let setValue;
        if (value==='Masculino') {
            setValue='M';
        }else if (value==='Feminino') {
            setValue='F';
        }else{
            setValue='______'
        }
        return setValue
    }
    useEffect(() => {
                setState({valueA:convertFull()});
    }, [props.value]);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

    function handleSelection(value){         
        setState({valueA:value});
        props.onChange(props.defaultName,convertAbrev(value));        
        handleClose();
    };

	return(
		<Grid item xs={props.xs}>
			<Box style={{display:'flex',flexFlow:'row nowrap',alignItems:'baseline',}}>
				<ConstantStyles.StyledTypographyBold>
					{props.need?'*'+props.name:props.name}
				</ConstantStyles.StyledTypographyBold>
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {props.arr.map(e=>
                        <div key={e}>
                            <MenuItem onClick={()=>handleSelection(e)}>{e}</MenuItem>
                        </div>
                    )}
                </Menu>
                <Button style={{border: '1px solid',borderColor: '#b9b9b9',marginLeft:'10px'}} onClick={handleClick}>
                <ConstantStyles.StyledTypography style={{textTransform:'none',}}> 
                    {state.valueA}
                </ConstantStyles.StyledTypography>
                </Button>
			</Box>
		</Grid>
	);
}
function LinhaMenuCampo(props){
    const [anchorEl, setAnchorEl] = React.useState(null);
    const[state, setState]=React.useState({
        valueA: props.value,
        outro:false
    });
    useEffect(() => {
        setState({...state,valueA:props.value});
    }, [props.value]);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

    function handleSelection(value){          
        setState({...state,valueA:value,outro:false});
        props.onChange(props.defaultName,value);        
        handleClose();           
    };
    function handleOther(){          
        setState({...state,valueA:'',outro:true});    
        handleClose();           
    };
    function handleField(event){
        setState({...state,valueA:event.target.value});
        props.onChange(props.defaultName,event.target.value);
    }
	return(
		<Grid item xs={props.xs}>
			<Box style={{display:'flex',flexFlow:'row nowrap',alignItems:'baseline',}}>
				<ConstantStyles.StyledTypographyBold>
					{props.need?'*'+props.name:props.name}
				</ConstantStyles.StyledTypographyBold>
                {props.outro?
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {props.arr.map(e=>
                        <div key={e}>
                            <MenuItem onClick={()=>handleSelection(e)}>{e}</MenuItem>
                        </div>
                    )}
                    <MenuItem onClick={()=>handleOther()}>{'Outros'}</MenuItem>                  
                </Menu>:
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {props.arr.map(e=>
                        <div key={e}>
                            <MenuItem onClick={()=>handleSelection(e)}>{e}</MenuItem>
                        </div>
                    )}                    
                </Menu>
                }

                <Button style={{border: '1px solid',borderColor: '#b9b9b9',marginLeft:'10px'}} onClick={handleClick}>
                <ConstantStyles.StyledTypography style={{textTransform:'none',}}> 
                    {state.outro?'Outros':state.valueA}
                </ConstantStyles.StyledTypography>
                </Button>

                {state.outro?
                <ConstantStyles.TextFieldCampo value={state.valueA} multiline={props.multiline} rows={props.rows} style={{flex:'2', marginLeft:'20px'}} 
                onChange={handleField} inputProps={{maxLength:props.maxLength}}
                 />:<></>
                }
			</Box>
		</Grid>
	);
}

export default connect(null, { push })(CreateFunc);