"use client";
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: 'var(--color-background-footer)',
        padding: '48px 24px 32px 24px',
        textAlign: 'center',
        marginTop: 'auto',
      }}
    >
      <Typography level="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        Contact
      </Typography>
      <Typography level="body-md" sx={{ mb: 2 }}>
        Laurent & Mathilde
      </Typography>
      <Typography level="body-sm" sx={{ color: 'var(--mui-text-muted)', mb: 1 }}>
        📧 giorgetti.mariage@gmail.com ou mathildechristiaensss@gmail.com
      </Typography>
      <Typography level="body-sm" sx={{ color: 'var(--mui-text-muted)', mb: 1 }}>
        📱 07 50 88 90 70
      </Typography>
      <Typography level="body-sm" sx={{ color: 'var(--mui-text-muted)', mb: 4 }}>
        📍 Pourrières, France
      </Typography>
      <Typography level="body-xs" sx={{ color: 'var(--mui-text-copyright)' }}>
        © 2025 Laurent & Mathilde - Mariage du 29 août 2026
      </Typography>
    </Box>
  );
}
