import React,{Component,useEffect} from 'react'
import * as ConstantStyles from '../../constants/ConstantStyles'
import * as ConstantCLass from '../../constants/ConstantCLass'
import * as ConstantMessages from '../../constants/ConstantMessages'
import IntegraServer from '../IntegraServer.js'
import HeaderComponentExport from '../utility/HeaderComponent'
import TextMaskCustom from '../utility/TextMaskCustom'
import SnackComponent from '../utility/SnackComponent'

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/styles';

import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';

import { push } from 'connected-react-router'
import { connect } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';

import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import { ptBR } from 'date-fns/locale'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

class DoacaoApoia extends Component{
	constructor(props){
		super(props)
		//console.log(props);
		this.state = {
			serverResponse: [],
			loading: true
        }
	}

	componentDidMount(){	
        //this.setState({loading:false})
        this.requestServer();
	}
	requestServer(){
		IntegraServer.executeGetDoacaoById(window.location.pathname)
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
	const [snack, setSnack] = React.useState({
        mode:false,
        text:'',
        status:false
	});
	const[refresh,setRefresh]=React.useState(false);
	const[state,setState]=React.useState({
        dados:props.state.serverResponse,
        urlId:window.location.pathname.split("/").slice(-2)[0],
		loading:false
	});
	const[chamada,setChamada]=React.useState('Doação');
    /*const associadosTypes=[
        'Doado','Recebido','Entrada','Desligamento'
    ]
    const associadosTypesText=[
        'Contribuição','Doações realizadas para o paciente','Entrada de Doações','Desligamento'
    ]*/	
	function handleSucessfulResponse(response){
		console.log(response.data)
		setState({...state, dados:response.data})
	}
	function handleError(error){
		// console.log(error.response)        
        setSnack({ mode:false,text:'Erro ao comunicar com o servidor.',status:true });
    }

    useEffect(() => {
        setState({...state,dados:props.state.serverResponse});
    }, [props.state.serverResponse]);

	const backToApoia=()=>{
		props.nav.push(`/apoia/`);
	}
	const createApoia = () => {
		props.nav.push(`/apoia/create`);
    }
    
    const clickGeral=()=>{
		props.nav.push(`/apoia/${state.urlId}`);
    }
    const clickDoacao=()=>{
		props.nav.push(`/apoia/${state.urlId}/doacoes`);
    }
    const clickContatos=()=>{
		props.nav.push(`/apoia/${state.urlId}/contatos`);
	}
    /*const clickAcompanhamentos=()=>{
		props.nav.push(`/paci/${state.urlId}/acomp`);
	}*/
	/////////////////////////////////
	
	///////////////////////////////////
	const [openDialog, setOpenDialog] = React.useState(false);

	const handleClickOpenDialog = () => {
		setOpenDialog(true);
	};
	const handleCloseDialog = () => {
		setOpenDialog(false);
	};

	function handleRefresh(){
		//console.log('Refresh')
		handleCloseDialog()		
		IntegraServer.executeGetDoacaoById(state.urlId)
			.then((response) => {				
				handleSucessfulResponse(response)
			}).catch((error) => handleError(error))
	};
	

	function checkAcompSelected(parentState){
		
		return <NovaDoacaoDialog parentState={parentState} handleClose={handleCloseDialog} apoiaId={state.urlId} handleRefresh={handleRefresh}/>
	}

	return(
		<Container maxWidth='lg'>
				<Box style={{display:'flex', flexFlow:'row nowrap',alignItems:'flex-start',marginTop:'50px',marginBottom:'25px',}}>
					<Typography style={ConstantStyles.ListMenu.title} variant="h6" noWrap>
						<Box fontWeight="fontWeightBold">
							{ConstantMessages.MessageTexts.MenuForm.B4}
						</Box>
					</Typography>
					<ConstantStyles.ApoiadoresIcon color='secondary' style={ConstantStyles.ListMenu.icon}/>
				</Box>
				<Box style={{display:'flex',flexFlow:'row nowrap',justifyContent:'space-between'}}>
					<Box>
						<ConstantStyles.GreenButton onClick={backToApoia} >Voltar</ConstantStyles.GreenButton>	
						{/* <ConstantStyles.GreenButton onClick={createPaci} style={{marginLeft:'20px'}}>Novo Paciente</ConstantStyles.GreenButton> */}
					</Box>
				</Box>

                <Paper style={{
						background:[ConstantCLass.Colors.panelSummary],
						borderRadius: 10,
						display:'flex',
						flexFlow:'row nowrap',
						padding:'7px',
                        marginTop:'50px',
                        marginBottom:'50px'
						}}>
						<Typography style={{fontFamily:'Realist',flexBasis:'95%',color:'white',}}>{'DOAÇÕES'}</Typography>
						{<Typography style={{fontFamily:'Realist',color:'white',}}>{'APO0'+state.urlId}</Typography>}
					</Paper>

                <Box style={{display:'flex',flexFlow:'row nowrap',justifyContent:'center',marginBottom:'60px'}}>
                    <ButtonGroup variant="outlined" color="primary" size="large">
                        <Button onClick={clickGeral}>Geral</Button>
                        <Button variant="contained">Doações</Button>
                        <Button onClick={clickContatos} >Contatos</Button>
                    </ButtonGroup>
                </Box>

                <Box style={{display:'flex',flexFlow:'row nowrap',justifyContent:'space-between',alignItems:'center',marginBottom:'20px',height:'60px'}}>
					<Box>
						{//chamada!=''?
						<ConstantStyles.GreenButton onClick={handleClickOpenDialog} >Nova Doação</ConstantStyles.GreenButton>//:
                        /*<></>*/}												
					</Box>					
					{/*<Box style={{display:'flex',flexFlow:'row nowrap',alignItems:'center'}}>
						{state.loading?<CircularProgress color='primary' style={{marginRight:'10px'}}/>:<></>}                        
						<LinhaMenu name={"Tipo:"} xs={12} defaultName={'chamada'} onChange={handleValueChange} value={'______________'} arr={associadosTypesText} maxLength={16}/>
					</Box>*/}                    
                </Box>

				{<Dialog fullWidth maxWidth={'md'} open={openDialog} onClose={handleCloseDialog}>
					{checkAcompSelected(chamada)}
				</Dialog>}
                
				<Box style={{marginTop:'20px',marginBottom:'200px'}}>
					{
						//console.log(props),
						//props passados da tela anterior
						//props.nav.server.serverResponse
						// props.state.serverResponse
						state.dados					
						.map(obj=>
							<div key={obj.id}>
								<ExpansionPanelList obj={obj} nav={props.nav} parentState={chamada} handleRefresh={handleRefresh}/>
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
	const [openDialog, setOpenDialog] = React.useState(false);

	function executeGetContatoById(id){
		IntegraServer.executeGetContatoById(id)
			.then((response) => {				
				handleSucessfulResponse(response,id)
			}).catch((error) => handleError(error))				
	}

	function handleSucessfulResponse(response,id){
		//console.log(response);		
		//Mandando reposta para a proxima tela por props
		props.nav.server.serverResponse = response.data;
		//console.log(props.nav.server.serverResponse);
		props.nav.push(`/apoia/${id}/contatos`);
	}
	function handleError(error){
		console.log(error)
		setSnack({ mode:false,text:'Erro de conexão com o servidor.',status:true });
	}

	const handleClickOpenDialog = () => {
		setOpenDialog(true);
	};
	const handleCloseDialog = () => {
		setOpenDialog(false);
	};

	const clickAssoc = (id) => {
		props.nav.push(`/apoia/${id}`);
	}
	const editAssoc = (id) => {
		//executeGetAssocById(id);
		props.nav.push(`/apoia/contato`);
	}
	function checkAcompSelected(parentState,dados){
		return <NovaDoacaoDialog dados={dados} parentState={parentState} handleClose={handleCloseDialog} handleRefresh={props.handleRefresh}/>
	}
	

	return(
		// <CircularProgress />
		<ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')} style={{boxShadow:'none',marginBottom:'10px'}}>
			<ConstantStyles.StyledPanelSummary>
				<Typography style={{fontFamily:'Realist',flexBasis:'95%',color:'white',}}>{'Registrado por '+props.obj.funcNome}</Typography>
				{<Typography style={{fontFamily:'Realist',color:'white',}}>{'DOA0'+props.obj.id}</Typography>}
			</ConstantStyles.StyledPanelSummary>
			<ConstantStyles.StyledPanelDetails>
				{/*<Box style={{width:'90%',}}>
					{checkDetails(props.parentState,props.obj)}
				</Box>*/}
                
                <DialogContent>
                    <LinhaInfo style={{marginTop:'10px'}} name={"Valor:"} data={props.obj.valor}/>
                    <LinhaInfo style={{marginTop:'10px'}} name={"Forma:"} data={props.obj.forma}/>
                    <LinhaInfo style={{marginTop:'10px'}} name={"Periodicidade:"} data={props.obj.periodicidade}/>
			    </DialogContent>

				<Box style={{display:'flex',flexFlow:'row nowrap',alignItems:'flex-end',}}>
					<ConstantStyles.GreenButton style={{padding:'5px 40px',}} onClick={handleClickOpenDialog}>{'Editar'}</ConstantStyles.GreenButton>
				</Box>
				{<Dialog fullWidth maxWidth={'md'} open={openDialog} onClose={handleCloseDialog}>
					{checkAcompSelected(props.parentState,props.obj)}
				</Dialog>}
			</ConstantStyles.StyledPanelDetails>
		</ExpansionPanel>
	);
}

function LinhaInfo(props){

	return(
		<Box {...props.style} style={{display:'flex',flexFlow:'row nowrap',}}>
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
        //console.log(value);                
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
			<Box {...props.style} style={{display:'flex',flexFlow:'row nowrap',alignItems:'center',}}>
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
			<Box {...props.style} style={{display:'flex',flexFlow:'row nowrap',alignItems:'baseline',}}>
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
			</Box>
		</Grid>
	);
}
function LinhaCampoMoney(props){
    const[constDate, setConstDate]=React.useState({
         dateA: null
    });
    function handleOnChange(e){        
        props.onChange(props.defaultName,e.target.value);
    };    

    useEffect(() => {
        setConstDate({dateA:props.value});
    }, [props.value]);

	return(
		<Grid item xs={props.xs}>
			<Box {...props.style} style={{display:'flex',flexFlow:'row nowrap',alignItems:'baseline',}}>
				<ConstantStyles.StyledTypographyBold>
					{props.need?'*'+props.name:props.name}
				</ConstantStyles.StyledTypographyBold>
                {<ConstantStyles.TextFieldCampo value={props.value} multiline={props.multiline} rows={props.rows} style={{flex:'2',marginLeft:'5px'}} 
                    onChange={e=>handleOnChange(e)} inputComponent={TextMaskCustom} id={'money'}/>}		
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
			<Box {...props.style} style={{display:'flex',flexFlow:'row nowrap',alignItems:'baseline',}}>
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

function NovaDoacaoDialog(props){
	const[values,setValues]=React.useState({
        funcNome: '',
		forma:'______',
        periodicidade:'______',
        valor: '',
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
    const handleValueChange = (name,valor) => {
        setValues({ ...values, [name]: valor });
        //console.log(values);
    };
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
	function checkFields(){
		//console.log(values)
		if(values.funcNome===null){
            setSnack({ mode:false,text:'Campo (Responsável pelo contato) vazio.',status:true });
            return 
        }
        if(values.forma==='______'){
            setSnack({ mode:false,text:'Campo (Forma) vazio.',status:true });
            return 
        }
        if(values.periodicidade ==='______'){
            setSnack({ mode:false,text:'Campo (Periodicidade) vazio.',status:true });
            return
        }
        if(values.valor===''){
            setSnack({ mode:false,text:'Campo (Valor) vazio.',status:true });
            return
        }       
        SendData();     
	}
	function SendData(){
		//props.nav.try?
		//console.log(props)
		IntegraServer.executeCreateApoiaDoacao(values,props)
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
		setSnack({ mode:true,text:'Editado com Sucesso.',status:true });
		props.handleClose();
		props.handleRefresh();
	};
	function handleError(error) {
        //console.log(error.response)
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
	useEffect(() => {
		//console.log("useEffect");
		if(props.dados){
			setValues({ ...values, forma:props.dados.forma, funcNome:props.dados.funcNome, periodicidade:props.dados.periodicidade, valor:props.dados.valor});
		}		
    }, [props.dados]);

	return(
		<Box>
			<SnackComponent snackData={snack}/>
			<DialogTitle>
				{props.parentState+':'}
			</DialogTitle>

			<DialogContent>
				<LinhaCampo style={{marginBottom:'20px',}} name={"Registrado por:"} xs={11} onChange={handleChange('funcNome')} value={values.funcNome} maxLength={32}/>
				<LinhaCampoMoney style={{marginBottom:'20px',}} name={"Valor:"} xs={11} defaultName={'valor'} onChange={handleValueChange} value={values.valor} maxLength={20}/>
				<LinhaMenuCampo style={{marginBottom:'20px',}} name={"Forma:"} outro xs={11} defaultName={'forma'} onChange={handleValueChange} value={values.forma} arr={['Conta Corrente','Cartão de Crédito','Boleto','Patrocínio Projetos','Eventos Beneficentes']} maxLength={32}/>
				<LinhaMenuCampo style={{marginBottom:'20px',}} name={"Periodicidade:"} outro xs={11} defaultName={'periodicidade'} onChange={handleValueChange} value={values.periodicidade} arr={['Mensal','Doou uma vez','Participou de Evento Beneficente']} maxLength={32}/>
			</DialogContent>
            
			<DialogActions>
				<ConstantStyles.GreenButton onClick={props.handleClose} >Cancelar</ConstantStyles.GreenButton>
				<ConstantStyles.GreenButton onClick={checkFields} >Salvar</ConstantStyles.GreenButton>				
			</DialogActions>
		</Box>
	);
}

export default connect(null, { push })(DoacaoApoia);