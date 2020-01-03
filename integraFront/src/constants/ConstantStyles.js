import * as ConstantCLass from './ConstantCLass'
import React from 'react';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import SvgIcon from '@material-ui/core/SvgIcon';

import { blue } from '@material-ui/core/colors';
import Switch from '@material-ui/core/Switch';
import { createMuiTheme } from '@material-ui/core/styles';
import RealistTtf from './fonts/Realist.ttf';

import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';

export const useStyles = makeStyles(theme => ({

	btnForgotPassword: {
		color:ConstantCLass.Colors.gray,
		alignSelf: 'center',
		marginBottom: theme.spacing(4),
		fontFamily:'Realist',
	},
	btnTerms: {
		color:ConstantCLass.Colors.gray,
		alignSelf: 'center',
		marginTop: '14%',
		fontFamily:'Realist',
	},
	btnEdit: {
		color:ConstantCLass.Colors.blue,
		margin:'5px',
		fontFamily:'Realist',
	},
	successSnackBar: {
		backgroundColor: ConstantCLass.Colors.green+' !important',
	},
	errorSnackBar: {
		backgroundColor: theme.palette.error.dark+' !important',
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
	},
	searchIcon: {
		width: theme.spacing(7),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		color:[ConstantCLass.Colors.gray],
	  },
	inputRoot: {
		color: [ConstantCLass.Colors.gray],
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 7),
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: 200,
		},
	},
	title:{
		color:'black',		
		textTransform:'none',
	},
}));

export const FCSwitch = withStyles({
	switchBase: {
	  color: blue[300],
	  '&$checked': {
		color: blue[500],
	  },
	  '&$checked + $track': {
		backgroundColor: blue[500],
	  },
	},
	checked: {},
	track: {},
  })(Switch);

//#region Themes
export const MainTheme = createMuiTheme({
	palette: {
	  secondary: {
		main: ConstantCLass.Colors.iconColor,
		mainGradient:'linear-gradient(308deg, #9CF4ED 0%, #8686F7 100%)',
	  },
	  primary:{
		main: ConstantCLass.Colors.blue,
	  },
	},
 });

 export const MainFont = createMuiTheme({
	typography: {
		fontFamily: "Realist",
	  },
 });
//#endregion

//#region LoginScreen
export const mainContainer = {	
	display:'flex',
	flexFlow: 'column wrap',
	flex:'2',
	alignSelf:'center',		
	height:'100hv',
}

export const logo1 = {	
	width:'100%',
	alignSelf: 'center',
	padding:'2%',
	marginTop:'15%',
	marginBottom:'3%',
}

export const logo2 = {
	width:'25%',
	alignSelf: 'center',
	padding:'2%',
}

export const StyledButton = withStyles(theme => ({
root: {
	alignSelf: 'center',
	width:'50%',
	borderRadius: 10,
	padding: '20px 50px',
	boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
	color: 'white',
	fontSize:'1.5rem',
	backgroundColor: ConstantCLass.Colors.green,
	'&:hover': {
	backgroundColor: ConstantCLass.Colors.greenD,
	},
},
label: {
	fontWeight: 'bold',
},
}))(Button);

export const StyledTextField = withStyles(theme => ({
root: {
	alignSelf:'center',
	width:'90%',
	marginTop: theme.spacing(2),
	marginBottom: theme.spacing(2),		
	boxShadow: '0 2px 5px 1px rgba(0, 0, 0, .3)',
},
}))(TextField);
//#endregion

//#region MenuScreen
export const MenuScreen = {	

	HeaderBox:{
		background:[ConstantCLass.Colors.white],
	},

	Logo1:{
		width:'8%',
		margin:'15px',
	},

	Avatar: {
		margin:'10px',
		color: [ConstantCLass.Colors.white],
		backgroundColor: [ConstantCLass.Colors.green],
		fontFamily:'Realist',
	},
	MenuIcon:{
		color: [ConstantCLass.Colors.gray],
	},
	MenuButtonIcon:{
		padding:'1px',
		minWidth: '2px',
	},
	MenuButtons:{
		minWidth: '1px',
		padding:'24px',
		color:ConstantCLass.Colors.gray,
	},
	SideButtons:{
		width:'1.5em',
		height:'1.5em',
	},
	List:{
		paddingTop:'70px',
		paddingBottom:'70px',
	}	
}
//#endregion

