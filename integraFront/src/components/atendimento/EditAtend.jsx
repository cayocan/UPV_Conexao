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

class EditAtend extends Component{
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
    const [values, setValues] = React.useState({
        dataAtendimento: null,
        funcNome:'',
        comoChegou: '______',
        nome:'',
        cpf: '',
        rg: '',
        dataNascimento: null,
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
        
        tipo:'______',
        demanda:'______',
        local: '______',
		obs:'',

        pessoaId:'',
        atendId:'',
        dcId:'',
    });
    const [sendDados, setSendDados] = React.useState({        
        dados:{
            atendId:'',
            pessoa:{
                id:'',
                dadosCadastrais:{
                    id:''
                }
            },
        }
    });
    const listComoChegou =[
        'Facebook','Google','Indicação','Impressos','Televisão','Rádio','Whatsapp','Email','Telefone','Presencial','Formulário site'
    ];
    const listTipo =[
        'Pessoa com FC','Familiar de FC','Suspeita de FC','Profissional da Saúde','Estudante','Parceiro/Doador'
    ]
    const listDemanda =[
        'Informação sobre a FC','Informação sobre Tratamento','Informação sobre Diagnóstico','Informação sobre Direitos','Informação sobre Associações','Informações sobre Centro de Tratamento/Médicos'
    ]
    const listLocal =[
        'Facebook','Email','Whatsapp','Telefone','Presencial'
    ]
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
    
