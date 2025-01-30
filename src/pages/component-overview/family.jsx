
// material-ui
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import axios from 'axios';

// project import
import { Formik, FieldArray } from 'formik';
import * as Yup from 'yup';
import AnimateButton from 'components/@extended/AnimateButton';
import { registerFamilyMember } from 'api/familyMember';
import successHandler from 'api/successHandler';
// ==============================|| COMPONENTS - TYPOGRAPHY ||============================== //

export default function ComponentFamily() {
  const initialValues = {
    familyMembers: [
      {
        firstname: '',
        lastname: '',
        email: '',
        occupation: '',
        address: '',
        age:'',
        contact:'',
      },
    ],
  };

  const validationSchema = Yup.object().shape({
    familyMembers: Yup.array().of(
      Yup.object().shape({
        firstname: Yup.string().max(255).required('First Name is required'),
        lastname: Yup.string().max(255).required('Last Name is required'),
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        occupation: Yup.string().max(255).required('Occupation is required'),
        address: Yup.string().max(255).required('Address is required'),
        age: Yup.number()
        .typeError('Age must be a number') 
        .positive('Age must be a positive number') 
        .integer('Age must be an integer') 
        .max(255, 'Age must be less than or equal to 255') 
        .required('Age is required'), 
        contact: Yup.string()
        .matches(/^\d+$/, 'Contact number must be a number')
        .min(10, 'Contact number must be at least 10 digits')
        .max(15, 'Contact number must be less than or equal to 15 digits') 
        .required('Contact number is required'), 
      })
    ),
  });


  const handleSubmit = async (values, { setErrors }) => {
    try {
      const response = await registerFamilyMember(values, { setErrors });
      successHandler(response);
    } catch (error) {
      console.log(error, 'show error message');
    }
  };
  

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <FieldArray name="familyMembers">
              {({ push, remove }) => (
                <> 
                  {values.familyMembers.map((member, index) => (
                    <Box key={index} sx={{ mb: 4 }}>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <h3>Family Member {index + 1}</h3>
                            {index > 0 && (
                              <IconButton onClick={() => remove(index)}>
                                <RemoveCircleOutlineIcon />
                              </IconButton>     
                            )}
                          </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor={`firstname-${index}`}>First Name*</InputLabel>
                            <OutlinedInput
                              id={`firstname-${index}`} 
                              value={member.firstname} 
                              name={`familyMembers[${index}].firstname`}
                              onChange={handleChange}
                              placeholder="Enter first name"
                              fullWidth
                              error={Boolean(
                                  touched.familyMembers?.[index]?.firstname &&
                                  errors.familyMembers?.[index]?.firstname 
                              )}
                            />
                          </Stack>
                          {touched.familyMembers?.[index]?.firstname &&
                            errors.familyMembers?.[index]?.firstname && (
                              <FormHelperText error>
                                {errors.familyMembers[index].firstname}
                              </FormHelperText>
                            )}
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor={`lastname-${index}`}>Last Name*</InputLabel>
                            <OutlinedInput
                              id={`lastname-${index}`}
                              value={member.lastname}
                              name={`familyMembers[${index}].lastname`}
                              onChange={handleChange}
                              placeholder="Enter last name"
                              fullWidth
                              error={Boolean(
                                touched.familyMembers?.[index]?.lastname &&
                                  errors.familyMembers?.[index]?.lastname 
                              )}
                            />
                          </Stack>
                          {touched.familyMembers?.[index]?.lastname &&
                            errors.familyMembers?.[index]?.lastname && (
                              <FormHelperText error>
                                {errors.familyMembers[index].lastname}
                              </FormHelperText>
                            )}
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor={`email-${index}`}>Email Address*</InputLabel>
                            <OutlinedInput
                              id={`email-${index}`}
                              value={member.email}
                              name={`familyMembers[${index}].email`}
                              onChange={handleChange}
                              placeholder="Enter email"
                              fullWidth
                              error={Boolean(
                                touched.familyMembers?.[index]?.email &&
                                  errors.familyMembers?.[index]?.email
                              )}
                            />
                          </Stack>
                          {touched.familyMembers?.[index]?.email &&
                            errors.familyMembers?.[index]?.email && (
                              <FormHelperText error>
                                {errors.familyMembers[index].email}
                              </FormHelperText>
                            )}
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor={`occupation-${index}`}>Occupation*</InputLabel>
                            <OutlinedInput
                              id={`occupation-${index}`}
                              value={member.occupation}
                              name={`familyMembers[${index}].occupation`}
                              onChange={handleChange}
                              placeholder="Enter occupation"
                              fullWidth
                              error={Boolean( 
                                touched.familyMembers?.[index]?.occupation &&
                                  errors.familyMembers?.[index]?.occupation 
                              )}

                            />
                          </Stack>
                          {touched.familyMembers?.[index]?.occupation &&
                            errors.familyMembers?.[index]?.occupation && (
                              <FormHelperText error>
                                {errors.familyMembers[index].occupation}
                              </FormHelperText>  
                            )}
                        </Grid>
                      
                        <Grid item xs={12} md={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor={`age-${index}`}>Age*</InputLabel>
                            <OutlinedInput
                              id={`age-${index}`}
                              value={member.age}
                              name={`familyMembers[${index}].age`}
                              onChange={handleChange}
                              placeholder="Enter age"
                              fullWidth
                              error={Boolean(
                                touched.familyMembers?.[index]?.age &&
                                  errors.familyMembers?.[index]?.age 
                              )}
                            />
                          </Stack>
                          {touched.familyMembers?.[index]?.age &&
                            errors.familyMembers?.[index]?.age && (
                              <FormHelperText error>
                                {errors.familyMembers[index].age}
                              </FormHelperText>
                            )}
                        </Grid>
                        {/* //Add contact no */}
                         <Grid item xs={12} md={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor={`contact-${index}`}>Contact No*</InputLabel>
                            <OutlinedInput
                              id={`contact-${index}`}
                              value={member.contact}
                              name={`familyMembers[${index}].contact`}
                              onChange={handleChange}
                              placeholder="Enter Your Contact "
                              fullWidth
                              error={Boolean(
                                touched.familyMembers?.[index]?.contact &&
                                  errors.familyMembers?.[index]?.contact 
                              )}
                            />
                          </Stack>
                          {touched.familyMembers?.[index]?.contact &&
                            errors.familyMembers?.[index]?.contact && (
                              <FormHelperText error>
                                {errors.familyMembers[index].contact}
                              </FormHelperText>
                            )}
                        </Grid>

                        <Grid item xs={12}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor={`address-${index}`}>Address*</InputLabel>
                            <OutlinedInput
                              id={`address-${index}`}
                              value={member.address}
                              name={`familyMembers[${index}].address`}
                              onChange={handleChange}
                              placeholder="Enter address"
                              fullWidth
                              multiline
                              rows={4}
                              error={Boolean( 
                                touched.familyMembers?.[index]?.address &&
                                errors.familyMembers?.[index]?.address
                              )}  
                            />
                          </Stack>
                          {touched.familyMembers?.[index]?.address &&
                            errors.familyMembers?.[index]?.address && (
                              <FormHelperText error>
                                {errors.familyMembers[index].address}
                              </FormHelperText>
                            )}
                        </Grid>
                      </Grid>
       {/* // margin top -margin bottom */}   
                      <Divider sx={{ my: 2 }} /> 
       {/* // margin  left - margin right  */}
                      {/* <Divider sx={{mx:2}}/>    */}
                    </Box> 
                  ))}
                  <Grid item xs={12}>
                    <Button
                      startIcon={<AddCircleOutlineIcon />}
                      variant="outlined"
                      onClick={() =>
                        push({
                          firstname: '',
                          lastname: '',
                          email: '',
                          occupation: '',
                          address: '',
                          age:'',
                          contact:'',
                        })
                      }
                    >
                      Add Another Member
                    </Button>
                  </Grid>
                </>
              )}
            </FieldArray>
            <Grid item xs={12} sx={{ mt: 4 }}>
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
                  {isSubmitting ? 'Submitting...' : 'Submit Family Members'}
                </Button>
              </AnimateButton>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}