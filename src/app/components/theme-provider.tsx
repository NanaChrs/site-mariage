"use client";
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';

// Thème personnalisé avec les couleurs du mariage
const customTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: '#fff0f5',   // Rose très pâle
          100: '#ffe4e9',  // Rose pâle
          200: '#ffccd5',  // Rose clair
          300: '#ff99b3',  // Rose moyen
          400: '#ff69b4',  // Rose vif
          500: '#ff1493',  // Rose fuchsia (principal)
          600: '#e01080',  // Rose fuchsia foncé
          700: '#c70d6f',  // Rose profond
          800: '#a00a5b',  // Rose très foncé
          900: '#7a0847',  // Rose bordeaux
        },
        danger: {
          50: '#fff5f5',
          100: '#ffe3e3',
          200: '#ffc9c9',
          300: '#ffa8a8',
          400: '#ff8787',
          500: '#ff6347',  // Rouge tomate
          600: '#e55039',
          700: '#c44536',
          800: '#a43a32',
          900: '#842e2e',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fed68a',
          300: '#fbbf24',
          400: '#f59e0b',
          500: '#ffa500',  // Orange vif
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        success: {
          50: '#fffdf5',
          100: '#fffaeb',
          200: '#fff3c4',
          300: '#ffe99d',
          400: '#ffdd75',
          500: '#ffd700',  // Jaune doré
          600: '#d4ac00',
          700: '#b8920d',
          800: '#9c7a15',
          900: '#80651a',
        },
      },
    },
  },
  components: {
    JoyInput: {
      styleOverrides: {
        root: {
          '--Input-focusedHighlight': '#ff1493',
          '--Input-focusedThickness': '2px',
          '&:focus-within': {
            borderColor: '#ff1493',
            boxShadow: '0 0 0 2px rgba(255, 20, 147, 0.2)',
          },
        },
      },
    },
    JoySelect: {
      styleOverrides: {
        root: {
          '--Select-focusedHighlight': '#ff1493',
          '--Select-focusedThickness': '2px',
          '&:focus-within': {
            borderColor: '#ff1493',
            boxShadow: '0 0 0 2px rgba(255, 20, 147, 0.2)',
          },
        },
      },
    },
    JoyButton: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          ...(ownerState.color === 'primary' && {
            backgroundColor: '#ff1493',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#e01080',
            },
          }),
          ...(ownerState.color === 'primary' && ownerState.variant === 'soft' && {
            backgroundColor: '#ff1493',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#e01080',
              color: '#ffffff',
            },
          }),
        }),
      },
    },
    JoyTypography: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          // Éléments avec fontWeight bold en orange foncé (mais pas les titres)
          ...(ownerState.sx?.fontWeight === 'bold' &&
              ownerState.level !== 'h1' &&
              ownerState.level !== 'h2' &&
              ownerState.level !== 'h3' && {
            color: '#d97706',
          }),
          // Tous les titres h2 et h3 en rose fuchsia avec même taille (mais seulement si pas de couleur explicite)
          ...(ownerState.level === 'h2' && !ownerState.sx?.color && {
            color: '#ff1493',
            fontSize: '1.5rem',
          }),
          ...(ownerState.level === 'h3' && !ownerState.sx?.color && {
            color: '#ff1493',
            fontSize: '1.5rem',
          }),
        }),
      },
    },
  },
});

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <CssVarsProvider theme={customTheme}>
      {children}
    </CssVarsProvider>
  );
}
