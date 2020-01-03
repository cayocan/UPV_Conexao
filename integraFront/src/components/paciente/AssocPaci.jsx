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

class AssocPaci extends Component{
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
		IntegraServer.executeGetAllAssocByPaciIdFromPath(window.location.pathname)
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
    const associadosTypes=[
        'Doado','Recebido','Entrada','Desligamento'
    ]
    const associadosTypesText=[
        'Contribuição','Doações realizadas para o paciente','Entrada de Doações','Desligamento'
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
        //console.log(valor)
		//let concat= valor.replace(/\s+/g, '')
		setChamada(valor);
		setState({ ...state, loading:true});
        IntegraServer.executeGetAssocByPaciIdAndType(state.urlId,convertAssociadosTypes(valor))
			.then((response) => {				
				handleSucessfulResponse(response)
			}).catch((error) => handleError(error))
    };
    function convertAssociadosTypes(valor){
        if(valor==='Doado'){
            return 'Contribuição';
        }else if(valor==='Recebido'){
            return 'Doações realizadas para o paciente';
        }else if(valor==='Entrada'){
            return 'Entrada de Doações';
        }else if(valor==='Desligamento'){
            return 'Desligamento';
        }else if(valor==='Contribuição'){
            return 'Doado';
        }else if(valor==='Doações realizadas para o paciente'){
            return 'Recebido';
        }else if(valor==='Entrada de Doações'){
            return 'Entrada';
        }
    }
	const backToPaci=()=>{
		props.nav.push(`/paci/`);
	}
	const createPaci = () => {
		props.nav.push(`/paci/create`);
    }
    
    const clickGeral=()=>{
		props.nav.push(`/paci/${state.urlId}`);
    }
    const clickAcompanhamentos=()=>{
		props.nav.push(`/paci/${state.urlId}/acomp`);
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
		IntegraServer.executeGetAssocByPaciIdAndType(state.urlId,convertAssociadosTypes(chamada))
			.then((response) => {				
				handleSucessfulResponse(response)
			}).catch((error) => handleError(error))
	};
	