    function UpdateClicked(){
        // props.nav.try?
		IntegraServer.executeCreateAtend(values,sendDados)
			.then((response) => {
                handleSuccessfulResponse(response)
            }).catch((error) => handleError(error))
        // :IntegraServer.executeCreateAtend(values)
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
        // if(values.renda==='______'){
        //     values.renda=null
        // }
        if(values.dataAtendimento===null){
            setSnack({ mode:false,text:'Campo (Data do Atendimento) vazio.',status:true });
            return 
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
        /////////////////////////////////////
        if(values.tipo==='______'){
            setSnack({ mode:false,text:'Campo (Tipo) vazio.',status:true });
            return
        }
        if(values.demanda==='______'){
            setSnack({ mode:false,text:'Campo (Demanda) vazio.',status:true });
            return
        }
        if(values.local==='______'){
            setSnack({ mode:false,text:'Campo (Local do atendimento) vazio.',status:true });
            return
        }
        if(values.obs===''){
            setSnack({ mode:false,text:'Campo (Anotações sobre o atendimento) vazio.',status:true });
            return
        }
        UpdateClicked();     
    }

	function handleSuccessfulResponse(response) {
		console.log(response)
        setSnack({ mode:true,text:'Editado com Sucesso.',status:true });
        props.nav.push(`/atend`);
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
            dataAtendimento: props.nav.server.serverResponse.dataAtendimento,
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
            email: props.nav.server.serverResponse.pessoa.dadosCadastrais.email,
            email2:props.nav.server.serverResponse.pessoa.dadosCadastrais.email2,
            facebookAcount: props.nav.server.serverResponse.pessoa.dadosCadastrais.facebookAcount,
            instagramAcount: props.nav.server.serverResponse.pessoa.dadosCadastrais.instagramAcount,
            twitterAcount: props.nav.server.serverResponse.pessoa.dadosCadastrais.twitterAcount,
            
            tipo: props.nav.server.serverResponse.tipo,
            demanda: props.nav.server.serverResponse.demanda,
            local: props.nav.server.serverResponse.local,
            obs: props.nav.server.serverResponse.obs,

            pessoaId:props.nav.server.serverResponse.pessoa.id,
            atendId:props.nav.server.serverResponse.atendId,
            dcId:props.nav.server.serverResponse.pessoa.dadosCadastrais.id,                    
        });
        setSendDados({...sendDados,dados:{
            atendId: props.nav.server.serverResponse.atendId,
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
        IntegraServer.executeGetAtendByIdFromPath(window.location.pathname)
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
            dataAtendimento: testNull(response.data.dataAtendimento,values.dataAtendimento),
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
            email: testNull(response.data.pessoa.dadosCadastrais.email,values.email),
            email2: testNull(response.data.pessoa.dadosCadastrais.email2,values.email2),
            facebookAcount: testNull(response.data.pessoa.dadosCadastrais.facebookAcount,values.facebookAcount),
            instagramAcount: testNull(response.data.pessoa.dadosCadastrais.instagramAcount,values.instagramAcount),
            twitterAcount: testNull(response.data.pessoa.dadosCadastrais.twitterAcount,values.twitterAcount),

            tipo: testNull(response.data.tipo,values.tipo),
            demanda:testNull(response.data.demanda,values.demanda),
            local: testNull(response.data.local,values.local),
            obs: testNull(response.data.obs,values.obs),
            
            pessoaId: response.data.pessoa.id,
            atendId: response.data.atendId,
            dcId: response.data.pessoa.dadosCadastrais.id,   

            // twitterAcount: response.data.contact.twitterAcounttestNull(response.data.contact.twitterAcount:'',
            // assocId: response.data.id,
            // dcId: response.data.contact.id
        });
        setSendDados({...sendDados,dados:{
            atendId: testNull(response.data.atendId,''),
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
		props.nav.push(`/atend`);
    }
    
	return(
		<Container maxWidth='lg' style={{marginBottom:'20px'}}>
			<ThemeProvider theme={ConstantStyles.MainTheme}>
				<Box style={{display:'flex', flexFlow:'row nowrap',alignItems:'flex-start',marginTop:'50px',marginBottom:'25px',}}>
					<Typography style={ConstantStyles.ListMenu.title} variant="h6" noWrap>
						<Box fontWeight="fontWeightBold">
							{ConstantMessages.MessageTexts.MenuForm.B3}
						</Box>
					</Typography>
					<ConstantStyles.AtendimentosIcon color='secondary' style={ConstantStyles.ListMenu.icon}/>
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
						<Typography style={{fontFamily:'Realist',flexBasis:'95%',color:'white',}}>{props.nav.try?'EDITANDO ATENDIMENTO':'CRIANDO ATENDIMENTO'}</Typography>
						<Typography style={{fontFamily:'Realist',color:'white',}}>{'ATEND0'+values.atendId}</Typography>
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
							<LinhaCampo name={"Data do Atendimento:"} xs={11} onChange={handleDateChange('dataAtendimento')} date value={values.dataAtendimento}/>
							<LinhaCampo name={"Responsável pelo Atendimento:"} need xs={11} onChange={handleChange('funcNome')} value={values.funcNome} maxLength={32}/>                            
                            <LinhaMenuCampo name={"Como chegou até a associação?"} outro xs={11} defaultName={'comoChegou'} onChange={handleValueChange} value={values.comoChegou} arr={listComoChegou} maxLength={32}/>
                            <div style={{marginBottom:'10px'}}/>
                            <LinhaCampo name={"Nome:"} need xs={11} onChange={handleChange('nome')} value={values.nome} maxLength={64}/>
                            <LinhaCampo name={"CPF:"} need xs={6} onChange={handleChange('cpf')} value={values.cpf} tipo={'cpf'} maxLength={11}/>
                            <LinhaCampo name={"RG:"} xs={5} onChange={handleChange('rg')} value={values.rg} tipo={'rg'} maxLength={9}/>
                            <LinhaCampo name={"Data de nascimento:"} need xs={5} onChange={handleDateChange('dataNascimento')} date value={values.dataNascimento}/>
                            <Grid item xs={6}><div style={{display:'flex',marginTop:'5px'}}>
                                <ConstantStyles.StyledTypographyBold>{"Idade:"}</ConstantStyles.StyledTypographyBold>
                                <ConstantStyles.StyledTypography>{Util.calculate_age(values.dataNascimento)}</ConstantStyles.StyledTypography>
                            </div> </Grid>
                            <LinhaMenuSexo name={"Sexo:"} xs={11} defaultName={'sexo'} onChange={handleValueChange} value={values.sexo} arr={['Masculino','Feminino']}/>

                            <LinhaMenuCampo style={{marginBottom:'20px',}} name={"Tipo:"} outro xs={11} defaultName={'tipo'} onChange={handleValueChange} value={values.tipo} arr={listTipo} maxLength={32}/>
                            <LinhaMenuCampo style={{marginBottom:'20px',}} name={"Demanda:"} outro xs={11} defaultName={'demanda'} onChange={handleValueChange} value={values.demanda} arr={listDemanda} maxLength={32}/>
                            <LinhaMenuCampo style={{marginBottom:'20px',}} name={"Local do atendimento:"} outro xs={11} defaultName={'local'} onChange={handleValueChange} value={values.local} arr={listLocal} maxLength={32}/>
                            <LinhaCampo style={{marginBottom:'20px',}} name={"Anotações sobre o atendimento:"} multiline rows={3} xs={11} onChange={handleChange('obs')} value={values.obs} maxLength={128}/> 

                            <LinhaCampo name={"Nome da mãe:"} need xs={11} onChange={handleChange('nomeMae')} value={values.nomeMae} maxLength={64}/>
                            <LinhaCampo name={"Nome do Pai:"} xs={11} onChange={handleChange('nomePai')} value={values.nomePai} maxLength={64}/>
                            <LinhaCampo name={"CEP:"} xs={3} onChange={handleCEPChange('cep')} value={values.cep} tipo={'cep'} maxLength={8}/>
                            <LinhaCampo name={"Cidade:"} xs={5} onChange={handleChange('cidade')} value={values.cidade} maxLength={32}/>
                            <LinhaCampo name={"Estado:"} xs={3} onChange={handleChange('estado')} value={values.estado} maxLength={32}/>
                            <LinhaCampo name={"Endereço:"} xs={8} onChange={handleChange('endereco')} value={values.endereco} maxLength={64}/>
                            <LinhaCampo name={"Número:"} xs={3} onChange={handleChange('numero')} value={values.numero} tipo={'numero'} maxLength={8}/>                            
                            <LinhaCampo name={"Complemento:"} xs={7} onChange={handleChange('complemento')} value={values.complemento} maxLength={64}/>
                            <LinhaCampo name={"Bairro:"} xs={4} onChange={handleChange('bairro')} value={values.bairro} maxLength={64}/>
                            <LinhaCampo name={"Telefone:"} need xs={5} onChange={handleChange('telefone')} value={values.telefone} tipo={'tel'} maxLength={11}/>
                            <LinhaCampo name={"Telefone alternativo:"} xs={6} onChange={handleChange('telefone2')} value={values.telefone2} tipo={'tel'} maxLength={11}/>
                            <LinhaCampo name={"E-mail:"} xs={5} onChange={handleChange('email')} value={values.email} maxLength={64}/>
                            <LinhaCampo name={"E-mail alternativo:"} xs={6} onChange={handleChange('email2')} value={values.email2} maxLength={64}/>
                            <LinhaCampo name={"Facebook:"} xs={11} onChange={handleChange('facebookAcount')} value={values.facebookAcount} maxLength={64}/>
                            <LinhaCampo name={"Instagram:"} xs={11} onChange={handleChange('instagramAcount')} value={values.instagramAcount} maxLength={64}/>
                            <LinhaCampo name={"Twitter:"} xs={11} onChange={handleChange('twitterAcount')} value={values.twitterAcount} maxLength={64}/>
                            <LinhaSwitch name={"Situação atual do diagnóstico:"} xs={11} v={'Confirmado'} f={'Em investigação'} defaultName={'situacaoDiagnostico'} boolChange={handleValueChange} value={values.situacaoDiagnostico}/>

                            {/* <LinhaSwitch name={"*Paciente Mora com os pais ou responsáveis?"} v={'Sim'} f={'Não'} xs={11} defaultName={'moraPais'} boolChange={handleValueChange} value={values.moraPais}/>
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
                            } */}
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

export default connect(null, { push })(EditAtend);