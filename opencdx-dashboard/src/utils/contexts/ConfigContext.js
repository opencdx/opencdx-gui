import PropTypes from 'prop-types';
import { createContext } from 'react';

import defaultConfig from 'config';
import useLocalStorage from 'utils/hooks/useLocalStorage';

const initialState = {
    ...defaultConfig,
    onChangeLayout: () => {},
    onChangeDrawer: () => {},
    onChangeMenuType: () => {},
    onChangePresetColor: () => {},
    onChangeLocale: () => {},
    onChangeContainer: () => {},
    onChangeFontFamily: () => {},
    onChangeBorderRadius: () => {},
    onChangeOutlinedField: () => {},
    onReset: () => {}
};

const ConfigContext = createContext(initialState);

function ConfigProvider({ children }) {
    const [config, setConfig] = useLocalStorage('admin-config', {
        layout: initialState.layout,
        drawerType: initialState.drawerType,
        fontFamily: initialState.fontFamily,
        borderRadius: initialState.borderRadius,
        outlinedFilled: initialState.outlinedFilled,
        navType: initialState.navType,
        presetColor: initialState.presetColor,
        locale: initialState.locale
    });

    const onChangeLayout = (layout) => {
        setConfig({
            ...config,
            layout
        });
    };

    const onChangeDrawer = (drawerType) => {
        setConfig({
            ...config,
            drawerType
        });
    };

    const onChangeMenuType = (navType) => {
        setConfig({
            ...config,
            navType
        });
    };

    const onChangePresetColor = (presetColor) => {
        setConfig({
            ...config,
            presetColor
        });
    };

    const onChangeLocale = (locale) => {
        setConfig({
            ...config,
            locale
        });
    };

    const onChangeContainer = (container) => {
        setConfig({
            ...config,
            container
        });
    };

    const onChangeFontFamily = (fontFamily) => {
        setConfig({
            ...config,
            fontFamily
        });
    };

    const onChangeBorderRadius = (event, newValue) => {
        setConfig({
            ...config,
            borderRadius: newValue
        });
    };

    const onChangeOutlinedField = (outlinedFilled) => {
        setConfig({
            ...config,
            outlinedFilled
        });
    };

    const onReset = () => {
        setConfig({ ...defaultConfig });
    };

    return (
        <ConfigContext.Provider
            value={{
                ...config,
                onChangeLayout,
                onChangeDrawer,
                onChangeMenuType,
                onChangePresetColor,
                onChangeLocale,
                onChangeContainer,
                onChangeFontFamily,
                onChangeBorderRadius,
                onChangeOutlinedField,
                onReset
            }}
        >
            {children}
        </ConfigContext.Provider>
    );
}

ConfigProvider.propTypes = {
    children: PropTypes.node
};

export { ConfigProvider, ConfigContext };
