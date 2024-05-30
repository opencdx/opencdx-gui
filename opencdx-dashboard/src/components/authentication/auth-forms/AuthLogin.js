import React from 'react';
import { useRouter } from 'next/navigation';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'components/ui-component/extended/AnimateButton';
import { DASHBOARD_PATH } from 'config';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ===============================|| JWT LOGIN ||=============================== //

const JWTLogin = ({ ...others }) => {
  const theme = useTheme();
  const router = useRouter();
  const { login } = useAuth();
  const scriptedRef = useScriptRef();

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Formik
      initialValues={{
        userName: 'admin@opencdx.org',
        password: 'password',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        userName: Yup.string().email('Must be a valid userName').max(255).required('userName is required'),
        password: Yup.string().max(255).required('Password is required')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await login(values.userName, values.password);
          if (scriptedRef.current) {
            setStatus({ success: true });
            router.push(DASHBOARD_PATH);
            setSubmitting(false);
          }
        } catch (err) {
          console.error(err);
          // setStatus({ success: true });
          // router.push(DASHBOARD_PATH);
          // setSubmitting(false);
          if (scriptedRef.current) {
            
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit} {...others}>
          <FormControl fullWidth error={Boolean(touched.userName && errors.userName)} sx={{ ...theme.typography.customInput }}>
            <InputLabel htmlFor="outlined-adornment-userName-login">Email Address / Username</InputLabel>
            <OutlinedInput
              id="outlined-adornment-userName-login"
              type="email"
              value={values.userName}
              name="userName"
              onBlur={handleBlur}
              onChange={handleChange}
              inputProps={{}}
            />
            {touched.userName && errors.userName && (
              <FormHelperText error id="standard-weight-helper-text-userName-login">
                {errors.userName}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
            <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password-login"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="large"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              inputProps={{}}
              label="Password"
            />
            {touched.password && errors.password && (
              <FormHelperText error id="standard-weight-helper-text-password-login">
                {errors.password}
              </FormHelperText>
            )}
          </FormControl>

          {errors.submit && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}
          <Box sx={{ mt: 2 }}>
            <AnimateButton>
              <Button color="secondary" disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                Sign In
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default JWTLogin;
