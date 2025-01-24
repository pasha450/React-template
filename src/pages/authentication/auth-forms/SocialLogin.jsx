import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import React, { useState } from 'react';

// assets
import Google from 'assets/images/icons/google.svg';
import Twitter from 'assets/images/icons/twitter.svg';
import Github from "assets/images/icons/github.svg";
import Facebook from 'assets/images/icons/facebook.svg';
import { googleLoginHandler } from 'api/googleLogin';
import { useNavigate } from "react-router-dom";


// ==============================|| GoogleOAuthProvider - SOCIAL BUTTON ||============================== //

export default function SocialLogin() {
  const navigate = useNavigate();
  const downSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const data = await googleLoginHandler(credentialResponse); 
      console.log('User Data:', data); 
      navigate("/dashboard")
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };
  const handleGithubLogin = () => {
    window.location.href = 'http://localhost:5000/auth/github';
  };
     
  const facebookHandler = async () => {
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
    <Stack
      direction="row"
      spacing={{ xs: 1, sm: 2}}
      justifyContent={{ xs: 'space-around', sm: 'space-between' }}
      sx={{
        '& .MuiButton-startIcon': { mr: { xs: 0, sm: 1 }, ml: { xs: 0, sm: -0.5 } },
        
      }}
    >
      <GoogleLogin
  onSuccess={handleGoogleSuccess}
  onError={() => {
    console.error("Google Login Failed");
  }}
  render={(renderProps) => (
    <Button
      onClick={renderProps.onClick}
      disabled={renderProps.disabled}
      variant="outlined"
      color="secondary"
      fullWidth={!downSM}
      startIcon={<img src={Google} alt="Google" style={{ width: 20, height: 20 }} />}
      sx={{
        textTransform: "none",
        fontSize: "10px", 
        display: "flex",
        justifyContent: "flex-start", 
        border: "1px solid #ddd", 
        borderRadius: "8px", 
        height: "50px", 
      }}
    >
      {!downSM}
    </Button>
  )}
/>
<Button
  variant="outlined"
  color="secondary"
  fullWidth={!downSM}
  onClick={handleGithubLogin}
  startIcon={<img src={Github} alt="Github" style={{ width: 20, height: 20 }} />}
  sx={{
    textTransform: "none",
    fontSize: "14px",
    display: "flex",
    justifyContent: "flex-start",
    border: "1px solid #ddd",
    borderRadius: "4px",
    height: "40px",
  }}
>
  {!downSM &&"Github"}
</Button>
<Button
  variant="outlined"
  color="secondary"
  fullWidth={!downSM}
  startIcon={<img src={Facebook} alt="Facebook" style={{ width: 20, height: 20 }} />}

  sx={{
    textTransform: "none",
    fontSize: "14px",
    display: "flex",
    justifyContent: "flex-start",
    border: "1px solid #ddd",
    borderRadius: "4px",
    height: "40px",
  }}
>
  {/* {!downSM} */}
  {!downSM && "Facebook"}

</Button>
    </Stack>
  </GoogleOAuthProvider>
  );
}
