"use client";
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';

// Thème personnalisé avec les couleurs du faire-part
const customTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        text: {
          primary: '#000000',    // Texte noir par défaut
          secondary: '#000000',  // Texte secondaire aussi noir
          tertiary: '#666666',   // Texte atténué gris
        },
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
          400: '#F6005E',
          500: '#F6005E',  // Rose pour les erreurs
          600: '#F6005E',
          700: '#F6005E',
          800: '#F6005E',
          900: '#F6005E',
        },
        warning: {
          50: '#F9E0F5',
          100: '#F9E0F5',
          200: '#F9E0F5',
          300: '#E8B5D4',
          400: '#F6005E',
          500: '#F6005E',  // Rose pour les warnings
          600: '#F6005E',
          700: '#F6005E',
          800: '#F6005E',
          900: '#F6005E',
        },
        success: {
          50: '#F9E0F5',
          100: '#F9E0F5',
          200: '#F9E0F5',
          300: '#E8B5D4',
          400: '#F6005E',
          500: '#F6005E',  // Rose pour le succès
          600: '#F6005E',
          700: '#F6005E',
          800: '#F6005E',
          900: '#F6005E',
        },
      },
    },
  },
  components: {
    JoyInput: {
      styleOverrides: {
        root: {
          '--Input-focusedHighlight': '#F6005E',
          '--Input-focusedThickness': '2px',
          '&:focus-within': {
            borderColor: '#F6005E',
            boxShadow: '0 0 0 2px rgba(218, 54, 59, 0.2)',
          },
        },
      },
    },
    JoySelect: {
      styleOverrides: {
        root: {
          '--Select-focusedHighlight': '#F6005E',
          '--Select-focusedThickness': '2px',
          '&:focus-within': {
            borderColor: '#F6005E',
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
            color: '#F6005E', /* Texte des boutons en rouge */
            '&:hover': {
              backgroundColor: '#F6005E', /* Hover en rouge */
              color: '#ffffff', /* Texte blanc au hover */
            },
          }),
          ...(ownerState.color === 'primary' && ownerState.variant === 'soft' && {
            backgroundColor: '#E8B5D4', /* Boutons soft en rose moyen - même couleur que le footer */
            color: '#F6005E', /* Texte en rouge */
            '&:hover': {
              backgroundColor: '#F6005E', /* Hover en rouge */
              color: '#ffffff', /* Texte blanc au hover */
            },
          }),
        }),
      },
    },
    JoyTypography: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          // Texte noir par défaut
          color: '#000000',
          // Titres h1, h2, h3, h4 en rose #F6005E
          ...(ownerState.level === 'h1' && {
            color: '#F6005E',
            fontWeight: 'bold',
          }),
          ...(ownerState.level === 'h2' && {
            color: '#F6005E !important',
            fontFamily: 'hijrnotes, "Times New Roman", Georgia, serif',
            fontSize: '3.5rem !important',
            fontWeight: 'normal !important'
          }),
          ...(ownerState.level === 'h3' && {
            color: '#F6005E',
            fontWeight: 'bold',
            fontSize: '1.5rem',
          }),
          ...(ownerState.level === 'h4' && {
            color: '#F6005E',
            fontWeight: 'bold',
          })
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
