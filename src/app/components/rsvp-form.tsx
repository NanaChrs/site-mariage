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
import Alert from "@mui/joy/Alert";

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

type RsvpFormProps = {
  showCard?: boolean;
};

export default function RsvpForm({ showCard = false }: RsvpFormProps) {
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleConfirmSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Envoi de la personne principale
      const mainPersonData = {
        name: form.nom,
        firstname: form.prenom,
        email: form.email,
        diet: presence === "oui" ? form.regime : null,
        comment: form.comment || null,
        phone: null, // Pas de téléphone dans le formulaire actuel
        age: null, // Pas d'âge pour la personne principale
        isComing: presence === "oui"
      };

      const mainResponse = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mainPersonData),
      });

      if (!mainResponse.ok) {
        const errorData = await mainResponse.json();
        throw new Error(errorData.error || 'Erreur lors de l\'envoi');
      }

      // Envoi des accompagnants si présence confirmée
      if (presence === "oui" && plusOnes.length > 0) {
        for (const plusOne of plusOnes) {
          const plusOneData = {
            name: plusOne.nom,
            firstname: plusOne.prenom,
            email: `${plusOne.prenom.toLowerCase()}.${plusOne.nom.toLowerCase()}@accompagnant.temp`,
            diet: plusOne.regime,
            age: plusOne.age || null,
            comment: `Accompagnant de ${form.prenom} ${form.nom}`,
            phone: null,
            isComing: true
          };

          const plusOneResponse = await fetch('/api/rsvp', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(plusOneData),
          });

          if (!plusOneResponse.ok) {
            const errorData = await plusOneResponse.json();
            console.error('Erreur accompagnant:', errorData);
            // Continue avec les autres accompagnants même si un échoue
          }
        }
      }

      setSubmitted(true);
      setOpenModal(false);
      setShowToast(true);
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setError(error instanceof Error ? error.message : 'Une erreur est survenue');
      setOpenModal(false);
    } finally {
      setIsLoading(false);
    }
  };

  const formContent = (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography level="h2" sx={{ mb: 3, textAlign: "center" }}>
        Confirmez votre présence
      </Typography>

      {error && (
        <Alert color="danger" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

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
      <Button
        type="submit"
        variant="solid"
        color="primary"
        disabled={!presence || submitted || isLoading}
        loading={isLoading}
      >
        {isLoading ? 'Envoi en cours...' : 'Envoyer'}
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
        autoHideDuration={5000}
        color="success"
      >
        Merci pour votre réponse !
      </Snackbar>
    </Box>
  );

  if (showCard) {
    return (
      <div style={{
        width: '100%',
        maxWidth: '400px',
        maxHeight: '100%',
        overflowY: 'auto',
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(0, 0, 0, 0.05)'
      }}>
        {formContent}
      </div>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: '400px', margin: '0 auto' }}>
      {formContent}
    </Box>
  );
}
