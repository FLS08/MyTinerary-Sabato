import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Logo from './logo';
import {Link} from "react-router-dom"
import {connect} from 'react-redux'

import userActions from '../redux/action/userAction';



const NavBar = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  /* Function to singout */

  function SignOut() {
		props.SignOutUser(props.user.email)
	}
  console.log(props);


  return (
    <AppBar position="fixed" className='NavBar'>
      <Container maxWidth="xl" >
        <Toolbar disableGutters>

          <Logo/>

          <Box sx={{ mt:'20px', flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{mt:'20px',
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem>
                <Link to="home" className='link'> Home </Link>
              </MenuItem>
              <MenuItem>
                <Link to="cities" className='link'>Cities</Link>
              </MenuItem>
            </Menu>
          </Box>
          <Box sx={{mt:'20px', flexGrow: 1, justifyContent: 'flex-end', mr: 2, display: { xs: 'none', md: 'flex' } }}>
      
            <MenuItem>
              <Link to="home" className='link'> Home </Link>
            </MenuItem>
            <MenuItem>
              <Link to="cities" className='link'>Cities</Link>
            </MenuItem>
            
          </Box>

          <Box sx={{mt:'20px', flexGrow: 0 }}>
            <Tooltip >
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {!props.user ? <PersonOutlineIcon /> : <img src={props.user.urlImage} alt="ph" className='profilePhoto' />  }
              </IconButton>
            </Tooltip>
          <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              className="settings-navbar"
            >
            {!props.user ? 
            <>
            <MenuItem>
              <Link to="/auth/signin" className='link'>Sign In</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/auth/signup" className='link'>Sign Up</Link>
            </MenuItem>
            </>:
            <>
            <MenuItem>
              <Link to="/auth/signin" className='link' onClick={SignOut}>Log Out</Link>
            </MenuItem>
            </> }
          </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};


const mapStateToProps = (state)=>{
  return{
    user:state.userReducer.user,
  }
}

const mapDispatchToProps = {
	SignOutUser: userActions.SignOutUser,

}

export default connect(mapStateToProps,mapDispatchToProps)(NavBar);