//#region MenuForm
export const MenuForm = {	

	title:{
		color:[ConstantCLass.Colors.purpleD],
		padding:'10px',
		marginLeft:'5.5%',
		marginRight:'5.5%',
		marginTop:'3%',
		fontFamily:'Realist',
	},
	Boxes:{
		display:'flex',
		justifyContent:'center',
	},
	MenuTexts:{
		color:[ConstantCLass.Colors.menuTextColor],
		padding:'20px',
		textTransform:'none',
		fontFamily:'Realist',
		fontSize:'2rem',
		marginTop:'5%',
	},
	ButtonIcons:{
		width:'20%',
		height:'20%',
		padding:'5px',
		color:'secondary',
		marginRight:'10%',
	}
}

export const StyledButtonMenu = withStyles(theme => ({
	root: {
		alignSelf: 'center',
		width:'500px',
		height:'190px',
		borderRadius: 10,
		margin:'2.5%',
		boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
		color: 'white',
		fontSize:'1.5rem',
		alignItems:'center',
		justifyContent:'space-between',
		padding:'20px 10px',
	},
	label: {
		fontWeight: 'bold',
	},
}))(Button);
//#endregion

//#region ListMenu
export const ListMenu = {	

	title:{
		color:[ConstantCLass.Colors.menuTextColor],
		textTransform:'none',
		fontFamily:'Realist',
		fontSize:'2rem',
		marginTop:'5%',
	},

	icon:{
		width:'7%',
		height:'7%',
		color:'secondary',
		alignSelf:'flex-end',
	},

	panelSummary:{
		background:[ConstantCLass.Colors.panelSummary],
	},
}

export const GreenButton = withStyles(theme => ({
	root: {
		borderRadius: 5,
		padding: '7px 20px',
		boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
		color: 'white',
		fontFamily:'Realist',
		marginTop:'10px',
		marginBottom:'10px',
		backgroundColor: ConstantCLass.Colors.buttonGreen,
		'&:hover': {
		backgroundColor: ConstantCLass.Colors.buttonGreenD,
		},		
		'&$disabled': {
			color: 'white',
			backgroundColor: ConstantCLass.Colors.gray,
		},
	},
	label: {
		fontWeight: 'bold',
	},
	disabled: {
	},
}))(Button);

export const StyledPanelSummary = withStyles(theme => ({
	root: {
		background:[ConstantCLass.Colors.panelSummary],
		borderRadius: 10,
		fontFamily:'Realist',
		minHeight: 56,
		'&$expanded': {
			minHeight: 56,
		},
	},
	content: {
		'&$expanded': {
		  margin: '12px 0',
		},
	  },
	expanded: {
		
	},
}))(ExpansionPanelSummary);

export const StyledPanelDetails = withStyles(theme => ({
	root: {
	},
}))(ExpansionPanelDetails);

export const StyledTypography = withStyles(theme => ({
	root: {
		fontFamily:'Realist',
	},
}))(Typography);

export const StyledTypographyBold = withStyles(theme => ({
	root: {
		fontFamily:'Realist',
		fontWeight:'Bold',
		marginRight:'5px',		
		overflow:'inherit'
	},
}))(Typography);

export const TextFieldCampo = withStyles(theme => ({
	root: {
		border:'1px solid',
		borderColor:ConstantCLass.Colors.gray,
	},
	input: {
		fontFamily:'Realist',
		padding:'6px',
    },
}))(InputBase);
//#endregion

//#region DetalhesAssociacao
export const DetalhesAssociacao = {	

	logo:{
		width:'30%',
		margin:'50px',
		alignSelf:'center',
	},
}
//#endregion

//#region SvgIcons
export function AssociacoesIcon(props){
	return (
		<SvgIcon strokeWidth={'0.1'} {...props}>
			<path transform="translate(3.5 3.5)" d="M2.469 8.716a.442.442 0 0 1 .883 0v6.714H7.3v-2.807a.431.431 0 0 1 .441-.42h2.71a.431.431 0 0 1 .441.42v2.807h3.851V8.48a.442.442 0 0 1 .883 0v7.37a.431.431 0 0 1-.441.42h-4.737a.431.431 0 0 1-.441-.42v-2.807H8.18v2.807a.431.431 0 0 1-.441.42H2.91a.431.431 0 0 1-.441-.42V8.716zm-1.71.208a.458.458 0 0 1-.624 0 .4.4 0 0 1 0-.593L8.777.118a.458.458 0 0 1 .624 0l3.576 3.4.023-1.9a.44.44 0 0 1 .879.007l-.027 2.719 4.243 4.032a.4.4 0 0 1 0 .593.458.458 0 0 1-.624 0L13.2 4.91a.432.432 0 0 1-.176-.167L9.09 1.007.758 8.924z" />
		</SvgIcon>
	);
}

