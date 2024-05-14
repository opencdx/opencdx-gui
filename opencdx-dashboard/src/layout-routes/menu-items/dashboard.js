import { FormattedMessage } from 'react-intl';
import { Home } from '@mui/icons-material';

const samplePage = {
    id: 'dashboard',
    title: <FormattedMessage id="dashboard" />,
    icon: Home,
    type: 'group',
    url: '/dashboard',
    children: [
        {
            id: 'dashboard-maps',
            title: <FormattedMessage id="maps" />,
            type: 'item',
            url: '/dashboard/maps',
            breadcrumbs: false
        }
    ]
};

export default samplePage;
