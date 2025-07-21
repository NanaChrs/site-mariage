"use client";
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';

// Thème personnalisé avec les couleurs du faire-part
const customTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: '#F9E0F5',   // Rose clair du faire-part
          100: '#F9E0F5',  // Rose clair du faire-part
          200: '#F9E0F5',  // Rose clair du faire-part
          300: '#E8B5D4',  // Rose moyen du faire-part
          400: '#E8B5D4',  // Rose moyen du faire-part
          500: '#E8B5D4',  // Rose moyen pour les boutons (principal)
          600: '#E8B5D4',  // Rose moyen du faire-part
          700: '#E8B5D4',  // Rose moyen du faire-part
          800: '#E8B5D4',  // Rose moyen du faire-part
          900: '#E8B5D4',  // Rose moyen du faire-part
        },
        danger: {
          50: '#F9E0F5',
          100: '#F9E0F5',
          200: '#F9E0F5',
          300: '#E8B5D4',
          400: '#E8B5D4',
          500: '#DA363B',  // Rouge du faire-part
          600: '#DA363B',
          700: '#DA363B',
          800: '#DA363B',
          900: '#DA363B',
        },
        warning: {
          50: '#F9E0F5',
          100: '#F9E0F5',
          200: '#F9E0F5',
          300: '#E8B5D4',
          400: '#E8B5D4',
          500: '#DA363B',  // Rouge du faire-part
          600: '#DA363B',
          700: '#DA363B',
          800: '#DA363B',
          900: '#DA363B',
        },
        success: {
          50: '#F9E0F5',
          100: '#F9E0F5',
          200: '#F9E0F5',
          300: '#E8B5D4',
          400: '#E8B5D4',
          500: '#DA363B',  // Rouge du faire-part
          600: '#DA363B',
          700: '#DA363B',
          800: '#DA363B',
          900: '#DA363B',
        },
      },
    },
  },
  components: {
    JoyInput: {
      styleOverrides: {
        root: {
          '--Input-focusedHighlight': '#DA363B',
          '--Input-focusedThickness': '2px',
          '&:focus-within': {
            borderColor: '#DA363B',
            boxShadow: '0 0 0 2px rgba(218, 54, 59, 0.2)',
          },
        },
      },
    },
    JoySelect: {
      styleOverrides: {
        root: {
          '--Select-focusedHighlight': '#DA363B',
          '--Select-focusedThickness': '2px',
          '&:focus-within': {
            borderColor: '#DA363B',
            boxShadow: '0 0 0 2px rgba(218, 54, 59, 0.2)',
          },
        },
      },
    },
    JoyButton: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          ...(ownerState.color === 'primary' && {
            backgroundColor: '#E8B5D4', /* Boutons en rose moyen - même couleur que le footer */
            color: '#DA363B', /* Texte des boutons en rouge */
            '&:hover': {
              backgroundColor: '#DA363B', /* Hover en rouge */
              color: '#ffffff', /* Texte blanc au hover */
            },
          }),
          ...(ownerState.color === 'primary' && ownerState.variant === 'soft' && {
            backgroundColor: '#E8B5D4', /* Boutons soft en rose moyen - même couleur que le footer */
            color: '#DA363B', /* Texte en rouge */
            '&:hover': {
              backgroundColor: '#DA363B', /* Hover en rouge */
              color: '#ffffff', /* Texte blanc au hover */
            },
          }),
        }),
      },
    },
    JoyTypography: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          // Tous les textes en rouge du faire-part
          color: '#DA363B',
          // Tous les titres h2 et h3 en rouge du faire-part avec même taille
          ...(ownerState.level === 'h2' && {
            color: '#DA363B',
            fontSize: '1.5rem',
          }),
          ...(ownerState.level === 'h3' && {
            color: '#DA363B',
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
