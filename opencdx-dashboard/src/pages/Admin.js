import axios from 'utils/axios/apiInterceptors';
import { useState, useEffect } from 'react';
import ErrorPage from 'pages/ErrorPage';

// ==============================|| ELEMENT REFERENCE HOOKS ||============================== //

const Admin = () => {
    const [isValidPage, setIsValidPage] = useState(false);

    useEffect(() => {
        const url = process.env.REACT_APP_API_URL_SECURED
            ? 'https://localhost:8861/admin/wallboard'
            : 'http://localhost:8861/admin/wallboard';
        const fetchData = async () => {
            try {
                await axios.post(url);
                setIsValidPage(true);
            } catch (error) {
                setIsValidPage(false);
            }
        };

        fetchData();
    }, []);

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null;
    };

    return <div>{isValidPage ? openInNewTab(url) : <ErrorPage />}</div>;
};
export default Admin;
