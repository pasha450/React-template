import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { fetchUserProfile } from 'src/api/auth';


// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';



export default function EditProfile({touched ,errors}){
        const [fileName, setFileName] = useState("No file chosen");
        
        const handleFileChange = (event) => {
          const file = event.target.files[0];
          if (file) {
            setFileName(file.name);
          } else {
            setFileName("No file chosen");
          }
        };
       // Fetch user profile on component mount
        useEffect(() => {
        const getUserData = async () => {
          try {
            const userData = await fetchUserProfile();
            console.log('fetched user data:',userData)
            setInitialValues({
              firstname: userData.firstname || '',
              lastname: userData.lastname || '',
              email: userData.email || '',
            });
          } catch (error) {
            console.error('Error fetching user profile:', error);
          }
        };

        getUserData();
        }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log('Form submitted with values:', values);
    setSubmitting(false);
  };
  return (
    <>
      <Formik
        initialValues={{
          firstname: '',
          lastname: '',
          email: '',
          company: '',
          address:'',
          profileImage:'',
          submit: null 
        }}
        validationSchema={Yup.object().shape({
          firstname: Yup.string().max(255).required('First Name is required'),
          lastname: Yup.string().max(255).required('Last Name is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          address:Yup.string().max(255).required('Address filed is required'),
        })}
        onSubmit={handleSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="firstname-signup">First Name*</InputLabel>
                  <OutlinedInput
                    id="firstname-login"
                    type="firstname"
                    value={values.firstname}
                    name="firstname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter your first Name"
                    fullWidth
                    error={Boolean(touched.firstname && errors.firstname)}
                  />
                </Stack>
                {touched.firstname && errors.firstname && (
                  <FormHelperText error id="helper-text-firstname-signup">
                    {errors.firstname}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="lastname-signup">Last Name*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.lastname && errors.lastname)}
                    id="lastname-signup"
                    type="lastname"
                    value={values.lastname}
                    name="lastname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter your Last Name "
                    inputProps={{}}

                  />
                </Stack>
                {touched.lastname && errors.lastname && (
                  <FormHelperText error id="helper-text-lastname-signup">
                    {errors.lastname}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="company-signup">Company</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.company && errors.company)}
                    id="company-signup"
                    value={values.company}
                    name="company"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Demo Inc."
                    inputProps={{}}
                  />
                </Stack>
                {touched.company && errors.company && (
                  <FormHelperText error id="helper-text-company-signup">
                    {errors.company}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="demo@company.com"
                    inputProps={{}} 

                  />
                </Stack>
                {touched.email && errors.email && (
                  <FormHelperText error id="helper-text-email-signup">
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                    <InputLabel htmlFor="profile-image">Profile Image</InputLabel>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            border: "1px solid",
                            borderColor: touched?.profileImage && errors?.profileImage ? "error.main" : "grey.300",
                            borderRadius: "4px",
                            padding: "3px ",
                            backgroundColor: "white",
                            
                        }}
                        >
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Button
                            component="label"
                            variant="contained"
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload File
                            <input
                                type="file"
                                hidden
                                onChange={handleFileChange}
                                id="profile-image"
                                multiple
                            />
                        </Button>
                        <Typography variant="body2">{fileName}</Typography>
                        </Stack>
                    </Box>
                    {touched.profileImage && errors.profileImage && (
                    <FormHelperText error id="helper-text-profile-image">
                        {errors.profileImage}
                    </FormHelperText>
                    )}
                </Stack>
             </Grid>

                <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="contact-signup">Contact Number</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.contact && errors.contact)}
                    id="Contact-Number"
                    type="number"
                    value={values.contact}
                    name="contact"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="+91 "
                    inputProps={{}} 
                  />
                </Stack>
                {touched.contact && errors.contact && (
                  <FormHelperText error id="helper-text-email-signup">
                    {errors.contact}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                    <InputLabel htmlFor="address-signup">Address*</InputLabel>
                    <textarea
                    id="address-signup"
                    name="address"
                    value={values.address}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    rows={4}
                    style={{
                        width: '100%',
                        padding: '10px',
                        borderColor: touched.address && errors.address ? 'red' : '#ccc',
                        borderRadius: '4px',
                        fontSize: '1rem',
                        fontFamily: 'inherit',
                        
                    }}
                    />
                </Stack>
                {touched.address && errors.address && (
                    <FormHelperText error id="helper-text-address-signup">
                    {errors.address}
                    </FormHelperText>
                )}
                </Grid>


              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation 
                  disabled={isSubmitting} 
                  fullWidth size="large" 
                  type="submit" 
                  variant="contained"
                  color="primary">
                  Edit Profile
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
