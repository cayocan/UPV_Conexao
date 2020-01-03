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

class AcompPaci extends Component{
	constructor(props){
		super(props)
		console.log(props);
		this.state = {
			serverResponse: [],
			loading: true
        }
	}

	componentDidMount(){	
		this.setState({loading:false})
	}
	requestServer(){
		IntegraServer.executeGetAllAcompByPaciIdFromPath(window.location.pathname)
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
	const[chamada,setChamada]=React.useState('');
    const acompTypes=[
        'Farmácia','Fisioterapia','Assistência Social','Psicologia','Receita','Nutrição','Internação','Consulta'
    ]
	
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

    const handleValueChange = (name,valor) => {
		let concat= valor.replace(/\s+/g, '')
		setChamada(concat);
		setState({ ...state, loading:true});
        IntegraServer.executeGetAcompByPaciIdAndType(state.urlId,concat)
			.then((response) => {				
				handleSucessfulResponse(response)
			}).catch((error) => handleError(error))
    };
	const backToPaci=()=>{
		props.nav.push(`/paci/`);
	}
	const createPaci = () => {
		props.nav.push(`/paci/create`);
    }
    
    const clickGeral=()=>{
		props.nav.push(`/paci/${state.urlId}`);
    }
    const clickAssociados=()=>{
		props.nav.push(`/paci/${state.urlId}/associado`);
	}
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
		IntegraServer.executeGetAcompByPaciIdAndType(state.urlId,chamada)
			.then((response) => {				
				handleSucessfulResponse(response)
			}).catch((error) => handleError(error))
	};
	

	function checkAcompSelected(parentState){
		// Padrão = Psicologia,Assistência Social,Farmácia,Nutrição,Fisioterapia //','Receita','','Internação','Consulta'
		if(parentState==='Consulta'){
			return <AcompDialogConsulta parentState={parentState} handleClose={handleCloseDialog} paciId={state.urlId} handleRefresh={handleRefresh}/>
		}else if(parentState==='Internação'){
			return <AcompDialogInter parentState={parentState} handleClose={handleCloseDialog} paciId={state.urlId} handleRefresh={handleRefresh}/>
		}else if(parentState==='Receita'){
			return <AcompDialogReceita parentState={parentState} handleClose={handleCloseDialog} paciId={state.urlId} handleRefresh={handleRefresh}/>
		}else{
			return <AcompDialogPadrao parentState={parentState} handleClose={handleCloseDialog} paciId={state.urlId} handleRefresh={handleRefresh}/>
		}
	}

