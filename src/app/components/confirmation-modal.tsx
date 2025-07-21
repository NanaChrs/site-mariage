"use client";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";

type Person = {
  nom: string;
  prenom: string;
};

type ConfirmationModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  mainPerson: Person;
  plusOnes: Person[];
};

export default function ConfirmationModal({
  open,
  onClose,
  onConfirm,
  mainPerson,
  plusOnes
}: ConfirmationModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog>
        <DialogTitle>Confirmer les informations</DialogTitle>
        <DialogContent>
          <Typography>
            Veuillez confirmer la liste des invités avant d&apos;envoyer :
          </Typography>
          <List>
            <ListItem>{mainPerson.prenom} {mainPerson.nom}</ListItem>
            {plusOnes.map((person, index) => (
              (person.nom || person.prenom) &&
              <ListItem key={index}>{person.prenom} {person.nom}</ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={onConfirm}>Confirmer</Button>
          <Button variant="plain" color="neutral" onClick={onClose}>
            Annuler
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
}
