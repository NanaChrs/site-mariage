import React from 'react';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Box from '@mui/joy/Box';

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  mainPerson: { nom: string; prenom: string };
  plusOnes: Array<{ nom: string; prenom: string }>;
  isLoading?: boolean;
}

export default function ConfirmationModal({
  open,
  onClose,
  onConfirm,
  mainPerson,
  plusOnes,
  isLoading = false
}: ConfirmationModalProps) {
  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={onClose}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          maxWidth: '90vw',
          maxHeight: '80vh',
          overflow: 'auto',
          position: 'relative',
        }}
      >
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '8px',
            lineHeight: 1,
          }}
        >
          ×
        </button>

        <Typography level="h4" sx={{ mb: 2, textAlign: 'center', color: '#F6005E', fontWeight: 'bold' }}>
          Confirmer votre réponse
        </Typography>

        <Typography sx={{ mb: 3, textAlign: 'center', color: 'black' }}>
          Veuillez vérifier les informations suivantes avant de confirmer :
        </Typography>

        <Typography level="body-md" sx={{ mb: 2, fontWeight: 'bold', color: '#F6005E' }}>
          Personnes présentes :
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography level="body-md" sx={{ color: 'black', mb: 1 }}>
            • {mainPerson.prenom} {mainPerson.nom}
          </Typography>

          {plusOnes.map((person, index) => (
            <Typography key={index} level="body-md" sx={{ color: 'black', mb: 1 }}>
              • {person.prenom} {person.nom}
            </Typography>
          ))}
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button
            variant="outlined"
            color="neutral"
            onClick={onClose}
            disabled={isLoading}
            sx={{ borderRadius: 'xl', flex: 1 }}
          >
            Annuler
          </Button>
          <Button
            variant="solid"
            color="primary"
            onClick={onConfirm}
            loading={isLoading}
            sx={{ borderRadius: 'xl', flex: 1 }}
          >
            {isLoading ? 'Envoi en cours...' : 'Confirmer'}
          </Button>
        </Stack>
      </Box>
    </div>
  );
}
