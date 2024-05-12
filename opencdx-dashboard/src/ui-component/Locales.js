import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import useConfig from 'utils/hooks/useConfig';

const loadLocaleData = (locale) => {
    switch (locale) {
        default:
            return import('utils/locales/en.json');
    }
};

const Locales = ({ children }) => {
    const { locale } = useConfig();
    const [messages, setMessages] = useState();

    useEffect(() => {
        loadLocaleData(locale).then((d) => {
            setMessages(d.default);
        });
    }, [locale]);

    return (
        <>
            {messages && (
                <IntlProvider locale={locale} defaultLocale="en" messages={messages}>
                    {children}
                </IntlProvider>
            )}
        </>
    );
};

Locales.propTypes = {
    children: PropTypes.node
};

export default Locales;
