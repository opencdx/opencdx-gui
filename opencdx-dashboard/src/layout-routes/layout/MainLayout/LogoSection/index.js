import { Link as RouterLink } from 'react-router-dom';

import { Link } from '@mui/material';

import { DASHBOARD_PATH } from 'config';
import Logo from 'ui-component/Logo';

const LogoSection = () => (
    <Link component={RouterLink} to={DASHBOARD_PATH} aria-label=" logo">
        <Logo />
    </Link>
);

export default LogoSection;