export function AtendimentosIcon(props){
	return (
		<SvgIcon strokeWidth={'0.1'} {...props}>
			<path transform="translate(2.5 2.5)" d="M6.41 4.778c-.248-.96-1.076-2.53-2.088-1.6C1.194 6.05 7.878 11.081 8.309 11.3c1.525.766 4.005-1.073 2.222-2.495-2.231-1.781-1.323 1.415-2.986.021-.324-.272-.457-.7-1.014-1.216-1.845-1.7-.642-1.624-.121-2.832zM4.021 14.889c-.111-1.169.233-2.379-.478-2.984a7.379 7.379 0 0 1-.946-.7 10.219 10.219 0 0 1-.771-.892A5.891 5.891 0 0 1 1.471 4.7C3.609.168 11.84.067 13.706 5.261 15.05 9 12.181 12.439 8.48 12.839c-3.335.36-1-.132-4.459 2.05zm10.691-9.452c4.069 1.024 5.549 6.134 1.354 8.686l-.1 2.135c-.936-.129-1.351-1.409-2.868-1.507a5.985 5.985 0 0 1-3.443-1.077c.589-.4 1.424-.516 2.127-.991 2.651-1.789 3.165-3.647 2.934-7.247zM3.085 12.778l.051 3.854a23.016 23.016 0 0 0 2.973-2.081c1.755-1.318 1.957-.761 3.461.209 1.6 1.034 2.988.6 4.088 1.114.96.448 2.117 1.768 3.179 2.212l.009-3.3a5.413 5.413 0 0 0 2.5-4.024 5.577 5.577 0 0 0-1.693-4.821c-2.26-2.1-2.664-.448-3.882-2.505C10.363-2.311-1.9.347.32 9.069c.512 2.013 1.458 2.6 2.764 3.708z" />
		</SvgIcon>
	);
}

export function PacientesIcon(props){
	return (
		<SvgIcon {...props} viewBox="-6 -10 70 70" >			
			<path d="M 27.9657 50.1012 C 26.1477 45.18 21.0807 41.4585 15.7221 37.5066 C 8.3763 32.0877 0.7758 26.487 0.0477 16.9227 C -0.6066 8.3277 5.5395 2.1456 11.9403 0.4842 C 17.2017 -0.8973 24.6078 0.3996 29.1537 8.0973 C 34.1118 0.3636 41.337 -0.9459 46.7073 0.5454 C 53.8956 2.5335 58.599 9.2493 58.1508 16.8858 C 57.6054 26.3655 49.8834 32.0877 42.4278 37.6272 C 37.0818 41.6034 32.0391 45.3492 30.2328 50.1012 C 30.051 50.5746 29.6028 50.8896 29.0934 50.8896 C 28.584 50.8896 28.1358 50.5746 27.9657 50.1012 Z M 12.546 2.8242 C 7.2972 4.194 1.8909 9.1278 2.4723 16.7283 C 3.1149 25.1901 10.2546 30.4506 17.1648 35.5428 C 21.9897 39.0942 26.5842 42.489 29.1177 46.8765 C 31.6386 42.6222 36.1971 39.24 40.9851 35.6877 C 48.0042 30.4758 55.2528 25.0929 55.7379 16.7526 C 56.1744 9.1764 51.0228 4.2543 46.0521 2.8845 C 41.1669 1.539 34.4394 3.006 30.1725 11.1645 C 29.9538 11.5767 29.5299 11.8188 29.0691 11.8188 C 28.6083 11.8071 28.1961 11.5398 28.0026 11.1159 C 25.02 4.6791 20.1708 2.412 15.795 2.412 C 14.7042 2.412 13.6134 2.5452 12.546 2.8242 Z" />
		</SvgIcon>
	);
}

