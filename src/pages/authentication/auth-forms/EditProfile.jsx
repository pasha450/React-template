import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Material-UI
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// Third-party
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';

// Project Imports
import { useUser } from 'src/contexts/auth-reducer/userContext';
import { fetchUserProfile, updateUserProfile } from 'api/auth';
import AnimateButton from 'components/@extended/AnimateButton';
import { validationErrors } from 'api/errorHandler';
import successHandler from 'api/successHandler';

export default function EditProfile() {
  const { user } = useUser();
  const [fileName, setFileName] = useState('No file chosen');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    company: '',
    address: '',
    profile_image: '',
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setFormData({ ...formData, profile_image: file });
    } else {
      setFileName('No file chosen');
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        if (user?._id && user?.token) {
          const userData = await fetchUserProfile(user._id, user.token);
          setFormData({
            firstname: userData.firstname || '',
            lastname: userData.lastname || '',
            email: userData.email || '',
            company: userData.company || '',
            address: userData.address || '',
            profile_image: userData.profile_image || '',
          });
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };
    getUserData();
  }, [user]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (user?._id && user?.token) {
        const response = await updateUserProfile(values, user._id, user.token);
        successHandler(response);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      validationErrors(error);
    } finally {
      setSubmitting(false);
    }
  };  

  if (loading) {
    return <CircularProgress />;
  }
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={formData}
        validationSchema={Yup.object().shape({
          firstname: Yup.string().max(255).required('First Name is required'),
          lastname: Yup.string().max(255).required('Last Name is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          address: Yup.string().max(255).required('Address is required'),
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
                    id="firstname-signup"
                    value={values.firstname}
                    name="firstname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    fullWidth
                    error={Boolean(touched.firstname && errors.firstname)}
                  />
                </Stack>
                {touched.firstname && errors.firstname && (
                  <FormHelperText error>{errors.firstname}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="lastname-signup">Last Name*</InputLabel>
                  <OutlinedInput
                    id="lastname-signup"
                    value={values.lastname}
                    name="lastname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    fullWidth
                    error={Boolean(touched.lastname && errors.lastname)}
                  />
                </Stack>
                {touched.lastname && errors.lastname && (
                  <FormHelperText error>{errors.lastname}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                  <OutlinedInput
                    id="email-signup"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                </Stack>
                {touched.email && errors.email && (
                  <FormHelperText error>{errors.email}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="profile-image">Profile Image</InputLabel>
                  <Box>
                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                      Upload File
                      <input type="file" hidden onChange={handleFileChange} />
                    </Button>
                    <Typography>{fileName}</Typography>
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="address-signup">Address*</InputLabel>
                  <OutlinedInput
                    id="address-signup"
                    value={values.address}
                    name="address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    fullWidth
                    multiline
                    rows={4}
                    error={Boolean(touched.address && errors.address)}
                  />
                </Stack>
                {touched.address && errors.address && (
                  <FormHelperText error>{errors.address}</FormHelperText>
                )}
              </Grid>
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
                    {isSubmitting ? <CircularProgress size={24} /> : 'Edit Profile'}
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
