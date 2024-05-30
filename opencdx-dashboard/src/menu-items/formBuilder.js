
import { FormattedMessage } from 'react-intl';

import { IconBrandChrome } from '@tabler/icons-react';

const icons = {
  IconBrandChrome
};

const formBuilder = {
  id: 'form-builder',
  title: <FormattedMessage id="formBuilder" />,
  icon: icons.IconBrandChrome,
  type: 'group',
  url: '/formBuilder',
  breadcrumbs: false
};

export default formBuilder;
