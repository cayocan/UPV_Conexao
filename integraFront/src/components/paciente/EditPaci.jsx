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

class EditPaci extends Component{
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
    const arrMutacao=[
        '1717-1G->A','1812-1G->A','2183AA->G','2184delA','2184insA','2789+5G->A',
        '3120+1G->A','3272-26A->G','3849+10kbC->T','5T','711+1G->T','711+5G->A','A559T','A561E',
        'D1152H','F508del','G542x','G551D','G85E','I507del','L206W','N1303K','P205S','R1066C',
        'R1162X','R334W','R553X','S466X','S4X','S549R','W1282X','Y1092X'
    ]
    const [values, setValues] = React.useState({
        dataAfiliacao: null,
        dataCadastro: null,
        funcNome:'',
        laudo: '',
        comoChegou: '',
        nome:'',
        cpf: '',
        rg: '',
        dataNascimento: null,
        cns: '',
        sexo: '______',
        estadoCivil: '______',
        nomeMae: '',
        nomePai: '',
        situacaoDiagnostico:false,
        cep:'',
        cidade: '',
        estado: '',
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
        moraPais: false,
        moraCom: '______',
        profissao: '',
        renda: '______',
        moraQts: '',
        beneficio: '______',
        dt_diag: null,
        centroTratamento:'',
        diagMedico: '',
        diagMedicoEspec: '______',
        dt_pezinho: null,
        dt_suor: null,
        localSuor: '',
        valorSuor: '',
        dt_testGen: null,
        alelos: '______',
        mutacoes: '______',
        mutacoes2:'______',
        manifestacoes:'',
        dt_transplante: null,
        orgao: '______',
        transplantMedico: '',
        hospital: '',
        obitoData: '',
        obitoMotivo: '______',
        desligado: false,
        desligamento:'______',
        obsDesligamento:'',
        pessoaId:'',
        paciId:'',
        dcId:'',
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
    const handleBoolBeneChange = (name,valor) => {        
        setBoolBene(valor);
        if(!valor){
            setValues({ ...values, beneficio:'______'});
        }
    };
    const handleBoolGenChange = (name,valor) => {        
        setBoolGen(valor);
        if(!valor){
            setValues({ ...values, dt_testGen:null,alelos:'______',mutacoes:'______',mutacoes2:'______'});
        }
    };
    const handleBoolTransChange = (name,valor) => {        
        setBoolTrans(valor);
        if(!valor){
            setValues({ ...values, dt_transplante:null,orgao:'______',transplantMedico:'',hospital:''});
        }
    };
    const handleBoolDesligChange = (name,valor) => {
        if(!valor){
            setValues({ ...values, desligado: false, desligamento:'______', obitoData:null, obitoMotivo:'______'});
        }else{
            setValues({...values, desligado:true});
        }
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
        props.nav.try?
		IntegraServer.executeUpdatePaci(values)
			.then((response) => {
                handleSuccessfulResponse(response)
            }).catch((error) => handleError(error))
        :IntegraServer.executeCreatePaci(values)
        .then((response) => {
            handleSuccessfulResponse(response)
        }).catch((error) => handleError(error))
    };
    
    function checkFields(){
        console.log(values)
        if(values.alelos==='______'){
            values.alelos=null
        }
        if(values.sexo==='______'){
            values.sexo=null
        }
        if(values.renda==='______'){
            values.renda=null
        }
        if(values.funcNome===''){
            setSnack({ mode:false,text:'Campo (Responsável pelo Cadastro) vazio.',status:true });
            return 
        }
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
        if(values.nomeMae===''){
            setSnack({ mode:false,text:'Campo (Nome da mãe) vazio.',status:true });
            return
        }
        if(values.telefone===''){
            setSnack({ mode:false,text:'Campo (Telefone) vazio.',status:true });
            return
        }        
        UpdateClicked();     
    }

	function handleSuccessfulResponse(response) {
		console.log(response)
        setSnack({ mode:true,text:'Editado com Sucesso.',status:true });
        props.nav.push(`/paci`);
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
            moraPais: props.nav.server.serverResponse.moraPais,
            moraCom: props.nav.server.serverResponse.moraCom,
            profissao: props.nav.server.serverResponse.pessoa.profissao,
            renda: props.nav.server.serverResponse.renda,
            moraQts: props.nav.server.serverResponse.moraQts,
            beneficio: props.nav.server.serverResponse.beneficio,
            dt_diag: props.nav.server.serverResponse.dt_diag,
            centroTratamento:props.nav.server.serverResponse.centroTratamento,
            diagMedico: props.nav.server.serverResponse.diagMedico,
            diagMedicoEspec: props.nav.server.serverResponse.diagMedicoEspec,
            dt_pezinho: props.nav.server.serverResponse.dt_pezinho,
            dt_suor: props.nav.server.serverResponse.dt_suor,
            localSuor: props.nav.server.serverResponse.localSuor,
            valorSuor: props.nav.server.serverResponse.valorSuor,
            dt_testGen: props.nav.server.serverResponse.dt_testGen,
            alelos: props.nav.server.serverResponse.alelos,
            mutacoes: props.nav.server.serverResponse.mutacoes,
            mutacoes2: props.nav.server.serverResponse.mutacoes2,
            manifestacoes: props.nav.server.serverResponse.manifestacoes,
            dt_transplante: props.nav.server.serverResponse.dt_transplante,
            orgao: props.nav.server.serverResponse.orgao,
            transplantMedico: props.nav.server.serverResponse.transplantMedico,
            hospital: props.nav.server.serverResponse.hospital,
            obitoData: props.nav.server.serverResponse.obitoData,
            obitoMotivo: props.nav.server.serverResponse.obitoMotivo,
            desligamento: props.nav.server.serverResponse.desligamento,
            desligado: props.nav.server.serverResponse.desligado,
            obsDesligamento: props.nav.server.serverResponse.obsDesligamento,
            pessoaId:props.nav.server.serverResponse.pessoa.id,
            paciId:props.nav.server.serverResponse.id,
            dcId:props.nav.server.serverResponse.pessoa.dadosCadastrais.id,                    
        });
        //console.log(values);
    }

