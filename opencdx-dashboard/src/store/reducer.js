// third-party
import { combineReducers } from 'redux';

// project imports
import snackbarReducer from './slices/snackbar';
import menuReducer from './slices/menu';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  snackbar: snackbarReducer,
  menu: persistReducer(
    {
      key: 'menu',
      storage,
      keyPrefix: 'helloworld-'
    },
    menuReducer
  )
});

export default reducer;
