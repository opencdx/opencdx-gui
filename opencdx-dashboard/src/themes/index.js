import PropTypes from 'prop-types';
import { useMemo } from 'react';

// material-ui
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// project import
import { NextAppDirEmotionCacheProvider } from './emotionCache';
import useConfig from '../hooks/useConfig';
import Palette from './palette';
import Typography from './typography';

import componentStyleOverrides from './compStyleOverride';
import customShadows from './shadows';

// assets
import colors from '../scss/_themes-vars.module.scss';

export default function ThemeCustomization({ children }) {
  const config = useConfig();
  const { borderRadius, fontFamily, navType, outlinedFilled, presetColor, rtlLayout } = useConfig();

  const theme = useMemo(() => Palette(navType, presetColor), [navType, presetColor]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const themeTypography = useMemo(() => Typography(theme, borderRadius, fontFamily), [theme, borderRadius, fontFamily]);
  const themeCustomShadows = useMemo(() => customShadows(navType, theme), [navType, theme]);

  let color;
  switch (config.presetColor) {
    case 'default':
    default:
      color = colors;
  }

  const themeOption = {
    colors: color,
    heading: '',
    paper: '',
    backgroundDefault: '',
    background: '',
    darkTextPrimary: '',
    darkTextSecondary: '',
    textDark: '',
    menuSelected: '',
    menuSelectedBack: '',
    divider: '',
    customization: config
  };

  switch (config.navType) {
    case 'dark':
      themeOption.paper = color.darkLevel2;
      themeOption.backgroundDefault = color.darkPaper;
      themeOption.background = color.darkBackground;
      themeOption.darkTextPrimary = color.darkTextPrimary;
      themeOption.darkTextSecondary = color.darkTextSecondary;
      themeOption.textDark = color.darkTextPrimary;
      themeOption.menuSelected = color.darkSecondaryMain;
      themeOption.menuSelectedBack = color.darkSecondaryMain + 15;
      themeOption.divider = color.darkTextPrimary;
      themeOption.heading = color.darkTextTitle;
      break;
    case 'light':
    default:
      themeOption.paper = color.paper;
      themeOption.backgroundDefault = color.paper;
      themeOption.background = color.primaryLight;
      themeOption.darkTextPrimary = color.grey700;
      themeOption.darkTextSecondary = color.grey500;
      themeOption.textDark = color.grey900;
      themeOption.menuSelected = color.secondaryDark;
      themeOption.menuSelectedBack = color.secondaryLight;
      themeOption.divider = color.grey200;
      themeOption.heading = color.grey900;
      break;
  }

  const themeOptions = useMemo(
    () => ({
      direction: rtlLayout ? 'rtl' : 'ltr',
      palette: theme.palette,
      mixins: {
        toolbar: {
          minHeight: '48px',
          padding: '16px',
          '@media (min-width: 600px)': {
            minHeight: '48px'
          }
        }
      },
      typography: themeTypography,
      customShadows: themeCustomShadows
    }),
    [rtlLayout, theme, themeCustomShadows, themeTypography]
  );

  const themes = createTheme(themeOptions);
  themes.components = useMemo(() => componentStyleOverrides(themes, borderRadius, outlinedFilled), [themes, borderRadius, outlinedFilled]);

  return (
    <StyledEngineProvider injectFirst>
      <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
        <ThemeProvider theme={themes}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </NextAppDirEmotionCacheProvider>
    </StyledEngineProvider>
  );
}

ThemeCustomization.propTypes = {
  children: PropTypes.node
};