	function checkAcompSelected(parentState){
        //console.log(parentState)
		// Padrão = Psicologia,Assistência Social,Farmácia,Nutrição,Fisioterapia //','Receita','','Internação','Consulta'
		if(convertAssociadosTypes(parentState)==='Desligamento'){
			return <AssocDialogDesligamento parentState={parentState} handleClose={handleCloseDialog} paciId={state.urlId} handleRefresh={handleRefresh}/>
		}else if(convertAssociadosTypes(parentState)==='Entrada'){
			return <AssocDialogEntrada parentState={parentState} handleClose={handleCloseDialog} paciId={state.urlId} handleRefresh={handleRefresh}/>
		}else if(convertAssociadosTypes(parentState)==='Recebido'){
			return <AssocDialogRecebido parentState={parentState} handleClose={handleCloseDialog} paciId={state.urlId} handleRefresh={handleRefresh}/>
		}else{
			return <AssocDialogDoado parentState={parentState} handleClose={handleCloseDialog} paciId={state.urlId} handleRefresh={handleRefresh}/>
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
                        <Button onClick={clickAcompanhamentos}>Acompanhamentos</Button>
                        <Button variant="contained" >Associados</Button>
                    </ButtonGroup>
                </Box>

                <Box style={{display:'flex',flexFlow:'row nowrap',justifyContent:'space-between',alignItems:'center',marginBottom:'60px',height:'60px'}}>
					<Box>
						{chamada!=''?
						<ConstantStyles.GreenButton onClick={handleClickOpenDialog} >Novo Associamento</ConstantStyles.GreenButton>:
						<></>}												
					</Box>					
					<Box style={{display:'flex',flexFlow:'row nowrap',alignItems:'center'}}>
						{state.loading?<CircularProgress color='primary' style={{marginRight:'10px'}}/>:<></>}                        
						<LinhaMenu name={"Tipo:"} xs={12} defaultName={'chamada'} onChange={handleValueChange} value={'______________'} arr={associadosTypesText} maxLength={16}/>
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
		if(convertAssociadosTypes(parentState)==='Desligamento'){
			return <AssocDetalhesDesligamento obj={obj}/>
		}else if(convertAssociadosTypes(parentState)==='Entrada'){
			return <AssocDetalhesEntrada obj={obj}/>
		}else if(convertAssociadosTypes(parentState)==='Recebido'){
			return <AssocDetalhesRecebido obj={obj}/>
		}else{
			return <AssocDetalhesDoado obj={obj}/>
		}
    }
    function convertAssociadosTypes(valor){
        if(valor==='Doado'){
            return 'Contribuição';
        }else if(valor==='Recebido'){
            return 'Doações realizadas para o paciente';
        }else if(valor==='Entrada'){
            return 'Entrada de Doações';
        }else if(valor==='Desligamento'){
            return 'Desligamento';
        }else if(valor==='Contribuição'){
            return 'Doado';
        }else if(valor==='Doações realizadas para o paciente'){
            return 'Recebido';
        }else if(valor==='Entrada de Doações'){
            return 'Entrada';
        }
    }
	function checkAcompSelected(parentState,dados){
		//console.log(dados)
		// Padrão = Psicologia,Assistência Social,Farmácia,Nutrição,Fisioterapia //','Receita','','Internação','Consulta'
		if(convertAssociadosTypes(parentState)==='Desligamento'){
			return <AssocDialogDesligamento dados={dados} parentState={parentState} handleClose={handleCloseDialog} paciId={props.obj.paciId} handleRefresh={props.handleRefresh}/>
		}else if(convertAssociadosTypes(parentState)==='Entrada'){
			return <AssocDialogEntrada dados={dados} parentState={parentState} handleClose={handleCloseDialog} paciId={props.obj.paciId} handleRefresh={props.handleRefresh}/>
		}else if(convertAssociadosTypes(parentState)==='Recebido'){
			return <AssocDialogRecebido dados={dados} parentState={parentState} handleClose={handleCloseDialog} paciId={props.obj.paciId} handleRefresh={props.handleRefresh}/>
		}else{
			return <AssocDialogDoado dados={dados} parentState={parentState} handleClose={handleCloseDialog} paciId={props.obj.paciId} handleRefresh={props.handleRefresh}/>
		}
	}
	

	return(
		// <CircularProgress />
		<ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')} style={{boxShadow:'none',marginBottom:'10px'}}>
			<ConstantStyles.StyledPanelSummary>
				<Typography style={{fontFamily:'Realist',flexBasis:'95%',color:'white',}}>{props.obj.lastUpdate+' por '+props.obj.funcNome}</Typography>
				{<Typography style={{fontFamily:'Realist',color:'white',}}>{'ASSOC0'+props.obj.id}</Typography>}
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
function AssocDetalhesDoado(props){

	return(
		<Box>
			{props.obj.doado!==null?
			<>
				<LinhaInfo style={{marginTop:'20px'}} name={"Data da doação:"} data={props.obj.doado.dt_doacao}/>
				<LinhaInfo style={{marginTop:'10px'}} name={"Valor:"} data={props.obj.doado.valor}/>
				<LinhaInfo style={{marginTop:'10px'}} name={"Método:"} data={props.obj.doado.metodo}/>
				<LinhaInfo style={{marginTop:'10px'}} name={"Observações:"} data={props.obj.doado.obs}/>
			</>:<></>}			
		</Box>
	);
}
function AssocDetalhesRecebido(props){

	return(
		<Box>
			{props.obj.recebido!==null?
			<>
				<LinhaInfo style={{marginTop:'20px'}} name={"Data da doação:"} data={props.obj.recebido.dt_recebido}/>
				<LinhaInfo style={{marginTop:'10px'}} name={"Tipo de doação:"} data={props.obj.recebido.tipo}/>
				<LinhaInfo style={{marginTop:'10px'}} name={"Quantidade:"} data={props.obj.recebido.quant}/>
				<LinhaInfo style={{marginTop:'10px'}} name={"Observações:"} data={props.obj.recebido.obs}/>
			</>:<></>}			
		</Box>
	);
}
function AssocDetalhesEntrada(props){

	return(
		<Box>
			{props.obj.entrada!==null?
			<>
				<LinhaInfo style={{marginTop:'20px'}} name={"Data da doação:"} data={props.obj.entrada.dt_entrada}/>
				<LinhaInfo style={{marginTop:'10px'}} name={"O que foi doado?"} data={props.obj.entrada.tipo}/>
				<LinhaInfo style={{marginTop:'10px'}} name={"Quantidade:"} data={props.obj.entrada.quant}/>
				<LinhaInfo style={{marginTop:'10px'}} name={"Observações:"} data={props.obj.entrada.obs}/>
			</>:<></>}			
		</Box>
	);
}
function AssocDetalhesDesligamento(props){

	return(
		<Box>
			{props.obj.desligamento!==null?
			<>
				<LinhaInfo style={{marginTop:'20px'}} name={"Data do desligamento:"} data={props.obj.desligamento.dt_deslig}/>
				<LinhaInfo style={{marginTop:'10px'}} name={"Motivo do desligamento:"} data={props.obj.desligamento.motivo}/>
			</>:<></>}			
		</Box>
	);
}
// function AcompDetalhesReceita(props){

// 	return(
// 		<Box>
// 			{props.obj.receita!==null?
// 			<>
// 				{props.obj.receita.nebulizador?<LinhaInfo style={{marginTop:'20px'}} name={"Nebulizador:"} data={'Próprio'}/>:<LinhaInfo style={{marginTop:'20px'}} name={"Nebulizador:"} data={'Programa de Doação'}/>}			
// 				<LinhaInfo style={{marginTop:'10px'}} name={"Marca / Modelo:"} data={props.obj.receita.modelo}/>
// 				<LinhaInfo style={{marginTop:'10px'}} name={"Data da última troca:"} data={props.obj.receita.dt_ultTroca}/>
// 				<ConstantStyles.StyledTypographyBold noWrap style={{marginTop:'20px'}}>{'Medicamentos que utiliza:'}</ConstantStyles.StyledTypographyBold>
// 				{
// 					props.obj.receita.medicamentos					
// 					.map(obj=>
// 						<div key={obj.id}>
// 							<ConstantStyles.StyledTypography>{obj.nome}</ConstantStyles.StyledTypography>
// 						</div>
// 					)
// 				}
// 			</>:<></>}			
// 		</Box>
// 	);
// }

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
// function LinhaCampoMoney(props){
//     const[constDate, setConstDate]=React.useState({
//          dateA: null
//     });        

//     function convertDate(date){
//         if(date===null){
// 			return null;
// 		}       
//         let spl = date.split('/');
//         let m = parseInt(spl[1],10)  
//         let n = new Date(spl[2],m-1,spl[0]);
//         return n;
//         //return date;
//     }
//     function convertNumberToMoney(valor){
//         console.log(valor)
//         let retorno = accounting.formatMoney(valor, "R$ ", 2, ".", ",")
//         console.log(retorno)
//         return retorno
//     }
//     function convertMoneyToNumber(valor){
//         console.log(valor)
//         let retorno = accounting.unformat(valor, ",")
//         console.log(retorno)
//         return retorno
//     }
//     function handleSelection(value){          
//         setConstDate({...constDate,dateA:value});
//         props.onChange(props.defaultName,convertMoneyToNumber(value));
//     };
//     useEffect(() => {
//         setConstDate({dateA:props.value});
//     }, [props.value]);

// 	return(
// 		<Grid item xs={props.xs}>
// 			<Box {...props.style} style={{display:'flex',flexFlow:'row nowrap',alignItems:'baseline',}}>
// 				<ConstantStyles.StyledTypographyBold>
// 					{props.need?'*'+props.name:props.name}
// 				</ConstantStyles.StyledTypographyBold>
//                 {<ConstantStyles.TextFieldCampo value={convertNumberToMoney(props.value)} multiline={props.multiline} rows={props.rows} style={{flex:'2',marginLeft:'5px'}} 
//                     onChange={(e)=>handleSelection(e.target.value)} inputProps={{maxLength:props.maxLength}}
//                     //onInput = {(e) => props.type==='number'?e.target.value = checkNumberLength(props.maxLength,e.target.value):(e)} 
//                 />}		
// 			</Box>
// 		</Grid>
// 	);
// }
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

function AssocDialogDoado(props){
	const[values,setValues]=React.useState({
		dt_doacao:null,
        funcNome:'',
        valor: '',
        metodo:'______',
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
        if(values.dt_doacao===null){
            setSnack({ mode:false,text:'Campo (Data da doação) vazio.',status:true });
            return 
        }
        if(values.funcNome===''){
            setSnack({ mode:false,text:'Campo (Registrado por) vazio.',status:true });
            return
        }
        if(values.valor===''){
            setSnack({ mode:false,text:'Campo (Valor) vazio.',status:true });
            return
        } 
        if(values.metodo==='______'){
            setSnack({ mode:false,text:'Campo (Método) vazio.',status:true });
            return
        } 
        if(values.obs===''){
            setSnack({ mode:false,text:'Campo (Observações) vazio.',status:true });
            return
        }       
        SendData();     
	}
	function SendData(){
		//props.nav.try?
		//console.log(props)
		IntegraServer.executeCreatePaciAssocDoado(values,props)
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
			setValues({ ...values, dt_doacao:props.dados.doado.dt_doacao, funcNome:props.dados.funcNome, obs:props.dados.doado.obs, valor:props.dados.doado.valor, metodo:props.dados.doado.metodo});
		}		
    }, [props.dados]);

	return(
		<Box>
			<SnackComponent snackData={snack}/>
			<DialogTitle>
				{'Novo: '+props.parentState}
			</DialogTitle>

			<DialogContent>
				<LinhaCampo style={{marginBottom:'20px',}} name={"Registrado por:"} xs={11} onChange={handleChange('funcNome')} value={values.funcNome} maxLength={32}/>
                <LinhaCampo style={{marginBottom:'20px',}} name={"Data da doação:"} xs={11} onChange={handleDateChange('dt_doacao')} date value={values.dt_doacao}/>
                <LinhaCampoMoney style={{marginBottom:'20px',}} name={"Valor:"} xs={11} defaultName={'valor'} onChange={handleValueChange} value={values.valor} maxLength={32}/>
                <LinhaMenuCampo style={{marginBottom:'20px',}} name={"Método:"} outro xs={11} defaultName={'metodo'} onChange={handleValueChange} value={values.metodo} arr={['Boleto','Transferência ','Cartão de crédito','Pagou na associação']} maxLength={32}/>
				<LinhaCampo style={{marginBottom:'20px',}} name={"Observações:"} multiline rows={3} xs={11} onChange={handleChange('obs')} value={values.obs} maxLength={128}/> 
			</DialogContent>
            
			<DialogActions>
				<ConstantStyles.GreenButton onClick={props.handleClose} >Cancelar</ConstantStyles.GreenButton>
				<ConstantStyles.GreenButton onClick={checkFields} >Salvar</ConstantStyles.GreenButton>				
			</DialogActions>
		</Box>
	);
}
function AssocDialogRecebido(props){
	const[values,setValues]=React.useState({
		dt_recebido: null,
        funcNome:'',
        obs:'',
        tipo:'______',
        quant:'',
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
        if(values.dt_doacao===null){
            setSnack({ mode:false,text:'Campo (Data da doação) vazio.',status:true });
            return 
        }
        if(values.funcNome===''){
            setSnack({ mode:false,text:'Campo (Registrado por) vazio.',status:true });
            return
        }
        if(values.quant===''){
            setSnack({ mode:false,text:'Campo (Quantidade) vazio.',status:true });
            return
        } 
        if(values.tipo==='______'){
            setSnack({ mode:false,text:'Campo (Tipo de doação) vazio.',status:true });
            return
        } 
        if(values.obs===''){
            setSnack({ mode:false,text:'Campo (Observações) vazio.',status:true });
            return
        }       
        SendData();     
	}
	function SendData(){
		//props.nav.try?
		//console.log(props)
		IntegraServer.executeCreatePaciAssocRecebido(values,props)
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
			setValues({ ...values, dt_recebido:props.dados.recebido.dt_recebido, funcNome:props.dados.funcNome, obs:props.dados.recebido.obs, tipo:props.dados.recebido.tipo, quant:props.dados.recebido.quant});
		}		
    }, [props.dados]);

	return(
		<Box>
			<SnackComponent snackData={snack}/>
			<DialogTitle>
				{'Novo: '+props.parentState}
			</DialogTitle>

			<DialogContent>
				<LinhaCampo style={{marginBottom:'20px',}} name={"Registrado por:"} xs={11} onChange={handleChange('funcNome')} value={values.funcNome} maxLength={32}/>
                <LinhaCampo style={{marginBottom:'20px',}} name={"Data da doação:"} xs={11} onChange={handleDateChange('dt_recebido')} date value={values.dt_recebido}/>
                <LinhaMenuCampo style={{marginBottom:'20px',}} name={"Tipo de doação:"} outro xs={11} defaultName={'tipo'} onChange={handleValueChange} value={values.tipo} arr={['Medicamento/Suplemento','Cesta Básica','Roupas']} maxLength={32}/>
                <LinhaCampo style={{marginBottom:'20px',}} name={"Quantidade:"} xs={11} onChange={handleChange('quant')} value={values.quant} tipo={'numero'} maxLength={8}/>
				<LinhaCampo style={{marginBottom:'20px',}} name={"Observações:"} multiline rows={3} xs={11} onChange={handleChange('obs')} value={values.obs} maxLength={128}/> 
			</DialogContent>
            
			<DialogActions>
				<ConstantStyles.GreenButton onClick={props.handleClose} >Cancelar</ConstantStyles.GreenButton>
				<ConstantStyles.GreenButton onClick={checkFields} >Salvar</ConstantStyles.GreenButton>				
			</DialogActions>
		</Box>
	);
}
function AssocDialogEntrada(props){
	const[values,setValues]=React.useState({
		dt_entrada: null,
        funcNome:'',
        obs:'',
        tipo:'',
        quant:'',
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
        if(values.dt_recebido===null){
            setSnack({ mode:false,text:'Campo (Data da doação) vazio.',status:true });
            return 
        }
        if(values.funcNome===''){
            setSnack({ mode:false,text:'Campo (Registrado por) vazio.',status:true });
            return
        }
        if(values.quant===''){
            setSnack({ mode:false,text:'Campo (Quantidade) vazio.',status:true });
            return
        } 
        if(values.tipo==='______'){
            setSnack({ mode:false,text:'Campo (O que foi doado) vazio.',status:true });
            return
        } 
        if(values.obs===''){
            setSnack({ mode:false,text:'Campo (Observações) vazio.',status:true });
            return
        }       
        SendData();     
	}
	function SendData(){
		//props.nav.try?
		//console.log(props)
		IntegraServer.executeCreatePaciAssocEntrada(values,props)
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
			setValues({ ...values, dt_entrada:props.dados.entrada.dt_entrada, funcNome:props.dados.funcNome, obs:props.dados.entrada.obs, tipo:props.dados.entrada.tipo, quant:props.dados.entrada.quant});
		}		
    }, [props.dados]);

