"use client";
import { useState } from "react";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Alert from "@mui/joy/Alert";
import Stack from "@mui/joy/Stack";
import IconButton from "@mui/joy/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function RsvpForm() {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    regime: "omnivore",
    email: "",
  });
  const [plusOnes, setPlusOnes] = useState<{ nom: string; prenom: string; regime: string; age: string }[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [presence, setPresence] = useState<string>("");

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAccompagnantChange = (idx: number, field: string, value: string) => {
    setPlusOnes((prev) => prev.map((a, i) => i === idx ? { ...a, [field]: value } : a));
  };

  const addAccompagnant = () => {
    setPlusOnes((prev) => [...prev, { nom: '', prenom: '', regime: 'omnivore', age: '' }]);
  };

  const removeAccompagnant = (idx: number) => {
    setPlusOnes((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
      {submitted && (
        <Alert color="success" variant="soft" sx={{ mb: 2 }}>
          Merci pour votre réponse !
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
        Accompagnants (facultatif) :
      </Typography>
      {plusOnes.map((a, idx) => (
        <Stack direction="row" spacing={1} alignItems="center" key={idx}>
          <Input
            placeholder="Nom de l'accompagnant"
            required
            value={a.nom}
            onChange={(e) => handleAccompagnantChange(idx, 'nom', e.target.value)}
            sx={{ flex: 1 }}
            disabled={submitted || presence !== "oui"}
          />
          <Input
            placeholder="Prénom de l'accompagnant"
            required
            value={a.prenom}
            onChange={(e) => handleAccompagnantChange(idx, 'prenom', e.target.value)}
            sx={{ flex: 1 }}
            disabled={submitted || presence !== "oui"}
          />
          <Input
            type="number"
            placeholder="Âge"
            required
            value={a.age}
            onChange={(e) => handleAccompagnantChange(idx, 'age', e.target.value)}
            sx={{ width: 80 }}
            disabled={submitted || presence !== "oui"}
          />
          <Select
            value={a.regime}
            onChange={(_, value) => handleAccompagnantChange(idx, 'regime', value as string)}
            required
            sx={{ minWidth: 120 }}
            disabled={submitted || presence !== "oui"}
          >
            <Option value="omnivore">Omnivore</Option>
            <Option value="vegetarien">Végétarien</Option>
            <Option value="pescatarien">Pescatarien</Option>
          </Select>
          <IconButton color="danger" onClick={() => removeAccompagnant(idx)} disabled={submitted || presence !== "oui"}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      ))}
      <Button variant="soft" color="neutral" onClick={addAccompagnant} sx={{ alignSelf: 'flex-start' }} disabled={submitted || presence !== "oui"}>
        Ajouter un accompagnant
      </Button>
      <Typography level="body-sm" sx={{ fontStyle: 'italic', mb: 1 }}>
        Merci d'indiquer le régime alimentaire de chaque personne. Vous pouvez ajouter un commentaire ou une note spéciale ci-dessous si besoin.
      </Typography>
      <Input
        placeholder="Commentaire ou note spéciale (facultatif)"
        value={form.commentaire || ""}
        onChange={(e) => handleChange("commentaire", e.target.value)}
        sx={{ mb: 1 }}
        disabled={submitted}
      />
      <Button type="submit" variant="solid" color="primary" disabled={!presence || submitted}>
        Envoyer
      </Button>
    </Box>
  );
}
