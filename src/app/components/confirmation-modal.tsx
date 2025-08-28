import React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Circle from '@mui/icons-material/Circle';

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
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog
        aria-labelledby="confirmation-title"
        aria-describedby="confirmation-desc"
        sx={{
          maxWidth: 500,
          borderRadius: 'xl',
          p: 3,
        }}
      >
        <ModalClose />
        <Typography
          id="confirmation-title"
          level="h4"
          sx={{ mb: 2, textAlign: 'center', color: '#F6005E', fontWeight: 'bold' }}
        >
          Confirmer votre réponse
        </Typography>

        <Typography id="confirmation-desc" sx={{ mb: 3, textAlign: 'center', color: 'black' }}>
          Veuillez vérifier les informations suivantes avant de confirmer :
        </Typography>

        <Typography level="body-md" sx={{ mb: 2, fontWeight: 'bold', color: '#F6005E' }}>
          Personnes présentes :
        </Typography>

        <List
          sx={{
            '--List-radius': '8px',
            '--List-padding': '8px',
            '--ListItem-paddingY': '6px',
            mb: 3
          }}
        >
          <ListItem>
            <ListItemDecorator>
              <Circle sx={{ fontSize: 8, color: 'primary.500' }} />
            </ListItemDecorator>
            <Typography level="body-md" sx={{ color: 'black' }}>
              {mainPerson.prenom} {mainPerson.nom}
            </Typography>
          </ListItem>

          {plusOnes.map((person, index) => (
            <ListItem key={index}>
              <ListItemDecorator>
                <Circle sx={{ fontSize: 8, color: 'primary.500' }} />
              </ListItemDecorator>
              <Typography level="body-md" sx={{ color: 'black' }}>
                {person.prenom} {person.nom}
              </Typography>
            </ListItem>
          ))}
        </List>

        <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            color="neutral"
            onClick={onClose}
            disabled={isLoading}
            sx={{
              borderRadius: 'xl',
              px: 3
            }}
          >
            Annuler
          </Button>
          <Button
            variant="solid"
            color="primary"
            onClick={onConfirm}
            loading={isLoading}
            sx={{
              borderRadius: 'xl',
              px: 3
            }}
          >
            {isLoading ? 'Envoi en cours...' : 'Confirmer'}
          </Button>
        </Stack>
      </ModalDialog>
    </Modal>
  );
}
