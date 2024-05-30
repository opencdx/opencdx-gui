'use client';

import PropTypes from 'prop-types';
import React, { createContext, useEffect, useReducer } from 'react';

// third-party
import { Chance } from 'chance';
import jwtDecode from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from 'store/actions';
import accountReducer from 'store/accountReducer';

// project imports
import Loader from 'components/ui-component/Loader';
import axios from 'utils/axios';

const chance = new Chance();

// constant
const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

// const verifyToken = (serviceToken) => {
//   if (!serviceToken) {
//     return false;
//   }
//   const decoded = jwtDecode(serviceToken);
//   /**
//    * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
//    */
//   return decoded.exp > Date.now() / 1000;
// };

const setSession = (serviceToken) => {
  if (serviceToken) {
    localStorage.setItem('serviceToken', serviceToken);
    axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    localStorage.removeItem('serviceToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accountReducer, initialState);

  useEffect(() => {
    const init = async () => {
      // try {
      //   const serviceToken = window.localStorage.getItem('serviceToken');
      //   if (serviceToken && verifyToken(serviceToken)) {
      //     setSession(serviceToken);
      //     dispatch({
      //       type: LOGIN,
      //       payload: {
      //         isLoggedIn: true,
      //       }
      //     });
      //   } else {
      //     dispatch({
      //       type: LOGOUT
      //     });
      //   }
      // } catch (err) {
      //   console.error(err);
      //   dispatch({
      //     type: LOGOUT
      //   });
      // }
          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
            }
          });
    };

    init();
  }, []);

  const login = async (userName, password) => {
    const response = await axios.post('https://ec2-3-13-148-183.us-east-2.compute.amazonaws.com:8080/iam/user/login', { userName, password });
    const { token } = response.data;
    setSession(token);
    dispatch({
      type: LOGIN,
      payload: {
        isLoggedIn: true,
      }
    });
  };

  const register = async (userName, password, firstName, lastName) => {
    // todo: this flow need to be recode as it not verified
    const id = chance.bb_pin();
    const response = await axios.post('/api/account/register', {
      id,
      userName,
      password,
      firstName,
      lastName
    });
    let users = response.data;

    if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
      const localUsers = window.localStorage.getItem('users');
      users = [
        ...JSON.parse(localUsers),
        {
          id,
          userName,
          password,
          name: `${firstName} ${lastName}`
        }
      ];
    }

    window.localStorage.setItem('users', JSON.stringify(users));
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: LOGOUT });
  };

  const resetPassword = async () => {};

  const updateProfile = () => {};

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile }}>{children}</JWTContext.Provider>;
};

JWTProvider.propTypes = {
  children: PropTypes.node
};

export default JWTContext;
