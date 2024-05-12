import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';

import App from 'App';
import { store } from 'utils/store';
import * as serviceWorker from 'serviceWorker';
import reportWebVitals from 'reportWebVitals';
import { ConfigProvider } from 'utils/contexts/ConfigContext';

import 'utils/assets/scss/style.scss';
import 'utils/assets/doc.css';

import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/700.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <ConfigProvider>
            <App />
        </ConfigProvider>
    </Provider>
);
serviceWorker.unregister();

reportWebVitals();
