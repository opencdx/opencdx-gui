import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { AppBar, Box, Container, useScrollTrigger } from '@mui/material';

import MenuList from './MenuList';
import useConfig from 'utils/hooks/useConfig';

function ElevationScroll({ children, window }) {
    const theme = useTheme();
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined
    });

    theme.shadows[4] = theme.customShadows.z1;

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0
    });
}

const CustomAppBar = () => {
    const theme = useTheme();
    const { container } = useConfig();

    return (
        <ElevationScroll>
            <AppBar
                sx={{
                    top: 71,
                    bgcolor: theme.palette.mode === 'dark' ? 'background.default' : 'background.paper',
                    width: '100%',
                    height: 62,
                    justifyContent: 'center',
                    borderTop: `1px solid ${theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.grey[300] + 98}`,
                    zIndex: 1098
                }}
            >
                <Container maxWidth={container ? 'lg' : false}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <MenuList />
                    </Box>
                </Container>
            </AppBar>
        </ElevationScroll>
    );
};

export default CustomAppBar;
