"use client";
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import Image from 'next/image';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: 'var(--color-background-primary)',
        padding: '32px 24px 32px 24px',
        textAlign: 'center',
        marginTop: 'auto',
      }}
    >
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
        <Image
          src="/logo_mariage.png"
          alt="Laurent & Mathilde"
          width={300}
          height={120}
          style={{ objectFit: 'contain' }}
        />
      </Box>
      <Typography level="body-sm" sx={{ mb: 1 }}>
        📧 <Link href="mailto:giorgetti.mariage@gmail.com" sx={{ color: 'var(--color-background-accent)', textDecoration: 'underline' }}>
          giorgetti.mariage@gmail.com
        </Link> ou <Link href="mailto:mathildechristiaensss@gmail.com" sx={{ color: 'var(--color-background-accent)', textDecoration: 'underline' }}>
          mathildechristiaensss@gmail.com
        </Link>
      </Typography>
      <Typography level="body-sm" sx={{ mb: 1 }}>
        📱Mathilde - 07 50 88 90 70
      </Typography>
        <Typography level="body-sm" sx={{ mb: 4 }}>
          📱Laurent - 06 40 17 33 52
        </Typography>
      <Typography level="body-sm" sx={{ mb: 4 }}>
        📍 Pourrières, France
      </Typography>
      <Typography level="body-xs">
        © 2025 Laurent & Mathilde - Mariage du 29 août 2026
      </Typography>
    </Box>
  );
}
