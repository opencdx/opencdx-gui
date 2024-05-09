import { FormattedMessage } from 'react-intl';
import { Sms, Email, Map, VerifiedUser, Article } from '@mui/icons-material';

const pages = {
    id: 'pages',
    title: <FormattedMessage id="pages" />,
    type: 'group',
    children: [
        {
            id: 'forms-builder',
            title: <FormattedMessage id="forms-builder" />,
            type: 'item',
            icon: Article,
            target: true,
            url: '/form-builder'
        },
        {
            id: 'email',
            title: <FormattedMessage id="email" />,
            type: 'item',
            icon: Email,
            url: '/pages/email',
        },
        {
            id: 'sms',
            title: <FormattedMessage id="sms" />,
            type: 'item',
            icon: Sms,
            url: '/pages/sms',
        },
        {
            id: 'audit-records',
            title: <FormattedMessage id="audit-records" />,
            icon: VerifiedUser,
            type: 'item',
            url: '/pages/audit-log'
        },
        {
            id: 'maps',
            title: <FormattedMessage id="maps" />,
            icon: Map,
            type: 'item',
            url: '/dashboard/maps'
        }
    ]
};

export default pages;