export function ApoiadoresIcon(props){
	return (
		<SvgIcon {...props} viewBox="-60 -20 280 280">
			<path d="M133.84 121.93c9.92,-13.59 15.28,-30.01 15.28,-46.84 0,-0.16 0,-0.35 0,-0.51 -0,-41.19 -30.04,-74.57 -67.11,-74.57 -37.06,0 -67.11,33.38 -67.11,74.56 0,0.17 0,0.35 0,0.52 0,16.84 5.36,33.26 15.29,46.84 -18.02,6.15 -30.16,23.07 -30.19,42.12l0 29.82c0,24.7 20.03,44.74 44.74,44.74l74.56 0c24.7,-0 44.74,-20.04 44.74,-44.74l0 -29.82c-0.04,-19.04 -12.18,-35.97 -30.19,-42.11l-0 0zm-104.02 -47.36c0,-32.94 23.37,-59.65 52.19,-59.65 28.82,0 52.19,26.71 52.19,59.65 0,32.94 -23.38,59.65 -52.19,59.65 -28.81,0 -52.2,-26.71 -52.2,-59.65zm119.3 115.57c0,18.53 -16.39,33.55 -36.6,33.55l-61.01 0c-20.21,0 -36.6,-15.02 -36.6,-33.55l0 -22.37c0.54,-16.13 12.28,-29.7 28.16,-32.57 10.98,9 24.75,13.93 38.95,13.93 14.2,0 27.97,-4.93 38.95,-13.93 15.88,2.86 27.62,16.44 28.16,32.56l-0 22.37z"/>
		</SvgIcon>
	);
}

export function AdministracaoIcon(props){
	return (
		<SvgIcon {...props} viewBox="-55 -55 400 400">
			<path d="M142.23 0l-0.03 0 -18.77 0c-10.4,0.05 -18.8,8.49 -18.8,18.89 0,0.03 0,0.05 0,0.08l-0.01 16.09c-12.94,4.73 -24.96,11.85 -35.34,20.91l-22.26 -12.94c-2.85,-1.66 -6.1,-2.53 -9.41,-2.53 -6.73,0 -12.95,3.62 -16.27,9.48l-18.81 32.84c-1.64,2.88 -2.52,6.15 -2.52,9.48 0,6.76 3.59,13.01 9.42,16.43l22.01 12.82c-1.3,6.81 -2.01,13.76 -2.05,20.7 0.04,6.94 0.73,13.88 2.04,20.7l-22.01 12.83c-5.82,3.41 -9.41,9.67 -9.41,16.42 0,3.32 0.88,6.59 2.52,9.48l18.81 32.84c3.32,5.85 9.54,9.47 16.29,9.47 3.3,0 6.54,-0.87 9.41,-2.53l22.24 -12.94c10.38,9.06 22.4,16.17 35.34,20.9l0 16.1c0,0.02 0,0.04 0,0.07 0,10.38 8.39,18.83 18.77,18.89l18.81 0 0.03 0 18.81 -0c10.38,-0.06 18.77,-8.5 18.77,-18.89 0,-0.02 0,-0.05 0,-0.07l0 -16.1c12.95,-4.73 24.96,-11.84 35.34,-20.9l22.24 12.94c2.87,1.66 6.11,2.53 9.41,2.53 6.75,0 12.96,-3.62 16.29,-9.47l18.81 -32.84c1.64,-2.88 2.52,-6.15 2.52,-9.48 0,-6.76 -3.59,-13.01 -9.41,-16.42l-22.01 -12.83c1.3,-6.82 1.99,-13.76 2.04,-20.7 -0.04,-6.94 -0.75,-13.89 -2.05,-20.7l22.01 -12.82c5.83,-3.41 9.42,-9.67 9.42,-16.43 0,-3.32 -0.88,-6.59 -2.52,-9.48l-18.81 -32.84c-3.32,-5.85 -9.54,-9.48 -16.27,-9.48 -3.31,0 -6.55,0.88 -9.41,2.53l-22.26 12.94c-10.38,-9.06 -22.41,-16.17 -35.34,-20.91l-0.01 -16.09c0,-0.02 0,-0.05 0,-0.08 0,-10.4 -8.4,-18.84 -18.8,-18.89l-18.77 0zm0 265.45l-0.03 0 -9.37 0.04c-5.21,-0.01 -9.43,-4.24 -9.43,-9.45 0,-0.01 0,-0.03 0,-0.04l0 -20.87c-19.97,-4.14 -38.06,-14.71 -51.48,-30.07l-26.1 15.21c-1.42,0.83 -3.05,1.27 -4.71,1.27 -3.37,0 -6.47,-1.81 -8.13,-4.74l-9.45 -16.42c-0.83,-1.44 -1.26,-3.08 -1.26,-4.74 0,-3.38 1.79,-6.51 4.71,-8.22l26.22 -15.28c-3.28,-9.62 -4.99,-19.75 -4.99,-29.93 0,-10.18 1.71,-20.32 5.01,-29.94l-26.25 -15.28c-2.91,-1.7 -4.7,-4.82 -4.7,-8.2 0,-1.66 0.43,-3.3 1.26,-4.74l9.4 -16.42c1.67,-2.92 4.78,-4.73 8.14,-4.73 1.66,0 3.27,0.44 4.71,1.27l26.09 15.21c13.44,-15.36 31.54,-25.95 51.52,-30.07l0 -20.88c0,-0.01 0,-0.02 0,-0.03 0,-5.2 4.21,-9.43 9.4,-9.44l9.4 0 0.03 0 9.4 0c5.2,0.02 9.4,4.24 9.4,9.44 0,0.01 0,0.02 0,0.03l0 20.88c19.98,4.13 38.08,14.71 51.52,30.07l26.09 -15.21c1.44,-0.83 3.05,-1.27 4.71,-1.27 3.36,0 6.47,1.81 8.14,4.73l9.4 16.42c0.83,1.44 1.26,3.08 1.26,4.74 0,3.37 -1.79,6.5 -4.7,8.2l-26.25 15.28c3.3,9.62 5.01,19.75 5.01,29.94 0,10.18 -1.71,20.31 -4.99,29.93l26.22 15.28c2.92,1.71 4.71,4.84 4.71,8.22 0,1.66 -0.43,3.3 -1.26,4.74l-9.45 16.42c-1.66,2.93 -4.76,4.74 -8.13,4.74 -1.66,0 -3.28,-0.44 -4.71,-1.27l-26.1 -15.21c-13.42,15.36 -31.51,25.93 -51.48,30.07l0 20.87c0,0.01 0,0.03 0,0.04 0,5.21 -4.22,9.44 -9.43,9.45l-9.37 -0.04zm-0 -170.63c26.2,-0.55 47.77,21.45 47.77,47.41 0,26.18 -21.24,47.41 -47.41,47.41l-0.36 -0.01 -0.03 0 -0.36 0.01c-26.17,0 -47.41,-21.23 -47.41,-47.41 0,-25.96 21.57,-47.96 47.77,-47.41l0 0 0.03 0z" />
		</SvgIcon>
	);
}

