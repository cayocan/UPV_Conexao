import React,{Component, useEffect} from 'react'
import * as ConstantStyles from '../constants/ConstantStyles'
import * as ConstantCLass from '../constants/ConstantCLass'
import * as ConstantMessages from '../constants/ConstantMessages'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { push } from 'connected-react-router'
import { connect } from 'react-redux';
import IntegraServer from './IntegraServer'

import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { ThemeProvider } from '@material-ui/styles';

function RenderLogin (props) {


	const classes = ConstantStyles.useStyles();
	const [open, setOpen] = React.useState(false);
	const [openDialog, setOpenDialog] = React.useState(false);
	const [values, setValues] = React.useState({
		username: '',
		password:'',
		hasLoginFailed:false,
		showSucessMessage:false,
		newPassord:false
	  });
	const [emailValues,setEmailValues]=React.useState({		
		emailSend:false,
		emailError:false
	});
	const [campos,setCampos]=React.useState({		
		erroEmail:false,
		erroSenha:false,
		erroNovaSenha:false,
		erroSenhaDiferente:false,
		erroServer:false,
	});
	  const handleChange = name => event => {
		setValues({ ...values, [name]: event.target.value });
		//console.log(values);
	  };

	function loginClicked(){
		IntegraServer.executeJwtAuthenticationService(values.username,values.password)
			.then((response) => {
				IntegraServer.registerSuccessfulLoginForJwt(response.data.token)
				handleSuccessfulResponse(response)
			}).catch((error) => handleError(error))
	}

	function handleSuccessfulResponse(response) {
		//console.log('Sucess');
		//console.log(response)		
		setValues({...values, showSucessMessage:true, hasLoginFailed:false});
		//setOpen(true);			
		//ShowLoginSucessMessage(values);
		checkToProceed();
	}
	function checkToProceed(){
		if(IntegraServer.getCurrentUserDecoded().user.resetPassword===false){
			props.nav.push(`/home/`);
		}else{
			setValues({ ...values, newPassord: true});
			//console.log(values);
			handleClickOpenDialog();
		}
	}

	function handleError(error) {
		//console.log('Failed');
		setOpen(true);
        let errorMessage = '';

        if (error.message)
            errorMessage += error.message

        if (error.response && error.response.data) {
            errorMessage += error.response.data.message
		}

		console.log(errorMessage)	
		
		setValues({...values,showSucessMessage:false,hasLoginFailed:true});			
		//ShowInvalidCredentials(values);
    }	
	function handleClose(event, reason) {
		if (reason === 'clickaway') {
			return;
		}		
		setOpen(false);
	}
	function resetValues(){
		setValues({ ...values, showSucessMessage: false});
		setEmailValues({ ...emailValues, emailSend: false, emailError: false});
		setCampos({ ...campos, erroEmail: false, erroSenha: false, erroNovaSenha: false, erroSenhaDiferente: false, erroServer: false});
	}

	function MySnackbarContentWrapper(props) {
		const { message, variant } = props;

		return (
			<>
				<SnackbarContent
				className={classes[variant]}
				message={message}
				style={{fontFamily:'Realist',}}
				/>
			</>
		);
	}
	const handleClickOpenDialog = () => {
		setOpenDialog(true);
	};
	const handleCloseDialog = () => {
		setOpenDialog(false);
		setValues({ ...values, newPassord: false});
	};

	return(
		<div style={{
			display:'flex',
			margin:'10px',
			flexFlow:'row wrap',
			justifyContent: 'center',
			}}>
			<div style={{
				flex:'1',
			}}>				
			</div>
			<div style={ConstantStyles.mainContainer}>
				<img src={ConstantCLass.Img.LogoIntegra} style={ConstantStyles.logo1} alt="logo"/>
				<ConstantStyles.StyledTextField
					id="email-input"
					label={ConstantMessages.MessageTexts.LoginMessages.UsernameField}
					type="email"
					name="username"
					className={classes.textField}
					value={values.email}
					onChange={handleChange('username')}
					autoComplete="email"
					margin="normal"
					variant="outlined"
					style={{fontFamily:'Realist',}}
				/>
				<ConstantStyles.StyledTextField
					id="password-input"
					label={ConstantMessages.MessageTexts.LoginMessages.PasswordField}
					type="password"
					name="password"
					className={classes.textField}
					value={values.password}
					onChange={handleChange('password')}
					onKeyDown={e=>{if(e.key === 'Enter'){loginClicked();}}}
					autoComplete="current-password"
					margin="normal"
					variant="outlined"
					style={{fontFamily:'Realist',}}
				/>
				<Button className={classes.btnForgotPassword} onClick={handleClickOpenDialog}>{ConstantMessages.MessageTexts.LoginMessages.ForgotPassword}</Button>
				<ConstantStyles.StyledButton style={{fontFamily:'Realist',}} onClick={()=>loginClicked()}>{ConstantMessages.MessageTexts.LoginMessages.LoginBtn}</ConstantStyles.StyledButton>
				<Button className={classes.btnTerms}>{ConstantMessages.MessageTexts.LoginMessages.PrivacyPolicy}</Button>			
			</div>
			<div style={{
				display:'flex',
				justifyContent:'flex-end',
				alignContent:'flex-end',
				flex:'1',
				flexFlow: 'row wrap',
				padding:'2%',
				/*
				margin:'10px',
				flexDirection:'row',
				justifyContent:'flex-end',
				*/
				}}>
				<font color={ConstantCLass.Colors.purple }><b>{ConstantMessages.MessageTexts.LoginMessages.MadeBy}</b></font>
				<div style={{
					display:'flex',
					justifyContent:'flex-end',
				}}>
					<img src={ConstantCLass.Img.LogoUnidos} style={ConstantStyles.logo2} alt="logo"/>
					<img src={ConstantCLass.Img.LogoDL} style={ConstantStyles.logo2} alt="logo"/>
				</div>
			</div>
			<Snackbar
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				open={open}
				onExited={resetValues}
				autoHideDuration={1500}
				onClose={handleClose}
				style={{fontFamily:'Realist',}}		
				>
					{values.showSucessMessage?
					<MySnackbarContentWrapper resetVar={values.showSucessMessage} variant='successSnackBar'	message={ConstantMessages.MessageTexts.LoginMessages.LoginSucessMessage}/>:
					emailValues.emailSend?
					<MySnackbarContentWrapper resetVar={values.emailSend} variant='successSnackBar'	message={'Senha temporária enviada.'}/>:
					emailValues.emailError?
					<MySnackbarContentWrapper resetVar={values.emailError} variant='errorSnackBar'	message={'Email não encontrado.'}/>:
					campos.erroEmail?
					<MySnackbarContentWrapper resetVar={campos.erroEmail} variant='errorSnackBar'	message={'Campo (E-mail) vazio.'}/>:
					campos.erroSenha?
					<MySnackbarContentWrapper resetVar={campos.erroSenha} variant='errorSnackBar'	message={'Campo (Senha) vazio.'}/>:
					campos.erroNovaSenha?
					<MySnackbarContentWrapper resetVar={campos.erroNovaSenha} variant='errorSnackBar'	message={'Campo (Repetir Senha) vazio.'}/>:
					campos.erroSenhaDiferente?
					<MySnackbarContentWrapper resetVar={campos.erroSenhaDiferente} variant='errorSnackBar'	message={'As senhas não são iguais.'}/>:
					campos.erroServer?
					<MySnackbarContentWrapper resetVar={campos.erroServer} variant='errorSnackBar'	message={'Erro de conexão com o servidor.'}/>:
					<MySnackbarContentWrapper variant='errorSnackBar' message={ConstantMessages.MessageTexts.LoginMessages.LoginFailed}/>
					}
			</Snackbar>

			<Dialog fullWidth maxWidth={'md'} open={openDialog} onClose={handleCloseDialog}>
					{values.newPassord?
					<NovaSenhaDialog nav={props.nav} setSnackOpen={setOpen} handleClose={handleCloseDialog} emailValues={emailValues} campos={campos}/>
					:<EsqueceuSenhaDialog setSnackOpen={setOpen} handleClose={handleCloseDialog} emailValues={emailValues} campos={campos}/>}					
			</Dialog>
		</div>		
	);
	
};