	return(
		<Container maxWidth='lg'>
				<Box style={{display:'flex', flexFlow:'row nowrap',alignItems:'flex-start',marginTop:'50px',marginBottom:'25px',}}>
					<Typography style={ConstantStyles.ListMenu.title} variant="h6" noWrap>
						<Box fontWeight="fontWeightBold">
							{ConstantMessages.MessageTexts.MenuForm.B2}
						</Box>
					</Typography>
					<ConstantStyles.PacientesIcon color='secondary' style={ConstantStyles.ListMenu.icon}/>
				</Box>
				<Box style={{display:'flex',flexFlow:'row nowrap',justifyContent:'space-between'}}>
					<Box>
						<ConstantStyles.GreenButton onClick={backToPaci} >Voltar</ConstantStyles.GreenButton>	
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
						<Typography style={{fontFamily:'Realist',flexBasis:'95%',color:'white',}}>{'ACOMPANHAMENTOS'}</Typography>
						{<Typography style={{fontFamily:'Realist',color:'white',}}>{'PACI0'+state.urlId}</Typography>}
					</Paper>

                <Box style={{display:'flex',flexFlow:'row nowrap',justifyContent:'center',marginBottom:'60px'}}>
                    <ButtonGroup variant="outlined" color="primary" size="large">
                        <Button onClick={clickGeral}>Geral</Button>
                        <Button variant="contained">Acompanhamentos</Button>
                        <Button onClick={clickAssociados}>Associados</Button>
                    </ButtonGroup>
                </Box>

                <Box style={{display:'flex',flexFlow:'row nowrap',justifyContent:'space-between',alignItems:'center',marginBottom:'60px',height:'60px'}}>
					<Box>
						{chamada!=''?
						<ConstantStyles.GreenButton onClick={handleClickOpenDialog} >Novo Acompanhamento</ConstantStyles.GreenButton>:
						<></>}												
					</Box>					
					<Box style={{display:'flex',flexFlow:'row nowrap',alignItems:'center'}}>
						{state.loading?<CircularProgress color='primary' style={{marginRight:'10px'}}/>:<></>}
						<LinhaMenu name={"Tipo de acompanhamento:"} xs={12} defaultName={'chamada'} onChange={handleValueChange} value={'______________'} arr={acompTypes} maxLength={16}/>
					</Box>                    
                </Box>

				<Dialog fullWidth maxWidth={'md'} open={openDialog} onClose={handleCloseDialog}>
					{checkAcompSelected(chamada)}
				</Dialog>
                
				<Box style={{marginTop:'50px',marginBottom:'200px'}}>
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

	const handleClickOpenDialog = () => {
		setOpenDialog(true);
	};
	const handleCloseDialog = () => {
		setOpenDialog(false);
	};

	const clickAssoc = (id) => {
		props.nav.push(`/paci/${id}`);
	}
	const editAssoc = (id) => {
		//executeGetAssocById(id);
		props.nav.push(`/paci/edit/${id}`);
	}
	function checkDetails(parentState,obj){
		// Padrão = Psicologia,Assistência Social,Farmácia,Nutrição,Fisioterapia //','Receita','','Internação','Consulta'
		if(parentState==='Consulta'){
			return <AcompDetalhesConsulta obj={obj}/>
		}else if(parentState==='Internação'){
			return <AcompDetalhesInter obj={obj}/>
		}else if(parentState==='Receita'){
			return <AcompDetalhesReceita obj={obj}/>
		}else{
			return <AcompDetalhesPadrao obj={obj}/>
		}
	}
	function checkAcompSelected(parentState,dados){
		// Padrão = Psicologia,Assistência Social,Farmácia,Nutrição,Fisioterapia //','Receita','','Internação','Consulta'
		if(parentState==='Consulta'){
			return <AcompDialogConsulta dados={dados} parentState={parentState} handleClose={handleCloseDialog} paciId={props.obj.paciId} handleRefresh={props.handleRefresh}/>
		}else if(parentState==='Internação'){
			return <AcompDialogInter dados={dados} parentState={parentState} handleClose={handleCloseDialog} paciId={props.obj.paciId} handleRefresh={props.handleRefresh}/>
		}else if(parentState==='Receita'){
			return <AcompDialogReceita dados={dados} parentState={parentState} handleClose={handleCloseDialog} paciId={props.obj.paciId} handleRefresh={props.handleRefresh}/>
		}else{
			return <AcompDialogPadrao dados={dados} parentState={parentState} handleClose={handleCloseDialog} paciId={props.obj.paciId} handleRefresh={props.handleRefresh}/>
		}
	}
	

	return(
		// <CircularProgress />
		<ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')} style={{boxShadow:'none',marginBottom:'10px'}}>
			<ConstantStyles.StyledPanelSummary>
				<Typography style={{fontFamily:'Realist',flexBasis:'95%',color:'white',}}>{props.obj.lastUpdate+' por '+props.obj.funcNome}</Typography>
				{<Typography style={{fontFamily:'Realist',color:'white',}}>{'ACOMP0'+props.obj.id}</Typography>}
			</ConstantStyles.StyledPanelSummary>
			<ConstantStyles.StyledPanelDetails>
				<Box style={{width:'90%',}}>
					{checkDetails(props.parentState,props.obj)}
				</Box>
				<Box style={{display:'flex',flexFlow:'row nowrap',alignItems:'flex-end',}}>
					<ConstantStyles.GreenButton style={{padding:'5px 40px',}} onClick={handleClickOpenDialog}>{'Editar'}</ConstantStyles.GreenButton>
				</Box>
				<Dialog fullWidth maxWidth={'md'} open={openDialog} onClose={handleCloseDialog}>
					{checkAcompSelected(props.parentState,props.obj)}
				</Dialog>
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

function AcompDetalhesPadrao(props){

	return(
		<Box>
			<LinhaInfo style={{marginTop:'20px'}} name={"Data de atendimento:"} data={props.obj.dt_atendimento}/>
			<LinhaInfo style={{marginTop:'10px'}} name={"Registrado por:"} data={props.obj.funcNome}/>
			<LinhaInfo style={{marginTop:'10px',marginBottom:'30px'}} name={"Anotações do Atendimento"} data={props.obj.obs}/>
		</Box>
	);
}
function AcompDetalhesConsulta(props){

	return(
		<Box>
			{props.obj.consulta!==null?
			<>
				<LinhaInfo style={{marginTop:'20px'}} name={"Médico responsável:"} data={props.obj.consulta.consultaMedico}/>
				<LinhaInfo style={{marginTop:'10px'}} name={"Especialidade:"} data={props.obj.consulta.consultaMedicoEspec}/>
				<LinhaInfo style={{marginTop:'10px',marginBottom:'30px'}} name={"Anotações do Atendimento"} data={props.obj.obs}/>
			</>:<></>}			
		</Box>
	);
}
function AcompDetalhesInter(props){

	return(
		<Box>
			{props.obj.internacao!==null?
			<>
				<LinhaInfo style={{marginTop:'20px'}} name={"Data de internamento:"} data={props.obj.internacao.dt_Internacao}/>
				<LinhaInfo style={{marginTop:'10px'}} name={"Data de alta:"} data={props.obj.internacao.dt_Alta}/>
				<LinhaInfo style={{marginTop:'10px'}} name={"Hospital:"} data={props.obj.internacao.hospital}/>
				<LinhaInfo style={{marginTop:'10px'}} name={"Médico Responsável:"} data={props.obj.internacao.interMedico}/>
				<LinhaInfo style={{marginTop:'10px'}} name={"Especialidade:"} data={props.obj.internacao.interMedicoEspec}/>
				<LinhaInfo style={{marginTop:'10px'}} name={"Intercorrência Médica:"} data={props.obj.internacao.intercorrenciaMedica}/>
				<LinhaInfo style={{marginTop:'10px',marginBottom:'30px'}} name={"Anotações do internamento"} data={props.obj.internacao.obs}/>
			</>:<></>}			
		</Box>
	);
}

function AcompDetalhesReceita(props){

	return(
		<Box>
			{props.obj.receita!==null?
			<>
				{props.obj.receita.nebulizador?<LinhaInfo style={{marginTop:'20px'}} name={"Nebulizador:"} data={'Próprio'}/>:<LinhaInfo style={{marginTop:'20px'}} name={"Nebulizador:"} data={'Programa de Doação'}/>}			
				<LinhaInfo style={{marginTop:'10px'}} name={"Marca / Modelo:"} data={props.obj.receita.modelo}/>
				<LinhaInfo style={{marginTop:'10px'}} name={"Data da última troca:"} data={props.obj.receita.dt_ultTroca}/>
				<LinhaInfo style={{marginTop:'10px'}} name={"Anotações do Atendimento:"} data={props.obj.obs}/>
				<ConstantStyles.StyledTypographyBold noWrap style={{marginTop:'20px'}}>{'Medicamentos que utiliza:'}</ConstantStyles.StyledTypographyBold>
				{
					props.obj.receita.medicamentos					
					.map(obj=>
						<div key={obj.id}>
							<ConstantStyles.StyledTypography>{obj.nome}</ConstantStyles.StyledTypography>
						</div>
					)
				}
			</>:<></>}			
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

function AcompDialogPadrao(props){
	const[values,setValues]=React.useState({
		dt_atendimento:null,
		funcNome:'',
		obs:''
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
	};
	function checkFields(){
        //console.log(values)
        if(values.dt_atendimento===null){
            setSnack({ mode:false,text:'Campo (Data de atendimento) vazio.',status:true });
            return 
        }
        if(values.funcNome===''){
            setSnack({ mode:false,text:'Campo (Registrado por) vazio.',status:true });
            return
        }
        if(values.obs===''){
            setSnack({ mode:false,text:'Campo (Anotações do atendimento) vazio.',status:true });
            return
        }       
        SendData();     
	}
	function SendData(){
		//props.nav.try?
		//console.log(props)
		IntegraServer.executeCreatePaciAcompPadrao(values,props)
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
			setValues({ ...values, dt_atendimento:props.dados.dt_atendimento, funcNome:props.dados.funcNome, obs:props.dados.obs});
		}		
    }, [props.dados]);

	return(
		<Box>
			<SnackComponent snackData={snack}/>
			<DialogTitle>
				{'Novo Acompanhamento: '+props.parentState}
			</DialogTitle>

			<DialogContent>
				<LinhaCampo style={{marginBottom:'20px',}} name={"Data de atendimento:"} xs={11} onChange={handleDateChange('dt_atendimento')} date value={values.dt_atendimento}/>
				<LinhaCampo style={{marginBottom:'20px',}} name={"Registrado por:"} xs={11} onChange={handleChange('funcNome')} value={values.funcNome} maxLength={32}/> 
				<LinhaCampo style={{marginBottom:'20px',}} name={"Anotações do atendimento:"} multiline rows={3} xs={11} onChange={handleChange('obs')} value={values.obs} maxLength={128}/> 
			</DialogContent>

			<DialogActions>
				<ConstantStyles.GreenButton onClick={props.handleClose} >Cancelar</ConstantStyles.GreenButton>
				<ConstantStyles.GreenButton onClick={checkFields} >Salvar</ConstantStyles.GreenButton>				
			</DialogActions>
		</Box>
	);
}
function AcompDialogConsulta(props){
	const[values,setValues]=React.useState({
		dt_atendimento:null,
		funcNome:'',
		obs:'',
		consultaMedico:'',
		consultaMedicoEspec:'______'
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
	};
	function checkFields(){
        //console.log(values)
        if(values.dt_atendimento===null){
            setSnack({ mode:false,text:'Campo (Data de atendimento) vazio.',status:true });
            return 
        }
        if(values.funcNome===''){
            setSnack({ mode:false,text:'Campo (Registrado por) vazio.',status:true });
            return
        }
        if(values.obs===''){
            setSnack({ mode:false,text:'Campo (Anotações do atendimento) vazio.',status:true });
            return
		}
		if(values.consultaMedico===''){
            setSnack({ mode:false,text:'Campo (Médico Responsável) vazio.',status:true });
            return
		}
		if(values.consultaMedicoEspec==='______'){
            setSnack({ mode:false,text:'Campo (Especialidade) vazio.',status:true });
            return
        }     
        SendData();     
	}
	function SendData(){
		//props.nav.try?
		//console.log(props)
		IntegraServer.executeCreatePaciAcompConsulta(values,props)
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
			setValues({ ...values, dt_atendimento:props.dados.dt_atendimento, funcNome:props.dados.funcNome, obs:props.dados.obs, 
				consultaMedico:props.dados.consulta.consultaMedico, consultaMedicoEspec:props.dados.consulta.consultaMedicoEspec});
		}		
    }, [props.dados]);

	return(
		<Box>
			<SnackComponent snackData={snack}/>
			<DialogTitle>
				{'Novo Acompanhamento: '+props.parentState}
			</DialogTitle>

			<DialogContent>
				<LinhaCampo style={{marginBottom:'20px',}} name={"Data de atendimento:"} xs={11} onChange={handleDateChange('dt_atendimento')} date value={values.dt_atendimento}/>
				<LinhaCampo style={{marginBottom:'20px',}} name={"Registrado por:"} xs={11} onChange={handleChange('funcNome')} value={values.funcNome} maxLength={32}/>
				<LinhaCampo style={{marginBottom:'20px',}} name={"Médico Responsável:"} xs={11} onChange={handleChange('consultaMedico')} value={values.consultaMedico} maxLength={32}/>
				<LinhaMenuCampo style={{marginBottom:'20px',}} name={"Especialidade:"} outro xs={11} defaultName={'consultaMedicoEspec'} onChange={handleValueChange} value={values.consultaMedicoEspec} arr={['Pneumologista','Gastroenteorologista','Endocrinologista','Geneticista']} maxLength={32}/>
				<LinhaCampo style={{marginBottom:'20px',}} name={"Anotações do atendimento:"} multiline rows={3} xs={11} onChange={handleChange('obs')} value={values.obs} maxLength={128}/> 
			</DialogContent>

			<DialogActions>
				<ConstantStyles.GreenButton onClick={props.handleClose} >Cancelar</ConstantStyles.GreenButton>
				<ConstantStyles.GreenButton onClick={checkFields} >Salvar</ConstantStyles.GreenButton>				
			</DialogActions>
		</Box>
	);
}
function AcompDialogInter(props){
	const[values,setValues]=React.useState({
		dt_Internacao:null,
		dt_Alta:null,
		funcNome:'',
		obs:'',
		hospital:'',
		interMedico:'',
		interMedicoEspec:'______',
		intercorrenciaMedica:'',
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
	};
	function checkFields(){
        //console.log(values)
        if(values.dt_Internacao===null){
            setSnack({ mode:false,text:'Campo (Data de internação) vazio.',status:true });
            return 
        }
        if(values.funcNome===''){
            setSnack({ mode:false,text:'Campo (Registrado por) vazio.',status:true });
            return
        }
        if(values.dt_Alta===null){
            setSnack({ mode:false,text:'Campo (Data de alta) vazio.',status:true });
            return
		}
		if(values.obs===''){
            setSnack({ mode:false,text:'Campo (Anotações do internamento) vazio.',status:true });
            return
		}
		if(values.interMedicoEspec==='______'){
            setSnack({ mode:false,text:'Campo (Especialidade) vazio.',status:true });
            return
		}
		if(values.interMedico===''){
            setSnack({ mode:false,text:'Campo (Médico Responsável) vazio.',status:true });
            return
		}
		if(values.intercorrenciaMedica===''){
            setSnack({ mode:false,text:'Campo (Intercorrência médica) vazio.',status:true });
            return
		}
		if(values.hospital===''){
            setSnack({ mode:false,text:'Campo (Hospital) vazio.',status:true });
            return
		} 
        SendData();     
	}
	function SendData(){
		//props.nav.try?
		//console.log(props)
		IntegraServer.executeCreatePaciAcompInter(values,props)
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
			setValues({ ...values, dt_Internacao:props.dados.internacao.dt_Internacao, dt_Alta:props.dados.internacao.dt_Alta, funcNome:props.dados.funcNome, obs:props.dados.internacao.obs, 
				hospital:props.dados.internacao.hospital, interMedico:props.dados.internacao.interMedico, interMedicoEspec:props.dados.internacao.interMedicoEspec, 
				intercorrenciaMedica:props.dados.internacao.intercorrenciaMedica});
		}
	}, [props.dados]);
	
	return(
		<Box>
			<SnackComponent snackData={snack}/>
			<DialogTitle>
				{'Novo Acompanhamento: '+props.parentState}
			</DialogTitle>

			<DialogContent>
				<LinhaCampo style={{marginBottom:'20px',}} name={"Registrado por:"} xs={11} onChange={handleChange('funcNome')} value={values.funcNome} maxLength={32}/>
				<LinhaCampo style={{marginBottom:'20px',}} name={"Data de Internação:"} xs={11} onChange={handleDateChange('dt_Internacao')} date value={values.dt_Internacao}/>
				<LinhaCampo style={{marginBottom:'20px',}} name={"Data de Alta:"} xs={11} onChange={handleDateChange('dt_Alta')} date value={values.dt_Alta}/>
				<LinhaCampo style={{marginBottom:'20px',}} name={"Hospital:"} xs={11} onChange={handleChange('hospital')} value={values.hospital} maxLength={32}/>		
				<LinhaCampo style={{marginBottom:'20px',}} name={"Médico Responsável:"} xs={11} onChange={handleChange('interMedico')} value={values.interMedico} maxLength={32}/>
				<LinhaMenuCampo style={{marginBottom:'20px',}} name={"Especialidade:"} outro xs={11} defaultName={'interMedicoEspec'} onChange={handleValueChange} value={values.interMedicoEspec} arr={['Pneumologista','Gastroenteorologista','Endocrinologista','Geneticista']} maxLength={32}/>
				<LinhaCampo style={{marginBottom:'20px',}} name={"Intercorrência médica:"} multiline rows={3} xs={11} onChange={handleChange('intercorrenciaMedica')} value={values.intercorrenciaMedica} maxLength={128}/>
				<LinhaCampo style={{marginBottom:'20px',}} name={"Anotações do internamento:"} multiline rows={3} xs={11} onChange={handleChange('obs')} value={values.obs} maxLength={128}/> 
			</DialogContent>

			<DialogActions>
				<ConstantStyles.GreenButton onClick={props.handleClose} >Cancelar</ConstantStyles.GreenButton>
				<ConstantStyles.GreenButton onClick={checkFields} >Salvar</ConstantStyles.GreenButton>				
			</DialogActions>
		</Box>
	);
}
function AcompDialogReceita(props){
	const[values,setValues]=React.useState({
		dt_atendimento:null,
		funcNome:'',
		obs:'',
		dt_ultTroca:null,
		modelo:'',
		nebulizador:true,
		periodicidades:''
	});
	const[campos,setCampos]=React.useState({
		medicamentos:props.dados?updateMedFromProps():['________'],
	});
	const [snack, setSnack] = React.useState({
        mode:false,
        text:'',
        status:false
    });
	const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
        //console.log(campos);
	};
	const handleDateChange = name => date => {
        //console.log(date)
		if(date!=null){
            setValues({...values, [name]:getDateFormat(date.toJSON())});
        }
	};
	const handleValueChange = (name,valor) => {
        setValues({ ...values, [name]: valor });
        //console.log(values);
	};
	function handleMedicamentoChange(index,med,peri){
		//console.log(index,med,peri)
		if(med!=='________' && peri!=='________'){
			//console.log('&&')
			let value = med+' - '+peri;
			campos.medicamentos[index]=value;
		//setCampos({ ...campos, medicamentos:checkMed(campos.medicamentos,value)});
        	//console.log(campos);
		}		
	};
	// function checkMed(arr,value){
	// 	console.log(arr,value);
	// 	if(!arr.includes(value)){
	// 		console.log('TEM')
	// 		arr.push(value);
	// 	}		
	// 	return arr;
	// };

	function getDateFormat(date){
        if(date!=null){
			let partsT = date.split("T");
			let n = partsT[0].split("-");
			let f = n[2]+'/'+n[1]+'/'+n[0]
			return f;
		}else
			return null
	};
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
	};
	function checkFields(){
		//console.log(values)
		if(values.dt_atendimento===null){
            setSnack({ mode:false,text:'Campo (Data de atendimento) vazio.',status:true });
            return 
        }
        if(values.dt_ultTroca===null){
            setSnack({ mode:false,text:'Campo (Data da última troca) vazio.',status:true });
            return 
        }
        if(values.funcNome===''){
            setSnack({ mode:false,text:'Campo (Registrado por) vazio.',status:true });
            return
        }
        if(values.obs===''){
            setSnack({ mode:false,text:'Campo (Anotações do atendimento) vazio.',status:true });
            return
		}
		if(campos.medicamentos==='________'){
            setSnack({ mode:false,text:'Campo (Medicamentos) vazio.',status:true });
            return
		}
		if(campos.modelo===''){
            setSnack({ mode:false,text:'Campo (Marca / Modelo do nebulizador) vazio.',status:true });
            return
		}
        SendData();     
	}
	function SendData(){
		//props.nav.try?
		IntegraServer.executeCreatePaciAcompReceita(values,props,convertMedicamentos())
			.then((response) => {
                handleSuccessfulResponse(response)
            }).catch((error) => handleError(error))
        // :IntegraServer.executeCreatePaci(values)
        // .then((response) => {
        //     handleSuccessfulResponse(response)
        // }).catch((error) => handleError(error))
	};
	function convertMedicamentos(){
		//console.log(campos.medicamentos)
		let newMed=[];
		campos.medicamentos.map((obj,i)=>
			newMed.push({'nome':obj})
		)
		//console.log(newMed);
		return newMed;
	}
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
	const clickAddMed = () => {
		campos.medicamentos.push('________');
		setCampos({ ...campos, medicamentos:campos.medicamentos});
		//console.log(campos.medicamentos);
	}
	function updateMedFromProps(){
		let newCampos=[];
		props.dados.receita.medicamentos.map((obj,i)=>
			newCampos.push(obj.nome)
		)
		return newCampos;
	}
	useEffect(() => {
		//console.log("useEffect");
		if(props.dados){
			setValues({...values, dt_atendimento:props.dados.dt_atendimento, funcNome:props.dados.funcNome, obs:props.dados.obs, 
				dt_ultTroca:props.dados.receita.dt_ultTroca, modelo:props.dados.receita.modelo, nebulizador:props.dados.receita.nebulizador, 
				periodicidades:props.dados.receita.periodicidades});			
			setCampos({medicamentos:updateMedFromProps()});
		}
	}, [props.dados]);