	return(
		<Box>
			<SnackComponent snackData={snack}/>
			<DialogTitle>
				{'Novo: '+props.parentState}
			</DialogTitle>

			<DialogContent>
				<LinhaCampo style={{marginBottom:'20px',}} name={"Registrado por:"} xs={11} onChange={handleChange('funcNome')} value={values.funcNome} maxLength={32}/>
                <LinhaCampo style={{marginBottom:'20px',}} name={"Data da doação:"} xs={11} onChange={handleDateChange('dt_entrada')} date value={values.dt_entrada}/>
                <LinhaCampo style={{marginBottom:'20px',}} name={"O que foi doado?"} xs={11} onChange={handleChange('tipo')} value={values.tipo} maxLength={32}/>
                <LinhaCampo style={{marginBottom:'20px',}} name={"Quantidade:"} xs={11} onChange={handleChange('quant')} value={values.quant} tipo={'numero'} maxLength={8}/>
				<LinhaCampo style={{marginBottom:'20px',}} name={"Observações:"} multiline rows={3} xs={11} onChange={handleChange('obs')} value={values.obs} maxLength={128}/> 
			</DialogContent>
            
			<DialogActions>
				<ConstantStyles.GreenButton onClick={props.handleClose} >Cancelar</ConstantStyles.GreenButton>
				<ConstantStyles.GreenButton onClick={checkFields} >Salvar</ConstantStyles.GreenButton>				
			</DialogActions>
		</Box>
	);
}
function AssocDialogDesligamento(props){
	const[values,setValues]=React.useState({
		dt_deslig: null,
        funcNome:'',
        motivo:'',
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
        if(values.dt_deslig===null){
            setSnack({ mode:false,text:'Campo (Data do desligamento) vazio.',status:true });
            return 
        }
        if(values.funcNome===''){
            setSnack({ mode:false,text:'Campo (Registrado por) vazio.',status:true });
            return
        }
        if(values.motivo===''){
            setSnack({ mode:false,text:'Campo (Motivo do desligamento) vazio.',status:true });
            return
        }       
        SendData();     
	}
	function SendData(){
		//props.nav.try?
		//console.log(props)
		IntegraServer.executeCreatePaciAssocDesligamento(values,props)
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
			setValues({ ...values, dt_deslig:props.dados.desligamento.dt_deslig, funcNome:props.dados.funcNome, motivo:props.dados.desligamento.motivo});
		}		
    }, [props.dados]);

	return(
		<Box>
			<SnackComponent snackData={snack}/>
			<DialogTitle>
				{'Novo: '+props.parentState}
			</DialogTitle>

			<DialogContent>
				<LinhaCampo style={{marginBottom:'20px',}} name={"Registrado por:"} xs={11} onChange={handleChange('funcNome')} value={values.funcNome} maxLength={32}/>
                <LinhaCampo style={{marginBottom:'20px',}} name={"Data do desligamento:"} xs={11} onChange={handleDateChange('dt_deslig')} date value={values.dt_deslig}/>
				<LinhaCampo style={{marginBottom:'20px',}} name={"Motivo do desligamento:"} multiline rows={3} xs={11} onChange={handleChange('motivo')} value={values.motivo} maxLength={128}/> 
			</DialogContent>
            
			<DialogActions>
				<ConstantStyles.GreenButton onClick={props.handleClose} >Cancelar</ConstantStyles.GreenButton>
				<ConstantStyles.GreenButton onClick={checkFields} >Salvar</ConstantStyles.GreenButton>				
			</DialogActions>
		</Box>
	);
}

export default connect(null, { push })(AssocPaci);