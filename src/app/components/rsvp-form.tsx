"use client";
import { useState } from "react";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Stack from "@mui/joy/Stack";
import IconButton from "@mui/joy/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationModal from "./confirmation-modal";
import Snackbar from "@mui/joy/Snackbar";

type RsvpForm = {
  nom: string;
  prenom: string;
  regime: "omnivore" | "vegetarien" | "pescatarien";
  email: string;
  comment?: string;
};

type PlusOneForm = Pick<RsvpForm, "nom" | "prenom" | "regime"> & {
    age?: number;
};

export default function RsvpForm() {
  const [form, setForm] = useState<RsvpForm>({
    nom: "",
    prenom: "",
    regime: "omnivore",
    email: "",
  });
  const [plusOnes, setPlusOnes] = useState<PlusOneForm[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [presence, setPresence] = useState<string>("");
  const [openModal, setOpenModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleChange = (field: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlusOnesChange = (idx: number, field: string, value: string) => {
    setPlusOnes((prev) => prev.map((a, i) => i === idx ? { ...a, [field]: value } : a));
  };

  const addPlusOnes = () => {
    setPlusOnes((prev) => [...prev, { nom: '', prenom: '', regime: 'omnivore' }]);
  };

  const removePlusOnes = (idx: number) => {
    setPlusOnes((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (presence === "oui") {
      setOpenModal(true);
    } else {
      handleConfirmSubmit();
    }
  };

  const handleConfirmSubmit = () => {
    setSubmitted(true);
    setOpenModal(false);
    setShowToast(true);
    // Ici, tu peux ajouter la logique d'envoi (API, email, etc.)
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: '90%',
        maxWidth: 600,
        mx: "auto",
        mt: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography level="h3" sx={{ mb: 2, textAlign: "center" }}>
        Confirmez votre présence
      </Typography>

      <Input
        placeholder="Nom"
        required
        value={form.nom}
        onChange={(e) => handleChange("nom", e.target.value)}
        disabled={submitted}
      />
      <Input
        placeholder="Prénom"
        required
        value={form.prenom}
        onChange={(e) => handleChange("prenom", e.target.value)}
        disabled={submitted}
      />
      <Typography level="body-md" sx={{ mt: 2 }}>
        Je confirme ma présence&nbsp;:
      </Typography>
      <Select
        value={presence}
        onChange={(_, value) => setPresence(value as string)}
        required
        disabled={submitted}
      >
        <Option value="oui">Oui, je serai présent(e)</Option>
        <Option value="non">Non, je ne pourrai pas venir</Option>
      </Select>
      <Input
        type="email"
        placeholder="Adresse e-mail"
        required
        value={form.email}
        onChange={(e) => handleChange("email", e.target.value)}
        disabled={submitted || presence !== "oui"}
      />
      <Select
        value={form.regime}
        onChange={(_, value) => handleChange("regime", value)}
        required
        disabled={submitted || presence !== "oui"}
      >
        <Option value="omnivore">Omnivore</Option>
        <Option value="vegetarien">Végétarien</Option>
        <Option value="pescatarien">Pescatarien</Option>
      </Select>
      <Typography level="body-md" sx={{ mt: 2 }}>
        Accompagnant (facultatif) :
      </Typography>
      {plusOnes.map((a, idx) => (
        <Stack direction="row" spacing={1} alignItems="center" key={idx}>
          <Input
            placeholder="Nom de l'accompagnant"
            required
            value={a.nom}
            onChange={(e) => handlePlusOnesChange(idx, 'nom', e.target.value)}
            sx={{ flex: 1 }}
            disabled={submitted || presence !== "oui"}
          />
          <Input
            placeholder="Prénom de l'accompagnant"
            required
            value={a.prenom}
            onChange={(e) => handlePlusOnesChange(idx, 'prenom', e.target.value)}
            sx={{ flex: 1 }}
            disabled={submitted || presence !== "oui"}
          />
          <Input
            type="number"
            placeholder="Âge"
            required
            value={a.age}
            onChange={(e) => handlePlusOnesChange(idx, 'age', e.target.value)}
            sx={{ width: 80 }}
            disabled={submitted || presence !== "oui"}
          />
          <Select
            value={a.regime}
            onChange={(_, value) => handlePlusOnesChange(idx, 'regime', value as string)}
            required
            sx={{ minWidth: 120 }}
            disabled={submitted || presence !== "oui"}
          >
            <Option value="omnivore">Omnivore</Option>
            <Option value="vegetarien">Végétarien</Option>
            <Option value="pescatarien">Pescatarien</Option>
          </Select>
          <IconButton color="danger" onClick={() => removePlusOnes(idx)} disabled={submitted || presence !== "oui"}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      ))}
      <Button variant="soft" color="neutral" onClick={addPlusOnes} sx={{ alignSelf: 'flex-start' }} disabled={submitted || presence !== "oui"}>
        Ajouter un plusOnes
      </Button>
      <Typography level="body-sm" sx={{ fontStyle: 'italic', mb: 1 }}>
        Merci d&apos;indiquer le régime alimentaire de chaque personne. Vous pouvez ajouter un commentaire ou une note spéciale ci-dessous si besoin.
      </Typography>
      <Input
        placeholder="Commentaire ou note spéciale (facultatif)"
        value={form.comment || ""}
        onChange={(e) => handleChange("commentaire", e.target.value)}
        sx={{ mb: 1 }}
        disabled={submitted}
      />
      <Button type="submit" variant="solid" color="primary" disabled={!presence || submitted}>
        Envoyer
      </Button>

      <ConfirmationModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={handleConfirmSubmit}
        mainPerson={{ nom: form.nom, prenom: form.prenom }}
        plusOnes={plusOnes}
      />

      <Snackbar
        open={showToast}
        onClose={() => setShowToast(false)}
        autoHideDuration={4000}
        color="success"
        variant="soft"
      >
        Merci pour votre réponse !
      </Snackbar>
    </Box>
  );
}
