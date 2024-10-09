const { hairlineWidth, platformSelect } = require('nativewind/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90.01deg, #FFFFFF 4.32%, rgba(255, 255, 255, 0.2) 5.73%, rgba(255, 255, 255, 0.1) 7.04%, rgba(255, 255, 255, 0.025) 7.96%, rgba(0, 23, 49, 0.025) 10.51%, rgba(0, 23, 49, 0.05) 11.48%, rgba(0, 23, 49, 0.1) 12.25%, rgba(0, 23, 49, 0.2) 13.41%, rgba(0, 23, 49, 0.253313) 14.1%, rgba(0, 23, 49, 0.5) 16.63%, rgba(0, 23, 49, 0.6) 17.88%, rgba(0, 23, 49, 0.7) 19.34%, rgba(0, 23, 49, 0.8) 21.88%, rgba(0, 23, 49, 0.9) 24.74%, #001731 28.32%, #001731 40.04%, #002E62 66.46%, #004493 84.83%, #0148B1 90.06%, #0160EF 97.02%, #2F7EFF 106.2%, #83B3FF 115.2%)',
      },
      colors: {
        border: withOpacity('border'),
        input: withOpacity('input'),
        ring: withOpacity('ring'),
        background: withOpacity('background'),
        foreground: withOpacity('foreground'),
        primary: {
          DEFAULT: withOpacity('primary'),
          foreground: withOpacity('primary-foreground'),
        },
        secondary: {
          DEFAULT: withOpacity('secondary'),
          foreground: withOpacity('secondary-foreground'),
        },
        destructive: {
          DEFAULT: withOpacity('destructive'),
          foreground: withOpacity('destructive-foreground'),
        },
        muted: {
          DEFAULT: withOpacity('muted'),
          foreground: withOpacity('muted-foreground'),
        },
        accent: {
          DEFAULT: withOpacity('accent'),
          foreground: withOpacity('accent-foreground'),
        },
        popover: {
          DEFAULT: withOpacity('popover'),
          foreground: withOpacity('popover-foreground'),
        },
        card: {
          DEFAULT: withOpacity('card'),
          foreground: withOpacity('card-foreground'),
        },
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
    },
  },
  plugins: [],
};

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return platformSelect({
        ios: `rgb(var(--${variableName}) / ${opacityValue})`,
        android: `rgb(var(--android-${variableName}) / ${opacityValue})`,
      });
    }
    return platformSelect({
      ios: `rgb(var(--${variableName}))`,
      android: `rgb(var(--android-${variableName}))`,
    });
  };
}
