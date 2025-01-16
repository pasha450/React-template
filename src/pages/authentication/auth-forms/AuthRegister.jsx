import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// third party
import * as Yup from 'yup';
import { Formik, ErrorMessage } from 'formik';

// project imports
import AnimateButton from 'components/@extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import { registerUser } from 'src/api/auth'; // register user from API component
// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import successHandler from 'api/successHandler';
import { validationErrors } from 'api/errorHandler';
import { Grid, Stack, InputLabel, OutlinedInput, FormHelperText, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
// ============================|| JWT - REGISTER ||============================ //

export default function AuthRegister() {
  const [level, setLevel] = useState();
  const [serverErrors, setServerErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  const formSubmit = async (values, { setSubmitting, setFieldError }) => {
    setServerErrors([]); // Clear previous server-side errors
    try {
      const response = await registerUser(values); // API call to register user
      successHandler(response); // Handle success (toast notification or redirect)
      toast.success('Registration successful!');
    } catch (error) {
      setSubmitting(false);
      validationErrors(error,setFieldError,setServerErrors);
    }

    
  };



  
  return (
    <Formik
      initialValues={{
        firstname: '',
        lastname: '',
        email: '',
        company: '',
        password: '',
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        firstname: Yup.string().max(255).required('First Name is required'),
        lastname: Yup.string().max(255).required('Last Name is required'),
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
      })}
      onSubmit={formSubmit}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="firstname-signup">First Name*</InputLabel>
                <OutlinedInput
                  id="firstname-signup"
                  type="text"
                  value={values.firstname}
                  name="firstname"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter your First Name"
                  fullWidth
                  error={Boolean(touched.firstname && errors.firstname)}
                />
                <FormHelperText error>{touched.firstname && errors.firstname}</FormHelperText>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="lastname-signup">Last Name*</InputLabel>
                <OutlinedInput
                  id="lastname-signup"
                  type="text"
                  value={values.lastname}
                  name="lastname"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter your Last Name"
                  fullWidth
                  error={Boolean(touched.lastname && errors.lastname)}
                />
                <FormHelperText error>{touched.lastname && errors.lastname}</FormHelperText>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="company-signup">Company</InputLabel>
                <OutlinedInput
                  id="company-signup"
                  type="text"
                  value={values.company}
                  name="company"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Demo Inc."
                  fullWidth
                  error={Boolean(touched.company && errors.company)}
                />
                <FormHelperText error>{touched.company && errors.company}</FormHelperText>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                <OutlinedInput
                  id="email-signup"
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="demo@company.com"
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                />
                <FormHelperText error>{touched.email && errors.email}</FormHelperText>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="password-signup">Password*</InputLabel>
                <OutlinedInput
                  id="password-signup"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    changePassword(e.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Enter your Password"
                  fullWidth
                  error={Boolean(touched.password && errors.password)}
                />
                <FormHelperText error>{touched.password && errors.password}</FormHelperText>
                <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px', mt: 1 }} />
                <Typography variant="subtitle1" fontSize="0.75rem">
                  {level?.label}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">
                By Signing up, you agree to our&nbsp;
                <Link variant="subtitle2" component={RouterLink} to="#">
                  Terms of Service
                </Link>
                &nbsp;and&nbsp;
                <Link variant="subtitle2" component={RouterLink} to="#">
                  Privacy Policy
                </Link>
              </Typography>
            </Grid>
            {errors.submit && (
              <Grid item xs={12}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Grid>
            )}
            <Grid item xs={12}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Create Account
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}
