import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../index';
import axios from 'utils/axios/apiInterceptors';

const initialState = {
    selectedItem: ['dashboard'],
    selectedID: null,
    drawerOpen: false,
    error: null,
    menu: {}
};

const menu = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        activeItem(state, action) {
            state.selectedItem = action.payload;
        },

        activeID(state, action) {
            state.selectedID = action.payload;
        },

        openDrawer(state, action) {
            state.drawerOpen = action.payload;
        },

        hasError(state, action) {
            state.error = action.payload;
        },

        getMenuSuccess(state, action) {
            state.menu = action.payload;
        }
    }
});

export default menu.reducer;

export const { activeItem, openDrawer, activeID } = menu.actions;

export function getMenu() {
    return async () => {
        try {
            const response = await axios.get('/api/menu/widget');
            dispatch(menu.actions.getMenuSuccess(response.data.widget));
        } catch (error) {
            dispatch(menu.actions.hasError(error));
        }
    };
}