    function setFromServer(){
        //console.log('setFromServer');
        IntegraServer.executeGetPaciByIdFromPath(window.location.pathname)
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
            moraPais: testNull(response.data.moraPais,values.moraPais),
            moraCom: testNull(response.data.moraCom,values.moraCom),
            profissao: testNull(response.data.pessoa.profissao,values.profissao),
            renda: testNull(response.data.renda,values.renda),
            moraQts: testNull(response.data.moraQts,values.moraQts),
            beneficio: testNull(response.data.beneficio,values.beneficio),
            dt_diag: testNull(response.data.dt_diag,values.dt_diag),
            centroTratamento: testNull(response.data.centroTratamento,values.centroTratamento),
            diagMedico: testNull(response.data.diagMedico,values.diagMedico),
            diagMedicoEspec: testNull(response.data.diagMedicoEspec,values.diagMedicoEspec),
            dt_pezinho: testNull(response.data.dt_pezinho,values.dt_pezinho),
            dt_suor:testNull( response.data.dt_suor,values.dt_suor),
            localSuor: testNull(response.data.localSuor,values.localSuor),
            valorSuor: testNull(response.data.valorSuor,values.valorSuor),
            dt_testGen: testNull(response.data.dt_testGen,values.dt_testGen),
            alelos: testNull(response.data.alelos,values.alelos),
            mutacoes: testNull(response.data.mutacoes,values.mutacoes),
            mutacoes2: testNull(response.data.mutacoes2,values.mutacoes2),
            manifestacoes: testNull(response.data.manifestacoes,values.manifestacoes),
            dt_transplante: testNull(response.data.dt_transplante,values.dt_transplante),
            orgao: testNull(response.data.orgao,values.orgao),
            transplantMedico: testNull(response.data.transplantMedico,values.transplantMedico),
            hospital: testNull(response.data.hospital,values.hospital),
            obitoData: testNull(response.data.obitoData,values.obitoData),
            obitoMotivo: testNull(response.data.obitoMotivo,values.obitoMotivo),
            desligamento: testNull(response.data.desligamento,values.desligamento),
            desligado: testNull(response.data.desligado,values.desligado),
            obsDesligamento: testNull(response.data.obsDesligamento,values.obsDesligamento),
            
            pessoaId: response.data.pessoa.id,
            paciId: response.data.id,
            dcId: response.data.pessoa.dadosCadastrais.id,   

            // twitterAcount: response.data.contact.twitterAcounttestNull(response.data.contact.twitterAcount:'',
            // assocId: response.data.id,
            // dcId: response.data.contact.id
        });
	}
    
	function getError(error){
		console.log(error)
    }
    const clickVoltar=()=>{
		props.nav.push(`/paci`);
    }
    function checkBoolBene(){
        if(values.beneficio){
            setBoolBene(true)
        }else{
            setBoolBene(false)
        }
    }
    function checkBoolGen(){
        if(values.dt_testGen){
            setBoolGen(true)
        }else{
            setBoolGen(false)
        }
    }
    function checkBoolTrans(){
        if(values.dt_transplante){
            setBoolTrans(true)
        }else{
            setBoolTrans(false)
        }
    }
    const clickAcompanhamentos=()=>{
		props.nav.push(`/paci/${values.paciId}/acomp`);
    }
    const clickAssociados=()=>{
		props.nav.push(`/paci/${values.paciId}/associado`);
    }
    
	return(
		<Container maxWidth='lg' style={{marginBottom:'20px'}}>
			<ThemeProvider theme={ConstantStyles.MainTheme}>
				<Box style={{display:'flex', flexFlow:'row nowrap',alignItems:'flex-start',marginTop:'50px',marginBottom:'25px',}}>
					<Typography style={ConstantStyles.ListMenu.title} variant="h6" noWrap>
						<Box fontWeight="fontWeightBold">
							{ConstantMessages.MessageTexts.MenuForm.B2}
						</Box>
					</Typography>
					<ConstantStyles.PacientesIcon color='secondary' style={ConstantStyles.ListMenu.icon}/>
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
						<Typography style={{fontFamily:'Realist',flexBasis:'95%',color:'white',}}>{props.nav.try?'EDITANDO PACIENTE':'CRIANDO PACIENTE'}</Typography>
						<Typography style={{fontFamily:'Realist',color:'white',}}>{'PACI0'+values.paciId}</Typography>
					</Paper>
				<Box style={{display:'flex',flexFlow:'column wrap',alignContent:'center',}}>					

					<Box style={{width:'90%',}}>

						<Box style={{display:'flex',flexFlow:'row nowrap',alignItems:'baseline',margin:'20px',marginBottom:'20px',}}>
							{/* <ConstantStyles.StyledTypographyBold>
								Logotipo:
							</ConstantStyles.StyledTypographyBold>
							<ConstantStyles.GreenButton style={{margin:'10px',padding:'5px 10px',}}>Enviar Imagem</ConstantStyles.GreenButton> */}
						</Box>
                        {props.nav.try?
                        <Box style={{display:'flex',flexFlow:'row nowrap',justifyContent:'center',marginBottom:'60px'}}>
                            <ButtonGroup variant="outlined" color="primary" size="large">
                                <Button variant="contained">Geral</Button>
                                <Button onClick={clickAcompanhamentos}>Acompanhamentos</Button>
                                <Button onClick={clickAssociados}>Associados</Button>
                            </ButtonGroup>
                        </Box>:<></>}

						<Grid container spacing={5} style={{width:'90%',justifyContent:'flex-end',}}>
							<LinhaCampo name={"Data de Filiação:"} xs={5} onChange={handleDateChange('dataAfiliacao')} date value={values.dataAfiliacao}/>
							<LinhaCampo name={"Data de Cadastro no Integra FC:"} xs={6} onChange={handleDateChange('dataCadastro')} date value={values.dataCadastro}/>
							<LinhaCampo name={"Responsável pelo Cadastro:"} need xs={11} onChange={handleChange('funcNome')} value={values.funcNome} maxLength={32}/>                            
                            <LinhaBoolCampo name={"Como chegou até a associação?"} xs={11} defaultString={'Encaminhamento Unidos pela Vida'} boolChange={handleValueChange} 
                            defaultName={'comoChegou'} onChange={handleChange('comoChegou')} value={values.comoChegou} maxLength={64}/>
							<LinhaCampo name={"Já possui laudo?"} multiline rows={3} xs={11} onChange={handleChange('laudo')} value={values.laudo} maxLength={128}/>
                            <div style={{marginBottom:'10px'}}/>
                            <LinhaCampo name={"Nome:"} need xs={11} onChange={handleChange('nome')} value={values.nome} maxLength={64}/>
                            <LinhaCampo name={"CPF:"} need xs={6} onChange={handleChange('cpf')} value={values.cpf} tipo={'cpf'} maxLength={11}/>
                            <LinhaCampo name={"RG:"} xs={5} onChange={handleChange('rg')} value={values.rg} tipo={'rg'} maxLength={9}/>
                            <LinhaCampo name={"Data de nascimento:"} need xs={5} onChange={handleDateChange('dataNascimento')} date value={values.dataNascimento}/>
                            <Grid item xs={6}><div style={{display:'flex',marginTop:'5px'}}>
                                <ConstantStyles.StyledTypographyBold>{"Idade:"}</ConstantStyles.StyledTypographyBold>
                                <ConstantStyles.StyledTypography>{Util.calculate_age(values.dataNascimento)}</ConstantStyles.StyledTypography>
                            </div> </Grid>
                            <LinhaCampo name={"Número do CNS (Cartão Nacional de Saúde):"} xs={11} onChange={handleChange('cns')} value={values.cns} tipo={'cns'} maxLength={15}/>
                            <LinhaMenuSexo name={"Sexo:"} xs={4} defaultName={'sexo'} onChange={handleValueChange} value={values.sexo} arr={['Masculino','Feminino']}/>
                            <LinhaMenu name={"Estado Civil:"} xs={7} defaultName={'estadoCivil'} onChange={handleValueChange} value={values.estadoCivil} arr={['Solteiro(a)','Casado(a)','Viúvo(a)']}/>
                            <LinhaCampo name={"Nome da mãe:"} need xs={11} onChange={handleChange('nomeMae')} value={values.nomeMae} maxLength={64}/>
                            <LinhaCampo name={"Nome do Pai:"} xs={11} onChange={handleChange('nomePai')} value={values.nomePai} maxLength={64}/>
                            <LinhaCampo name={"Profissão:"} xs={11} onChange={handleChange('profissao')} value={values.profissao} maxLength={34}/>
                            <LinhaCampo name={"CEP:"} xs={3} onChange={handleCEPChange('cep')} value={values.cep} tipo={'cep'} maxLength={8}/>
                            <LinhaCampo name={"Cidade:"} xs={5} onChange={handleChange('cidade')} value={values.cidade} maxLength={32}/>
                            <LinhaCampo name={"Estado:"} xs={3} onChange={handleChange('estado')} value={values.estado} maxLength={32}/>
                            <LinhaCampo name={"Endereço:"} xs={8} onChange={handleChange('endereco')} value={values.endereco} maxLength={64}/>
                            <LinhaCampo name={"Número:"} xs={3} onChange={handleChange('numero')} value={values.numero} tipo={'numero'} maxLength={8}/>                            
                            <LinhaCampo name={"Complemento:"} xs={7} onChange={handleChange('complemento')} value={values.complemento} maxLength={64}/>
                            <LinhaCampo name={"Bairro:"} xs={4} onChange={handleChange('bairro')} value={values.bairro} maxLength={64}/>
                            <LinhaCampo name={"Telefone:"} need xs={5} onChange={handleChange('telefone')} value={values.telefone} tipo={'tel'} maxLength={11}/>
                            <LinhaCampo name={"Telefone alternativo:"} xs={6} onChange={handleChange('telefone2')} value={values.telefone2} tipo={'tel'} maxLength={11}/>
                            <LinhaCampo name={"Contato de emergência:"} xs={5} onChange={handleChange('contatoEmerg')} value={values.contatoEmerg} tipo={'tel'} maxLength={11}/>
                            <LinhaCampo name={"Falar com:"} xs={6} onChange={handleChange('falarCom')} value={values.falarCom} maxLength={32}/>
                            <LinhaCampo name={"E-mail:"} xs={5} onChange={handleChange('email')} value={values.email} maxLength={64}/>
                            <LinhaCampo name={"E-mail alternativo:"} xs={6} onChange={handleChange('email2')} value={values.email2} maxLength={64}/>
                            <LinhaCampo name={"Facebook:"} xs={11} onChange={handleChange('facebookAcount')} value={values.facebookAcount} maxLength={64}/>
                            <LinhaCampo name={"Instagram:"} xs={11} onChange={handleChange('instagramAcount')} value={values.instagramAcount} maxLength={64}/>
                            <LinhaCampo name={"Twitter:"} xs={11} onChange={handleChange('twitterAcount')} value={values.twitterAcount} maxLength={64}/>                            
                            <LinhaSwitch name={"*Paciente Mora com os pais ou responsáveis?"} v={'Sim'} f={'Não'} xs={11} defaultName={'moraPais'} boolChange={handleValueChange} value={values.moraPais}/>
                            <LinhaMenuCampo name={"Com quem mora?"} outro xs={7} defaultName={'moraCom'} onChange={handleValueChange} value={values.moraCom} arr={['Sozinho(a)','Amigos','Namorado(a)','Cônjuge/Parceiro']} maxLength={32}/>
                            <LinhaCampo name={"Mora com quantas pessoas?"} xs={4} onChange={handleChange('moraQts')} value={values.moraQts} tipo={'int2'} maxLength={2}/>
                            <LinhaMenuRenda name={"Renda familiar:"} xs={6} defaultName={'renda'} onChange={handleValueChange} value={values.renda} arr={['até 1000,00','Entre 1000,01 e 3000,00','Entre 3000,01 e 5000,00','entre 5000,01 e 8000,00','Acima de 8000,01']}/>
                            <Grid item xs={5}><div style={{display:'flex',marginTop:'5px'}}>
                                <ConstantStyles.StyledTypographyBold>{"Renda per capita:"}</ConstantStyles.StyledTypographyBold>
                                <ConstantStyles.StyledTypography>{Util.calculate_renda(values.renda,values.moraQts)}</ConstantStyles.StyledTypography>
                            </div> </Grid>
                            {boolBene?
                            <>
                                <LinhaSwitch name={"Recebe benefícios?"} v={'Sim'} f={'Não'} xs={5} defaultName={'beneficio'} boolChange={handleBoolBeneChange} value={boolBene}/>
                                <LinhaMenuCampo name={"Quais?"} outro xs={6} defaultName={'beneficio'} onChange={handleValueChange} value={values.beneficio} arr={['Loas','Auxílio Doença','Aposentadoria por invalidez','Bolsa Família']} maxLength={32}/>
                            </>:
                                <LinhaSwitch name={"Recebe benefícios?"} v={'Sim'} f={'Não'} xs={11} defaultName={'beneficio'} boolChange={handleBoolBeneChange} value={boolBene}/>
                            }
                            <LinhaSwitch name={"Situação atual do diagnóstico:"} xs={11} v={'Confirmado'} f={'Em investigação'} defaultName={'situacaoDiagnostico'} boolChange={handleValueChange} value={values.situacaoDiagnostico}/>
                            {values.situacaoDiagnostico?
                                <>
                                <LinhaCampo name={"Data do diagnóstico:"} xs={11} onChange={handleDateChange('dt_diag')} date value={values.dt_diag}/>
                                <LinhaCampo name={"Centro de Tratamento Atual:"} xs={11} onChange={handleChange('centroTratamento')} value={values.centroTratamento} maxLength={32}/>
                                <LinhaCampo name={"Nome do médico responsável:"} xs={11} onChange={handleChange('diagMedico')} value={values.diagMedico} maxLength={32}/>
                                <LinhaMenuCampo name={"Especialidade:"} outro xs={11} defaultName={'diagMedicoEspec'} onChange={handleValueChange} value={values.diagMedicoEspec} arr={['Pneumologista','Gastroenteorologista','Endocrinologista','Geneticista']} maxLength={32}/>
                                <LinhaCampo name={"Teste do pezinho:"} xs={11} onChange={handleDateChange('dt_pezinho')} date value={values.dt_pezinho}/>
                                <LinhaCampo name={"Teste do suor:"} xs={11} onChange={handleDateChange('dt_suor')} date value={values.dt_suor}/>
                                <LinhaCampo name={"Local do teste do suor:"} xs={11} onChange={handleChange('localSuor')} value={values.localSuor} maxLength={32}/>
                                <LinhaCampo name={"Resultado do teste do suor:"} xs={11} onChange={handleChange('valorSuor')} value={values.valorSuor} maxLength={32}/>
                                    {boolGen?
                                    <>
                                        <LinhaSwitch name={"Tem exame genético?"} v={'Sim'} f={'Não'} xs={11} defaultName={'dt_testGen'} boolChange={handleBoolGenChange} value={boolGen}/>
                                        <LinhaCampo name={"Data da realização teste genético:"} xs={6} onChange={handleDateChange('dt_testGen')} date value={values.dt_testGen}/>
                                        <LinhaMenuCampo name={"Heterozigoto ou Homozigoto"} xs={5} defaultName={'alelos'} onChange={handleValueChange} value={values.alelos} arr={['Heterozigoto','Homozigoto']} maxLength={16}/>
                                        <LinhaMenuCampo name={"Mutação 1"} xs={4} outro defaultName={'mutacoes'} onChange={handleValueChange} value={values.mutacoes} arr={arrMutacao} maxLength={16}/>
                                        <LinhaMenuCampo name={"Mutação 2"} xs={7} outro defaultName={'mutacoes2'} onChange={handleValueChange} value={values.mutacoes2} arr={arrMutacao} maxLength={16}/>
                                    </>:
                                        <LinhaSwitch name={"Tem exame genético?"} v={'Sim'} f={'Não'} xs={11} defaultName={'dt_testGen'} boolChange={handleBoolGenChange} value={boolGen}/>}
                                <LinhaCampo name={"Manifestações clínicas mais comuns:"} multiline rows={4} xs={11} onChange={handleChange('manifestacoes')} value={values.manifestacoes} maxLength={128}/>
                                    {boolTrans?
                                    <>
                                        <LinhaSwitch name={"Já fez transplante?"} v={'Sim'} f={'Não'} xs={11} defaultName={'dt_transplante'} boolChange={handleBoolTransChange} value={boolTrans}/>
                                        <LinhaCampo name={"Data de transplante:"} xs={6} onChange={handleDateChange('dt_transplante')} date value={values.dt_transplante}/>                                
                                        <LinhaMenuCampo name={"Órgão transplantado:"} outro xs={5} defaultName={'orgao'} onChange={handleValueChange} value={values.orgao} arr={['Pulmão','Coração','Pâncreas','Fígado','Rim']} maxLength={16}/>
                                        <LinhaCampo name={"Nome do médico que realizou o transplante:"} xs={11} onChange={handleChange('transplantMedico')} value={values.transplantMedico} maxLength={128}/>
                                        <LinhaCampo name={"Hospital em que o transplante foi realizado:"} xs={11} onChange={handleChange('hospital')} value={values.hospital} maxLength={128}/>
                                    </>:
                                    <LinhaSwitch name={"Já fez transplante?"} v={'Sim'} f={'Não'} xs={11} defaultName={'dt_transplante'} boolChange={handleBoolTransChange} value={boolTrans}/>}                            
                                
                                <LinhaSwitch name={"Ativar desligamento:"} xs={11} defaultName={'desligado'} boolChange={handleBoolDesligChange} value={values.desligado}/>                      
                                
                                    {values.desligado?
                                    <>
                                        <LinhaMenuCampo name={"Motivo do desligamento:"} xs={11} defaultName={'desligamento'} onChange={handleValueChange} value={values.desligamento} arr={['Mudança de Cidade','Óbito']} maxLength={16}/>
                                        <LinhaCampo name={"Observações sobre o desligamento:"} xs={11} onChange={handleChange('obsDesligamento')} value={values.obsDesligamento} maxLength={32}/>
                                            {values.desligamento==='Óbito'?
                                            <>
                                            <LinhaCampo name={"Data do óbito:"} xs={5} onChange={handleDateChange('obitoData')} date value={values.obitoData}/>
                                            <LinhaMenuCampo name={"Motivo do óbito:"} outro xs={6} defaultName={'obitoMotivo'} onChange={handleValueChange} value={values.obitoMotivo} arr={['Causa respiratória ','Complicações do transplante','Causa gastrointestinal-hepática','Causa cardiovascular','Acidental ou violenta','Desconhecidas']} maxLength={16}/>
                                            </>
                                            :<></>}
                                    </>
                                    :<></>}
                                </>:<></>
                            }
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
function LinhaMenuRenda(props){
    const [anchorEl, setAnchorEl] = React.useState(null);
    const[state, setState]=React.useState({
		valueA: props.value,
    });
    useEffect(() => {
        setState({valueA:convertFull()});
    }, [props.value]);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

    function convertFull(){
        let setValue;
        if (props.value==='Renda1') {
            setValue='até 1000,00';
        }else if (props.value==='Renda2') {
            setValue='Entre 1000,01 e 3000,00';
        }else if (props.value==='Renda3') {
            setValue='Entre 3000,01 e 5000,00';
        }else if (props.value==='Renda4') {
            setValue='entre 5000,01 e 8000,00';
        }else if (props.value==='Renda5') {
            setValue='Acima de 8000,01';
        }else{
            setValue='______'
        }
        return setValue
    }
    function convertAbrev(value){
        let setValue;
        if (value==='até 1000,00') {
            setValue='Renda1';
        }else if (value==='Entre 1000,01 e 3000,00') {
            setValue='Renda2';
        }else if (value==='Entre 3000,01 e 5000,00') {
            setValue='Renda3';
        }else if (value==='entre 5000,01 e 8000,00') {
            setValue='Renda4';
        }else if (value==='Acima de 8000,01') {
            setValue='Renda5';
        }else{
            setValue='______'
        }
        return setValue
    }
    function handleSelection(value){
        console.log(value)
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

export default connect(null, { push })(EditPaci);