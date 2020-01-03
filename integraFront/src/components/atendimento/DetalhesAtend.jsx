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
import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/styles';

import Paper from '@material-ui/core/Paper';
import PrintIcon from '@material-ui/icons/Print';
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

import ReactExport from "react-data-export";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class DetalhesAtend extends Component{
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
		IntegraServer.executeGetAtendsByPersonFromPatch(window.location.pathname)
			.then((response) => {				
				this.handleSucessfulResponse(response)
			}).catch((error) => this.handleError(error))
	}

	handleSucessfulResponse = (response) =>{
		//console.log(response.data);
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
        urlId:window.location.pathname.split("/").slice(-1)[0],
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
        IntegraServer.executeGetAtendsByPerson(state.urlId)
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
	const backToAtend=()=>{
		props.nav.push(`/atend/`);
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
		IntegraServer.executeGetAtendsByPerson(state.urlId)
			.then((response) => {				
				handleSucessfulResponse(response)
			}).catch((error) => handleError(error))
	};
	function checkAcompSelected(state,stateComo){
        //console.log(parentState)
		// Padrão = Psicologia,Assistência Social,Farmácia,Nutrição,Fisioterapia //','Receita','','Internação','Consulta'
		// if(convertAssociadosTypes(parentState)==='Desligamento'){
		// 	return <AssocDialogDesligamento parentState={parentState} handleClose={handleCloseDialog} paciId={state.urlId} handleRefresh={handleRefresh}/>
		// }else if(convertAssociadosTypes(parentState)==='Entrada'){
		// 	return <AssocDialogEntrada parentState={parentState} handleClose={handleCloseDialog} paciId={state.urlId} handleRefresh={handleRefresh}/>
		// }else if(convertAssociadosTypes(parentState)==='Recebido'){
		// 	return <AssocDialogRecebido parentState={parentState} handleClose={handleCloseDialog} paciId={state.urlId} handleRefresh={handleRefresh}/>
		// }else{
		// 	return <AssocDialogDoado parentState={parentState} handleClose={handleCloseDialog} paciId={state.urlId} handleRefresh={handleRefresh}/>
        // }
        return <AtendDialog stateComo={stateComo} pessoaState={state} handleClose={handleCloseDialog} paciId={state.urlId} handleRefresh={handleRefresh}/>
    }
    function setList(arr){
        let retorno=[]
        arr.forEach(item => {
            retorno.push([item.atendId, item.dataAtendimento, item.funcNome, item.tipo, item.demanda, item.local, item.obs])
        });
        return retorno;
    }    
    function multiDataSet(){
		let dados = [
			{
                columns: ["Id Pessoa","Nome","CPF", "RG","Email", "Email Alternativo", "Telefone", "Telefone Alternativo","Data de Nascimento", "Sexo","Nome da Mãe","Nome do Pai","CEP",
                    "Cidade","Estado","Endereço","Facebook","Instragram","Twitter","Como Chegou"],
				data: [
					[
                        state.urlId, state.dados[0].pessoa.nome, state.dados[0].pessoa.cpf, state.dados[0].pessoa.rg, state.dados[0].pessoa.dadosCadastrais.email, 
                        state.dados[0].pessoa.dadosCadastrais.email2, state.dados[0].pessoa.dadosCadastrais.telefone, state.dados[0].pessoa.dadosCadastrais.telefone2, 
                        state.dados[0].pessoa.dataNascimento, state.dados[0].pessoa.sexo, state.dados[0].pessoa.nomeMae, state.dados[0].pessoa.nomePai, 
                        state.dados[0].pessoa.dadosCadastrais.cep, state.dados[0].pessoa.dadosCadastrais.cidade, state.dados[0].pessoa.dadosCadastrais.estado, 
                        state.dados[0].pessoa.dadosCadastrais.endereco+' '+state.dados[0].pessoa.dadosCadastrais.numero+', '+state.dados[0].pessoa.dadosCadastrais.complemento+
                        ' – '+state.dados[0].pessoa.dadosCadastrais.bairro, state.dados[0].pessoa.dadosCadastrais.facebookAcount, state.dados[0].pessoa.dadosCadastrais.instagramAcount,
                        state.dados[0].pessoa.dadosCadastrais.twitterAcount, state.dados[0].comoChegou
					],
				]
            },
            {
                ySteps: 1,
                columns: ["Id Atendimento","Data do atendimento", "Responsável pelo atendimento", "Tipo", "Demanda", "Local de atendimento", "Anotações sobre o atendimento"],
				data: 
                    setList(state.dados)
                    // state.dados.map(item=>
                    //     [item.atendId, item.dataAtendimento, item.funcNome, item.tipo, item.demanda, item.local, item.obs],
                    // )
				
			}
		];
		//console.log(dados)
		return dados;
    }
	return(
		<Container maxWidth='lg'>
				<Box style={{display:'flex', flexFlow:'row nowrap',alignItems:'flex-start',marginTop:'50px',marginBottom:'25px',}}>
					<Typography style={ConstantStyles.ListMenu.title} variant="h6" noWrap>
						<Box fontWeight="fontWeightBold">
							{ConstantMessages.MessageTexts.MenuForm.B3}
						</Box>
					</Typography>
					<ConstantStyles.AtendimentosIcon color='secondary' style={ConstantStyles.ListMenu.icon}/>
				</Box>
				<Box style={{display:'flex',flexFlow:'row nowrap',}}>
					<Box>
						<ConstantStyles.GreenButton onClick={backToAtend} >Voltar</ConstantStyles.GreenButton>	
						{/* <ConstantStyles.GreenButton onClick={createPaci} style={{marginLeft:'20px'}}>Novo Paciente</ConstantStyles.GreenButton> */}
					</Box>

                    {state.dados.length>0?
					<ExcelFile filename={'Atendimentos '+state.urlId} element={
						<Button style={{
						minWidth: '1px',
                        padding:'15px',
                        marginLeft:'10px',
						color:ConstantCLass.Colors.gray,
						}}>
							<PrintIcon fontSize='large' color='action'/>
						</Button>}>
							<ExcelSheet dataSet={multiDataSet()} name={'Pessoa '+state.urlId}/>
					</ExcelFile>:
					<></>}

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
						<Typography style={{fontFamily:'Realist',flexFlow:'row nowrap',flexBasis:'95%',color:'white',}}>{"ATENDIMENTOS"}</Typography>
						{<Typography style={{fontFamily:'Realist',color:'white',}}>{'PESSOA0'+state.urlId}</Typography>}
					</Paper>

                {/* <Box style={{display:'flex',flexFlow:'row nowrap',justifyContent:'center',marginBottom:'60px'}}>
                    <ButtonGroup variant="outlined" color="primary" size="large">
                        <Button onClick={clickGeral}>Geral</Button>
                        <Button onClick={clickAcompanhamentos}>Acompanhamentos</Button>
                        <Button variant="contained" >Associados</Button>
                    </ButtonGroup>
                </Box> */}

                <Box style={{display:'flex',flexFlow:'column wrap',alignContent:'center'}}>
                    <Box style={{width:'80%',display:'flex',flexFlow:'column wrap',alignContent:'flex-start',}}>
                            {state.dados.length>0?<LinhaInfo name={"Como chegou até nós?"} data={state.dados[0].comoChegou}/>:<div></div>}
                                <div style={{margin:'5px'}}/>
                            {state.dados.length>0?<LinhaInfo name={"Nome:"} data={state.dados[0].pessoa.nome}/>:<div></div>}
                                <div style={{margin:'5px'}}/>
                            {state.dados.length>0?<LinhaInfo name={"Email:"} data={state.dados[0].pessoa.dadosCadastrais.email}/>:<div></div>}
                            <Box style={{display:'flex',flexFlow:'row nowrap', marginTop:'15px'}}>
                                {state.dados.length>0?<LinhaInfo name={"Telefone:"} data={state.dados[0].pessoa.dadosCadastrais.telefone}/>:<div></div>}
                                {state.dados.length>0?<LinhaInfo style={{marginLeft:'30px'}} name={"Telefone alternativo:"} data={state.dados[0].pessoa.dadosCadastrais.telefone2}/>:<div></div>}
                            </Box>
                            <Box style={{display:'flex',flexFlow:'row nowrap', marginTop:'15px'}}>
                                {state.dados.length>0?<LinhaInfo name={"Cidade:"} data={state.dados[0].pessoa.dadosCadastrais.cidade}/>:<div></div>}
                                {state.dados.length>0?<LinhaInfo style={{marginLeft:'30px'}} name={"Estado:"} data={state.dados[0].pessoa.dadosCadastrais.estado}/>:<div></div>}
                            </Box>
                    </Box>
                </Box>

                <Box style={{display:'flex',flexFlow:'row nowrap',justifyContent:'space-between',alignItems:'center',marginBottom:'20px',height:'60px',marginTop:'60px'}}>
					<Box>
						<ConstantStyles.GreenButton onClick={handleClickOpenDialog}>Novo Atendimento</ConstantStyles.GreenButton>
					</Box>					
					<Box style={{display:'flex',flexFlow:'row nowrap',alignItems:'center'}}>
						
					</Box>                    
                </Box>

				<Dialog fullWidth maxWidth={'md'} open={openDialog} onClose={handleCloseDialog}>
                    {state.dados.length>0?
                    checkAcompSelected(state.dados[0].pessoa,state.dados[0].comoChegou):
                    <></>}
				</Dialog>
                
				<Box style={{marginTop:'20px',marginBottom:'200px'}}>
					{
						//console.log(props),
						//props passados da tela anterior
						//props.nav.server.serverResponse
						// props.state.serverResponse
						state.dados					
						.map(obj=>
							<div key={obj.atendId}>
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
		// if(convertAssociadosTypes(parentState)==='Desligamento'){
		// 	return <AssocDetalhesDesligamento obj={obj}/>
		// }else if(convertAssociadosTypes(parentState)==='Entrada'){
		// 	return <AssocDetalhesEntrada obj={obj}/>
		// }else if(convertAssociadosTypes(parentState)==='Recebido'){
		// 	return <AssocDetalhesRecebido obj={obj}/>
		// }else{
		// 	return <AssocDetalhesDoado obj={obj}/>
        // }
        return <AtendDetalhes obj={obj}/>
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
		// if(convertAssociadosTypes(parentState)==='Desligamento'){
		// 	return <AssocDialogDesligamento dados={dados} parentState={parentState} handleClose={handleCloseDialog} paciId={props.obj.paciId} handleRefresh={props.handleRefresh}/>
		// }else if(convertAssociadosTypes(parentState)==='Entrada'){
		// 	return <AssocDialogEntrada dados={dados} parentState={parentState} handleClose={handleCloseDialog} paciId={props.obj.paciId} handleRefresh={props.handleRefresh}/>
		// }else if(convertAssociadosTypes(parentState)==='Recebido'){
		// 	return <AssocDialogRecebido dados={dados} parentState={parentState} handleClose={handleCloseDialog} paciId={props.obj.paciId} handleRefresh={props.handleRefresh}/>
		// }else{
		// 	return <AssocDialogDoado dados={dados} parentState={parentState} handleClose={handleCloseDialog} paciId={props.obj.paciId} handleRefresh={props.handleRefresh}/>
        // }
        //console.log(props.obj)
        return <AtendDialog dados={dados} parentState={parentState} handleClose={handleCloseDialog} paciId={props.obj.paciId} handleRefresh={props.handleRefresh}/>
	}
	

	return(
		// <CircularProgress />
		<ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')} style={{boxShadow:'none',marginBottom:'10px'}}>
			<ConstantStyles.StyledPanelSummary>
				<Typography style={{fontFamily:'Realist',flexBasis:'95%',color:'white',}}>{props.obj.dataAtendimento+' por '+props.obj.funcNome}</Typography>
				{<Typography style={{fontFamily:'Realist',color:'white',}}>{'ATEND0'+props.obj.atendId}</Typography>}
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
function AtendDetalhes(props){

	return(
		<Box>
			{props.obj.pessoa!==null?
			<>
				<LinhaInfo style={{marginTop:'20px'}} name={"Responsável pelo atendimento:"} data={props.obj.funcNome}/>
				<LinhaInfo style={{marginTop:'10px'}} name={"Tipo:"} data={props.obj.tipo}/>
				<LinhaInfo style={{marginTop:'10px'}} name={"Demanda:"} data={props.obj.demanda}/>
				<LinhaInfo style={{marginTop:'10px'}} name={"Local de atendimento:"} data={props.obj.local}/>
                <LinhaInfo style={{marginTop:'10px'}} name={"Anotações sobre o atendimento:"} data={props.obj.obs}/>
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

function AtendDialog(props){
	const[values,setValues]=React.useState({
		dataAtendimento:null,
        funcNome:'',
        comoChegou: '______',
        tipo:'______',
        demanda:'______',
        local: '______',
		obs:''
	});
	const [snack, setSnack] = React.useState({
        mode:false,
        text:'',
        status:false
    });    
    const listTipo =[
        'Pessoa com FC','Familiar de FC','Suspeita de FC','Profissional da Saúde','Estudante','Parceiro/Doador'
    ]
    const listDemanda =[
        'Informação sobre a FC','Informação sobre Tratamento','Informação sobre Diagnóstico','Informação sobre Direitos','Informação sobre Associações','Informações sobre Centro de Tratamento/Médicos'
    ]
    const listLocal =[
        'Facebook','Email','Whatsapp','Telefone','Presencial'
    ]
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
        if(values.dataAtendimento===null){
            setSnack({ mode:false,text:'Campo (Data do Atendimento) vazio.',status:true });
            return 
        }
        if(values.funcNome===''){
            setSnack({ mode:false,text:'Campo (Responsável pelo atendimento) vazio.',status:true });
            return
        }
        // if(values.comoChegou==='______'){
        //     setSnack({ mode:false,text:'Campo (Como chegou até nós) vazio.',status:true });
        //     return
        // }
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
        SendData();     
	}
	function SendData(){
		//props.nav.try?
		//console.log(props)
		IntegraServer.executeCreateAtend(values,props)
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

        // if (error.response.data) {
        //     errorMessage += error.response.data
        // }

        // if (error.response.data && error.response.data.message) {
        //     errorMessage = error.response.data.message
        // }
        console.log(error)
        
        setSnack({ mode:false,text:errorMessage,status:true });
    }
	useEffect(() => {
		//console.log("useEffect");
		if(props.dados){
            setValues({ ...values, dataAtendimento:props.dados.dataAtendimento, funcNome:props.dados.funcNome, 
                obs:props.dados.obs, comoChegou: props.dados.comoChegou, tipo:props.dados.tipo, demanda:props.dados.demanda, local:props.dados.local,});
		}		
    }, [props.dados]);

	return(
		<Box>
			<SnackComponent snackData={snack}/>
			<DialogTitle>
				{'Novo Atendimento: '}
			</DialogTitle>

			<DialogContent>
				<LinhaCampo style={{marginBottom:'20px',}} name={"Responsável pelo atendimento:"} xs={11} onChange={handleChange('funcNome')} value={values.funcNome} maxLength={32}/>
                <LinhaCampo style={{marginBottom:'20px',}} name={"Data do Atendimento:"} xs={11} onChange={handleDateChange('dataAtendimento')} date value={values.dataAtendimento}/>
                {/* <LinhaMenuCampo style={{marginBottom:'20px',}} name={"Como chegou até nós?"} outro xs={11} defaultName={'comoChegou'} onChange={handleValueChange} value={values.comoChegou} arr={listComoChegou} maxLength={32}/>             */}
                <LinhaMenuCampo style={{marginBottom:'20px',}} name={"Tipo:"} outro xs={11} defaultName={'tipo'} onChange={handleValueChange} value={values.tipo} arr={listTipo} maxLength={32}/>
                <LinhaMenuCampo style={{marginBottom:'20px',}} name={"Demanda:"} outro xs={11} defaultName={'demanda'} onChange={handleValueChange} value={values.demanda} arr={listDemanda} maxLength={32}/>
                <LinhaMenuCampo style={{marginBottom:'20px',}} name={"Local do atendimento:"} outro xs={11} defaultName={'local'} onChange={handleValueChange} value={values.local} arr={listLocal} maxLength={32}/>
                <LinhaCampo style={{marginBottom:'20px',}} name={"Anotações sobre o atendimento:"} multiline rows={3} xs={11} onChange={handleChange('obs')} value={values.obs} maxLength={128}/> 
			</DialogContent>
            
			<DialogActions>
				<ConstantStyles.GreenButton onClick={props.handleClose} >Cancelar</ConstantStyles.GreenButton>
				<ConstantStyles.GreenButton onClick={checkFields} >Salvar</ConstantStyles.GreenButton>				
			</DialogActions>
		</Box>
	);
}

export default connect(null, { push })(DetalhesAtend);