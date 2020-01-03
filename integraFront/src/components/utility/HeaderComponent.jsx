import React,{Component} from 'react'
import * as ConstantStyles from '../../constants/ConstantStyles'
import * as ConstantCLass from '../../constants/ConstantCLass'
import * as ConstantMessages from '../../constants/ConstantMessages'
import IntegraServer from '../IntegraServer.js'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';

import List from '@material-ui/core/List';

import { push } from 'connected-react-router'
import { connect } from 'react-redux';

function HeaderComponentInternal(props){

	const classes = ConstantStyles.useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const isMenuOpen = Boolean(anchorEl);
	const [userDecoded, setUserDecoded] = React.useState(IntegraServer.getCurrentUserDecoded());

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleProfileMenuOpen = event => {
		setAnchorEl(event.currentTarget);
	};

	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});

	const toggleDrawer = (side, open) => event => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
		  return;
		}		
		setState({ ...state, [side]: open });
	};

	const menuId = 'primary-search-account-menu';

	function logoutFC(){
		IntegraServer.logout();
		props.nav.push(`/login`)
	}

	const renderMenu = (
		<Menu
		  anchorEl={anchorEl}
		  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
		  id={menuId}
		  keepMounted
		  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
		  open={isMenuOpen}
		  onClose={handleMenuClose}
		>
		  {/* <MenuItem onClick={handleMenuClose}>{ConstantMessages.MessageTexts.MenuMessages.EditProfile}</MenuItem> */}
		  <MenuItem onClick={logoutFC}>{ConstantMessages.MessageTexts.MenuMessages.Disconect}</MenuItem>
		</Menu>
	);

	function clickAssoc(){
		props.nav.push(`/assoc/`);
	}
	function clickAtend(){
		props.nav.push(`/atend/`);
	}
	function clickPaci(){
		props.nav.push(`/paci/`);
	}
	function clickApoia(){
		props.nav.push(`/apoia/`);
	}
	function clickConfig(){
		props.nav.push(`/func`);
	}
	function clickDados(){
		props.nav.push(`/dados/`);
	}

	const sideList = side => (
		<div
		  onClick={toggleDrawer(side, false)}
		  onKeyDown={toggleDrawer(side, false)}
		>
		  <List style={ConstantStyles.MenuScreen.List}>
				<div style={{minWidth: '1px',padding:'5px',display:'flex',flexDirection:'column',}}>
					<Button style={ConstantStyles.MenuScreen.MenuButtons} onClick={clickAssoc}>
						<ConstantStyles.AssociacoesIcon stroke={'rgba(0, 0, 0, 0.15)'} strokeWidth={1} style={ConstantStyles.MenuScreen.SideButtons}/>
					</Button>
					<Button style={ConstantStyles.MenuScreen.MenuButtons} onClick={clickAtend}>				
						<ConstantStyles.AtendimentosIcon stroke={'rgba(0, 0, 0, 0.15)'} strokeWidth={1} style={ConstantStyles.MenuScreen.SideButtons}/>
					</Button>
					<Button style={ConstantStyles.MenuScreen.MenuButtons} onClick={clickPaci}>
						<ConstantStyles.PacientesIcon stroke={'rgba(0, 0, 0, 0.15)'} strokeWidth={5} style={ConstantStyles.MenuScreen.SideButtons}/>
					</Button>
					<Button style={ConstantStyles.MenuScreen.MenuButtons} onClick={clickApoia}>
						<ConstantStyles.ApoiadoresIcon stroke={'rgba(0, 0, 0, 0.15)'} strokeWidth={5} style={ConstantStyles.MenuScreen.SideButtons}/>
					</Button>
					<Button style={ConstantStyles.MenuScreen.MenuButtons} onClick={clickConfig}>
						<ConstantStyles.AdministracaoIcon stroke={'rgba(0, 0, 0, 0.15)'} strokeWidth={5} style={ConstantStyles.MenuScreen.SideButtons}/>
					</Button>
					<Button style={ConstantStyles.MenuScreen.MenuButtons} onClick={clickDados}>
						<ConstantStyles.EstatisticaIcon stroke={'rgba(0, 0, 0, 0.15)'} strokeWidth={1} style={ConstantStyles.MenuScreen.SideButtons}/>
					</Button>
				</div>
		  </List>
		</div>
	);

	function getInitials(name){
		let parts = name.split(" ");
		if (parts.length>=2) {
			return parts[0].substr(0,1)+parts[1].substr(0,1);
		}else{
			return parts[0].substr(0,1);
		}
	};
	
	return(
		<div>
			<AppBar position="static" style={ConstantStyles.MenuScreen.HeaderBox}>
				<Toolbar>
					<Button onClick={toggleDrawer('left', true)} style={ConstantStyles.MenuScreen.MenuButtonIcon}>
						<MenuIcon style={ConstantStyles.MenuScreen.MenuIcon}/>
					</Button>
						<Drawer open={state.left} onClose={toggleDrawer('left', false)}>
							{sideList('left')}
						</Drawer> 
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
						placeholder="Pesquisar"
						classes={{
							root: classes.inputRoot,
							input: classes.inputInput,
						}}
						inputProps={{ 'aria-label': 'search' }}
						/>
					</div>
					<div style={{flexGrow: '0.8',}} />
					<img src={ConstantCLass.Img.LogoIntegra} style={ConstantStyles.MenuScreen.Logo1} alt="logo"/>
					<div style={{flexGrow: '1',}} />
					<Divider orientation="horizontal" style={{
					border:'1px solid',
					height:'30px',
					//width:'20px',
					color:'#b9b9b9', 
					}}/>
					<div style={{flexGrow: '0.01',}} />
					<Button
					edge="end"
					aria-label="account of current user"
					aria-controls={menuId}
					aria-haspopup="true"
					onClick={handleProfileMenuOpen}
					color="inherit"
					size='small'
					>						
						<Typography className={classes.title} style={{fontFamily:'Realist',}} noWrap>
							{userDecoded.user.nome}
						</Typography>
						<Avatar style={ConstantStyles.MenuScreen.Avatar}>{getInitials(userDecoded.user.nome)}</Avatar>
					</Button>					
				</Toolbar>
			</AppBar>
			{renderMenu}
		</div>
	);	
}

class HeaderComponent extends Component{	
	constructor(props){
		super(props)
		
	}


	render(){
		return(
			<>
				<HeaderComponentInternal nav={this.props}/>
			</>
		)
	}
}

export default connect(null, { push })(HeaderComponent);