export function EstatisticaIcon(props){
	return (
		<SvgIcon {...props} viewBox="-10 -10 70 70">
			<g transform="translate(-8.037 -8.763)">
				<path d="M9.474 44.838h6.161a1.437 1.437 0 0 0 1.438-1.438V32.886a1.437 1.437 0 0 0-1.437-1.437H9.474a1.437 1.437 0 0 0-1.437 1.437V43.4a1.438 1.438 0 0 0 1.437 1.438zm1.437-10.515H14.2v7.639h-3.288z" transform="translate(0 9.925)"/>
				<path d="M24.207 50.668a1.437 1.437 0 0 0 1.437-1.437V19.56a1.437 1.437 0 0 0-1.437-1.437h-6.162a1.437 1.437 0 0 0-1.437 1.437v29.67a1.437 1.437 0 0 0 1.437 1.437zM19.483 21h3.286v26.793h-3.286z" transform="translate(3.75 4.095)"/>
				<path d="M32.777 47.677a1.437 1.437 0 0 0 1.437-1.437V26.4a1.437 1.437 0 0 0-1.437-1.437h-6.16A1.437 1.437 0 0 0 25.18 26.4v19.839a1.437 1.437 0 0 0 1.437 1.437zm-4.722-19.842h3.286V44.8h-3.286z" transform="translate(7.5 7.086)"/>
				<path d="M33.751 10.2v43.125a1.437 1.437 0 0 0 1.437 1.437h6.162a1.437 1.437 0 0 0 1.437-1.437V10.2a1.437 1.437 0 0 0-1.437-1.437h-6.162a1.437 1.437 0 0 0-1.437 1.437zm2.875 1.437h3.286v40.25h-3.286z" transform="translate(11.25)"/>
			</g>		
		</SvgIcon>
	);
}

//#endregion