class LoginComponent extends Component{	
	constructor(props){
		super(props)
		
	}


	render(){
		return(
			<>
				<ThemeProvider theme={ConstantStyles.MainTheme}>
					<RenderLogin nav={this.props}/>
				</ThemeProvider>
			</>
		)
	}
}

function EsqueceuSenhaDialog(props){
	const[values,setValues]=React.useState({
		email: '',
		loading: false,
	});
	const [snack, setSnack] = React.useState({
        mode:false,
        text:'',
        status:false
    });
	const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
        //console.log(values);
    };
	function checkFields(){
		//console.log(values)
		if(values.email===''){
			props.setSnackOpen(true);
			props.campos.erroEmail=true;
            //setSnack({ mode:false,text:'Campo (E-mail) vazio.',status:true });
            return 
        }       
        SendData();     
	}
	function SendData(){
		//props.nav.try?
		//console.log(props)
		setValues({ ...values, loading: true});
		IntegraServer.executeResetPassword(values)
			.then((response) => {
                handleSuccessfulResponse(response)
            }).catch((error) => handleError(error))
        // :IntegraServer.executeCreatePaci(values)
        // .then((response) => {
        //     handleSuccessfulResponse(response)
        // }).catch((error) => handleError(error))
	};
	function handleSuccessfulResponse(response) {
		//console.log(response)
		props.setSnackOpen(true);
		if(response.data){
			props.emailValues.emailSend=true;
		}else{
			props.emailValues.emailError=true;
		}

		//setSnack({ mode:true,text:'E-mail enviado com Sucesso.',status:true });
		setValues({ ...values, loading: false});
		props.handleClose();
	};
	function handleError(error) {
		props.setSnackOpen(true);

		props.emailValues.emailError=true;

		//setValues({ ...values, loading: false});
        //console.log(error.response)
        let errorMessage = '';

        // if (error.response.data) {
        //     errorMessage += error.response.data
        // }

        // if (error.response.data && error.response.data.message) {
        //     errorMessage = error.response.data.message
        // }
        //console.log(errorMessage)
        
        setSnack({ mode:false,text:errorMessage,status:true });
    }

	return(
		<Box>
			<DialogTitle>
				{'Senha Temporária'}
			</DialogTitle>

			<DialogContentText style={{marginLeft:'50px'}}>
				{'Enviaremos uma senha temporária para o email cadastrado, para que possa recuperar o acesso a sua conta.'}
			</DialogContentText>

			<DialogContent style={{}}>
				<LinhaCampo style={{marginBottom:'20px',}} name={"E-mail:"} loading={values.loading} xs={11} onChange={handleChange('email')} value={values.email} maxLength={32}/>				
			</DialogContent>
            
			<DialogActions style={{justifyContent:'center'}}>
				<ConstantStyles.GreenButton onClick={props.handleClose}>Cancelar</ConstantStyles.GreenButton>
				<ConstantStyles.GreenButton style={{marginLeft:'50px'}} onClick={checkFields}>Enviar</ConstantStyles.GreenButton>				
			</DialogActions>
		</Box>
	);
}
function NovaSenhaDialog(props){
	const[values,setValues]=React.useState({
		senha: '',
		novaSenha:'',
		loading: false,
	});
	const [snack, setSnack] = React.useState({
        mode:false,
        text:'',
        status:false
    });
	const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
        //console.log(values);
	};

	function checkFields(){
		// console.log(values)
		// console.log(props.campos)
		if(values.senha===''){
			props.setSnackOpen(true);
			// props.campos.erroEmail=false;
			props.campos.erroSenha=true;
			// props.campos.erroNovaSenha=false;			
			// props.campos.erroSenhaDiferente=false;
			// props.campos.erroServer=false;
			// props.emailValues.emailSend=false;
			// props.emailValues.emailError=false;
            return 
		}
		if(values.novaSenha===''){
			props.setSnackOpen(true);
			// props.campos.erroEmail=false;
			// props.campos.erroSenha=false;
			props.campos.erroNovaSenha=true;			
			// props.campos.erroSenhaDiferente=false;
			// props.campos.erroServer=false;
			// props.emailValues.emailSend=false;
			// props.emailValues.emailError=false;
            return 
		}
		if(values.senha!==values.novaSenha){
			props.setSnackOpen(true);
			// props.campos.erroEmail=false;
			// props.campos.erroSenha=false;
			// props.campos.erroNovaSenha=false;			
			props.campos.erroSenhaDiferente=true;
			// props.campos.erroServer=false;
			// props.emailValues.emailSend=false;
			// props.emailValues.emailError=false;
            return 
		}
        SendData();     
	}
	function SendData(){
		//props.nav.try?
		//console.log(props)
		//setValues({ ...values, loading: true});
		IntegraServer.executeChangePassword(values)
			.then((response) => {
                handleSuccessfulResponse(response)
            }).catch((error) => handleError(error))
        // :IntegraServer.executeCreatePaci(values)
        // .then((response) => {
        //     handleSuccessfulResponse(response)
        // }).catch((error) => handleError(error))
	};
	function handleSuccessfulResponse(response) {
		//console.log(response)

		//setSnack({ mode:true,text:'E-mail enviado com Sucesso.',status:true });
		setValues({ ...values, loading: false});
		props.handleClose();

		if(response.data){
			props.nav.push(`/home/`);
		}else{
			props.setSnackOpen(true);
			// props.campos.erroEmail=false;
			// props.campos.erroSenha=false;
			// props.campos.erroNovaSenha=false;			
			// props.campos.erroSenhaDiferente=true;
			props.campos.erroServer=true;
		}
	};
	function handleError(error) {
		props.setSnackOpen(true);

		// props.campos.erroEmail=false;
		// props.campos.erroSenha=false;
		// props.campos.erroNovaSenha=false;			
		// props.campos.erroSenhaDiferente=true;
		props.campos.erroServer=true;

		//setValues({ ...values, loading: false});
        //console.log(error.response)
        let errorMessage = '';

        // if (error.response.data) {
        //     errorMessage += error.response.data
        // }

        // if (error.response.data && error.response.data.message) {
        //     errorMessage = error.response.data.message
        // }
        //console.log(errorMessage)
        
        setSnack({ mode:false,text:errorMessage,status:true });
    }
	return(
		<Box>
			<DialogTitle>
				{'Cadastrar Nova Senha'}
			</DialogTitle>

			<DialogContentText style={{marginLeft:'50px'}}>
				{'Você conectou com uma senha temporária, por favor defina agora uma nova senha para prosseguir.'}
			</DialogContentText>

			<DialogContent style={{}}>
				<LinhaCampo style={{marginBottom:'20px',}} type={"password"} name={"Senha:"} xs={11} onChange={handleChange('senha')} value={values.senha} maxLength={32}/>
				<LinhaCampo style={{marginBottom:'20px',}} type={"password"} name={"Repetir Senha:"} xs={11} onChange={handleChange('novaSenha')} value={values.novaSenha} maxLength={32}/>			
			</DialogContent>
            
			<DialogActions style={{justifyContent:'center'}}>
				{/* <ConstantStyles.GreenButton onClick={props.handleClose}>Cancelar</ConstantStyles.GreenButton> */}
				<ConstantStyles.GreenButton onClick={checkFields}>Salvar</ConstantStyles.GreenButton>				
			</DialogActions>
		</Box>
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
        //return date;
    }

    useEffect(() => {
        setConstDate({dateA:props.value});
    }, [props.value]);

	return(
		<Grid item xs={props.xs}>
			<Box {...props.style} style={{display:'flex',flexFlow:'row nowrap',alignItems:'center',}}>
				<ConstantStyles.StyledTypographyBold>
					{props.need?'*'+props.name:props.name}
				</ConstantStyles.StyledTypographyBold>
                
                <ConstantStyles.TextFieldCampo value={props.value} multiline={props.multiline} rows={props.rows} style={{flex:'2',marginLeft:'5px'}} 
                    onChange={props.onChange} inputProps={{maxLength:props.maxLength}} type={props.type?props.type:null}/>

				<Box>
					{props.loading?<CircularProgress color='secondary' style={{marginLeft:'30px'}}/>:<div style={{width:'70px',height:'44px'}}></div>}
				</Box>			         		
			</Box>
		</Grid>
	);
}
export default connect(null, { push })(LoginComponent);