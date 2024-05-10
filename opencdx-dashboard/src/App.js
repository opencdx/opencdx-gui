import { RouterProvider } from 'react-router-dom';

// routing
import router from 'layout-routes/routes';
import Locales from 'ui-component/Locales';
import NavigationScroll from 'layout-routes/layout/NavigationScroll';
import Snackbar from 'ui-component/extended/Snackbar';
import ThemeCustomization from 'utils/themes';
import { JWTProvider as AuthProvider } from 'utils/contexts/JWTContext';

const App = () => (
    <ThemeCustomization>
        <Locales>
            <NavigationScroll>
                <AuthProvider>
                    <RouterProvider router={router} />
                    <Snackbar />
                </AuthProvider>
            </NavigationScroll>
        </Locales>
    </ThemeCustomization>
);

export default App;
