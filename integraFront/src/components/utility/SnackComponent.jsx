import React,{Component} from 'react'
import * as ConstantStyles from '../../constants/ConstantStyles'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { push } from 'connected-react-router'
import { connect } from 'react-redux';

class SnackComponent extends Component{	
	constructor(props){
        super(props)
        
		//console.log(props);
	}
    

	render(){
		return(
			<>
				<SnackBarInternal pass={this.props.snackData}/>
			</>
		)
	}
}

function SnackBarInternal(props) {
    const classes = ConstantStyles.useStyles();
    const [open, setOpen] = React.useState(false);
    function handleClose(event, reason) {
		if (reason === 'clickaway') {
			return;
		}	
		setOpen(false);
    }
    
    function MySnackbarContentWrapper(props) {
        const { message, variant } = props;
      
      return (
          <SnackbarContent
          className={classes[variant]}
          message={message}
          style={{fontFamily:'Realist',}}
          />
      );
    }
  
  return (
      <>
    {/* {console.log(props)} */}
    <Snackbar
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
        open={props.pass.status}
        autoHideDuration={1500}
        onClose={handleClose}
        style={{fontFamily:'Realist',}}		
        >	
        {props.pass.mode?
        <MySnackbarContentWrapper
        variant='successSnackBar'
        message={props.pass.text}
        />:<MySnackbarContentWrapper
        variant='errorSnackBar'
        message={props.pass.text}
        />}							
    </Snackbar>
    </>
  );
}



export default connect(null, { push })(SnackComponent);