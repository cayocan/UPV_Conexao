import React,{Component} from 'react'
import * as ConstantStyles from '../../constants/ConstantStyles'
import * as ConstantMessages from '../../constants/ConstantMessages'
import IntegraServer from '../IntegraServer.js'
import HeaderComponentExport from '../utility/HeaderComponent'

import * as ConstantCLass from '../../constants/ConstantCLass'
import Paper from '@material-ui/core/Paper';
import BarChartIcon from '@material-ui/icons/BarChart';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/styles';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';

import { push } from 'connected-react-router'
import { connect } from 'react-redux';
import SnackComponent from '../utility/SnackComponent'
import LinearProgress from '@material-ui/core/LinearProgress';

class ListMenuEstat extends Component{
	constructor(props){
		super(props)
		console.log(props);
		this.state = {
			serverResponse: [],
			loading: true
        }
	}

	componentDidMount(){	
		IntegraServer.executeGetStats()
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

	const backToMenu=()=>{
		props.nav.push(`/home/`);
	}
	
	return(
		<Container maxWidth='lg'>
				<Box style={{display:'flex', flexFlow:'row nowrap',alignItems:'flex-start',marginTop:'50px',marginBottom:'25px',}}>
					<Typography style={ConstantStyles.ListMenu.title} variant="h6" noWrap>
						<Box fontWeight="fontWeightBold">
							{ConstantMessages.MessageTexts.MenuForm.B6}
						</Box>
					</Typography>
					<ConstantStyles.EstatisticaIcon color='secondary' style={ConstantStyles.ListMenu.icon}/>
				</Box>
				<ConstantStyles.GreenButton onClick={backToMenu}>Voltar</ConstantStyles.GreenButton>	
				{/* <ConstantStyles.GreenButton onClick={createAssoc} style={{marginLeft:'20px'}}>Nova Associação</ConstantStyles.GreenButton> */}

				<Box style={{marginTop:'50px',}}>
					{
						//console.log(props)
						//props passados da tela anterior
						//props.nav.server.serverResponse
						// props.state.serverResponse					
						// .map(obj=>
						// 	<div key={obj.id}>
								<EstatisticaList obj={props.state.serverResponse} nav={props.nav}/>
						// 	</div>
						// )
					}					
				</Box>		
		</Container>
	);
}
function EstatisticaList(props){
	console.log(props);

	return (
		<Box style={{display:'flex',flexDirection:'column'}}>
			<Box style={{display:'flex',flexDirection:'row'}}>
				<Paper elevation={3} style={{display:'flex', flexDirection:'column',flexWrap:'nowrap',alignItems:'flex-start', width:'250px',height:'80px',borderRadius:20, margin:'2.5%',
					boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',padding:'10px 30px'}}>
					<ConstantStyles.StyledTypography style={{fontFamily:'Realist',color:ConstantCLass.Colors.grayD,}}>{"Associações cadastradas"}</ConstantStyles.StyledTypography>
					<Box style={{display:'flex', justifyContent:'space-between', marginTop:'10px'}}>
						<ConstantStyles.StyledTypographyBold variant="h4" style={{fontFamily:'Realist',color:ConstantCLass.Colors.grayD2, height:'35px'}}>{props.obj.assocCount}</ConstantStyles.StyledTypographyBold>
						<BarChartIcon color='inherit' style={{width:'40%',height:'40%',color:ConstantCLass.Colors.stat1,}}/>
					</Box>
				</Paper>
				<Paper elevation={3} style={{display:'flex', flexDirection:'column',flexWrap:'nowrap',alignItems:'flex-start', width:'250px',height:'80px',borderRadius:20, margin:'2.5%',
					boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',padding:'10px 30px'}}>
					<ConstantStyles.StyledTypography style={{fontFamily:'Realist',color:ConstantCLass.Colors.grayD,}}>{"Pacientes cadastrados"}</ConstantStyles.StyledTypography>
					<Box style={{display:'flex', justifyContent:'space-between', marginTop:'10px'}}>
						<ConstantStyles.StyledTypographyBold variant="h4" style={{fontFamily:'Realist',color:ConstantCLass.Colors.grayD2, height:'35px'}}>{props.obj.paciCount}</ConstantStyles.StyledTypographyBold>
						<BarChartIcon color='inherit' style={{width:'40%',height:'40%',color:ConstantCLass.Colors.stat3,}}/>
					</Box>
				</Paper>
				<Paper elevation={3} style={{display:'flex', flexDirection:'column',flexWrap:'nowrap',alignItems:'flex-start', width:'250px',height:'80px',borderRadius:20, margin:'2.5%',
					boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',padding:'10px 30px'}}>
					<ConstantStyles.StyledTypography style={{fontFamily:'Realist',color:ConstantCLass.Colors.grayD,}}>{"Óbitos"}</ConstantStyles.StyledTypography>
					<Box style={{display:'flex', justifyContent:'space-between', marginTop:'10px'}}>
						<ConstantStyles.StyledTypographyBold variant="h4" style={{fontFamily:'Realist',color:ConstantCLass.Colors.grayD2, height:'35px'}}>{props.obj.obitoCount}</ConstantStyles.StyledTypographyBold>
						<BarChartIcon color='inherit' style={{width:'40%',height:'40%',color:ConstantCLass.Colors.stat2,}}/>
					</Box>
				</Paper>
			</Box>

			<Box style={{display:'flex',flexDirection:'row'}}>
				<Paper elevation={3} style={{display:'flex', flexDirection:'column',flexWrap:'nowrap',alignItems:'flex-start', width:'250px',height:'80px',borderRadius:20, margin:'2.5%',
					boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',padding:'10px 30px'}}>
					<ConstantStyles.StyledTypography style={{fontFamily:'Realist',color:ConstantCLass.Colors.grayD,}}>{"Diagnósticos"}</ConstantStyles.StyledTypography>
					<Box style={{display:'flex', justifyContent:'space-between', marginTop:'10px'}}>
						<ConstantStyles.StyledTypographyBold variant="h4" style={{fontFamily:'Realist',color:ConstantCLass.Colors.grayD2, height:'35px'}}>{props.obj.diagCount}</ConstantStyles.StyledTypographyBold>
						<BarChartIcon color='inherit' style={{width:'40%',height:'40%',color:ConstantCLass.Colors.stat4,}}/>
					</Box>
				</Paper>
				<Paper elevation={3} style={{display:'flex', flexDirection:'column',flexWrap:'nowrap',alignItems:'flex-start', width:'250px',height:'80px',borderRadius:20, margin:'2.5%',
					boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',padding:'10px 30px'}}>
					<ConstantStyles.StyledTypography style={{fontFamily:'Realist',color:ConstantCLass.Colors.grayD,}}>{"Atendimentos"}</ConstantStyles.StyledTypography>
					<Box style={{display:'flex', justifyContent:'space-between', marginTop:'10px'}}>
						<ConstantStyles.StyledTypographyBold variant="h4" style={{fontFamily:'Realist',color:ConstantCLass.Colors.grayD2, height:'35px'}}>{props.obj.atendCount}</ConstantStyles.StyledTypographyBold>
						<BarChartIcon color='inherit' style={{width:'40%',height:'40%',color:ConstantCLass.Colors.stat5,}}/>
					</Box>
				</Paper>
				<Paper elevation={3} style={{display:'flex', flexDirection:'column',flexWrap:'nowrap',alignItems:'flex-start', width:'250px',height:'80px',borderRadius:20, margin:'2.5%',
					boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',padding:'10px 30px'}}>
					<ConstantStyles.StyledTypography style={{fontFamily:'Realist',color:ConstantCLass.Colors.grayD,}}>{"Apoiadores"}</ConstantStyles.StyledTypography>
					<Box style={{display:'flex', justifyContent:'space-between', marginTop:'10px'}}>
						<ConstantStyles.StyledTypographyBold variant="h4" style={{fontFamily:'Realist',color:ConstantCLass.Colors.grayD2, height:'35px'}}>{props.obj.apoiaCount}</ConstantStyles.StyledTypographyBold>
						<BarChartIcon color='inherit' style={{width:'40%',height:'40%',color:ConstantCLass.Colors.stat6,}}/>
					</Box>
				</Paper>
			</Box>
		</Box>
	);
}

export default connect(null, { push })(ListMenuEstat);