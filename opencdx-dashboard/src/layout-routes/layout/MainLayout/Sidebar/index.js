import { memo, useMemo } from 'react';

import { useTheme } from '@mui/material/styles';
import { Box, Drawer, useMediaQuery } from '@mui/material';

import PerfectScrollbar from 'react-perfect-scrollbar';

import MenuList from '../MenuList';
import LogoSection from '../LogoSection';
import MiniDrawerStyled from './MiniDrawerStyled';

import LAYOUT_CONST from 'utils/constant';
import useConfig from 'utils/hooks/useConfig';
import { drawerWidth } from 'utils/store/constant';

import { useDispatch, useSelector } from 'utils/store';
import { openDrawer } from 'utils/store/slices/menu';

const Sidebar = () => {
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

    const dispatch = useDispatch();
    const { drawerOpen } = useSelector((state) => state.menu);

    const { drawerType } = useConfig();

    const logo = useMemo(
        () => (
            <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
                <LogoSection />
            </Box>
        ),
        []
    );

    const drawerContent = (
        <>
            <MenuList />
        </>
    );

    const drawerSX = {
        paddingLeft: drawerOpen ? '16px' : 0,
        paddingRight: drawerOpen ? '16px' : 0,
        marginTop: drawerOpen ? 0 : '20px'
    };

    const drawer = useMemo(
        () => (
            <>
                {matchDownMd ? (
                    <Box sx={drawerSX}>{drawerContent}</Box>
                ) : (
                    <PerfectScrollbar
                        component="div"
                        style={{
                            height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
                            ...drawerSX
                        }}
                    >
                        {drawerContent}
                    </PerfectScrollbar>
                )}
            </>
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [matchUpMd, drawerOpen, drawerType]
    );

    return (
        <Box component="nav" sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }} aria-label="mailbox folders">
            {matchDownMd || (drawerType === LAYOUT_CONST.MINI_DRAWER && drawerOpen) ? (
                <Drawer
                    variant={matchUpMd ? 'persistent' : 'temporary'}
                    anchor="left"
                    open={drawerOpen}
                    onClose={() => dispatch(openDrawer(!drawerOpen))}
                    sx={{
                        '& .MuiDrawer-paper': {
                            mt: matchDownMd ? 0 : 11,
                            zIndex: 1099,
                            width: drawerWidth,
                            background: theme.palette.background.default,
                            color: theme.palette.text.primary,
                            borderRight: 'none'
                        }
                    }}
                    ModalProps={{ keepMounted: true }}
                    color="inherit"
                >
                    {matchDownMd && logo}
                    {drawer}
                </Drawer>
            ) : (
                <MiniDrawerStyled variant="permanent" open={drawerOpen}>
                    {logo}
                    {drawer}
                </MiniDrawerStyled>
            )}
        </Box>
    );
};

export default memo(Sidebar);
