import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';
import { openSnackbar } from 'utils/store/slices/snackbar';
import { useDispatch } from 'utils/store';

// third-party
import { Chance } from 'chance';
// import jwtDecode from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from 'utils/store/actions';
import accountReducer from 'utils/store/accountReducer';

// project imports
import Loader from 'ui-component/Loader';
import axios from 'utils/axios/apiInterceptors';
import { Endpoints } from 'utils/axios/apiEndpoints';

const chance = new Chance();

// constant
const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

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
    const dispatchSnack = useDispatch();

    useEffect(() => {
        const init = async () => {
            try {
                const serviceToken = window.localStorage.getItem('serviceToken');
                if (serviceToken) {
                    setSession(serviceToken);
                    dispatch({
                        type: LOGIN,
                        payload: {
                            isLoggedIn: true
                        }
                    });
                } else {
                    dispatch({
                        type: LOGOUT
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: LOGOUT
                });
            }
            dispatch({
                type: LOGOUT
            });
        };

        init();
    }, []);

    const login = async (userName, password) => {
        try {
            const response = await Endpoints.login({ userName, password });

            dispatchSnack(
                openSnackbar({
                    open: true,
                    message: 'Successfully logged in.',
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: false
                })
            );
            const { token, user } = response.data;
            setSession(token);
            dispatch({
                type: LOGIN,
                payload: {
                    isLoggedIn: true,
                    user
                }
            });
        } catch (error) {
            console.error(error);
            dispatchSnack(
                openSnackbar({
                    open: true,
                    message: 'Something went wrong.',
                    variant: 'error',
                    alert: {
                        color: 'success'
                    },
                    close: false
                })
            );
        }
    };

    const register = async (email, password, firstName, lastName) => {
        // todo: this flow need to be recode as it not verified
        const id = chance.bb_pin();
        const response = await Endpoints.signup({
            type: 'IAM_USER_TYPE_REGULAR',
            firstName: 'Karthick',
            lastName: 'Raja',
            systemName: 'System Name',
            username: 'karthick@safehealth.me',
            password: 'password'
        });
        let users = response.data;
        if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
            const localUsers = window.localStorage.getItem('users');
            users = [
                ...JSON.parse(localUsers),
                {
                    id,
                    email,
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

    const resetPassword = async (email) => {
        console.log(email);
    };

    const updateProfile = () => {};

    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }

    return (
        <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile }}>{children}</JWTContext.Provider>
    );
};

JWTProvider.propTypes = {
    children: PropTypes.node
};

export default JWTContext;