	return(
		<Box>
			<SnackComponent snackData={snack}/>
			<DialogTitle>
				{'Novo Acompanhamento: '+props.parentState}
			</DialogTitle>

			<DialogContent>
				<LinhaCampo style={{marginBottom:'20px',}} name={"Data de atendimento:"} xs={11} onChange={handleDateChange('dt_atendimento')} date value={values.dt_atendimento}/>
				<LinhaCampo style={{marginBottom:'20px',}} name={"Registrado por:"} xs={11} onChange={handleChange('funcNome')} value={values.funcNome} maxLength={32}/> 
				<LinhaSwitch style={{marginBottom:'20px',}} name={"Nebulizador:"} v={'Nebulizador próprio'} f={'Programa de doação'} xs={11} defaultName={'nebulizador'} boolChange={handleValueChange} value={values.nebulizador}/>
				<LinhaCampo style={{marginBottom:'20px',}} name={"Marca / Modelo do nebulizador:"} xs={11} onChange={handleChange('modelo')} value={values.modelo} maxLength={32}/> 
				<LinhaCampo style={{marginBottom:'20px',}} name={"Data da última troca:"} xs={11} onChange={handleDateChange('dt_ultTroca')} date value={values.dt_ultTroca}/>
				{campos.medicamentos.length>0?
				campos.medicamentos					
					.map((obj,i)=>
						<div key={i}>
							<Box style={{display:'flex',flexFlow:'row nowrap',alignItems:'flex-start',marginBottom:'20px'}}>
								<Box style={{display:'flex',flexFlow:'row nowrap',flex:'15'}}>
									<MedicamentoLinha index={i} onChange={handleMedicamentoChange} value={campos.medicamentos[i]}/>								
								</Box>
								<Box style={{display:'flex',flexFlow:'row nowrap',flex:'1',marginLeft:'20px'}}>
								{campos.medicamentos.length===i+1?
									<Fab size={'small'} color="primary" onClick={clickAddMed}><AddIcon/></Fab>:<></>}	
								</Box>
							</Box>					
						</div>
				):
				<div key={0}>
					<Box style={{display:'flex',flexFlow:'row nowrap',alignItems:'flex-start',marginBottom:'20px'}}>
						<Box style={{display:'flex',flexFlow:'row nowrap',flex:'15'}}>
							<MedicamentoLinha index={0} onChange={handleMedicamentoChange} value={campos.medicamentos[0]}/>								
						</Box>
						<Box style={{display:'flex',flexFlow:'row nowrap',flex:'1',marginLeft:'20px'}}>
						{campos.medicamentos.length===1?
							<Fab size={'small'} color="primary" onClick={clickAddMed}><AddIcon/></Fab>:<></>}	
						</Box>
					</Box>					
				</div>
				}
				<LinhaCampo style={{marginBottom:'20px',}} name={"Anotações do atendimento:"} multiline rows={3} xs={11} onChange={handleChange('obs')} value={values.obs} maxLength={128}/>

			</DialogContent>

			<DialogActions>
				<ConstantStyles.GreenButton onClick={props.handleClose} >Cancelar</ConstantStyles.GreenButton>
				<ConstantStyles.GreenButton onClick={checkFields} >Salvar</ConstantStyles.GreenButton>				
			</DialogActions>
		</Box>
	);

}
function MedicamentoLinha(props){
	const[values,setValues]=React.useState({
		medicamento:'______',
		periodicidade:'______',
		concat:props.value
	});
	function handleMedChange(name,valor){
		setValues({ ...values, medicamento: valor });
		props.onChange(props.index,valor,values.periodicidade);
	};
	function handlePeriChange(name,valor){
		setValues({ ...values, periodicidade: valor });
		props.onChange(props.index,values.medicamento,valor);
	};

	function setValuesFromConcat(valor){
		//let concat= valor.replace(/\s+/g, '');
		if(valor){
			let list = valor.split("-");
			setValues({ ...values, medicamento:list.slice(-2)[0], periodicidade:list.slice(-1)[0] });
		}		
		//console.log(list.slice(-2)[0]);
	}	
	useEffect(() => {	
		setValuesFromConcat(props.value);
    }, []);

	return(
		<>
			<LinhaMenuCampo name={"Medicamentos que utiliza::"} outro xs={7} defaultName={'medicamento'} onChange={handleMedChange} value={values.medicamento} arr={['Medicamento1','Medicamento2','Medicamento3']} maxLength={32}/>
			<LinhaMenuCampo style={{marginLeft:'20px'}} name={"Periodicidade:"} outro xs={5} defaultName={'periodicidade'} onChange={handlePeriChange} value={values.periodicidade} arr={['1x ao dia','2x ao dia','3x ao dia']} maxLength={32}/>
		</>		
	);
}
export default connect(null, { push })(AcompPaci);